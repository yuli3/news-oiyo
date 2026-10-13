import type { D1Database, Env } from "./types";

export const SITE_ORIGIN = "https://news.oiyo.net";

export function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  const h = new Headers(headers);
  h.set("Content-Type", "application/json; charset=utf-8");
  h.set("Cache-Control", "no-store");
  h.set("X-Content-Type-Options", "nosniff");
  return new Response(JSON.stringify(data), { status, headers: h });
}

export function fail(status: number, error: string, extra: Record<string, unknown> = {}): Response {
  return json({ error, ...extra }, status);
}

/** 커뮤니티가 켜져 있으면 DB 를, 아니면 null 을 준다. */
export function db(env: Env): D1Database | null {
  return env.COMMUNITY_ENABLED === "1" && env.DB && env.SESSION_SECRET ? env.DB : null;
}

export const disabled = () => fail(503, "커뮤니티가 아직 열리지 않았어요.", { enabled: false });

/** 상태를 바꾸는 요청은 같은 출처의 JSON 만 받는다(CSRF). 미리보기 배포 주소도 허용. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("Origin");
  if (!origin) return false;
  const self = new URL(req.url).origin;
  return origin === self || origin === SITE_ORIGIN;
}

export async function readJson(req: Request, maxBytes = 16_000): Promise<Record<string, unknown> | null> {
  if (!(req.headers.get("Content-Type") ?? "").includes("application/json")) return null;
  const text = await req.text();
  if (text.length > maxBytes) return null;
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function newId(): string {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return base64url(b);
}

export function base64url(bytes: Uint8Array): string {
  let s = "";
  for (const x of bytes) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return base64url(new Uint8Array(d));
}

export async function hmac(secret: string, msg: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return base64url(new Uint8Array(sig));
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function getCookie(req: Request, name: string): string | null {
  const raw = req.headers.get("Cookie") ?? "";
  for (const part of raw.split(/;\s*/)) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}

export function cookie(name: string, value: string, maxAgeSec: number): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSec}; HttpOnly; Secure; SameSite=Lax`;
}

/** Turnstile 이 설정돼 있으면 토큰을 검증한다. 설정이 없으면 통과. */
export async function verifyTurnstile(env: Env, token: unknown, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) return true;
  if (typeof token !== "string" || !token) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const data = (await r.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}
