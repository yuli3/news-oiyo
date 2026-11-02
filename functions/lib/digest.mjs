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

// 2026-10-30 세운 승인: 발송 메일 법정 표기·UTM·연락처 (NOT READY 4건 해소).
// 연락처는 /subscribe/ 페이지에 이미 공개된 주소다. 바꿀 때는 MAILING_LIST_CONTACT로 넘긴다.
export const MAILING_CONTACT = "support@oiyo.net";
export const SENDER_LINE = "보내는 이: OIYO News · https://news.oiyo.net/";
export const UNSUBSCRIBE_PLACEHOLDER = "수신 거부 링크는 받는 사람마다 따로 붙습니다.";
const CAMPAIGN_PATTERN = /^[a-z0-9][a-z0-9-]{2,63}$/;

export function isCampaignId(value) {
  return typeof value === "string" && CAMPAIGN_PATTERN.test(value);
}

// 정보통신망법 제50조 표기: 광고성 정보면 제목 맨 앞에 "(광고)". 예전 "[광고]"는 고친다.
export function adSubject(subject, promotional = true) {
  const bare = String(subject || "").replace(/^\s*(\(광고\)|\[광고\])\s*/, "").trim();
  return promotional ? `(광고) ${bare}` : bare;
}

// 본문 링크 전부에 UTM을 붙인다. 이미 있는 utm_* 값은 이번 호 값으로 바꾼다. 수신 거부 링크는 건드리지 않는다.
export function withUtm(url, campaign) {
  let parsed;
  try { parsed = new URL(url); } catch { return url; }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return url;
  if (parsed.pathname.startsWith("/subscribe/unsubscribe")) return url;
  parsed.searchParams.set("utm_source", "newsletter");
  parsed.searchParams.set("utm_medium", "email");
  parsed.searchParams.set("utm_campaign", campaign);
  return parsed.toString();
}

export function tagLinks(text, campaign) {
  return String(text).replace(/https?:\/\/[^\s<>()"'{}]+[^\s<>()"'{}.,;:!?·]/g, (url) => withUtm(url, campaign));
}

export function mailFooter({ promotional = true, contact = MAILING_CONTACT } = {}) {
  return [
    "---",
    SENDER_LINE,
    `문의: ${contact}`,
    promotional ? "이 메일은 AI·금융 소식(광고성 정보 포함) 수신에 동의한 주소로 보냅니다." : "이 메일은 AI·금융 소식 수신에 동의한 주소로 보냅니다.",
    "개인화된 투자 권유는 아닙니다.",
    "수신을 원하지 않으면 아래 링크로 바로 해지할 수 있어요(무료).",
    UNSUBSCRIBE_PLACEHOLDER,
  ];
}

function finish({ subject, bodyLines, campaign, promotional, contact }) {
  const fullSubject = adSubject(subject, promotional);
  const body = [fullSubject, SENDER_LINE, "", tagLinks(bodyLines.join("\n"), campaign)].join("\n");
  return { subject: fullSubject, text: [body, ...mailFooter({ promotional, contact })].join("\n"), campaign, promotional };
}

// 미리보기용 자동 요약. 발송 경로는 이 결과를 쓰지 않는다(검토한 초안만 보낸다).
export function buildDigest({ date, through, summary, items, pageUrl, campaign, promotional = true, contact }) {
  const label = through && through !== date ? `${date} ~ ${through}` : date;
  const lead = publicDaySummary(summary);
  const lines = [];
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
  const mail = finish({ subject: `OIYO AI·금융 소식 ${label}`, bodyLines: lines,
    campaign: isCampaignId(campaign) ? campaign : `weekly-${(through || date || "").replaceAll("-", "")}`, promotional, contact });
  return { ...mail, itemCount: picked.length, source: "auto-preview" };
}

// 검토를 마친 초안(company-brain drafts/mailing/*.md 본문)으로 실제 발송 메일을 만든다.
export function buildReviewedDraftMail({ id, subject, body, promotional = true, contact } = {}) {
  if (!isCampaignId(id)) throw new Error("invalid_draft_id");
  if (typeof subject !== "string" || !subject.trim() || subject.length > 200) throw new Error("invalid_draft_subject");
  if (typeof body !== "string" || !body.trim()) throw new Error("invalid_draft_body");
  const lines = body.replace(/\r\n/g, "\n").trim().split("\n");
  const mail = finish({ subject, bodyLines: lines, campaign: id, promotional: promotional !== false, contact });
  const links = (mail.text.match(/https?:\/\/\S+/g) || []).length;
  return { ...mail, itemCount: links ? 1 : 0, source: "reviewed-draft", draftId: id };
}

export function withUnsubscribe(text, origin, token) {
  const link = `${origin}/subscribe/unsubscribe/?token=${encodeURIComponent(token)}`;
  return text.replace(UNSUBSCRIBE_PLACEHOLDER, `수신 거부: ${link}`);
}
