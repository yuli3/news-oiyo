// 경제 속보 60초 쇼츠의 순수 로직 (2026-11-23).
// 입력은 /api/wire JSON. 공식 기관(중앙은행·정부·통계기관) 발표만 고르고, 장면 문구와 업로드 문구를 만든다.
// 원칙: 제목·출처·시각·원문 링크만 쓴다(본문 재게시·요약 생성 없음). 숫자·해석을 새로 만들지 않는다.
// 렌더(scripts/render-econ-short.mjs)와 테스트(tests/econ-shorts.test.ts)가 함께 쓴다.

// 1차 출처 id → 화면에 쓰는 한국어 기관명. server/econ-wire.ts WIRE_SOURCES 의 primary 와 같아야 한다(테스트가 확인).
export const OFFICIAL = {
  bok: "한국은행",
  moef: "재정경제부",
  mods: "국가데이터처(통계청)",
  "federal-reserve": "미국 연준(Fed)",
  "fed-speeches": "미국 연준 연설",
  sec: "미국 증권거래위원회(SEC)",
  "bls-cpi": "미국 노동통계국 · 소비자물가",
  "bls-empsit": "미국 노동통계국 · 고용보고서",
  "bls-ppi": "미국 노동통계국 · 생산자물가",
  "bls-jolts": "미국 노동통계국 · 구인·이직",
  bea: "미국 경제분석국(BEA)",
  eia: "미국 에너지정보청(EIA)",
  ecb: "유럽중앙은행(ECB)",
  boj: "일본은행(BOJ)",
  boe: "영란은행(BoE)",
};

const TAG_KO = { rates: "금리", fx: "환율", stocks: "증시", crypto: "크립토", realestate: "부동산", commodities: "원자재", macro: "경제지표", policy: "정책", earnings: "실적" };
const DOW = ["일", "월", "화", "수", "목", "금", "토"];
const hasHangul = (s = "") => /[가-힣]/.test(s);

// 공식 피드라도 시장과 상관없는 행정 공지(은행 합병 승인·제재 종료·인사·회의록 일정)는 쇼츠에서 뺀다.
export const ROUTINE = /college fed challenge|announces? (?:the )?winners|call for (?:papers|applications)|conference|symposium agenda|job openings at|approval of (?:the )?(?:application|proposal)|enforcement action|termination of (?:an? )?enforcement|civil money penalty|announces? (?:the )?(?:appointment|retirement|departure)|discount rate meetings?|\b(?:charges|settles|obtains (?:final )?judgment)\b|인사|채용|입찰|공모전|행사 안내/i;

export function isOfficial(item) {
  return Boolean(item && (item.flash || Object.hasOwn(OFFICIAL, item.source)) && !ROUTINE.test(item.title || ""));
}

export function orgName(item) {
  return OFFICIAL[item.source] || item.sourceName || "공식 발표";
}

/** KST 날짜·시각 문자열. */
export function kst(iso) {
  const d = new Date(new Date(iso).getTime() + 9 * 3600_000);
  const p = (n) => String(n).padStart(2, "0");
  return {
    date: `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`,
    md: `${d.getUTCMonth() + 1}월 ${d.getUTCDate()}일`,
    short: `${d.getUTCMonth() + 1}/${d.getUTCDate()}(${DOW[d.getUTCDay()]}) ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`,
    dow: DOW[d.getUTCDay()],
  };
}

// 영어 제목만 있는 1차 기관 발표 중 정형화된 것만 한국어 한 줄로 바꾼다(숫자·해석은 넣지 않는다).
// /api/wire 의 titleKo(Hermes)가 있으면 그것이 먼저다. 연설은 "이름: 제목" 꼴이라 연사만 옮긴다.
const KO_HINTS = [
  [/^consumer price index/i, "미국 소비자물가지수(CPI) 발표"],
  [/^employment situation/i, "미국 고용보고서 발표"],
  [/^producer price index/i, "미국 생산자물가지수(PPI) 발표"],
  [/^job openings and labor turnover/i, "미국 구인·이직 보고서(JOLTS) 발표"],
  [/^real (?:average|earnings)/i, "미국 실질임금 발표"],
  [/minutes of the federal open market committee/i, "미국 FOMC 의사록 공개"],
  [/federal reserve issues fomc statement|^fomc statement/i, "미국 FOMC 성명 발표"],
  [/^gdp|gross domestic product/i, "미국 국내총생산(GDP) 발표"],
  [/^personal income and outlays/i, "미국 개인소득·지출(PCE 물가) 발표"],
  [/^u\.?s\.? international trade in goods and services/i, "미국 무역수지 발표"],
  [/^short-term energy outlook/i, "미국 단기 에너지 전망(STEO) 발표"],
  [/^monetary policy decisions?$/i, "ECB 통화정책 결정 발표"],
  [/^bank rate maintained|^bank rate (?:increased|reduced)/i, "영란은행 기준금리 결정"],
  [/^statement on monetary policy/i, "일본은행 통화정책 성명"],
];

