// GET /api/posts?sort=hot|new|top&category=free|question|share|show&page=1 — 커뮤니티 글 목록(30개씩)
// POST /api/posts {category, title, url?, body?, turnstileToken?}
// 2026-11-15 GeekNews 식: 링크 글(url, 본문 선택)·인기순(시간 감쇠)·목록에서 바로 추천.
import { gate, myVotes, writeGate } from "../../../server/community";
import { db, disabled, fail, json, newId, readJson } from "../../../server/http";
import { LIMITS, POST_CATEGORIES, checkBody, checkSubmitUrl, checkTitle, rankHot } from "../../../server/rules";
import { currentUser } from "../../../server/session";
import type { Handler } from "../../../server/types";

const PAGE = 30;
type Row = { id: string; category: string; title: string; url: string | null; domain: string | null; score: number; comment_count: number; created_at: number; nickname: string | null };
const COLS = "p.id, p.category, p.title, p.url, p.domain, p.score, p.comment_count, p.created_at, u.nickname";

export const onRequestGet: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  const q = new URL(request.url).searchParams;
  const s = q.get("sort");
  const sort = s === "new" || s === "top" ? s : "hot";
  const category = q.get("category");
  const page = Math.min(Math.max(parseInt(q.get("page") ?? "1", 10) || 1, 1), 100);
  const byCat = !!category && (POST_CATEGORIES as readonly string[]).includes(category);
  const where = `p.deleted = 0 AND p.hidden = 0 ${byCat ? "AND p.category = ?" : ""}`;
  const now = Date.now();
  let rows: Row[];
  let hasMore: boolean;
  if (sort === "hot") {
    // 인기순은 SQL 로 못 매기므로(거듭제곱) 최근 글 후보를 받아 여기서 정렬한다.
    const args: unknown[] = byCat ? [category, now - LIMITS.hotWindowMs, LIMITS.hotCandidates] : [now - LIMITS.hotWindowMs, LIMITS.hotCandidates];
    const { results } = await d
      .prepare(`SELECT ${COLS} FROM posts p LEFT JOIN users u ON u.id = p.user_id WHERE ${where} AND p.created_at > ? ORDER BY p.created_at DESC LIMIT ?`)
      .bind(...args)
      .all<Row>();
    const ranked = rankHot(results, now);
    rows = ranked.slice((page - 1) * PAGE, page * PAGE);
    hasMore = ranked.length > page * PAGE;
  } else {
    const order = sort === "top" ? "p.score DESC, p.created_at DESC" : "p.created_at DESC";
    const args: unknown[] = byCat ? [category, PAGE + 1, (page - 1) * PAGE] : [PAGE + 1, (page - 1) * PAGE];
    const { results } = await d
      .prepare(`SELECT ${COLS} FROM posts p LEFT JOIN users u ON u.id = p.user_id WHERE ${where} ORDER BY ${order} LIMIT ? OFFSET ?`)
      .bind(...args)
      .all<Row>();
    rows = results.slice(0, PAGE);
    hasMore = results.length > PAGE;
  }
  const me = await currentUser(request, d);
  const voted = await myVotes(d, me, "post", rows.map((r) => r.id));
  return json({
    page,
    sort,
    hasMore,
    posts: rows.map((r) => ({
      id: r.id, category: r.category, title: r.title, url: r.url, domain: r.domain, score: r.score, comments: r.comment_count,
      createdAt: r.created_at, author: r.nickname ?? "탈퇴한 사용자", voted: voted.has(r.id),
    })),
  });
};

export const onRequestPost: Handler = async ({ request, env }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const { d, u } = g;
  const body = await readJson(request, 32_000);
  if (!body) return fail(400, "잘못된 요청이에요.");
  const accountAgeMs = Date.now() - u.created_at;
  const title = checkTitle(body.title);
  if (!title.ok) return fail(400, title.error);

  // 링크 글: 주소가 있으면 본문은 선택이다.
  let url: string | null = null;
  let domain: string | null = null;
  if (typeof body.url === "string" && body.url.trim()) {
    const c = checkSubmitUrl(body.url);
    if (!c.ok) return fail(400, c.error);
    if (accountAgeMs < LIMITS.newAccountMs) return fail(400, "가입하고 하루가 지나면 링크를 올릴 수 있어요. 그 전에는 글로 먼저 이야기해 주세요.");
    url = c.url;
    domain = c.domain;
    const dup = await d
      .prepare("SELECT id FROM posts WHERE url = ? AND deleted = 0 AND created_at > ? ORDER BY created_at DESC LIMIT 1")
      .bind(url, Date.now() - LIMITS.duplicateUrlMs)
      .first<{ id: string }>();
    if (dup) return fail(409, "이미 올라온 링크예요. 그 글에서 이야기를 이어 주세요.", { id: dup.id });
  }
  const hasBody = typeof body.body === "string" && body.body.trim() !== "";
  let text = "";
  if (hasBody || !url) {
    const t = checkBody(body.body, LIMITS.postBodyMax, { accountAgeMs });
    if (!t.ok) return fail(400, t.error);
    text = t.value;
  }
  const fallback = url ? "share" : "free";
  const category = typeof body.category === "string" && (POST_CATEGORIES as readonly string[]).includes(body.category) ? body.category : fallback;

  const blocked = await writeGate(request, env, d, u, "post", body.turnstileToken);
  if (blocked) return blocked;
  const id = newId();
  await d
    .prepare("INSERT INTO posts (id, user_id, category, title, body, url, domain, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, u.id, category, title.value, text, url, domain, Date.now())
    .run();
  return json({ id }, 201);
};
