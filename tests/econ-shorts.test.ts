import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { WIRE_SOURCES } from "../server/econ-wire.ts";
import { buildMeta, card, isOfficial, koHint, OFFICIAL, selectItems, timeline } from "../scripts/lib/econ-shorts.mjs";

const wire = JSON.parse(readFileSync(new URL("./fixtures/wire-econ-shorts.json", import.meta.url), "utf8"));
const now = new Date("2026-11-23T08:00:00+09:00");

test("OFFICIAL 은 와이어의 1차 출처와 같다", () => {
  const primary = WIRE_SOURCES.filter((s) => s.primary).map((s) => s.id).sort();
  assert.deepEqual(Object.keys(OFFICIAL).sort(), primary);
});

test("selectItems: 공식 발표만, 중복 제목 1건, 30시간 안, 속보 먼저", () => {
  const items = selectItems(wire, { now });
  assert.ok(items.every(isOfficial));
  assert.ok(!items.some((i: { source: string }) => i.source.startsWith("yna")));
  assert.equal(items.filter((i: { title: string }) => i.title === "2026년 10월 생산자물가지수").length, 1);
  assert.ok(!items.some((i: { id: string }) => i.id === "o1"), "5일 지난 발표는 빠진다");
  assert.ok(!items.some((i: { id: string }) => i.id === "a2"), "은행 신청 승인 같은 행정 공지는 빠진다");
  assert.equal(items[0].id, "a3");
  assert.ok(items.length >= 3 && items.length <= 5);
});

test("selectItems: 3건 미만이면 빈 배열", () => {
  assert.deepEqual(selectItems({ items: wire.items.slice(0, 1) }, { now }), []);
  assert.deepEqual(selectItems(null, { now }), []);
});

test("card·buildMeta: 한국어 한 줄은 크게, 원제는 작게, 링크·면책 포함", () => {
  const c = card(wire.items[2]);
  assert.equal(c.headline, "미국 10월 소비자물가지수 발표");
  assert.equal(c.original, "Consumer Price Index – October 2026");
  assert.equal(c.when, "11/22(일) 22:30");
  const meta = buildMeta(selectItems(wire, { now }).map(card), now);
  assert.equal(meta.date, "2026-11-23");
  assert.ok(meta.youtube.title.length <= 100 && meta.youtube.title.endsWith("#Shorts"));
  assert.match(meta.youtube.description, /https:\/\/www\.bls\.gov/);
  assert.match(meta.youtube.description, /투자 권유가 아닙니다/);
});

test("timeline: 60초 안", () => {
  for (const n of [3, 4, 5]) {
    const t = timeline(n);
    assert.equal(t.durs.length, n + 2);
    assert.ok(t.length <= 59 && t.length >= 40, `${n}: ${t.length}`);
  }
});

test("koHint: 정형 발표·연설만 한국어로, 잡다한 공지는 빠진다", () => {
  assert.equal(koHint({ title: "Employment Situation Summary", source: "bls-empsit" }), "미국 고용보고서 발표");
  assert.equal(koHint({ title: "Christine Lagarde: Acting in time", source: "ecb", sourceName: "ECB 유럽중앙은행" }), "Christine Lagarde 연설");
  assert.equal(koHint({ title: "Activities of U.S. Multinational Enterprises, 2024", source: "bea" }), null);
  assert.equal(isOfficial({ title: "Federal Reserve announces College Fed Challenge winners", source: "federal-reserve" }), false);
  const c = card({ id: "x", title: "Christine Lagarde: Acting in time", source: "ecb", sourceName: "ECB", url: "https://www.ecb.europa.eu/x", publishedAt: "2026-11-20T08:30:00Z" });
  assert.equal(c.headline, "Christine Lagarde 연설");
  assert.equal(c.original, "Christine Lagarde: Acting in time");
});

test("selectItems: 한국어 가능한 발표가 3건 이상이면 영어 원제뿐인 발표는 뺀다", () => {
  const items = selectItems(wire, { now });
  assert.ok(!items.some((i: { id: string }) => i.id === "a5"), "ECB 영문 원제뿐인 발표");
});
