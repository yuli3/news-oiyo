// 공개 요약에서 내부 메모를 빼는 식은 src/lib/feed.ts INTERNAL_MEMO_PATTERNS 와
// 같아야 한다. 메일 본문에 수집 메모가 나가지 않게 렌더 시점에 거른다.

export const INTERNAL_MEMO_PATTERNS = [
  /빈\s*배열/,
  /반환합니다/,
  /아이디어(를|는)?\s*(배제|도출|제안|생략)/,
  /\d+\s*개의\s*아이디어/,
  /제안을\s*생략/,
  /당사/,
  /저희/,
  /오이요/,
  /oiyo/i,
  /우리\s*(서비스|스택|OS|제품|사이트|네트워크)/,
  /우리와\s*같은/,
  /\[\[[^\]]+\]\]/,
  /ops-dashboard|AI-native OS/i,
  /수집\s*공백/,
];

function isInternalMemo(text) {
  if (!text?.trim()) return false;
  return INTERNAL_MEMO_PATTERNS.some((pattern) => pattern.test(text));
}

export function publicDaySummary(summary) {
  if (!summary?.trim()) return "";
  return summary
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !isInternalMemo(paragraph))
    .join("\n\n");
}

// 2026-10-14 세운: 소식 메일은 주 1통이다. 하루 3건까지, 7일이면 최대 21건.
export const WEEKLY_DAYS = 7;
export const WEEKLY_PER_DAY = 3;
const DIGEST_ITEM_CAP = WEEKLY_DAYS * WEEKLY_PER_DAY;

function scoreOf(item) {
  const score = Number(item?.score);
  return Number.isFinite(score) ? score : 0;
}

function shiftDate(iso, deltaDays) {
  const [year, month, day] = iso.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + deltaDays));
  return shifted.toISOString().slice(0, 10);
}

export function selectWeeklyItems(days, { end, perDay = WEEKLY_PER_DAY, span = WEEKLY_DAYS } = {}) {
  const dated = (days || []).filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day?.date || ""));
  dated.sort((a, b) => a.date.localeCompare(b.date));
  const through = end || dated.at(-1)?.date || "";
  if (!through) return { start: "", through: "", items: [] };
  const start = shiftDate(through, -(span - 1));
  const items = [];
  for (const day of dated) {
    if (day.date < start || day.date > through) continue;
    const ranked = [...(day.items || [])].sort((a, b) => scoreOf(b) - scoreOf(a));
    for (const item of ranked.slice(0, perDay)) items.push({ ...item, date: day.date });
  }
  items.sort((a, b) => b.date.localeCompare(a.date) || scoreOf(b) - scoreOf(a));
  return { start, through, items };
}

export function buildDigest({ date, through, summary, items, pageUrl }) {
  const label = through && through !== date ? `${date} ~ ${through}` : date;
  const lead = publicDaySummary(summary);
  const lines = [
    `[광고] OIYO AI·금융 소식 ${label}`,
    "보내는 이: OIYO News · https://news.oiyo.net/",
    "",
  ];
  if (through && through !== date) lines.push(`${date}부터 ${through}까지 고른 제목입니다.`, "");
  else if (lead) lines.push(lead, "");
  const picked = [];
  let lastDate = "";
  for (const item of items || []) {
    if (picked.length >= DIGEST_ITEM_CAP) break;
    if (typeof item?.title !== "string" || !item.title.trim()) continue;
    if (typeof item?.url !== "string" || !item.url.startsWith("https://")) continue;
    picked.push(item);
    if (typeof item.date === "string" && item.date !== lastDate) {
      lines.push(item.date);
      lastDate = item.date;
    }
    lines.push(item.title.trim());
    const detail = typeof item.detailSummary === "string" ? item.detailSummary.trim() : "";
    if (detail && !isInternalMemo(detail)) lines.push(detail.slice(0, 240));
    lines.push(item.url, "");
  }
  if ((items || []).length > picked.length) {
    lines.push(`나머지는 날짜별 모아보기에 있습니다. ${pageUrl}`, "");
  }
  lines.push("이 메일은 일주일에 한 통입니다.");
  lines.push("이 메일은 AI·금융 소식 수신에 동의한 주소로 보냅니다.");
  lines.push("개인화된 투자 권유는 아닙니다.");
  lines.push("수신 거부 링크는 받는 사람마다 따로 붙습니다.");
  return { subject: `[광고] OIYO AI·금융 소식 ${label}`, text: lines.join("\n"), itemCount: picked.length };
}

export function withUnsubscribe(text, origin, token) {
  const link = `${origin}/subscribe/unsubscribe/?token=${encodeURIComponent(token)}`;
  return text.replace("수신 거부 링크는 받는 사람마다 따로 붙습니다.", `수신 거부: ${link}`);
}
