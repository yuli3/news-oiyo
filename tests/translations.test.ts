import assert from "node:assert/strict";
import { test } from "node:test";
import { applyTranslation, needsTitleKo, parseTranslation, TITLE_KO_MAX } from "../scripts/lib/translations.mjs";
import { buildRss } from "../src/lib/rss.ts";

const rec = (extra: Record<string, unknown> = {}) => ({ summary: "요약", body: "본문", translatedBy: "Claude", ...extra });

test("titleKo: 원제에 한글이 없을 때만 덮어씌우고 원제는 그대로 둔다", () => {
  const item = applyTranslation({ title: "OpenAI ships a new model" }, rec({ titleKo: "OpenAI, 새 모델 출시" }));
  assert.equal(item.title, "OpenAI ships a new model");
  assert.equal(item.titleKo, "OpenAI, 새 모델 출시");
});

test("titleKo: 한글 원제·한글 없는 titleKo·빈 값은 무시", () => {
  assert.equal(applyTranslation({ title: "한국은행 기준금리 동결" }, rec({ titleKo: "다른 제목" })).titleKo, undefined);
  assert.equal(applyTranslation({ title: "New model" }, rec({ titleKo: "New model" })).titleKo, undefined);
  assert.equal(applyTranslation({ title: "New model" }, rec()).titleKo, undefined);
});

test("titleKo: 공백 정리와 길이 상한", () => {
  const long = "가".repeat(TITLE_KO_MAX + 30);
  assert.equal(applyTranslation({ title: "x" }, rec({ titleKo: "  새   모델  " })).titleKo, "새 모델");
  assert.equal(applyTranslation({ title: "x" }, rec({ titleKo: long })).titleKo.length, TITLE_KO_MAX);
});

test("needsTitleKo와 머리말 파싱", () => {
  assert.equal(needsTitleKo("Gemini 4 launch"), true);
  assert.equal(needsTitleKo("삼성, HBM5 공개"), false);
  const parsed = parseTranslation('---\nid: trend-1\ntitle: "Gemini 4: launch"\ntitleKo: "제미나이 4: 출시"\n---\n본문') as { titleKo?: string };
  assert.equal(parsed.titleKo, "제미나이 4: 출시");
});

test("RSS 제목은 한국어 제목을 먼저 쓴다", () => {
  const xml = buildRss([{ src: "HN", score: 1, url: "https://ex.com/a", domain: "ex.com", id: "a", date: "2026-11-29", title: "New model", titleKo: "새 모델" }]);
  assert.ok(xml.includes("<title>새 모델</title>"));
  assert.ok(!xml.includes("<title>New model</title>"));
});
