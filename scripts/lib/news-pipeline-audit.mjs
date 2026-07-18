#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { auditNewsPayload } from "./news-pipeline-adapter.mjs";

const outputPath = process.argv[2];
if (!outputPath) {
  console.error("usage: node news-pipeline-audit.mjs <news.json>");
  process.exit(2);
}
const registry = JSON.parse(readFileSync(new URL("./news-pipeline-sources.json", import.meta.url), "utf8"));
const payload = JSON.parse(readFileSync(outputPath, "utf8"));
const errors = auditNewsPayload(payload, registry);
for (const error of errors) console.error(`ERROR: ${error}`);
const itemCount = (payload.days ?? []).reduce((sum, day) => sum + (day.items?.length ?? 0), 0);
console.log(`news pipeline audit: ${payload.days?.length ?? 0} days, ${itemCount} items, ${errors.length} errors`);
process.exitCode = errors.length ? 1 : 0;
