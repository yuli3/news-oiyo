-- Approval is required before creating a production database or applying this migration (2026-10-15).
CREATE TABLE IF NOT EXISTS mailing_subscribers (
  email_hash TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'unsubscribed')),
  confirm_hash TEXT,
  unsubscribe_hash TEXT NOT NULL,
  payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS mailing_confirm ON mailing_subscribers(confirm_hash);
CREATE INDEX IF NOT EXISTS mailing_unsubscribe ON mailing_subscribers(unsubscribe_hash);
