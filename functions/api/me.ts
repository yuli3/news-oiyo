// GET 내 정보 · PATCH 닉네임 바꾸기 · DELETE 회원 탈퇴(계정·세션·추천·신고 삭제, 쓴 글은 "탈퇴한 사용자"로 남김).
import { db, disabled, fail, json, readJson, sameOrigin } from "../../server/http";
import { checkNickname } from "../../server/rules";
import { currentUser, endSession, publicUser } from "../../server/session";
import type { Handler } from "../../server/types";

export const onRequestGet: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  const u = await currentUser(request, d);
  return json({ user: u ? publicUser(u) : null });
};

export const onRequestPatch: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  if (!sameOrigin(request)) return fail(403, "잘못된 요청이에요.");
  const u = await currentUser(request, d);
  if (!u) return fail(401, "로그인이 필요해요.");
  const body = await readJson(request);
  const nick = checkNickname(body?.nickname);
  if (!nick.ok) return fail(400, nick.error);
  const taken = await d.prepare("SELECT 1 FROM users WHERE nickname = ? AND id != ?").bind(nick.value, u.id).first();
  if (taken) return fail(409, "이미 누가 쓰고 있는 닉네임이에요.");
  await d.prepare("UPDATE users SET nickname = ? WHERE id = ?").bind(nick.value, u.id).run();
  return json({ user: publicUser({ ...u, nickname: nick.value }) });
};

export const onRequestDelete: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  if (!sameOrigin(request)) return fail(403, "잘못된 요청이에요.");
  const u = await currentUser(request, d);
  if (!u) return fail(401, "로그인이 필요해요.");
  const clear = await endSession(request, d);
  // 추천 점수는 지운 추천만큼 되돌린다.
  await d.batch([
    d.prepare("UPDATE comments SET score = score - 1 WHERE id IN (SELECT target_id FROM votes WHERE user_id = ? AND target_type = 'comment')").bind(u.id),
    d.prepare("UPDATE posts SET score = score - 1 WHERE id IN (SELECT target_id FROM votes WHERE user_id = ? AND target_type = 'post')").bind(u.id),
    d.prepare("DELETE FROM votes WHERE user_id = ?").bind(u.id),
    d.prepare("DELETE FROM reports WHERE user_id = ?").bind(u.id),
    d.prepare("DELETE FROM sessions WHERE user_id = ?").bind(u.id),
    d.prepare("UPDATE comments SET user_id = NULL WHERE user_id = ?").bind(u.id),
    d.prepare("UPDATE posts SET user_id = NULL WHERE user_id = ?").bind(u.id),
    d.prepare("DELETE FROM users WHERE id = ?").bind(u.id),
  ]);
  return json({ ok: true }, 200, { "Set-Cookie": clear });
};
