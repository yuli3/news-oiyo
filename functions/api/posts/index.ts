// GET /api/posts?sort=new|top&category=free|question|share&page=1 — 커뮤니티 글 목록(20개씩)
// POST /api/posts {category, title, body, turnstileToken?}
import { gate, writeGate } from "../../../server/community";
import { db, disabled, fail, json, newId, readJson } from "../../../server/http";
import { LIMITS, POST_CATEGORIES, checkBody, checkTitle } from "../../../server/rules";
import type { Handler } from "../../../server/types";

const PAGE = 20;

export const onRequestGet: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  const q = new URL(request.url).searchParams;
  const sort = q.get("sort") === "top" ? "top" : "new";
  const category = q.get("category");
  const page = Math.min(Math.max(parseInt(q.get("page") ?? "1", 10) || 1, 1), 100);
  const byCat = category && (POST_CATEGORIES as readonly string[]).includes(category);
  const order = sort === "top" ? "p.score DESC, p.created_at DESC" : "p.created_at DESC";
  const stmt = d.prepare(
    `SELECT p.id, p.category, p.title, p.score, p.comment_count, p.created_at, u.nickname
       FROM posts p LEFT JOIN users u ON u.id = p.user_id
      WHERE p.deleted = 0 AND p.hidden = 0 ${byCat ? "AND p.category = ?" : ""}
      ORDER BY ${order} LIMIT ? OFFSET ?`,
  );
  const args: unknown[] = byCat ? [category, PAGE + 1, (page - 1) * PAGE] : [PAGE + 1, (page - 1) * PAGE];
  const { results } = await stmt.bind(...args).all<{ id: string; category: string; title: string; score: number; comment_count: number; created_at: number; nickname: string | null }>();
  return json({
    page,
    hasMore: results.length > PAGE,
    posts: results.slice(0, PAGE).map((r) => ({
      id: r.id, category: r.category, title: r.title, score: r.score, comments: r.comment_count, createdAt: r.created_at, author: r.nickname ?? "탈퇴한 사용자",
    })),
  });
};

export const onRequestPost: Handler = async ({ request, env }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  const body = await readJson(request, 32_000);
  if (!body) return fail(400, "잘못된 요청이에요.");
  const category = typeof body.category === "string" && (POST_CATEGORIES as readonly string[]).includes(body.category) ? body.category : "free";
  const title = checkTitle(body.title);
  if (!title.ok) return fail(400, title.error);
  const text = checkBody(body.body, LIMITS.postBodyMax, { accountAgeMs: Date.now() - u.created_at });
  if (!text.ok) return fail(400, text.error);
  const blocked = await writeGate(request, env, d, u, "post", body.turnstileToken);
  if (blocked) return blocked;
  const id = newId();
  await d
    .prepare("INSERT INTO posts (id, user_id, category, title, body, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(id, u.id, category, title.value, text.value, Date.now())
    .run();
  return json({ id }, 201);
};
