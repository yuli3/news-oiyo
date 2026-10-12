// 2026-10-12: '저장'은 이 브라우저 localStorage에만 둔다. 서버로 보내지 않는다.
export const SAVED_KEY = "oiyo-news:saved:v1";
export interface SavedItem { url: string; title: string; source?: string; date?: string; savedAt: string }

export function readSaved(): SavedItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x) => x && typeof x.url === "string" && typeof x.title === "string") : [];
  } catch { return []; }
}
export function writeSaved(items: SavedItem[]): void {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(items.slice(0, 500))); } catch { /* 저장 공간 없음·차단 */ }
}
export function isSaved(url: string): boolean { return readSaved().some((x) => x.url === url); }
export function toggleSaved(item: Omit<SavedItem, "savedAt">): boolean {
  const list = readSaved();
  const i = list.findIndex((x) => x.url === item.url);
  if (i >= 0) { list.splice(i, 1); writeSaved(list); return false; }
  list.unshift({ ...item, savedAt: new Date().toISOString() });
  writeSaved(list);
  return true;
}
