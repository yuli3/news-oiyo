import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { onMailingList } from "../../functions/lib/pages-handler.mjs";
import { handleMailingRequest } from "../../functions/lib/http.mjs";
import { createD1Store, createD1Limiter } from "../../functions/lib/d1-store.mjs";
import { createProductionMailer } from "../../functions/lib/production-mailer.mjs";

function database() {
  const sql = new DatabaseSync(":memory:");
  sql.exec(readFileSync(new URL("../../migrations/0001_mailing_list.sql", import.meta.url), "utf8"));
  sql.exec(readFileSync(new URL("../../migrations/0003_mailing_limits.sql", import.meta.url), "utf8"));
  return {
    sql,
    prepare(query) {
      const statement = sql.prepare(query);
      return { bind(...params) { return {
        async first() { return statement.get(...params) || null; },
        async all() { return { success: true, results: statement.all(...params) }; },
        async run() { const result = statement.run(...params); return { success: true, meta: { changes: Number(result.changes) } }; },
      }; } };
    },
  };
}
const ORIGIN = "https://news.oiyo.net";
function request(action, data) {
  return new Request(`${ORIGIN}/api/mailing-list/${action}`, { method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN }, body: JSON.stringify(data),
  });
}

test("production HTTP uses one D1 subscription store for confirmation and revocation", async t => {
  const db = database();
  t.after(() => db.sql.close());
  const fetchBefore = globalThis.fetch;
  t.after(() => { globalThis.fetch = fetchBefore; });
  let email;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    email = JSON.parse(options.body).text;
    return new Response("{}", { status: 200 });
  };
  const env = { MAILING_LIST_DB: db, MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only",
    MAILING_LIST_FROM: "OIYO <test@example.com>", MAILING_LIST_CONFIRM_SECRET: "test-confirm-secret-at-least-32-characters" };
  const applied = await onMailingList({ env, request: request("subscribe", { email: "d1@example.com", consent: true }) });
  assert.equal(applied.status, 202);
  assert.equal((await applied.text()).includes("d1@example.com"), false);
  const token = new URL(email.match(/https:\/\/[^\s]+\/confirm\/\?token=[^\s]+/)[0]).searchParams.get("token");
  const unsubToken = new URL(email.match(/https:\/\/[^\s]+\/unsubscribe\/\?token=[^\s]+/)[0]).searchParams.get("token");
  const confirmed = await onMailingList({ env, request: request("confirm", { token }) });
  assert.equal((await confirmed.json()).state, "active");
  const removed = await onMailingList({ env, request: request("unsubscribe", { token: unsubToken }) });
  assert.equal((await removed.json()).state, "unsubscribed");
  const stale = await onMailingList({ env, request: request("confirm", { token }) });
  assert.notEqual((await stale.json()).state, "active");
});

test("a production KV-only configuration stays closed instead of bypassing conditional writes", async () => {
  let touched = false;
  const response = await onMailingList({
    env: { MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only", MAILING_LIST_FROM: "test@example.com",
      MAILING_LIST_KV: { async get() { touched = true; } } },
    request: request("subscribe", { email: "kv-only@example.com", consent: true }),
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error, "store_unconfigured");
  assert.equal(touched, false);
});

test("fresh production handlers share a recipient cooldown even across different networks", async t => {
  const db = database();
  t.after(() => db.sql.close());
  const previousFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = previousFetch; });
  let sent = 0;
  globalThis.fetch = async () => { sent += 1; return new Response("{}", { status: 200 }); };
  const env = { MAILING_LIST_DB: db, MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only",
    MAILING_LIST_FROM: "test@example.com", MAILING_LIST_CONFIRM_SECRET: "test-confirm-secret-at-least-32-characters" };
  const first = request("subscribe", { email: "cooldown@example.com", consent: true });
  first.headers.set("cf-connecting-ip", "192.0.2.1");
  assert.equal((await onMailingList({ env, request: first })).status, 202);
  const second = request("subscribe", { email: "cooldown@example.com", consent: true });
  second.headers.set("cf-connecting-ip", "192.0.2.2");
  assert.equal((await onMailingList({ env, request: second })).status, 429);
  assert.equal(sent, 1);
});

