#!/usr/bin/env node
// List items that need a Korean detailSummary (agent-batch).
// usage:
//   node scripts/list-pending-details.mjs
//   node scripts/list-pending-details.mjs --date 2026-10-05
//   node scripts/list-pending-details.mjs --limit 20 --json
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS = join(__dirname, "..", "src", "data", "news.json");

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : null;
};

const DATE = value("date");
const LIMIT = Number(value("limit") ?? 0) || 0;
const AS_JSON = flag("json");

const payload = JSON.parse(readFileSync(NEWS, "utf8"));
const pending = [];
for (const day of payload.days ?? []) {
  if (DATE && day.date !== DATE) continue;
  for (const item of day.items ?? []) {
    const status = item.detailStatus;
    const needs =
      (status === "ok" || status === "pending_summary") &&
      !String(item.detailSummary ?? "").trim() &&
      String(item.detailExcerpt ?? "").trim();
    if (!needs) continue;
    pending.push({
      id: item.id,
      date: day.date,
      title: item.title,
      url: item.url,
      src: item.src,
      detailStatus: status,
      excerptSource: item.excerptSource ?? null,
      detailExcerpt: item.detailExcerpt,
      listSummary: item.summary ?? "",
    });
  }
}

const sliced = LIMIT > 0 ? pending.slice(0, LIMIT) : pending;

if (AS_JSON) {
  console.log(JSON.stringify(sliced, null, 2));
} else {
  console.error(`${sliced.length} pending (of ${pending.length} total${DATE ? ` on ${DATE}` : ""})`);
  for (const row of sliced) {
    console.log(
      JSON.stringify({
        id: row.id,
        date: row.date,
        title: row.title,
        url: row.url,
        src: row.src,
        excerptSource: row.excerptSource,
        detailExcerpt: row.detailExcerpt,
      }),
    );
  }
}
