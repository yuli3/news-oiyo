import assert from "node:assert/strict";
import { test } from "node:test";
import { applyFlash, applyKoLines, buildWire, classify, collectWire, filterWire, normTitle, parseFeed, WIRE_SOURCES, type WireSource } from "../server/econ-wire.ts";
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
  assert.equal(classify("구다이글로벌, 유가증권시장 상장 추진").tags.includes("commodities"), false);
  assert.equal(classify("Federal Reserve announces schedule of Federal Open Market Committee meetings").impact, "high");
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
  assert.equal(normTitle("정보 유출 가능성(종합)"), normTitle("정보 유출 가능성"));
  const noisy = buildWire([{ source: a, xml: rss([["[게시판] 은행 경품 행사", "https://a.example/n", "2026-11-14T06:00:00Z"], ["[표] 외국인 순매수 상위", "https://a.example/t", "2026-11-14T06:00:00Z"]]) }], NOW);
  assert.equal(noisy.items.length, 0);
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

test("1차 기관 피드(2026-11-21): 등록, 영어 지표 제목 분류, 비율은 금리 아님", () => {
  const ids = new Set(WIRE_SOURCES.map((s) => s.id));
  for (const id of ["bls-cpi", "bls-empsit", "bls-ppi", "bls-jolts", "bea", "fed-speeches", "eia", "ecb", "boj", "boe", "mods"]) {
    const s = WIRE_SOURCES.find((x) => x.id === id);
    assert.ok(s && s.primary, id);
    assert.ok(s!.maxAgeHours >= 48 && s!.maxAgeHours <= 72, id);
  }
  assert.ok(ids.has("bok") && ids.has("federal-reserve"));
  const p = { primary: true };
  const cases: [string, string][] = [
    ["CPI for all items increases 0.4% in October; shelter rises", "macro"],
    ["The Employment Situation — October 2026", "macro"],
    ["Consumer Price Index Summary", "macro"],
    ["PPI for final demand increases 0.3% in October", "macro"],
    ["Job Openings and Labor Turnover Survey", "macro"],
    ["GDP (Advance Estimate), 3rd Quarter 2026", "macro"],
    ["U.S. International Trade in Goods and Services, September 2026", "macro"],
    ["Short-Term Energy Outlook", "macro"],
    ["Monetary Policy Statement", "rates"],
    ["Monetary policy decisions", "rates"],
    ["Bank Rate maintained at 4%", "rates"],
  ];
  for (const [title, tag] of cases) {
    const c = classify(title, p);
    assert.ok(c.tags.includes(tag as never), `${title} → ${c.tags}`);
    assert.equal(c.impact, "high", title);
  }
  // 실업률·환율은 '금리'가 아니다
  const emp = classify("Payroll employment rises by 165,000 in October; unemployment rate changes little at 4.1%", p);
  assert.equal(emp.tags.includes("rates"), false);
  assert.equal(emp.tags.includes("macro"), true);
  assert.equal(classify("Fed holds rates steady").tags.includes("rates"), true);
  // 연설·연구는 지표·금리가 아니면 '주목' 아님
  assert.equal(classify("Cook, The U.S. Economy in Global Context", p).impact, "normal");
  assert.equal(classify("Outdoor Recreation Economic Statistics, U.S. and States, 2025", p).impact, "normal");
});

test("parseFeed: 국가데이터처 숫자 pubDate 는 KST", () => {
  const xml = `<rss><channel><item><title><![CDATA[2026년 10월 고용동향]]></title><link>https://mods.go.kr/board.es?mid=a1&amp;act=view&amp;list_no=1</link><pubDate>202611181350</pubDate></item></channel></rss>`;
  const [h] = parseFeed(xml);
  assert.equal(h.publishedAt, "2026-11-18T04:50:00.000Z");
  assert.equal(h.url, "https://mods.go.kr/board.es?mid=a1&act=view&list_no=1");
  assert.equal(classify(h.title, { primary: true }).impact, "high");
});

test("applyKoLines: 영어 제목에만 붙이고, 모양이 틀리면 그대로", () => {
  const wire = buildWire([{ source: src("fed", { region: "US", primary: true }), xml: rss([["Federal Reserve issues FOMC statement", "https://fed.example/1", "2026-11-14T06:00:00Z"], ["한은 기준금리 동결", "https://bok.example/1", "2026-11-14T05:00:00Z"]]) }], NOW);
  const [en, ko] = wire.items;
  const out = applyKoLines(wire, { [en.id]: "  연준, FOMC 성명 발표 ", [ko.id]: "무시" });
  assert.equal(out.items[0].titleKo, "연준, FOMC 성명 발표");
  assert.equal(out.items[1].titleKo, undefined);
  assert.equal(applyKoLines(wire, null), wire);
  assert.equal(applyKoLines(wire, ["x"]), wire);
  assert.equal(applyKoLines(wire, { [en.id]: 3 }), wire);
});

