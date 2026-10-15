import { test } from "node:test";
import assert from "node:assert/strict";
import { FINANCE_SCOPE, FINANCE_SOURCES, itemInScope, storySections } from "../lib/story-scope.mjs";

test("unrealistic descriptions are not financial results, while actual earnings remain in scope", () => {
  for (const text of ["비현실적 계산 모델", "초현실적 그림", "현실적 접근", "사실적 표현"]) {
    assert.equal(FINANCE_SCOPE.test(text), false, text);
    assert.equal(itemInScope({ title: text, src: "GeekNews" }), false, text);
  }
  for (const text of ["기업 실적 발표", "2분기 호실적 달성", "분기실적 발표", "연간실적 전망", "금리 인하", "Nasdaq earnings"]) {
    assert.equal(FINANCE_SCOPE.test(text), true, text);
    assert.equal(itemInScope({ title: text, src: "GeekNews" }), true, text);
  }
  assert.equal(itemInScope({ title: "OpenAI의 비현실적 FFT 계산 모델", src: "GeekNews" }), true,
    "a real AI story stays in AI scope even though its adjective is not a finance signal");
});

test("the two sections keep finance independent and cross-list AI finance stories without guessing unknown topics", () => {
  assert.deepEqual(storySections({ title: "한국은행 기준금리 결정", src: "GeekNews" }), ["finance"]);
  assert.deepEqual(storySections({ title: "OpenAI IPO와 주가", src: "GeekNews" }), ["ai", "finance"]);
  assert.deepEqual(storySections({ title: "OpenAI의 비현실적 FFT 계산 모델", src: "GeekNews" }), ["ai"]);
  assert.deepEqual(storySections({ title: "새 모델 발표", src: "OpenAI" }), ["ai"]);
  assert.deepEqual(storySections({ title: "새 산책로", src: "GeekNews" }), []);
  assert.deepEqual(storySections({ title: "암 진단을 받았을 때 알아둘 것들", summary: "AI가 증상을 낮게 볼 수 있어요", src: "GeekNews" }), [],
    "incidental AI mentions must not promote medical advice into an AI news desk");
});

test("finance desk covers banking, real estate, gold, ETF/dividend, crypto, and policy without catching look-alikes (2026-10-16)", () => {
  for (const title of ["OK저축은행, 250명 개인·대출정보 유출", "경기 집값·아파트 전세 상승", "금값 사상 최고", "SCHD 배당 ETF 순유입",
    "비트코인 과세 2027년 시행", "한일 통화스왑 연장 합의", "금융위 가계대출 규제", "Gold price hits record", "SEC sues crypto exchange"]) {
    assert.deepEqual(storySections({ title, src: "GeekNews" }), ["finance"], title);
  }
  for (const title of ["은행나무 길 산책", "금요일 회의록", "Memory bank for agents", "10 sec video clip"]) {
    assert.equal(storySections({ title, src: "GeekNews" }).includes("finance"), false, title);
  }
});

test("dedicated finance feeds land on the finance desk by source, and never on the AI desk by source alone", () => {
  for (const src of FINANCE_SOURCES) {
    assert.deepEqual(storySections({ title: "동탄1 랜드마크 뜬다", src }), ["finance"], src);
    assert.equal(itemInScope({ title: "동탄1 랜드마크 뜬다", src }), true, src);
  }
  assert.deepEqual(storySections({ title: "AI 데이터센터 회사채 급락", src: "hankyung-finance" }), ["ai", "finance"]);
});
