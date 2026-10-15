// 구독 상태 기계. Node 테스트와 Cloudflare Pages Function이 같이 쓴다.
// 확인 토큰은 해시만 저장한다. 수신거부 토큰은 이후 메일마다 같은 링크를
// 다시 만들려고 원문을 남긴다 (2026-10-14). 해시만 있으면 링크를 복원할 수 없다.

export const POLICY_VERSION = "2026-10-14";
export const CONFIRM_TTL_MS = 48 * 60 * 60 * 1000;

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (/[\s\u0000]/.test(email)) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}

export function isToken(value) {
  return typeof value === "string" && TOKEN_RE.test(value);
}

function bytesToBase64Url(bytes) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function newToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function createLimiter({ limit = 5, windowMs = 60 * 60 * 1000 } = {}) {
  const hits = new Map();
  return {
    allow(key, now) {
      const recent = (hits.get(key) || []).filter((at) => now - at < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      return true;
    },
  };
}

function checkInbox(extra = {}) {
  return { status: 202, body: { ok: true, state: "check_inbox", ...extra } };
}

export function buildConfirmMail({ origin, confirmToken, unsubToken }) {
  const confirmUrl = `${origin}/subscribe/confirm/?token=${encodeURIComponent(confirmToken)}`;
  const unsubUrl = `${origin}/subscribe/unsubscribe/?token=${encodeURIComponent(unsubToken)}`;
  const text = [
    "OIYO AI·금융 소식 메일 수신을 신청하셨습니다.",
    "소식 메일은 일주일에 한 통이고, 지난 7일을 모읍니다.",
    "아래 주소로 확인해야 구독이 시작됩니다. 48시간 안에 확인하지 않으면 이 신청은 끝납니다.",
    confirmUrl,
    "",
    "신청하지 않으셨다면 이 메일을 무시하세요.",
    "수신 거부:",
    unsubUrl,
    "",
    "보내는 이: OIYO News (https://news.oiyo.net/)",
    "이 메일은 수신 확인이며 소식 요약이 아닙니다.",
  ].join("\n");
  return {
    subject: "[OIYO AI·금융] 수신 확인",
    text,
    confirmUrl,
  };
}

export async function subscribe(deps) {
  const { store, mailer, now, origin, limiter, ip = "unknown" } = deps;
  if (deps.consent !== true) return { status: 400, body: { ok: false, error: "consent_required" } };
  const email = normalizeEmail(deps.email);
  if (!email) return { status: 400, body: { ok: false, error: "invalid_email" } };
  // 빈 함정 칸은 봇이다. 저장하지 않고 신청된 것처럼 답한다.
  if (deps.trap) return checkInbox();
  // 확인 메일을 못 보내면 대기 열을 만들지 않는다. 확인 없는 주소는 구독이 아니다.
  if (!mailer?.canSend) return { status: 503, body: { ok: false, error: "mailer_unconfigured" } };
  if (!store) return { status: 503, body: { ok: false, error: "store_unconfigured" } };
  if (deps.requireDurableConfirmation && (typeof deps.confirmSecret !== "string" || deps.confirmSecret.length < 32)) {
    return { status: 503, body: { ok: false, error: "confirmation_unconfigured" } };
  }
  if (limiter && !await limiter.allow(await sha256Hex(String(ip)), now, await sha256Hex(email))) {
    return { status: 429, body: { ok: false, error: "rate_limited" } };
  }

  const existing = await store.getByEmail(email);
  if (existing?.status === "active") return checkInbox();
  if (deps.requireDurableConfirmation) return durableConfirmation({ ...deps, email }, existing);

  const confirmToken = newToken();
  const unsubToken = newToken();
  const next = {
    email,
    status: "pending",
    policyVersion: POLICY_VERSION,
    consentedAt: new Date(now).toISOString(),
    confirmTokenHash: await sha256Hex(confirmToken),
    confirmExpiresAt: now + CONFIRM_TTL_MS,
    unsubscribeToken: unsubToken,
    unsubscribeTokenHash: await sha256Hex(unsubToken),
    createdAt: existing?.createdAt || new Date(now).toISOString(),
    confirmedAt: null,
    unsubscribedAt: existing?.status === "unsubscribed" ? existing.unsubscribedAt : null,
  };
  const mail = buildConfirmMail({ origin, confirmToken, unsubToken });
  const sent = await mailer.send({ to: email, subject: mail.subject, text: mail.text });
  if (!sent?.ok) return { status: 503, body: { ok: false, error: "send_failed" } };
  if (await store.save(next, existing) === false) {
    return { status: 409, body: { ok: false, error: "state_changed" } };
  }
  const body = { ok: true, state: "check_inbox" };
  if (mailer.devExpose) body.devConfirmUrl = mail.confirmUrl;
  return { status: 202, body };
}

async function durableConfirmation(deps, existing) {
  const { store, mailer, email, now, origin, confirmSecret } = deps;
  const needsReview = () => ({ status: 503, body: { ok: false, error: "confirmation_review_required" } });
  const scope = typeof mailer.scope === "function" ? await mailer.scope() : mailer.scope;
  if (!scope) return needsReview();
  let record;
  if (existing?.status === "pending" && existing.confirmExpiresAt > now) {
    const delivery = existing.confirmation;
    // Never rotate a potentially delivered token or reuse a key with a changed account/template (2026-10-15).
    if (!delivery || delivery.scope !== scope || delivery.origin !== origin) return needsReview();
    if (delivery.state === "sent") return checkInbox();
    if (now - delivery.firstAttemptAt >= 23 * 3600000) return needsReview();
    if (delivery.leaseUntil > now) return checkInbox();
    record = { ...existing, confirmation: { ...delivery, leaseUntil: now + 300000 } };
  } else {
    const nonce = newToken();
    const unsubToken = newToken();
    record = {
      email, status: "pending", policyVersion: POLICY_VERSION,
      consentedAt: new Date(now).toISOString(), confirmExpiresAt: now + CONFIRM_TTL_MS,
      unsubscribeToken: unsubToken, unsubscribeTokenHash: await sha256Hex(unsubToken),
      createdAt: existing?.createdAt || new Date(now).toISOString(), confirmedAt: null,
      unsubscribedAt: existing?.status === "unsubscribed" ? existing.unsubscribedAt : null,
      confirmation: { nonce, scope, origin, firstAttemptAt: now, leaseUntil: now + 300000, state: "sending" },
    };
  }
  // HMAC reconstructs the same bearer token after a restart without storing that token or a plaintext email body.
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(confirmSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key,
    new TextEncoder().encode(JSON.stringify(["oiyo-confirm-v1", email, record.confirmation.nonce])));
  const token = bytesToBase64Url(new Uint8Array(signature));
  const hash = await sha256Hex(token);
  if (record.confirmTokenHash && record.confirmTokenHash !== hash) return needsReview();
  record.confirmTokenHash = hash;
  if (!record.confirmation.template) {
    const mail = buildConfirmMail({ origin, confirmToken: token, unsubToken: record.unsubscribeToken });
    record.confirmation = { ...record.confirmation, subject: mail.subject,
      template: mail.text.replace(token, "{{CONFIRM_TOKEN}}") };
  }
  // Persist consent and the dispatch intent BEFORE crossing the external mail boundary.
  // Uncertain failures retain pending intent: deleting it would invalidate a possibly delivered link.
  if (await store.save(record, existing) === false) return { status: 409, body: { ok: false, error: "state_changed" } };
  const sent = await mailer.send({ to: email, subject: record.confirmation.subject,
    text: record.confirmation.template.replace("{{CONFIRM_TOKEN}}", token),
    idempotencyKey: `news-confirm/${await sha256Hex(email)}/${record.confirmation.nonce}` });
  if (!sent?.ok) return { status: 503, body: { ok: false, error: "send_failed" } };
  // A simultaneous confirmation/revocation wins over this delivery metadata update.
  await store.save({ ...record, confirmation: { ...record.confirmation, state: "sent" } }, record);
  return checkInbox();
}

export async function confirm(deps) {
  const { store, token, now } = deps;
  if (!isToken(token)) return { status: 400, body: { ok: false, error: "invalid_token" } };
  if (!store) return { status: 503, body: { ok: false, error: "store_unconfigured" } };
  const hash = await sha256Hex(token);
  const record = await store.findByToken("confirm", hash);
  if (!record || record.confirmTokenHash !== hash) {
    return { status: 400, body: { ok: false, error: "invalid_token" } };
  }
  if (record.status === "active") return { status: 200, body: { ok: true, state: "active" } };
  if (record.status === "unsubscribed") return { status: 400, body: { ok: false, error: "unsubscribed" } };
  if (record.status !== "pending" || now >= record.confirmExpiresAt) {
    return { status: 400, body: { ok: false, error: "expired" } };
  }
  const next = {
    ...record,
    status: "active",
    confirmedAt: new Date(now).toISOString(),
  };
  if (await store.save(next, record) === false) {
    return { status: 409, body: { ok: false, error: "state_changed" } };
  }
  return { status: 200, body: { ok: true, state: "active" } };
}

export async function unsubscribe(deps) {
  const { store, token, now } = deps;
  if (!isToken(token)) return { status: 400, body: { ok: false, error: "invalid_token" } };
  if (!store) return { status: 503, body: { ok: false, error: "store_unconfigured" } };
  const hash = await sha256Hex(token);
  const record = await store.findByToken("unsubscribe", hash);
  if (!record || record.unsubscribeTokenHash !== hash) {
    return { status: 400, body: { ok: false, error: "invalid_token" } };
  }
  if (record.status === "unsubscribed") return { status: 200, body: { ok: true, state: "unsubscribed" } };
  // 해지 기록을 지하지 않는다. 수신거부 뒤 새 동의 없이 다시 넣지 않기 위해서다.
  const next = {
    ...record,
    status: "unsubscribed",
    unsubscribedAt: new Date(now).toISOString(),
    confirmTokenHash: null,
    confirmExpiresAt: null,
  };
  if (await store.save(next, record) === false) {
    return { status: 409, body: { ok: false, error: "state_changed" } };
  }
  return { status: 200, body: { ok: true, state: "unsubscribed" } };
}
