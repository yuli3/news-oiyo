#!/usr/bin/env node
// 이미 실린 src/data/news.json에 같은 소식 묶기(clusterSameStories)를 다시 적용한다(2026-11-24).
// sync-news.mjs가 매번 같은 함수를 부르므로 평소에는 필요 없다. company-brain trends 폴더 없이
// (클라우드·CI) 기준을 바꾼 뒤 기존 항목에 반영할 때 쓴다. 몇 번 돌려도 결과가 같다.
// usage: node scripts/cluster-stories.mjs [--dry-run]
import { readFileSync, writeFileSync } from "node:fs";
import { clusterSameStories } from "./lib/mentions.mjs";

const OUT = new URL("../src/data/news.json", import.meta.url);
const dryRun = process.argv.includes("--dry-run");
const payload = JSON.parse(readFileSync(OUT, "utf8"));
let grouped = 0;
let absorbed = 0;
for (const day of payload.days ?? []) {
  const r = clusterSameStories(day.items ?? []);
  grouped += r.grouped;
  absorbed += r.absorbed;
}
if (!dryRun) writeFileSync(OUT, JSON.stringify(payload, null, 1), "utf8");
console.log(`${dryRun ? "checked" : "clustered"} ${payload.days?.length ?? 0} day(s): ${grouped} story group(s), ${absorbed} item(s) folded into source badges`);
