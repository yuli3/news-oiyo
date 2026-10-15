import { sha256Hex } from "./mailing-list.mjs";

export function createD1Limiter(db) {
  async function take(bucket, now, windowMs, limit) {
    // One conditional SQL write serializes decisions across Pages isolates (2026-10-15 independent review).
    const result = await db.prepare("INSERT INTO mailing_limits (bucket, hits, expires_at) VALUES (?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET hits = CASE WHEN expires_at <= ? THEN 1 ELSE hits + 1 END, expires_at = CASE WHEN expires_at <= ? THEN ? ELSE expires_at END WHERE expires_at <= ? OR hits < ?")
      .bind(bucket, now + windowMs, now, now, now + windowMs, now, limit).run();
    if (!result.success) throw new Error("Rate-limit storage unavailable");
    return result.meta.changes === 1;
  }
  return {
    async allow(networkHash, now, emailHash) {
      // Bounded expiry cleanup; hashes are pseudonymous, not anonymous. No raw IP is persisted.
      const cleanup = await db.prepare("DELETE FROM mailing_limits WHERE bucket IN (SELECT bucket FROM mailing_limits WHERE expires_at <= ? LIMIT 100)").bind(now).run();
      if (!cleanup.success) throw new Error("Rate-limit storage unavailable");
      if (!await take(`network:${networkHash}`, now, 3600000, 5)) return false;
      return take(`recipient:${emailHash}`, now, 900000, 1);
    },
  };
}

export function createD1Store(db) {
  return {
    async getByEmail(email) {
      const row = await db.prepare("SELECT payload FROM mailing_subscribers WHERE email_hash = ?")
        .bind(await sha256Hex(email)).first();
      return row ? JSON.parse(row.payload) : null;
    },
    async findByToken(kind, hash) {
      const column = kind === "confirm" ? "confirm_hash" : "unsubscribe_hash";
      const row = await db.prepare(`SELECT payload FROM mailing_subscribers WHERE ${column} = ?`)
        .bind(hash).first();
      return row ? JSON.parse(row.payload) : null;
    },
    async save(next, prev) {
      const values = [next.status, next.confirmTokenHash, next.unsubscribeTokenHash, JSON.stringify(next), await sha256Hex(next.email)];
      let result;
      if (prev) {
        // The predicate and write are one SQL statement: stale activation must not overwrite revocation (2026-10-15).
        result = await db.prepare("UPDATE mailing_subscribers SET status = ?, confirm_hash = ?, unsubscribe_hash = ?, payload = ? WHERE email_hash = ? AND payload = ?")
          .bind(...values, JSON.stringify(prev)).run();
      } else {
        result = await db.prepare("INSERT INTO mailing_subscribers (status, confirm_hash, unsubscribe_hash, payload, email_hash) VALUES (?, ?, ?, ?, ?) ON CONFLICT(email_hash) DO NOTHING")
          .bind(...values).run();
      }
      if (!result.success) throw new Error("Subscription store unavailable");
      return result.meta.changes === 1;
    },
    async listActive() {
      const result = await db.prepare("SELECT payload FROM mailing_subscribers WHERE status = ?").bind("active").all();
      if (!result.success) throw new Error("Subscription store unavailable");
      return result.results.map(row => {
        const record = JSON.parse(row.payload);
        return { email: record.email, unsubscribeToken: record.unsubscribeToken };
      });
    },
  };
}
