import { db, disabled, fail, json, sameOrigin } from "../../../server/http";
import { endSession } from "../../../server/session";
import type { Handler } from "../../../server/types";

export const onRequestPost: Handler = async ({ request, env }) => {
  const d = db(env);
  if (!d) return disabled();
  if (!sameOrigin(request)) return fail(403, "잘못된 요청이에요.");
  return json({ ok: true }, 200, { "Set-Cookie": await endSession(request, d) });
};
