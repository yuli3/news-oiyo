// 「이번 주 AI로 만든 놀라운 것 N선」 (2026-11-25). 주간 호 하나 = src/data/ai-wow/<YYYY-Www>.json.
// 규칙: 만든 사람과 원문 링크를 반드시 단다. 남의 영상·이미지는 다시 올리지 않고 링크만 건다.
// 조회수·매출·시간 같은 숫자는 게시자 주장이라 claim 칸에만 두고 "주장"으로 표시한다.
// 페이지(src/pages/ai/wow/)·쇼츠 렌더러(scripts/render-ai-wow-short.mjs)·테스트가 이 파일 하나를 쓴다.

export const SITE = "https://news.oiyo.net";
export const CATEGORIES = {
  space: { label: "공간·설계", color: "#7fd6c8" },
  video: { label: "코드로 만든 영상", color: "#f5a3c7" },
  science: { label: "과학·의료", color: "#8ab4ff" },
  device: { label: "실물 기기", color: "#f5c56b" },
  game: { label: "게임·모델 대결", color: "#b49cff" },
  agent: { label: "에이전트", color: "#9be38f" },
  tool: { label: "생활 도구", color: "#ffb86b" },
};
export const PLATFORMS = ["X", "YouTube", "Reddit", "GitHub", "Substack", "Instagram", "Threads", "Blog", "HN", "GeekNews"];

const WEEK = /^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const https = (u) => typeof u === "string" && /^https:\/\/[^\s]+$/.test(u);

/** 호 하나를 검사해 문제 목록을 돌려준다(빈 배열이면 통과). */
export function validateIssue(issue, file = "") {
  const errs = [];
  const at = (m) => errs.push(`${file || issue?.week || "?"}: ${m}`);
  if (!issue || typeof issue !== "object") return [`${file}: JSON 객체가 아님`];
  if (!WEEK.test(issue.week ?? "")) at(`week 형식(YYYY-Www) 아님: ${issue.week}`);
  if (file && !file.endsWith(`${issue.week}.json`)) at(`파일 이름과 week 불일치`);
  if (!issue.title?.trim()) at("title 없음");
  if (!issue.lede?.trim()) at("lede 없음");
  if (!DATE.test(issue.range?.from ?? "") || !DATE.test(issue.range?.to ?? "") || issue.range.from > issue.range.to) at("range 날짜 이상");
  if (!DATE.test(issue.published ?? "")) at("published 날짜 이상");
  const items = Array.isArray(issue.items) ? issue.items : [];
  if (items.length < 3 || items.length > 15) at(`항목 수 ${items.length} (3~15개)`);
  const ids = new Set();
  items.forEach((it, i) => {
    const w = (m) => at(`#${i + 1} ${it?.id ?? ""}: ${m}`);
    if (!/^[a-z0-9-]+$/.test(it?.id ?? "")) w("id는 소문자·숫자·하이픈");
    if (ids.has(it.id)) w("id 중복");
    ids.add(it.id);
    for (const k of ["title", "what", "how", "why"]) if (!it[k]?.trim()) w(`${k} 없음`);
    if (!https(it.url)) w("url(원문)은 https 필수");
    if (!it.creator?.name?.trim() || !it.creator?.handle?.trim()) w("만든 사람(name·handle) 필수");
    if (!PLATFORMS.includes(it.creator?.platform)) w(`platform 미등록: ${it.creator?.platform}`);
    if (it.creator?.profile && !https(it.creator.profile)) w("profile은 https");
    if (!CATEGORIES[it.category]) w(`category 미등록: ${it.category}`);
    if (!DATE.test(it.date ?? "")) w("date 형식");
    if (it.media) w("media 금지: 남의 영상·이미지를 다시 올리지 않고 링크만 건다");
    if (/조회수|\d[\d,.]*\s*(만|천)?\s*뷰(?!어)|\bviews\b/i.test(`${it.title} ${it.what} ${it.how} ${it.why}`)) w("조회수는 본문이 아니라 claim 칸에(게시자 주장)");
  });
  return errs;
}

