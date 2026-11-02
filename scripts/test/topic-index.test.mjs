import test from "node:test";
import assert from "node:assert/strict";
import { compileTopics, tagItem, weekStart, rankWeek } from "../topic-index.mjs";

const topics = compileTopics({
  topics: [
    { id: "anthropic", label: "Anthropic·Claude", aliases: ["Claude", "클로드"] },
    { id: "mcp", label: "MCP", aliases: ["MCP"] },
    { id: "agents", label: "AI 에이전트", aliases: ["agent", "에이전트"] },
  ],
});

test("latin aliases need word boundaries, hangul aliases match inside words", () => {
  assert.deepEqual(tagItem({ title: "Claude ships MCP tools" }, topics), ["anthropic", "mcp"]);
  assert.deepEqual(tagItem({ title: "Claudette and SMCPX" }, topics), []);
  assert.deepEqual(tagItem({ title: "x", summary: "클로드가 에이전트를" }, topics), ["anthropic", "agents"]);
  assert.deepEqual(tagItem({ title: "useragent strings" }, topics), []);
});

test("weekStart returns the Monday", () => {
  assert.equal(weekStart("2026-10-26"), "2026-10-26");
  assert.equal(weekStart("2026-10-25"), "2026-10-19");
  assert.equal(weekStart("2026-10-21"), "2026-10-19");
});

test("rankWeek counts each item once, drops one-day topics, compares with the week before", () => {
  const days = [
    { date: "2026-10-13", items: [{ title: "Claude", score: 1 }] },
    { date: "2026-10-20", items: [{ title: "Claude Claude agent", score: 5 }, { title: "MCP", score: 1 }] },
    { date: "2026-10-22", items: [{ title: "클로드", score: 9 }] },
  ];
  const r = rankWeek(days, topics, "2026-10-19", 10);
  assert.equal(r.items, 3);
  assert.deepEqual(r.rows.map((x) => [x.id, x.items, x.days, x.prevItems]), [["anthropic", 2, 2, 1]]);
  assert.equal(r.rows[0].examples[0].title, "클로드");
});

test("examples prefer title hits over higher-scored side mentions in the summary", () => {
  const days = [
    { date: "2026-10-20", items: [{ title: "New model weights", summary: "보안 성능도 올렸어요", score: 99 }] },
    { date: "2026-10-21", items: [{ title: "Binance 해킹 사건", score: 3 }] },
  ];
  const sec_topics = compileTopics({ topics: [{ id: "security", label: "보안", aliases: ["보안", "해킹"] }] });
  const r = rankWeek(days, sec_topics, "2026-10-19", 10);
  const sec = r.rows.find((x) => x.id === "security");
  assert.equal(sec.items, 2); // counting is unchanged
  assert.equal(sec.examples[0].title, "Binance 해킹 사건");
  assert.ok(!("headline" in sec.examples[0]));
});
