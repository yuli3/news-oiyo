// news.oiyo.net/mcp — 상태 없는 MCP 엔드포인트(Streamable HTTP, JSON 응답). 로직은 server/news-mcp.ts.
import { handleRpc } from "../server/news-mcp";
import { searchEntries, type SearchEntry } from "../src/lib/search";

interface Ctx { request: Request; env: { ASSETS?: { fetch: (r: Request | string) => Promise<Response> } } }

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
};

export const onRequestOptions = () => new Response(null, { status: 204, headers: HEADERS });

// GET 은 SSE 스트림을 열지 않는다(상태 없음). 사람이 열면 안내만.
export const onRequestGet = () =>
  new Response(JSON.stringify({ name: "oiyo-news", transport: "streamable-http", post: "/mcp", tools: ["get_daily_brief", "search_news"] }), { status: 405, headers: { ...HEADERS, Allow: "POST, OPTIONS" } });

export const onRequestPost = async ({ request, env }: Ctx) => {
  let body: unknown;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }), { status: 400, headers: HEADERS });
  }
  let cache: SearchEntry[] | null = null;
  const deps = {
    search: searchEntries,
    loadEntries: async () => {
      if (cache) return cache;
      const url = new URL("/search-index.json", request.url);
      const res = env.ASSETS ? await env.ASSETS.fetch(url.toString()) : await fetch(url);
      cache = ((await res.json()) as { entries: SearchEntry[] }).entries;
      return cache;
    },
  };
  const batch = Array.isArray(body);
  const msgs = (batch ? body : [body]) as Parameters<typeof handleRpc>[0][];
  const out = (await Promise.all(msgs.map((m) => handleRpc(m, deps)))).filter((r) => r !== null);
  if (!out.length) return new Response(null, { status: 202, headers: HEADERS });
  return new Response(JSON.stringify(batch ? out : out[0]), { headers: HEADERS });
};
