import { cleanupMailingData } from "../functions/lib/retention.mjs";
import { retireLaunchNotices } from "../functions/lib/launch-notice.mjs";

export default {
  async scheduled(controller, env) {
    // 신년운세 출시 알림을 먼저 거둔다. 7일 발송 기록 정리보다 앞서야 불확실 발송도 놓치지 않는다 (2026-10-19).
    const launchNotice = await retireLaunchNotices(env.MAILING_LIST_DB, controller.scheduledTime);
    const counts = await cleanupMailingData(env.MAILING_LIST_DB, controller.scheduledTime);
    // Counts only: subscription addresses, tokens and hashes must never enter operational logs.
    console.log(JSON.stringify({ event: "mailing_retention", deleted: counts, launchNotice }));
  },
  async fetch() { return new Response("Not found", { status: 404 }); },
};
