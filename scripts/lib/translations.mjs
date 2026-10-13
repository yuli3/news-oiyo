// Agent-authored Korean summaries + long translations (2026-10-13).
// SSOT: src/data/translations/<date>/<item-id>.md — one file per item, front matter
// + markdown body. sync-news.mjs overlays these onto news.json on every run, so a
// re-sync never loses them. See docs/translation-workflow.md.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const TRANSLATIONS_DIR = join(__dirname, "..", "..", "src", "data", "translations");

export const TRANSLATION_STATUSES = new Set(["full", "partial", "blocked"]);
/** Minimum Korean body length (chars, whitespace excluded) per status. */
export const MIN_BODY_CHARS = { full: 600, partial: 400, blocked: 300 };
export const SUMMARY_MAX = 240;
/** Floor when the original itself is short (e.g. a 5-line Reddit post); set `sourceShort: true`. Never pad. */
export const MIN_BODY_CHARS_SHORT_SOURCE = 300;

function parseScalar(raw) {
  const v = raw.trim();
  if (v.startsWith('"')) return JSON.parse(v);
  return v;
}

/** Parse one translation file. Throws on malformed front matter. */
export function parseTranslation(text, file = "<input>") {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const i = line.indexOf(":");
    if (i < 0) throw new Error(`${file}: bad front matter line: ${line}`);
    meta[line.slice(0, i).trim()] = parseScalar(line.slice(i + 1));
  }
  return { ...meta, body: m[2].trim() };
}

/** Load every translation file for a date (or all dates) → Map<id, record>. */
export function loadTranslations({ date = null, dir = TRANSLATIONS_DIR } = {}) {
  const out = new Map();
  if (!existsSync(dir)) return out;
  const dates = readdirSync(dir).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && (!date || d === date));
  for (const d of dates) {
    for (const f of readdirSync(join(dir, d)).filter((x) => x.endsWith(".md"))) {
      const rec = parseTranslation(readFileSync(join(dir, d, f), "utf8"), `${d}/${f}`);
      if (!rec.id) rec.id = f.replace(/\.md$/, "");
      out.set(rec.id, { ...rec, date: d, file: join(d, f) });
    }
  }
  return out;
}

export function bodyChars(text) {
  return String(text ?? "").replace(/\s+/g, "").length;
}

/** Overlay a translation record onto a news item (mutates and returns item). */
export function applyTranslation(item, rec) {
  if (!rec) return item;
  if (rec.summary) {
    item.summary = rec.summary;
    item.detailSummary = rec.summary;
    item.summaryAuthoredBy = rec.translatedBy ?? "agent";
    if (item.detailStatus !== "ok") item.detailStatus = "ok";
  }
  if (rec.body) {
    item.translationKo = rec.body;
    item.translationStatus = TRANSLATION_STATUSES.has(rec.translationStatus) ? rec.translationStatus : "partial";
    if (rec.translatedBy) item.translatedBy = rec.translatedBy;
    if (rec.translatedAt) item.translatedAt = rec.translatedAt;
  }
  return item;
}
