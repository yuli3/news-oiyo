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

// Cross-day dedup key: same story (HN topstories persist for days, so a headline
// recurs across consecutive trend notes). Prefer normalized URL, fall back to title.
const dedupKey = (it) => {
  if (it.url) {
    try {
      const u = new URL(it.url);
      return "u:" + u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
    } catch { /* fall through to title */ }
  }
  return "t:" + it.title.trim().toLowerCase();
};

// Days are read newest-first, so the FIRST time we see a story we keep it (its most
// recent appearance) and drop the older repeats — each headline shows exactly once.
const seenGlobal = new Set();
let dropped = 0;

const dateFiles = readdirSync(TRENDS).filter((x) => /^\d{4}-\d{2}-\d{2}\.md$/.test(x)).sort();

// gap 감지 전용(로그만 남긴다, 파일은 안 만든다) — trend_scout.py가 며칠 못 돌면
// (맥 오프라인 등) 조용히 파일이 비고, sync는 있는 파일만 처리하느라 이걸 못 알아챈다.
// 여기서 콘솔에 명시적으로 남기면 news_daily_push.sh의 cron 로그(hermes jobs.json에
// stdout으로 캡처됨)에서 공백을 바로 확인할 수 있다.
if (dateFiles.length) {
  const missing = [];
  // UTC로 파싱+포맷 양쪽을 고정해야 로컬 타임존(Asia/Seoul 등)에서 날짜가
  // 하루씩 밀리는 off-by-one을 피할 수 있다.
  let d = new Date(dateFiles[0].replace(".md", "") + "T00:00:00Z");
  const last = new Date(dateFiles[dateFiles.length - 1].replace(".md", "") + "T00:00:00Z");
  const have = new Set(dateFiles.map((f) => f.replace(".md", "")));
  while (d < last) {
    const iso = d.toISOString().slice(0, 10);
    if (!have.has(iso)) missing.push(iso);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  if (missing.length) {
    console.warn(`gap detected in trends dir: ${missing.length} day(s) missing (${missing[0]}..${missing[missing.length - 1]}) — not backfilled, see trend_scout.py gap notice`);
  }
}

const days = [];
for (const f of dateFiles.slice().reverse()) {
  const md = readFileSync(join(TRENDS, f), "utf8");
  const date = f.replace(".md", "");

  const summary = (md.match(/## Summary\s+([\s\S]*?)(\n## |$)/) || [])[1]?.trim() ?? "";

  const items = [];
  const signals = (md.match(/## Top signals\s+([\s\S]*?)(\n## |$)/) || [])[1] ?? "";
  // 형식: - [HN ▲1392] [title](url)
  const re = /^- \[(\w+)[^\d\]]*(\d+)?\] \[([^\]]+)\]\(([^)]+)\)/gm;
  let m;
  while ((m = re.exec(signals))) {
    const url = m[4];
    let domain = "";
    try { domain = new URL(url).hostname.replace(/^www\./, ""); } catch { /* keep empty */ }
    const it = { src: m[1], score: m[2] ? Number(m[2]) : null, title: m[3], url, domain };
    const key = dedupKey(it);
    if (seenGlobal.has(key)) { dropped++; continue; }
    seenGlobal.add(key);
    items.push(it);
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
console.log(`synced ${days.length} day(s), ${days.reduce((s, d) => s + d.items.length, 0)} items (deduped ${dropped} cross-day repeat${dropped === 1 ? "" : "s"}), market=${market ? "ok" : "none"} → src/data/news.json`);
