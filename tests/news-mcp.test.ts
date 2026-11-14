import assert from "node:assert/strict";
import { test } from "node:test";
import { handleRpc, storyLink, TOOLS } from "../server/news-mcp.ts";
import { searchEntries, type SearchEntry } from "../src/lib/search.ts";

const entries: SearchEntry[] = [
  ["a", "Claude 서비스 장애", "상태 페이지 이력", "2026-11-14", "status.claude.com"],
  ["b", "삼성전자 실적", "반도체 이익 증가", "2026-11-13", "hankyung.com"],
  ["c", "Show HN: tiny search", "작은 검색", "2026-11-14", "news.ycombinator.com"],
];
const deps = { loadEntries: async () => entries, search: searchEntries };
const call = (name: string, args: object) => handleRpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }, deps);

test("initialize 와 tools/list", async () => {
  const r = (await handleRpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26" } }, deps)) as any;
  assert.equal(r.result.protocolVersion, "2025-03-26");
  assert.equal(r.result.serverInfo.name, "oiyo-news");
  const l = (await handleRpc({ jsonrpc: "2.0", id: 2, method: "tools/list" }, deps)) as any;
  assert.deepEqual(l.result.tools.map((t: any) => t.name), TOOLS.map((t) => t.name));
  assert.equal(await handleRpc({ jsonrpc: "2.0", method: "notifications/initialized" }, deps), null);
});

test("get_daily_brief: 날짜 없으면 최신판, 링크에 UTM", async () => {
  const r = (await call("get_daily_brief", {})) as any;
  const s = r.result.structuredContent;
  assert.equal(s.date, "2026-11-14");
  assert.equal(s.total, 2);
  assert.equal(s.stories[0].link, storyLink("a", "2026-11-14"));
  assert.ok(s.stories[0].link.includes("utm_source=mcp"));
  const miss = (await call("get_daily_brief", { date: "2020-01-01" })) as any;
  assert.equal(miss.result.isError, true);
  const bad = (await call("get_daily_brief", { date: "어제" })) as any;
  assert.equal(bad.result.isError, true);
});

test("search_news 와 잘못된 입력", async () => {
  const r = (await call("search_news", { query: "반도체" })) as any;
  assert.deepEqual(r.result.structuredContent.results.map((x: any) => x.title), ["삼성전자 실적"]);
  assert.equal(((await call("search_news", { query: "" })) as any).result.isError, true);
  assert.equal(((await call("search_news", { query: "x", limit: 999 })) as any).result.isError, true);
  assert.equal(((await call("nope", {})) as any).error.code, -32602);
  assert.equal(((await handleRpc({ jsonrpc: "2.0", id: 3, method: "x" }, deps)) as any).error.code, -32601);
});

test("server.json 버전은 SERVER_INFO 와 같다", async () => {
  const { readFileSync } = await import("node:fs");
  const { SERVER_INFO } = await import("../server/news-mcp.ts");
  const s = JSON.parse(readFileSync(new URL("../server.json", import.meta.url), "utf8"));
  assert.equal(s.version, SERVER_INFO.version);
  assert.ok(s.description.length <= 100);
});
