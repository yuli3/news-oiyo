// 2026-10-14 세운: 공개 수집과 보드는 AI·금융만 남긴다.
// 단독 model/agent/prompt 는 일반 글까지 통과시켜 쓰지 않는다.
// 정규식에 g 플래그를 붙이면 test()가 lastIndex 를 남겨 다음 판정이 틀린다.

export const AI_SCOPE =
  /\b(ai|llm|gpt|chatgpt|claude|gemini|anthropic|openai|deepmind|mistral|qwen|llama|deepseek|glm|agentic|transformer|embedding|rag|inference|hugging\s?face|copilot|cursor|codex|neural|machine learning|deep learning|prompt injection|prompt engineering)\b|(?:ai|llm).{0,24}agents?|agents?.{0,24}(?:ai|llm)|에이전트|인공지능|생성형|추론|프롬프트|독파모|과기정통|오픈AI|오픈에이아이|앤트로픽|엔비디아|클로드|거대언어|챗봇|멀티모달|파운데이션 모델|언어 모델|오픈웨이트|(?:ai|llm|언어|생성형|파운데이션).{0,16}모델|모델.{0,16}(?:ai|llm|언어|생성)/i;

export const FINANCE_SCOPE =
  /\b(etfs?|ipos?|nasdaq|kospi|kosdaq|s&p 500|dow jones|fomc|federal reserve|treasury|bond yields?|interest rates?|rate cut|rate hike|earnings|dividend|forex|central bank|stock market|stocks\b|share price|equities|bitcoin|ethereum)\b|금리|환율|증시|주가|코스피|코스닥|기준금리|한국은행|연준|국채|배당|공모주|비트코인|이더리움|가상자산|(?<![가-힣])(?:실적|호실적|분기실적|연간실적)|(?:저축)?은행(?!나무)|금융(?!치료)|증권|보험사|카드사|대출|주담대|예금|적금|펀드|채권|외환|통화스왑|부동산|아파트|주택|전세|월세|분양|청약|재건축|금값|금\s?시세|금\s?가격|은값|국제\s?유가|투자자|주주|자사주|상장|시가총액|코인|가상화폐|스테이블코인|과세|세제|금융위|금감원|기재부|재정경제부|공정위|물가|소비자물가|인플레이션|\b(?:gold price|mortgages?|real estate|housing market|crypto(?:currency)?|stablecoins?|securities and exchange commission|cpi|inflation|investors?)\b/i;
// Korean word boundaries are not JS \b: preserve earnings compounds without matching 비현실적/초현실적 (2026-10-15).

// 금융 전용 피드(2026-10-16): 이 소스의 항목은 제목에 키워드가 없어도 금융 데스크다.
export const FINANCE_SOURCES = new Set([
  "hankyung-finance", "hankyung-realestate", "mk-economy", "bok", "moef",
  "federal-reserve", "sec", "coindesk", "cnbc-finance", "yahoo-finance",
]);

// 이 소스의 피드는 그 자체가 AI 범위다. 제목에 AI 가 없는 공식 발표도 남긴다.
const AI_SOURCES = new Set([
  "openai-news",
  "OpenAI",
  "deepmind-blog",
  "DeepMind",
  "karpathy-blog",
  "Karpathy",
  "aitimes",
  "AI타임스",
  "reddit",
  "Reddit",
]);

export function inStoryScope(text, src) {
  if (src && AI_SOURCES.has(src)) return true;
  const hay = String(text ?? "");
  if (src && FINANCE_SOURCES.has(src)) return true;
  return AI_SCOPE.test(hay) || FINANCE_SCOPE.test(hay);
}

export function itemInScope(item) {
  if (!item) return false;
  const src = item.sourceId || item.src;
  return inStoryScope(`${item.title ?? ""} ${item.summary ?? ""}`, src);
}

/** A financial AI story belongs to both desks; source alone must not make a finance-only story AI. */
export function storySections(item) {
  if (!item) return [];
  // The existing collector excludes medical/health advice. Translated archive titles need the same desk boundary (2026-10-15).
  if (/\b(cancer|suicide|overdose|adhd|diagnos\w*)\b|암\s*진단|암\s*치료|자살|약물\s*과다/i.test(item.title || "")) return [];
  const text = `${item.title ?? ""} ${item.summary ?? ""}`;
  const sections = [];
  if (AI_SCOPE.test(text) || AI_SOURCES.has(item.sourceId || item.src)) sections.push("ai");
  if (FINANCE_SCOPE.test(text) || FINANCE_SOURCES.has(item.sourceId || item.src)) sections.push("finance");
  return sections;
}
