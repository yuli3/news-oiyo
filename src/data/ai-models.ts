// AI 모델 카탈로그 — ai.oiyo.net/models. 정기 갱신.
// 원칙: 정확한 순위·점수는 빠르게 변하므로 하드코딩하지 않고 라이브 리더보드로 라우팅한다.
// 여기서는 "지금 주목할 랩과 대표 모델 계열"을 실사용 관점으로 정리한다. 광고·제휴 아님.
// 확인일자를 UPDATED에 명시하고, 세부 버전은 계열(family) 수준으로만 적어 노후화를 늦춘다.
export const MODELS_UPDATED = "2026-07-08";

export interface ModelEntry {
  name: string;        // 대표 모델/계열명
  by: string;          // 제공 랩
  url: string;         // 공식 링크
  note: string;        // 한 줄 평 (ko)
  strengths: string;   // 강점 태그 (ko)
}
export interface ModelGroup {
  id: string;
  label: string;       // ko
  desc: string;        // ko
  items: ModelEntry[];
}

export const MODEL_GROUPS: ModelGroup[] = [
  {
    id: "frontier",
    label: "프론티어 (독점) 모델",
    desc: "지능·코딩·추론의 최전선. 대부분 API·구독으로 제공되며, 랩마다 반년 주기로 세대가 바뀝니다.",
    items: [
      { name: "Claude (Opus 4.8 · Claude 5)", by: "Anthropic", url: "https://claude.ai", note: "코딩·긴 문서·정교한 글쓰기의 강자. Claude 5 계열(Fable 5·Mythos 5)이 최상위 티어, Opus 4.8·Sonnet 5·Haiku 4.5로 라인업.", strengths: "코딩 · 글쓰기 · 에이전트" },
      { name: "GPT-5 시리즈", by: "OpenAI", url: "https://chat.openai.com", note: "가장 넓은 대중·생태계. 멀티모달·음성·도구 사용이 촘촘하게 통합됨.", strengths: "범용 · 멀티모달 · 생태계" },
      { name: "Gemini 3 Pro", by: "Google", url: "https://gemini.google.com", note: "멀티모달(이미지·영상 이해)과 대용량 컨텍스트에서 강세. 구글 워크스페이스·검색과 연동.", strengths: "멀티모달 · 대용량 컨텍스트" },
      { name: "Grok 4", by: "xAI", url: "https://x.ai", note: "초대용량 컨텍스트(수백만 토큰급)로 통째 코드베이스·장문 리서치에 유리. X 연동.", strengths: "초대용량 컨텍스트" },
    ],
  },
  {
    id: "open-weight",
    label: "오픈웨이트 모델",
    desc: "가중치가 공개돼 로컬·자체 서버에서 돌릴 수 있는 모델. 2026년 현재 중국 랩(DeepSeek·Moonshot·Zhipu·Alibaba)이 상위권을 다수 차지합니다.",
    items: [
      { name: "DeepSeek (V 시리즈 · R 추론)", by: "DeepSeek", url: "https://chat.deepseek.com", note: "오픈웨이트 종합·코딩 벤치마크 최상위권. 무료 사용 폭이 넓고 추론 계열(R)이 특히 강함.", strengths: "추론 · 코딩 · 가성비" },
      { name: "Kimi (K2 계열)", by: "Moonshot AI", url: "https://kimi.moonshot.cn", note: "장문·에이전트 작업과 코딩에서 두각. 오픈웨이트 상위권 단골.", strengths: "장문 · 에이전트 · 코딩" },
      { name: "GLM (5 계열)", by: "Zhipu AI (Z.ai)", url: "https://z.ai", note: "지식·추론 벤치마크에서 강세. 긴 문맥과 에이전트 워크플로에 특화.", strengths: "지식 · 추론 · 에이전트" },
      { name: "Qwen3 시리즈", by: "Alibaba", url: "https://chat.qwen.ai", note: "다국어·코딩에 강한 오픈 모델. 크기 스펙트럼이 넓어 소형~초대형까지 선택지가 많음.", strengths: "다국어 · 코딩 · 라인업" },
      { name: "Llama 시리즈", by: "Meta", url: "https://www.llama.com", note: "가장 넓은 생태계·툴링 지원. 파인튜닝·배포 레퍼런스가 압도적으로 많음.", strengths: "생태계 · 파인튜닝" },
      { name: "Mistral 시리즈", by: "Mistral AI", url: "https://mistral.ai", note: "유럽 랩. 크기 대비 품질(효율)이 좋아 온프렘·경량 배포에 인기.", strengths: "효율 · 온프렘" },
    ],
  },
  {
    id: "local-runtime",
    label: "로컬 실행 런타임",
    desc: "오픈웨이트 모델을 내 컴퓨터에서 프라이빗하게 돌리는 도구. 둘 다 내부적으로 llama.cpp를 써서 속도는 비슷하고, 취향(CLI vs GUI)에 따라 고르면 됩니다.",
    items: [
      { name: "Ollama", by: "Ollama", url: "https://ollama.com", note: "CLI·로컬 HTTP API 중심. 스크립트·CI·앱 임베딩 등 개발 워크플로에 편입하기 좋음. (요즘은 데스크톱 UI도 제공)", strengths: "개발자 · 자동화 · API" },
      { name: "LM Studio", by: "LM Studio", url: "https://lmstudio.ai", note: "모델 탐색·다운로드·채팅을 GUI로. M 시리즈 맥에서 MLX 네이티브 지원으로 체감 속도가 빠름. 헤드리스 서버 모드도 있음.", strengths: "GUI · 초심자 · 애플 실리콘" },
      { name: "Jan", by: "Jan", url: "https://jan.ai", note: "오픈소스 로컬 AI 데스크톱. 오프라인·프라이버시 우선, 무료.", strengths: "오픈소스 · 오프라인" },
    ],
  },
];

// 정확한 실시간 순위·벤치마크는 여기(1차/집계 출처)에서 확인. 우리는 이 지도의 인덱스 역할만 한다.
export interface Leaderboard { name: string; url: string; note: string; }
export const LEADERBOARDS: Leaderboard[] = [
  { name: "LMArena (Chatbot Arena)", url: "https://lmarena.ai/leaderboard", note: "사람 투표 기반 종합 선호도 랭킹. 사실상 표준 리더보드." },
  { name: "Artificial Analysis", url: "https://artificialanalysis.ai", note: "지능·속도·가격을 한눈에 비교하는 집계 인덱스." },
  { name: "llm-stats", url: "https://llm-stats.com", note: "300+ 모델을 지능·속도·가격으로 정렬·비교." },
  { name: "HuggingFace Open LLM Leaderboard", url: "https://huggingface.co/open-llm-leaderboard", note: "오픈웨이트 모델 벤치마크·트렌딩의 허브." },
];
