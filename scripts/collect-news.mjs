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
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  cleanText,
  decodeEntities,
  fetchArticleExcerpt,
  fetchGithubReadme,
  firstExternalLink,
  githubRepoFromUrl,
  isCuratorUrl,
  mapPool,
  shouldSkipArticle,
  UA as FETCH_UA,
} from "./lib/fetch-article.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRENDS = join(process.env.HOME, "coding", "company-brain", "AI-Sessions", "wiki", "sources", "trends");
const REGISTRY = JSON.parse(readFileSync(join(__dirname, "lib", "news-pipeline-sources.json"), "utf8"));
const REGISTERED = new Set(REGISTRY.sources.map((s) => s.id));

const UA = FETCH_UA;

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

// 제목 아래 한 줄 설명. 소스가 준 텍스트를 clean() 하고, 상세용 원문 excerpt 는
// scripts/lib/fetch-article.mjs 로 채운다. GeekNews Atom 등. 정책 전문은 AGENTS.md.
const clean = (s) => cleanText(s, 240);

const entries = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => m[1]);
const pick = (block, re) => (block.match(re) || [])[1]?.trim() ?? "";
const unwrap = (s) => s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

// Detail seeds (2026-10-07: primary-source first).
// Curators (HN·GeekNews·Lobsters·Reddit) only tell us where a story is being
// discussed; the detail excerpt comes from the linked 1st-party page. Curator
// text (GeekNews feed bullets, HN story_text) is a fallback, marked
// detailOrigin="curator". GitHub repos get their README (detailOrigin="readme").
// Soft-fail — never abort collect for one URL. YouTube/X skipped; SSRF blocked in lib.
const DETAIL_SEED_SOURCES = new Set([
  "hacker-news",
  "lobsters",
  "reddit",
  "openai-news",
  "deepmind-blog",
  "karpathy-blog",
  "aitimes",
  "zdnet-kr",
  "geeknews",
  "github",
]);
const CURATOR_SOURCES = new Set(["hacker-news", "geeknews", "lobsters", "reddit"]);

/** Curator-side text kept as fallback only. Never preferred over the original. */
function curatorText(item) {
  return cleanText(item.curatorExcerpt ?? item.summary ?? "", 4_000);
}

function applyCuratorFallback(item, reason) {
  const text = curatorText(item);
  item.detailFetchedAt = new Date().toISOString();
  if (!text) {
    item.detailStatus = "failed";
    item.detailError = reason;
    return false;
  }
  item.detailExcerpt = text;
  item.excerptSource = "feed";
  item.detailOrigin = "curator";
  item.detailStatus = "pending_summary";
  item.detailError = reason;
  return true;
}

function applyFetchResult(item, result, origin = "primary") {
  item.detailFetchedAt = result.fetchedAt;
  if (result.status !== "ok" || !result.excerptText) {
    // Original unreachable: curators fall back to their own text (marked), others fail/skip.
    if (CURATOR_SOURCES.has(item.src) && applyCuratorFallback(item, result.error || "primary_unavailable")) return;
    item.detailStatus = result.status === "skipped" ? "skipped" : "failed";
    if (result.error) item.detailError = result.error;
    return;
  }
  item.detailExcerpt = result.excerptText;
  item.excerptSource = result.excerptSource;
  item.detailOrigin = origin;
  item.detailStatus = "pending_summary";
  delete item.detailError;
  // List one-liner: reuse excerpt when summary is still empty (HN story_text gap).
  if (!String(item.summary ?? "").trim()) {
    const one = cleanText(result.excerptText, 240);
    if (one) item.summary = one;
  }
}

async function seedOne(item) {
  // GitHub repo links (Trending or an HN/GeekNews post pointing at a repo) → README.
  const repo = githubRepoFromUrl(item.url, { rootOnly: true });
  if (repo) return applyFetchResult(item, await fetchGithubReadme(repo), "readme");
  // Self posts (Ask HN, Show GN, Reddit text) have no original beyond the curator page.
  if (isCuratorUrl(item.url)) {
    if (!applyCuratorFallback(item, "no_primary_link")) item.detailStatus = "skipped";
    return;
  }
  if (shouldSkipArticle(item.url)) {
    if (CURATOR_SOURCES.has(item.src) && applyCuratorFallback(item, "skipped_host")) return;
    item.detailStatus = "skipped";
    item.detailFetchedAt = new Date().toISOString();
    item.detailError = "skipped_host";
    return;
  }
  return applyFetchResult(item, await fetchArticleExcerpt(item.url), "primary");
}

