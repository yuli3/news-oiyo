import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { buildDigest, selectWeeklyItems } from "../../functions/lib/digest.mjs";
import { handleMailingRequest } from "../../functions/lib/http.mjs";
import { confirm, createLimiter, sha256Hex, subscribe, unsubscribe } from "../../functions/lib/mailing-list.mjs";
import { createProductionMailer } from "../../functions/lib/production-mailer.mjs";
import { createFileStore, createMemoryStore } from "../../functions/lib/stores.mjs";
import { createKvStore } from "../../functions/lib/kv-store.mjs";

const NOW = Date.parse("2026-10-14T03:00:00.000Z");
const ORIGIN = "http://127.0.0.1:4321";

function mailer() {
  const sent = [];
  return {
    sent,
    canSend: true,
    devExpose: true,
    async send(message) {
      sent.push(message);
      return { ok: true };
    },
  };
}

function tokenFrom(url) {
  return new URL(url).searchParams.get("token");
}

async function apply(overrides = {}) {
  const deps = {
    store: createMemoryStore(),
    mailer: mailer(),
    now: NOW,
    origin: ORIGIN,
    limiter: createLimiter(),
    email: "reader@example.com",
    consent: true,
    ip: "203.0.113.10",
    ...overrides,
  };
  const result = await subscribe(deps);
  return { ...deps, result };
}

test("rejects a missing checkbox and a bad address before any write", async () => {
  const noConsent = await apply({ consent: false });
  assert.equal(noConsent.result.status, 400);
  assert.equal(await noConsent.store.getByEmail("reader@example.com"), null);

  const bad = await apply({ email: "not an email" });
  assert.equal(bad.result.body.error, "invalid_email");
  assert.equal(bad.mailer.sent.length, 0);
});

test("honeypot and a missing mailer store nothing", async () => {
  const trap = await apply({ trap: "filled" });
  assert.equal(trap.result.body.state, "check_inbox");
  assert.equal(trap.mailer.sent.length, 0);
  assert.equal(await trap.store.getByEmail("reader@example.com"), null);

  const closed = await apply({ mailer: { canSend: false, devExpose: false, async send() { return { ok: false }; } } });
  assert.equal(closed.result.status, 503);
  assert.equal(closed.result.body.error, "mailer_unconfigured");
  assert.equal(await closed.store.getByEmail("reader@example.com"), null);
});

test("failed send does not leave a pending row", async () => {
  const failed = await apply({
    mailer: { canSend: true, devExpose: false, async send() { return { ok: false }; } },
  });
  assert.equal(failed.result.body.error, "send_failed");
  assert.equal(await failed.store.getByEmail("reader@example.com"), null);
});

test("double opt-in keeps only the confirm hash and activates once", async () => {
  const { store, mailer, result } = await apply();
  assert.equal(result.status, 202);
  const saved = await store.getByEmail("reader@example.com");
  assert.equal(saved.status, "pending");
  assert.equal(saved.policyVersion, "2026-10-14");
  assert.equal("confirmToken" in saved, false);
  assert.match(saved.unsubscribeToken, /^[A-Za-z0-9_-]{43}$/);
  const confirmToken = tokenFrom(result.body.devConfirmUrl);
  assert.equal(saved.confirmTokenHash, await sha256Hex(confirmToken));
  assert.equal(mailer.sent[0].text.includes(confirmToken), true);
  assert.equal(JSON.stringify(saved).includes(confirmToken), false);

  const confirmed = await confirm({ store, token: confirmToken, now: NOW });
  assert.equal(confirmed.body.state, "active");
  const again = await confirm({ store, token: confirmToken, now: NOW });
  assert.equal(again.body.state, "active");
  assert.equal((await store.listActive()).length, 1);
});

test("expired confirm link does not activate", async () => {
  const { store, result } = await apply();
  const token = tokenFrom(result.body.devConfirmUrl);
  const expired = await confirm({ store, token, now: NOW + 48 * 60 * 60 * 1000 });
  assert.equal(expired.body.error, "expired");
  assert.equal((await store.getByEmail("reader@example.com")).status, "pending");
});

test("unsubscribe is a tombstone and a new consent starts pending again", async () => {
  const first = await apply();
  const confirmToken = tokenFrom(first.result.body.devConfirmUrl);
  await confirm({ store: first.store, token: confirmToken, now: NOW });
  const unsubToken = (await first.store.getByEmail("reader@example.com")).unsubscribeToken;
  const removed = await unsubscribe({ store: first.store, token: unsubToken, now: NOW });
  assert.equal(removed.body.state, "unsubscribed");
  const repeat = await unsubscribe({ store: first.store, token: unsubToken, now: NOW });
  assert.equal(repeat.body.state, "unsubscribed");
  assert.equal((await first.store.listActive()).length, 0);

  const secondMailer = mailer();
  const again = await subscribe({
    store: first.store,
    mailer: secondMailer,
    now: NOW + 1000,
    origin: ORIGIN,
    email: "reader@example.com",
    consent: true,
    ip: "203.0.113.11",
  });
  assert.equal(again.body.state, "check_inbox");
  assert.equal((await first.store.getByEmail("reader@example.com")).status, "pending");
  assert.equal(secondMailer.sent.length, 1);
});

