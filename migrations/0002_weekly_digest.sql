-- Apply only after the production data-storage approval (2026-10-15).
CREATE TABLE IF NOT EXISTS mailing_issues (
  issue_id TEXT PRIMARY KEY,
  payload TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS mailing_deliveries (
  issue_id TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  subscriber_payload TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('sending', 'sent')),
  first_attempt INTEGER NOT NULL,
  lease_until INTEGER NOT NULL,
  PRIMARY KEY (issue_id, email_hash)
);
