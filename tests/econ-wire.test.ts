import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWire, classify, collectWire, filterWire, normTitle, parseFeed, WIRE_SOURCES, type WireSource } from "../server/econ-wire.ts";
import { handleRpc } from "../server/news-mcp.ts";

const NOW = new Date("2026-11-14T07:00:00Z");
const rss = (items: [string, string, string?][]) =>
  `<?xml version="1.0"?><rss><channel><title>x</title>${items
    .map(([t, l, d]) => `<item><title><![CDATA[${t}]]></title><link>${l}</link>${d ? `<pubDate>${d}</pubDate>` : ""}<description>본문은 쓰지 않는다</description></item>`)
    .join("")}</channel></rss>`;
const src = (id: string, extra: Partial<WireSource> = {}): WireSource => ({ id, name: id, url: `https://example.com/${id}`, region: "KR", maxAgeHours: 24, ...extra });

test("parseFeed: RSS·Atom, 엔티티, http→https, 링크 없는 항목 버림", () => {
  const items = parseFeed(rss([["코스피 2% 급등 &amp; 환율 하락", "http://a.example/1", "Fri, 14 Nov 2026 06:00:00 +0900"], ["링크 없음", ""]]));
  assert.equal(items.length, 1);
  assert.equal(items[0].title, "코스피 2% 급등 & 환율 하락");
  assert.equal(items[0].url, "https://a.example/1");
  assert.equal(items[0].publishedAt, "2026-11-13T21:00:00.000Z");
  const atom = parseFeed(`<feed><entry><title>Fed holds rates</title><link href="https://fed.example/x"/><updated>2026-11-14T05:00:00Z</updated></entry></feed>`);
  assert.deepEqual(atom, [{ title: "Fed holds rates", url: "https://fed.example/x", publishedAt: "2026-11-14T05:00:00.000Z" }]);
  assert.deepEqual(parseFeed(rss([["javascript", "javascript:alert(1)"]])), []);
});

test("classify: 주제·주목", () => {
  assert.deepEqual(classify("한은 기준금리 동결…원·달러 환율 1400원대").tags, ["rates", "fx", "policy"]);
  assert.equal(classify("한은 기준금리 동결").impact, "high");
  assert.equal(classify("Bitcoin ETF inflows rise").tags.includes("crypto"), true);
  assert.equal(classify("서울 아파트 전세 매물 감소").tags[0], "realestate");
  assert.equal(classify("삼성전자 3분기 영업이익 발표").tags.includes("earnings"), true);
  assert.equal(classify("은행나무 길 산책").impact, "normal");
  assert.equal(classify("보도자료", { primary: true }).impact, "normal");
  assert.equal(classify("소비자물가 동향", { primary: true }).impact, "high");
  // 영어 경계: 'shares' 는 증시, 'oilfield' 같은 낱말 안 부분은 원자재가 아니다
  assert.deepEqual(classify("Oilfield services firm").tags, []);
});

test("buildWire: 최신순, 중복 제거, 나이 제한, 출처 상태", () => {
  const a = src("a");
  const b = src("b", { region: "US" });
  const c = src("c");
  const wire = buildWire([
    { source: a, xml: rss([["[속보] 코스피 급락", "https://a.example/1", "2026-11-14T06:00:00Z"], ["옛날 기사", "https://a.example/old", "2026-11-10T00:00:00Z"]]) },
    { source: b, xml: rss([["코스피 급락", "https://b.example/dup", "2026-11-14T06:30:00Z"], ["Fed holds rates", "https://b.example/2", "2026-11-14T06:50:00Z"]]) },
    { source: c, xml: null },
  ], NOW);
  assert.deepEqual(wire.items.map((i) => i.title), ["Fed holds rates", "[속보] 코스피 급락"]);
  assert.equal(wire.items[1].impact, "high");
  assert.equal(wire.items[0].region, "US");
  assert.deepEqual(wire.sources.map((s) => [s.id, s.ok, s.count]), [["a", true, 1], ["b", true, 1], ["c", false, 0]]);
  assert.equal(normTitle("[속보] 코스피, 급락!"), normTitle("코스피 급락"));
});

test("collectWire: 피드 하나가 던져도 나머지는 나간다, filterWire", async () => {
  const sources = [src("ok"), src("boom")];
  const wire = await collectWire(async (url) => {
    if (url.endsWith("boom")) throw new Error("network");
    return rss([["원·달러 환율 급등", "https://ok.example/1", "2026-11-14T06:00:00Z"], ["비트코인 하락", "https://ok.example/2", "2026-11-14T05:00:00Z"]]);
  }, sources, NOW);
  assert.equal(wire.items.length, 2);
  assert.equal(wire.sources[1].ok, false);
  assert.deepEqual(filterWire(wire.items, { tag: "crypto" }).map((i) => i.url), ["https://ok.example/2"]);
  assert.deepEqual(filterWire(wire.items, { impact: "high" }).map((i) => i.url), ["https://ok.example/1"]);
  assert.equal(filterWire(wire.items, { limit: 1 }).length, 1);
});

test("WIRE_SOURCES: https 만, id 중복 없음", () => {
  assert.ok(WIRE_SOURCES.every((s) => s.url.startsWith("https://")));
  assert.equal(new Set(WIRE_SOURCES.map((s) => s.id)).size, WIRE_SOURCES.length);
});

test("MCP get_econ_wire: 필터·검증·링크는 발행처", async () => {
  const wire = buildWire([{ source: src("a"), xml: rss([["한은 기준금리 인하", "https://a.example/r", "2026-11-14T06:00:00Z"], ["아파트 분양", "https://a.example/h", "2026-11-14T05:00:00Z"]]) }], NOW);
  const deps = { loadEntries: async () => [], search: () => [], loadWire: async () => wire };
  const call = (args: object) => handleRpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_econ_wire", arguments: args } }, deps) as Promise<any>;
  const r = await call({ tag: "rates" });
  assert.deepEqual(r.result.structuredContent.headlines.map((h: any) => h.link), ["https://a.example/r"]);
  assert.equal((await call({ impact: "high" })).result.structuredContent.count, 1);
  assert.equal((await call({ tag: "weather" })).result.isError, true);
  assert.equal((await call({ limit: 0 })).result.isError, true);
  const none = await handleRpc({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "get_econ_wire", arguments: {} } }, { loadEntries: async () => [], search: () => [] }) as any;
  assert.equal(none.result.isError, true);
});