test("loadWire: KV 한 줄 합치기, KV 실패해도 와이어는 나간다", async () => {
  const { loadWire } = await import("../server/wire-edge.ts");
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string) => new Response(String(url).includes("federalreserve.gov/feeds/press_all")
    ? rss([["Federal Reserve issues FOMC statement", "https://www.federalreserve.gov/x", new Date().toUTCString()]])
    : "", { status: 200 })) as typeof fetch;
  try {
    const first = await loadWire("https://news.example");
    const id = first.items[0].id;
    let gets = 0;
    const kv = { get: async (k: string) => { if (k === "flash") return null; gets++; assert.equal(k, "ko-lines"); return { [id]: "연준 FOMC 성명" }; } };
    const withKo = await loadWire("https://news.example", undefined, kv);
    assert.equal(withKo.items[0].titleKo, "연준 FOMC 성명");
    assert.equal(gets, 1);
    const broken = { get: async () => { throw new Error("kv down"); } };
    const plain = await loadWire("https://news.example", undefined, broken);
    assert.equal(plain.items[0].titleKo, undefined);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("MCP get_econ_wire: titleKo 포함", async () => {
  const wire = applyKoLines(buildWire([{ source: src("fed", { region: "US" }), xml: rss([["Fed holds rates", "https://fed.example/r", "2026-11-14T06:00:00Z"]]) }], NOW), {});
  wire.items[0].titleKo = "연준 금리 동결";
  const deps = { loadEntries: async () => [], search: () => [], loadWire: async () => wire };
  const r = await handleRpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_econ_wire", arguments: {} } }, deps) as any;
  assert.equal(r.result.structuredContent.headlines[0].titleKo, "연준 금리 동결");
});

test("applyFlash: 공식 속보를 맨 위에, 같은 URL 은 하나로, 오래되거나 이상한 항목은 버림", () => {
  const wire = buildWire([{ source: src("bls", { region: "US", primary: true }), xml: rss([["CPI for all items increases 0.4% in October", "https://www.bls.gov/news.release/cpi.nr0.htm", "2026-11-14T06:50:00Z"], ["Fed holds rates", "https://fed.example/r", "2026-11-14T06:40:00Z"]]) }], NOW);
  wire.items[0].titleKo = "CPI 10월 0.4% 상승";
  const flash = { items: [
    { title: "CPI for all items increases 0.4% in October", url: "https://www.bls.gov/news.release/cpi.nr0.htm", publishedAt: "2026-11-14T06:55:00Z", source: "bls-cpi", sourceName: "BLS 소비자물가(CPI)", region: "US" },
    { title: "Federal Reserve issues FOMC statement: maintain the target range for the federal funds rate at 3-3/4 to 4 percent", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261114a.htm", publishedAt: "2026-11-14T06:58:00Z", source: "fomc", sourceName: "FOMC", region: "US", titleKo: "연준, 기준금리 3.75~4% 유지" },
    { title: "옛 속보", url: "https://x.example/old", publishedAt: "2026-11-13T20:00:00Z" },
    { title: "javascript", url: "javascript:alert(1)", publishedAt: "2026-11-14T06:58:00Z" },
    { title: "", url: "https://x.example/empty", publishedAt: "2026-11-14T06:58:00Z" },
  ] };
  const out = applyFlash(wire, flash, NOW);
  assert.deepEqual(out.items.map((i) => [i.source, !!i.flash]), [["fomc", true], ["bls-cpi", true], ["bls", false]]);
  assert.equal(out.items[0].impact, "high");
  assert.ok(out.items[0].tags.includes("rates"));
  assert.equal(out.items[0].titleKo, "연준, 기준금리 3.75~4% 유지");
  assert.equal(out.items[1].titleKo, "CPI 10월 0.4% 상승"); // RSS 쪽 한국어 한 줄을 이어받는다
  assert.equal(out.items.filter((i) => i.url === "https://www.bls.gov/news.release/cpi.nr0.htm").length, 1);
  // BLS 는 RSS 보관 주소가 달라도 같은 출처 6시간 안이면 한 건으로 친다
  const bls2 = buildWire([{ source: src("bls-cpi", { region: "US", primary: true }), xml: rss([["CPI for all items increases 0.4% in October", "https://www.bls.gov/news.release/archives/cpi_11142026.htm", "2026-11-14T06:56:00Z"]]) }], NOW);
  const merged = applyFlash(bls2, { items: [flash.items[0]] }, NOW);
  assert.deepEqual(merged.items.map((i) => [i.url, !!i.flash]), [["https://www.bls.gov/news.release/cpi.nr0.htm", true]]);
  assert.equal(applyFlash(wire, null, NOW), wire);
  assert.equal(applyFlash(wire, { items: "x" }, NOW), wire);
  assert.equal(applyFlash(wire, { items: [] }, NOW), wire);
});

test("loadWire: 속보는 cacheTtl 30 으로 따로 읽고, 실패해도 와이어는 나간다", async () => {
  const { loadWire } = await import("../server/wire-edge.ts");
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response("", { status: 200 })) as typeof fetch;
  try {
    const at = new Date().toISOString();
    const calls: unknown[] = [];
    const kv = { get: async (k: string, o: unknown) => { calls.push([k, o]); return k === "flash" ? { items: [{ title: "Employment Situation: payrolls rise 150,000", url: "https://www.bls.gov/news.release/empsit.nr0.htm", publishedAt: at, source: "bls-empsit", region: "US" }] } : null; } };
    const w = await loadWire("https://news.example", undefined, kv as never);
    assert.equal(w.items[0].flash, true);
    assert.deepEqual(calls.find((c) => (c as unknown[])[0] === "flash"), ["flash", { type: "json", cacheTtl: 30 }]);
    const broken = { get: async () => { throw new Error("down"); } };
    const plain = await loadWire("https://news.example", undefined, broken as never);
    assert.equal(plain.items.some((i) => i.flash), false);
  } finally {
    globalThis.fetch = realFetch;
  }
});