test("an active address does not get another confirm mail", async () => {
  const first = await apply();
  await confirm({ store: first.store, token: tokenFrom(first.result.body.devConfirmUrl), now: NOW });
  const quiet = mailer();
  const again = await subscribe({
    store: first.store,
    mailer: quiet,
    now: NOW,
    origin: ORIGIN,
    email: "reader@example.com",
    consent: true,
    ip: "203.0.113.12",
  });
  assert.equal(again.body.state, "check_inbox");
  assert.equal(quiet.sent.length, 0);
});

test("rate limit stops the third subscribe from the same network", async () => {
  const limiter = createLimiter({ limit: 2, windowMs: 1000 });
  const store = createMemoryStore();
  const first = await subscribe({ store, mailer: mailer(), now: NOW, origin: ORIGIN, limiter, email: "a@example.com", consent: true, ip: "198.51.100.8" });
  const second = await subscribe({ store, mailer: mailer(), now: NOW, origin: ORIGIN, limiter, email: "b@example.com", consent: true, ip: "198.51.100.8" });
  const third = await subscribe({ store, mailer: mailer(), now: NOW, origin: ORIGIN, limiter, email: "c@example.com", consent: true, ip: "198.51.100.8" });
  assert.equal(first.status, 202);
  assert.equal(second.status, 202);
  assert.equal(third.status, 429);
  assert.equal(await store.getByEmail("c@example.com"), null);
});

test("file store reloads the pending record", async () => {
  const dir = mkdtempSync(join(tmpdir(), "news-mail-"));
  const path = join(dir, "list.json");
  const store = createFileStore(path);
  const sent = mailer();
  const result = await subscribe({ store, mailer: sent, now: NOW, origin: ORIGIN, email: "file@example.com", consent: true, ip: "203.0.113.20" });
  const reloaded = createFileStore(path);
  const saved = await reloaded.getByEmail("file@example.com");
  assert.equal(saved.status, "pending");
  const confirmed = await confirm({ store: reloaded, token: tokenFrom(result.body.devConfirmUrl), now: NOW });
  assert.equal(confirmed.body.state, "active");
});

test("production mailer stays closed without a send switch", () => {
  assert.equal(createProductionMailer({}).canSend, false);
  assert.equal(createProductionMailer({ MAILING_LIST_SEND: "1", RESEND_API_KEY: "k" }).canSend, false);
  assert.equal(createProductionMailer({ MAILING_LIST_SEND: "1", RESEND_API_KEY: "k", MAILING_LIST_FROM: "OIYO <news@oiyo.net>" }).canSend, true);
  assert.equal(createProductionMailer({ MAILING_LIST_SEND: "1", RESEND_API_KEY: "k", MAILING_LIST_FROM: "OIYO <news@oiyo.net>" }).devExpose, false);
});

test("production mailer identifies the app and preserves provider idempotency", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return { ok: true };
  };
  try {
    const sender = createProductionMailer({ MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only", MAILING_LIST_FROM: "OIYO <test@example.com>" });
    assert.deepEqual(await sender.send({ to: "recipient@example.com", subject: "Test", text: "Test body", idempotencyKey: "stable-key" }), { ok: true });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, "https://api.resend.com/emails");
    assert.equal(requests[0].options.headers["User-Agent"], "OIYO-News/1.0");
    assert.equal(requests[0].options.headers["Idempotency-Key"], "stable-key");
    assert.equal(JSON.parse(requests[0].options.body).to, "recipient@example.com");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("kv store round-trips a record without keeping a replaced confirm hash", async () => {
  const bucket = new Map();
  const kv = {
    async get(key) { return bucket.has(key) ? bucket.get(key) : null; },
    async put(key, value) { bucket.set(key, value); },
    async delete(key) { bucket.delete(key); },
  };
  const store = createKvStore(kv);
  await store.save({
    email: "kv@example.com",
    status: "pending",
    confirmTokenHash: "abc",
    unsubscribeTokenHash: "def",
    unsubscribeToken: "token",
  });
  await store.save({
    email: "kv@example.com",
    status: "active",
    confirmTokenHash: null,
    unsubscribeTokenHash: "def",
    unsubscribeToken: "token",
  }, { confirmTokenHash: "abc", unsubscribeTokenHash: "def" });
  assert.equal(bucket.has("c:abc"), false);
  assert.equal(await store.getByEmail("kv@example.com").then((row) => row.status), "active");
});

test("http confirm form redirects and json subscribe does not echo the mailbox", async () => {
  const store = createMemoryStore();
  const sent = mailer();
  const deps = { store, mailer: sent, origin: ORIGIN, limiter: createLimiter(), now: NOW };
  const request = new Request("http://127.0.0.1:8788/api/mailing-list/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email: "json@example.com", consent: true, company: "" }),
  });
  const response = await handleMailingRequest(request, deps);
  const body = await response.json();
  assert.equal(response.status, 202);
  assert.equal(JSON.stringify(body).includes("json@example.com"), false);
  assert.match(body.devConfirmUrl, /\/subscribe\/confirm\/\?token=/);

  const form = new Request("http://127.0.0.1:8788/api/mailing-list/confirm", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "text/html" },
    body: `token=${encodeURIComponent(tokenFrom(body.devConfirmUrl))}`,
  });
  const redirected = await handleMailingRequest(form, deps);
  assert.equal(redirected.status, 303);
  assert.equal(new URL(redirected.headers.get("location")).searchParams.get("status"), "active");
});

