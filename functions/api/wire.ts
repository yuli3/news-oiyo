// GET /api/wire — 실시간에 가까운 경제 헤드라인(제목·링크·출처·시각·분류). 로직은 server/econ-wire.ts.
// 엣지 캐시 60초: 방문자가 많아도 발행처 피드는 데이터센터당 1분에 한 번만 읽는다.
// ?tag=rates|fx|... &impact=high &region=KR|US|GLOBAL &limit=1-120
import { filterWire } from "../../server/econ-wire";
import { BASE_HEADERS, loadWire, TTL } from "../../server/wire-edge";

interface Ctx { request: Request; waitUntil?: (p: Promise<unknown>) => void }

export const onRequestGet = async ({ request, waitUntil }: Ctx) => {
  const url = new URL(request.url);
  const wire = await loadWire(url.origin, waitUntil);
  const limitRaw = Number(url.searchParams.get("limit") ?? "");
  const limit = Number.isInteger(limitRaw) && limitRaw >= 1 && limitRaw <= 120 ? limitRaw : undefined;
  const items = filterWire(wire.items, {
    tag: url.searchParams.get("tag") ?? undefined,
    impact: url.searchParams.get("impact") ?? undefined,
    region: url.searchParams.get("region") ?? undefined,
    limit,
  });
  return new Response(JSON.stringify({ ...wire, items, notice: "Headlines and links only. Read the full story at the publisher." }), {
    headers: { ...BASE_HEADERS, "Cache-Control": `public, max-age=30, s-maxage=${TTL}` },
  });
};
