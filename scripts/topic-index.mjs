// Weekly topic counts over src/data/news.json for the newsletter slot
// '이번 주 많이 나온 토픽' (board card idea-news-topic-index). Read-only: it never
// edits news.json and makes no pages. Pages come only after GSC shows demand.
//
//   node scripts/topic-index.mjs                 # last full week (Mon–Sun, KST dates)
//   node scripts/topic-index.mjs --week 2026-10-19 --top 5 --json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function compileTopics(dictionary) {
  return dictionary.topics.map((t) => ({
    id: t.id,
    label: t.label,
    patterns: t.aliases.map((a) => {
      const esc = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Hangul aliases: substring. Latin aliases: word boundary on both sides.
      return /[가-힣]/.test(a) ? new RegExp(esc, "i") : new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, "iu");
    }),
  }));
}

export function tagItem(item, topics) {
  const text = [item.title, item.summary, item.detailSummary].filter(Boolean).join("\n");
  return topics.filter((t) => t.patterns.some((p) => p.test(text))).map((t) => t.id);
}

// Monday of the week containing a YYYY-MM-DD date.
export function weekStart(date) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

function addDays(date, n) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function countWeek(days, topics, start) {
  const end = addDays(start, 6);
  const counts = new Map();
  let items = 0;
  for (const day of days) {
    if (day.date < start || day.date > end) continue;
    for (const item of day.items) {
      items += 1;
      for (const id of tagItem(item, topics)) {
        const c = counts.get(id) ?? { items: 0, days: new Set(), examples: [] };
        c.items += 1;
        c.days.add(day.date);
        c.examples.push({ date: day.date, title: item.title, url: item.url, score: item.score ?? 0 });
        counts.set(id, c);
      }
    }
  }
  return { start, end, items, counts };
}

export function rankWeek(days, topics, start, top = 10) {
  const cur = countWeek(days, topics, start);
  const prev = countWeek(days, topics, addDays(start, -7));
  const label = Object.fromEntries(topics.map((t) => [t.id, t.label]));
  const rows = [...cur.counts.entries()]
    .map(([id, c]) => ({
      id, label: label[id], items: c.items, days: c.days.size, prevItems: prev.counts.get(id)?.items ?? 0,
      // Show the most-discussed stories, not whichever came first.
      examples: c.examples.sort((a, b) => b.score - a.score).slice(0, 3).map(({ score, ...e }) => e),
    }))
    // Topics seen on one day only are usually a single story, not a trend.
    .filter((r) => r.days >= 2)
    .sort((a, b) => b.items - a.items || b.days - a.days || a.id.localeCompare(b.id))
    .slice(0, top);
  return { week: { start: cur.start, end: cur.end }, items: cur.items, prevItems: prev.items, rows };
}

function parseArgs(argv) {
  const args = { top: 10, json: false, week: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--top") args.top = Number(argv[++i]);
    else if (argv[i] === "--week") args.week = argv[++i];
    else if (argv[i] === "--json") args.json = true;
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const news = JSON.parse(fs.readFileSync(path.join(root, "src/data/news.json"), "utf8"));
  const dictionary = JSON.parse(fs.readFileSync(path.join(root, "scripts/lib/topic-dictionary.json"), "utf8"));
  const topics = compileTopics(dictionary);
  const latest = news.days.map((d) => d.date).sort().at(-1);
  // Default: the last week that is complete in the data.
  const start = args.week ? weekStart(args.week) : addDays(weekStart(addDays(latest, 1)), -7);
  const result = rankWeek(news.days, topics, start, args.top);
  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`## 이번 주 많이 나온 토픽 (${result.week.start} ~ ${result.week.end}, 기사 ${result.items}건 · 지난주 ${result.prevItems}건)\n`);
  result.rows.forEach((r, i) => {
    console.log(`${i + 1}. **${r.label}** — ${r.items}건, ${r.days}일 (지난주 ${r.prevItems}건)`);
    for (const e of r.examples) console.log(`   - ${e.date} [${e.title}](${e.url})`);
  });
  console.log("\n기사 수는 제목·요약에 이름이 나온 항목 수예요. 한 기사가 여러 토픽에 들어갈 수 있어요. 이틀 이상 나온 토픽만 셉니다.");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
