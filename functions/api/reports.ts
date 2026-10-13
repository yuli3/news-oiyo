// POST /api/reports {targetType: comment|post, targetId, reason}
import { gate, report } from "../../server/community";
import { fail, json, readJson } from "../../server/http";
import { REPORT_REASONS, isId } from "../../server/rules";
import type { Handler } from "../../server/types";

export const onRequestPost: Handler = async ({ request, env }) => {
  const g = await gate(request, env);
  if (g instanceof Response) return g;
  const body = await readJson(request);
  const type = body?.targetType;
  const reason = body?.reason;
  if ((type !== "comment" && type !== "post") || !isId(body?.targetId)) return fail(400, "잘못된 요청이에요.");
  if (typeof reason !== "string" || !(REPORT_REASONS as readonly string[]).includes(reason)) return fail(400, "신고 이유를 골라 주세요.");
  const r = await report(g.d, g.u, type, body!.targetId as string, reason);
  return r instanceof Response ? r : json(r);
};
