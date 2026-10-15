import { cleanupMailingData } from "../functions/lib/retention.mjs";

export default {
  async scheduled(controller, env) {
    const counts = await cleanupMailingData(env.MAILING_LIST_DB, controller.scheduledTime);
    // Counts only: subscription addresses, tokens and hashes must never enter operational logs.
    console.log(JSON.stringify({ event: "mailing_retention", deleted: counts }));
  },
  async fetch() { return new Response("Not found", { status: 404 }); },
};
