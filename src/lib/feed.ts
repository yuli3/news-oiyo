export const ITEMS_PER_PAGE = 30;

export const SOURCE_COLOR: Record<string, string> = {
  "hacker-news": "#ff6600",
  HN: "#ff6600",
  lobsters: "#ac130d",
  Lobsters: "#ac130d",
  geeknews: "#0abf53",
  GeekNews: "#0abf53",
};

export type NewsItemRecord = {
  src: string;
  sourceId?: string;
  score: number | null;
  title: string;
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
export function flattenFeed(days: Day[]): FeedItem[] {
  const items: FeedItem[] = [];
  for (const day of days) {
    for (const item of day.items) items.push({ ...item, date: day.date });
  }
  items.sort((a, b) => stamp(b) - stamp(a) || (b.score ?? 0) - (a.score ?? 0));
  return items;
}

export function pageCount(itemCount: number): number {
  return Math.max(1, Math.ceil(itemCount / ITEMS_PER_PAGE));
}
