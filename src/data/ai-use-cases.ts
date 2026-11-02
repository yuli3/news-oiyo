// 분야별 AI 활용 가이드 (/ai/use-cases/). 2026-10-20 세운 요청:
// "특수용도마다 쓰는 ai 소개 … 대략적인 워크플로우랑 사용법까지 … 구체적이고 최신 정보 위주로. 롱테일 키워드".
// 규칙: (1) 서비스 이름·기능·가격은 sources의 기사·공식 페이지에 있는 것만 쓴다. 가격은 출처의 시점을 붙인다.
// (2) 출처가 확인 못 한 항목(가격·대상)은 비워 두고 지어내지 않는다. (3) 사람의 최종 판단이 필요한 분야는
// cautions에 경계를 적는다. (4) KEYWORD_MAP은 앞으로 쓸 페이지 목록이다. 페이지를 쓰면 slug를 GUIDES에 추가한다.

import { pdfGuides } from "./pdf-table-guide";
import { guides as creativeGuides } from "./ai-use-cases-locales/ko-extra";
import { guides as workGuides } from "./ai-use-cases-locales/ko-work";

export interface Source { label: string; url: string }

export interface Tool {
  name: string;
  maker?: string;
  /** 누구를 위한 도구인지 */
  audience: string;
  what: string;
  /** 출처 시점이 붙은 가격. 확인 못 했으면 생략. */
  price?: string;
  source: Source;
}

export interface Guide {
  slug: string;
  category: string;
  title: string;
  description: string;
  checked: string;
  intro: string;
  tools: Tool[];
  workflow: { step: string; detail: string }[];
  combos: { pair: string; why: string }[];
  cautions: string[];
  keywords: string[];
}

export interface KeywordCategory { category: string; cases: { name: string; slug?: string; keywords: string[] }[] }

