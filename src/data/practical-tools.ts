// 실무 편입 도구 데이터 — 기존 /ai/tools/ 페이지의 인라인 데이터를 통합 큐레이터(/ai/curator/)로 옮긴 것.
// 직접 실무에 편입한 도구만 등재 (광고 아님·제휴 없음). 정기 갱신.
export interface PracticalTool {
  name: string;
  url: string;
  why: string; // 왜 쓰는지 (ko)
}
export interface PracticalToolGroup {
  id: string;
  label: string; // ko
  items: PracticalTool[];
}

export const PRACTICAL_TOOL_GROUPS: PracticalToolGroup[] = [
  {
    id: "tools-coding",
    label: "실무 편입 — 코딩 에이전트",
    items: [
      { name: "Claude Code", url: "https://claude.com/claude-code", why: "오케스트레이터. 계획-실행-검증 루프와 서브에이전트 위임의 중심." },
      { name: "Codex CLI", url: "https://openai.com/codex", why: "대량 생성·번역 워커. 헤드리스 실행으로 파이프라인에 편입." },
      { name: "Gemini API", url: "https://ai.google.dev", why: "무료 티어 대량 번역·큐레이션 워커. 정찰 cron의 요약 엔진." },
      { name: "Ollama", url: "https://ollama.com", why: "로컬 모델 폴백. 외부 한도와 무관한 최후의 보루." },
    ],
  },
  {
    id: "tools-search",
    label: "실무 편입 — 검색·데이터",
    items: [
      { name: "Google Search Console API", url: "https://developers.google.com/webmaster-tools", why: "대시보드 없이 쿼리·순위 조회, striking-distance 기회 자동 산출." },
      { name: "Bing Webmaster / IndexNow", url: "https://www.bing.com/webmasters", why: "색인 제출 자동화. 배포 직후 URL 푸시." },
      { name: "Hacker News API", url: "https://github.com/HackerNews/API", why: "무료·무키. 데일리 기술 정찰의 1차 소스." },
    ],
  },
  {
    id: "tools-infra",
    label: "실무 편입 — 인프라",
    items: [
      { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", why: "6개 사이트 전부 호스팅. 빌드 무료, 엣지 리다이렉트(_redirects)로 도메인 이전까지." },
      { name: "GitHub Actions", url: "https://github.com/features/actions", why: "타입체크·i18n 검증 게이트. 푸시는 배치로 모아 비용 관리." },
      { name: "Astro", url: "https://astro.build", why: "정적 우선 + 아일랜드. 1,200페이지를 10초에 빌드." },
    ],
  },
  {
    id: "tools-ops",
    label: "실무 편입 — 운영·관제",
    items: [
      { name: "Obsidian(위키형 두뇌)", url: "https://obsidian.md", why: "회사 두뇌의 뷰어. 결정·실패·규칙을 위키링크로 축적." },
      { name: "자체 관제 대시보드", url: "/systems/", why: "목표·칸반·품질 게이트·트래픽·모델 한도를 한 화면에. (구조는 Systems 소개 참고)" },
    ],
  },
];
