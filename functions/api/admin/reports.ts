// GET /api/admin/reports — 신고가 들어왔거나 숨겨진 글·댓글(관리자만)
import { db, disabled, fail, json } from "../../../server/http";
import { currentUser } from "../../../server/session";
import type { Handler } from "../../../server/types";

export const onRequestGet: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  const u = await currentUser(request, d);
  if (!u || u.role !== "admin") return fail(403, "관리자만 볼 수 있어요.");
  const comments = await d
    .prepare(
      `SELECT c.id, c.thread, c.body, c.report_count, c.hidden, c.created_at, c.user_id, u.nickname, u.banned,
              (SELECT group_concat(reason) FROM reports r WHERE r.target_type = 'comment' AND r.target_id = c.id) AS reasons
         FROM comments c LEFT JOIN users u ON u.id = c.user_id
        WHERE c.deleted = 0 AND (c.report_count > 0 OR c.hidden = 1)
        ORDER BY c.hidden DESC, c.report_count DESC, c.created_at DESC LIMIT 100`,
    )
    .all();
  const posts = await d
    .prepare(
      `SELECT p.id, p.title, p.body, p.report_count, p.hidden, p.created_at, p.user_id, u.nickname, u.banned,
              (SELECT group_concat(reason) FROM reports r WHERE r.target_type = 'post' AND r.target_id = p.id) AS reasons
         FROM posts p LEFT JOIN users u ON u.id = p.user_id
        WHERE p.deleted = 0 AND (p.report_count > 0 OR p.hidden = 1)
        ORDER BY p.hidden DESC, p.report_count DESC, p.created_at DESC LIMIT 100`,
    )
    .all();
  return json({ comments: comments.results, posts: posts.results });
};