test("digest keeps our summary, drops excerpts and internal notes", () => {
  const digest = buildDigest({
    date: "2026-10-14",
    summary: "모델 발표가 하루에 몰렸습니다.\n\n오이요에 적용할 아이디어는 배제합니다.",
    pageUrl: "https://news.oiyo.net/2026-10-14/",
    items: [
      { title: "공개 글", url: "https://example.com/a", detailSummary: "한국어 요약입니다.", detailExcerpt: "원문 문장을 그대로 옮긴 부분" },
      { title: "메모", url: "https://example.com/b", detailSummary: "빈 배열을 반환합니다" },
      { title: "위험한 주소", url: "http://example.com/c", detailSummary: "빼야 합니다" },
    ],
  });
  assert.match(digest.text, /한국어 요약입니다/);
  assert.equal(digest.text.includes("원문 문장을 그대로"), false);
  assert.equal(digest.text.includes("오이요"), false);
  assert.equal(digest.text.includes("빈 배열"), false);
  assert.equal(digest.text.includes("http://example.com"), false);
  assert.match(digest.subject, /^\[광고\]/);
});

test("weekly digest keeps three items a day for seven days", () => {
  const days = [
    { date: "2026-10-07", items: [{ title: "창밖", url: "https://example.com/old", score: 99 }] },
    {
      date: "2026-10-08",
      items: [
        { title: "낮음", url: "https://example.com/low", score: 1 },
        { title: "높음", url: "https://example.com/high", score: 5 },
        { title: "중간", url: "https://example.com/mid", score: 3 },
        { title: "탈락", url: "https://example.com/drop", score: 0 },
      ],
    },
    { date: "2026-10-14", items: [{ title: "오늘", url: "https://example.com/today", score: 1 }] },
  ];
  const week = selectWeeklyItems(days);
  assert.equal(week.start, "2026-10-08");
  assert.equal(week.through, "2026-10-14");
  assert.equal(week.items.some((item) => item.title === "창밖"), false);
  assert.equal(week.items.some((item) => item.title === "탈락"), false);
  assert.equal(week.items[0].title, "오늘");
  const digest = buildDigest({
    date: week.start,
    through: week.through,
    items: week.items,
    pageUrl: "https://news.oiyo.net/archive/",
  });
  assert.match(digest.subject, /2026-10-08 ~ 2026-10-14/);
  assert.match(digest.text, /일주일에 한 통/);
  assert.match(digest.text, /2026-10-14\n오늘/);
  assert.equal(digest.text.includes("탈락"), false);
  assert.equal(digest.text.includes("창밖"), false);
});

test("digest memo patterns still match the site filter", () => {
  const feed = readFileSync(resolve(import.meta.dirname, "../../src/lib/feed.ts"), "utf8");
  const block = feed.slice(feed.indexOf("INTERNAL_MEMO_PATTERNS"), feed.indexOf("export function isInternalMemo"));
  for (const source of ["빈\\s*배열", "반환합니다", "당사", "저희", "오이요", "oiyo", "수집\\s*공백"]) {
    assert.equal(block.includes(source), true, source);
  }
});

test("send flag without a mailer exits 2", () => {
  const root = resolve(import.meta.dirname, "../..");
  const result = spawnSync(process.execPath, ["scripts/render-mailing-digest.mjs", "--send"], {
    cwd: root,
    env: { ...process.env, MAILING_LIST_SEND: "", RESEND_API_KEY: "", MAILING_LIST_FROM: "" },
    encoding: "utf8",
  });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /보내지 않았습니다/);
});
