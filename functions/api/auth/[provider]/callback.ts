import { cookie, db, disabled, getCookie, hmac, timingSafeEqual } from "../../../../server/http";
import { OAUTH_COOKIE, PROVIDERS, isProvider, safeReturnTo } from "../../../../server/oauth";
import { startSession, upsertUser } from "../../../../server/session";
import type { Handler } from "../../../../server/types";

function back(to: string, setCookies: string[]): Response {
  const headers = new Headers({ Location: to, "Cache-Control": "no-store" });
  for (const c of setCookies) headers.append("Set-Cookie", c);
  return new Response(null, { status: 302, headers });
}

export const onRequestGet: Handler<"provider"> = async ({ request, env, params }) => {
  const d = db(env);
  if (!d) return disabled();
  const id = params.provider;
  const clearState = cookie(OAUTH_COOKIE, "", 0);
  const saved = getCookie(request, OAUTH_COOKIE) ?? "";
  const bar = saved.indexOf("|");
  const savedState = bar > 0 ? saved.slice(0, bar) : "";
  const rawReturn = bar > 0 ? saved.slice(bar + 1) : null;
  const returnTo = safeReturnTo(rawReturn);
  const fail = (why: string) => back(`/account/?login=${why}`, [clearState]);
  if (!isProvider(id)) return fail("provider");

  const url = new URL(request.url);
  const state = url.searchParams.get("state") ?? "";
  const code = url.searchParams.get("code");
  if (url.searchParams.get("error")) return fail("cancelled");
  if (!code || !savedState || !timingSafeEqual(state, savedState)) return fail("state");
  const [nonce, sig] = state.split(".");
  if (!nonce || !sig || !timingSafeEqual(sig, await hmac(env.SESSION_SECRET!, `${id}.${nonce}`))) return fail("state");

  const providerUserId = await PROVIDERS[id].exchange(env, code, `${url.origin}/api/auth/${id}/callback`).catch(() => null);
  if (!providerUserId) return fail("provider");
  const user = await upsertUser(env, d, id, providerUserId);
  if (user.banned) return fail("banned");
  const session = await startSession(d, user.id);
  return back(returnTo, [clearState, session]);
};
