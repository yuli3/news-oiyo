// node --test scripts/test/  — collector fetch 회귀 테스트 (2026-10-10)
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.NEWS_FETCH_CACHE_DIR = mkdtempSync(join(tmpdir(), "news-cache-"));
const { isThinExcerpt, extractExcerpt } = await import("../lib/fetch-article.mjs");
const { politeGet, retryAfterMs, backoffMs } = await import("../lib/polite-fetch.mjs");

test("reddit 'submitted by' stub is thin", () => {
  assert.equal(isThinExcerpt("submitted by /u/kroggens [link] [comments]"), true);
  assert.equal(isThinExcerpt("submitted by /u/kroggens"), true);
});

test("site tagline is thin", () => {
  assert.equal(isThinExcerpt("We’re on a journey to advance and democratize artificial intelligence through open source and open science."), true);
});

test("real article text is not thin", () => {
  assert.equal(isThinExcerpt("Discover how Sophos uses OpenAI’s Daybreak to cut cyber-threat investigation time by 96% and automate 52% of MDR cases."), false);
});

test("extractExcerpt skips thin og:description for body paragraphs", () => {
  const html = `<html><head><meta property="og:description" content="We’re on a journey to advance and democratize artificial intelligence through open source and open science."></head>
  <body><p>VeriLoop-E2 is a 7B vision-language-action model trained on 40k hours of teleoperation data for closed-loop manipulation.</p></body></html>`;
  const r = extractExcerpt(html);
  assert.equal(r.excerptSource, "body");
  assert.match(r.excerptText, /VeriLoop-E2/);
});

test("extractExcerpt flags thin when nothing better exists", () => {
  const r = extractExcerpt(`<meta name="description" content="submitted by /u/x">`);
  assert.equal(r.thin, true);
});

test("retryAfterMs parses seconds and caps", () => {
  assert.equal(retryAfterMs("5"), 5000);
  assert.equal(retryAfterMs("9999", Date.now(), 60_000), 60_000);
  assert.equal(retryAfterMs(null), null);
});

test("backoffMs grows and is capped", () => {
  assert.equal(backoffMs(0, { baseMs: 1000, random: () => 1 }), 1000);
  assert.equal(backoffMs(10, { baseMs: 1000, maxMs: 8000, random: () => 1 }), 8000);
});

const resp = (status, body = "", headers = {}) => new Response(body, { status, headers });

test("politeGet retries 429 honoring Retry-After then succeeds and caches", async () => {
  const waits = [];
  const seq = [resp(429, "", { "retry-after": "2" }), resp(200, "<feed/>")];
  const r = await politeGet("https://example.test/a", {
    fetchImpl: async () => seq.shift(), sleepImpl: async (ms) => waits.push(ms), cacheKey: "t-a", log: () => {},
  });
  assert.equal(r.text, "<feed/>");
  assert.deepEqual(waits, [2000]);
  const again = await politeGet("https://example.test/a", { fetchImpl: async () => { throw new Error("no net"); }, cacheKey: "t-a", ttlMs: 60_000, log: () => {} });
  assert.equal(again.fromCache, true);
});

test("politeGet falls back to stale cache after persistent 429", async () => {
  await politeGet("https://example.test/b", { fetchImpl: async () => resp(200, "old"), cacheKey: "t-b", log: () => {} });
  const r = await politeGet("https://example.test/b", {
    fetchImpl: async () => resp(429), sleepImpl: async () => {}, retries: 2, cacheKey: "t-b", log: () => {},
  });
  assert.equal(r.stale, true);
  assert.equal(r.text, "old");
});

test("politeGet does not retry 403 (no challenge workaround)", async () => {
  let calls = 0;
  const r = await politeGet("https://example.test/c", { fetchImpl: async () => { calls++; return resp(403); }, sleepImpl: async () => {}, log: () => {} });
  assert.equal(calls, 1);
  assert.equal(r.error, "HTTP 403");
});

test("politeGet waits x-ratelimit-reset when no Retry-After", async () => {
  const waits = [];
  const seq = [resp(429, "", { "x-ratelimit-remaining": "0.0", "x-ratelimit-reset": "53" }), resp(200, "ok", { "x-ratelimit-remaining": "0.0", "x-ratelimit-reset": "60" })];
  const r = await politeGet("https://example.test/d", { fetchImpl: async () => seq.shift(), sleepImpl: async (ms) => waits.push(ms), maxWaitMs: 75_000, log: () => {} });
  assert.deepEqual(waits, [54_000]);
  assert.equal(r.rateLimit.resetMs, 60_000);
  assert.equal(r.rateLimit.remaining, 0);
});

test("leaked CSS is thin", () => {
  assert.equal(isThinExcerpt(".a-svg--picto-podcast{background:url('data:image/svg+xml;charset=utf-8,%3Csvg') no-repeat} more text more text"), true);
});
