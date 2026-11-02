import { handleMailingRequest } from "./http.mjs";
import { createProductionMailer } from "./production-mailer.mjs";
import { createD1Store, createD1Limiter } from "./d1-store.mjs";
import { handleWeeklyRequest } from "./weekly-handler.mjs";
import { handleLaunchNoticeRequest } from "./launch-handler.mjs";
import publishedNews from "../../.cache/mailing-list-news.mjs";

export function onMailingList(context) {
  const env = context.env || {};
  const retentionReady = env.MAILING_LIST_RETENTION_REQUIRED !== "1"
    || (typeof env.MAILING_LIST_SUPPRESSION_SECRET === "string" && env.MAILING_LIST_SUPPRESSION_SECRET.length >= 32);
  const pathname = new URL(context.request.url).pathname.replace(/\/$/, "");
  if (pathname.endsWith("/launch-notice")) {
    return handleLaunchNoticeRequest(context.request, {
      adminKey: env.MAILING_LIST_ADMIN_KEY,
      db: env.MAILING_LIST_DB,
      // 보존 정리 준비 전에는 보내지 않는다. 테스트 모드는 테스트 수신자 해시 한 명에게만 보낸다 (2026-10-19).
      mailer: createProductionMailer(retentionReady ? env : { ...env, MAILING_LIST_SEND: "0" }),
      origin: env.MAILING_LIST_ORIGIN || "https://news.oiyo.net",
      testRecipientHash: env.MAILING_LIST_MODE === "test" ? env.MAILING_LIST_TEST_RECIPIENT_HASH || "" : undefined,
    });
  }
  if (pathname.endsWith("/digest")) {
    return handleWeeklyRequest(context.request, {
      adminKey: env.MAILING_LIST_ADMIN_KEY,
      news: publishedNews,
      db: env.MAILING_LIST_DB,
      // Test activation permits confirmation mail only, not a real weekly audience send (2026-10-15).
      mailer: createProductionMailer(env.MAILING_LIST_MODE === "test" || !retentionReady
        ? { ...env, MAILING_LIST_SEND: "0" } : env),
      origin: env.MAILING_LIST_ORIGIN || "https://news.oiyo.net",
      contact: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.MAILING_LIST_CONTACT || "") ? env.MAILING_LIST_CONTACT : undefined,
    });
  }
  return handleMailingRequest(context.request, {
    // KV cannot atomically reject stale writes; never fall back to it for consent transitions (2026-10-15).
    store: env.MAILING_LIST_DB && retentionReady ? createD1Store(env.MAILING_LIST_DB, { suppressionSecret: env.MAILING_LIST_SUPPRESSION_SECRET }) : null,
    mailer: createProductionMailer(env),
    origin: env.MAILING_LIST_ORIGIN || "https://news.oiyo.net",
    limiter: env.MAILING_LIST_DB ? createD1Limiter(env.MAILING_LIST_DB) : null,
    requireDurableConfirmation: true,
    confirmSecret: env.MAILING_LIST_CONFIRM_SECRET,
    requireSuppressionSecret: env.MAILING_LIST_RETENTION_REQUIRED === "1",
    suppressionSecret: env.MAILING_LIST_SUPPRESSION_SECRET,
    allowedEmailHash: env.MAILING_LIST_TEST_RECIPIENT_HASH,
    requireTestRecipient: env.MAILING_LIST_MODE === "test",
    now: Date.now(),
  });
}
