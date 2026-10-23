import { AsyncLocalStorage } from "node:async_hooks";
import { createHash, randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";

/** Feed responses, not article bodies: keep evidence before filtering or AI work.
 * 2026-10-23: Grok's execution allowance must not determine whether raw evidence survives.
 * No publication, model invocation, retention deletion or scheduler installation here.
 */
export function createRawArchive({ directory, date, dryRun }) {
  if (!directory || !/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error("raw collection requires --raw-dir PATH and a valid --date YYYY-MM-DD");
  }
  const root = resolve(directory);
  const context = new AsyncLocalStorage();
  const requests = [];
  const sources = [];
  const sha = (body) => createHash("sha256").update(body).digest("hex");

  function record(url, response) {
    const body = response.text ?? "";
    const source = context.getStore();
    const hash = body ? sha(body) : null;
    const bodyRef = hash ? `objects/${hash}.txt.gz` : null;
    let error = response.error;
    if (!error) {
      if (source === "hacker-news" || source === "lobsters") {
        try { JSON.parse(body); } catch { error = "invalid_json"; }
      } else if (source !== "github" && !(/<(rss|feed)\b/i.test(body) && /<\/(rss|feed)>|<(rss|feed)\b[^>]*\/>/i.test(body))) {
        error = "unrecognized_feed";
      } else if (source === "github" && !/<article\b/i.test(body)) {
        error = "unverified_trending_page"; // A challenge/login page is not a proven quiet day.
      }
    }
    if (hash && !dryRun) {
      mkdirSync(join(root, "objects"), { recursive: true });
      const path = join(root, bodyRef);
      try { writeFileSync(path, gzipSync(body), { flag: "wx" }); }
      catch (e) {
        if (e.code !== "EEXIST") throw e;
        // Do not overwrite a corrupt sole original or silently certify it on a retry.
        if (sha(gunzipSync(readFileSync(path))) !== hash) throw new Error("raw_object_integrity_failure");
      }
    }
    requests.push({ source_id: source, url, fetched_at: new Date().toISOString(), http_status: response.status,
      content_type: null, body_encoding: "utf8-text", content_hash: hash, body_ref: bodyRef, error: error ?? null,
      rights_policy: "internal-source-evidence-not-republication", from_cache: response.fromCache === true });
  }

  async function runSource(id, load) {
    let items = [];
    let error = null;
    await context.run(id, async () => {
      try { items = await load(); }
      catch { error = "source_parse_or_archive_failure"; }
    });
    const rows = requests.filter((row) => row.source_id === id);
    const good = rows.filter((row) => row.http_status === 200 && !row.error && !row.from_cache).length;
    const bad = error || rows.length === 0 || good < rows.length;
    const state = bad ? (good ? "partial" : "failed") : items.length ? "ok" : "empty";
    sources.push({ source_id: id, state, item_count: items.length, error });
  }

  function finish() {
    sources.sort((a, b) => a.source_id.localeCompare(b.source_id));
    const failed = sources.filter((source) => source.state === "failed" || source.state === "partial").length;
    const state = failed ? (failed === sources.length && sources.every((source) => source.state === "failed") ? "failed" : "partial")
      : sources.some((source) => source.item_count) ? "ok" : "empty";
    const manifest = { schema: "oiyo-raw-news-v1", run_id: randomUUID(), collection_date: date,
      finished_at: new Date().toISOString(), scope: "feed-responses-not-full-articles",
      count_basis: "existing-adapter-window-and-limit", state, dry_run: dryRun,
      sources, requests };
    if (!dryRun) {
      mkdirSync(join(root, "runs"), { recursive: true });
      writeFileSync(join(root, "runs", `${date}-${manifest.run_id}.json`), `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
    }
    return manifest;
  }
  return { record, runSource, finish };
}