async function seedDetailExcerpts(items) {
  const targets = items.filter((item) => DETAIL_SEED_SOURCES.has(item.src));
  const needFetch = targets.filter((item) => {
    if (String(item.detailSummary ?? "").trim()) return false; // already written
    // Primary/readme excerpt already in hand — keep. Curator fallback is retried.
    if (item.detailExcerpt && item.detailOrigin && item.detailOrigin !== "curator") return false;
    if (item.detailStatus === "skipped" && item.detailError === "skipped_host" && !githubRepoFromUrl(item.url, { rootOnly: true })) return false;
    return true;
  });
  if (!needFetch.length) return { seeded: targets.length, fetched: 0 };
  await mapPool(needFetch, 4, async (item) => {
    try {
      await seedOne(item);
    } catch (error) {
      item.detailStatus = "failed";
      item.detailFetchedAt = new Date().toISOString();
      item.detailError = error instanceof Error ? error.message : String(error);
      console.error(`  detail 실패 ${item.url} — ${item.detailError}`);
    }
  });
  return { seeded: targets.length, fetched: needFetch.length };
}

// HN: empty story_text → fetch once for detail excerpt + list summary (shared module).
async function fillHackerNewsSummaries(items) {
  const pending = items.filter(
    (item) =>
      item.src === "hacker-news" &&
      !String(item.summary ?? "").trim() &&
      !item.detailExcerpt &&
      !shouldSkipArticle(item.url),
  );
  await mapPool(pending, 4, async (item) => {
    try {
      const result = await fetchArticleExcerpt(item.url);
      applyFetchResult(item, result);
    } catch (error) {
      item.detailStatus = "failed";
      item.detailFetchedAt = new Date().toISOString();
      item.detailError = error instanceof Error ? error.message : String(error);
      console.error(`  HN 요약 실패 ${item.url} — ${item.detailError}`);
    }
  });
  // Skip hosts still get a status so enrich does not retry forever.
  for (const item of items) {
    if (item.src !== "hacker-news" || item.detailStatus || item.detailExcerpt) continue;
    if (shouldSkipArticle(item.url)) {
      item.detailStatus = "skipped";
      item.detailFetchedAt = new Date().toISOString();
      item.detailError = "skipped_host";
    }
  }
}

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
    summary: clean(h.story_text ?? h._highlightResult?.story_text?.value ?? ""),
    curatorExcerpt: cleanText(h.story_text ?? "", 4_000) || undefined,
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
// GeekNews 가 HN 스레드를 원본으로 걸면(큐레이터 → 큐레이터) HN 이 가리키는 원문까지 한 번 더 따라간다.
async function followHackerNews(url) {
  const id = (url.match(/^https:\/\/news\.ycombinator\.com\/item\?id=(\d+)$/) || [])[1];
  if (!id) return url;
  const raw = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { retries: 1 });
  try {
    const next = raw ? JSON.parse(raw)?.url : null;
    return typeof next === "string" && next.startsWith("https://") ? next : url;
  } catch {
    return url;
  }
}

async function resolveGeekNews(topicUrl) {
  return followHackerNews(await resolveGeekNewsTopic(topicUrl));
}

