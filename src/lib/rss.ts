// 2026-11-14: news.oiyo.net/rss.xml. 상황판 아이디어 news-signal-mcp(RSS 404)의 첫 단계.
// 순수 함수만 둔다(테스트 가능). 링크는 요약 상세가 있으면 /item/<id>/, 없으면 일일판 위치.
import type { FeedItem } from "./feed";

// feed.ts 의 hasDetailPage 와 같은 규칙. Node 테스트가 확장자 없는 import 를 못 풀어서 여기 둔다.
const hasDetailPage = (it: { id?: string; detailSummary?: string }) =>
  typeof it.id === "string" && it.id.length > 0 && Boolean(it.detailSummary?.trim());

export const SITE = "https://news.oiyo.net";
export const RSS_LIMIT = 50;
const DESC_MAX = 280;

export function escapeXml(s: string): string {
  return s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function itemLink(it: Pick<FeedItem, "id" | "date" | "detailSummary">): string {
  if (hasDetailPage(it)) return `${SITE}/item/${it.id}/`;
  return it.id ? `${SITE}/${it.date}/#${it.id}` : `${SITE}/${it.date}/`;
}

function itemDate(it: FeedItem): Date {
  const t = Date.parse(it.publishedAt ?? it.fetchedAt ?? `${it.date}T00:00:00Z`);
  return new Date(Number.isNaN(t) ? 0 : t);
}

function description(it: FeedItem): string {
  const raw = (it.detailSummary?.trim() || it.summary?.trim() || "").replace(/[#*_`>]/g, "").replace(/\s+/g, " ");
  return raw.length > DESC_MAX ? `${raw.slice(0, DESC_MAX)}…` : raw;
}

/** 최신순 FeedItem 배열(flattenFeed 결과)을 RSS 2.0 문서로. */
export function buildRss(items: readonly FeedItem[], now: Date = new Date()): string {
  const top = items.filter((it) => it.title?.trim()).slice(0, RSS_LIMIT);
  const last = top.length ? itemDate(top[0]) : now;
  const body = top
    .map((it) => {
      const link = itemLink(it);
      const desc = description(it);
      return [
        "<item>",
        `<title>${escapeXml(it.title.trim())}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="${hasDetailPage(it)}">${escapeXml(hasDetailPage(it) ? link : `${SITE}/#${it.id ?? it.url}`)}</guid>`,
        `<pubDate>${itemDate(it).toUTCString()}</pubDate>`,
        it.domain ? `<source url="${escapeXml(it.url)}">${escapeXml(it.domain)}</source>` : "",
        desc ? `<description>${escapeXml(desc)}</description>` : "",
        "</item>",
      ].filter(Boolean).join("");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>오이요 뉴스</title>
<link>${SITE}/</link>
<atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
<description>AI·개발·IT 소식을 한국어로 매일 정리합니다.</description>
<language>ko</language>
<lastBuildDate>${last.toUTCString()}</lastBuildDate>
${body}
</channel>
</rss>
`;
}
