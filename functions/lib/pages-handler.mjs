import { handleMailingRequest } from "./http.mjs";
import { createProductionMailer } from "./production-mailer.mjs";
import { createD1Store, createD1Limiter } from "./d1-store.mjs";
import { handleWeeklyRequest } from "./weekly-handler.mjs";
import publishedNews from "../../src/data/news.json" with { type: "json" };

export function onMailingList(context) {
  const env = context.env || {};
  if (new URL(context.request.url).pathname.replace(/\/$/, "").endsWith("/digest")) {
    return handleWeeklyRequest(context.request, {
      adminKey: env.MAILING_LIST_ADMIN_KEY,
      news: publishedNews,
      db: env.MAILING_LIST_DB,
      mailer: createProductionMailer(env),
      origin: env.MAILING_LIST_ORIGIN || "https://news.oiyo.net",
    });
  }
  return handleMailingRequest(context.request, {
    // KV cannot atomically reject stale writes; never fall back to it for consent transitions (2026-10-15).
    store: env.MAILING_LIST_DB ? createD1Store(env.MAILING_LIST_DB) : null,
    mailer: createProductionMailer(env),
    origin: env.MAILING_LIST_ORIGIN || "https://news.oiyo.net",
    limiter: env.MAILING_LIST_DB ? createD1Limiter(env.MAILING_LIST_DB) : null,
    requireDurableConfirmation: true,
    confirmSecret: env.MAILING_LIST_CONFIRM_SECRET,
    now: Date.now(),
  });
}
