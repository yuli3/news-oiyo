// 2026-10-12 (세운 승인, 1단계): 날짜 페이지마다 토론 하나. 댓글은 공개 저장소
// yuli3/oiyo-news-discussions 의 Discussions(Announcements: giscus·관리자만 새 글)에 쌓인다.
// 2026-10-13: 자체 댓글(functions/api)이 켜지기 전까지, 또는 꺼졌을 때의 대체 수단으로 남긴다.
const ATTRS: Record<string, string> = {
  "data-repo": "yuli3/oiyo-news-discussions",
  "data-repo-id": "R_kgDOVF_RCQ",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDOVF_RCc4DIDrM",
  "data-mapping": "specific",
  "data-strict": "1",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-theme": "light",
  "data-lang": "ko",
  "data-loading": "lazy",
};

export function mountGiscus(slot: HTMLElement, term: string): void {
  const s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.async = true;
  s.crossOrigin = "anonymous";
  for (const [k, v] of Object.entries(ATTRS)) s.setAttribute(k, v);
  s.setAttribute("data-term", term);
  slot.replaceChildren(s);
}
