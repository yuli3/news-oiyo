// AI 서비스 큐레이션 데이터 — ai.oiyo.net/curator. 정기 갱신 (최근 확인: 2026-07-17).
// 광고·제휴 아님. 카테고리별로 대표 서비스를 실사용 관점 한 줄 평과 함께 정리.
// 원칙: 실제로 존재를 확인한 서비스만, 세부 요금은 변동이 잦아 "무료 티어 유무"까지만 표기.
export interface AIService {
  name: string;
  url: string;
  by: string;         // 제공사
  note: string;       // 한 줄 평 (ko)
  free: boolean;      // 무료 티어 존재
}
export interface AICategory {
  id: string;
  label: string;      // ko
  desc: string;       // ko
  items: AIService[];
}

export const AI_CATEGORIES: AICategory[] = [
  {
    id: "chat",
    label: "대화형 AI (LLM)",
    desc: "질문·글쓰기·분석·코딩을 아우르는 범용 챗봇. 대부분 무료 티어가 있습니다.",
    items: [
      { name: "ChatGPT", url: "https://chat.openai.com", by: "OpenAI", note: "가장 대중적인 챗봇. 이미지·음성·코드 실행까지 통합.", free: true },
      { name: "Claude", url: "https://claude.ai", by: "Anthropic", note: "긴 문서·정교한 글쓰기·코딩에 강함. Artifacts로 결과물 즉시 미리보기.", free: true },
      { name: "Gemini", url: "https://gemini.google.com", by: "Google", note: "구글 생태계 연동과 대용량 컨텍스트. 검색·문서와 자연스럽게 이어짐.", free: true },
      { name: "Grok", url: "https://grok.com", by: "xAI", note: "실시간 X(트위터) 데이터 접근과 거침없는 톤. 리서치 보고서 생성에 강점.", free: true },
      { name: "DeepSeek", url: "https://chat.deepseek.com", by: "DeepSeek", note: "오픈웨이트 기반의 강력한 추론. 무료 사용 폭이 넓음.", free: true },
      { name: "Qwen", url: "https://chat.qwen.ai", by: "Alibaba", note: "다국어·코딩에 강한 오픈 모델. 한국어 대응도 준수.", free: true },
      { name: "Z.ai (GLM)", url: "https://z.ai", by: "Zhipu AI", note: "GLM 계열. 긴 문맥과 에이전트 작업에 특화.", free: true },
      { name: "Kimi", url: "https://kimi.com", by: "Moonshot AI", note: "초장문 컨텍스트와 에이전트형 검색. 오픈웨이트 K 시리즈로 주목.", free: true },
      { name: "Mistral (Le Chat)", url: "https://chat.mistral.ai", by: "Mistral AI", note: "유럽계 오픈 모델의 대표. 빠른 응답과 문서 처리.", free: true },
      { name: "Copilot", url: "https://copilot.microsoft.com", by: "Microsoft", note: "윈도우·오피스에 스며든 어시스턴트. 업무 문서와 연동이 강점.", free: true },
    ],
  },
  {
    id: "coding",
    label: "코딩 에이전트·개발",
    desc: "코드 작성·리뷰·자동화를 돕는 에이전트와 어시스턴트. AI-native 운영의 심장.",
    items: [
      { name: "Claude Code", url: "https://claude.com/claude-code", by: "Anthropic", note: "터미널에서 계획·구현·검증 루프를 도는 에이전트. OIYO 운영의 중심.", free: false },
      { name: "Codex", url: "https://openai.com/codex", by: "OpenAI", note: "헤드리스 대량 생성·번역 워커로 파이프라인에 편입 가능. 클라우드 병렬 실행.", free: false },
      { name: "Gemini CLI", url: "https://github.com/google-gemini/gemini-cli", by: "Google", note: "무료 사용량이 넉넉한 오픈소스 터미널 에이전트. 입문용으로 좋음.", free: true },
      { name: "GitHub Copilot", url: "https://github.com/features/copilot", by: "GitHub", note: "에디터 인라인 자동완성의 표준. 에이전트 모드로 확장 중.", free: true },
      { name: "Cursor", url: "https://cursor.com", by: "Anysphere", note: "AI 우선 에디터. 코드베이스 전체를 맥락으로 다룸.", free: true },
      { name: "Windsurf", url: "https://windsurf.com", by: "Windsurf", note: "에이전트형 IDE. 멀티파일 편집 흐름이 매끄러움.", free: true },
      { name: "Cline", url: "https://cline.bot", by: "Cline", note: "VS Code 오픈소스 에이전트. 원하는 모델을 붙여 쓰는 자유도.", free: true },
      { name: "v0", url: "https://v0.dev", by: "Vercel", note: "프롬프트로 React/Tailwind UI 생성. 프론트 시안 잡기에 특화.", free: true },
      { name: "Replit", url: "https://replit.com", by: "Replit", note: "브라우저에서 앱 생성부터 배포까지. 비개발자의 첫 앱 만들기에 적합.", free: true },
      { name: "Lovable", url: "https://lovable.dev", by: "Lovable", note: "대화로 풀스택 웹앱 생성. 아이디어 검증용 프로토타입에 유용.", free: true },
    ],
  },
  {
    id: "agents",
    label: "에이전트·자동화 프레임워크",
    desc: "AI를 단발 질문이 아니라 '일하는 직원'으로 굴리기 위한 오케스트레이션 도구.",
    items: [
      { name: "n8n", url: "https://n8n.io", by: "n8n", note: "노드 기반 워크플로 자동화 + AI 에이전트 노드. 셀프호스팅 가능.", free: true },
      { name: "Zapier", url: "https://zapier.com", by: "Zapier", note: "가장 넓은 SaaS 연동. 코드 없이 업무 파이프라인 연결.", free: true },
      { name: "Make", url: "https://www.make.com", by: "Make", note: "시각적 시나리오 빌더. 복잡한 분기 자동화에 강점.", free: true },
      { name: "LangChain / LangGraph", url: "https://www.langchain.com", by: "LangChain", note: "코드로 에이전트 그래프를 설계하는 표준 프레임워크.", free: true },
      { name: "CrewAI", url: "https://www.crewai.com", by: "CrewAI", note: "역할 기반 멀티에이전트 팀 구성. '에이전트 조직' 실험에 적합.", free: true },
      { name: "Claude Agent SDK", url: "https://docs.claude.com/en/api/agent-sdk/overview", by: "Anthropic", note: "Claude Code의 능력을 자체 앱에 이식하는 SDK.", free: false },
      { name: "Dify", url: "https://dify.ai", by: "Dify", note: "오픈소스 LLM 앱 빌더. RAG·에이전트를 UI로 조립.", free: true },
      { name: "MCP (Model Context Protocol)", url: "https://modelcontextprotocol.io", by: "오픈 표준", note: "AI와 도구·데이터를 연결하는 사실상의 표준 프로토콜. 에이전트 확장의 기반.", free: true },
    ],
  },
  {
    id: "research",
    label: "리서치·검색",
    desc: "출처가 붙는 답, 깊은 조사 보고서, 학술 검색.",
    items: [
      { name: "Perplexity", url: "https://www.perplexity.ai", by: "Perplexity", note: "출처를 붙여 답하는 검색형 AI. 리서치 1차 조사에 유용.", free: true },
      { name: "Deep Research (ChatGPT)", url: "https://chat.openai.com", by: "OpenAI", note: "수십 개 출처를 순회해 장문 보고서 생성. 시장·경쟁 조사용.", free: false },
      { name: "NotebookLM", url: "https://notebooklm.google.com", by: "Google", note: "내 자료만 근거로 답하는 리서치 노트. 오디오 요약이 인상적.", free: true },
      { name: "Elicit", url: "https://elicit.com", by: "Elicit", note: "논문 검색·표 정리 특화. 문헌 리뷰 시간을 크게 줄임.", free: true },
      { name: "Consensus", url: "https://consensus.app", by: "Consensus", note: "'연구들이 뭐라고 하는가'에 답하는 학술 검색.", free: true },
      { name: "Semantic Scholar", url: "https://www.semanticscholar.org", by: "Allen AI", note: "무료 학술 검색 엔진 + AI 요약. API도 무료.", free: true },
    ],
  },
  {
    id: "image",
    label: "이미지 생성·편집",
    desc: "텍스트로 이미지를 만들거나 사진을 편집하는 도구.",
    items: [
      { name: "Adobe Firefly", url: "https://firefly.adobe.com", by: "Adobe", note: "상업적 사용 안전한 학습 데이터. 포토샵 생성형 채우기와 연동.", free: true },
      { name: "Midjourney", url: "https://www.midjourney.com", by: "Midjourney", note: "예술적 완성도가 높은 이미지. 스타일 일관성이 강점.", free: false },
      { name: "DALL·E / GPT 이미지", url: "https://chat.openai.com", by: "OpenAI", note: "ChatGPT 안에서 대화로 이미지 생성·수정. 텍스트 렌더링 개선.", free: true },
      { name: "Stable Diffusion", url: "https://stability.ai", by: "Stability AI", note: "오픈 모델. 로컬 실행·세밀한 제어가 가능.", free: true },
      { name: "FLUX", url: "https://bfl.ai", by: "Black Forest Labs", note: "오픈웨이트 이미지 모델의 새 기준. 사실적 인물·텍스트에 강함.", free: true },
      { name: "Ideogram", url: "https://ideogram.ai", by: "Ideogram", note: "이미지 속 글자 렌더링 특화. 포스터·로고 시안에 유용.", free: true },
      { name: "Canva AI", url: "https://www.canva.com", by: "Canva", note: "디자인 툴 안의 생성·편집. 비디자이너의 마케팅 소재 제작.", free: true },
      { name: "Qwen-Image", url: "https://chat.qwen.ai", by: "Alibaba", note: "텍스트 렌더링과 편집에 강한 오픈 이미지 모델.", free: true },
    ],
  },
  {
    id: "video",
    label: "영상 생성·편집",
    desc: "텍스트·이미지로 영상을 만드는 도구. 가장 빠르게 발전 중인 분야.",
    items: [
      { name: "Sora", url: "https://openai.com/sora", by: "OpenAI", note: "긴 클립·일관된 장면 생성. ChatGPT 구독과 연동.", free: false },
      { name: "Veo", url: "https://deepmind.google/models/veo/", by: "Google", note: "오디오까지 함께 생성하는 고품질 영상. Gemini/Flow에서 사용.", free: false },
      { name: "Runway", url: "https://runwayml.com", by: "Runway", note: "영상 편집·모션·인페인팅까지 아우르는 창작 툴셋.", free: true },
      { name: "Kling", url: "https://klingai.com", by: "Kuaishou", note: "사실적 영상 생성. 무료 크레딧 제공.", free: true },
      { name: "Seedance", url: "https://seed.bytedance.com", by: "ByteDance", note: "고품질 텍스트·이미지→영상. 자연스러운 모션이 강점.", free: false },
      { name: "HeyGen", url: "https://www.heygen.com", by: "HeyGen", note: "아바타·립싱크 영상. 다국어 더빙 영상 제작에 특화.", free: true },
      { name: "CapCut", url: "https://www.capcut.com", by: "ByteDance", note: "자동 자막·컷 편집 등 AI 보조가 강한 무료 영상 편집기.", free: true },
    ],
  },
  {
    id: "audio",
    label: "음성·음악",
    desc: "TTS(음성 합성), 음성 복제, 작곡, 회의 녹취.",
    items: [
      { name: "ElevenLabs", url: "https://elevenlabs.io", by: "ElevenLabs", note: "가장 자연스러운 축의 TTS·음성 복제. 다국어 더빙 지원.", free: true },
      { name: "Suno", url: "https://suno.com", by: "Suno", note: "가사·장르만 주면 완성곡 생성. BGM·데모 제작에 유용.", free: true },
      { name: "Udio", url: "https://www.udio.com", by: "Udio", note: "음악 생성의 양대 축. 보컬 품질이 강점.", free: true },
      { name: "Whisper", url: "https://github.com/openai/whisper", by: "OpenAI", note: "오픈소스 음성 인식의 표준. 로컬에서 무료 전사.", free: true },
      { name: "클로바노트", url: "https://clovanote.naver.com", by: "네이버", note: "한국어 회의 녹취·요약의 실질 표준. 화자 분리 지원.", free: true },
    ],
  },
  {
    id: "docs",
    label: "문서·프레젠테이션",
    desc: "슬라이드·다이어그램·문서 작성을 자동화하는 도구.",
    items: [
      { name: "Gamma", url: "https://gamma.app", by: "Gamma", note: "프롬프트로 슬라이드·웹페이지 생성. 발표 초안을 분 단위로.", free: true },
      { name: "Napkin", url: "https://www.napkin.ai", by: "Napkin", note: "텍스트를 다이어그램·비주얼로 자동 변환.", free: true },
      { name: "Notion AI", url: "https://www.notion.so/product/ai", by: "Notion", note: "문서·위키 안에서 요약·작성·번역.", free: false },
      { name: "Mermaid", url: "https://mermaid.js.org", by: "오픈소스", note: "텍스트로 그리는 다이어그램. LLM이 가장 잘 뽑는 차트 문법.", free: true },
      { name: "Obsidian", url: "https://obsidian.md", by: "Obsidian", note: "로컬 마크다운 지식베이스. AI 에이전트의 '회사 두뇌' 저장소로 최적.", free: true },
    ],
  },
  {
    id: "translate",
    label: "번역·언어",
    desc: "기계번역을 넘어 문체·용어까지 다루는 언어 도구.",
    items: [
      { name: "DeepL", url: "https://www.deepl.com", by: "DeepL", note: "자연스러운 번역의 기준점. 문서 통째 번역 지원.", free: true },
      { name: "파파고", url: "https://papago.naver.com", by: "네이버", note: "한국어 쌍 번역에 강함. 이미지·웹사이트 번역.", free: true },
      { name: "LLM 직접 번역", url: "https://claude.ai", by: "각 사", note: "용어집·톤 지시를 주면 전문 번역에 근접. OIYO 6로케일 운영 방식.", free: true },
    ],
  },
  {
    id: "local",
    label: "로컬 실행·오픈웨이트",
    desc: "내 컴퓨터에서 무료로, 데이터 유출 없이 모델을 돌리는 방법.",
    items: [
      { name: "Ollama", url: "https://ollama.com", by: "Ollama", note: "명령어 한 줄로 로컬 LLM 실행. 로컬 파이프라인의 표준.", free: true },
      { name: "LM Studio", url: "https://lmstudio.ai", by: "LM Studio", note: "GUI로 모델 받고 채팅·API 서버까지. 입문용으로 가장 쉬움.", free: true },
      { name: "Hugging Face", url: "https://huggingface.co", by: "Hugging Face", note: "오픈 모델·데이터셋의 허브. 리더보드로 모델 비교.", free: true },
      { name: "Gemma", url: "https://ai.google.dev/gemma", by: "Google", note: "가벼운 오픈웨이트 계열. OIYO는 로컬 다이제스트 요약에 사용.", free: true },
      { name: "Llama", url: "https://www.llama.com", by: "Meta", note: "오픈웨이트 생태계를 연 계열. 파인튜닝 자료가 가장 풍부.", free: true },
    ],
  },
  {
    id: "work",
    label: "업무 보조·미팅",
    desc: "회의·메일·일정 등 반복 업무를 줄이는 도구.",
    items: [
      { name: "Granola", url: "https://www.granola.ai", by: "Granola", note: "회의 중 내 메모를 AI가 보강하는 노트. 봇 입장 없이 작동.", free: true },
      { name: "Fireflies", url: "https://fireflies.ai", by: "Fireflies", note: "회의 자동 녹취·요약·액션아이템 추출.", free: true },
      { name: "Gemini for Workspace", url: "https://workspace.google.com/solutions/ai/", by: "Google", note: "Gmail·Docs·Sheets 안에서 요약·작성. 문서 업무 밀착형.", free: false },
      { name: "Raycast AI", url: "https://www.raycast.com", by: "Raycast", note: "맥 런처에서 바로 AI 호출. 짧은 반복 작업에 최적.", free: true },
    ],
  },
];
