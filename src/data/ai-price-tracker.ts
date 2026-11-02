// AI API 가격·무료 등급 확인표 (hotdeal MVP, 2026-10-17 세운 승인 계획:
// company-brain/projects/oiyo-ecosystem/reports/2026-10-17-hotdeal-and-direct-ads-concrete-plan.md).
// WHY: 크롤링·제휴 링크 없이 공식 가격 페이지로만 보낸다. 가격 수치는 자주 바뀌고 이 저장소가
// 실측하지 않았으므로 숫자를 적지 않는다 — "무엇을 비교할지"와 공식 원문 링크만 정본으로 둔다.
// 가격 인하 뉴스가 들어오면 `lastChange`에 출처 URL과 날짜를 함께 적는다(없으면 null).

export interface AiPriceSource {
  provider: string;
  product: string;
  pricingUrl: string;
  /** 공식 페이지에서 확인할 절약 포인트. 수치 없이 항목만. */
  checks: string[];
  lastChange: { date: string; summary: string; sourceUrl: string } | null;
}

export const AI_PRICE_SOURCES_UPDATED = "2026-10-17";

export const AI_PRICE_SOURCES: AiPriceSource[] = [
  {
    provider: "OpenAI",
    product: "API",
    pricingUrl: "https://developers.openai.com/api/docs/pricing",
    checks: ["모델별 입력·출력 단가", "Batch API 할인", "캐시된 입력 할인"],
    lastChange: null,
  },
  {
    provider: "Anthropic",
    product: "Claude API",
    pricingUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
    checks: ["모델별 입력·출력 단가", "프롬프트 캐싱 단가", "Message Batches 할인"],
    lastChange: null,
  },
  {
    provider: "Google",
    product: "Gemini API",
    pricingUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    checks: ["무료 등급 사용 한도", "유료 등급 단가", "Batch 모드 할인", "컨텍스트 캐싱"],
    lastChange: null,
  },
  {
    provider: "Mistral",
    product: "La Plateforme",
    pricingUrl: "https://mistral.ai/pricing",
    checks: ["모델별 단가", "무료 실험 등급 여부"],
    lastChange: null,
  },
  {
    provider: "DeepSeek",
    product: "API",
    pricingUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    checks: ["캐시 적중·미적중 단가", "시간대별 할인 여부"],
    lastChange: null,
  },
  {
    provider: "xAI",
    product: "Grok API",
    pricingUrl: "https://docs.x.ai/docs/models",
    checks: ["모델별 단가", "캐시 입력 단가"],
    lastChange: null,
  },
];
