import assert from "node:assert/strict";
import { test } from "node:test";
import { hitHref, isChoseongQuery, searchEntries, toChoseong, type SearchEntry } from "../src/lib/search.ts";
import { countNewer, LAST_VISIT_KEY, visitBaseline } from "../src/lib/unread.ts";

const entries: SearchEntry[] = [
  ["trend-a", "Claude Fable 5.2 and Mythos 5.2", "Anthropic이 Claude Fable 5.2를 공개했어요", "2026-11-10", "Anthropic"],
  ["trend-b", "삼성전자 3분기 실적 발표", "반도체 부문 영업이익이 늘었어요", "2026-10-30", "한경"],
  ["trend-c", "Show HN: tiny search", "작은 검색 엔진 소개", "2026-11-01", "Hacker News"],
  ["trend-d", "반도체 수출 증가", "삼성전자와 SK하이닉스가 이끌었어요", "2026-11-05", "매경"],
];

test("초성 변환", () => {
  assert.equal(toChoseong("오이요 AI"), "ㅇㅇㅇ AI");
  assert.equal(toChoseong("빠른"), "ㅃㄹ");
  assert.ok(isChoseongQuery("ㅅㅅ ㅈㅈ"));
  assert.equal(isChoseongQuery("삼성"), false);
  assert.equal(isChoseongQuery(""), false);
});

test("초성 검색은 공백을 무시하고, 제목 일치가 설명 일치보다 위", () => {
  const hits = searchEntries(entries, "ㅅㅅㅈㅈ");
  assert.deepEqual(hits.map((h) => h.id), ["trend-b", "trend-d"]);
});

test("일반 검색: 대소문자 무시, 모든 단어가 있어야 한다", () => {
  assert.deepEqual(searchEntries(entries, "claude MYTHOS").map((h) => h.id), ["trend-a"]);
  assert.deepEqual(searchEntries(entries, "search").map((h) => h.id), ["trend-c"]);
  assert.deepEqual(searchEntries(entries, "claude 삼성").map((h) => h.id), []);
  assert.deepEqual(searchEntries(entries, "   "), []);
});

test("점수가 같으면 최신 날짜가 위, limit 적용", () => {
  const hits = searchEntries(entries, "반도체");
  assert.equal(hits[0].id, "trend-d"); // 제목 일치
  assert.equal(searchEntries(entries, "요", 1).length, 1);
});

test("결과 링크는 일일판의 항목 위치", () => {
  assert.equal(hitHref({ id: "trend-a", date: "2026-11-10" }), "/2026-11-10/#trend-a");
});

function store(init: Record<string, string> = {}) {
  const m = new Map(Object.entries(init));
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), m };
}

test("새 소식 기준: 첫 방문은 null, 다음 세션은 직전 방문 시각, 같은 세션은 고정", () => {
  const local = store();
  assert.equal(visitBaseline(local, store(), 1000), null);
  assert.equal(local.m.get(LAST_VISIT_KEY), "1000");
  const session = store();
  assert.equal(visitBaseline(local, session, 5000), 1000);
  assert.equal(visitBaseline(local, session, 9000), 1000); // 같은 탭 세션 다른 페이지
  assert.equal(local.m.get(LAST_VISIT_KEY), "5000");
});

test("새 소식 개수", () => {
  assert.equal(countNewer(["2026-11-10T00:00:00Z", "2026-11-09T00:00:00Z", "bad"], Date.parse("2026-11-09T12:00:00Z")), 1);
  assert.equal(countNewer([1, 2, 3], null), 0);
});
