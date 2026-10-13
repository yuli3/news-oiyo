// npm test  (Node 22.18+ 는 .ts 를 그대로 읽는다)
import assert from "node:assert/strict";
import { test } from "node:test";
import { LIMITS, checkBody, checkNickname, checkTitle, cleanText, countLinks, isId, isThreadKey } from "../server/rules.ts";
import { safeReturnTo } from "../server/oauth.ts";

const old = { accountAgeMs: LIMITS.newAccountMs + 1 };
const fresh = { accountAgeMs: 1000 };

test("thread keys", () => {
  assert.ok(isThreadKey("day:2026-10-13"));
  assert.ok(isThreadKey("item:trend-d7055c7c4b023984"));
  assert.ok(isThreadKey("post:8kNMjNcXnhFs4pgB"));
  for (const bad of ["day:2026-1-1", "item:x", "post:short", "post:../../etc", "day:2026-10-13 ", 42, null]) assert.equal(isThreadKey(bad), false, String(bad));
});

test("ids", () => {
  assert.ok(isId("8kNMjNcXnhFs4pgB"));
  assert.equal(isId("a'; DROP TABLE"), false);
});

test("cleanText strips control and bidi characters and folds blank lines", () => {
  assert.equal(cleanText(" a‮b\u0000c\r\n\n\n\nd "), "abc\n\nd");
});

test("links", () => {
  assert.equal(countLinks("see https://a.com and www.b.kr or spam.co.kr"), 3);
  assert.equal(countLinks("그냥 글이에요 3.5배"), 0);
  assert.equal(checkBody("https://a.com", 100, fresh).ok, false);
  assert.equal(checkBody("https://a.com", 100, old).ok, true);
  assert.equal(checkBody("https://a.com https://b.com https://c.com", 100, old).ok, false);
});

test("body limits", () => {
  assert.equal(checkBody("   ", 100, old).ok, false);
  assert.equal(checkBody("가".repeat(101), 100, old).ok, false);
  assert.equal(checkBody("ㅋ".repeat(30), 100, old).ok, false);
  assert.deepEqual(checkBody("  좋은 뉴스네요  ", 100, old), { ok: true, value: "좋은 뉴스네요" });
});

test("nicknames", () => {
  assert.deepEqual(checkNickname(" 뉴스  덕후 "), { ok: true, value: "뉴스 덕후" });
  for (const bad of ["a", "열일곱글자가넘는아주긴닉네임입니다요", "<script>", "운영자", "OIYO팀", 3]) assert.equal(checkNickname(bad).ok, false, String(bad));
});

test("titles", () => {
  assert.equal(checkTitle("").ok, false);
  assert.equal(checkTitle("x".repeat(81)).ok, false);
  assert.deepEqual(checkTitle(" 질문 \n 있어요 "), { ok: true, value: "질문 있어요" });
});

test("login return path stays on this site", () => {
  assert.equal(safeReturnTo("/2026-10-13/"), "/2026-10-13/");
  for (const bad of ["//evil.com", "https://evil.com", "/\\evil.com", null, ""]) assert.equal(safeReturnTo(bad), "/", String(bad));
});
