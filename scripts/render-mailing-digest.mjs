// 지난 7일(최신 날짜 포함)의 제목·자체 요약·원문 링크만 그린다. 원문 발췌는 넣지 않는다.
// 2026-10-14 세운: 소식 메일은 주 1통. 요일·시각 크론은 발송 키가 생기기 전에 두지 않는다.
// --send uses the authenticated production API: local files cannot represent production consent or deduplication.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildDigest, selectWeeklyItems } from "../functions/lib/digest.mjs";
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
const send = process.argv.includes("--send");
if (!send) {
  process.stdout.write(`${digest.subject}\n\n${digest.text}\n`);
  const store = createFileStore(resolve(process.cwd(), process.env.MAILING_LIST_FILE || ".cache/mailing-list.json"));
  const active = await store.listActive();
  process.stderr.write(`활성 구독 ${active.length}명. 주소는 출력하지 않습니다.\n`);
  process.exit(0);
}

const adminKey = process.env.MAILING_LIST_ADMIN_KEY || "";
if (process.env.MAILING_LIST_SEND !== "1" || adminKey.length < 32) {
  console.error("MAILING_LIST_SEND=1과 관리 API 키가 필요합니다. 이번에는 보내지 않았습니다.");
  process.exit(2);
}
if (digest.itemCount === 0) {
  console.error("이번 주는 보낼 항목이 없습니다. 보내지 않았습니다.");
  process.exit(0);
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
      body: JSON.stringify({ send: true, through: week.through, ...(cursor ? { cursor } : {}) }),
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
