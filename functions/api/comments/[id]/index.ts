// DELETE /api/comments/<id> — 쓴 사람 또는 관리자만. 내용은 지우고 자리만 남긴다.
import { gate } from "../../../../server/community";
import { fail, json } from "../../../../server/http";
import { isId } from "../../../../server/rules";
import type { Handler } from "../../../../server/types";

export const onRequestDelete: Handler<"id"> = async ({ request, env, params }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  if (!isId(params.id)) return fail(404, "찾을 수 없어요.");
  const c = await d.prepare("SELECT user_id, thread, deleted FROM comments WHERE id = ?").bind(params.id).first<{ user_id: string | null; thread: string; deleted: number }>();
  if (!c || c.deleted) return fail(404, "찾을 수 없어요.");
  if (c.user_id !== u.id && u.role !== "admin") return fail(403, "내가 쓴 댓글만 지울 수 있어요.");
  const stmts = [d.prepare("UPDATE comments SET deleted = 1, body = '' WHERE id = ?").bind(params.id)];
  if (c.thread.startsWith("post:"))
    stmts.push(d.prepare("UPDATE posts SET comment_count = MAX(comment_count - 1, 0) WHERE id = ?").bind(c.thread.slice(5)));
  await d.batch(stmts);
  return json({ ok: true });
};
