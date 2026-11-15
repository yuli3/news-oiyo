// 입력 규칙·스팸 규칙. D1 이나 Request 에 기대지 않는 순수 함수만 둔다(tests/rules.test.ts).

export const LIMITS = {
  nicknameMin: 2,
  nicknameMax: 16,
  commentMax: 1000,
  postTitleMax: 80,
  postBodyMax: 5000,
  /** 가입 24시간이 안 된 계정은 링크를 못 단다. */
  newAccountMs: 24 * 60 * 60 * 1000,
  maxLinks: 2,
  /** 신고가 이만큼 쌓이면 관리자가 보기 전까지 숨긴다. */
  autoHideReports: 3,
  /** 10분에 댓글 5개, 1시간에 글 3개. */
  commentWindowMs: 10 * 60 * 1000,
  commentPerWindow: 5,
  postWindowMs: 60 * 60 * 1000,
  postPerWindow: 3,
  sessionMs: 30 * 24 * 60 * 60 * 1000,
  /** 링크 글 주소 길이 한도. */
  urlMax: 500,
  /** 같은 주소가 이 기간 안에 이미 올라왔으면 새 글 대신 그 글로 보낸다. */
  duplicateUrlMs: 30 * 24 * 60 * 60 * 1000,
  /** 인기순은 최근 이만큼의 글만 순위를 매긴다. 그보다 오래된 글은 최신·추천순에서 본다. */
  hotWindowMs: 14 * 24 * 60 * 60 * 1000,
  hotCandidates: 500,
} as const;

/** share = 링크·정보(GeekNews 의 뉴스), question = Ask, show = 내가 만든 것(Show). 2026-11-15 show 추가. */
export const POST_CATEGORIES = ["free", "question", "share", "show"] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];
export const REPORT_REASONS = ["spam", "abuse", "illegal", "privacy", "other"] as const;

const THREAD_RE = /^(day:\d{4}-\d{2}-\d{2}|item:trend-[a-z0-9]{4,40}|post:[A-Za-z0-9_-]{10,40})$/;
export function isThreadKey(s: unknown): s is string {
  return typeof s === "string" && THREAD_RE.test(s);
}

const ID_RE = /^[A-Za-z0-9_-]{10,40}$/;
export function isId(s: unknown): s is string {
  return typeof s === "string" && ID_RE.test(s);
}

/** 제어문자를 빼고, 줄바꿈은 3줄 이상 연속되지 않게 접고, 앞뒤 공백을 자른다. */
export function cleanText(s: string): string {
  return s
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮⁦-⁩]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function countLinks(s: string): number {
  // 주소 하나를 통째로 먹어서 "https://a.com" 이 두 번 세지지 않게 한다.
  return (s.match(/(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|kr|io|co|me|xyz|top|shop)\b/gi) ?? []).length;
}

export type Check = { ok: true; value: string } | { ok: false; error: string };

export function checkNickname(raw: unknown): Check {
  if (typeof raw !== "string") return { ok: false, error: "닉네임을 입력해 주세요." };
  const v = cleanText(raw).replace(/\s+/g, " ");
  if ([...v].length < LIMITS.nicknameMin || [...v].length > LIMITS.nicknameMax)
    return { ok: false, error: `닉네임은 ${LIMITS.nicknameMin}~${LIMITS.nicknameMax}자로 정해 주세요.` };
  if (!/^[\p{L}\p{N} _.-]+$/u.test(v)) return { ok: false, error: "닉네임에는 글자, 숫자, 공백, _ . - 만 쓸 수 있어요." };
  if (/(관리자|운영자|admin|oiyo|오이요)/i.test(v)) return { ok: false, error: "운영자로 오해될 수 있는 닉네임은 쓸 수 없어요." };
  return { ok: true, value: v };
}