async function resolveGeekNewsTopic(topicUrl) {
  const html = await get(topicUrl, { retries: 1 });
  if (!html) return topicUrl;
  // 토픽 제목 링크(class=topic-title-link)가 원본이다. 자기 글(Show GN 등)은 토픽 자신을 가리킨다.
  const titleLink = decodeEntities(
    (html.match(/<a\b[^>]*href=['"]([^'"]+)['"][^>]*class=['"][^'"]*topic-title-link/i) ||
      html.match(/<a\b[^>]*class=['"][^'"]*topic-title-link[^'"]*['"][^>]*href=['"]([^'"]+)['"]/i) || [])[1] ?? "",
  );
  if (titleLink) {
    try {
      const abs = new URL(titleLink, topicUrl).href;
      return abs.startsWith("https://") ? abs : topicUrl;
    } catch { /* fall through */ }
  }
  const links = [...html.matchAll(/https?:\/\/[a-zA-Z0-9./?=_&%~+-]+/g)].map((m) => m[0]).filter((u) => !HADA_NOISE.test(u));
  const external = links.filter((u) => !u.includes("news.ycombinator.com"));
  return (external[0] ?? links[0] ?? topicUrl);
}

async function geekNews() {
  const xml = await get("https://news.hada.io/rss/news");
  if (!xml) return [];
  return entries(xml, "entry").map((e) => {
    // Atom <content type="html"> already carries a Korean bullet summary from the feed.
    // Prefer that over leaving summary empty; still resolve news.hada.io topic → original URL.
    // Keep a longer feed excerpt for agent-batch detail (list summary stays ≤240).
    const contentHtml = unwrap(pick(e, /<content\b[^>]*>([\s\S]*?)<\/content>/));
    const listSummary = clean(contentHtml);
    const feedExcerpt = cleanText(contentHtml, 4_000);
    const topicUrl = pick(e, /<link[^>]*href=['"]([^'"]+)['"]/);
    const item = {
      src: "geeknews",
      title: unwrap(pick(e, /<title>([\s\S]*?)<\/title>/)),
      url: topicUrl,
      score: null,
      needsResolve: true,
      summary: listSummary,
      // GeekNews 토픽은 출처 표기("GeekNews에서 화제")로만 남긴다.
      discussionUrl: topicUrl.startsWith("https://") ? topicUrl : undefined,
      // 피드 요약은 원문을 못 읽었을 때만 쓰는 폴백이다(detailOrigin=curator).
      curatorExcerpt: feedExcerpt || undefined,
    };
    return item;
  }).filter((x) => x.title && x.url);
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
      if (!title || !url) continue;
      // 링크 글이면 [link] 가 가리키는 원본을 url 로, reddit 스레드는 토론 링크로만 둔다.
      const content = decodeEntities(unwrap(pick(e, /<content\b[^>]*>([\s\S]*?)<\/content>/)));
      const linkHref = (content.match(/<a\b[^>]*href="([^"]+)"[^>]*>\s*\[link\]/i) || [])[1];
      const external = linkHref ? firstExternalLink(`<a href="${linkHref}">`) : null;
      out.push({
        src: "reddit",
        title,
        url: external ?? url,
        score: null,
        comments: null,
        publishedAt,
        discussionUrl: url.startsWith("https://") ? url : undefined,
        curatorExcerpt: cleanText(content.replace(/<a\b[^>]*>\s*\[(?:link|comments)\]\s*<\/a>/gi, " "), 4_000) || undefined,
      });
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
      summary: clean(unwrap(pick(e, /<description>([\s\S]*?)<\/description>/))),
    };
  }).filter((x) => x.title && x.url);
}

// GitHub Trending — 공개 페이지를 읽는다. API 가 없는 목록이고, 레지스트리에
// 이미 `github` 소스가 있는데도 실제 수집기가 없어 한 건도 들어오지 않았다
// (2026-09-19 D 감사). 저장소 설명이 곧 "제목 아래 한 줄"이 된다.
async function githubTrending() {
  const out = [];
  for (const span of ["daily", "weekly"]) {
    const html = await get(`https://github.com/trending?since=${span}&spoken_language_code=en`, { retries: 1 });
    if (!html) continue;
    const articles = html.split("<article").slice(1);
    for (const block of articles.slice(0, 25)) {
      const repo = pick(block, /<h2[^>]*>[\s\S]*?href="\/([^"]+)"/);
      if (!repo || repo.split("/").length !== 2) continue;
      const desc = clean(pick(block, /<p[^>]*class="col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/));
      // "402 stars today" 가 그날의 신호다. 총 스타 수는 누적이라 정렬에 쓰면
      // 오래된 대형 저장소가 항상 위에 온다.
      // weekly 목록은 "stars this week" 로 적힌다.
      const stars = (block.match(/([\d,]+)\s+stars (?:today|this week)/) || [])[1]?.replace(/,/g, "") ?? "";
      out.push({
        src: "github",
        title: `${repo.replace(/\s+/g, "")}${desc ? "" : " (GitHub Trending)"}`,
        url: `https://github.com/${repo.replace(/\s+/g, "")}`,
        score: stars ? Number(stars) : null,
        comments: null,
        publishedAt: null,
        summary: desc,
      });
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return out;
}

// AI 중심 선별. 이 목록이 "무엇이 신호인가" 의 정본이다 — 런타임마다 다르게
// 판단하면 같은 날 같은 소스에서 다른 노트가 나온다.
const AI_TERMS = /\b(ai|llm|gpt|claude|gemini|anthropic|openai|deepmind|mistral|qwen|llama|deepseek|glm|agent|agentic|transformer|embedding|rag|inference|prompt|model|neural|hugging\s?face|copilot|cursor|codex)\b|에이전트|인공지능|생성형|모델|추론|프롬프트|독파모|과기정통|오픈AI|오픈에이아이|앤트로픽|엔비디아|클로드/i;
// 추측·YMYL 은 규약상 제외한다. 루머는 확인되지 않은 주장이고, YMYL 은 이
// 파이프라인이 검증할 수 없는 영역이다.
const EXCLUDE = /\b(rumou?r|price fixing|allegedly|leak(ed)?s?\b|봇물|의혹|추측|카더라)\b|\b(cancer|suicide|overdose|poison|mercury|adhd|diagnos)/i;

function select(items) {
  const seen = new Set();
  return items.filter((x) => {
    if (!x.url.startsWith("https://")) return false;      // 어댑터가 https 만 받는다
    if (!REGISTERED.has(x.src)) return false;             // 미등록 소스는 sync 가 버린다
    if (EXCLUDE.test(x.title)) return false;
    // 저장소 이름만으로는 무엇인지 알 수 없다(github.com/foo/bar). 설명까지 보고
    // 판정한다. 다른 소스도 설명이 있으면 같은 이득을 본다.
    const haystack = `${x.title} ${x.summary ?? ""}`;
    if (!AI_TERMS.test(haystack)) return false;
    const key = x.title.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const SRC_TAG = { "hacker-news": "HN", lobsters: "lobsters", geeknews: "GeekNews", reddit: "Reddit",
  "openai-news": "OpenAI", "deepmind-blog": "DeepMind", "karpathy-blog": "Karpathy", github: "GitHub",
  aitimes: "AI타임스", "zdnet-kr": "ZDNet" };
// 대괄호로 시작하는 제목([Megathread] 등)이 마크다운 링크를 깨뜨린다.
const mdSafe = (s) => s.replace(/([[\]])/g, "\\$1");


// 공개 Summary: 그날 한글 제목·요약이 있는 항목에서만 사건 문장(최대 3).
// 지어내지 않는다. 건수 로그는 ## 수집 기록으로 내린다(2026-09-30 PRD).
const HAS_HANGUL = /[가-힣]/
const PUBLIC_SUMMARY_FALLBACK = "오늘은 한국어로 옮길 공식 발표가 충분하지 않았다.";

function hasKoreanText(item) {
  return HAS_HANGUL.test(item.title ?? "") || HAS_HANGUL.test(item.summary ?? "");
}

function leadSentence(text) {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!s) return "";
  if (/[.。!?？]$/.test(s)) return s;
  return `${s}.`;
}

function leadFromItem(item) {
  const title = String(item.title ?? "").trim();
  const summary = String(item.summary ?? "").trim();
  if (HAS_HANGUL.test(title)) return leadSentence(title);
  if (HAS_HANGUL.test(summary)) {
    const first = (summary.split(/(?<=[.。!?？])\s+/)[0] ?? summary).slice(0, 120).trim();
    return leadSentence(first);
  }
  return "";
}

function buildPublicSummary(items) {
  const ordered = [
    ...items.filter((x) => x.src === "aitimes" && hasKoreanText(x)),
    ...items.filter((x) => x.src === "zdnet-kr" && hasKoreanText(x)),
    ...items.filter((x) => x.src !== "aitimes" && x.src !== "zdnet-kr" && hasKoreanText(x)),
  ];
  const seen = new Set();
  const sentences = [];
  for (const item of ordered) {
    const key = String(item.title ?? "").trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    const sentence = leadFromItem(item);
    if (!sentence) continue;
    seen.add(key);
    sentences.push(sentence);
    if (sentences.length >= 3) break;
  }
  return sentences.length ? sentences.join(" ") : PUBLIC_SUMMARY_FALLBACK;
}

async function main() {
  const notePath = join(TRENDS, `${DATE}.md`);
  const sourcePath = join(TRENDS, `${DATE}.sources.json`);
  if (existsSync(notePath) && !FORCE && !DRY) {
    console.error(`이미 있다: ${notePath} — 노트는 유지, 점수·댓글·빈 HN 요약·detail excerpt만 보강`);
    await enrichExisting(sourcePath);
    process.exit(0);
  }

  console.error("수집 중…");
  const collected = (await Promise.all([
    hackerNews(), lobsters(), geekNews(), reddit(), githubTrending(),
    rssFeed("openai-news", "https://openai.com/news/rss.xml"),
    rssFeed("deepmind-blog", "https://deepmind.google/blog/rss.xml"),
    rssFeed("karpathy-blog", "https://karpathy.bearblog.dev/feed/?type=rss"),
    rssFeed("aitimes", "https://cdn.aitimes.com/rss/gn_rss_allArticle.xml"),
    rssFeed("zdnet-kr", "https://feeds.feedburner.com/zdkorea"),
  ])).flat();

  // List HN summaries for selection haystack (title+summary AI filter). Detail seed runs after URL resolve.
  await fillHackerNewsSummaries(collected);

  // 파이프라인 규약: 전 소스 실패(raw==0)만 실패다. 조용한 날은 실패가 아니다.
  if (collected.length === 0) {
    console.error("FAIL 모든 소스가 0건이다 — 네트워크 또는 전 소스 장애");
    process.exit(1);
  }

  const picked = select(collected);
  for (const item of picked) {
    if (item.needsResolve) { item.url = await resolveGeekNews(item.url); delete item.needsResolve; }
  }
  // 이전 날짜에 이미 실린 항목은 다시 뽑지 않는다. sync 는 최신 등장만 남기므로
  // 다시 뽑으면 그 항목이 어제 페이지에서 사라지고 오늘로 옮겨 온다(10-06 → 10-07 23건).
  const prior = priorPublishedKeys(DATE);
  const selected = picked.filter((item) => !isPriorPublished(item, prior));
  const repeated = picked.length - selected.length;
  if (repeated) console.error(`  이전 날짜에 실린 ${repeated}건 제외`);
  // After GeekNews URL resolve: seed detail excerpts (feed preferred for GeekNews). Soft-fail.
  await seedDetailExcerpts(selected);
  const items = selected
    .filter((x) => x.url.startsWith("https://"))
    .map((x) => {
      const { needsResolve, ...rest } = x;
      if (!rest.summary) delete rest.summary;
      return rest;
    });

  const bySource = items.reduce((acc, x) => ({ ...acc, [x.src]: (acc[x.src] ?? 0) + 1 }), {});
  console.error(`raw ${collected.length} → 선별 ${items.length}`, bySource);

  const top = items.slice().sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 10)
    .map((x) => `- [${SRC_TAG[x.src] ?? x.src}${x.score ? ` ▲${x.score}` : ""}] [${mdSafe(x.title)}](${x.url})`);

  // ## Summary 는 사이트가 리드 문단·메타로 읽는 공개 절이다(sync-news.mjs).
  // 사건 문장만 두고, 건수 로그는 ## 수집 기록으로 내린다. 과거 노트는 소급하지 않는다.
  const publicSummary = buildPublicSummary(items);
  const collectLog = `라이브 소스 raw ${collected.length}건 중 AI 중심 신호 ${items.length}건을 선별했다. 추측성 항목과 YMYL 은 규약대로 제외했다. 소스별 ${Object.entries(bySource).map(([k, v]) => `${k} ${v}`).join(" · ")}.`;
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

${publicSummary}

## 수집 기록

${collectLog}

## Top signals

${top.join("\n")}
`;

  const envelope = { schema: "oiyo.trend-signals.raw", schemaVersion: 1,
    fetchedAt: new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00"), items };

  if (DRY) {
    console.log(note);
    // --dry-run 은 파일을 쓰지 않는다. 상세 근거 분포만 보여 준다.
    const origins = items.reduce((acc, x) => {
      const k = `${x.src}:${x.detailOrigin ?? x.detailStatus ?? "none"}`;
      return { ...acc, [k]: (acc[k] ?? 0) + 1 };
    }, {});
    console.error("detail 근거", origins);
    if (process.env.COLLECT_DRY_JSON) writeFileSync(process.env.COLLECT_DRY_JSON, `${JSON.stringify(items, null, 1)}\n`);
    return;
  }
  writeFileSync(notePath, note);
  writeFileSync(join(TRENDS, `${DATE}.sources.json`), `${JSON.stringify(envelope, null, 1)}\n`);
  console.error(`작성: ${DATE}.md · ${DATE}.sources.json`);
  console.error("다음: npm run sync — 공개 Summary는 사건 문장, 건수는 ## 수집 기록");
}

function urlKey(raw) {
  try {
    const u = new URL(raw);
    u.hash = "";
    u.hostname = u.hostname.toLowerCase().replace(/^www\./, "");
    return u.href.replace(/\/+$/, "");
  } catch {
    return String(raw ?? "");
  }
}

// GitHub Trending 은 같은 저장소가 몇 주씩 오른다(supabase/supabase 는 09-20~10-07 사이 10번).
// 이미 소개한 저장소는 이 기간 동안 다시 싣지 않고, 지나면 다시 "오늘의 저장소"에 올 수 있다.
const REPO_REPEAT_DAYS = 14;

/** URL → 가장 최근 게재일, 제목 of items in trend sources dated strictly before `date`. */
function priorPublishedKeys(date) {
  const urls = new Map();
  const titles = new Set();
  if (!existsSync(TRENDS)) return { urls, titles, date };
  for (const file of readdirSync(TRENDS)) {
    const m = file.match(/^(\d{4}-\d{2}-\d{2})\.sources\.json$/);
    if (!m || m[1] >= date) continue;
    let envelope;
    try { envelope = JSON.parse(readFileSync(join(TRENDS, file), "utf8")); } catch { continue; }
    for (const item of envelope.items ?? []) {
      for (const raw of [item?.url, item?.discussionUrl]) {
        if (!raw) continue;
        const key = urlKey(raw);
        if (!urls.has(key) || urls.get(key) < m[1]) urls.set(key, m[1]);
      }
      const t = String(item?.title ?? "").trim().toLowerCase();
      if (t) titles.add(t);
    }
  }
  return { urls, titles, date };
}

function daysBetween(a, b) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

function isPriorPublished(item, prior) {
  const last = prior.urls.get(urlKey(item.url));
  if (last) return item.src !== "github" || daysBetween(last, prior.date) < REPO_REPEAT_DAYS;
  // 토론 URL 은 원문이 같은 HN 스레드일 때만 의미가 있다(Reddit/GeekNews 스레드 포함).
  if (item.discussionUrl && prior.urls.has(urlKey(item.discussionUrl))) return true;
  // GitHub Trending 은 매일 같은 저장소가 오를 수 있다 — 이미 소개한 저장소는 다시 싣지 않는다(URL 기준).
  return item.src !== "github" && prior.titles.has(String(item.title ?? "").trim().toLowerCase());
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
    if (!String(item.summary ?? "").trim() && hit.summary) item.summary = hit.summary;
    patched++;
  }
  // 같은 날 재실행은 노트를 덮어쓰지 않는다. 빈 HN summary + 미시드 detail 만 보강.
  const hnBare = envelope.items.filter((item) => item.src === "hacker-news" && !String(item.summary ?? "").trim());
  await fillHackerNewsSummaries(hnBare);
  const summarized = hnBare.filter((item) => item.summary).length;
  await seedDetailExcerpts(envelope.items);
  const detailed = envelope.items.filter((item) => item.detailExcerpt).length;
  if (!patched && !summarized && !detailed) {
    console.error("보강 0건 — 라이브 소스와 URL이 겹치지 않음");
    return;
  }
  writeFileSync(sourcePath, `${JSON.stringify(envelope, null, 1)}\n`);
  console.error(`보강: ${sourcePath} · 점수 ${patched}건 · HN 요약 ${summarized}건 · detail excerpt 보유 ${detailed}건`);
}

await main();
