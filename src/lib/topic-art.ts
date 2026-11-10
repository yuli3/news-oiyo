// 2026-11-11: 주제 그림(글자·로고 없는 은유 그림 33장)과 섹션 OG 이미지.
// 기사 제목·도메인에서 첫 번째로 맞는 주제를 고른다. 회사 이름을 먼저, 넓은 주제를 나중에 본다.
const TOPIC_RULES: Array<[string, RegExp]> = [
  ["anthropic", /anthropic|claude|앤트로픽|클로드/i],
  ["openai", /openai|chatgpt|gpt-?\d|sora|오픈ai|챗gpt/i],
  ["google-ai", /gemini|deepmind|google|구글|제미나이/i],
  ["meta-ai", /\bmeta\b|llama(?!\.cpp)|메타(?!데이터)/i],
  ["microsoft", /microsoft|copilot|azure|마이크로소프트|코파일럿/i],
  ["apple", /\bapple\b|iphone|\bios\b|macos|애플|아이폰/i],
  ["xai", /\bxai\b|grok|그록/i],
  ["deepseek", /deepseek|딥시크/i],
  ["qwen", /qwen|alibaba|알리바바|큐원/i],
  ["kimi", /kimi|moonshot|키미|문샷/i],
  ["glm", /\bglm\b|zhipu|z\.ai|즈푸/i],
  ["mistral", /mistral|미스트랄/i],
  ["nvidia", /nvidia|엔비디아|cuda/i],
  ["samsung", /samsung|삼성/i],
  ["mcp", /\bmcp\b|model context protocol/i],
  ["agents", /agent|에이전트|agentic/i],
  ["coding-ai", /codex|cursor|coding|code review|코딩|개발자|programm/i],
  ["local-llm", /ollama|llama\.cpp|local llm|on-device|로컬|온디바이스|gguf/i],
  ["open-weight", /open[- ]?(weight|source)|오픈소스|오픈 웨이트|hugging ?face/i],
  ["image-video-ai", /image gen|video gen|diffusion|midjourney|veo|이미지 생성|영상 생성|동영상/i],
  ["robotics", /robot|humanoid|로봇|휴머노이드/i],
  ["chips", /chip|semiconductor|tpu|gpu|hbm|tsmc|반도체|칩/i],
  ["datacenter", /data ?cent|데이터센터|power grid|전력/i],
  ["security", /security|vulnerab|exploit|\bhack(?!er news)|malware|cve-|보안|해킹|취약/i],
  ["privacy", /privacy|개인정보|surveillance|tracking/i],
  ["copyright", /copyright|lawsuit|저작권|소송|licens/i],
  ["regulation", /regulat|\blaws?\b|ai act|policy|규제|법안|정책|eu ai/i],
  ["korea-ai", /한국|국내|korea|네이버|카카오|naver|kakao|lg ai|\bkt\b|\bskt\b/i],
  ["crypto", /bitcoin|crypto|ethereum|비트코인|가상자산|코인/i],
  ["rates", /금리|fed\b|fomc|interest rate|기준금리|국채|bond/i],
  ["fx", /환율|달러|원화|forex|\bfx\b|엔화|yen|dollar/i],
  ["real-estate", /부동산|아파트|주택|real estate|housing|전세/i],
  ["stocks", /주가|증시|코스피|코스닥|나스닥|s&p|stock|실적|ipo|상장/i],
];

export const TOPIC_KEYS = TOPIC_RULES.map(([key]) => key);

export function topicFor(...texts: Array<string | undefined | null>): string | undefined {
  const hay = texts.filter(Boolean).join(" ");
  if (!hay) return undefined;
  return TOPIC_RULES.find(([, re]) => re.test(hay))?.[0];
}

export function topicImage(key: string | undefined): string | undefined {
  return key ? `/images/topics/${key}.webp` : undefined;
}

// 섹션별 OG(1200x630). 경로 앞부분으로 고른다. 없으면 기본 og-image.png.
const SECTION_OG: Array<[RegExp, string]> = [
  [/^\/analysis\//, "analysis"],
  [/^\/systems\//, "systems"],
  [/^\/ai\//, "ai"],
  [/^\/finance\//, "finance"],
  [/^\/(archive\/|\d{4}-\d{2}-\d{2}\/|page\/)/, "archive"],
  [/^\/subscribe\//, "subscribe"],
  [/^\/community\//, "community"],
  [/^\/$/, "home"],
];

export function sectionOg(pathname: string): string {
  const hit = SECTION_OG.find(([re]) => re.test(pathname))?.[1];
  return `https://news.oiyo.net/${hit ? `og/${hit}.jpg` : "og-image.png"}`;
}
