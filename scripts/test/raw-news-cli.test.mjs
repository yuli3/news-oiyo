import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { gunzipSync } from "node:zlib";

const root = fileURLToPath(new URL("../../", import.meta.url));
const feed = '<rss><channel><item><title>Official release</title><link>https://example.org/release</link><description>Source text, not an AI summary.</description></item></channel></rss>';

function sandbox(body = feed, status = 200, sources = "openai-news", date = "2026-10-23") {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "raw-news-cli-")));
  const preload = join(dir, "network.mjs");
  writeFileSync(preload, `globalThis.fetch = async (url) => {
    if (String(url) === "https://deepmind.google/blog/rss.xml") return new Response("Forbidden", {status:403});
    if (String(url) !== "https://openai.com/news/rss.xml") throw new Error("Unexpected network destination");
    return new Response(${JSON.stringify(body)}, {status:${status},headers:{"content-type":"application/rss+xml"}});
  };`);
  const data = join(dir, "raw");
  return { dir, data, run: (...extra) => spawnSync(process.execPath, [
    "--permission", `--allow-fs-read=${root}`, `--allow-fs-read=${dir}`, `--allow-fs-write=${dir}`,
    "--import", preload, resolve(root, "scripts/collect-news.mjs"),
    "--raw-only", "--raw-dir", data, "--source", sources, "--date", date, ...extra,
  ], { cwd: dir, encoding: "utf8", timeout: 30_000, env: { ...process.env, REDDIT_GAP_MS: "0", NEWS_FETCH_CACHE_DIR: join(dir, "cache"), OPENAI_API_KEY: "", ANTHROPIC_API_KEY: "", OLLAMA_HOST: "http://127.0.0.1:1" } }) };
}

test("public raw CLI saves source response and manifest without a model or publishing", () => {
  const env = sandbox();
  const published = readFileSync(join(root, "src/data/news.json"));
  const result = env.run();
  assert.equal(result.status, 0, result.stderr);
  const manifest = JSON.parse(result.stdout);
  assert.equal(manifest.state, "ok");
  assert.equal(manifest.sources[0].source_id, "openai-news");
  assert.equal(manifest.sources[0].item_count, 1);
  assert.equal(gunzipSync(readFileSync(join(env.data, manifest.requests[0].body_ref))).toString(), feed);
  assert.equal(readdirSync(join(env.data, "runs")).length, 1);
  assert.deepEqual(readFileSync(join(root, "src/data/news.json")), published);
});

test("a valid quiet feed is empty, not a network failure", () => {
  const env = sandbox("<rss><channel></channel></rss>");
  const result = env.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).state, "empty");
  assert.equal(JSON.parse(result.stdout).sources[0].item_count, 0);
});

test("HTTP failure is recorded as failed, never certified as an empty feed", () => {
  const result = sandbox("Forbidden", 403).run();
  assert.equal(result.status, 1);
  const manifest = JSON.parse(result.stdout);
  assert.equal(manifest.state, "failed");
  assert.equal(manifest.requests[0].http_status, 403);
  assert.equal(manifest.requests[0].body_ref, null);
});

test("a 200 challenge page is not accepted as a quiet feed", () => {
  const result = sandbox("<html><body>Please log in</body></html>").run();
  assert.equal(result.status, 1);
  assert.equal(JSON.parse(result.stdout).requests[0].error, "unrecognized_feed");
});

test("repeat runs preserve both receipts but store the unchanged body only once", () => {
  const env = sandbox();
  const first = env.run(), second = env.run();
  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.status, 0, second.stderr);
  assert.equal(readdirSync(join(env.data, "objects")).length, 1);
  assert.equal(readdirSync(join(env.data, "runs")).length, 2);
  assert.equal(JSON.parse(first.stdout).requests[0].content_hash, JSON.parse(second.stdout).requests[0].content_hash);
});

test("dry run and help write no archive; unknown options fail safely", () => {
  const env = sandbox();
  assert.equal(env.run("--dry-run").status, 0);
  assert.equal(env.run("--help").status, 0);
  assert.equal(env.run("--force").status, 1);
  assert.deepEqual(readdirSync(env.dir), ["network.mjs"]);
});

test("a failed source cannot hide a successful source or turn a partial run into success", () => {
  const env = sandbox(feed, 200, "openai-news,deepmind-blog");
  const result = env.run();
  assert.equal(result.status, 1);
  const manifest = JSON.parse(result.stdout);
  assert.equal(manifest.state, "partial");
  assert.deepEqual(manifest.sources.map((source) => [source.source_id, source.state]), [["deepmind-blog", "failed"], ["openai-news", "ok"]]);
  assert.equal(readdirSync(join(env.data, "objects")).length, 1);
});

test("an unregistered source fails without creating an archive", () => {
  const env = sandbox(feed, 200, "unregistered-source");
  assert.equal(env.run().status, 1);
  assert.deepEqual(readdirSync(env.dir), ["network.mjs"]);
});

test("an impossible date fails without creating an archive", () => {
  const env = sandbox(feed, 200, "openai-news", "2026-02-30");
  assert.equal(env.run().status, 1);
  assert.deepEqual(readdirSync(env.dir), ["network.mjs"]);
});

test("corrupt existing evidence is preserved and cannot become a successful receipt", () => {
  const env = sandbox();
  const first = env.run();
  assert.equal(first.status, 0, first.stderr);
  const ref = JSON.parse(first.stdout).requests[0].body_ref;
  writeFileSync(join(env.data, ref), "corrupt original");
  const second = env.run();
  assert.equal(second.status, 1);
  assert.equal(JSON.parse(second.stdout).state, "failed");
  assert.equal(readFileSync(join(env.data, ref), "utf8"), "corrupt original");
});
