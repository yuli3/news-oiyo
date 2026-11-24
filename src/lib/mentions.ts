// 언급 출처 배지(2026-11-17). 데이터는 scripts/lib/mentions.mjs가 sync 때 만든다.
// 여기서는 화면에 쓸 칩 목록만 만든다(순수 함수, tests/mentions.test.ts).

export type MentionKind = "same-link" | "same-story";

export type Mention = {
  kind: MentionKind | string;
  src: string;
  sourceId?: string;
  url?: string;
  title?: string;
  itemId?: string;
  score?: number;
  comments?: number;
};

export type MentionChip = {
  key: string;
  /** 원문(1차 출처) · 같은 링크를 다룬 출처 · 같은 소식을 다룬 다른 기사 */
  role: "origin" | "mention" | "story";
  label: string;
  href?: string;
  score?: number;
  comments?: number;
  color: string;
  title: string;
  /** 배지 앞 작은 분류(2026-11-24): 원문·뉴스·블로그·커뮤니티·기관·저장소 */
  kind: string;
  /** 같은 소식으로 묶인 기사의 제목(role story) */
  storyTitle?: string;
  /** 묶인 기사의 OIYO 상세 페이지 id */
  itemId?: string;
};

// 배지 분류. 짧은 이름 기준. 모르는 이름은 "뉴스"로 둔다(레지스트리 밖 출처는 sync가 버린다).
const KIND: Record<string, string> = {
  HN: "커뮤니티", GeekNews: "커뮤니티", Lobsters: "커뮤니티", Reddit: "커뮤니티",
  OpenAI: "블로그", DeepMind: "블로그", Karpathy: "블로그", "Google Developers": "블로그", "NVIDIA Developer": "블로그",
  "한국은행": "기관", Fed: "기관", SEC: "기관", "재정경제부": "기관",
  GitHub: "저장소",
};

export function sourceKind(label: string): string {
  return KIND[label] ?? "뉴스";
}

// 배지는 좁은 폭에서 한 줄에 여러 개가 들어가야 해서 짧은 이름을 쓴다.
const SHORT: Record<string, string> = {
  "hacker-news": "HN", hn: "HN",
  lobsters: "Lobsters",
  geeknews: "GeekNews",
  reddit: "Reddit", "r-localllama": "Reddit", "r-machinelearning": "Reddit",
  "openai-news": "OpenAI", openai: "OpenAI",
  "deepmind-blog": "DeepMind", deepmind: "DeepMind",
  "karpathy-blog": "Karpathy", karpathy: "Karpathy",
  "google-developers": "Google Developers", googledev: "Google Developers",
  "nvidia-developer": "NVIDIA Developer", nvidiadev: "NVIDIA Developer",
  "yahoo-finance": "Yahoo Finance", yahoofinance: "Yahoo Finance",
  techcrunch: "TechCrunch", tc: "TechCrunch",
  github: "GitHub", gh: "GitHub",
  aitimes: "AI타임스", "ai타임스": "AI타임스",
  "zdnet-kr": "ZDNet", "지디넷": "ZDNet",
  "hankyung-finance": "한경", hankyung: "한경", "한국경제": "한경",
  "hankyung-realestate": "한경 부동산", hankyungre: "한경 부동산",
  "mk-economy": "매경", mk: "매경", "매일경제": "매경",
  bok: "한국은행", "한국은행": "한국은행",
  moef: "재정경제부", "기재부": "재정경제부",
  "federal-reserve": "Fed", fed: "Fed", federalreserve: "Fed",
  sec: "SEC",
  coindesk: "CoinDesk",
  "cnbc-finance": "CNBC", cnbc: "CNBC",
};

// 브랜드 색은 글자가 아니라 점에만 쓴다(NewsItem.astro 대비 메모 참고).
const DOT: Record<string, string> = {
  HN: "#ff6600", Lobsters: "#ac130d", GeekNews: "#0abf53", Reddit: "#ff4500",
  OpenAI: "#10a37f", DeepMind: "#4285f4", GitHub: "#24292f", "AI타임스": "#1d4ed8",
  ZDNet: "#c41e3a", "한경": "#0b4ea2", "한경 부동산": "#0b4ea2", "매경": "#e60012",
  "한국은행": "#00508f", Fed: "#004785", SEC: "#1b3a6b", CoinDesk: "#f5a300", CNBC: "#005594",
};

export function shortSourceLabel(src: string | undefined | null): string {
  const raw = String(src ?? "").trim();
  return SHORT[raw.toLowerCase()] ?? SHORT[raw] ?? raw;
}

export function sourceDot(label: string): string {
  return DOT[label] ?? "var(--muted)";
}

