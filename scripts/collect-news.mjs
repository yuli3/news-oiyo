#!/usr/bin/env node
// 트렌드 수집기 — company-brain/.../trends/<date>.{md,sources.json} 을 만든다.
//
// 파이프라인: collect-news.mjs -> trends/*.md -> sync-news.mjs -> src/data/news.json
//             -> daily-publish.sh -> Cloudflare Pages
//
// 왜 repo 안에 있나: 이 수집기의 앞 세대는 Hermes 스킬 `oiyo-news-feed` 였다.
// 2026-08-29 Hermes 가 퇴장하자 능력이 런타임과 함께 사라졌고, 피드는 그날부터
// 멈췄다. 능력을 런타임이 아니라 repo 가 소유해야 어느 런타임에서든 같은 결과가
// 나온다. 이 파일은 그 교훈의 구현이다. 폐기된 trend_scout 의 복원이 아니다 —
// 소스·재시도·실패 판정은 trend-scout-retired-2026-08-20 결정이 규정한 그대로다.
//
// usage:
//   node scripts/collect-news.mjs              # 오늘자, 이미 있으면 거절
//   node scripts/collect-news.mjs --date 2026-09-01
//   node scripts/collect-news.mjs --force      # 기존 날짜 덮어쓰기
//   node scripts/collect-news.mjs --dry-run    # 파일을 쓰지 않고 결과만 출력
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRENDS = join(process.env.HOME, "coding", "company-brain", "AI-Sessions", "wiki", "sources", "trends");
const REGISTRY = JSON.parse(readFileSync(join(__dirname, "lib", "news-pipeline-sources.json"), "utf8"));
const REGISTERED = new Set(REGISTRY.sources.map((s) => s.id));

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : null; };
const DATE = value("date") ?? new Date().toLocaleDateString("sv-SE"); // sv-SE = YYYY-MM-DD, 로컬 기준
const FORCE = flag("force");
const DRY = flag("dry-run");

