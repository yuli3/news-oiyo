// 언급 출처(mentions) — 2026-11-17.
//
// 같은 소식이 여러 곳(HN·GeekNews·Reddit·AI타임스 …)에 올라오면 예전에는 첫 등장만 남기고
// 나머지를 조용히 버렸다. 이제 버리는 대신 남긴 항목의 `mentions`에 "어디서 언급했는지"를
// 각주처럼 적는다. 사이트는 이걸 출처 배지로 보여 준다(NewsItem.astro).
//
// 두 종류가 있다.
//   same-link  — 같은 원문 URL 또는 같은 제목. 확실한 중복이라 한 항목으로 합친다.
//   same-story — 같은 날 다른 기사가 같은 소식을 다룬 것(제목 단어가 많이 겹침).
//                추정이므로 합치지 않고 서로 "같은 소식" 배지로 잇기만 한다.
//                (합치면 흡수된 항목의 /item/<id>/ 상세 페이지가 사라진다.)
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
  "about over more than show ask tell just now get got use using via after before").split(" "));
const KO_PARTICLE = /(으로|에서|에게|까지|부터|은|는|이|가|을|를|의|에|와|과|도|로|만)$/;

/** 비교용 단어 집합. 한글 2자+, 영문 3자+, 숫자. 조사·흔한 영단어는 뺀다. */
export function titleTokens(title) {
  const words = String(title ?? "").toLowerCase().normalize("NFKC")
    .match(/[가-힣]{2,}|[a-z][a-z0-9.+-]{2,}|\d+(?:\.\d+)?/g) ?? [];
  const out = new Set();
  for (const raw of words) {
    const w = raw.replace(KO_PARTICLE, "").replace(/[.+-]+$/, "");
    if (w.length >= 2 && !STOP.has(w)) out.add(w);
  }
  return out;
}

/** 두 제목이 같은 소식인지. 보수적으로 — 공유 단어 3개 이상 + 자카드 0.5 이상. */
export function sameStory(a, b, { minShared = 3, minJaccard = 0.5 } = {}) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  if (shared < minShared) return false;
  return shared / (a.size + b.size - shared) >= minJaccard;
}

/**
 * 같은 날 항목들 사이의 same-story 언급을 서로 단다(항목 수는 그대로).
 * GitHub 저장소는 별도 섹션이라 대상에서 뺀다.
 */
export function linkSameStories(items, options = {}) {
  const pool = items.filter((it) => it && it.sourceId !== "github" && it.src !== "github");
  const tokens = pool.map((it) => titleTokens(it.title));
  let links = 0;
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      if (pool[i].canonicalUrl && pool[i].canonicalUrl === pool[j].canonicalUrl) continue;
      if (!sameStory(tokens[i], tokens[j], options)) continue;
      addMentions(pool[i], [mentionOf(pool[j], "same-story")]);
      addMentions(pool[j], [mentionOf(pool[i], "same-story")]);
      links++;
    }
  }
  return links;
}
