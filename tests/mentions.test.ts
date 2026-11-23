import assert from "node:assert/strict";
import { test } from "node:test";
import { adaptTrendSignals } from "../scripts/lib/news-pipeline-adapter.mjs";
import { clusterSameStories, mentionOf, titleTokens, sameStory, storyRank } from "../scripts/lib/mentions.mjs";
import { foldedStories, mentionChips, mentionCount } from "../src/lib/mentions.ts";
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

type Rec = {
  id: string; sourceId: string; src: string; title: string; url: string; canonicalUrl: string;
  detailSummary?: string; score?: number | null; publishedAt?: string; storyOf?: string;
  mentions?: Array<{ kind: string; src: string; itemId?: string; title?: string; url?: string }>;
};
const rec = (id: string, sourceId: string, title: string, extra: Partial<Rec> = {}): Rec => ({
  id, sourceId, src: sourceId, title, url: `https://ex.com/${id}`, canonicalUrl: `https://ex.com/${id}`, ...extra,
});

test("same-story: 같은 소식은 대표 하나만 남기고 나머지는 대표의 출처 배지로 묶는다", () => {
  const items: Rec[] = [
    rec("trend-aaaaaaaa", "mk-economy", "유엔참전용사 추모의날 맞아 이중근 회장 국민대표로 헌화"),
    rec("trend-bbbbbbbb", "mk-economy", "이중근 부영 회장, ‘유엔참전용사 추모’ 국민대표로 헌화", { detailSummary: "요약" }),
    rec("trend-cccccccc", "reddit", "Is Qwen 3.8 27B still the king"),
    rec("trend-dddddddd", "zdnet-kr", "삼성전자 3분기 실적 발표"),
  ];
  assert.deepEqual(clusterSameStories(items), { grouped: 1, absorbed: 1 });
  assert.equal(items.length, 4, "데이터는 지우지 않는다");
  // 한국어 상세 요약이 있는 쪽이 대표
  assert.equal(items[0].storyOf, "trend-bbbbbbbb");
  assert.equal(items[1].storyOf, undefined);
  assert.equal(items[1].mentions?.[0]?.kind, "same-story");
  assert.equal(items[1].mentions?.[0]?.itemId, "trend-aaaaaaaa");
  assert.equal("mentions" in items[2], false);
  assert.equal(sameStory(titleTokens("OpenAI to acquire Pierre Computer Company"), titleTokens("OpenAI to acquire Pierre Computer Company, Inc.")), true);
});

test("same-story: 다시 돌려도 같은 결과(멱등)", () => {
  const items: Rec[] = [
    rec("trend-11111111", "zdnet-kr", "젠슨 황, 엔비디아 CEO 전격 복귀…이사회 만장일치로 복직 의결"),
    rec("trend-22222222", "hankyung-finance", "젠슨 황, 엔비디아 CEO 전격 복귀…이사회 만장일치 결정"),
  ];
  clusterSameStories(items);
  const first = JSON.stringify(items);
  clusterSameStories(items);
  assert.equal(JSON.stringify(items), first);
  assert.equal(items.filter((it) => it.storyOf).length, 1);
});

test("same-story: 대표와만 비교한다(사슬로 다른 소식까지 끌어오지 않는다)", () => {
  const items: Rec[] = [
    rec("trend-a1a1a1a1", "zdnet-kr", "젠슨 황 엔비디아 CEO 복귀 이사회 결정", { detailSummary: "x" }),
    rec("trend-b2b2b2b2", "aitimes", "젠슨 황 엔비디아 CEO 복귀 상원 청문회"),
    rec("trend-c3c3c3c3", "aitimes", "엔비디아 상원 청문회 출석 일정 확정 수출 규제"),
  ];
  clusterSameStories(items);
  assert.equal(items[1].storyOf, "trend-a1a1a1a1");
  assert.equal(items[2].storyOf, undefined);
});

test("same-story: 한·영 표기가 달라도 고유명은 맞춘다, 연재 꼬리표는 무시", () => {
  assert.equal(titleTokens("엔비디아 젠슨 황 [젠슨 황 CEO 복귀]").has("nvidia"), true);
  assert.equal(titleTokens("월가 목표가 [젠슨 황 CEO 복귀]").has("복귀"), false);
  assert.equal(sameStory(titleTokens("haru-4b · Hugging Face"), titleTokens("Zonos3 · Hugging Face")), false);
});

test("대표 고르기: 공식 블로그·한국어 요약이 큐레이터보다 앞선다", () => {
  assert.ok(storyRank({ sourceId: "deepmind-blog", title: "x" }) > storyRank({ sourceId: "hacker-news", title: "x", score: 900 }));
  assert.ok(storyRank({ sourceId: "geeknews", title: "x", detailSummary: "요약" }) > storyRank({ sourceId: "aitimes", title: "x" }));
});

test("묶인 기사의 같은 원문 언급(HN 등)도 대표 배지로 올라온다", () => {
  const items: Rec[] = [
    rec("trend-d1d1d1d1", "deepmind-blog", "Introducing Gemini 4 Hydrogen", { detailSummary: "요약" }),
    rec("trend-e2e2e2e2", "hacker-news", "Gemini 4 Hydrogen", { mentions: [{ kind: "same-link", src: "lobsters", url: "https://lobste.rs/s/g" }] }),
  ];
  clusterSameStories(items);
  assert.deepEqual(items[0].mentions?.map((m) => m.src), ["hacker-news", "lobsters"]);
  assert.equal(items[1].mentions?.[0]?.kind, "same-link", "묶인 기사 자신의 언급은 그대로");
  const folded = foldedStories(items[0].mentions as never);
  assert.equal(folded.length, 1, "같은 기사에서 온 언급은 제목 한 줄로");
  assert.equal(folded[0].title, "Gemini 4 Hydrogen");
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
  assert.deepEqual(chips.map((c) => c.kind), ["원문", "커뮤니티", "커뮤니티", "커뮤니티", "뉴스"]);
  assert.equal(chips[2].score, 38);
  assert.equal(chips[3].href, undefined);
  assert.equal(mentionCount(chips), 4);
});

test("언급이 없으면 칩도 없다", () => {
  assert.deepEqual(mentionChips({ src: "hacker-news", url: "https://ex.com", domain: "ex.com" }), []);
});