/** 원문 링크 호스트를 짧게: x.com, youtube.com … */
export function host(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

export const issueUrl = (issue) => `${SITE}/ai/wow/${issue.week}/`;
export const weekLabel = (issue) => {
  const [, m1, d1] = issue.range.from.split("-").map(Number);
  const [, m2, d2] = issue.range.to.split("-").map(Number);
  return m1 === m2 ? `${m1}월 ${d1}~${d2}일` : `${m1}월 ${d1}일~${m2}월 ${d2}일`;
};

/** 쇼츠에 넣을 항목: 앞에서부터 최대 max개(편집 순서가 곧 순위). */
export function shortItems(issue, max = 7) {
  return issue.items.slice(0, max);
}

/** 크레딧 한 줄: "@Nyxera0x · X" */
export const credit = (it) => `${it.creator.handle} · ${it.creator.platform}${it.via ? ` (${it.via})` : ""}`;

/** 유튜브·인스타·X 게시 문구. 원문 링크를 모두 단다(이 포맷의 규칙). */
export function buildMeta(issue, { max = 7 } = {}) {
  const items = shortItems(issue, max);
  const url = issueUrl(issue);
  const n = items.length;
  const title = `이번 주 AI로 만든 놀라운 것 ${n}선 (${weekLabel(issue)}) #shorts`;
  const lines = items.map((it, i) => `${i + 1}. ${it.title}\n   만든 사람: ${credit(it)}\n   원문: ${it.url}`);
  const description = [
    `${weekLabel(issue)} 사람들이 AI로 처음 해 본 일 ${n}가지. 영상 속 화면은 OIYO가 직접 만든 글자 카드이고, 원작자의 영상·이미지는 쓰지 않았어요. 원문은 아래 링크에서 보세요.`,
    "",
    ...lines,
    "",
    `전체 ${issue.items.length}선과 자세한 설명: ${url}`,
    "조회수·비용·시간은 게시자 주장이에요.",
    "",
    "#AI #클로드코드 #바이브코딩 #AI활용",
  ].join("\n");
  const caption = [
    `이번 주 AI로 만든 놀라운 것 ${n}선 (${weekLabel(issue)})`,
    "",
    ...items.map((it, i) => `${i + 1}. ${it.title} — ${it.creator.handle}`),
    "",
    `원문 링크 전부: news.oiyo.net/ai/wow/${issue.week}`,
    "#AI #클로드코드 #바이브코딩 #AI활용 #개발자",
  ].join("\n");
  const x = `이번 주 AI로 만든 놀라운 것 ${issue.items.length}선 (${weekLabel(issue)})\n\n${issue.items.slice(0, 3).map((it) => `· ${it.title} (${it.creator.handle})`).join("\n")}\n\n만든 사람·원문 링크 전부 👇\n${url}`;
  return { week: issue.week, url, youtube: { title: title.slice(0, 100), description: description.slice(0, 4900), tags: ["AI", "클로드코드", "바이브코딩", "AI활용", "Claude Code"], categoryId: "28" }, instagram: { caption: caption.slice(0, 2200) }, x: { text: x } };
}

/** 장면 길이: 표지 3.5초, 항목마다 같은 길이, 끝 5초, 전체 58초 안. (econ-shorts timeline 과 같은 모양) */
export function timeline(n, { total = 58, intro = 3.5, outro = 5, fade = 0.5 } = {}) {
  const per = Math.min(9, (total - intro - outro + fade * (n + 1)) / n);
  const durs = [intro, ...Array(n).fill(Math.round(per * 10) / 10), outro];
  const starts = [];
  let t = 0;
  for (const d of durs) { starts.push(Math.round(t * 100) / 100); t += d - fade; }
  return { durs, starts, length: Math.round((t + fade) * 100) / 100, fade };
}

/** 장면별 나레이션 문장(읽기 변환 전). */
export function narrationLines(issue, max = 7) {
  const items = shortItems(issue, max);
  return [
    `이번 주 AI로 만든 놀라운 것 ${items.length}가지입니다.`,
    ...items.map((it, i) => `${i + 1}번. ${it.title.replace(/["'→·()]/g, " ").replace(/\s+/g, " ").trim()}.`),
    "만든 사람과 원문 링크는 설명란에 있습니다. AI 음성입니다.",
  ];
}
