// 언급 출처(mentions) — 2026-11-17.
//
// 같은 소식이 여러 곳(HN·GeekNews·Reddit·AI타임스 …)에 올라오면 예전에는 첫 등장만 남기고
// 나머지를 조용히 버렸다. 이제 버리는 대신 남긴 항목의 `mentions`에 "어디서 언급했는지"를
// 각주처럼 적는다. 사이트는 이걸 출처 배지로 보여 준다(NewsItem.astro).
//
// 두 종류가 있다.
//   same-link  — 같은 원문 URL 또는 같은 제목. 확실한 중복이라 한 항목으로 합친다.
//   same-story — 같은 날 다른 기사가 같은 소식을 다룬 것(제목 단어가 많이 겹침).
//                2026-11-24부터 대표 기사 하나만 목록에 남기고 나머지는 대표의 출처 배지로 묶는다
//                (clusterSameStories). 묶인 기사는 `storyOf`만 달고 데이터·상세 페이지는 남긴다.
//
// 순수 함수만 둔다. collect-news.mjs · news-pipeline-adapter.mjs · sync-news.mjs가 쓴다.

import { canonicalUrl } from "./news-source-contract.mjs";

const MAX_MENTIONS = 12;

/** https 링크만, &amp; 풀고 추적 파라미터 제거. 못 읽으면 undefined. */
export function cleanLink(raw) {
  if (typeof raw !== "string") return undefined;
  const text = raw.replace(/&amp;/g, "&").trim();
  if (!text.startsWith("https://")) return undefined;
  try { return canonicalUrl(text); } catch { return undefined; }
}

function finite(value) {
  return Number.isFinite(value) && value >= 0 ? Math.trunc(value) : undefined;
}

// 큐레이터 토론 스레드가 사는 곳. 다른 곳을 가리키면 그 스레드·점수는 이 출처 것이 아니다
// (옛 enrichExisting이 같은 URL의 Lobsters 스레드를 HN·GeekNews 항목에 덮어썼다).
const CURATOR_HOSTS = {
  "hacker-news": /(^|\.)ycombinator\.com$/,
  hn: /(^|\.)ycombinator\.com$/,
  lobsters: /(^|\.)lobste\.rs$/,
  geeknews: /(^|\.)hada\.io$/,
  reddit: /(^|\.)reddit\.com$/,
};

function hostOf(url) {
  try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
}

/**
 * 큐레이터 항목의 토론 스레드가 다른 큐레이터 것이면(옛 보강 버그) 스레드·점수·댓글을 걷어 낸다.
 * 바꿨으면 true. 언론·공식 블로그 항목은 건드리지 않는다.
 */
export function dropForeignThread(item) {
  const curatorHost = CURATOR_HOSTS[String(item?.sourceId ?? item?.src ?? "").toLowerCase()];
  if (!curatorHost || typeof item.discussionUrl !== "string") return false;
  if (curatorHost.test(hostOf(item.discussionUrl))) return false;
  delete item.discussionUrl;
  item.score = null;
  delete item.comments;
  return true;
}

/** 한 항목이 "어디서 언급됐는지"를 배지 한 개 크기로 줄인다. */
export function mentionOf(item, kind = "same-link") {
  const src = String(item?.src ?? item?.sourceId ?? "").trim();
  if (!src) return null;
  const curatorHost = CURATOR_HOSTS[String(item.sourceId ?? src).toLowerCase()];
  const thread = cleanLink(item.discussionUrl);
  const threadIsOwn = Boolean(thread) && (!curatorHost || curatorHost.test(hostOf(thread)));
  const mention = { kind, src };
  if (typeof item.sourceId === "string" && item.sourceId) mention.sourceId = item.sourceId;
  // 큐레이터(HN·GeekNews 등)는 자기 토론 스레드가, 언론·공식 블로그는 그 기사 자체가 "언급 위치"다.
  if (threadIsOwn) mention.url = thread;
  else if (!curatorHost && cleanLink(item.url)) mention.url = cleanLink(item.url);
  if (kind === "same-story" && typeof item.title === "string") mention.title = item.title.trim().slice(0, 160);
  if (kind === "same-story" && typeof item.id === "string") mention.itemId = item.id;
  // 점수·댓글은 큐레이터 자기 스레드의 것일 때만 믿는다.
  if (!curatorHost || threadIsOwn) {
    const score = finite(item.score);
    if (score !== undefined) mention.score = score;
    const comments = finite(item.comments);
    if (comments !== undefined) mention.comments = comments;
  }
  return mention;
}

function mentionKey(mention) {
  return `${mention.kind}|${(mention.sourceId ?? mention.src).toLowerCase()}|${mention.url ?? ""}`;
}

