-- Pseudonymous rate-limit keys are still subject to retention/privacy approval before production use.
CREATE TABLE IF NOT EXISTS mailing_limits (
  bucket TEXT PRIMARY KEY,
  hits INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS mailing_limits_expiry ON mailing_limits(expires_at);
