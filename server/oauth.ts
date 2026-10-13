// Google·카카오·GitHub 로그인. 세 곳 모두 "이 사람이 누구인지"를 가리키는 고유 ID 만 받는다.
// 이메일·이름·사진 동의 항목을 요청하지 않으므로 카카오도 비즈 앱 전환이 필요 없다.
import type { Env } from "./types";

export const OAUTH_COOKIE = "__Host-news_oauth";

export type ProviderId = "google" | "kakao" | "github";

interface Provider {
  label: string;
  authorize: string;
  scope: string;
  clientId(env: Env): string | undefined;
  clientSecret(env: Env): string | undefined;
  /** code 를 받아 제공자 쪽 사용자 고유 ID 를 돌려준다. */
  exchange(env: Env, code: string, redirectUri: string): Promise<string | null>;
}

function form(data: Record<string, string | undefined>): URLSearchParams {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(data)) if (v) p.set(k, v);
  return p;
}

function jwtSub(idToken: string): string | null {
  const part = idToken.split(".")[1];
  if (!part) return null;
  try {
    const payload = JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export const PROVIDERS: Record<ProviderId, Provider> = {
  google: {
    label: "Google",
    authorize: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid",
    clientId: (e) => e.GOOGLE_CLIENT_ID,
    clientSecret: (e) => e.GOOGLE_CLIENT_SECRET,
    async exchange(env, code, redirectUri) {
      const r = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form({ code, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET, redirect_uri: redirectUri, grant_type: "authorization_code" }),
      });
      if (!r.ok) return null;
      // id_token 은 TLS 로 구글 토큰 엔드포인트에서 직접 받았으므로 서명 검증 없이 sub 를 읽어도 된다(OIDC Core 3.1.3.7).
      const data = (await r.json()) as { id_token?: string };
      return data.id_token ? jwtSub(data.id_token) : null;
    },
  },
  kakao: {
    label: "카카오",
    authorize: "https://kauth.kakao.com/oauth/authorize",
    scope: "",
    clientId: (e) => e.KAKAO_CLIENT_ID,
    clientSecret: (e) => e.KAKAO_CLIENT_SECRET,
    async exchange(env, code, redirectUri) {
      const r = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
        body: form({ grant_type: "authorization_code", client_id: env.KAKAO_CLIENT_ID, client_secret: env.KAKAO_CLIENT_SECRET, redirect_uri: redirectUri, code }),
      });
      if (!r.ok) return null;
      const { access_token } = (await r.json()) as { access_token?: string };
      if (!access_token) return null;
      const me = await fetch("https://kapi.kakao.com/v2/user/me", { headers: { Authorization: `Bearer ${access_token}` } });
      if (!me.ok) return null;
      const { id } = (await me.json()) as { id?: number };
      return id != null ? String(id) : null;
    },
  },
  github: {
    label: "GitHub",
    authorize: "https://github.com/login/oauth/authorize",
    scope: "",
    clientId: (e) => e.GITHUB_CLIENT_ID,
    clientSecret: (e) => e.GITHUB_CLIENT_SECRET,
    async exchange(env, code, redirectUri) {
      const r = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: form({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: redirectUri }),
      });
      if (!r.ok) return null;
      const { access_token } = (await r.json()) as { access_token?: string };
      if (!access_token) return null;
      const me = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}`, Accept: "application/vnd.github+json", "User-Agent": "news.oiyo.net" },
      });
      if (!me.ok) return null;
      const { id } = (await me.json()) as { id?: number };
      return id != null ? String(id) : null;
    },
  },
};

export function isProvider(s: string): s is ProviderId {
  return s === "google" || s === "kakao" || s === "github";
}

export function enabledProviders(env: Env): { id: ProviderId; label: string }[] {
  return (Object.keys(PROVIDERS) as ProviderId[])
    .filter((id) => PROVIDERS[id].clientId(env) && PROVIDERS[id].clientSecret(env))
    .map((id) => ({ id, label: PROVIDERS[id].label }));
}

/** 로그인 후 돌아갈 주소. 같은 사이트 경로만 받는다. */
export function safeReturnTo(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\") || raw.length > 300) return "/";
  return raw;
}
