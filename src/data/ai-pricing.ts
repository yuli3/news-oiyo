// AI 구독 요금제·API 단가 비교표 (/ai/pricing/). 2026-10-20 세운 요청: "2026년 10월 기준 비교".
// WHY: ai-price-tracker.ts는 숫자 없이 공식 링크만 두지만, 이 표는 확인일과 출처를 붙여 숫자를 적는다.
// 규칙: (1) 숫자마다 그 숫자를 실제로 보여 준 공식 페이지 URL을 붙인다. (2) 공식 페이지에서 금액을
// 못 읽었으면 null로 두고 이유를 note에 쓴다. 보도로만 확인된 값은 `reported`에 출처와 함께 따로 둔다.
// (3) 앱스토어 원화가는 Apple 한국 스토어의 앱 내 구입 목록(부가세 포함)이다. 웹 결제가와 다를 수 있다.
// 가격을 바꾸면 PRICING_CHECKED를 그날로 올린다.

export const PRICING_CHECKED = "2026-10-20";

export interface Source { label: string; url: string }

export interface Plan {
  name: string;
  /** 공식 페이지의 달러 정가(월). 연간 결제가가 있으면 함께. */
  usd: string | null;
  /** 그 나라 Apple App Store 앱 내 구입가(월, 세금 포함). */
  localApp: string | null;
  /** 그 나라 공식 웹페이지에 현지 통화로 적힌 가격. */
  localWeb?: string;
  summary: string;
  /** 공식 페이지에 없고 언론 보도로만 확인된 가격. */
  reported?: { price: string; source: Source };
}

export interface Vendor {
  id: string;
  vendor: string;
  product: string;
  plans: Plan[];
  notes: string[];
  sources: Source[];
}

const APPLE_CHATGPT = { label: "App Store 한국 · ChatGPT", url: "https://apps.apple.com/kr/app/chatgpt/id6448311069" };
const APPLE_CLAUDE = { label: "App Store 한국 · Claude", url: "https://apps.apple.com/kr/app/id6473753684" };
const APPLE_GEMINI = { label: "App Store 한국 · Google Gemini", url: "https://apps.apple.com/kr/app/id6477489729" };
const APPLE_GROK = { label: "App Store 한국 · Grok", url: "https://apps.apple.com/kr/app/id6670324846" };

