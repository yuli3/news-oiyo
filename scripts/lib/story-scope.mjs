// 2026-10-14 세운: 공개 수집과 보드는 AI·금융만 남긴다.
// 단독 model/agent/prompt 는 일반 글까지 통과시켜 쓰지 않는다.
// 정규식에 g 플래그를 붙이면 test()가 lastIndex 를 남겨 다음 판정이 틀린다.

export const AI_SCOPE =
  /\b(ai|llm|gpt|chatgpt|claude|gemini|anthropic|openai|deepmind|mistral|qwen|llama|deepseek|glm|agentic|transformer|embedding|rag|inference|hugging\s?face|copilot|cursor|codex|neural|machine learning|deep learning|prompt injection|prompt engineering)\b|(?:ai|llm).{0,24}agents?|agents?.{0,24}(?:ai|llm)|에이전트|인공지능|생성형|추론|프롬프트|독파모|과기정통|오픈AI|오픈에이아이|앤트로픽|엔비디아|클로드|거대언어|챗봇|멀티모달|파운데이션 모델|언어 모델|오픈웨이트|(?:ai|llm|언어|생성형|파운데이션).{0,16}모델|모델.{0,16}(?:ai|llm|언어|생성)/i;

export const FINANCE_SCOPE =
  /\b(etfs?|ipos?|nasdaq|kospi|kosdaq|s&p 500|dow jones|fomc|federal reserve|treasury|bond yields?|interest rates?|rate cut|rate hike|earnings|dividend|forex|central bank|stock market|stocks\b|share price|equities|bitcoin|ethereum)\b|금리|환율|증시|주가|코스피|코스닥|기준금리|한국은행|연준|국채|배당|공모주|비트코인|이더리움|가상자산|실적/i;

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
  return AI_SCOPE.test(hay) || FINANCE_SCOPE.test(hay);
}

export function itemInScope(item) {
  if (!item) return false;
  const src = item.sourceId || item.src;
  return inStoryScope(`${item.title ?? ""} ${item.summary ?? ""}`, src);
}
