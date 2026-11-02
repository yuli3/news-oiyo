// POST /api/admin/action {targetType: comment|post|user, targetId, action: hide|restore|delete|ban|unban}
import { gate } from "../../../server/community";
import { fail, json, readJson } from "../../../server/http";
import { isId } from "../../../server/rules";
import type { Handler } from "../../../server/types";

export const onRequestPost: Handler = async ({ request, env }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  if (u.role !== "admin") return fail(403, "관리자만 할 수 있어요.");
  const body = await readJson(request);
  const type = body?.targetType;
  const action = body?.action;
  const id = body?.targetId;
  if (!isId(id)) return fail(400, "잘못된 요청이에요.");
  if (type === "user") {
    if (action !== "ban" && action !== "unban") return fail(400, "잘못된 요청이에요.");
    if (id === u.id) return fail(400, "자기 계정은 정지할 수 없어요.");
    const stmts = [d.prepare("UPDATE users SET banned = ? WHERE id = ?").bind(action === "ban" ? 1 : 0, id)];
    if (action === "ban") stmts.push(d.prepare("DELETE FROM sessions WHERE user_id = ?").bind(id));
    await d.batch(stmts);
    return json({ ok: true });
  }
  if (type !== "comment" && type !== "post") return fail(400, "잘못된 요청이에요.");
  const table = type === "comment" ? "comments" : "posts";
  if (action === "hide") await d.prepare(`UPDATE ${table} SET hidden = 1 WHERE id = ?`).bind(id).run();
  else if (action === "restore") await d.prepare(`UPDATE ${table} SET hidden = 0, report_count = 0 WHERE id = ?`).bind(id).run();
  else if (action === "delete") {
    if (type === "comment") {
      const c = await d.prepare("SELECT thread, deleted FROM comments WHERE id = ?").bind(id).first<{ thread: string; deleted: number }>();
      const stmts = [d.prepare("UPDATE comments SET deleted = 1, body = '' WHERE id = ?").bind(id)];
      if (c && !c.deleted && c.thread.startsWith("post:"))
        stmts.push(d.prepare("UPDATE posts SET comment_count = MAX(comment_count - 1, 0) WHERE id = ?").bind(c.thread.slice(5)));
      await d.batch(stmts);
    } else await d.prepare("UPDATE posts SET deleted = 1, title = '', body = '' WHERE id = ?").bind(id).run();
  } else return fail(400, "잘못된 요청이에요.");
  if (action === "restore") await d.prepare("DELETE FROM reports WHERE target_type = ? AND target_id = ?").bind(type, id).run();
  return json({ ok: true });
};
