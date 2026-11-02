// company-brain drafts/mailing/*.md 초안을 발송용 { id, subject, body }로 읽는다 (2026-10-30).
// 검토 완료(review_status checked-*, reviewer 있음)이고 아직 보내지 않은(sent_count 빈칸) 초안만 통과한다.
export function parseFrontmatter(markdown) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(markdown.replace(/\r\n/g, "\n"));
  if (!match) return { meta: {}, rest: markdown };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1").trim();
  }
  return { meta, rest: markdown.replace(/\r\n/g, "\n").slice(match[0].length) };
}

export function readReviewedDraft(markdown) {
  const { meta, rest } = parseFrontmatter(markdown);
  const problems = [];
  if (!meta.id) problems.push("id 없음");
  if (!meta.title) problems.push("title 없음");
  if (!/^checked/.test(meta.review_status || "")) problems.push("review_status가 checked-*가 아님");
  if (!meta.reviewer) problems.push("reviewer 없음");
  if (meta.sent_count) problems.push("이미 sent_count가 있음");
  // 본문: 첫 제목(H1) 다음부터, 초안 자체 바닥글(---)이나 쇼츠·검토 절 앞까지. 주석은 뺀다.
  const lines = rest.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const start = lines.findIndex((line) => /^#\s/.test(line));
  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (/^---\s*$/.test(line) || /^##\s*(60초|검토)/.test(line)) break;
    body.push(line);
  }
  const text = body.join("\n").trim();
  if (!text) problems.push("본문 없음");
  const promotional = !/^(false|no|0)$/i.test(meta.promotional || "true");
  return { problems, draft: { id: meta.id, subject: meta.title || "", body: text, promotional, reviewed: problems.length === 0 } };
}
