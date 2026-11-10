// 2026-11-10 세운 결정(클리앙 실버블렛스톡 차용): '지난번 방문 뒤 새 소식' 표시.
// 방문 시각은 이 브라우저 localStorage 에만 둔다. 서버로 보내지 않는다(saved.ts 와 같은 원칙).

export const LAST_VISIT_KEY = "oiyo-news:lastVisit:v1";
export const SESSION_BASELINE_KEY = "oiyo-news:visitBaseline:v1";

interface KV { getItem(k: string): string | null; setItem(k: string, v: string): void }

/**
 * 이번 방문의 기준 시각(ms). 탭 세션의 첫 페이지에서 직전 방문 시각을 기준으로 잡고,
 * 같은 세션의 다른 페이지에서도 같은 기준을 쓴다. 첫 방문이면 null(아무것도 '새'로 표시하지 않는다).
 */
export function visitBaseline(local: KV, session: KV, now: number): number | null {
  try {
    const kept = session.getItem(SESSION_BASELINE_KEY);
    if (kept !== null) return kept === "" ? null : Number(kept);
    const prev = Number(local.getItem(LAST_VISIT_KEY));
    const baseline = Number.isFinite(prev) && prev > 0 && prev < now ? prev : null;
    session.setItem(SESSION_BASELINE_KEY, baseline === null ? "" : String(baseline));
    local.setItem(LAST_VISIT_KEY, String(now));
    return baseline;
  } catch {
    return null; // 저장소 차단(사생활 보호 모드 등)
  }
}

/** 기준 시각 뒤에 들어온 항목 수. 시각은 ISO 문자열 또는 ms. */
export function countNewer(stamps: readonly (string | number)[], baseline: number | null): number {
  if (baseline === null) return 0;
  let n = 0;
  for (const s of stamps) {
    const t = typeof s === "number" ? s : Date.parse(s);
    if (Number.isFinite(t) && t > baseline) n += 1;
  }
  return n;
}
