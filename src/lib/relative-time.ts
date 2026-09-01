/** Korean relative time for board meta. Older than a week falls back to YYYY-MM-DD. */
export function relativeKo(iso: string | undefined, now = new Date()): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso.slice(0, 10);
  const sec = Math.round((now.getTime() - t) / 1000);
  if (sec < 45) return "방금 전";
  if (sec < 3600) return `${Math.max(1, Math.floor(sec / 60))}분전`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}시간전`;
  if (sec < 86400 * 7) return `${Math.floor(sec / 86400)}일전`;
  return new Date(t).toISOString().slice(0, 10);
}
