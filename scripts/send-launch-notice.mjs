// 2027 신년운세 출시 알림을 한 번 보낸다. 기본은 미리보기만 하고 아무것도 보내지 않는다.
//   미리보기: node scripts/send-launch-notice.mjs --launch-url=https://oiyo.net/ko/saju/new-year-2027/
//   발송:     MAILING_LIST_SEND=1 MAILING_LIST_ADMIN_KEY=... node scripts/send-launch-notice.mjs \
//               --launch-url=<출시 주소> --send --confirm=new-year-2027
// 발송은 운영 관리 API가 한다. 구독 동의·중복 방지 기록은 운영 D1에만 있다 (render-mailing-digest.mjs와 같은 방식).
import { buildLaunchNotice, normalizeLaunchUrl, NEW_YEAR_TOPIC } from "../functions/lib/launch-notice.mjs";

function arg(name) {
  const hit = process.argv.find((value) => value.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : "";
}

const launchUrl = normalizeLaunchUrl(arg("launch-url"));
if (!launchUrl) {
  console.error("--launch-url=<https://oiyo.net/...> 이 필요합니다. 이번에는 보내지 않았습니다.");
  process.exit(2);
}
const notice = buildLaunchNotice({ launchUrl });
if (!process.argv.includes("--send")) {
  process.stdout.write(`${notice.subject}\n\n${notice.text}\n`);
  process.stderr.write("미리보기만 했습니다. 보내려면 --send --confirm=new-year-2027 이 필요합니다.\n");
  process.exit(0);
}
const adminKey = process.env.MAILING_LIST_ADMIN_KEY || "";
if (arg("confirm") !== NEW_YEAR_TOPIC || process.env.MAILING_LIST_SEND !== "1" || adminKey.length < 32) {
  console.error("--confirm=new-year-2027, MAILING_LIST_SEND=1, 관리 API 키가 모두 필요합니다. 이번에는 보내지 않았습니다.");
  process.exit(2);
}
try {
  let cursor = null;
  let sent = 0;
  let pending = 0;
  let review = 0;
  do {
    // 고정 HTTPS 목적지, 리다이렉트 금지: 관리 키가 다른 곳으로 새지 않게 한다.
    const response = await fetch("https://news.oiyo.net/api/mailing-list/launch-notice", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(60000),
      headers: { "content-type": "application/json", authorization: `Bearer ${adminKey}` },
      body: JSON.stringify({ send: true, confirm: NEW_YEAR_TOPIC, launchUrl, ...(cursor ? { cursor } : {}) }),
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
