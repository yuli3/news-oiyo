// /api/auth/<google|kakao|github>/login?returnTo=/2026-10-13/
// state 는 쿠키에 두고 서명해서, 콜백에서 같은 브라우저인지 확인한다.
import { cookie, db, disabled, fail, hmac, newId } from "../../../../server/http";
import { OAUTH_COOKIE, PROVIDERS, isProvider, safeReturnTo } from "../../../../server/oauth";
import type { Handler } from "../../../../server/types";

export const onRequestGet: Handler<"provider"> = async ({ request, env, params }) => {
  if (!db(env)) return disabled();
  const id = params.provider;
  if (!isProvider(id)) return fail(404, "지원하지 않는 로그인이에요.");
  const p = PROVIDERS[id];
  const clientId = p.clientId(env);
  if (!clientId || !p.clientSecret(env)) return fail(404, "아직 켜지지 않은 로그인이에요.");
  const url = new URL(request.url);
  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  const nonce = newId();
  const state = `${nonce}.${await hmac(env.SESSION_SECRET!, `${id}.${nonce}`)}`;
  const redirectUri = `${url.origin}/api/auth/${id}/callback`;
  const auth = new URL(p.authorize);
  auth.searchParams.set("client_id", clientId);
  auth.searchParams.set("redirect_uri", redirectUri);
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("state", state);
  if (p.scope) auth.searchParams.set("scope", p.scope);
  const headers = new Headers({ Location: auth.toString(), "Cache-Control": "no-store" });
  headers.append("Set-Cookie", cookie(OAUTH_COOKIE, `${state}|${returnTo}`, 600));
  return new Response(null, { status: 302, headers });
};
