// 댓글·글·추천·신고가 함께 쓰는 DB 동작.
import { LIMITS } from "./rules";
import { db, disabled, fail, sameOrigin, verifyTurnstile } from "./http";
import { currentUser, type User } from "./session";
import type { D1Database, Env } from "./types";

export type Target = "comment" | "post";
const TABLE: Record<Target, string> = { comment: "comments", post: "posts" };

/** 상태를 바꾸는 요청의 공통 관문: 켜짐 · 같은 출처 · 로그인 · 정지 아님. */
export async function gate(request: Request, env: Env): Promise<{ d: D1Database; u: User } | Response> {
  const d = db(env);
  if (!d) return disabled();
  if (!sameOrigin(request)) return fail(403, "잘못된 요청이에요.");
  const u = await currentUser(request, d);
  if (!u) return fail(401, "로그인이 필요해요.");
  if (u.banned) return fail(403, "이용이 제한된 계정이에요.");
  return { d, u };
}

/** 사람이 쓰는 요청(댓글·글)에만: 속도 제한 + Turnstile. */
export async function writeGate(request: Request, env: Env, d: D1Database, u: User, kind: Target, token: unknown): Promise<Response | null> {
  const [table, windowMs, max] =
    kind === "comment"
      ? ["comments", LIMITS.commentWindowMs, LIMITS.commentPerWindow]
      : ["posts", LIMITS.postWindowMs, LIMITS.postPerWindow];
  const row = await d
    .prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE user_id = ? AND created_at > ?`)
    .bind(u.id, Date.now() - windowMs)
    .first<{ n: number }>();
  if ((row?.n ?? 0) >= max) return fail(429, "조금 천천히 써 주세요. 잠시 뒤에 다시 할 수 있어요.");
  if (!(await verifyTurnstile(env, token, request.headers.get("CF-Connecting-IP"))))
    return fail(400, "자동 입력 방지 확인에 실패했어요. 다시 시도해 주세요.", { turnstile: true });
  return null;
}

/** 추천을 켜고 끈다. 자기 글은 추천할 수 없다. */
export async function toggleVote(d: D1Database, u: User, type: Target, id: string): Promise<Response | { voted: boolean; score: number }> {
  const t = TABLE[type];
  const target = await d.prepare(`SELECT user_id, deleted FROM ${t} WHERE id = ?`).bind(id).first<{ user_id: string | null; deleted: number }>();
  if (!target || target.deleted) return fail(404, "찾을 수 없어요.");
  if (target.user_id === u.id) return fail(400, "내가 쓴 글은 추천할 수 없어요.");
  const had = await d.prepare("SELECT 1 FROM votes WHERE target_type = ? AND target_id = ? AND user_id = ?").bind(type, id, u.id).first();
  if (had) {
    await d.batch([
      d.prepare("DELETE FROM votes WHERE target_type = ? AND target_id = ? AND user_id = ?").bind(type, id, u.id),
      d.prepare(`UPDATE ${t} SET score = score - 1 WHERE id = ?`).bind(id),
    ]);
  } else {
    await d.batch([
      d.prepare("INSERT OR IGNORE INTO votes (target_type, target_id, user_id, created_at) VALUES (?, ?, ?, ?)").bind(type, id, u.id, Date.now()),
      d.prepare(`UPDATE ${t} SET score = score + 1 WHERE id = ?`).bind(id),
    ]);
  }
  const s = await d.prepare(`SELECT score FROM ${t} WHERE id = ?`).bind(id).first<{ score: number }>();
  return { voted: !had, score: s?.score ?? 0 };
}

/** 신고. 한 사람이 한 번. 쌓이면 자동으로 가린다. */
export async function report(d: D1Database, u: User, type: Target, id: string, reason: string): Promise<Response | { reported: true }> {
  const t = TABLE[type];
  const target = await d.prepare(`SELECT user_id, deleted FROM ${t} WHERE id = ?`).bind(id).first<{ user_id: string | null; deleted: number }>();
  if (!target || target.deleted) return fail(404, "찾을 수 없어요.");
  if (target.user_id === u.id) return fail(400, "내 글은 신고할 수 없어요.");
  const r = await d
    .prepare("INSERT OR IGNORE INTO reports (target_type, target_id, user_id, reason, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(type, id, u.id, reason, Date.now())
    .run();
  if (r.meta.changes) {
    await d
      .prepare(`UPDATE ${t} SET report_count = report_count + 1, hidden = CASE WHEN report_count + 1 >= ? THEN 1 ELSE hidden END WHERE id = ?`)
      .bind(LIMITS.autoHideReports, id)
      .run();
  }
  return { reported: true };
}

export async function myVotes(d: D1Database, u: User | null, type: Target, ids: string[]): Promise<Set<string>> {
  if (!u || ids.length === 0) return new Set();
  const out = new Set<string>();
  // D1 바인딩 수 제한(100)을 넘지 않게 나눈다.
  for (let i = 0; i < ids.length; i += 90) {
    const chunk = ids.slice(i, i + 90);
    const rows = await d
      .prepare(`SELECT target_id FROM votes WHERE target_type = ? AND user_id = ? AND target_id IN (${chunk.map(() => "?").join(",")})`)
      .bind(type, u.id, ...chunk)
      .all<{ target_id: string }>();
    for (const r of rows.results) out.add(r.target_id);
  }
  return out;
}
