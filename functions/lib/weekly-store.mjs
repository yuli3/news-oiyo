// SQL predicates claim a delivery atomically; a process-local lock cannot protect Pages isolates (2026-10-15).
export function createWeeklyStore(db) {
  async function run(query, args) {
    const result = await db.prepare(query).bind(...args).run();
    if (!result.success) throw new Error("Weekly storage unavailable");
    return result.meta.changes === 1;
  }
  return {
    async getIssue(id) {
      const row = await db.prepare("SELECT payload FROM mailing_issues WHERE issue_id = ?").bind(id).first();
      return row ? JSON.parse(row.payload) : null;
    },
    async issue(id, payload) {
      await run("INSERT INTO mailing_issues (issue_id, payload) VALUES (?, ?) ON CONFLICT(issue_id) DO NOTHING", [id, JSON.stringify(payload)]);
      const row = await db.prepare("SELECT payload FROM mailing_issues WHERE issue_id = ?").bind(id).first();
      return JSON.parse(row.payload);
    },
    async recipients(after) {
      const result = await db.prepare("SELECT email_hash, payload FROM mailing_subscribers WHERE status = 'active' AND email_hash > ? ORDER BY email_hash LIMIT 51").bind(after).all();
      if (!result.success) throw new Error("Weekly storage unavailable");
      return result.results;
    },
    async claim(id, recipient, now) {
      const args = [id, recipient.email_hash, recipient.payload, now, now + 300000, recipient.email_hash, recipient.payload];
      if (await run("INSERT INTO mailing_deliveries (issue_id, email_hash, subscriber_payload, state, first_attempt, lease_until) SELECT ?, ?, ?, 'sending', ?, ? WHERE EXISTS (SELECT 1 FROM mailing_subscribers WHERE email_hash = ? AND status = 'active' AND payload = ?) ON CONFLICT(issue_id, email_hash) DO NOTHING", args)) return "claimed";
      const prior = await db.prepare("SELECT * FROM mailing_deliveries WHERE issue_id = ? AND email_hash = ?").bind(id, recipient.email_hash).first();
      if (!prior) return "revoked";
      if (prior.state === "sent") return "sent";
      if (prior.subscriber_payload !== recipient.payload) return "consent_changed";
      // Resend retains idempotency keys for 24h: stop conservatively at 23h, never silently create a new key.
      if (now - prior.first_attempt >= 23 * 3600000) return "review_required";
      if (prior.lease_until > now) return "busy";
      const claimed = await run("UPDATE mailing_deliveries SET lease_until = ? WHERE issue_id = ? AND email_hash = ? AND state = 'sending' AND lease_until <= ? AND EXISTS (SELECT 1 FROM mailing_subscribers WHERE email_hash = ? AND status = 'active' AND payload = ?)", [now + 300000, id, recipient.email_hash, now, recipient.email_hash, recipient.payload]);
      return claimed ? "claimed" : "busy";
    },
    async markSent(id, emailHash) {
      // A completed send needs its deduplication key, not a second copy of the address and bearer token (2026-10-15).
      await run("UPDATE mailing_deliveries SET state = 'sent', subscriber_payload = '' WHERE issue_id = ? AND email_hash = ?", [id, emailHash]);
    },
  };
}
