// 지난 7일(최신 날짜 포함)의 제목·자체 요약·원문 링크만 그린다. 원문 발췌는 넣지 않는다.
// 2026-10-14 세운: 소식 메일은 주 1통. 요일·시각 크론은 발송 키가 생기기 전에 두지 않는다.
// --send uses the authenticated production API: local files cannot represent production consent or deduplication.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildDigest, buildReviewedDraftMail, selectWeeklyItems } from "../functions/lib/digest.mjs";
import { readReviewedDraft } from "./lib/mailing-draft.mjs";
import { itemInScope } from "./lib/story-scope.mjs";
import { createFileStore } from "../functions/lib/stores.mjs";

const news = JSON.parse(await readFile(resolve(process.cwd(), "src/data/news.json"), "utf8"));
const scopedDays = [...(news.days || [])]
  .filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(day.date || ""))
  .map((day) => ({ date: day.date, items: (day.items || []).filter((item) => itemInScope(item)) }));
const week = selectWeeklyItems(scopedDays);
if (!week.through) {
  console.error("날짜가 있는 뉴스가 없습니다.");
  process.exit(1);
}
const digest = buildDigest({
  date: week.start,
  through: week.through,
  items: week.items,
  pageUrl: "https://news.oiyo.net/archive/",
});
// 2026-10-30 세운 승인: 기본은 미리보기(dry-run). 실제 발송은 검토한 초안(--draft)과 같은 id의 --confirm이 모두 있어야 한다.
// 자동 요약(위 digest)은 미리보기 전용이며 발송 경로로 보내지 않는다.
const arg = (name) => process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3) || "";
const send = process.argv.includes("--send");
const draftPath = arg("draft");
let draft = null;
if (draftPath) {
  const parsed = readReviewedDraft(await readFile(resolve(process.cwd(), draftPath), "utf8"));
  if (parsed.problems.length) {
    console.error(`검토 초안이 발송 조건을 못 채웠습니다: ${parsed.problems.join(", ")}. 보내지 않았습니다.`);
    process.exit(2);
  }
  draft = parsed.draft;
}
if (!send) {
  const mail = draft ? buildReviewedDraftMail(draft) : digest;
  process.stdout.write(`${mail.subject}\n\n${mail.text}\n`);
  if (!draft) process.stderr.write("자동 요약 미리보기입니다. 발송은 --draft=<검토 초안> --confirm=<초안 id> --send 로만 합니다.\n");
  const store = createFileStore(resolve(process.cwd(), process.env.MAILING_LIST_FILE || ".cache/mailing-list.json"));
  const active = await store.listActive();
  process.stderr.write(`활성 구독 ${active.length}명. 주소는 출력하지 않습니다.\n`);
  process.exit(0);
}
if (!draft) {
  console.error("발송에는 검토한 초안(--draft=...)이 필요합니다. 자동 요약은 보내지 않습니다. 이번에는 보내지 않았습니다.");
  process.exit(2);
}
if (arg("confirm") !== draft.id) {
  console.error(`수동 확인이 필요합니다: --confirm=${draft.id}. 이번에는 보내지 않았습니다.`);
  process.exit(2);
}

const adminKey = process.env.MAILING_LIST_ADMIN_KEY || "";
if (process.env.MAILING_LIST_SEND !== "1" || adminKey.length < 32) {
  console.error("MAILING_LIST_SEND=1과 관리 API 키가 필요합니다. 이번에는 보내지 않았습니다.");
  process.exit(2);
}
try {
  let cursor = null;
  let sent = 0;
  let pending = 0;
  let review = 0;
  do {
    // Fixed HTTPS destination and no redirects prevent leaking the management credential (2026-10-15).
    const response = await fetch("https://news.oiyo.net/api/mailing-list/digest", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(60000),
      headers: { "content-type": "application/json", authorization: `Bearer ${adminKey}` },
      body: JSON.stringify({ send: true, through: week.through, draft, confirm: draft.id, ...(cursor ? { cursor } : {}) }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error("Management request failed");
    sent += result.sent || 0;
    pending += result.pending || 0;
    review += result.review || 0;
    cursor = result.nextCursor;
  } while (cursor);
  process.stderr.write(`보냄 ${sent}건 · 재확인 대기 ${pending}건 · 수동 검토 ${review}건. 주소는 출력하지 않습니다.\n`);
  process.exitCode = pending || review ? 1 : 0;
} catch {
  console.error("관리 API 응답을 확인하지 못했습니다. 발송 여부가 불확실하므로 즉시 반복하지 말고 기록을 확인해 주세요.");
  process.exitCode = 1;
  }
