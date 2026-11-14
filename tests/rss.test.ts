import assert from "node:assert/strict";
import { test } from "node:test";
import { buildRss, escapeXml, itemLink, RSS_LIMIT } from "../src/lib/rss.ts";
import type { FeedItem } from "../src/lib/feed.ts";

const base = { src: "HN", score: 1, url: "https://ex.com/a?x=1&y=2", domain: "ex.com" };

test("XML 이스케이프와 제어문자 제거", () => {
  assert.equal(escapeXml(`a<b>&"'\u0001`), "a&lt;b&gt;&amp;&quot;&apos;");
});

test("링크: 상세 요약이 있으면 /item/, 없으면 일일판 위치", () => {
  assert.equal(itemLink({ id: "x1", date: "2026-11-14", detailSummary: "요약" }), "https://news.oiyo.net/item/x1/");
  assert.equal(itemLink({ id: "x2", date: "2026-11-14" }), "https://news.oiyo.net/2026-11-14/#x2");
});

test("RSS 문서: 개수 제한, 날짜, 출처", () => {
  const items: FeedItem[] = Array.from({ length: RSS_LIMIT + 5 }, (_, i) => ({
    ...base, id: `n${i}`, title: `제목 ${i} & <b>`, date: "2026-11-14", publishedAt: "2026-11-14T01:00:00Z", summary: "설명",
  }));
  const xml = buildRss(items);
  assert.equal((xml.match(/<item>/g) ?? []).length, RSS_LIMIT);
  assert.ok(xml.includes("<title>제목 0 &amp; &lt;b&gt;</title>"));
  assert.ok(xml.includes("<pubDate>Sat, 14 Nov 2026 01:00:00 GMT</pubDate>"));
  assert.ok(xml.includes('<source url="https://ex.com/a?x=1&amp;y=2">ex.com</source>'));
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
});
