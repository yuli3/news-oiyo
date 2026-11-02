import { gate, toggleVote } from "../../../../server/community";
import { fail, json } from "../../../../server/http";
import { isId } from "../../../../server/rules";
import type { Handler } from "../../../../server/types";

export const onRequestPost: Handler<"id"> = async ({ request, env, params }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  if (!isId(params.id)) return fail(404, "찾을 수 없어요.");
  const r = await toggleVote(g.d, g.u, "comment", params.id);
  return r instanceof Response ? r : json(r);
};