export function checkBody(raw: unknown, max: number, opts: { accountAgeMs: number }): Check {
  if (typeof raw !== "string") return { ok: false, error: "내용을 입력해 주세요." };
  const v = cleanText(raw);
  if (!v) return { ok: false, error: "내용을 입력해 주세요." };
  if ([...v].length > max) return { ok: false, error: `${max}자 이내로 써 주세요.` };
  const links = countLinks(v);
  if (links > 0 && opts.accountAgeMs < LIMITS.newAccountMs)
    return { ok: false, error: "가입하고 하루가 지나면 링크를 달 수 있어요." };
  if (links > LIMITS.maxLinks) return { ok: false, error: `링크는 ${LIMITS.maxLinks}개까지 달 수 있어요.` };
  // 같은 글자 반복(ㅋㅋㅋ… 는 허용 범위를 넉넉히).
  if (/(.)\1{29,}/u.test(v)) return { ok: false, error: "같은 글자를 너무 많이 반복했어요." };
  return { ok: true, value: v };
}

export function checkTitle(raw: unknown): Check {
  if (typeof raw !== "string") return { ok: false, error: "제목을 입력해 주세요." };
  const v = cleanText(raw).replace(/\s+/g, " ");
  if (!v) return { ok: false, error: "제목을 입력해 주세요." };
  if ([...v].length > LIMITS.postTitleMax) return { ok: false, error: `제목은 ${LIMITS.postTitleMax}자 이내로 써 주세요.` };
  return { ok: true, value: v };
}

export function defaultNickname(rand: number): string {
  return `독자${String(Math.floor(rand * 9000) + 1000)}`;
}

export function parseAdminAccounts(s: string | undefined): Set<string> {
  return new Set((s ?? "").split(",").map((x) => x.trim()).filter(Boolean));
}

// ── 링크 글(GeekNews·Hacker News 식) 2026-11-15 ─────────────────────

const TRACKING_PARAM = /^(utm_[a-z]+|fbclid|gclid|dclid|mc_[a-z]+|igshid|ref_src|si)$/i;

export type UrlCheck = { ok: true; url: string; domain: string } | { ok: false; error: string };

/** 링크 글 주소를 검사하고 정규화한다: http(s)만, 계정정보·내부 주소 금지, 추적 파라미터와 #조각 제거. */
export function checkSubmitUrl(raw: unknown): UrlCheck {
  if (typeof raw !== "string" || !raw.trim()) return { ok: false, error: "링크 주소를 입력해 주세요." };
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return { ok: false, error: "링크 주소가 올바르지 않아요. https:// 로 시작하는 주소를 넣어 주세요." };
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return { ok: false, error: "http(s) 주소만 올릴 수 있어요." };
  if (u.username || u.password) return { ok: false, error: "계정 정보가 들어간 주소는 올릴 수 없어요." };
  const host = u.hostname.toLowerCase();
  if (!host.includes(".") || /^[\d.]+$/.test(host) || host.startsWith("[") || /(^|\.)(localhost|local|internal)$/.test(host))
    return { ok: false, error: "공개된 웹 주소만 올릴 수 있어요." };
  u.hash = "";
  for (const k of [...u.searchParams.keys()]) if (TRACKING_PARAM.test(k)) u.searchParams.delete(k);
  const url = u.toString();
  if (url.length > LIMITS.urlMax) return { ok: false, error: `주소가 너무 길어요(${LIMITS.urlMax}자 이내).` };
  return { ok: true, url, domain: host.replace(/^www\./, "") };
}

/**
 * 인기순 점수. Hacker News 와 같은 꼴: 추천이 많을수록 오르고, 시간이 지나면 내려간다.
 * 추천 0 인 새 글도 한동안 위에 보이도록 +1 을 준다. 댓글은 약하게만 반영한다.
 */
export function hotScore(score: number, comments: number, createdAt: number, now: number): number {
  const hours = Math.max(0, now - createdAt) / 3_600_000;
  return (Math.max(score, 0) + 1 + Math.min(comments, 50) * 0.2) / Math.pow(hours + 2, 1.8);
}

export function rankHot<T extends { score: number; comment_count: number; created_at: number }>(rows: T[], now: number): T[] {
  return rows
    .map((r) => ({ r, h: hotScore(r.score, r.comment_count, r.created_at, now) }))
    .sort((a, b) => b.h - a.h || b.r.created_at - a.r.created_at)
    .map((x) => x.r);
}
