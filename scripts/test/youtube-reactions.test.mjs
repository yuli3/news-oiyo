import { test } from "node:test";
import assert from "node:assert/strict";
import { recentComments, renderSummary } from "../youtube-reactions.mjs";

const thread = (at, text, extra = {}) => ({
  snippet: { videoId: "v1", totalReplyCount: 1, topLevelComment: { snippet: { videoId: "v1", authorDisplayName: "a", textOriginal: text, likeCount: 2, publishedAt: at, ...extra } } },
});

test("recentComments keeps only comments since the cutoff, newest first", () => {
  const since = Date.parse("2026-11-23T00:00:00Z");
  const out = recentComments([
    thread("2026-11-22T10:00:00Z", "old"),
    thread("2026-11-23T05:00:00Z", "new  \n line"),
    thread("2026-11-23T09:00:00Z", "newer"),
    thread("2026-11-20T00:00:00Z", "edited", { updatedAt: "2026-11-23T01:00:00Z" }),
  ], since);
  assert.deepEqual(out.map((c) => c.text), ["newer", "new line", "edited"]);
});

test("renderSummary shows errors and counts", () => {
  const md = renderSummary({ since: "x", channels: [
    { id: "A", title: "A", error: "403 forbidden", comments: [], recentVideos: [] },
    { id: "B", title: "B", subscribers: 3, views: 10, videoCount: 1, comments: [], recentVideos: [] },
  ] });
  assert.match(md, /읽기 실패: 403 forbidden/);
  assert.match(md, /새 댓글 0개/);
});
