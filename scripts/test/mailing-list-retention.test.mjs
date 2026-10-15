import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { createD1Store } from "../../functions/lib/d1-store.mjs";
import { cleanupMailingData, DAY_MS, suppressionHash } from "../../functions/lib/retention.mjs";
import { subscribe, unsubscribe, sha256Hex } from "../../functions/lib/mailing-list.mjs";
import retentionWorker from "../../workers/mailing-retention.mjs";
import { onMailingList } from "../../functions/lib/pages-handler.mjs";

const NOW = Date.parse("2026-10-15T12:00:00Z");
const SECRET = "test-only-suppression-secret-at-least-32-characters";
function database(t) {
  const sql = new DatabaseSync(":memory:");
  for (const name of ["0001_mailing_list.sql", "0002_weekly_digest.sql", "0003_mailing_limits.sql", "0004_mailing_suppressions.sql"]) {
    sql.exec(readFileSync(new URL(`../../migrations/${name}`, import.meta.url), "utf8"));
  }
  t.after(() => sql.close());
  return {
    sql,
    prepare(query) {
      const stmt = sql.prepare(query);
      return { bind(...args) { return {
        async first() { return stmt.get(...args) || null; },
        async all() { return { success: true, results: stmt.all(...args) }; },
        async run() { return { success: true, meta: { changes: Number(stmt.run(...args).changes) } }; },
      }; } };
    },
    async batch(statements) {
      sql.exec("BEGIN");
      try {
        const results = [];
        for (const stmt of statements) results.push(await stmt.run());
        sql.exec("COMMIT");
        return results;
      } catch (error) { sql.exec("ROLLBACK"); throw error; }
    },
  };
}
function record(email, at = NOW, status = "pending") {
  return { email, status, consentedAt: new Date(at).toISOString(), confirmTokenHash: "test-confirm-hash",
    unsubscribeTokenHash: "test-unsub-hash", unsubscribeToken: "plaintext-test-token", confirmExpiresAt: at + 2 * DAY_MS };
}

test("revocation atomically removes raw address, tokens and delivery snapshots; only keyed suppression survives", async t => {
  const db = database(t);
  const store = createD1Store(db, { suppressionSecret: SECRET, now: NOW });
  const prior = record("retention@example.com", NOW, "active");
  assert.equal(await store.save(prior), true);
  const hash = await sha256Hex(prior.email);
  db.sql.prepare("INSERT INTO mailing_deliveries VALUES (?, ?, ?, 'sending', ?, ?)").run("2026-10-12", hash, JSON.stringify(prior), NOW, NOW);
  db.sql.prepare("INSERT INTO mailing_limits VALUES (?, 1, ?)").run(`recipient:${hash}`, NOW + 1000);
  assert.equal(await store.save({ ...prior, status: "unsubscribed" }, prior), true);
  assert.equal(await store.getByEmail(prior.email), null);
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_deliveries").get().n, 0);
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_limits").get().n, 0);
  const suppression = db.sql.prepare("SELECT * FROM mailing_suppressions").get();
  assert.deepEqual(Object.keys(suppression).sort(), ["address_hmac", "unsubscribed_at"]);
  assert.equal(suppression.address_hmac, await suppressionHash(prior.email, SECRET));
  assert.notEqual(suppression.address_hmac, hash);
  assert.equal(await store.isSuppressed(prior.email), true);
  assert.equal(await store.save(prior), false, "stale inserts must not undo revocation");
  let sent = 0;
  const result = await subscribe({ email: prior.email, consent: true, store, now: NOW, origin: "https://news.oiyo.net",
    mailer: { canSend: true, async send() { sent += 1; } } });
  assert.equal(result.status, 202);
  assert.equal(sent, 0);
});

test("cleanup deletes pending at seven days and suppression at ninety days, retaining active and younger records", async t => {
  const db = database(t);
  const store = createD1Store(db);
  await store.save(record("expired@example.com", NOW - 7 * DAY_MS));
  await store.save(record("young@example.com", NOW - 7 * DAY_MS + 1));
  await store.save(record("active@example.com", NOW - 100 * DAY_MS, "active"));
  db.sql.prepare("INSERT INTO mailing_suppressions VALUES (?, ?)").run("expired-hmac", NOW - 90 * DAY_MS);
  db.sql.prepare("INSERT INTO mailing_suppressions VALUES (?, ?)").run("young-hmac", NOW - 90 * DAY_MS + 1);
  await cleanupMailingData(db, NOW);
  assert.equal(await store.getByEmail("expired@example.com"), null);
  assert.ok(await store.getByEmail("young@example.com"));
  assert.equal((await store.getByEmail("active@example.com")).status, "active");
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_suppressions").get().n, 1);
  await cleanupMailingData(db, NOW); // repeat is safe
});

test("test-only and missing retention key requests cannot store or send", async () => {
  let touched = false;
  const deps = { email: "other@example.com", consent: true, requireSuppressionSecret: true,
    store: { async getByEmail() { touched = true; } }, mailer: { canSend: true, async send() { touched = true; } } };
  assert.equal((await subscribe(deps)).body.error, "retention_unconfigured");
  assert.equal((await subscribe({ ...deps, allowedEmailHash: await sha256Hex("approved@example.com") })).body.error, "test_only");
  assert.equal(touched, false);
});

