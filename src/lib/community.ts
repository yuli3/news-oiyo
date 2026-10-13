// 브라우저 쪽 커뮤니티 도우미. 서버는 functions/api/*, 규칙은 server/rules.ts.
// 화면에 사용자 글을 넣을 때는 항상 textContent 로 넣는다(innerHTML 금지).

export interface Provider { id: string; label: string }
export interface Config { enabled: boolean; providers?: Provider[]; turnstileSiteKey?: string | null }
export interface Me { id: string; nickname: string; provider: string; admin: boolean; createdAt: number }
export interface Comment {
  id: string; parentId: string | null; body: string | null; state: "visible" | "hidden" | "deleted";
  score: number; createdAt: number; author: string | null; mine: boolean; voted: boolean;
}
export interface PostSummary { id: string; category: string; title: string; score: number; comments: number; createdAt: number; author: string }
export interface Post extends PostSummary { body: string; hidden: boolean; mine: boolean; voted: boolean }

export const CATEGORY_LABEL: Record<string, string> = { free: "자유", question: "질문", share: "정보 공유" };
export const REPORT_LABEL: [string, string][] = [
  ["spam", "광고·스팸"], ["abuse", "욕설·괴롭힘"], ["illegal", "불법 정보"], ["privacy", "개인정보 노출"], ["other", "기타"],
];

let configPromise: Promise<Config> | null = null;
export function getConfig(): Promise<Config> {
  configPromise ??= fetch("/api/config", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : { enabled: false }))
    .catch(() => ({ enabled: false }));
  return configPromise;
}

let mePromise: Promise<Me | null> | null = null;
export function getMe(refresh = false): Promise<Me | null> {
  if (refresh) mePromise = null;
  mePromise ??= getConfig().then((c) =>
    c.enabled
      ? fetch("/api/me", { credentials: "same-origin" }).then((r) => (r.ok ? r.json() : { user: null })).then((d) => d.user ?? null).catch(() => null)
      : null,
  );
  return mePromise;
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public data: Record<string, unknown>) { super(message); }
}

export async function api<T = Record<string, unknown>>(method: string, path: string, body?: unknown): Promise<T> {
  const r = await fetch(path, {
    method,
    credentials: "same-origin",
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new ApiError(typeof data.error === "string" ? data.error : "잠시 뒤에 다시 시도해 주세요.", r.status, data);
  return data as T;
}

export function loginHref(providerId: string): string {
  return `/api/auth/${providerId}/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`;
}

export function timeAgo(ms: number): string {
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 60) return "방금";
  if (s < 3600) return `${Math.floor(s / 60)}분 전`;
  if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}일 전`;
  return new Date(ms).toLocaleDateString("ko-KR");
}

/** 작은 DOM 도우미. 텍스트는 textContent 로만 들어간다. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<Record<string, string>> = {},
  ...children: (Node | string | null | false | undefined)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) if (c) node.append(c);
  return node;
}

// ── Turnstile(설정돼 있을 때만) ─────────────────────────────
interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  getResponse(id: string): string | undefined;
  reset(id: string): void;
}
let turnstileLoad: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  turnstileLoad ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve((window as unknown as { turnstile: TurnstileApi }).turnstile);
    s.onerror = reject;
    document.head.append(s);
  });
  return turnstileLoad;
}

/** 폼 안에 Turnstile 위젯을 붙이고, 제출할 때 토큰을 꺼내는 함수를 돌려준다. */
export function attachTurnstile(slot: HTMLElement): { token(): string | undefined; reset(): void } {
  let api: TurnstileApi | null = null;
  let id: string | null = null;
  getConfig().then(async (c) => {
    if (!c.turnstileSiteKey) return;
    api = await loadTurnstile();
    id = api.render(slot, { sitekey: c.turnstileSiteKey, language: "ko", size: "flexible", appearance: "interaction-only" });
  }).catch(() => {});
  return {
    token: () => (api && id ? api.getResponse(id) : undefined),
    reset: () => { if (api && id) api.reset(id); },
  };
}

/** 커뮤니티가 켜졌을 때만 data-community-only 요소를 보여 준다(헤더 링크 등). */
export function revealCommunityLinks(): void {
  getConfig().then((c) => {
    if (!c.enabled) return;
    for (const n of document.querySelectorAll<HTMLElement>("[data-community-only]")) n.hidden = false;
    getMe().then((me) => {
      for (const n of document.querySelectorAll<HTMLElement>("[data-account-link]")) n.textContent = me ? me.nickname : "로그인";
    });
  });
}