export const KEYWORD_MAP: KeywordCategory[] = [
  {
    category: "전문 업무",
    cases: [
      { name: "법무·계약 검토", slug: "legal", keywords: ["법률 AI", "계약서 검토 AI", "판례 검색 AI", "변호사 AI 도구", "엘박스", "슈퍼로이어"] },
      { name: "노무·인사", slug: "labor", keywords: ["노무 AI", "AI 노동법 상담", "취업규칙 AI", "연장근로수당 AI", "인사노무 챗봇"] },
      { name: "세무·회계", slug: "tax-accounting", keywords: ["세무 AI", "회계 AI", "AI 세무사", "IFRS AI", "기장 자동화"] },
      { name: "행정·민원 서류", keywords: ["행정서류 AI", "민원 신청서 AI", "공문 작성 AI", "정부24 서류"] },
      { name: "특허·지식재산", keywords: ["특허 검색 AI", "선행기술조사 AI", "상표 검색 AI"] },
      { name: "부동산·임대차", keywords: ["임대차 계약 AI", "등기부 분석 AI", "전세사기 확인"] },
      { name: "의료·보험 서류", keywords: ["보험 청구 AI", "진료비 세부내역 정리"] },
      { name: "공시·재무제표 읽기", keywords: ["공시 요약 AI", "재무제표 분석 AI", "DART AI"] },
    ],
  },
  {
    category: "문서·발표",
    cases: [
      { name: "프레젠테이션(PPT)", slug: "presentation", keywords: ["PPT 만들기 AI", "AI 프레젠테이션", "Gamma", "발표자료 자동 생성", "PPTX 변환"] },
      { name: "사업계획서·기획서", slug: "business-plan", keywords: ["사업계획서 AI", "정부지원사업 사업계획서", "예비창업패키지 AI", "기획서 AI"] },
      { name: "회의록·녹취 정리", slug: "meeting-notes", keywords: ["회의록 AI", "녹음 요약 AI", "통화 녹음 정리"] },
      { name: "엑셀·데이터 정리", slug: "spreadsheet", keywords: ["엑셀 AI", "함수 만들기 AI", "데이터 정리 AI"] },
      { name: "번역·현지화", slug: "translation", keywords: ["번역 AI", "문서 번역", "현지화 AI"] },
      { name: "논문·리서치", slug: "research", keywords: ["논문 요약 AI", "딥리서치", "문헌 조사 AI"] },
    ],
  },
  {
    category: "디자인·인쇄물",
    cases: [
      { name: "포스터", slug: "poster", keywords: ["포스터 만들기 AI", "행사 포스터 AI", "AI 포스터 디자인"] },
      { name: "팜플렛·리플릿", slug: "pamphlet", keywords: ["팜플렛 만들기 AI", "리플릿 AI", "브로셔 AI"] },
      { name: "로고·명함", keywords: ["로고 만들기 AI", "명함 디자인 AI"] },
      { name: "상세페이지", keywords: ["상세페이지 AI", "스마트스토어 상세페이지", "쇼핑몰 상세페이지 AI"] },
      { name: "썸네일·카드뉴스", keywords: ["썸네일 AI", "카드뉴스 AI", "인스타 카드뉴스 만들기"] },
    ],
  },
  {
    category: "마케팅·광고",
    cases: [
      { name: "광고 이미지", slug: "ad-image", keywords: ["광고 이미지 AI", "제품 사진 AI", "배너 AI"] },
      { name: "광고 영상", slug: "ad-video", keywords: ["광고 영상 AI", "Veo", "Kling", "Runway", "숏폼 광고 AI"] },
      { name: "광고 카피·문구", keywords: ["광고 문구 AI", "카피라이팅 AI", "슬로건 AI"] },
      { name: "SNS 운영", keywords: ["SNS 콘텐츠 AI", "릴스 AI", "쇼츠 자동화"] },
      { name: "블로그·SEO", slug: "blog-seo", keywords: ["블로그 글쓰기 AI", "SEO AI", "네이버 블로그 AI"] },
      { name: "음성·더빙·음악", keywords: ["AI 더빙", "TTS", "AI 작곡", "광고 배경음악 AI"] },
    ],
  },
  {
    category: "운영·개발",
    cases: [
      { name: "고객 응대 챗봇", slug: "customer-chat", keywords: ["고객상담 AI", "카카오톡 챗봇 AI", "CS 자동화"] },
      { name: "코딩·웹사이트 제작", slug: "coding-website", keywords: ["코딩 AI", "바이브 코딩", "웹사이트 만들기 AI"] },
      { name: "업무 자동화 에이전트", keywords: ["업무 자동화 AI", "AI 에이전트", "MCP"] },
      { name: "채용·면접", keywords: ["채용공고 AI", "이력서 검토 AI", "AI 면접"] },
      { name: "교육·강의 자료", keywords: ["강의자료 AI", "문제 출제 AI", "교안 만들기 AI"] },
    ],
  },
];

const LAWTIMES_LES = { label: "법률신문 · LES 2026 출품 기업 (2026-06-17)", url: "https://www.lawtimes.co.kr/news/articleView.html?idxno=222131" };
const LAWTIMES_REVIEW = { label: "법률신문 · \"법률 AI, 진화와 발전 거듭\" (2026-06-27)", url: "https://www.lawtimes.co.kr/news/articleView.html?idxno=222618" };

