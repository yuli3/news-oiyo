#!/usr/bin/env node
// Gate: every item of the checked day has an authored summary and a substantive
// Korean translation. Exits 1 on any failure (CI/agent friendly).
// usage:
//   node scripts/check-translations.mjs                   # newest day in news.json
//   node scripts/check-translations.mjs --date 2026-10-13
//   node scripts/check-translations.mjs --report          # print per-item lengths
// Rules: docs/translation-workflow.md
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTranslations, bodyChars, MIN_BODY_CHARS, MIN_BODY_CHARS_SHORT_SOURCE, SUMMARY_MAX, TRANSLATION_STATUSES } from "./lib/translations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const news = JSON.parse(readFileSync(join(__dirname, "..", "src", "data", "news.json"), "utf8"));
const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : null; };
const date = arg("date") ?? news.days?.[0]?.date;
const day = (news.days ?? []).find((d) => d.date === date);
if (!day) { console.error(`no day ${date} in news.json`); process.exit(1); }

const recs = loadTranslations({ date });
const problems = [];
const lengths = [];
const counts = { full: 0, partial: 0, blocked: 0 };
for (const it of day.items) {
  const rec = recs.get(it.id);
  if (!rec) { problems.push(`${it.id} missing translation file (${it.title})`); continue; }
  const status = rec.translationStatus;
  if (!TRANSLATION_STATUSES.has(status)) problems.push(`${it.id} bad translationStatus "${status}"`);
  else counts[status]++;
  const summary = String(rec.summary ?? "").trim();
  if (!summary) problems.push(`${it.id} empty summary`);
  if (summary.length > SUMMARY_MAX) problems.push(`${it.id} summary ${summary.length} > ${SUMMARY_MAX} chars`);
  const n = bodyChars(rec.body);
  lengths.push(n);
  const min = rec.sourceShort === "true" ? MIN_BODY_CHARS_SHORT_SOURCE : (MIN_BODY_CHARS[status] ?? MIN_BODY_CHARS.full);
  if (n < min) problems.push(`${it.id} translation ${n} chars < ${min} (${status})`);
  if (!rec.translatedBy || !rec.translatedAt) problems.push(`${it.id} missing translatedBy/translatedAt`);
  if (rec.sourceUrl && rec.sourceUrl !== it.url) problems.push(`${it.id} sourceUrl differs from item url`);
  if (it.translationKo !== rec.body) problems.push(`${it.id} news.json not synced — run npm run sync`);
  if (argv.includes("--report")) console.log(`${String(n).padStart(5)} ${status.padEnd(7)} ${it.id} ${it.title.slice(0, 60)}`);
}
const avg = lengths.length ? Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length) : 0;
console.log(`${date}: items=${day.items.length} translated=${recs.size} full=${counts.full} partial=${counts.partial} blocked=${counts.blocked} avgChars(no-space)=${avg}`);
if (problems.length) {
  for (const p of problems) console.error(`FAIL ${p}`);
  process.exit(1);
}
console.log("translations check: PASS");
