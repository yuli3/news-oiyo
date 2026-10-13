// node --test scripts/test/  — X 트렌딩 병합 회귀 테스트 (2026-10-13)
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const { validateXTrending, mergeXTrending, normalizeUrl } = await import("../lib/x-trending.mjs");
const SAMPLE = fileURLToPath(new URL("../../data/x-trending/2026-10-13.json", import.meta.url));
const NEWS = fileURLToPath(new URL("../../src/data/news.json", import.meta.url));
const CLI = fileURLToPath(new URL("../sync-x-trending.mjs", import.meta.url));
const sample = () => JSON.parse(readFileSync(SAMPLE, "utf8"));
const NOW = Date.parse("2026-10-13T07:00:00+09:00");

test("checked-in sample passes the schema", () => {
  assert.doesNotThrow(() => validateXTrending(sample()));
});

test("schema rejects a missing field, an unknown field and a wrong version", () => {
  const missing = sample();
  delete missing.posts[0].metrics;
  assert.throws(() => validateXTrending(missing), /metrics: required/);
  const unknown = sample();
  unknown.posts[0].embed_html = "<blockquote></blockquote>";
  assert.throws(() => validateXTrending(unknown), /unknown field/);
  const version = sample();
  version.schema = "x-trending/v2";
  assert.throws(() => validateXTrending(version), /invalid constant/);
});

test("schema rejects a non-HTTPS link and a URL that does not match its post id", () => {
  const http = sample();
  http.posts[0].links = ["http://example.com/a"];
  assert.throws(() => validateXTrending(http), /links\[0\]: invalid/);
  const mismatch = sample();
  mismatch.posts[0].url = "https://x.com/example/status/999";
  assert.throws(() => validateXTrending(mismatch), /mismatch/);
});

test("merge keeps a new post in the isolated block and leaves days untouched", () => {
  const news = { generatedAt: "x", days: [{ date: "2026-10-12", items: [{ id: "n1", url: "https://example.org/other", title: "Unrelated headline about databases" }] }] };
  const merged = mergeXTrending(news, sample(), { now: NOW });
  assert.equal(merged.x_trending.posts.length, 1);
  assert.equal(merged.x_trending.hidden, false);
  assert.deepEqual(merged.days, news.days);
});

test("merge drops a post whose link is already a news item (URL dedup)", () => {
  const input = sample();
  input.posts[0].links = ["https://www.example.org/story/?utm_source=x"];
  const news = { days: [{ items: [{ id: "n1", url: "https://example.org/story", title: "Different words entirely" }] }] };
  const merged = mergeXTrending(news, input, { now: NOW });
  assert.equal(merged.x_trending.posts.length, 0);
  assert.deepEqual(merged.x_trending.duplicates.map(d => d.news_id), ["n1"]);
  assert.equal(normalizeUrl("https://twitter.com/a/status/1/?s=20#x"), "https://x.com/a/status/1");
});

test("merge drops a post whose text matches a news title (title dedup)", () => {
  const input = sample();
  const news = { days: [{ items: [{ id: "n2", url: "https://example.org/z", title: input.posts[0].text }] }] };
  assert.equal(mergeXTrending(news, input, { now: NOW }).x_trending.posts.length, 0);
});

test("score filter and the low-impression floor both drop posts", () => {
  assert.equal(mergeXTrending({ days: [] }, sample(), { now: NOW, minScore: 2 }).x_trending.posts.length, 0);
  const quiet = sample();
  quiet.posts[0].metrics.impression = 999;
  assert.equal(mergeXTrending({ days: [] }, quiet, { now: NOW }).x_trending.posts.length, 0);
});

test("a collection older than 30 hours is marked hidden", () => {
  assert.equal(mergeXTrending({ days: [] }, sample(), { now: NOW + 31 * 3600000 }).x_trending.hidden, true);
});

test("CLI exits 0 and leaves news.json untouched when the input file is absent", () => {
  const before = readFileSync(NEWS, "utf8");
  const r = spawnSync(process.execPath, [CLI, "--date", "1999-01-01"], { encoding: "utf8" });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /unchanged/);
  assert.equal(readFileSync(NEWS, "utf8"), before);
});

test("CLI exits 1 and leaves news.json untouched when the input fails the schema", () => {
  const before = readFileSync(NEWS, "utf8");
  const r = spawnSync(process.execPath, [CLI, "--input", "package.json"], { encoding: "utf8" });
  assert.equal(r.status, 1);
  assert.equal(readFileSync(NEWS, "utf8"), before);
});
