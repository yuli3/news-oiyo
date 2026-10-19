import { test } from "node:test";
import assert from "node:assert/strict";
import { handleMailingRequest } from "../../functions/lib/http.mjs";
import { buildLaunchNotice } from "../../functions/lib/launch-notice.mjs";
import { buildConfirmMail, createLimiter, normalizeLang, subscribe } from "../../functions/lib/mailing-list.mjs";
import { createMemoryStore } from "../../functions/lib/stores.mjs";

const NOW = Date.parse("2026-10-19T03:00:00.000Z");
const ORIGIN = "http://127.0.0.1:4321";

function mailer() {
  const sent = [];
  return { sent, canSend: true, async send(message) { sent.push(message); return { ok: true }; } };
}

test("English applies only to the new-year alert; anything else stays Korean", () => {
  assert.equal(normalizeLang("en", "new-year-2027"), "en");
  assert.equal(normalizeLang("en", "weekly"), "ko");
  assert.equal(normalizeLang("fr", "new-year-2027"), "ko");
  assert.equal(normalizeLang(undefined, "new-year-2027"), "ko");
});

test("English new-year signup gets an English confirmation and keeps lang on the record", async () => {
  const store = createMemoryStore();
  const out = mailer();
  const result = await subscribe({ store, mailer: out, now: NOW, origin: ORIGIN, limiter: createLimiter(),
    email: "reader@example.com", consent: true, topic: "new-year-2027", lang: "en", ip: "203.0.113.10" });
  assert.equal(result.status, 202);
  assert.match(out.sent[0].subject, /Confirm your 2027 New Year report alert/);
  assert.match(out.sent[0].text, /\/subscribe\/confirm\/\?token=/);
  assert.match(out.sent[0].text, /Unsubscribe:\n.*\/subscribe\/unsubscribe\/\?token=/);
  const record = await store.getByEmail("reader@example.com");
  assert.deepEqual(record.topics, ["new-year-2027"]);
  assert.equal(record.lang, "en");
});

test("weekly signup ignores lang=en", () => {
  const mail = buildConfirmMail({ origin: ORIGIN, confirmToken: "a".repeat(43), unsubToken: "b".repeat(43), topic: "weekly", lang: "en" });
  assert.match(mail.subject, /AI·금융/);
});

test("no-JS English form returns to the English page", async () => {
  const request = new Request(`${ORIGIN}/api/mailing-list/subscribe`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "text/html", origin: ORIGIN },
    body: "email=reader%40example.com&topic=new-year-2027&lang=en",
  });
  const response = await handleMailingRequest(request, { store: createMemoryStore(), mailer: mailer(), origin: ORIGIN, now: NOW });
  assert.equal(response.status, 303);
  const location = new URL(response.headers.get("location"));
  assert.equal(location.pathname, "/subscribe/new-year-2027/en/");
  assert.equal(location.searchParams.get("status"), "consent_required");
});

test("launch notice keeps the Korean ad header first and adds an English paragraph", () => {
  const notice = buildLaunchNotice({ launchUrl: "https://oiyo.net/ko/saju/new-year-2027/" });
  assert.ok(notice.subject.startsWith("(광고)"));
  assert.match(notice.text, /수신 거부 링크는 받는 사람마다 따로 붙습니다\./);
  assert.match(notice.text, /— English —/);
});
