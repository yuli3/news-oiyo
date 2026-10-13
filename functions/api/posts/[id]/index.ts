// GET /api/posts/<id> · DELETE /api/posts/<id>(쓴 사람 또는 관리자)
import { gate, myVotes } from "../../../../server/community";
import { db, disabled, fail, json } from "../../../../server/http";
import { isId } from "../../../../server/rules";
import { currentUser } from "../../../../server/session";
import type { Handler } from "../../../../server/types";

export const onRequestGet: Handler<"id"> = async ({ request, env, params }) => {
  const d = db(env);
  if (!d) return disabled();
  if (!isId(params.id)) return fail(404, "글을 찾을 수 없어요.");
  const me = await currentUser(request, d);
  const p = await d
    .prepare(
      `SELECT p.id, p.category, p.title, p.body, p.score, p.comment_count, p.hidden, p.deleted, p.created_at, p.user_id, u.nickname
         FROM posts p LEFT JOIN users u ON u.id = p.user_id WHERE p.id = ?`,
    )
    .bind(params.id)
    .first<{ id: string; category: string; title: string; body: string; score: number; comment_count: number; hidden: number; deleted: number; created_at: number; user_id: string | null; nickname: string | null }>();
  if (!p || p.deleted) return fail(404, "글을 찾을 수 없어요.");
  const admin = me?.role === "admin";
  if (p.hidden && !admin) return fail(451, "신고가 쌓여 운영자 확인을 기다리는 글이에요.");
  const voted = await myVotes(d, me, "post", [p.id]);
  return json({
    post: {
      id: p.id, category: p.category, title: p.title, body: p.body, score: p.score, comments: p.comment_count,
      createdAt: p.created_at, author: p.nickname ?? "탈퇴한 사용자", hidden: !!p.hidden,
      mine: !!me && p.user_id === me.id, voted: voted.has(p.id),
    },
  });
};

export const onRequestDelete: Handler<"id"> = async ({ request, env, params }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  if (!isId(params.id)) return fail(404, "글을 찾을 수 없어요.");
  const p = await d.prepare("SELECT user_id, deleted FROM posts WHERE id = ?").bind(params.id).first<{ user_id: string | null; deleted: number }>();
  if (!p || p.deleted) return fail(404, "글을 찾을 수 없어요.");
  if (p.user_id !== u.id && u.role !== "admin") return fail(403, "내가 쓴 글만 지울 수 있어요.");
  await d.prepare("UPDATE posts SET deleted = 1, title = '', body = '' WHERE id = ?").bind(params.id).run();
  return json({ ok: true });
};