export const SUBSCRIPTIONS: Vendor[] = [
  {
    id: "chatgpt",
    vendor: "OpenAI",
    product: "ChatGPT",
    plans: [
      { name: "Free", usd: "$0", localApp: null, summary: "기본 대화. 이미지 생성·심층 리서치·Codex는 제한적으로 써요." },
      { name: "Go", usd: null, localApp: "₩13,000", summary: "무료보다 메시지·업로드·이미지 생성이 많아요. 광고가 붙을 수 있어요." },
      { name: "Plus", usd: "$20", localApp: "₩29,000", summary: "프로젝트·예약 작업·맞춤 GPT, 더 많은 심층 리서치." },
      { name: "Pro 100", usd: "$100", localApp: "₩159,000", summary: "Pro 세 단계 중 첫 번째. Ultrafast 모드는 빠져 있어요." },
      { name: "Pro 200", usd: "$200", localApp: "₩299,000", summary: "Pro 100보다 넉넉한 사용량. Ultrafast는 빠져 있어요." },
      { name: "Pro 500", usd: "$500", localApp: "₩790,000", summary: "포함 사용량이 가장 많고 Ultrafast 모드가 들어 있어요." },
      { name: "Business", usd: "좌석당 $25 (연간 $20)", localApp: null, summary: "2인부터. 프리미엄 좌석은 $125 (연간 $100)." },
    ],
    notes: [
      "공식 가격 페이지(chatgpt.com/pricing)는 금액을 스크립트로 그려서 이번 확인에서 숫자를 읽지 못했어요. Plus와 Pro는 도움말 센터, Business는 공식 발표문의 금액이에요.",
      "Go의 달러 가격은 공식 문서에서 확인하지 못했어요. 도움말 센터는 \"모든 결제는 USD\"이고 일부 국가만 현지 통화로 청구한다고 안내해요.",
      "앱스토어 목록에는 Plus ₩299,000 항목도 있는데, 이름만으로는 어떤 기간 상품인지 표시되지 않아요.",
    ],
    sources: [
      { label: "도움말 · What is ChatGPT Plus", url: "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" },
      { label: "도움말 · About ChatGPT Pro tiers", url: "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers" },
      { label: "도움말 · What is ChatGPT Go", url: "https://help.openai.com/en/articles/11989085" },
      { label: "OpenAI · Premium seats in ChatGPT Business (2026-08-10)", url: "https://openai.com/index/premium-seats-chatgpt-business" },
      APPLE_CHATGPT,
    ],
  },
  {
    id: "claude",
    vendor: "Anthropic",
    product: "Claude",
    plans: [
      { name: "Free", usd: "$0", localApp: null, summary: "일상 사용. 5시간 단위로 한도가 다시 채워져요." },
      { name: "Pro", usd: "$20 (연간 월 $17)", localApp: "₩33,000", summary: "5시간 세션당 무료의 5배 이상. 연간은 $200 선결제, 앱스토어 연간 ₩349,000." },
      { name: "Max 5x", usd: "$100", localApp: "₩199,000", summary: "Pro의 5배 사용량, 매달 API 크레딧 $100 포함. 월 결제만 가능." },
      { name: "Max 20x", usd: "$200", localApp: "₩449,000", summary: "Pro의 20배 사용량, 매달 API 크레딧 $200 포함." },
      { name: "Team 표준 좌석", usd: "$25 (연간 $20)", localApp: null, summary: "2~150명. Pro보다 많은 사용량." },
      { name: "Team 프리미엄 좌석", usd: "$125 (연간 $100)", localApp: null, summary: "표준 좌석의 5배. 팀 전체에 최대 월 $500 API 크레딧." },
    ],
    notes: [
      "공식 가격표의 달러 금액은 세금 별도예요. 앱스토어 원화가는 부가세 포함이라 두 숫자를 그대로 비교하면 안 돼요.",
      "앱스토어에는 사용량 추가 크레딧(20·50·250)도 따로 팔아요: ₩33,000·₩77,000·₩349,000.",
    ],
    sources: [{ label: "Claude 가격표", url: "https://claude.com/pricing" }, APPLE_CLAUDE],
  },
  {
    id: "gemini",
    vendor: "Google",
    product: "Gemini (Google AI 요금제)",
    plans: [
      { name: "무료", usd: null, localApp: null, localWeb: "₩0", summary: "Flash-Lite 모델, 15GB 저장공간, Deep Research·Gemini Live·Canvas." },
      { name: "Google AI Plus", usd: null, localApp: "₩7,500", localWeb: "₩7,500", summary: "Flash 모델, 무료의 2배 한도, 400GB, Flow 크레딧 200." },
      { name: "Google AI Pro", usd: null, localApp: "₩29,000", summary: "Gemini 4 Argon·Pro 모델, 무료의 4배 한도, 5TB, Antigravity 기본 한도." },
      { name: "Google AI Ultra (5x)", usd: null, localApp: null, localWeb: "₩119,000", summary: "AI Pro의 5배 한도, Flow 크레딧 10,000, Project Genie." },
      { name: "Google AI Ultra (20x)", usd: null, localApp: "₩300,000", localWeb: "₩300,000", summary: "AI Pro의 20배 한도, Flow 크레딧 25,000, Antigravity Ultra 20x." },
    ],
    notes: [
      "한국 공식 요금제 페이지에서 Plus와 Ultra 원화가는 읽었지만 AI Pro 금액은 표시되지 않았어요. AI Pro는 앱스토어 가격이에요.",
      "Google One은 2026-10-31까지 일부 대상자에게 AI Pro 연간 요금제 40% 할인을 안내하고 있어요.",
      "요금제에 저장공간(Drive·Gmail·포토)이 같이 들어 있어요. 이미 Google One을 쓰고 있다면 그 비용을 빼고 비교하세요.",
    ],
    sources: [
      { label: "Gemini 한국 요금제", url: "https://gemini.google/kr/subscriptions/?hl=ko" },
      { label: "Google One · AI 요금제 활용법", url: "https://one.google.com/intl/ko_kr/about/articles/3-ways-to-use-google-ai-plans" },
      APPLE_GEMINI,
    ],
  },
  {
    id: "grok",
    vendor: "xAI",
    product: "Grok",
    plans: [
      { name: "Free", usd: "$0", localApp: null, summary: "기본 사용." },
      { name: "Plus", usd: "$8", localApp: null, summary: "x.ai 가격표 기준 이름." },
      { name: "Premium", usd: "$30", localApp: null, summary: "x.ai 가격표 기준 이름." },
      { name: "Super", usd: "$100", localApp: null, summary: "x.ai 가격표 기준 이름." },
      { name: "Ultra", usd: "$200", localApp: null, summary: "x.ai 가격표 기준 이름." },
      { name: "Teams", usd: "좌석당 $30부터", localApp: null, summary: "팀 관리." },
      { name: "SuperGrok Lite (앱)", usd: null, localApp: "₩14,000", summary: "앱스토어 이름." },
      { name: "SuperGrok (앱)", usd: null, localApp: "₩44,000", summary: "앱스토어 이름." },
      { name: "SuperGrok Plus (앱)", usd: null, localApp: "₩149,000", summary: "앱스토어 이름." },
      { name: "SuperGrok Heavy (앱)", usd: null, localApp: "₩449,000", summary: "앱스토어 이름." },
    ],
    notes: [
      "x.ai 가격표와 앱스토어가 서로 다른 요금제 이름을 써요. 어느 이름이 어느 상품과 같은지 공식 문서로 확인하지 못해서 짝짓지 않고 따로 적었어요.",
      "API 사용료는 구독과 별도로 청구돼요.",
    ],
    sources: [{ label: "x.ai 가격표", url: "https://x.ai/pricing" }, APPLE_GROK],
  },
  {
    id: "muse",
    vendor: "Meta",
    product: "Muse Code (Muse Wonder)",
    plans: [
      { name: "Everyday Usage", usd: null, localApp: null, summary: "5시간마다 프롬프트 10~50개. Muse Spark·Muse Wonder·Muse Image.", reported: { price: "$5", source: { label: "Subscription Insider (2026-09-01)", url: "https://www.subscriptioninsider.com/blog/meta-adds-monthly-plans-as-muse-code-exits-beta" } } },
      { name: "High Usage", usd: null, localApp: null, summary: "Everyday의 5배.", reported: { price: "$15", source: { label: "Subscription Insider (2026-09-01)", url: "https://www.subscriptioninsider.com/blog/meta-adds-monthly-plans-as-muse-code-exits-beta" } } },
      { name: "Power Usage", usd: null, localApp: null, summary: "Everyday의 20배, Muse Wonder Full 포함.", reported: { price: "$50", source: { label: "Subscription Insider (2026-09-01)", url: "https://www.subscriptioninsider.com/blog/meta-adds-monthly-plans-as-muse-code-exits-beta" } } },
      { name: "Maximum Usage", usd: null, localApp: null, summary: "Everyday의 80배, Muse Wonder Full 포함.", reported: { price: "$200", source: { label: "Yotta Labs", url: "https://www.yottalabs.ai/post/meta-muse-wonder-pricing-api-cost-muse-code-plans" } } },
    ],
    notes: [
      "Meta 공식 문서는 요금제 구성과 사용량 배수만 적고, 금액은 가입 화면에서 보여 준다고 해요. 그래서 금액은 보도 기준으로만 적었어요.",
      "Muse Code 구독 혜택과 API 제공 범위는 별도로 확인하세요. 여기서는 Wonder Full의 API 제공 여부를 확정하지 않아요.",
    ],
    sources: [
      { label: "Meta · Muse Code 구독", url: "https://dev.meta.ai/docs/muse-code/subscriptions" },
      { label: "Meta · Build with Muse Wonder (2026-10-12)", url: "https://dev.meta.ai/resources/blog/build-with-muse-wonder" },
    ],
  },
];

