import type { APIRoute } from "astro";
import data from "../data/news.json";
import { flattenFeed, type Day } from "../lib/feed";
import type { SearchEntry } from "../lib/search";

// 2026-11-10: Cmd/Ctrl+K 검색 팔레트 색인. 날짜별 일일판에 실린 뉴스만(저장소 제외) —
// 결과가 /<날짜>/#<id> 로 가기 때문이다. 설명은 70자로 잘라 크기를 줄인다(4천 건 기준 gzip 수백 KB).
// 팔레트를 처음 열 때만 받는다. 페이지 로드에는 영향이 없다.
const SUMMARY_MAX = 70;

export const GET: APIRoute = () => {
  const entries: SearchEntry[] = flattenFeed(data.days as Day[])
    .filter((it) => typeof it.id === "string" && it.id.length > 0)
    .map((it) => {
      const summary = (it.summary ?? "").replace(/\s+/g, " ").trim();
      return [it.id!, it.title, summary.length > SUMMARY_MAX ? `${summary.slice(0, SUMMARY_MAX)}…` : summary, it.date, it.domain ?? ""];
    });
  return new Response(JSON.stringify({ v: 1, entries }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
