export type RadarHrefKind = "outbound" | "internal";

export interface RadarItem {
  id: string;
  name: string;
  url: string;
  note: string;
  kind: RadarHrefKind;
}

export interface RadarShelf {
  id: string;
  label: string;
  desc: string;
  items: RadarItem[];
}

export const RADAR_SHELVES: RadarShelf[] = [
  {
    id: "galleries",
    label: "디자인 갤러리",
    desc: "소셜·덱·사이트·OG·로고·푸터. 매일 바뀌지 않는 레퍼런스.",
    items: [
      { id: "inspora", name: "Inspora", url: "https://inspora.design/", note: "잘 만든 소셜 포스트만 모아 둔 갤러리.", kind: "outbound" },
      { id: "deck-gallery", name: "Deck Gallery", url: "https://deck.gallery/", note: "발표 덱만 골라 보는 선반.", kind: "outbound" },
      { id: "minimal-gallery", name: "Minimal Gallery", url: "https://minimal.gallery/", note: "여백과 타이포가 중심인 사이트 모음.", kind: "outbound" },
      { id: "ogfolio", name: "OG Folio", url: "https://www.ogfolio.com/", note: "OG 이미지 레퍼런스.", kind: "outbound" },
      { id: "logoinspo", name: "Logo Inspo", url: "https://www.logoinspo.com/", note: "로고 시안을 빠르게 훑는 곳.", kind: "outbound" },
      { id: "posts-design", name: "Posts.design", url: "https://posts.design/", note: "빅테크 마케팅 포스트 모음.", kind: "outbound" },
      { id: "footer-design", name: "Footer.design", url: "https://www.footer.design/", note: "푸터만 모아 비교한다.", kind: "outbound" },
      { id: "saaspo", name: "Saaspo", url: "https://saaspo.com/", note: "SaaS 랜딩 패턴 갤러리.", kind: "outbound" },
    ],
  },
  {
    id: "design-eng",
    label: "디자인 엔지니어링",
    desc: "컴포넌트·모션·가이드·에이전트 스킬. 카탈로그 복제가 아니라 쓰는 선반.",
    items: [
      { id: "number-flow", name: "NumberFlow", url: "https://number-flow.barvian.me/", note: "숫자가 자리 맞춰 흐르는 컴포넌트.", kind: "outbound" },
      { id: "sonner", name: "Sonner", url: "https://sonner.emilkowal.ski/", note: "토스트의 사실상 표준.", kind: "outbound" },
      { id: "cmdk", name: "⌘K", url: "https://github.com/dip/cmdk", note: "커맨드 팔레트. cmdk.paco.me는 이 레포로 301.", kind: "outbound" },
      { id: "magic-ui", name: "Magic UI", url: "https://magicui.design/", note: "랜딩용 모션 컴포넌트 키트.", kind: "outbound" },
      { id: "animations-dev", name: "animations.dev", url: "https://animations.dev/", note: "인터페이스 모션 레퍼런스.", kind: "outbound" },
      { id: "transitions-dev", name: "Transitions.dev", url: "https://transitions.dev/", note: "뷰 전환 패턴.", kind: "outbound" },
      { id: "design-spells", name: "Design Spells", url: "https://designspells.com/", note: "작은 UI 마법만 모아 둔 노트.", kind: "outbound" },
      { id: "laws-of-ux", name: "Laws of UX", url: "https://lawsofux.com/", note: "UX 휴리스틱을 짧게 고정한 사전.", kind: "outbound" },
      { id: "web-interface-guidelines", name: "Web Interface Guidelines", url: "https://interfaces.rauno.me/", note: "웹 UI를  dens하게 적어 둔 가이드.", kind: "outbound" },
      { id: "component-gallery", name: "The Component Gallery", url: "https://component.gallery/", note: "실제 디자인 시스템의 컴포넌트 표본.", kind: "outbound" },
      { id: "design-systems-surf", name: "Design Systems Surf", url: "https://designsystems.surf/", note: "공개 디자인 시스템 디렉터리.", kind: "outbound" },
      { id: "design-system-checklist", name: "Design System Checklist", url: "https://www.designsystemchecklist.com/", note: "시스템 구축 체크리스트.", kind: "outbound" },
      { id: "userinterface-wiki", name: "userinterface.wiki", url: "https://www.userinterface.wiki/", note: "UI 패턴 위키.", kind: "outbound" },
      { id: "you-dont-need-animations", name: "You Don't Need Animations", url: "https://emilkowal.ski/ui/you-dont-need-animations", note: "모션을 언제 빼야 하는지.", kind: "outbound" },
      { id: "taste-skill", name: "Taste Skill", url: "https://github.com/tasteskill/tasteskill", note: "에이전트 프론트가 슬롭으로 기울지 않게 하는 스킬. 사이트명 tasteskill.dev.", kind: "outbound" },
      { id: "impeccable", name: "Impeccable", url: "https://impeccable.style/", note: "에이전트용 디자인 어휘·안티패턴.", kind: "outbound" },
      { id: "emil-skills", name: "emilkowalski/skills", url: "https://github.com/emilkowalski/skills", note: "모션·인터페이스 쪽 에이전트 스킬.", kind: "outbound" },
      { id: "jakub-skills", name: "jakubkrehel/skills", url: "https://github.com/jakubkrehel/skills", note: "타이포·레이아웃·컬러 스킬 묶음.", kind: "outbound" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    desc: "서비스 목록은 여기 다시 쓰지 않는다.",
    items: [
      { id: "ai-curator", name: "AI 큐레이터", url: "/ai/curator/", note: "대화·이미지·코딩 서비스 선반은 기존 큐레이터.", kind: "internal" },
    ],
  },
];