export interface ApiModel {
  vendor: string;
  model: string;
  /** USD per 1M tokens */
  input: number;
  cached: number;
  output: number;
  note?: string;
  source: string;
}

const OPENAI_API = "https://developers.openai.com/api/docs/pricing";
const CLAUDE_API = "https://platform.claude.com/docs/en/about-claude/pricing";
const GEMINI_API = "https://ai.google.dev/gemini-api/docs/pricing";
const XAI_API = "https://docs.x.ai/developers/pricing";
const META_API = "https://dev.meta.ai/docs/pricing-rate-limits";
const DEEPSEEK_API = "https://api-docs.deepseek.com/quick_start/pricing";

export const API_MODELS: ApiModel[] = [
  { vendor: "OpenAI", model: "gpt-6-astra", input: 10, cached: 1, output: 50, note: "Batch·Flex 50% 할인, Fast 2배", source: OPENAI_API },
  { vendor: "OpenAI", model: "gpt-6.1-sol", input: 2, cached: 0.1, output: 10, note: "Batch·Flex 50% 할인", source: OPENAI_API },
  { vendor: "OpenAI", model: "gpt-6-luna", input: 0.1, cached: 0.01, output: 0.5, note: "Batch·Flex 50% 할인", source: OPENAI_API },
  { vendor: "Anthropic", model: "Claude Fable 5.1", input: 10, cached: 0.25, output: 50, note: "Batch 50% 할인, 캐시 쓰기 $12.50", source: CLAUDE_API },
  { vendor: "Anthropic", model: "Claude Opus 5.5", input: 4, cached: 0.2, output: 20, note: "Batch 50% 할인, 캐시 쓰기 $5", source: CLAUDE_API },
  { vendor: "Anthropic", model: "Claude Sonnet 5.5", input: 2, cached: 0.1, output: 10, note: "Batch 50% 할인, 캐시 쓰기 $2.50", source: CLAUDE_API },
  { vendor: "Anthropic", model: "Claude Haiku 5.5", input: 0.1, cached: 0.01, output: 0.5, note: "프롬프트 10만 토큰 이하. 초과 시 $0.50 / $2.50", source: CLAUDE_API },
  { vendor: "Google", model: "Gemini 4 Argon", input: 2, cached: 0.1, output: 10, note: "2026-12-01부터 $4 / $20으로 인상 예정, 무료 등급 없음", source: GEMINI_API },
  { vendor: "Google", model: "Gemini 3.8 Flash", input: 0.75, cached: 0.075, output: 3.75, note: "무료 등급 있음. 2027-01-01부터 $1.50 / $7.50", source: GEMINI_API },
  { vendor: "Google", model: "Gemini 3.5 Flash-Lite", input: 0.3, cached: 0.03, output: 2.5, note: "무료 등급 있음", source: GEMINI_API },
  { vendor: "xAI", model: "grok-4.7", input: 2, cached: 0.5, output: 6, note: "프롬프트 20만 토큰부터 2배", source: XAI_API },
  { vendor: "xAI", model: "grok-build-0.1", input: 1, cached: 0.2, output: 2, note: "코딩용, 20만 토큰부터 2배", source: XAI_API },
  { vendor: "Meta", model: "muse-wonder-1.0", input: 4, cached: 0.2, output: 20, note: "API 제공 범위는 Muse Code 구독 혜택과 별도로 공식 문서에서 확인", source: META_API },
  { vendor: "Meta", model: "muse-spark-1.3", input: 1.25, cached: 0.15, output: 4.25, note: "Contributor 모드는 $0.10 / $0.20, 데이터가 제품 개선에 쓰여요", source: META_API },
  { vendor: "DeepSeek", model: "deepseek-v4-pro", input: 1.32, cached: 0.044, output: 3.96, note: "피크 시간 기준. 그 외 시간은 절반", source: DEEPSEEK_API },
  { vendor: "DeepSeek", model: "deepseek-flash", input: 0.3, cached: 0.006, output: 1.2, note: "피크 시간 기준. 그 외 시간은 절반", source: DEEPSEEK_API },
];