test("a failed production subscription write cannot dispatch a confirmation email", async t => {
  const db = database();
  t.after(() => db.sql.close());
  const prepare = db.prepare.bind(db);
  db.prepare = query => {
    if (query.startsWith("INSERT INTO mailing_subscribers") || query.startsWith("UPDATE mailing_subscribers")) {
      throw new Error("Simulated subscription write outage");
    }
    return prepare(query);
  };
  const previousFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = previousFetch; });
  let sent = 0;
  globalThis.fetch = async () => { sent += 1; return new Response("{}", { status: 200 }); };
  const env = { MAILING_LIST_DB: db, MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only",
    MAILING_LIST_FROM: "test@example.com", MAILING_LIST_CONFIRM_SECRET: "test-confirm-secret-at-least-32-characters" };
  const response = await onMailingList({ env, request: request("subscribe", { email: "outage@example.com", consent: true }) });
  assert.equal(response.status, 503);
  assert.equal(sent, 0);
});

test("uncertain confirmation survives restart and retries the same usable link and provider key", async t => {
  const db = database();
  t.after(() => db.sql.close());
  const previousFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = previousFetch; });
  const messages = [];
  globalThis.fetch = async (_url, options) => {
    messages.push({ body: options.body, key: options.headers["Idempotency-Key"] });
    if (messages.length === 1) throw new Error("Provider accepted; response lost");
    return new Response("{}", { status: 200 });
  };
  const now = Date.parse("2026-10-15T03:00:00Z");
  function deps(at) {
    return { store: createD1Store(db), limiter: createD1Limiter(db), origin: ORIGIN, now: at,
      requireDurableConfirmation: true, confirmSecret: "test-confirm-secret-at-least-32-characters",
      mailer: createProductionMailer({ MAILING_LIST_SEND: "1", RESEND_API_KEY: "test-only", MAILING_LIST_FROM: "test@example.com" }) };
  }
  const data = { email: "uncertain@example.com", consent: true };
  assert.equal((await handleMailingRequest(request("subscribe", data), deps(now))).status, 503);
  assert.equal((await handleMailingRequest(request("subscribe", data), deps(now + 16 * 60000))).status, 202);
  assert.deepEqual(messages[0], messages[1]);
  assert.ok(messages[0].key);
  const text = JSON.parse(messages[0].body).text;
  const token = new URL(text.match(/https:\/\/[^\s]+\/confirm\/\?token=[^\s]+/)[0]).searchParams.get("token");
  const saved = await createD1Store(db).getByEmail(data.email);
  assert.equal(JSON.stringify(saved).includes(token), false);
  const response = await handleMailingRequest(request("confirm", { token }), deps(now + 17 * 60000));
  assert.equal((await response.json()).state, "active");
});

test("persistent network limits survive handler replacement and expire after their window", async t => {
  const db = database();
  t.after(() => db.sql.close());
  const now = Date.parse("2026-10-15T03:00:00Z");
  let sent = 0;
  function deps(at) { return { store: createD1Store(db), limiter: createD1Limiter(db), origin: ORIGIN, now: at,
    mailer: { canSend: true, async send() { sent += 1; return { ok: true }; } } }; }
  for (let i = 0; i < 5; i += 1) {
    assert.equal((await handleMailingRequest(request("subscribe", { email: `network${i}@example.com`, consent: true }), deps(now))).status, 202);
  }
  const data = { email: "network6@example.com", consent: true };
  assert.equal((await handleMailingRequest(request("subscribe", data), deps(now))).status, 429);
  assert.equal((await handleMailingRequest(request("subscribe", data), deps(now + 3600000))).status, 202);
  assert.equal(sent, 6);
});
