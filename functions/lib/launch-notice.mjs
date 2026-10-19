// 2027 신년운세 출시 알림: 한 번만 보내고, 보낸 뒤 또는 늦어도 2027-02-28(KST)에 신청을 지운다 (2026-10-19).
// /subscribe/new-year-2027/ 가 약속한 내용이다. 발송 처리(handler)와 시간 단위 정리(worker)가 같이 쓴다.
import { recordTopics } from "./mailing-list.mjs";

export const NEW_YEAR_TOPIC = "new-year-2027";
// 주간 호(YYYY-MM-DD)와 겹치지 않는 발송 기록 키. mailing_issues 14일 정리(issue_id < 날짜)에 걸리지 않는다.
export const LAUNCH_NOTICE_ID = "launch/new-year-2027";
// 페이지 약속은 "늦어도 2027-02-28에 삭제"다. 그날 KST 0시부터 발송을 막고 남은 신청을 지운다.
export const NEW_YEAR_PURGE_AT = Date.parse("2027-02-28T00:00:00+09:00");
// Resend 멱등 키 보존은 24시간이다. 23시간이 지난 불확실 발송은 다시 보내지 않고 보낸 것으로 본다.
const UNCERTAIN_AFTER_MS = 23 * 3600000;
const UNSUBSCRIBE_PLACEHOLDER = "수신 거부 링크는 받는 사람마다 따로 붙습니다.";

export function normalizeLaunchUrl(value) {
  if (typeof value !== "string" || value.length > 300) return null;
  let url;
  try { url = new URL(value); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  // 출시 알림은 oiyo.net 리포트로만 안내한다. 다른 도메인으로 보내는 광고 메일이 되지 않게 막는다.
  if (url.hostname !== "oiyo.net" && !url.hostname.endsWith(".oiyo.net")) return null;
  return url.toString();
}

// 정보통신망법 제50조: 제목 맨 앞 (광고), 보내는 이·연락처, 본문 수신 거부 방법.
// 수신 거부 줄은 받는 사람마다 digest.mjs withUnsubscribe()로 바꾼다.
export function buildLaunchNotice({ launchUrl }) {
  const subject = "(광고) OIYO 2027 신년운세 리포트 출시 알림";
  const text = [
    subject,
    "보내는 이: OIYO News · https://news.oiyo.net/",
    "",
    "신청하신 OIYO 2027 신년운세 전체 리포트가 나왔어요.",
    launchUrl,
    "",
    "이 메일은 2027 신년운세 리포트 출시 알림(광고성 정보 1통) 수신에 동의한 주소로 한 번만 보냅니다.",
    "이 알림을 보낸 뒤 출시 알림 신청 목록에서 주소를 지웁니다. 주간 AI·금융 소식을 따로 신청하셨다면 그 구독은 그대로입니다.",
    UNSUBSCRIBE_PLACEHOLDER,
    "문의: support@oiyo.net",
  ].join("\n");
  return { subject, text };
}

// 한 구독자의 신년운세 주제를 거둔다. 주제가 그것뿐이면 행을 지우고, 주간 소식도 있으면 주제만 뺀다.
// payload 비교로 동시에 바뀐 동의(해지·확인)를 덮어쓰지 않는다.
export async function retireLaunchSubscriber(db, emailHash, payload) {
  const record = JSON.parse(payload);
  const topics = recordTopics(record);
  if (!topics.includes(NEW_YEAR_TOPIC)) return null;
  const rest = topics.filter((topic) => topic !== NEW_YEAR_TOPIC);
  const matches = "EXISTS (SELECT 1 FROM mailing_subscribers WHERE email_hash = ? AND payload = ?)";
  // 불확실 발송 기록에 남은 주소·토큰 사본도 비운다. 빈 사본은 다시 claim되지 않는다(consent_changed).
  const statements = [
    db.prepare(`UPDATE mailing_deliveries SET subscriber_payload = '' WHERE issue_id = ? AND email_hash = ? AND ${matches}`)
      .bind(LAUNCH_NOTICE_ID, emailHash, emailHash, payload),
  ];
  if (rest.length) {
    statements.push(db.prepare("UPDATE mailing_subscribers SET payload = ? WHERE email_hash = ? AND payload = ?")
      .bind(JSON.stringify({ ...record, topics: rest }), emailHash, payload));
  } else {
    statements.push(
      db.prepare(`DELETE FROM mailing_deliveries WHERE issue_id <> ? AND email_hash = ? AND ${matches}`)
        .bind(LAUNCH_NOTICE_ID, emailHash, emailHash, payload),
      db.prepare("DELETE FROM mailing_subscribers WHERE email_hash = ? AND payload = ?").bind(emailHash, payload),
    );
  }
  const results = await db.batch(statements);
  if (results.some((result) => !result.success)) throw new Error("Launch notice retention failed");
  if (results.at(-1).meta.changes !== 1) return null;
  return rest.length ? "trimmed" : "deleted";
}

// 시간 단위 정리 작업이 부른다. 발송했거나(23시간 넘은 불확실 발송 포함) 기한이 지난 신청을 거둔다.
// 기한 뒤에는 확인 전 신청까지 지우고, 출시 알림 호·발송 기록도 지운다.
export async function retireLaunchNotices(db, now = Date.now()) {
  const expired = now >= NEW_YEAR_PURGE_AT;
  const counts = { deleted: 0, trimmed: 0 };
  for (let round = 0; round < 10; round += 1) {
    const result = await db.prepare(
      "SELECT email_hash, payload FROM mailing_subscribers s "
      + "WHERE EXISTS (SELECT 1 FROM json_each(s.payload, '$.topics') WHERE json_each.value = ?) "
      + "AND (? = 1 OR EXISTS (SELECT 1 FROM mailing_deliveries d WHERE d.issue_id = ? AND d.email_hash = s.email_hash "
      + "AND (d.state = 'sent' OR d.first_attempt <= ?))) ORDER BY email_hash LIMIT 100",
    ).bind(NEW_YEAR_TOPIC, expired ? 1 : 0, LAUNCH_NOTICE_ID, now - UNCERTAIN_AFTER_MS).all();
    if (!result.success) throw new Error("Launch notice retention failed");
    let changed = 0;
    for (const row of result.results) {
      const outcome = await retireLaunchSubscriber(db, row.email_hash, row.payload);
      if (outcome) { counts[outcome] += 1; changed += 1; }
    }
    if (result.results.length < 100 || !changed) break;
  }
  if (expired) {
    const results = await db.batch([
      db.prepare("DELETE FROM mailing_deliveries WHERE issue_id = ?").bind(LAUNCH_NOTICE_ID),
      db.prepare("DELETE FROM mailing_issues WHERE issue_id = ?").bind(LAUNCH_NOTICE_ID),
    ]);
    if (results.some((result) => !result.success)) throw new Error("Launch notice retention failed");
  }
  return counts;
}