/** 이미 있는 mentions에 새 언급을 더한다. 같은 출처·같은 링크는 한 번만. 자기 자신은 넣지 않는다. */
export function addMentions(item, incoming) {
  const own = mentionOf(item);
  const ownKey = own ? mentionKey(own) : "";
  const list = Array.isArray(item.mentions) ? item.mentions.slice() : [];
  const seen = new Set(list.map(mentionKey));
  for (const mention of incoming ?? []) {
    if (!mention || typeof mention !== "object" || !mention.src) continue;
    const key = mentionKey(mention);
    if (key === ownKey || seen.has(key)) continue;
    seen.add(key);
    list.push(mention);
  }
  if (list.length) item.mentions = list.slice(0, MAX_MENTIONS);
  return item;
}

/** sources.json · news.json에서 읽은 mentions를 검증해 안전한 것만 남긴다(https 링크만). */
export function sanitizeMentions(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const kind = m.kind === "same-story" ? "same-story" : "same-link";
    const src = typeof m.src === "string" ? m.src.trim().slice(0, 40) : "";
    if (!src) continue;
    const clean = { kind, src };
    if (typeof m.sourceId === "string" && m.sourceId.trim()) clean.sourceId = m.sourceId.trim().slice(0, 40);
    const link = cleanLink(m.url);
    if (link) clean.url = link.slice(0, 600);
    if (typeof m.title === "string" && m.title.trim()) clean.title = m.title.trim().slice(0, 160);
    if (typeof m.itemId === "string" && /^trend-[0-9a-f]{6,32}$/.test(m.itemId)) clean.itemId = m.itemId;
    const score = finite(m.score);
    if (score !== undefined) clean.score = score;
    const comments = finite(m.comments);
    if (comments !== undefined) clean.comments = comments;
    out.push(clean);
    if (out.length >= MAX_MENTIONS) break;
  }
  return out;
}

// --- same-story: 제목 단어 겹침 ------------------------------------------------

const STOP = new Set(("the and for with from that this into your you are was has have how why what new its our not but all can will " +
  "about over more than show ask tell just now get got use using via after before hugging face paper models").split(" "));
const KO_PARTICLE = /(으로|에서|에게|까지|부터|은|는|이|가|을|를|의|에|와|과|도|로|만)$/;

// 한·영 표기가 갈리는 고유명은 한 단어로 맞춘다(엔비디아 = nvidia). 한글 기사와 영문 큐레이터 글이
// 같은 소식일 때 단어가 겹치게 하려는 것이라 자주 나오는 이름만 둔다.
const ALIAS = {
  "엔비디아": "nvidia", "젠슨": "jensen", "오픈ai": "openai", "구글": "google", "애플": "apple",
  "마이크로소프트": "microsoft", "메타": "meta", "앤트로픽": "anthropic", "앤스로픽": "anthropic",
  "클로드": "claude", "제미나이": "gemini", "챗gpt": "chatgpt", "삼성": "samsung", "삼성전자": "samsung",
  "테슬라": "tesla", "아마존": "amazon", "딥마인드": "deepmind", "딥시크": "deepseek", "퀜": "qwen",
  "트럼프": "trump", "연준": "fed", "비트코인": "bitcoin", "깃허브": "github", "인텔": "intel", "tsmc": "tsmc",
};

/** 비교용 단어 집합. 한글 2자+, 영문 3자+, 숫자. 조사·흔한 영단어·[연재 꼬리표]는 뺀다. */
export function titleTokens(title) {
  const words = String(title ?? "").toLowerCase().normalize("NFKC")
    .replace(/\[[^\]]{0,40}\]/g, " ")
    .match(/[가-힣]{2,}|[a-z][a-z0-9.+-]{2,}|\d+(?:\.\d+)?/g) ?? [];
  const out = new Set();
  for (const raw of words) {
    const w = raw.replace(KO_PARTICLE, "").replace(/[.+-]+$/, "");
    const word = ALIAS[w] ?? w;
    if (word.length >= 2 && !STOP.has(word)) out.add(word);
  }
  return out;
}

/**
 * 두 제목이 같은 소식인지. 공유 단어 3개+·자카드 0.4+, 또는 짧은 제목은 공유 2개+·자카드 0.6+.
 * (11-17의 3개+·0.5+는 일주일에 4건만 잡았다. 11-24 젠슨 황 복귀 기사 7건이 따로 떴다.)
 */
export function sameStory(a, b, { minShared = 3, minJaccard = 0.4, shortShared = 2, shortJaccard = 0.6 } = {}) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  if (shared < Math.min(minShared, shortShared)) return false;
  const jaccard = shared / (a.size + b.size - shared);
  return (shared >= minShared && jaccard >= minJaccard) || (shared >= shortShared && jaccard >= shortJaccard);
}

function overlap(a, b) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / (a.size + b.size - shared || 1);
}

