/** Home is a two-desk preview, not the first 30 records; keep the complete archive on /page/N/ (2026-10-15). */
export function pageHref(pageIndex0: number): string {
  return `/page/${Math.max(0, pageIndex0) + 1}/`;
}

export type PagerToken = { kind: "page"; index0: number } | { kind: "ellipsis" };

/** Compact window: 1 2 3 … N  (always includes first, last, and neighbors of current). */
export function pagerTokens(current0: number, total: number, radius = 1): PagerToken[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({ kind: "page", index0: i }));
  }
  const want = new Set<number>([0, total - 1]);
  for (let i = current0 - radius; i <= current0 + radius; i++) {
    if (i >= 0 && i < total) want.add(i);
  }
  if (current0 <= 2) {
    want.add(1);
    want.add(2);
  }
  if (current0 >= total - 3) {
    want.add(total - 3);
    want.add(total - 2);
  }
  const sorted = [...want].sort((a, b) => a - b);
  const tokens: PagerToken[] = [];
  let prev = -1;
  for (const index0 of sorted) {
    if (index0 - prev > 1) tokens.push({ kind: "ellipsis" });
    tokens.push({ kind: "page", index0 });
    prev = index0;
  }
  return tokens;
}
