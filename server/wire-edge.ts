// 와이어를 엣지에서 받아 캐시하는 부분(Pages Function /api/wire 와 /mcp 공용). 순수 로직은 econ-wire.ts.
import { applyKoLines, collectWire, type Wire } from "./econ-wire.ts";
import type { KVNamespace } from "./types";

interface EdgeCache { match(req: Request): Promise<Response | undefined>; put(req: Request, res: Response): Promise<void> }

export const TTL = 60;
const UA = "Mozilla/5.0 (compatible; OIYO-News-Wire/1.0; +https://news.oiyo.net/finance/live/)";

async function fetchFeed(url: string): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5" }, signal: ctrl.signal });
    if (!res.ok) return null;
    const text = await res.text();
    return text.length > 2_000_000 ? text.slice(0, 2_000_000) : text;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function edgeCache(): EdgeCache | null {
  const c = (globalThis as unknown as { caches?: { default?: EdgeCache } }).caches;
  return c?.default ?? null;
}

export const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex",
  "Access-Control-Allow-Origin": "*",
};

/** 필터 없는 전체 와이어(엣지 캐시 사용). MCP 도 이걸 쓴다. */
// 한국어 한 줄은 선택 KV(WIRE_KO) 의 키 하나. 와이어를 새로 만들 때 1회만 읽고 캐시에 같이 넣는다
// (요청마다 KV 를 읽지 않는다). 바인딩이 없거나 읽기가 실패하면 영어 원제만 나간다.
export const KO_KEY = "ko-lines";

async function readKo(kv?: KVNamespace): Promise<unknown> {
  if (!kv) return null;
  try { return await kv.get(KO_KEY, "json"); } catch { return null; }
}

export async function loadWire(origin: string, waitUntil?: (p: Promise<unknown>) => void, ko?: KVNamespace): Promise<Wire> {
  const cache = edgeCache();
  const key = new Request(`${origin}/api/wire?__all=1`);
  if (cache) {
    const hit = await cache.match(key);
    if (hit) return (await hit.json()) as Wire;
  }
  const [raw, lines] = await Promise.all([collectWire(fetchFeed), readKo(ko)]);
  const wire = applyKoLines(raw, lines);
  if (cache) {
    const res = new Response(JSON.stringify(wire), { headers: { ...BASE_HEADERS, "Cache-Control": `public, max-age=${TTL}` } });
    const p = cache.put(key, res);
    if (waitUntil) waitUntil(p); else await p;
  }
  return wire;
}
