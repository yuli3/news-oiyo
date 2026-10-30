import { recordTopics, sha256Hex } from "./mailing-list.mjs";
import { readMailingBody } from "./http.mjs";
import { buildDigest, buildReviewedDraftMail, selectWeeklyItems, withUnsubscribe } from "./digest.mjs";
import { createWeeklyStore } from "./weekly-store.mjs";
import { itemInScope } from "../../scripts/lib/story-scope.mjs";

export function reply(status, body) {
  return new Response(JSON.stringify(body), { status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function handleWeeklyRequest(request, deps) {
  try { return await processWeeklyRequest(request, deps); }
  catch { return reply(503, { ok: false, error: "service_unavailable" }); }
}

// 관리 요청 공통 관문: POST, 32자 이상 관리 키, 같은 출처, JSON 본문. 출시 알림 발송도 같은 관문을 쓴다.
// 통과하면 { data }, 막히면 { response }를 돌려준다.
export async function readAdminRequest(request, deps, { limit } = {}) {
  if (request.method !== "POST") return { response: reply(405, { ok: false, error: "method" }) };
  const supplied = request.headers.get("authorization") || "";
  const secret = deps.adminKey || "";
  if (secret.length < 32 || !supplied.startsWith("Bearer ") || supplied.length > 520) {
    return { response: reply(401, { ok: false, error: "unauthorized" }) };
  }
  const expected = await sha256Hex(secret);
  const actual = await sha256Hex(supplied.slice(7));
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
  if (mismatch) return { response: reply(401, { ok: false, error: "unauthorized" }) };
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== new URL(deps.origin || "https://news.oiyo.net").origin) {
    return { response: reply(403, { ok: false, error: "origin_not_allowed" }) };
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return { response: reply(415, { ok: false, error: "json_required" }) };
  }
  const parsed = await readMailingBody(request, limit ? { limit } : undefined);
  if (parsed.error) return { response: reply(parsed.error === "too_large" ? 413 : 400, { ok: false, error: parsed.error }) };
  const data = parsed.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return { response: reply(400, { ok: false, error: "bad_json" }) };
  return { data };
}

async function processWeeklyRequest(request, deps) {
  // 검토한 초안 본문이 들어오므로 관리 요청 본문 한도를 넓힌다.
  const admin = await readAdminRequest(request, deps, { limit: 65536 });
  if (admin.response) return admin.response;
  const data = admin.data;
  // Use the product's Korean day, not the deployment host's timezone (2026-10-15).
  const today = new Date((deps.now ?? Date.now()) + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const through = data.through ?? today;
  const date = typeof through === "string" && /^\d{4}-\d{2}-\d{2}$/.test(through) ? new Date(`${through}T00:00:00Z`) : null;
  if (!date || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== through || through > today) {
    return reply(400, { ok: false, error: "invalid_date" });
  }
  if (!deps.news?.days) return reply(503, { ok: false, error: "news_unconfigured" });
  const days = deps.news.days.map(day => ({ ...day, items: (day.items || []).filter(itemInScope) }));
  const week = selectWeeklyItems(days, { end: through });
  const preview = buildDigest({ date: week.start, through: week.through, items: week.items, pageUrl: "https://news.oiyo.net/archive/", contact: deps.contact });
  if (data.send !== true) return reply(200, { ok: true, mode: "preview", from: week.start, through: week.through, digest: preview });
  // 2026-10-30 세운 승인: 자동 요약은 보내지 않는다. 검토한 초안 + 같은 초안 id의 수동 확인이 있어야 발송한다.
  if (!deps.db || !deps.mailer?.canSend || !deps.mailer.scope) return reply(503, { ok: false, error: "weekly_sender_unconfigured" });
  const draft = data.draft;
  if (!draft || typeof draft !== "object" || Array.isArray(draft)) return reply(400, { ok: false, error: "reviewed_draft_required" });
  if (draft.reviewed !== true) return reply(400, { ok: false, error: "draft_not_reviewed" });
  if (typeof data.confirm !== "string" || data.confirm !== draft.id) return reply(400, { ok: false, error: "confirm_required" });
  let digest;
  try { digest = buildReviewedDraftMail({ ...draft, contact: deps.contact }); }
  catch { return reply(400, { ok: false, error: "invalid_draft" }); }
  const after = data.cursor ?? "";
  if (after !== "" && (typeof after !== "string" || !/^[a-f0-9]{64}$/.test(after))) return reply(400, { ok: false, error: "invalid_cursor" });
  // A changed rolling seven-day window must not create another issue in the same calendar week.
  const monday = new Date(date);
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  const id = monday.toISOString().slice(0, 10);
  const scope = typeof deps.mailer.scope === "function" ? await deps.mailer.scope() : deps.mailer.scope;
  const origin = new URL(deps.origin || "https://news.oiyo.net").origin;
  const store = createWeeklyStore(deps.db);
  const existingIssue = await store.getIssue(id);
  // Editorial updates cannot erase pending deliveries from an already frozen issue (2026-10-15 review).
  if (!existingIssue && !digest.itemCount) return reply(200, { ok: true, mode: "send", empty: true });
  const issue = existingIssue || await store.issue(id, { digest, scope, origin });
  if (issue.scope !== scope || issue.origin !== origin) return reply(409, { ok: false, error: "sender_changed" });
  if (issue.digest?.draftId !== digest.draftId) return reply(409, { ok: false, error: "issue_draft_mismatch" });
  const recipients = await store.recipients(after);
  const counts = { sent: 0, skipped: 0, pending: 0, review: 0 };
  const deadline = Date.now() + 30000;
  let processed = 0;
  for (const recipient of recipients.slice(0, 50)) {
    // Return a cursor for the unprocessed tail rather than holding one admin request indefinitely.
    if (processed && Date.now() >= deadline) break;
    processed += 1;
    // Launch-notice consent is not weekly-news consent (2026-10-19).
    if (!recordTopics(JSON.parse(recipient.payload)).includes("weekly")) { counts.skipped += 1; continue; }
    const state = await store.claim(id, recipient, deps.now ?? Date.now());
    if (state !== "claimed") {
      counts[state === "review_required" || state === "consent_changed" ? "review" : state === "busy" ? "pending" : "skipped"] += 1;
      continue;
    }
    const record = JSON.parse(recipient.payload);
    try {
      const result = await deps.mailer.send({ to: record.email, subject: issue.digest.subject,
        text: withUnsubscribe(issue.digest.text, issue.origin, record.unsubscribeToken),
        idempotencyKey: `news-weekly/${id}/${recipient.email_hash}` });
      if (!result.ok) { counts.pending += 1; continue; }
      await store.markSent(id, recipient.email_hash);
      counts.sent += 1;
    } catch { counts.pending += 1; }
  }
  return reply(200, { ok: true, mode: "send", issue: id, ...counts,
    nextCursor: recipients.length > processed ? recipients[processed - 1].email_hash : null });
}
