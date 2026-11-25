import assert from "node:assert/strict";
import { test } from "node:test";
import { readdirSync, readFileSync } from "node:fs";
import { buildMeta, narrationLines, shortItems, timeline, validateIssue } from "../scripts/lib/ai-wow.mjs";

const dir = new URL("../src/data/ai-wow/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const issues = files.map((f) => ({ f, issue: JSON.parse(readFileSync(new URL(f, dir), "utf8")) }));

test("주간 호가 하나 이상 있고 모두 규칙을 지킨다(만든 사람·원문 https·media 금지)", () => {
  assert.ok(files.length >= 1);
  for (const { f, issue } of issues) assert.deepEqual(validateIssue(issue, f), []);
});

test("검사기는 원문 링크·만든 사람이 빠지거나 남의 미디어를 넣으면 막는다", () => {
  const { issue } = issues[0];
  const bad = structuredClone(issue);
  bad.items[0].url = "http://x.com/a";
  delete bad.items[1].creator.handle;
  bad.items[2].media = "https://x.com/video.mp4";
  bad.items[3].what = "조회수 30만을 찍었어요";
  const errs = validateIssue(bad).join("\n");
  assert.match(errs, /https 필수/);
  assert.match(errs, /만든 사람/);
  assert.match(errs, /media 금지/);
  assert.match(errs, /claim/);
});

test("쇼츠는 58초 안, 설명란에 쇼츠 항목의 원문 링크와 만든 사람이 전부 있다", () => {
  const { issue } = issues[0];
  const items = shortItems(issue);
  const tl = timeline(items.length);
  assert.ok(tl.length <= 58.01, String(tl.length));
  assert.equal(tl.durs.length, items.length + 2);
  const meta = buildMeta(issue);
  for (const it of items) {
    assert.ok(meta.youtube.description.includes(it.url), it.id);
    assert.ok(meta.youtube.description.includes(it.creator.handle), it.id);
  }
  assert.ok(meta.youtube.title.length <= 100);
  assert.ok(meta.instagram.caption.includes(`news.oiyo.net/ai/wow/${issue.week}`));
  assert.ok(meta.x.text.includes(`https://news.oiyo.net/ai/wow/${issue.week}/`));
  assert.equal(narrationLines(issue).length, items.length + 2);
  assert.match(narrationLines(issue).at(-1)!, /AI 음성/);
});
