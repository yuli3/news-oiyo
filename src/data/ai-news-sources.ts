// AI 소식 소스 — AI 관련 소식을 어디서 볼 수 있는지 정리한 상설 섹션.
// 광고·제휴 없음. 트래킹 단축 URL(t.co 등) 금지, 공식/1차 출처만 링크. 정기 갱신 (확인: 2026-08-23).
export interface NewsSource {
  name: string;
  url: string;
  note: string; // 한 줄 평 (ko)
}
export interface NewsSourceGroup {
  id: string;
  label: string; // ko
  desc: string; // ko
  items: NewsSource[];
}

export const NEWS_SOURCE_GROUPS: NewsSourceGroup[] = [
  {
    id: "news-official",
    label: "공식 채널 (랩 뉴스룸)",
    desc: "모델·기능 발표의 1차 출처. 요약 기사보다 먼저 여기를 본다.",
    items: [
      { name: "OpenAI Newsroom", url: "https://openai.com/news/", note: "GPT·Sora 등 발표 원문. 블로그와 리서치 페이지까지 이어짐." },
      { name: "Anthropic News", url: "https://www.anthropic.com/news", note: "Claude 계열 발표와 안전 연구 공고." },
      { name: "Google DeepMind Blog", url: "https://deepmind.google/discover/blog/", note: "Gemini·Veo·알파폴드 등 구글 AI 발표." },
      { name: "Meta AI Blog", url: "https://ai.meta.com/blog/", note: "Llama 시리즈 오픈웨이트 발표의 공식 창구." },
      { name: "Hugging Face Blog", url: "https://huggingface.co/blog", note: "오픈소스 모델·라이브러리 동향의 허브. 커뮤니티 글도 강함." },
      { name: "Mistral AI News", url: "https://mistral.ai/news/", note: "유럽 오픈웨이트 진영의 발표." },
      { name: "xAI", url: "https://x.ai/news", note: "Grok 계열 발표 공지." },
    ],
  },
  {
    id: "news-community",
    label: "커뮤니티·포럼",
    desc: "발표보다 빠른 실전 반응. 노이즈도 함께 오니 필터는 본인 몫.",
    items: [
      { name: "Hacker News", url: "https://news.ycombinator.com/", note: "기술 전반의 속보 게이트. AI 논쟁도 대부분 여기서 시작." },
      { name: "r/MachineLearning", url: "https://www.reddit.com/r/MachineLearning/", note: "논문 중심 딥러닝 커뮤니티. 모델 릴리스 반응이 빠름." },
      { name: "r/LocalLLaMA", url: "https://www.reddit.com/r/LocalLLaMA/", note: "로컬 실행·오픈웨이트 최전선. 신모델 벤치 질렀다/체감 후기." },
      { name: "Lobsters", url: "https://lobste.rs/", note: "HN보다 잔잔한 개발자 링크 집합." },
      { name: "GeekNews", url: "https://news.hada.io/", note: "한국 개발자 HN. 한글 댓글로 국내 반응 확인." },
    ],
  },
  {
    id: "news-media",
    label: "언론·매거진",
    desc: "맥락과 해석이 붙는 2차 보도.",
    items: [
      { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/", note: "스타트업·자금 조달 포함 AI 산업 속보." },
      { name: "The Verge AI", url: "https://www.theverge.com/ai-artificial-intelligence", note: "제품 관점 해석이 잘 붙는 테크 매체." },
      { name: "MIT Technology Review AI", url: "https://www.technologyreview.com/topic/artificial-intelligence/", note: "깊이 있는 분석·정책·연구 기행." },
      { name: "Ars Technica AI", url: "https://arstechnica.com/ai/", note: "기술 검증이 꼼꼼한 롱폼 보도." },
      { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/", note: "엔터프라이즈·API 시장 소식 밀도가 높음." },
      { name: "Import AI", url: "https://importai.substack.com/", note: "Jack Clark의 주간 AI 브리핑. 연구·정책 흐름 정돈용." },
    ],
  },
  {
    id: "news-kr",
    label: "한국어 소식",
    desc: "국내 발표·규제·산업 소식. 영어권보다 늦게도, 일부는 먼저도 온다.",
    items: [
      { name: "AI 타임스", url: "https://www.aitimes.com/", note: "AI 전문 매체. 국내외 산업·정책 소식 집중." },
      { name: "전자신문 AI 태그", url: "https://www.etnews.com/news/keyword/list.html?keyword=AI", note: "국내 IT 업계 AI 태그 모음." },
      { name: "디지털데일리 AI 태그", url: "https://www.ddaily.co.kr/news/search?query=AI", note: "통신·플랫폼 중심 국내 AI 보도." },
      { name: "지디넷 AI", url: "https://www.zdnet.co.kr/newsletter_list.do?ai=AI", note: "ZDNet Korea의 AI 뉴스레터·기사 목록." },
      { name: "네이버 클로바 블로그", url: "https://blog.naver.com/naver_ai", note: "네이버 AI 공식 발표(클로바·하이퍼클로바)." },
    ],
  },
];