// 대표 기사 고르기 — "가장 원본에 가깝고 읽을거리가 많은 것".
// 공식 1차 출처(회사 블로그·기관) > 언론 > 큐레이터(HN·GeekNews 등). 한국어 상세 요약·본문 번역이
// 있으면 크게 더한다(독자가 실제로 읽을 수 있는 쪽). 점수가 같으면 먼저 나온 기사(원 보도)가 이긴다.
const OFFICIAL_SOURCES = new Set(["openai-news", "deepmind-blog", "google-developers", "nvidia-developer", "karpathy-blog",
  "bok", "moef", "federal-reserve", "sec"]);

export function storyRank(item) {
  const id = String(item?.sourceId ?? item?.src ?? "").toLowerCase();
  let rank = OFFICIAL_SOURCES.has(id) ? 30 : CURATOR_HOSTS[id] || id.startsWith("r-") ? 10 : 20;
  if (typeof item.detailSummary === "string" && item.detailSummary.trim()) rank += 25;
  if (item.translationStatus === "full") rank += 5;
  else if (typeof item.translationKo === "string" && item.translationKo.trim()) rank += 3;
  if (item.detailOrigin === "primary") rank += 3;
  const score = finite(item.score);
  if (score) rank += Math.min(5, Math.log10(score + 1) * 2);
  if (typeof item.summary === "string") rank += Math.min(3, item.summary.trim().length / 80);
  return rank;
}

function stampOf(item) {
  const t = Date.parse(item?.publishedAt ?? item?.fetchedAt ?? "");
  return Number.isNaN(t) ? Infinity : t;
}

/** 묶이기 전 상태로 되돌린다(다시 돌려도 같은 결과가 나오게). */
function resetCluster(item) {
  delete item.storyOf;
  if (!Array.isArray(item.mentions)) return;
  const kept = item.mentions.filter((m) => m?.kind !== "same-story");
  if (kept.length) item.mentions = kept;
  else delete item.mentions;
}

/**
 * 같은 날 같은 소식을 한 묶음으로 만든다(2026-11-24, 세운 "비슷한 것끼리는 원본을 남기고 나머지는 출처로").
 * - 대표 기사(storyRank 최고)는 그대로 두고, 나머지는 대표의 `mentions`(kind same-story)에 출처 배지로 들어간다.
 * - 묶인 기사는 지우지 않고 `storyOf: <대표 id>`만 단다. 목록·RSS·검색에서는 빠지고(feed.ts),
 *   /item/<id>/ 상세 페이지는 남아 대표 기사로 canonical을 건다(링크가 깨지지 않게).
 * - 비교는 대표 제목하고만 한다(사슬로 이어 붙이지 않는다). 그래야 "황 복귀"와 "황 청문회"가 한 덩어리가 되지 않는다.
 * - 묶인 기사가 가진 same-link 언급(HN·GeekNews 토론 등)도 대표의 배지로 올린다.
 * 다시 돌려도 결과가 같다. GitHub 저장소는 별도 섹션이라 뺀다.
 */
export function clusterSameStories(items, options = {}) {
  for (const it of items) if (it && typeof it === "object") resetCluster(it);
  const pool = items
    .map((it, index) => ({ it, index }))
    .filter(({ it }) => it && it.sourceId !== "github" && it.src !== "github" && typeof it.title === "string");
  pool.sort((a, b) => storyRank(b.it) - storyRank(a.it) || stampOf(a.it) - stampOf(b.it) || a.index - b.index);
  const clusters = [];
  for (const { it } of pool) {
    const tokens = titleTokens(it.title);
    let best = null;
    let bestScore = 0;
    for (const c of clusters) {
      if (c.primary.canonicalUrl && c.primary.canonicalUrl === it.canonicalUrl) continue;
      if (!sameStory(c.tokens, tokens, options)) continue;
      const score = overlap(c.tokens, tokens);
      if (score > bestScore) { best = c; bestScore = score; }
    }
    if (best) best.members.push(it);
    else clusters.push({ primary: it, tokens, members: [] });
  }
  let absorbed = 0;
  let grouped = 0;
  for (const { primary, members } of clusters) {
    if (!members.length) continue;
    grouped++;
    const incoming = [];
    for (const member of members) {
      if (typeof primary.id === "string") member.storyOf = primary.id;
      incoming.push(mentionOf(member, "same-story"));
      for (const m of Array.isArray(member.mentions) ? member.mentions : []) {
        if (m?.kind === "same-link") incoming.push({ ...m, kind: "same-story", title: member.title.trim().slice(0, 160), ...(member.id ? { itemId: member.id } : {}) });
      }
      absorbed++;
    }
    addMentions(primary, incoming);
  }
  return { grouped, absorbed };
}
