#!/usr/bin/env node
// company-brain 트렌드 노트(trends/*.md) → src/data/news.json 동기화.
// 빌드는 이 JSON만 읽는다(레포 밖 파일을 빌드에서 읽지 않기 — Cloudflare 규칙).
// usage: node scripts/sync-news.mjs   (cron: sync → git commit → push → Pages 자동 배포)
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAIN = join(process.env.HOME, "coding", "company-brain");
const TRENDS = join(BRAIN, "AI-Sessions", "wiki", "sources", "trends");
const MARKET = join(BRAIN, "reports", "market-latest.json");
const OUT = join(__dirname, "..", "src", "data", "news.json");

if (!existsSync(TRENDS)) {
  console.error("trends dir not found:", TRENDS);
  process.exit(1);
}

const days = [];
for (const f of readdirSync(TRENDS).filter((x) => /^\d{4}-\d{2}-\d{2}\.md$/.test(x)).sort().reverse()) {
  const md = readFileSync(join(TRENDS, f), "utf8");
  const date = f.replace(".md", "");

  const summary = (md.match(/## Summary\s+([\s\S]*?)\n##/) || [])[1]?.trim() ?? "";

  const items = [];
  const signals = (md.match(/## Top signals\s+([\s\S]*?)(\n## |$)/) || [])[1] ?? "";
  // 형식: - [HN ▲1392] [title](url)
  const re = /^- \[(\w+)[^\d\]]*(\d+)?\] \[([^\]]+)\]\(([^)]+)\)/gm;
  let m;
  while ((m = re.exec(signals))) {
    const url = m[4];
    let domain = "";
    try { domain = new URL(url).hostname.replace(/^www\./, ""); } catch { /* keep empty */ }
    items.push({ src: m[1], score: m[2] ? Number(m[2]) : null, title: m[3], url, domain });
  }

  const ideas = [];
  const ideaBlock = (md.match(/## 도출된 아이디어[^\n]*\s+([\s\S]*?)$/) || [])[1] ?? "";
  const ir = /^- \*\*([^*]+)\*\* — (.+)$/gm;
  let im;
  while ((im = ir.exec(ideaBlock))) ideas.push({ title: im[1].trim(), hypothesis: im[2].trim() });

  if (items.length || summary) days.push({ date, summary, items, ideas });
}

// 증시(미국·한국) — stock_analysis cron이 쓰는 market-latest.json을 그대로 동봉
let market = null;
if (existsSync(MARKET)) {
  try { market = JSON.parse(readFileSync(MARKET, "utf8")); } catch { /* skip broken file */ }
}

writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), days, market }, null, 1), "utf8");
console.log(`synced ${days.length} day(s), ${days.reduce((s, d) => s + d.items.length, 0)} items, market=${market ? "ok" : "none"} → src/data/news.json`);
