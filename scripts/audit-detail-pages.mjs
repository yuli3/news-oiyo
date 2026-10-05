#!/usr/bin/env node
// 상세 페이지 감사 — 2026-10-05.
//
// /item/<id>/ 는 한국어 요약(detailSummary)이 있는 기사에만 있어야 한다.
// c409ce7 은 id 만 있으면 전부 만들어서 1,698장 중 1,656장이 "요약 준비 중"
// 한 줄뿐인 색인 페이지였고, 사이트맵에도 그대로 실렸다. 같은 일이 조용히
// 되돌아오지 않도록 빌드 산출물의 숫자를 맞춰 본다.
//
// usage: npm run build && node scripts/audit-detail-pages.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";

const data = JSON.parse(readFileSync("src/data/news.json", "utf8"));
const expected = new Set();
for (const day of data.days) {
  for (const value of Object.values(day)) {
    if (!Array.isArray(value)) continue;
    for (const item of value) {
      if (typeof item?.id === "string" && item.id && (item.detailSummary ?? "").trim()) expected.add(item.id);
    }
  }
}

const built = new Set(existsSync("dist/item") ? readdirSync("dist/item") : []);
const sitemap = existsSync("dist/sitemap-0.xml") ? readFileSync("dist/sitemap-0.xml", "utf8") : "";
const inSitemap = new Set([...sitemap.matchAll(/\/item\/([^/<]+)\//g)].map((m) => m[1]));

const errors = [];
const diff = (a, b) => [...a].filter((x) => !b.has(x));
const extra = diff(built, expected);
const missing = diff(expected, built);
if (extra.length) errors.push(`${extra.length} detail page(s) without a summary, e.g. ${extra.slice(0, 3).join(", ")}`);
if (missing.length) errors.push(`${missing.length} summarized item(s) without a detail page, e.g. ${missing.slice(0, 3).join(", ")}`);
const sitemapExtra = diff(inSitemap, expected);
if (sitemapExtra.length) errors.push(`${sitemapExtra.length} sitemap /item/ URL(s) without a summary`);

// 목록 페이지가 없는 상세 페이지로 링크하면 404 로 보내는 셈이다.
const linked = new Set();
for (const file of ["dist/index.html"]) {
  if (!existsSync(file)) continue;
  for (const m of readFileSync(file, "utf8").matchAll(/href="\/item\/([^/"]+)\/"/g)) linked.add(m[1]);
}
const deadLinks = diff(linked, built);
if (deadLinks.length) errors.push(`${deadLinks.length} list link(s) to a missing detail page, e.g. ${deadLinks.slice(0, 3).join(", ")}`);

if (errors.length) {
  console.error("FAIL: detail pages\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`PASS: ${built.size} detail page(s), all with a Korean summary; sitemap ${inSitemap.size}; home links ${linked.size}`);