export function koHint(item) {
  const t = (item.title || "").trim();
  for (const [re, ko] of KO_HINTS) if (re.test(t)) return ko;
  const sp = t.match(/^([A-Z][A-Za-z.' -]{2,40}):\s+(.{3,})$/);
  if (sp && /speech|fed|ecb|boj|boe/.test(item.source + (item.sourceName || "").toLowerCase())) return `${sp[1]} 연설`;
  return null;
}

const korean = (i) => hasHangul(i.title) || Boolean(i.titleKo) || Boolean(koHint(i));

function score(item, now) {
  const age = (now - new Date(item.publishedAt).getTime()) / 3600_000;
  let s = 0;
  if (item.flash) s += 3;
  if (item.impact === "high") s += 2;
  if (korean(item)) s += 1.5;
  if (item.region === "KR") s += 0.5;
  return s - age / 24;
}

/**
 * 공식 발표만 골라 최대 max 건. 기본 30시간 안, 모자라면 72시간까지 넓힌다(주말·휴일).
 * 같은 기관은 2건까지, 같은 제목은 1건. min 건 미만이면 빈 배열(그날은 영상 없음).
 */
export function selectItems(wire, { now = new Date(), max = 5, min = 3 } = {}) {
  const t = now.getTime();
  const pool = (Array.isArray(wire?.items) ? wire.items : [])
    .filter((i) => isOfficial(i) && i.publishedAt && i.url && /^https:\/\//.test(i.url) && i.title)
    .filter((i) => new Date(i.publishedAt).getTime() <= t + 10 * 60_000);
  for (const hours of [30, 72]) {
    const fresh = pool.filter((i) => t - new Date(i.publishedAt).getTime() <= hours * 3600_000);
    const ranked = fresh.map((i) => ({ i, s: score(i, t) })).sort((a, b) => b.s - a.s).map((x) => x.i);
    const out = [];
    const perSource = new Map();
    const seen = new Set();
    for (const i of ranked) {
      const key = (i.titleKo || i.title).replace(/\s+/g, "").toLowerCase();
      const org = orgName(i).split(" · ")[0];
      if (seen.has(key) || (perSource.get(org) || 0) >= 2) continue;
      seen.add(key);
      perSource.set(org, (perSource.get(org) || 0) + 1);
      out.push(i);
      if (out.length >= max) break;
    }
    // 한국어로 보여 줄 수 있는 발표가 min 건 이상이면 영어 원제뿐인 발표는 뺀다.
    const ko = out.filter(korean);
    if (ko.length >= min) return ko;
    if (out.length >= min) return out;
  }
  return [];
}

/** 장면 하나에 들어갈 문구. 영어 제목은 한국어 한 줄(titleKo)이 있으면 그걸 크게, 원제는 작게. */
export function card(item) {
  const ko = hasHangul(item.title) ? null : item.titleKo || koHint(item);
  return {
    org: orgName(item),
    when: kst(item.publishedAt).short,
    headline: (ko || item.title).trim(),
    original: ko ? item.title.trim() : null,
    tags: (item.tags || []).map((t) => TAG_KO[t]).filter(Boolean).slice(0, 3),
    flash: Boolean(item.flash),
    host: new URL(item.url).hostname.replace(/^www\./, ""),
    url: item.url,
  };
}

const LIVE = "https://news.oiyo.net/finance/live/";
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/** 업로드 문구(YouTube·Instagram). 화면과 같은 사실만 쓴다. */
export function buildMeta(cards, now = new Date()) {
  const day = kst(now.toISOString());
  const top = cards[0];
  const title = clip(`${day.md} 경제 공식 발표 ${cards.length}건 · ${top.headline}`, 88) + " #Shorts";
  const lines = cards.map((c) => `• [${c.org}] ${c.headline}${c.original ? ` (${c.original})` : ""}\n  ${c.url}`);
  const disclaimer = "중앙은행·정부·통계기관이 낸 공식 발표의 제목만 모았습니다. 내용은 각 기관 원문에서 확인하세요. 투자 권유가 아닙니다.";
  const tags = "#경제뉴스 #경제속보 #공식발표 #금리 #환율 #Shorts";
  const description = [`${day.md}(${day.dow}) 경제 공식 발표 ${cards.length}건`, "", ...lines, "", `실시간 경제 속보: ${LIVE}`, "", disclaimer, "", tags].join("\n");
  const caption = [`${day.md} 경제 공식 발표 ${cards.length}건 📊`, "", ...cards.map((c) => `• [${c.org}] ${c.headline}`), "", "👉 실시간 속보: 프로필 링크 → news.oiyo.net/finance/live", "", disclaimer, "", "#경제뉴스 #경제속보 #공식발표 #OIYO"].join("\n");
  return { date: day.date, youtube: { title, description, categoryId: "25", isAiGenerated: false }, instagram: { caption }, link: LIVE };
}

/** 장면 길이(초). 첫 장면 3.5, 마지막 5, 나머지를 기사 수로 나눠 최대 58초. 장면 사이 0.5초 겹침. */
export function timeline(n, { total = 58, intro = 3.5, outro = 5, fade = 0.5 } = {}) {
  const per = Math.min(12, (total - intro - outro + fade * (n + 1)) / n);
  const durs = [intro, ...Array(n).fill(Math.round(per * 10) / 10), outro];
  const starts = [];
  let t = 0;
  for (const d of durs) { starts.push(Math.round(t * 100) / 100); t += d - fade; }
  return { durs, starts, length: Math.round((t + fade) * 100) / 100, fade };
}

// ── 나레이션 (2026-11-24) ────────────────────────────────────────────────
// 음성 엔진(Supertonic 3)에 숫자·기호를 그대로 넘기면 "2.50%"를 "이 점 오공"처럼 읽을 수 있어,
// 넘기기 전에 한국어 읽기로 바꿔 둔다. 화면 글자는 그대로 두고 소리만 바꾼다.

const SINO = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const NATIVE = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉"];
const NATIVE_TENS = ["", "열", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];

/** 정수를 한자어 수로: 1234 → 천이백삼십사, 25000 → 이만 오천. */
export function sino(n) {
  n = Math.floor(Math.abs(Number(n)));
  if (n === 0) return "영";
  const small = (x) => {
    let s = "";
    for (const [v, u] of [[1000, "천"], [100, "백"], [10, "십"]]) {
      const d = Math.floor(x / v) % 10;
      if (d) s += (d === 1 ? "" : SINO[d]) + u;
    }
    const one = x % 10;
    return s + (one ? SINO[one] : "");
  };
  const parts = [];
  for (const [v, u] of [[1e12, "조"], [1e8, "억"], [1e4, "만"], [1, ""]]) {
    const chunk = Math.floor(n / v) % 10000;
    if (!chunk) continue;
    parts.push((u === "만" && chunk === 1 ? "" : small(chunk)) + u);
  }
  return parts.join(" ");
}

/** 1~99 고유어 수(관형형): 3 → 세, 12 → 열두, 20 → 스무. */
export function native(n) {
  n = Math.floor(n);
  if (n < 1 || n > 99) return sino(n);
  if (n === 20) return "스무";
  return NATIVE_TENS[Math.floor(n / 10)] + NATIVE[n % 10];
}

const DIGITS = (s) => [...s].map((d) => SINO[Number(d)]).join("");
/** "2.50" → "이 점 오", "0.25" → "영 점 이오". 소수점 아래 끝 0 은 읽지 않는다(뉴스 낭독 관례). */
function decimal(intPart, frac) {
  const f = (frac || "").replace(/0+$/, "");
  return sino(Number(intPart)) + (f ? ` 점 ${DIGITS(f)}` : "");
}

const LETTERS = { A: "에이", B: "비", C: "씨", D: "디", E: "이", F: "에프", G: "지", H: "에이치", I: "아이", J: "제이", K: "케이", L: "엘", M: "엠", N: "엔", O: "오", P: "피", Q: "큐", R: "알", S: "에스", T: "티", U: "유", V: "브이", W: "더블유", X: "엑스", Y: "와이", Z: "지" };
// 글자로 읽지 않고 단어처럼 읽는 약어.
const WORDS = { JOLTS: "졸츠", OPEC: "오펙", NASA: "나사", ASEAN: "아세안", BoE: "비오이", BoJ: "비오제이", BoK: "비오케이" };
const NATIVE_COUNTERS = "개|명|곳|가지|시간|살|척|대";
const MONTHS = { 6: "유월", 10: "시월" };

/** 화면 문구를 소리 내어 읽을 문장으로 바꾼다. */
export function speakKo(text) {
  let s = String(text)
    .replace(/[‘’“”"「」『』]/g, "")
    .replace(/…/g, ". ")
    .replace(/·/g, ", ")
    .replace(/(\d),(?=\d{3}\b)/g, "$1");
  for (const [w, r] of Object.entries(WORDS)) s = s.replace(new RegExp(`\\b${w}\\b`, "g"), r);
  s = s
    // 범위: 2~3% → 이에서 삼 퍼센트
    .replace(/(\d+(?:\.\d+)?)\s*[~–-]\s*(?=\d)/g, "$1에서 ")
    .replace(/(\d+)\.(\d+)\s*%p/g, (_, a, b) => `${decimal(a, b)} 퍼센트포인트`)
    .replace(/(\d+)\s*%p/g, (_, a) => `${sino(a)} 퍼센트포인트`)
    .replace(/(\d+)\.(\d+)\s*%/g, (_, a, b) => `${decimal(a, b)} 퍼센트`)
    .replace(/(\d+)\s*%/g, (_, a) => `${sino(a)} 퍼센트`)
    .replace(/(\d+)\s*bp\b/gi, (_, a) => `${sino(a)} 베이시스포인트`)
    .replace(/\$\s*(\d+)(?:\.(\d+))?/g, (_, a, b) => `${decimal(a, b)} 달러`)
    .replace(/(\d{1,2}):(\d{2})/g, (_, h, m) => `${Number(h) <= 12 && Number(h) > 0 ? native(Number(h)) : sino(h)} 시${Number(m) ? ` ${sino(m)} 분` : ""}`)
    .replace(/(\d{4})\s*년/g, (_, y) => `${sino(y)}년`)
    .replace(/(\d{1,2})\s*월/g, (_, m) => MONTHS[Number(m)] || `${sino(m)}월`)
    .replace(new RegExp(`(\\d+)\\s*(${NATIVE_COUNTERS})`, "g"), (_, n, c) => `${native(Number(n))} ${c}`)
    .replace(/(\d+)\.(\d+)/g, (_, a, b) => decimal(a, b))
    .replace(/\d+/g, (n) => sino(n))
    .replace(/\b[A-Z]{2,6}s?\b/g, (w) => [...w.replace(/s$/, "")].map((c) => LETTERS[c] || c).join(""))
    .replace(/[#*_()[\]{}<>|/\\]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,?!])/g, "$1")
    .trim();
  return s;
}

const hangulShare = (s) => (s.match(/[가-힣]/g) || []).length / Math.max(1, s.replace(/\s/g, "").length);

/**
 * 장면마다 읽을 문장과 시작 시각·최대 길이. 화면과 같은 사실만 읽는다.
 * 영어 원제만 있는 발표는 제목을 읽지 않고 기관명만 말한다.
 */
export function narration(cards, now = new Date(), tl = timeline(cards.length)) {
  const lines = [
    `경제 공식 발표 ${cards.length}건입니다.`,
    ...cards.map((c) => {
      const org = c.org.split(" · ")[0].replace(/\s*\([^)]*\)/g, "");
      return hangulShare(c.headline) >= 0.3 ? `${org}. ${c.headline}.` : `${org}의 새 발표입니다.`;
    }),
    "원문은 설명란 링크에서 확인하세요. AI 음성입니다.",
  ];
  const lead = 0.35;
  return lines.map((text, i) => ({
    text: speakKo(text),
    shown: text,
    start: Math.round((tl.starts[i] + lead) * 100) / 100,
    max: Math.round((tl.durs[i] - lead - tl.fade - 0.25) * 100) / 100,
  }));
}
