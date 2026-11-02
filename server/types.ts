// Cloudflare Pages Functions 에서 쓰는 만큼만 적은 타입.
// @cloudflare/workers-types 를 들이면 DOM lib 와 전역 타입이 겹쳐 astro check 가 깨진다.

export interface D1Result<T> { results: T[]; meta: { changes?: number } }
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result<unknown>>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result<unknown>[]>;
}

export interface Env {
  /** D1 바인딩. 없으면 커뮤니티 전체가 꺼진 것으로 본다(사이트는 giscus 로 돌아감). */
  COMMUNITY_DB?: D1Database;
  /** "1" 일 때만 켠다. D1 이 붙어 있어도 이 값 없이는 공개되지 않는다. */
  COMMUNITY_ENABLED?: string;
  /** 쿠키 서명·OAuth state 서명 키. 32자 이상 임의 문자열. */
  SESSION_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  KAKAO_CLIENT_ID?: string;
  KAKAO_CLIENT_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET?: string;
  /** "google:1234,kakao:5678" — 처음 로그인할 때 admin 역할을 받는 계정. */
  ADMIN_ACCOUNTS?: string;
}

export interface Ctx<P extends string = never> {
  request: Request;
  env: Env;
  params: Record<P, string>;
  waitUntil(p: Promise<unknown>): void;
}
export type Handler<P extends string = never> = (ctx: Ctx<P>) => Promise<Response> | Response;
