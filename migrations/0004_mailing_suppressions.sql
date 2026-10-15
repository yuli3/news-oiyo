-- 2026-10-15 user approved: retain only keyed address hash and revocation time for 90 days.
CREATE TABLE IF NOT EXISTS mailing_suppressions (
  address_hmac TEXT PRIMARY KEY,
  unsubscribed_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS mailing_suppression_expiry ON mailing_suppressions(unsubscribed_at);
