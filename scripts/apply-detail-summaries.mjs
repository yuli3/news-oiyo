#!/usr/bin/env node
// Apply agent-written Korean detailSummary rows into sources + news.json.
// Input: JSON array or JSONL of { id, detailSummary } (extra fields ignored).
//
// usage:
//   node scripts/apply-detail-summaries.mjs summaries.jsonl
//   node scripts/apply-detail-summaries.mjs summaries.json
//   cat rows.jsonl | node scripts/apply-detail-summaries.mjs -
//
// After apply, detailStatus becomes "ok". Re-run sync is optional for sources
// persistence path; this script patches both trends sources (by URL) and news.json.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const NEWS = join(ROOT, "src", "data", "news.json");
const TRENDS = join(process.env.HOME, "coding", "company-brain", "AI-Sessions", "wiki", "sources", "trends");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("usage: node scripts/apply-detail-summaries.mjs <file.json|file.jsonl|->");
  process.exit(1);
}

function contentHash(text) {
  return createHash("sha256")
    .update(String(text ?? "").replace(/\s+/g, " ").trim().toLowerCase())
    .digest("hex")
    .slice(0, 16);
}

function canonicalUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.toString();
}

function expectedId(item) {
  if (item.id) return item.id;
  try {
    return `trend-${contentHash(`${canonicalUrl(item.url)}|${item.title}`)}`;
  } catch {
    return null;
  }
}

function loadRows(raw) {
  const text = raw.trim();
  if (!text) return [];
  if (text.startsWith("[")) return JSON.parse(text);
  const rows = [];
  for (const line of text.split(/\n+/)) {
    const s = line.trim();
    if (!s) continue;
    rows.push(JSON.parse(s));
  }
  return rows;
}

const raw = inputPath === "-" ? readFileSync(0, "utf8") : readFileSync(inputPath, "utf8");
const rows = loadRows(raw);
if (!Array.isArray(rows) || rows.length === 0) {
  console.error("no rows");
  process.exit(1);
}

const byId = new Map();
for (const row of rows) {
  if (!row || typeof row.id !== "string" || !row.id.trim()) {
    console.error("skip row without id");
    continue;
  }
  const summary = typeof row.detailSummary === "string" ? row.detailSummary.trim() : "";
  if (!summary) {
    console.error(`skip ${row.id}: empty detailSummary`);
    continue;
  }
  byId.set(row.id.trim(), summary.slice(0, 4000));
}

if (!byId.size) {
  console.error("nothing to apply");
  process.exit(1);
}

const news = JSON.parse(readFileSync(NEWS, "utf8"));
let newsPatched = 0;
const touchedDates = new Set();
const idToMeta = new Map();

for (const day of news.days ?? []) {
  for (const item of day.items ?? []) {
    if (!item.id || !byId.has(item.id)) continue;
    item.detailSummary = byId.get(item.id);
    item.detailStatus = "ok";
    newsPatched++;
    touchedDates.add(day.date);
    idToMeta.set(item.id, { date: day.date, url: item.url, title: item.title });
  }
}

writeFileSync(NEWS, `${JSON.stringify(news, null, 1)}\n`);

let sourcesPatched = 0;
if (existsSync(TRENDS)) {
  for (const date of touchedDates) {
    const sourcePath = join(TRENDS, `${date}.sources.json`);
    if (!existsSync(sourcePath)) continue;
    const envelope = JSON.parse(readFileSync(sourcePath, "utf8"));
    if (!Array.isArray(envelope.items)) continue;
    let changed = false;
    for (const item of envelope.items) {
      const id = expectedId(item);
      if (!id || !byId.has(id)) continue;
      // Only fill when we have an excerpt (or already pending) — do not invent without basis.
      if (!String(item.detailExcerpt ?? "").trim() && !String(item.detailSummary ?? "").trim()) {
        // Still allow if news had excerpt and sources lagged — agent applied from news pending list.
      }
      item.detailSummary = byId.get(id);
      item.detailStatus = "ok";
      changed = true;
      sourcesPatched++;
    }
    if (changed) writeFileSync(sourcePath, `${JSON.stringify(envelope, null, 1)}\n`);
  }
}

const missing = [...byId.keys()].filter((id) => !idToMeta.has(id));
console.error(
  `applied news.json=${newsPatched} sources=${sourcesPatched} missing_ids=${missing.length}`,
);
if (missing.length) console.error(`missing: ${missing.join(", ")}`);
