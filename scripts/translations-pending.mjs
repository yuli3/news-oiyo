#!/usr/bin/env node
// List a day's items that still need an agent-written summary + 본문 번역.
// usage:
//   node scripts/translations-pending.mjs                 # newest day in news.json
//   node scripts/translations-pending.mjs --date 2026-10-13
//   node scripts/translations-pending.mjs --json          # full rows (url, excerpt, discussionUrl)
// Output rows tell you which file to create: src/data/translations/<date>/<id>.md
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTranslations } from "./lib/translations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const news = JSON.parse(readFileSync(join(__dirname, "..", "src", "data", "news.json"), "utf8"));
const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : null; };
const date = arg("date") ?? news.days?.[0]?.date;
const day = (news.days ?? []).find((d) => d.date === date);
if (!day) { console.error(`no day ${date} in news.json — run npm run update first`); process.exit(1); }

const done = loadTranslations({ date });
const pending = day.items.filter((it) => !done.has(it.id));
console.error(`${date}: ${pending.length} pending of ${day.items.length} (translated ${day.items.length - pending.length})`);
for (const it of pending) {
  const row = { id: it.id, file: `src/data/translations/${date}/${it.id}.md`, title: it.title, url: it.url, src: it.src, discussionUrl: it.discussionUrl ?? null, detailOrigin: it.detailOrigin ?? null };
  if (argv.includes("--json")) Object.assign(row, { detailExcerpt: it.detailExcerpt ?? "", listSummary: it.summary ?? "" });
  console.log(JSON.stringify(row));
}
