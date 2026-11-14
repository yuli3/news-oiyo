// 2026-11-14: news.oiyo.net/mcp — 상황판 아이디어 news-signal-mcp 2단계. CHOSEUN "전부 진행".
// 상태 없는 MCP(Streamable HTTP, JSON 응답). 도구 둘: get_daily_brief, search_news.
// 저작권: 제목·짧은 설명·출처 도메인·OIYO 일일판 링크만 낸다. 원문 본문은 내보내지 않는다.
// 데이터는 같은 배포의 /search-index.json(빌드 산출물) 하나. SDK 없이 JSON-RPC 만 직접 다룬다.
import type { SearchEntry, SearchHit } from "../src/lib/search";

export const SITE = "https://news.oiyo.net";
export const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"] as const;
export const SERVER_INFO = { name: "oiyo-news", title: "OIYO News (Korean tech & market briefs)", version: "1.0.0" };
const MAX_LIMIT = 50;
const UTM = "utm_source=mcp&utm_medium=news-mcp&utm_campaign=news-signal";

export type Search = (entries: readonly SearchEntry[], q: string, limit: number) => SearchHit[];
export interface Deps { loadEntries: () => Promise<SearchEntry[]>; search: Search }

type Json = Record<string, unknown>;
interface Rpc { jsonrpc?: string; id?: string | number | null; method?: string; params?: Json }

export const TOOLS = [
  {
    name: "get_daily_brief",
    title: "Get daily brief",
    description: "List the stories in OIYO's Korean daily tech/AI/market brief for one date (YYYY-MM-DD, KST). Omit date for the latest edition. Returns titles, one-line Korean summaries, source domains and links to the OIYO brief.",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$", description: "Edition date YYYY-MM-DD. Omit for the latest." },
        limit: { type: "integer", minimum: 1, maximum: MAX_LIMIT, description: "Max stories (default 20)." },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "search_news",
    title: "Search news",
    description: "Search recent OIYO news briefs by keyword (Korean or English; Korean initial consonants like ㅅㅅㅈㅈ also work). Every word must match. Title matches rank first, then newer dates.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 1, maxLength: 100, description: "Keywords." },
        limit: { type: "integer", minimum: 1, maximum: MAX_LIMIT, description: "Max results (default 10)." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
] as const;

export function storyLink(id: string, date: string): string {
  return `${SITE}/${date}/?${UTM}#${id}`;
}

function story(e: { id: string; title: string; summary: string; date: string; source: string }) {
  return { title: e.title, summary: e.summary, date: e.date, source: e.source, link: storyLink(e.id, e.date) };
}

function clampLimit(v: unknown, d: number): number | null {
  if (v === undefined) return d;
  return Number.isInteger(v) && (v as number) >= 1 && (v as number) <= MAX_LIMIT ? (v as number) : null;
}

const ok = (id: Rpc["id"], result: unknown) => ({ jsonrpc: "2.0", id: id ?? null, result });
const err = (id: Rpc["id"], code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

function toolResult(data: Json, isError = false) {
  return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data, isError };
}

export async function callTool(name: string, args: Json, deps: Deps) {
  const keys = Object.keys(args);
  if (name === "get_daily_brief") {
    if (keys.some((k) => k !== "date" && k !== "limit")) return toolResult({ error: "unknown argument" }, true);
    const limit = clampLimit(args.limit, 20);
    const date = args.date;
    if (limit === null || (date !== undefined && (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))))
      return toolResult({ error: "date must be YYYY-MM-DD and limit 1-50" }, true);
    const entries = await deps.loadEntries();
    const dates = [...new Set(entries.map((e) => e[3]))].sort().reverse();
    const target = (date as string | undefined) ?? dates[0];
    const day = entries.filter((e) => e[3] === target);
    if (!day.length) return toolResult({ error: `no edition for ${target}`, availableDates: dates.slice(0, 14) }, true);
    return toolResult({
      date: target, total: day.length,
      edition: `${SITE}/${target}/?${UTM}`,
      stories: day.slice(0, limit).map(([id, title, summary, d, source]) => story({ id, title, summary, date: d, source })),
      note: "Summaries are OIYO's one-line descriptions; open the link for the full Korean brief and the original source.",
    });
  }
  if (name === "search_news") {
    if (keys.some((k) => k !== "query" && k !== "limit")) return toolResult({ error: "unknown argument" }, true);
    const limit = clampLimit(args.limit, 10);
    const q = args.query;
    if (limit === null || typeof q !== "string" || !q.trim() || q.length > 100)
      return toolResult({ error: "query 1-100 chars and limit 1-50 required" }, true);
    const hits = deps.search(await deps.loadEntries(), q, limit);
    return toolResult({ query: q, count: hits.length, results: hits.map(story) });
  }
  return null;
}

/** 한 JSON-RPC 메시지를 처리한다. 알림(id 없음)이면 null. */
export async function handleRpc(msg: Rpc, deps: Deps): Promise<Json | null> {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") return err(msg?.id, -32600, "Invalid Request");
  const isNotification = msg.id === undefined;
  if (isNotification) return null;
  const p = msg.params ?? {};
  switch (msg.method) {
    case "initialize": {
      const asked = typeof p.protocolVersion === "string" ? p.protocolVersion : "";
      const protocolVersion = (PROTOCOL_VERSIONS as readonly string[]).includes(asked) ? asked : PROTOCOL_VERSIONS[0];
      return ok(msg.id, {
        protocolVersion, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO,
        instructions: "Korean daily tech/AI/market news briefs from news.oiyo.net. Cite the returned link when you use a story.",
      });
    }
    case "ping": return ok(msg.id, {});
    case "tools/list": return ok(msg.id, { tools: TOOLS });
    case "tools/call": {
      const name = typeof p.name === "string" ? p.name : "";
      const args = (p.arguments && typeof p.arguments === "object" ? p.arguments : {}) as Json;
      const res = await callTool(name, args, deps);
      return res ? ok(msg.id, res) : err(msg.id, -32602, `Unknown tool: ${name}`);
    }
    default: return err(msg.id, -32601, "Method not found");
  }
}
