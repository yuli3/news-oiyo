// GET /api/comments?thread=day:2026-10-13 — 댓글 목록(오래된 순, 답글은 한 단계)
// POST /api/comments {thread, body, parentId?, turnstileToken?}
import { gate, myVotes, writeGate } from "../../../server/community";
import { db, disabled, fail, json, newId, readJson } from "../../../server/http";
import { LIMITS, checkBody, isId, isThreadKey } from "../../../server/rules";
import { currentUser } from "../../../server/session";
import type { Handler } from "../../../server/types";

interface Row {
  id: string; parent_id: string | null; body: string; score: number; hidden: number; deleted: number;
  created_at: number; user_id: string | null; nickname: string | null;
}

export const onRequestGet: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  const thread = new URL(request.url).searchParams.get("thread");
  if (!isThreadKey(thread)) return fail(400, "잘못된 주소예요.");
  const me = await currentUser(request, d);
  const { results } = await d
    .prepare(
      `SELECT c.id, c.parent_id, c.body, c.score, c.hidden, c.deleted, c.created_at, c.user_id, u.nickname
         FROM comments c LEFT JOIN users u ON u.id = c.user_id
        WHERE c.thread = ? ORDER BY c.created_at ASC LIMIT 500`,
    )
    .bind(thread)
    .all<Row>();
  const voted = await myVotes(d, me, "comment", results.map((r) => r.id));
  const admin = me?.role === "admin";
  const comments = results
    // 지운 댓글은 답글이 달려 있을 때만 자리를 남긴다.
    .filter((r) => !r.deleted || results.some((x) => x.parent_id === r.id && !x.deleted))
    .map((r) => {
      const masked = r.deleted || (r.hidden && !admin);
      return {
        id: r.id,
        parentId: r.parent_id,
        body: masked ? null : r.body,
        state: r.deleted ? "deleted" : r.hidden ? "hidden" : "visible",
        score: r.score,
        createdAt: r.created_at,
        author: r.deleted ? null : r.nickname ?? "탈퇴한 사용자",
        mine: !!me && r.user_id === me.id,
        voted: voted.has(r.id),
      };
    });
  return json({ thread, comments });
};

export const onRequestPost: Handler = async ({ request, env }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  const body = await readJson(request);
  if (!body) return fail(400, "잘못된 요청이에요.");
  const thread = body.thread;
  if (!isThreadKey(thread)) return fail(400, "잘못된 주소예요.");
  const text = checkBody(body.body, LIMITS.commentMax, { accountAgeMs: Date.now() - u.created_at });
  if (!text.ok) return fail(400, text.error);

  let postId: string | null = null;
  if (thread.startsWith("post:")) {
    postId = thread.slice(5);
    const post = await d.prepare("SELECT deleted FROM posts WHERE id = ?").bind(postId).first<{ deleted: number }>();
    if (!post || post.deleted) return fail(404, "글을 찾을 수 없어요.");
  }
  let parentId: string | null = null;
  if (body.parentId != null) {
    if (!isId(body.parentId)) return fail(400, "잘못된 요청이에요.");
    const parent = await d
      .prepare("SELECT id, parent_id, thread, deleted FROM comments WHERE id = ?")
      .bind(body.parentId)
      .first<{ id: string; parent_id: string | null; thread: string; deleted: number }>();
    if (!parent || parent.thread !== thread || parent.deleted) return fail(404, "답글을 달 댓글을 찾을 수 없어요.");
    parentId = parent.parent_id ?? parent.id; // 답글의 답글은 같은 묶음 끝에 붙인다.
  }

  const blocked = await writeGate(request, env, d, u, "comment", body.turnstileToken);
  if (blocked) return blocked;

  const id = newId();
  const now = Date.now();
  const stmts = [
    d.prepare("INSERT INTO comments (id, thread, user_id, parent_id, body, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, thread, u.id, parentId, text.value, now),
  ];
  if (postId) stmts.push(d.prepare("UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?").bind(postId));
  await d.batch(stmts);
  return json({ comment: { id, parentId, body: text.value, state: "visible", score: 0, createdAt: now, author: u.nickname, mine: true, voted: false } }, 201);
};
