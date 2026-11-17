import assert from "node:assert/strict";
import { test } from "node:test";
import { adaptTrendSignals } from "../scripts/lib/news-pipeline-adapter.mjs";
import { linkSameStories, mentionOf, titleTokens, sameStory } from "../scripts/lib/mentions.mjs";
import { mentionChips, mentionCount } from "../src/lib/mentions.ts";
import { readFileSync } from "node:fs";

const registry = JSON.parse(readFileSync(new URL("../scripts/lib/news-pipeline-sources.json", import.meta.url), "utf8"));
const fetchedAt = "2026-11-17T00:00:00Z";

test("같은 원문 중복은 버리지 않고 남은 항목의 mentions로 옮긴다", () => {
  const batch = adaptTrendSignals([
    { src: "hacker-news", title: "Deno security", url: "https://ex.com/deno/", discussionUrl: "https://news.ycombinator.com/item?id=1", score: 200, comments: 50 },
    { src: "geeknews", title: "Deno 보안 모델", url: "https://ex.com/deno", discussionUrl: "https://news.hada.io/topic?id=9&amp;utm_source=geeknews" },
    { src: "lobsters", title: "Deno security", url: "https://ex.com/other", discussionUrl: "https://lobste.rs/s/x", score: 30 },
  ], registry, { fetchedAt });
  assert.equal(batch.items.length, 1);
  const [kept] = batch.items;
  assert.equal(kept.sourceId, "hacker-news");
  assert.deepEqual(kept.mentions.map((m: { src: string }) => m.src), ["geeknews", "lobsters"]);
  assert.equal(kept.mentions[0].url, "https://news.hada.io/topic?id=9");
  assert.equal(kept.mentions[1].score, 30);
});

test("다른 큐레이터 스레드가 덮어쓴 토론 링크·점수는 믿지 않는다", () => {
  const batch = adaptTrendSignals([
    { src: "geeknews", title: "x", url: "https://ex.com/a", discussionUrl: "https://lobste.rs/s/x", score: 38 },
  ], registry, { fetchedAt });
  assert.equal(batch.items[0].discussionUrl, undefined);
  assert.equal(batch.items[0].score, null);
  const m: Record<string, unknown> = mentionOf({ src: "hacker-news", sourceId: "hacker-news", url: "https://ex.com/a", discussionUrl: "https://lobste.rs/s/x", score: 38 }) ?? {};
  assert.equal(m.url, undefined);
  assert.equal(m.score, undefined);
});

test("same-story: 제목 단어가 충분히 겹치면 서로 잇고, 항목 수는 그대로", () => {
  type Rec = { id: string; sourceId: string; src: string; title: string; url: string; canonicalUrl: string; mentions?: Array<{ itemId?: string }> };
  const items: Rec[] = [
    { id: "trend-aaaaaaaa", sourceId: "mk-economy", src: "mk-economy", title: "유엔참전용사 추모의날 맞아 이중근 회장 국민대표로 헌화", url: "https://www.mk.co.kr/news/1", canonicalUrl: "https://www.mk.co.kr/news/1" },
    { id: "trend-bbbbbbbb", sourceId: "mk-economy", src: "mk-economy", title: "이중근 부영 회장, ‘유엔참전용사 추모’ 국민대표로 헌화", url: "https://www.mk.co.kr/news/2", canonicalUrl: "https://www.mk.co.kr/news/2" },
    { id: "trend-cccccccc", sourceId: "reddit", src: "reddit", title: "Is Qwen 3.8 27B still the king", url: "https://www.reddit.com/r/a", canonicalUrl: "https://www.reddit.com/r/a" },
    { id: "trend-dddddddd", sourceId: "reddit", src: "reddit", title: "Qwen 3.8 27b is sometimes so smart it scares me", url: "https://www.reddit.com/r/b", canonicalUrl: "https://www.reddit.com/r/b" },
  ];
  assert.equal(linkSameStories(items), 1);
  assert.equal(items.length, 4);
  assert.equal(items[0].mentions?.[0]?.itemId, "trend-bbbbbbbb");
  assert.equal(items[1].mentions?.[0]?.itemId, "trend-aaaaaaaa");
  assert.equal("mentions" in items[2], false);
  assert.equal(sameStory(titleTokens("OpenAI to acquire Pierre Computer Company"), titleTokens("OpenAI to acquire Pierre Computer Company, Inc.")), true);
});

test("칩: 원문 → 자기 출처 → 같은 원문(점수 순) → 같은 소식", () => {
  const chips = mentionChips({
    src: "hacker-news", sourceId: "hacker-news", url: "https://wired.com/x", domain: "wired.com",
    score: 209, comments: 204, discussionUrl: "https://news.ycombinator.com/item?id=1",
    mentions: [
      { kind: "same-link", src: "geeknews" },
      { kind: "same-link", src: "lobsters", url: "https://lobste.rs/s/x", score: 38 },
      { kind: "same-story", src: "aitimes", url: "https://aitimes.com/1", title: "엔비디아…" },
    ],
  });
  assert.deepEqual(chips.map((c) => `${c.role}:${c.label}`), ["origin:wired.com", "mention:HN", "mention:Lobsters", "mention:GeekNews", "story:AI타임스"]);
  assert.equal(chips[2].score, 38);
  assert.equal(chips[3].href, undefined);
  assert.equal(mentionCount(chips), 4);
});

test("언급이 없으면 칩도 없다", () => {
  assert.deepEqual(mentionChips({ src: "hacker-news", url: "https://ex.com", domain: "ex.com" }), []);
});
