export const DAY_MS = 86400000;
export const PENDING_RETENTION_MS = 7 * DAY_MS;
export const SUPPRESSION_RETENTION_MS = 90 * DAY_MS;

export async function suppressionHash(email, secret) {
  if (typeof secret !== "string" || secret.length < 32) throw new Error("Suppression key unavailable");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`oiyo-suppression-v1:${email}`));
  return [...new Uint8Array(signed)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Expiry alone does not delete rows. The separate hourly worker runs this even without traffic (2026-10-15).
export async function cleanupMailingData(db, now = Date.now()) {
  const cutoff = new Date(now - PENDING_RETENTION_MS).toISOString();
  const results = await db.batch([
    db.prepare("DELETE FROM mailing_deliveries WHERE email_hash IN (SELECT email_hash FROM mailing_subscribers WHERE status = 'pending' AND json_extract(payload, '$.consentedAt') <= ?)").bind(cutoff),
    db.prepare("DELETE FROM mailing_subscribers WHERE status = 'pending' AND json_extract(payload, '$.consentedAt') <= ?").bind(cutoff),
    db.prepare("DELETE FROM mailing_suppressions WHERE unsubscribed_at <= ?").bind(now - SUPPRESSION_RETENTION_MS),
    db.prepare("DELETE FROM mailing_limits WHERE expires_at <= ?").bind(now),
    // Preserve uncertain delivery evidence throughout the provider retry window, but not indefinitely.
    db.prepare("DELETE FROM mailing_deliveries WHERE first_attempt <= ?").bind(now - PENDING_RETENTION_MS),
    db.prepare("DELETE FROM mailing_issues WHERE issue_id < ?").bind(new Date(now - 14 * DAY_MS).toISOString().slice(0, 10)),
  ]);
  if (results.some(result => !result.success)) throw new Error("Retention cleanup failed");
  return results.map(result => result.meta.changes);
}