test("public unsubscribe removes the actual SQLite record and stale confirmation cannot revive it", async t => {
  const db = database(t);
  const store = createD1Store(db, { suppressionSecret: SECRET, now: NOW });
  const token = "a".repeat(43);
  const prior = { ...record("public@example.com", NOW, "active"), unsubscribeTokenHash: await sha256Hex(token) };
  await store.save(prior);
  assert.equal((await unsubscribe({ store, token, now: NOW })).body.state, "unsubscribed");
  assert.equal(await store.save({ ...prior, status: "active" }, prior), false);
  assert.equal(await store.getByEmail(prior.email), null);
});

test("retention worker has no public mutation endpoint", async () => {
  assert.equal((await retentionWorker.fetch(new Request("https://example.com"))).status, 404);
});

test("scheduled cleanup runs without visitors and the built notice describes the seven/ninety-day policy", async t => {
  const db = database(t);
  await createD1Store(db).save(record("scheduled@example.com", NOW - 7 * DAY_MS));
  const events = [];
  t.mock.method(console, "log", value => events.push(JSON.parse(value)));
  await retentionWorker.scheduled({ scheduledTime: NOW }, { MAILING_LIST_DB: db });
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_subscribers").get().n, 0);
  assert.equal(events[0].event, "mailing_retention");
  assert.equal(JSON.stringify(events).includes("scheduled@example.com"), false);
  const html = readFileSync(new URL("../../dist/subscribe/index.html", import.meta.url), "utf8");
  for (const text of ["7일", "90일", "키 기반 해시", "시간 단위 정리", "Resend", "Cloudflare"]) assert.ok(html.includes(text), text);
});

test("failed revocation rolls back deletion and does not claim that consent was removed", async t => {
  const db = database(t);
  const store = createD1Store(db, { suppressionSecret: SECRET, now: NOW });
  const prior = record("rollback@example.com", NOW, "active");
  await store.save(prior);
  db.sql.prepare("INSERT INTO mailing_deliveries VALUES (?, ?, ?, 'sending', ?, ?)")
    .run("2026-10-12", await sha256Hex(prior.email), JSON.stringify(prior), NOW, NOW);
  db.sql.exec("CREATE TRIGGER fail_suppression BEFORE INSERT ON mailing_suppressions BEGIN SELECT RAISE(ABORT, 'test outage'); END");
  await assert.rejects(store.save({ ...prior, status: "unsubscribed" }, prior));
  assert.equal((await store.getByEmail(prior.email)).status, "active");
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_deliveries").get().n, 1);
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_suppressions").get().n, 0);
});

test("production HTTP wires test-only consent, confirmation and immediate deletion to real SQLite", async t => {
  const db = database(t);
  let text = "";
  let sends = 0;
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    sends += 1;
    text = JSON.parse(options.body).text;
    return new Response("{}", { status: 200 });
  });
  const env = { MAILING_LIST_DB: db, MAILING_LIST_MODE: "test", MAILING_LIST_SEND: "1",
    MAILING_LIST_RETENTION_REQUIRED: "1", MAILING_LIST_SUPPRESSION_SECRET: SECRET,
    MAILING_LIST_CONFIRM_SECRET: SECRET, MAILING_LIST_FROM: "test@example.com", RESEND_API_KEY: "test-only",
    MAILING_LIST_TEST_RECIPIENT_HASH: await sha256Hex("allowed@example.com") };
  async function post(action, data, overrides = {}) {
    return onMailingList({ env: { ...env, ...overrides }, request: new Request(`https://news.oiyo.net/api/mailing-list/${action}`,
      { method: "POST", headers: { "content-type": "application/json", origin: "https://news.oiyo.net" }, body: JSON.stringify(data) }) });
  }
  assert.equal((await post("subscribe", { email: "outsider@example.com", consent: true })).status, 503);
  assert.equal((await post("subscribe", { email: "allowed@example.com", consent: true }, { MAILING_LIST_TEST_RECIPIENT_HASH: "" })).status, 503);
  assert.equal(sends, 0);
  assert.equal((await post("subscribe", { email: "allowed@example.com", consent: true })).status, 202);
  const urls = text.match(/https:\/\/[^\s]+\?token=[^\s]+/g).map(value => new URL(value));
  const confirmToken = urls.find(url => url.pathname.includes("/confirm/")).searchParams.get("token");
  const unsubscribeToken = urls.find(url => url.pathname.includes("/unsubscribe/")).searchParams.get("token");
  assert.equal((await post("confirm", { token: confirmToken }, { MAILING_LIST_SUPPRESSION_SECRET: "" })).status, 503);
  assert.equal((await post("confirm", { token: confirmToken })).status, 200);
  assert.equal((await post("unsubscribe", { token: unsubscribeToken })).status, 200);
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_subscribers").get().n, 0);
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_suppressions").get().n, 1);
  assert.notEqual((await post("confirm", { token: confirmToken })).status, 200);
  const admin = "test-admin-key-at-least-thirty-two-characters";
  const digest = await onMailingList({ env: { ...env, MAILING_LIST_ADMIN_KEY: admin }, request: new Request("https://news.oiyo.net/api/mailing-list/digest",
    { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${admin}` }, body: JSON.stringify({ send: true }) }) });
  assert.equal(digest.status, 503);
  assert.equal(sends, 1, "only the approved confirmation mail may be dispatched in test mode");
});