const BASE_GUIDES: Guide[] = [
  {
    slug: "legal",
    category: "전문 업무",
    title: "법무·계약 검토에 쓰는 AI (2026년 10월)",
    description: "엘박스·슈퍼로이어·앨리비 등 국내 법률 AI가 무엇을 하는지, 판례 검색부터 서면 작성·계약 검토까지 실무 흐름과 가격, 쓸 때 지킬 선을 정리했어요.",
    checked: "2026-10-20",
    intro: "국내 법률 AI는 2026년에 '검색 도구'에서 '사건을 처음부터 끝까지 다루는 작업 환경'으로 넘어가고 있어요. 대부분 변호사·기업 법무팀을 위한 도구이고, 일반인이 쓰는 범용 AI와는 학습 자료(판례·법령 데이터)와 책임 구조가 달라요.",
    tools: [
      { name: "엘박스 (3.0)", maker: "엘박스", audience: "변호사·기업 법무·공공기관", what: "판례 검색, 법률 리서치, 문서 작성, 사건 관리를 한 화면에서 이어서 해요. 3.0은 판례 검색·대화·문서 작성을 하나의 프롬프트 창으로 합쳤어요.", price: "스탠다드 월 69,900원 (2026-06 박람회 기준)", source: LAWTIMES_REVIEW },
      { name: "슈퍼로이어", maker: "로앤컴퍼니", audience: "변호사", what: "목적을 말하면 AI가 작업 순서를 짜서 수행하는 '슈퍼 에이전트'와 긴 서면 작성 기능이 있어요. 판례 검색(빅케이스)과 사건 관리(로탑)는 따로 나뉘어 있어요.", price: "스타터 월 26,400원(4,000 크레딧), 스탠다드 월 59,400원(15,000 크레딧), 에이전트는 문건당 최소 500 크레딧 (2026-06 기준)", source: LAWTIMES_REVIEW },
      { name: "앨리비 (allibee)", maker: "BHSN", audience: "기업 법무팀", what: "자체 법률 LLM '아스트로' 기반으로 계약·자문·송무·컴플라이언스를 한 시스템에서 관리해요. 계약 특화 SaaS '앨리비 큐'도 있어요.", source: LAWTIMES_LES },
      { name: "로폼 리걸 AI 에이전트", maker: "로폼", audience: "기업·계약 검토", what: "계약서의 불리한 조항과 법적 위험을 찾아내고 대안 문구를 제시해요.", source: LAWTIMES_LES },
      { name: "아이렉스 (AiLex)", maker: "A2D2", audience: "송무 변호사", what: "형사기록의 모순점과 증거의 유불리를 분석하고, 민사 사건의 입출금 자료를 표로 정리해 엑셀로 내려받아요.", price: "사건당 월 19,000원, 사건이 끝나면 결제 중단 (2026-06 기준)", source: LAWTIMES_REVIEW },
      { name: "로토매틱", audience: "법률사무소", what: "기일 관리, 진행 중 사건 문건 열람, 상담 녹음 자동 정리, 알림톡 연동.", price: "인원과 무관하게 월 9,900원 (2026-06 기준)", source: LAWTIMES_REVIEW },
      { name: "코딧 · 챗코딧", maker: "코딧", audience: "기업 대관·규제 대응", what: "입법·규제 변화를 모니터링하고 생성형 AI로 규제 영향을 분석해요.", source: LAWTIMES_LES },
    ],
    workflow: [
      { step: "쟁점 정리", detail: "사실관계를 시간순으로 적고, 묻고 싶은 법적 질문을 한 문장씩 나눠요. 범용 AI(ChatGPT·Claude·Gemini)에 자료를 정리시키되 개인정보는 가려서 넣어요." },
      { step: "판례·법령 검색", detail: "법률 데이터로 학습한 전용 도구(엘박스·슈퍼로이어)에서 검색해요. 범용 AI가 알려 준 판례 번호는 반드시 원문을 열어 실재하는지 확인해요." },
      { step: "서면·의견서 초안", detail: "검색 결과를 근거로 초안을 만들게 하고, 인용된 판례·조문 위치를 표시하게 해요." },
      { step: "계약서 검토", detail: "계약서를 올려 불리한 조항과 빠진 조항을 표시하게 하고(로폼·앨리비), 대안 문구는 우리 협상 입장에 맞게 사람이 고르고 고쳐요." },
      { step: "사건 관리", detail: "기일·문건·상담 녹음은 사건 관리 도구에 모아서 다음 단계에서 다시 찾는 시간을 줄여요." },
    ],
    combos: [
      { pair: "전용 판례 검색 + 범용 AI 문장 다듬기", why: "판례의 정확성은 법률 데이터 도구가, 읽기 쉬운 문장은 범용 모델이 강해요. 근거 확인은 항상 전용 도구 쪽에서 해요." },
      { pair: "계약 검토 AI + 문서 비교", why: "AI가 표시한 수정안을 원본과 비교 보기로 확인하면 무엇이 바뀌었는지 놓치지 않아요." },
      { pair: "녹음 정리 + 사건 관리", why: "상담 녹음을 자동 요약해 사건 기록에 붙이면 사실관계 정리가 빨라져요." },
    ],
    cautions: [
      "법률신문 관람기는 국내 법률 AI가 \"변호사의 전적인 책임 아래 도구로서\" 쓰인다고 평가해요. 일반인은 AI 답을 결론으로 쓰지 말고 변호사 상담 전에 질문을 정리하는 데 써요.",
      "범용 AI가 만든 판례 번호·조문은 실재하지 않을 수 있어요. 원문을 열어 확인하기 전에는 서면에 넣지 마세요.",
      "의뢰인 정보와 기밀 계약서는 데이터 학습·보관 조건을 확인한 서비스에만 넣어요.",
      "가격은 2026년 6월 박람회 시점의 기사 기준이에요. 결제 전에 각 서비스에서 다시 확인하세요.",
    ],
    keywords: ["법률 AI", "계약서 검토 AI", "판례 검색 AI", "엘박스 가격", "슈퍼로이어 가격", "리걸테크"],
  },
  {
    slug: "labor",
    category: "전문 업무",
    title: "노무·인사 업무에 쓰는 AI (2026년 10월)",
    description: "고용노동부 AI 노동법 상담, 더존 ONE AI 노무도우미, 로무앤톡 등 노무 AI를 근로자·사업주별로 나누고, 연장근로수당·연차 확인부터 취업규칙 점검까지 쓰는 순서를 정리했어요.",
    checked: "2026-10-20",
    intro: "노무 AI는 두 갈래예요. 근로자가 자기 권리를 묻는 무료 상담형과, 인사 담당자가 회사 규정에 맞춰 판단하는 업무형이에요. 둘 다 법령·판례를 근거로 답하지만, 최종 판단과 신고·분쟁 대응은 사람(공인노무사·노동청)이 맡아요.",
    tools: [
      { name: "AI 노동법 상담", maker: "고용노동부", audience: "근로자·알바생", what: "노동법 궁금증에 실시간으로 답하고 외국어 상담도 해요. 당근알바에도 들어가 있어요. 2025년 한 해 11만 7천 건을 상담했고, 근로계약서·임금명세서 사진 분석과 노동포털 사건 접수 연계가 예정돼 있어요.", source: { label: "CBS노컷뉴스 (2026-01-21)", url: "https://v.daum.net/v/20260121120302824?f=p" } },
      { name: "ONE AI 노무도우미", maker: "더존비즈온", audience: "인사 전담 부서가 없는 회사", what: "법령·판례와 회사의 사규·취업규칙·근로계약서를 함께 보고 답해요. 연장근로수당 계산, 연차 발생·차감, 경조휴가 범위를 확인하고, 상담 이력을 남겨 담당자가 바뀌어도 이어 볼 수 있어요. 세무 AI '세법도우미'와 연결할 예정이에요.", source: { label: "이투데이 (2026-06-17)", url: "https://www.etoday.co.kr/news/view/2594613" } },
      { name: "로무앤톡", audience: "노무사를 찾기 어려운 근로자·사업주", what: "임금·근로계약·해고·휴가를 AI에게 묻고, 답이 부족하면 공인노무사 상담으로 넘어가요. 2026-10-01 테스트 서비스를 시작했어요.", source: { label: "머니투데이방송 (2026-10-01)", url: "https://news.mtn.co.kr/news-detail/2026100109465075815" } },
    ],
    workflow: [
      { step: "상황을 숫자로 적기", detail: "근무 시작·종료 시각, 휴게시간, 주휴일, 월급과 수당 항목을 표로 적어요. 노무 질문은 숫자가 빠지면 답이 흐려져요." },
      { step: "무료 상담으로 기준 확인", detail: "근로자는 고용노동부 AI 노동법 상담으로 법 기준을 먼저 확인해요. 사업주도 일반 기준을 확인할 때 쓸 수 있어요." },
      { step: "회사 규정과 대조", detail: "인사 담당자는 사규·취업규칙을 함께 읽는 업무형 도구(ONE AI 노무도우미 등)로 우리 회사 기준의 답을 받아요." },
      { step: "계산은 계산기로 검산", detail: "연장·야간·휴일수당과 연차 개수는 AI 답을 그대로 쓰지 말고 계산기로 한 번 더 확인해요." },
      { step: "분쟁·신고는 사람에게", detail: "해고·임금체불·괴롭힘처럼 다툼이 생기면 공인노무사나 노동청 상담으로 넘겨요. AI 대화 기록은 사실관계 정리 자료로 쓰세요." },
    ],
    combos: [
      { pair: "노동부 AI 상담 + 계산기", why: "법 기준은 상담으로, 금액은 계산기로 확인하면 두 단계가 서로 검산돼요." },
      { pair: "업무형 노무 AI + 근태·급여 시스템", why: "근태 기록이 붙어 있어야 수당·연차 답이 실제 숫자로 나와요. 더존은 근태·ERP 연동을 예정하고 있어요." },
      { pair: "범용 AI + 취업규칙 초안", why: "범용 AI로 초안을 만들고, 노무 전용 도구나 노무사 검토로 현행법과 맞는지 확인해요." },
    ],
    cautions: [
      "AI 상담 답은 법률 판단이 아니에요. 해고·체불처럼 권리가 걸린 결정은 공인노무사나 노동청 확인을 받으세요.",
      "근로계약서·급여명세서에는 주민번호·계좌 같은 개인정보가 있어요. 올리기 전에 가리세요.",
      "노동법 개정이 잦아요. 답에 적용 시점(몇 년 기준인지)을 꼭 물어보세요.",
    ],
    keywords: ["노무 AI", "AI 노동법 상담", "연장근로수당 AI", "취업규칙 AI", "인사노무 챗봇", "로무앤톡"],
  },
  {
    slug: "tax-accounting",
    category: "전문 업무",
    title: "세무·회계 업무에 쓰는 AI (2026년 10월)",
    description: "삼일PwC FRA, 한국세무사회 AI 세무사, 더존 세법도우미, 국세청 홈택스 AI 검색 계획까지 세무·회계 AI를 실무자·세무사·납세자별로 나누고 쓰는 순서를 정리했어요.",
    checked: "2026-10-20",
    intro: "세무·회계 AI는 실무자의 판단을 돕는 근거 검색형이 먼저 자리 잡았어요. 국세청은 2026년 홈택스 AI 검색 시범 개발을 시작하고, AI 신고서 어시스턴트 같은 납세자 서비스는 2027년 이후로 계획하고 있어요.",
    tools: [
      { name: "FRA (Finance Risk Adviser)", maker: "삼일PwC", audience: "기업 회계·세무 실무자", what: "계약서·재무 문서를 올리고 물으면 IFRS·질의회신·세법·예규·판례를 근거와 원문 출처로 보여 줘요. 계약 관계를 다이어그램으로 그리고, 사실관계가 바뀌면 결론이 어떻게 달라지는지 시뮬레이션하고, 보고용 PPT까지 만들어요.", source: { label: "삼일PwC 보도자료 (2026-09-01)", url: "https://www.pwc.com/kr/ko/press-room/2026/20260901.html" } },
      { name: "AI 세무사", maker: "한국세무사회", audience: "세무사 회원과 사무소 직원", what: "최신 법령·예규·판례를 실시간 검색해 분석하고, 증명서 발급 자동화와 거래처 보고서 작성을 도와요. '플랫폼세무사회'에서 써요.", source: { label: "세무사신문 (2025-02-07)", url: "https://webzine.kacta.or.kr/news/articleView.html?idxno=22060" } },
      { name: "세법도우미 · 엑스퍼트원", maker: "더존비즈온", audience: "기업·세무 실무자", what: "세법 해석과 질의응답을 돕는 세무 특화 AI예요. 노무 AI(ONE AI 노무도우미)와 묶어 경영 관리 에이전트로 연결할 계획이에요.", source: { label: "택스워치 (2025-12-23)", url: "https://www.taxwatch.co.kr/article/tax/2025/12/23/0002" } },
      { name: "홈택스 AI 검색 (계획)", maker: "국세청", audience: "납세자", what: "키워드 대신 자연어로 세금 질문을 하는 검색이에요. 2026년 시범 개발을 시작하고, AI 신고서 어시스턴트·세무컨설팅은 2027년부터, 서비스 개방은 2028년을 목표로 해요.", source: { label: "택스워치 (2025-12-23)", url: "https://www.taxwatch.co.kr/article/tax/2025/12/23/0002" } },
    ],
    workflow: [
      { step: "자료 모으기", detail: "계약서·세금계산서·통장 내역·전년도 신고서를 한 폴더에 모아요. 파일 이름에 날짜와 거래처를 붙이면 AI가 근거를 찾기 쉬워요." },
      { step: "쟁점 질문하기", detail: "근거 검색형 도구(FRA·AI 세무사)에 \"이 거래의 수익 인식 시점\"처럼 구체적으로 묻고, 답에 붙은 조문·예규 원문을 열어 봐요." },
      { step: "가정 바꿔 보기", detail: "사실관계가 하나 달라지면 결론이 바뀌는지 시뮬레이션해요. 세무조사나 감사에서 물을 질문을 미리 확인하는 셈이에요." },
      { step: "숫자는 계산기·홈택스로 확인", detail: "세액·공제액은 AI 답이 아니라 홈택스 모의계산이나 계산기로 확인해요." },
      { step: "보고와 신고", detail: "보고용 요약·PPT는 AI로 만들고, 신고서 제출은 세무사나 본인이 원문을 보고 해요." },
    ],
    combos: [
      { pair: "근거 검색형 세무 AI + 범용 AI 요약", why: "근거는 세무 전용 도구로, 경영진 보고 문장은 범용 모델로 다듬어요." },
      { pair: "세무 AI + 노무 AI", why: "급여·4대보험·원천세처럼 노무와 세무가 겹치는 일은 두 도구를 같은 사실관계로 확인해요." },
      { pair: "AI 요약 + 홈택스 모의계산", why: "AI는 무엇을 확인할지 알려 주고, 금액은 국세청 계산으로 확정해요." },
    ],
    cautions: [
      "세법은 해마다 바뀌어요. 답이 어느 귀속연도 기준인지 꼭 물어보세요.",
      "AI가 제시한 예규·판례는 원문을 열어 실재와 내용을 확인한 뒤 써요.",
      "신고와 납부의 책임은 납세자에게 있어요. 금액이 크거나 처음 하는 신고는 세무사 확인을 받으세요.",
    ],
    keywords: ["세무 AI", "회계 AI", "AI 세무사", "IFRS AI", "홈택스 AI", "삼일PwC FRA"],
  },
  {
    slug: "presentation",
    category: "문서·발표",
    title: "프레젠테이션(PPT) 만드는 AI 조합 (2026년 10월)",
    description: "Gamma·Canva·Genspark 같은 발표자료 AI와 ChatGPT·Claude·Gemini를 어떻게 나눠 쓰는지, 개요부터 PPTX 마무리까지 워크플로우와 고르는 기준을 정리했어요.",
    checked: "2026-10-20",
    intro: "발표자료 AI는 '빨리 뼈대를 세우는 도구'와 '디자인을 다듬는 도구', '자료 조사까지 붙여 주는 도구'로 강점이 갈려요. 하나로 끝내기보다 개요는 범용 AI, 슬라이드는 전용 도구, 마무리는 PowerPoint·Google Slides로 나누면 수정이 쉬워요.",
    tools: [
      { name: "Gamma", audience: "빠른 초안이 필요한 사람", what: "아이디어나 개요를 넣으면 이야기 흐름이 있는 덱 전체를 빠르게 만들어요. PPTX 내보내기는 요금제에 따라 달라요.", source: { label: "InkPPT 비교 (2026-07-25)", url: "https://www.inkppt.com/post/ai-presentation-tools-comparison" } },
      { name: "Canva", audience: "브랜드·디자인 완성도가 중요한 사람", what: "디자인을 세밀하게 고치고 브랜드에 맞춘 시각 자료를 만드는 데 강해요.", source: { label: "InkPPT 비교 (2026-07-25)", url: "https://www.inkppt.com/post/ai-presentation-tools-comparison" } },
      { name: "Genspark", audience: "조사 자료가 필요한 발표", what: "주제만 넣으면 자료 조사를 바탕으로 덱을 자동으로 만들어요. PPTX·Google Slides 내보내기는 유료 요금제가 필요할 수 있어요.", source: { label: "InkPPT 비교 (2026-07-25)", url: "https://www.inkppt.com/post/ai-presentation-tools-comparison" } },
      { name: "FRA 보고서 PPT", maker: "삼일PwC", audience: "회계·세무 보고", what: "회계·세무 분석 결과를 보고용 PPT로 자동 생성해요. 전문 분야 보고서는 그 분야 도구가 근거까지 붙여 줘요.", source: { label: "삼일PwC 보도자료 (2026-09-01)", url: "https://www.pwc.com/kr/ko/press-room/2026/20260901.html" } },
    ],
    workflow: [
      { step: "한 줄 메시지와 청중", detail: "범용 AI에 \"누구에게, 무엇을 결정하게 할 발표인지\"를 먼저 정하게 해요. 이 한 줄이 장표 순서를 정해요." },
      { step: "개요 10장", detail: "장표별 제목(주장 문장)과 근거 한두 개만 개요로 받아요. 이 단계에서 숫자 출처를 함께 적게 해요." },
      { step: "슬라이드 생성", detail: "개요를 Gamma·Genspark에 붙여 넣어 초안을 만들고, 브랜드 디자인이 필요하면 Canva에서 다듬어요." },
      { step: "숫자·차트 확인", detail: "AI가 만든 차트 숫자는 원자료와 대조해요. 출처 없는 숫자는 지우거나 출처를 달아요." },
      { step: "PPTX로 마무리", detail: "PowerPoint나 Google Slides로 내보내 회사 템플릿·폰트에 맞추고 발표자 노트를 범용 AI로 써요." },
    ],
    combos: [
      { pair: "범용 AI 개요 + Gamma 초안", why: "구조는 대화로 다듬고, 시각화는 전용 도구가 한 번에 해서 수정 횟수가 줄어요." },
      { pair: "Genspark 조사 + Canva 디자인", why: "조사가 붙은 초안을 디자인 도구로 옮겨 브랜드에 맞춰요." },
      { pair: "전문 분야 도구 + PPT 도구", why: "세무·법무 보고는 근거가 붙는 전용 도구 결과를 먼저 만들고 발표 도구로 옮겨요." },
    ],
    cautions: [
      "회사 기밀 자료를 올리기 전에 서비스의 데이터 학습 설정을 확인하세요.",
      "AI 이미지·아이콘의 상업적 사용 조건은 서비스마다 달라요. 외부 발표 전에 약관을 확인하세요.",
      "요금제와 내보내기 조건은 자주 바뀌어요. 공식 가격표에서 PPTX 내보내기가 포함됐는지 확인하세요.",
    ],
    keywords: ["PPT 만들기 AI", "AI 프레젠테이션", "Gamma 사용법", "발표자료 자동 생성", "PPTX 내보내기"],
  },
];

export const GUIDES: Guide[] = [...BASE_GUIDES, ...creativeGuides, ...workGuides, pdfGuides.ko];
