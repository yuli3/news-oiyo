// 프로덕션은 발송 스위치와 키, 보내는 주소가 모두 있을 때만 보낸다.
// devExpose 는 여기 없다. 확인 링크를 JSON 응답에 넣지 않는다.

import { sha256Hex } from "./mailing-list.mjs";

export function createProductionMailer(env = {}) {
  const key = env.RESEND_API_KEY || "";
  const from = env.MAILING_LIST_FROM || "";
  const enabled = env.MAILING_LIST_SEND === "1" && Boolean(key) && Boolean(from);
  if (!enabled) {
    return { canSend: false, devExpose: false, async send() { return { ok: false }; } };
  }
  return {
    canSend: true,
    devExpose: false,
    // Freeze the sender/account identity without persisting the credential in the delivery ledger.
    async scope() { return sha256Hex(JSON.stringify([from, key])); },
    async send({ to, subject, text, idempotencyKey }) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        // A timed-out response is uncertain, not evidence of non-delivery; the weekly ledger retains its key.
        signal: AbortSignal.timeout(10000),
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          // Resend requires an app User-Agent; missing identification can cause edge error 1010 (2026-10-15).
          // https://resend.com/docs/knowledge-base/403-error-1010
          "User-Agent": "OIYO-News/1.0",
          ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
        },
        body: JSON.stringify({ from, to, subject, text }),
      });
      return { ok: response.ok };
    },
  };
}
