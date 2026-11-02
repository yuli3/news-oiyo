import { LIMITS, defaultNickname, parseAdminAccounts } from "./rules";
import { base64url, cookie, getCookie, newId, sha256 } from "./http";
import type { D1Database, Env } from "./types";

export const SESSION_COOKIE = "__Host-news_sess";

export interface User {
  id: string;
  provider: string;
  nickname: string;
  role: "user" | "admin";
  banned: number;
  created_at: number;
}

export async function currentUser(req: Request, db: D1Database): Promise<User | null> {
  const token = getCookie(req, SESSION_COOKIE);
  if (!token || token.length > 100) return null;
  const row = await db
    .prepare(
      `SELECT u.id, u.provider, u.nickname, u.role, u.banned, u.created_at, s.expires_at
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.token_hash = ?`,
    )
    .bind(await sha256(token))
    .first<User & { expires_at: number }>();
  if (!row || row.expires_at < Date.now()) return null;
  const { expires_at: _e, ...user } = row;
  return user;
}

export async function startSession(db: D1Database, userId: string): Promise<string> {
  const raw = new Uint8Array(32);
  crypto.getRandomValues(raw);
  const token = base64url(raw);
  const now = Date.now();
  await db
    .prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256(token), userId, now, now + LIMITS.sessionMs)
    .run();
  // 만료된 세션 청소(가볍게, 로그인 때만).
  await db.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(now).run();
  return cookie(SESSION_COOKIE, token, Math.floor(LIMITS.sessionMs / 1000));
}

export async function endSession(req: Request, db: D1Database): Promise<string> {
  const token = getCookie(req, SESSION_COOKIE);
  if (token) await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  return cookie(SESSION_COOKIE, "", 0);
}

/** 제공자 계정으로 사용자를 찾거나 만든다. 받는 정보는 제공자 ID 하나뿐이다. */
export async function upsertUser(env: Env, db: D1Database, provider: string, providerId: string): Promise<User> {
  const found = await db
    .prepare("SELECT id, provider, nickname, role, banned, created_at FROM users WHERE provider = ? AND provider_id = ?")
    .bind(provider, providerId)
    .first<User>();
  if (found) return found;
  const admin = parseAdminAccounts(env.ADMIN_ACCOUNTS).has(`${provider}:${providerId}`);
  const user: User = {
    id: newId(),
    provider,
    nickname: defaultNickname(Math.random()),
    role: admin ? "admin" : "user",
    banned: 0,
    created_at: Date.now(),
  };
  await db
    .prepare("INSERT INTO users (id, provider, provider_id, nickname, role, banned, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)")
    .bind(user.id, provider, providerId, user.nickname, user.role, user.created_at)
    .run();
  return user;
}

export function publicUser(u: User) {
  return { id: u.id, nickname: u.nickname, provider: u.provider, admin: u.role === "admin", createdAt: u.created_at };
}
