// 2026-11-10 세운 결정(클리앙 실버블렛스톡 차용): Cmd/Ctrl+K 검색 팔레트.
// 색인은 빌드 때 /search-index.json 으로 한 번 만들고, 팔레트를 처음 열 때만 받는다.
// 이 파일은 순수 함수만 둔다(브라우저·Node 테스트 공용).

/** [id, 원제, 한 줄 설명(한국어가 많다), 날짜, 출처] */
export type SearchEntry = [id: string, title: string, summary: string, date: string, source: string];

export interface SearchHit {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  score: number;
}

const CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

/** 한글 음절은 초성으로, 나머지 글자는 그대로 둔다. '오이요 AI' → 'ㅇㅇㅇ AI' */
export function toChoseong(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    out += code >= HANGUL_START && code <= HANGUL_END ? CHOSEONG[Math.floor((code - HANGUL_START) / 588)] : ch;
  }
  return out;
}

/** 공백을 뺀 글자가 모두 초성 자음이면 초성 검색이다. */
export function isChoseongQuery(query: string): boolean {
  const q = query.replace(/\s+/g, "");
  return q.length > 0 && [...q].every((ch) => CHOSEONG.includes(ch));
}

export function normalize(text: string): string {
  return text.toLowerCase().normalize("NFC").replace(/\s+/g, " ").trim();
}

function fieldScore(field: string, terms: string[], choseong: boolean): number {
  const hay = choseong ? toChoseong(normalize(field)).replace(/\s+/g, "") : normalize(field);
  let score = 0;
  for (const t of terms) {
    const at = hay.indexOf(t);
    if (at < 0) return 0;
    score += at === 0 ? 3 : 2;
  }
  return score;
}

/**
 * 모든 검색어가 제목 또는 설명에 들어 있는 항목만 고른다. 제목 일치가 설명 일치보다 위,
 * 점수가 같으면 최신 날짜가 위. 초성 검색은 공백을 무시하고 한 덩어리로 맞춘다.
 */
export function searchEntries(entries: readonly SearchEntry[], query: string, limit = 20): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];
  const choseong = isChoseongQuery(q);
  const terms = choseong ? [q.replace(/\s+/g, "")] : q.split(" ").filter(Boolean);
  const hits: SearchHit[] = [];
  for (const [id, title, summary, date, source] of entries) {
    const t = fieldScore(title, terms, choseong);
    const s = t > 0 ? 0 : fieldScore(summary, terms, choseong);
    const score = t > 0 ? 10 + t : s;
    if (score > 0) hits.push({ id, title, summary, date, source, score });
  }
  hits.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));
  return hits.slice(0, limit);
}

/** 결과는 광고·맥락이 있는 날짜별 일일판의 해당 항목 위치로 보낸다(/item/ 은 noindex·광고 없음). */
export function hitHref(hit: Pick<SearchHit, "id" | "date">): string {
  return `/${hit.date}/#${hit.id}`;
}