// 재시도는 60s·120s 가 아니라 짧게 둔다. 크론이 아니라 사람/에이전트가 부르는
// 명령이므로, 죽은 소스 하나 때문에 3분을 기다리게 하면 아무도 안 쓴다.
async function get(url, { retries = 2 } = {}) {
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(25_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (error) {
      if (i >= retries) { console.error(`  실패 ${url} — ${error.message}`); return ""; }
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

const entries = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => m[1]);
const pick = (block, re) => (block.match(re) || [])[1]?.trim() ?? "";
const unwrap = (s) => s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

async function hackerNews() {
  const raw = await get("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=60");
  if (!raw) return [];
  return (JSON.parse(raw).hits ?? []).map((h) => ({
    src: "hacker-news",
    title: h.title ?? "",
    url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
    score: h.points ?? null,
    comments: Number.isFinite(h.num_comments) ? h.num_comments : null,
    publishedAt: typeof h.created_at === "string" ? h.created_at : null,
    discussionUrl: h.objectID ? `https://news.ycombinator.com/item?id=${h.objectID}` : null,
  }));
}

async function lobsters() {
  const raw = await get("https://lobste.rs/hottest.json");
  if (!raw) return [];
  return JSON.parse(raw).map((h) => ({
    src: "lobsters",
    title: h.title ?? "",
    url: h.url || h.comments_url || "",
    score: h.score ?? null,
    comments: Number.isFinite(h.comment_count) ? h.comment_count : null,
    publishedAt: typeof h.created_at === "string" ? h.created_at : null,
    discussionUrl: typeof h.comments_url === "string" && h.comments_url.startsWith("https://") ? h.comments_url : null,
  }));
}

// GeekNews 는 "원본 URL만" 이 규약이다(trend-scout-retired-2026-08-20). 피드의
// link 는 news.hada.io 토픽이라 그대로 쓰면 안 되고, 토픽 페이지에서 원본을
// 해석한다. 선별된 항목에만 요청하므로 50번이 아니라 몇 번이면 된다.
const HADA_NOISE = /hada\.io|googleapis|gstatic|googletagmanager|schema\.org|w3\.org|facebook\.com|x\.com|twitter/;
async function resolveGeekNews(topicUrl) {
  const html = await get(topicUrl, { retries: 1 });
  if (!html) return topicUrl;
  const links = [...html.matchAll(/https?:\/\/[a-zA-Z0-9./?=_&%~+-]+/g)].map((m) => m[0]).filter((u) => !HADA_NOISE.test(u));
  const external = links.filter((u) => !u.includes("news.ycombinator.com"));
  return (external[0] ?? links[0] ?? topicUrl);
}

async function geekNews() {
  const xml = await get("https://news.hada.io/rss/news");
  if (!xml) return [];
  return entries(xml, "entry").map((e) => ({
    src: "geeknews",
    title: unwrap(pick(e, /<title>([\s\S]*?)<\/title>/)),
    url: pick(e, /<link[^>]*href=['"]([^'"]+)['"]/),
    score: null,
    needsResolve: true,
  })).filter((x) => x.title && x.url);
}

async function reddit() {
  const out = [];
  for (const sub of ["LocalLLaMA", "MachineLearning"]) {
    const xml = await get(`https://www.reddit.com/r/${sub}/hot/.rss`, { retries: 1 });
    for (const e of entries(xml, "entry")) {
      const title = unwrap(pick(e, /<title>([\s\S]*?)<\/title>/));
      const url = pick(e, /<link[^>]*href=['"]([^'"]+)['"]/);
      const updated = unwrap(pick(e, /<updated>([\s\S]*?)<\/updated>/));
      const publishedAt = updated && !Number.isNaN(Date.parse(updated)) ? new Date(updated).toISOString() : null;
      if (title && url) out.push({ src: "reddit", title, url, score: null, comments: null, publishedAt });
    }
    await new Promise((r) => setTimeout(r, 2000)); // 서브 사이 2초 — 429 를 부르지 않는다
  }
  return out;
}

async function rssFeed(src, url) {
  const xml = await get(url, { retries: 1 });
  if (!xml) return [];
  return entries(xml, "item").slice(0, 8).map((e) => {
    const pub = unwrap(pick(e, /<pubDate>([\s\S]*?)<\/pubDate>/));
    const publishedAt = pub && !Number.isNaN(Date.parse(pub)) ? new Date(pub).toISOString() : null;
    return {
      src,
      title: unwrap(pick(e, /<title>([\s\S]*?)<\/title>/)),
      url: pick(e, /<link>([\s\S]*?)<\/link>/),
      score: null,
      comments: null,
      publishedAt,
    };
  }).filter((x) => x.title && x.url);
}

// AI 중심 선별. 이 목록이 "무엇이 신호인가" 의 정본이다 — 런타임마다 다르게
// 판단하면 같은 날 같은 소스에서 다른 노트가 나온다.
const AI_TERMS = /\b(ai|llm|gpt|claude|gemini|anthropic|openai|deepmind|mistral|qwen|llama|deepseek|glm|agent|agentic|transformer|embedding|rag|inference|prompt|model|neural|hugging\s?face|copilot|cursor|codex)\b|에이전트|인공지능|생성형|모델|추론|프롬프트/i;
// 추측·YMYL 은 규약상 제외한다. 루머는 확인되지 않은 주장이고, YMYL 은 이
// 파이프라인이 검증할 수 없는 영역이다.
const EXCLUDE = /\b(rumou?r|price fixing|allegedly|leak(ed)?s?\b|봇물|의혹|추측|카더라)\b|\b(cancer|suicide|overdose|poison|mercury|adhd|diagnos)/i;

function select(items) {
  const seen = new Set();
  return items.filter((x) => {
    if (!x.url.startsWith("https://")) return false;      // 어댑터가 https 만 받는다
    if (!REGISTERED.has(x.src)) return false;             // 미등록 소스는 sync 가 버린다
    if (EXCLUDE.test(x.title)) return false;
    if (!AI_TERMS.test(x.title)) return false;
    const key = x.title.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const SRC_TAG = { "hacker-news": "HN", lobsters: "lobsters", geeknews: "GeekNews", reddit: "Reddit",
  "openai-news": "OpenAI", "deepmind-blog": "DeepMind", "karpathy-blog": "Karpathy" };
// 대괄호로 시작하는 제목([Megathread] 등)이 마크다운 링크를 깨뜨린다.
const mdSafe = (s) => s.replace(/([[\]])/g, "\\$1");

async function main() {
  const notePath = join(TRENDS, `${DATE}.md`);
  const sourcePath = join(TRENDS, `${DATE}.sources.json`);
  if (existsSync(notePath) && !FORCE && !DRY) {
    console.error(`이미 있다: ${notePath} — 노트는 유지, 점수·댓글만 보강`);
    await enrichExisting(sourcePath);
    process.exit(0);
  }

  console.error("수집 중…");
  const collected = (await Promise.all([
    hackerNews(), lobsters(), geekNews(), reddit(),
    rssFeed("openai-news", "https://openai.com/news/rss.xml"),
    rssFeed("deepmind-blog", "https://deepmind.google/blog/rss.xml"),
    rssFeed("karpathy-blog", "https://karpathy.bearblog.dev/feed/?type=rss"),
  ])).flat();

  // 파이프라인 규약: 전 소스 실패(raw==0)만 실패다. 조용한 날은 실패가 아니다.
  if (collected.length === 0) {
    console.error("FAIL 모든 소스가 0건이다 — 네트워크 또는 전 소스 장애");
    process.exit(1);
  }

  const selected = select(collected);
  for (const item of selected) {
    if (item.needsResolve) { item.url = await resolveGeekNews(item.url); delete item.needsResolve; }
  }
  const items = selected.filter((x) => x.url.startsWith("https://")).map(({ needsResolve, ...rest }) => rest);

  const bySource = items.reduce((acc, x) => ({ ...acc, [x.src]: (acc[x.src] ?? 0) + 1 }), {});
  console.error(`raw ${collected.length} → 선별 ${items.length}`, bySource);

  const top = items.slice().sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 10)
    .map((x) => `- [${SRC_TAG[x.src] ?? x.src}${x.score ? ` ▲${x.score}` : ""}] [${mdSafe(x.title)}](${x.url})`);

  // ## Summary 는 사이트가 리드 문단으로 읽는 절이다(sync-news.mjs). 이 헤딩이
  // 없으면 그 날 페이지에 요약이 통째로 빠진다 — 2026-08-23~09-01 에 실제로
  // 일어났다. 기계가 쓸 수 있는 사실만 여기 채우고, 편집 문장은 에이전트가
  // 덧붙인다(scripts/audit-trend-notes.mjs 가 헤딩 존재를 강제한다).
  const note = `---
type: source
project: news
layer: product
date: ${DATE}
status: archived
confidence: medium
---

# ${DATE} 트렌드 수집

## Summary

라이브 소스 raw ${collected.length}건 중 AI 중심 신호 ${items.length}건을 선별했다. 추측성 항목과 YMYL 은 규약대로 제외했다. 소스별 ${Object.entries(bySource).map(([k, v]) => `${k} ${v}`).join(" · ")}.

## Top signals

${top.join("\n")}
`;

  const envelope = { schema: "oiyo.trend-signals.raw", schemaVersion: 1,
    fetchedAt: new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00"), items };

  if (DRY) { console.log(note); return; }
  writeFileSync(notePath, note);
  writeFileSync(join(TRENDS, `${DATE}.sources.json`), `${JSON.stringify(envelope, null, 1)}\n`);
  console.error(`작성: ${DATE}.md · ${DATE}.sources.json`);
  console.error("다음: npm run sync — 편집 요약을 더하려면 ## Summary 를 손보고 sync 한다");
}

function liveKey(item) {
  try { return new URL(item.url).href.replace(/\/+$/, ""); } catch { return item.url; }
}

async function enrichExisting(sourcePath) {
  if (!existsSync(sourcePath)) return;
  const envelope = JSON.parse(readFileSync(sourcePath, "utf8"));
  if (!Array.isArray(envelope.items) || envelope.items.length === 0) return;
  const live = (await Promise.all([hackerNews(), lobsters()])).flat();
  const byUrl = new Map(live.filter((x) => x.url).map((x) => [liveKey(x), x]));
  let patched = 0;
  for (const item of envelope.items) {
    const hit = byUrl.get(liveKey(item));
    if (!hit) continue;
    if (Number.isFinite(hit.score)) item.score = hit.score;
    if (Number.isFinite(hit.comments)) item.comments = hit.comments;
    if (hit.publishedAt) item.publishedAt = hit.publishedAt;
    if (hit.discussionUrl) item.discussionUrl = hit.discussionUrl;
    patched++;
  }
  if (!patched) {
    console.error("보강 0건 — 라이브 소스와 URL이 겹치지 않음");
    return;
  }
  writeFileSync(sourcePath, `${JSON.stringify(envelope, null, 1)}\n`);
  console.error(`보강: ${sourcePath} · ${patched}건`);
}

await main();