type ItemLike = {
  src: string;
  sourceId?: string;
  url: string;
  domain?: string;
  score?: number | null;
  comments?: number | null;
  discussionUrl?: string;
  mentions?: Mention[];
};

const CURATORS = new Set(["HN", "GeekNews", "Lobsters", "Reddit"]);

/**
 * 같은 출처(짧은 이름)가 여러 번이면 점수·댓글이 큰 쪽 하나로 합친다.
 * 2026-11-24: 같은 소식으로 묶인 기사도 출처가 같으면 배지 하나(퍼플렉시티 출처 칩처럼 "어디에서"만).
 * 기사 제목은 foldedStories()가 따로 보여 준다.
 */
function mergeByLabel(chips: MentionChip[]): MentionChip[] {
  const out: MentionChip[] = [];
  const at = new Map<string, number>();
  for (const chip of chips) {
    const k = `${chip.role === "origin" ? "origin" : "src"}|${chip.label}`;
    const i = at.get(k);
    if (i === undefined) { at.set(k, out.length); out.push(chip); continue; }
    const prev = out[i];
    if (!prev.href && chip.href) prev.href = chip.href;
    if ((chip.score ?? -1) > (prev.score ?? -1)) prev.score = chip.score;
    if ((chip.comments ?? -1) > (prev.comments ?? -1)) prev.comments = chip.comments;
  }
  return out;
}

/**
 * 항목 하나의 언급 칩. 언급이 하나도 없으면 빈 배열(배지 줄을 그리지 않는다).
 * 순서: 원문 → 이 항목의 출처 → 같은 링크를 다룬 출처(점수 순) → 같은 소식 다른 기사.
 */
export function mentionChips(item: ItemLike): MentionChip[] {
  const mentions = Array.isArray(item.mentions) ? item.mentions : [];
  if (mentions.length === 0) return [];
  const chips: MentionChip[] = [];
  const ownLabel = shortSourceLabel(item.sourceId ?? item.src);
  if (item.domain) {
    chips.push({
      key: "origin", role: "origin", label: item.domain, href: item.url, color: "var(--accent)",
      title: `원문(1차 출처): ${item.domain}`, kind: "원문",
    });
  }
  chips.push({
    key: "own", role: "mention", label: ownLabel,
    href: CURATORS.has(ownLabel) ? item.discussionUrl : item.discussionUrl ?? item.url,
    score: item.score ?? undefined, comments: item.comments ?? undefined,
    color: sourceDot(ownLabel), title: `${ownLabel}에서 언급`, kind: sourceKind(ownLabel),
  });
  const sameLink = mentions
    .filter((m) => m.kind !== "same-story")
    .slice()
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  for (const [i, m] of sameLink.entries()) {
    const label = shortSourceLabel(m.sourceId ?? m.src);
    chips.push({
      key: `m${i}`, role: "mention", label, href: m.url, score: m.score, comments: m.comments,
      color: sourceDot(label), title: `${label}에서도 같은 원문을 다뤘어요`, kind: sourceKind(label),
    });
  }
  for (const [i, m] of mentions.filter((x) => x.kind === "same-story").entries()) {
    const label = shortSourceLabel(m.sourceId ?? m.src);
    chips.push({
      key: `s${i}`, role: "story", label, href: m.url, score: m.score, comments: m.comments,
      color: sourceDot(label), title: m.title ? `같은 소식: ${m.title}` : `${label}의 같은 소식`, kind: sourceKind(label),
      storyTitle: m.title, itemId: m.itemId,
    });
  }
  return mergeByLabel(chips);
}

/** 같은 소식으로 묶여 이 기사 아래로 들어온 다른 기사(제목 있는 것). 목록의 "묶은 기사" 펼침에 쓴다. */
export function foldedStories(mentions: Mention[] | undefined): { label: string; kind: string; title: string; href?: string; itemId?: string }[] {
  const out: { label: string; kind: string; title: string; href?: string; itemId?: string }[] = [];
  const seen = new Set<string>();
  for (const m of Array.isArray(mentions) ? mentions : []) {
    if (m.kind !== "same-story" || !m.title) continue;
    const key = m.itemId ?? m.title;
    if (seen.has(key)) continue;
    seen.add(key);
    const label = shortSourceLabel(m.sourceId ?? m.src);
    out.push({ label, kind: sourceKind(label), title: m.title, href: m.url, itemId: m.itemId });
  }
  return out;
}

/** "N곳에서 언급" 의 N — 원문 칩을 뺀, 서로 다른 출처·기사 수. */
export function mentionCount(chips: MentionChip[]): number {
  return chips.filter((chip) => chip.role !== "origin").length;
}
