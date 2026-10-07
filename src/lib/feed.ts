export const ITEMS_PER_PAGE = 30;

export const SOURCE_COLOR: Record<string, string> = {
  "hacker-news": "#ff6600",
  HN: "#ff6600",
  lobsters: "#ac130d",
  Lobsters: "#ac130d",
  geeknews: "#0abf53",
  GeekNews: "#0abf53",
  github: "#24292f",
  GitHub: "#24292f",
  aitimes: "#1d4ed8",
  "AI타임스": "#1d4ed8",
  "zdnet-kr": "#c41e3a",
  "지디넷": "#c41e3a",
};

/** 수집 로그 문단(raw N건 · 소스별)인지. 공개 메타에는 쓰지 않는다. */
export function isCollectLogSummary(summary: string | undefined | null): boolean {
  if (!summary?.trim()) return true;
  return /\braw\b/.test(summary) && /건/.test(summary) && /소스별/.test(summary);
}

/**
 * Internal agent work-notes that leaked into the public day summary
 * (audit 2026-10-05 S5, 2026-09-28 P0-6): "빈 배열을 반환합니다", "당사의 스택",
 * "우리 오이요 패밀리에 적용할 아이디어" and similar first-person product memos,
 * collection-gap ops notes and brain wiki links. They are not news and must not
 * be rendered or indexed. Keep this list in sync with
 * scripts/audit-trend-notes.mjs (INTERNAL_MEMO_PATTERNS).
 */
export const INTERNAL_MEMO_PATTERNS: readonly RegExp[] = [
  /빈\s*배열/,
  /반환합니다/,
  /아이디어(를|는)?\s*(배제|도출|제안|생략)/,
  /\d+\s*개의\s*아이디어/,
  /제안을\s*생략/,
  /당사/,
  /저희/,
  /오이요/,
  /oiyo/i,
  /우리\s*(서비스|스택|OS|제품|사이트|네트워크)/,
  /우리와\s*같은/,
  /\[\[[^\]]+\]\]/,
  /ops-dashboard|AI-native OS/i,
  /수집\s*공백/,
];

export function isInternalMemo(text: string | undefined | null): boolean {
  if (!text?.trim()) return false;
  return INTERNAL_MEMO_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Public part of a day summary: paragraphs that read as internal memos are
 * dropped, the rest is kept. Returns "" when nothing public is left.
 * news.json is not rewritten; this guard runs at render time.
 */
export function publicDaySummary(summary: string | undefined | null): string {
  if (!summary?.trim()) return "";
  return summary
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !isInternalMemo(paragraph))
    .join("\n\n");
}

/** 메타·OG·JSON-LD용. 수집 로그면 폴백, 사건 Summary면 약 140자 문장 경계 절단. */
export function metaDescriptionFromSummary(summary: string | undefined | null, fallback: string): string {
  const publicText = publicDaySummary(summary);
  if (!publicText || isCollectLogSummary(publicText)) return fallback;
  const text = publicText;
  if (text.length <= 140) return text;
  const slice = text.slice(0, 140);
  let best = -1;
  for (const ch of [".", "。", "!", "？", "?"]) {
    const i = slice.lastIndexOf(ch);
    if (i > best) best = i;
  }
  if (best >= 40) return slice.slice(0, best + 1).trim();
  return slice.trimEnd();
}

export type DetailStatus = "ok" | "skipped" | "failed" | "pending_summary";
export type ExcerptSource = "og" | "meta" | "body" | "feed" | "readme";
/**
 * Where the detail excerpt came from (2026-10-07).
 * primary = the linked 1st-party page, readme = GitHub README,
 * curator = HN/GeekNews/Reddit text because the original could not be read.
 */
export type DetailOrigin = "primary" | "readme" | "curator";

export type NewsItemRecord = {
  id?: string;
  src: string;
  sourceId?: string;
  score: number | null;
  title: string;
  /** 제목 아래 한 줄. 수집 시점에 원문 소스가 준 설명만 담는다(2026-09-20~). */
  summary?: string;
  /** Agent-written Korean detail summary (public). Empty until agent-batch fills. */
  detailSummary?: string;
  /** Original excerpt for agent summarization (not shown as main public body). */
  detailExcerpt?: string;
  excerptSource?: ExcerptSource | string;
  detailStatus?: DetailStatus | string;
  detailFetchedAt?: string;
  detailOrigin?: DetailOrigin | string;
  url: string;
  domain: string;
  comments?: number | null;
  publishedAt?: string;
  fetchedAt?: string;
  discussionUrl?: string;
};

export type Day = {
  date: string;
  summary: string;
  items: NewsItemRecord[];
  ideas: { title: string; hypothesis: string }[];
};

export type FeedItem = NewsItemRecord & { date: string };

function stamp(item: FeedItem): number {
  const raw = item.publishedAt ?? item.fetchedAt ?? `${item.date}T00:00:00Z`;
  const t = Date.parse(raw);
  return Number.isNaN(t) ? 0 : t;
}

/** Flatten date-grouped days into a newest-first board feed. Dedup is already done at sync. */
// 2026-10-05: 상세 페이지는 한국어 요약이 있을 때만 만든다. c409ce7 은 id 만 있으면
// 전부 만들어서 1,698장 중 1,656장이 "요약 준비 중"뿐인 색인 페이지였다.
// 목록의 "자세히 읽기" 링크와 getStaticPaths 가 이 함수 하나를 같이 쓴다.
export function hasDetailPage(item: Pick<NewsItemRecord, "detailSummary"> & { id?: string }): boolean {
  return typeof item.id === "string" && item.id.length > 0 && Boolean(item.detailSummary?.trim());
}

/**
 * Curators: they tell us where a story is being talked about, not what it says.
 * The item URL is the original; the curator is shown as "<이름>에서 화제".
 */
export const CURATOR_SOURCES: ReadonlySet<string> = new Set([
  "hacker-news", "HN", "geeknews", "GeekNews", "lobsters", "Lobsters", "reddit", "Reddit",
]);

export function isCuratorSource(src: string | undefined | null): boolean {
  return Boolean(src && CURATOR_SOURCES.has(src));
}

/** GitHub Trending repos live in their own "오늘의 저장소" section, not the news flow. */
export function isRepoItem(item: Pick<NewsItemRecord, "src" | "sourceId">): boolean {
  return item.sourceId === "github" || item.src === "github" || item.src === "GitHub";
}

export function splitDayItems(items: NewsItemRecord[]): { news: NewsItemRecord[]; repos: NewsItemRecord[] } {
  const news: NewsItemRecord[] = [];
  const repos: NewsItemRecord[] = [];
  for (const item of items) (isRepoItem(item) ? repos : news).push(item);
  return { news, repos };
}

/** Main news flow. GitHub repos are excluded (see splitDayItems / RepoList). */
export function flattenFeed(days: Day[], { includeRepos = false }: { includeRepos?: boolean } = {}): FeedItem[] {
  const items: FeedItem[] = [];
  for (const day of days) {
    for (const item of day.items) {
      if (!includeRepos && isRepoItem(item)) continue;
      items.push({ ...item, date: day.date });
    }
  }
  items.sort((a, b) => stamp(b) - stamp(a) || (b.score ?? 0) - (a.score ?? 0));
  return items;
}

export function pageCount(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / ITEMS_PER_PAGE));
}
