// 신년운세 출시 알림 관리 API. 주간 소식 발송(weekly-handler.mjs)과 같은 관문·발송 기록·멱등 키를 쓴다.
// 실제 발송은 관리 키 + launchUrl + send:true + confirm:"new-year-2027" 이 모두 있어야 한다.
import { recordTopics } from "./mailing-list.mjs";
import { withUnsubscribe } from "./digest.mjs";
import { createWeeklyStore } from "./weekly-store.mjs";
import { readAdminRequest, reply } from "./weekly-handler.mjs";
import {
  LAUNCH_NOTICE_ID, NEW_YEAR_PURGE_AT, NEW_YEAR_TOPIC,
  buildLaunchNotice, normalizeLaunchUrl, retireLaunchSubscriber,
} from "./launch-notice.mjs";

export async function handleLaunchNoticeRequest(request, deps) {
  try { return await processLaunchNoticeRequest(request, deps); }
  catch { return reply(503, { ok: false, error: "service_unavailable" }); }
}

async function processLaunchNoticeRequest(request, deps) {
  const admin = await readAdminRequest(request, deps);
  if (admin.response) return admin.response;
  const data = admin.data;
  const now = deps.now ?? Date.now();
  // 기한이 지나면 신청 목록은 지워졌거나 지워질 대상이다. 늦은 알림을 보내지 않는다.
  if (now >= NEW_YEAR_PURGE_AT) return reply(410, { ok: false, error: "notice_window_closed" });
  const launchUrl = normalizeLaunchUrl(data.launchUrl);
  if (!launchUrl) return reply(400, { ok: false, error: "launch_url_required" });
  const notice = buildLaunchNotice({ launchUrl });
  if (data.send !== true) return reply(200, { ok: true, mode: "preview", notice });
  if (data.confirm !== NEW_YEAR_TOPIC) return reply(400, { ok: false, error: "confirm_required" });
  // 테스트 모드: 승인된 테스트 수신자 한 명에게만 보낸다. 해시가 없으면 아무에게도 보내지 않는다.
  const testHash = deps.testRecipientHash;
  if (testHash !== undefined && !/^[a-f0-9]{64}$/.test(testHash || "")) return reply(503, { ok: false, error: "test_only" });
  if (!deps.db || !deps.mailer?.canSend || !deps.mailer.scope) return reply(503, { ok: false, error: "launch_sender_unconfigured" });
  const after = data.cursor ?? "";
  if (after !== "" && (typeof after !== "string" || !/^[a-f0-9]{64}$/.test(after))) return reply(400, { ok: false, error: "invalid_cursor" });
  const scope = typeof deps.mailer.scope === "function" ? await deps.mailer.scope() : deps.mailer.scope;
  const origin = new URL(deps.origin || "https://news.oiyo.net").origin;
  const store = createWeeklyStore(deps.db);
  // 첫 발송 때 제목·본문·링크를 고정한다. 재시도는 같은 메일·같은 멱등 키로만 나간다.
  const issue = await store.getIssue(LAUNCH_NOTICE_ID)
    || await store.issue(LAUNCH_NOTICE_ID, { digest: notice, scope, origin, launchUrl });
  if (issue.scope !== scope || issue.origin !== origin) return reply(409, { ok: false, error: "sender_changed" });
  if (issue.launchUrl !== launchUrl) return reply(409, { ok: false, error: "launch_url_changed" });
  const recipients = await store.recipients(after);
  const counts = { sent: 0, skipped: 0, pending: 0, review: 0 };
  const deadline = Date.now() + 30000;
  let processed = 0;
  for (const recipient of recipients.slice(0, 50)) {
    if (processed && Date.now() >= deadline) break;
    processed += 1;
    const record = JSON.parse(recipient.payload);
    // 주간 소식 동의는 출시 알림 동의가 아니다. 테스트 모드에서는 테스트 수신자만.
    if (!recordTopics(record).includes(NEW_YEAR_TOPIC) || (testHash !== undefined && recipient.email_hash !== testHash)) {
      counts.skipped += 1;
      continue;
    }
    const state = await store.claim(LAUNCH_NOTICE_ID, recipient, now);
    if (state !== "claimed") {
      counts[state === "review_required" || state === "consent_changed" ? "review" : state === "busy" ? "pending" : "skipped"] += 1;
      continue;
    }
    try {
      const result = await deps.mailer.send({ to: record.email, subject: issue.digest.subject,
        text: withUnsubscribe(issue.digest.text, issue.origin, record.unsubscribeToken),
        idempotencyKey: `news-launch/new-year-2027/${recipient.email_hash}` });
      if (!result.ok) { counts.pending += 1; continue; }
      await store.markSent(LAUNCH_NOTICE_ID, recipient.email_hash);
      counts.sent += 1;
    } catch { counts.pending += 1; continue; }
    // 보낸 즉시 신청을 거둔다. 실패해도 발송 기록이 남아 있어 시간 단위 정리 작업이 다시 거둔다.
    try { await retireLaunchSubscriber(deps.db, recipient.email_hash, recipient.payload); } catch { /* 정리 작업이 이어받는다 */ }
  }
  return reply(200, { ok: true, mode: "send", issue: LAUNCH_NOTICE_ID, ...counts,
    nextCursor: recipients.length > processed ? recipients[processed - 1].email_hash : null });
}
