import { test } from "node:test";
import assert from "node:assert/strict";
import { onMailingList } from "../../functions/lib/pages-handler.mjs";
import { handleWeeklyRequest } from "../../functions/lib/weekly-handler.mjs";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

const KEY = "test-management-key-with-at-least-32-characters";
function fixture(t) {
  const sql = new DatabaseSync(":memory:");
  t.after(() => sql.close());
  for (const file of ["0001_mailing_list.sql", "0002_weekly_digest.sql"]) {
    sql.exec(readFileSync(new URL(`../../migrations/${file}`, import.meta.url), "utf8"));
  }
  const db = { prepare(query) { return { bind(...args) { return {
    async first() { return sql.prepare(query).get(...args) || null; },
    async all() { return { success: true, results: sql.prepare(query).all(...args) }; },
    async run() { return { success: true, meta: { changes: Number(sql.prepare(query).run(...args).changes) } }; },
  }; } }; } };
  const delivered = [];
  const deps = { adminKey: KEY, db, now: Date.parse("2026-10-15T03:00:00Z"),
    news: { days: [{ date: "2026-10-15", items: [{ title: "OpenAI release", url: "https://example.com/new" }] }] },
    mailer: { canSend: true, scope: "test-sender", async send(message) { delivered.push(message); return { ok: true }; } },
  };
  return { deps, delivered };
}
async function send(deps, through = "2026-10-15") {
  return handleWeeklyRequest(new Request("https://news.oiyo.net/api/mailing-list/digest", {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ through, send: true }),
  }), deps);
}

test("weekly management sends only to active subscribers and never repeats the same week", async t => {
  const { deps, delivered } = fixture(t);
  const { createD1Store } = await import("../../functions/lib/d1-store.mjs");
  const store = createD1Store(deps.db);
  for (const status of ["active", "pending", "unsubscribed"]) {
    await store.save({ email: `${status}@example.com`, status, confirmTokenHash: null,
      unsubscribeTokenHash: `hash-${status}`, unsubscribeToken: `token-${status}` }, null);
  }
  assert.equal((await send(deps)).status, 200);
  assert.equal((await send(deps)).status, 200);
  assert.deepEqual(delivered.map(message => message.to), ["active@example.com"]);
  assert.ok(delivered[0].text.includes("token-active"));
  assert.ok(delivered[0].idempotencyKey);
});

test("uncertain delivery waits for its lease, then retries the identical message and key", async t => {
  const { deps, delivered } = fixture(t);
  const { createD1Store } = await import("../../functions/lib/d1-store.mjs");
  await createD1Store(deps.db).save({ email: "retry@example.com", status: "active", confirmTokenHash: null,
    unsubscribeTokenHash: "retry-hash", unsubscribeToken: "retry-token" }, null);
  deps.mailer.send = async message => {
    delivered.push(message);
    if (delivered.length === 1) throw new Error("Provider accepted but response lost");
    return { ok: true };
  };
  assert.equal((await (await send(deps)).json()).pending, 1);
  assert.equal((await (await send(deps)).json()).pending, 1);
  assert.equal(delivered.length, 1);
  deps.now += 6 * 60000;
  deps.news.days[0].items[0].title = "OpenAI revised story";
  assert.equal((await (await send(deps)).json()).sent, 1);
  assert.deepEqual(delivered[0], delivered[1]);
  assert.equal((await (await send(deps)).json()).skipped, 1);
});

test("uncertain deliveries older than the provider window require review instead of automatic resend", async t => {
  const { deps, delivered } = fixture(t);
  const { createD1Store } = await import("../../functions/lib/d1-store.mjs");
  await createD1Store(deps.db).save({ email: "expired@example.com", status: "active", confirmTokenHash: null,
    unsubscribeTokenHash: "expired-hash", unsubscribeToken: "expired-token" }, null);
  deps.mailer.send = async message => { delivered.push(message); throw new Error("Unknown result"); };
  await send(deps);
  deps.now += 23 * 3600000;
  assert.equal((await (await send(deps)).json()).review, 1);
  assert.equal(delivered.length, 1);
});

test("revocation between uncertain attempts removes the recipient from retry dispatch", async t => {
  const { deps, delivered } = fixture(t);
  const { createD1Store } = await import("../../functions/lib/d1-store.mjs");
  const store = createD1Store(deps.db);
  const record = { email: "revoked@example.com", status: "active", confirmTokenHash: null,
    unsubscribeTokenHash: "revoked-hash", unsubscribeToken: "revoked-token" };
  await store.save(record, null);
  deps.mailer.send = async message => { delivered.push(message); throw new Error("Unknown result"); };
  await send(deps);
  await store.save({ ...record, status: "unsubscribed" }, record);
  deps.now += 6 * 60000;
  const response = await send(deps);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).sent, 0);
  assert.equal(delivered.length, 1);
});

test("an already frozen issue retries even when current news candidates become empty", async t => {
  const { deps, delivered } = fixture(t);
  const { createD1Store } = await import("../../functions/lib/d1-store.mjs");
  await createD1Store(deps.db).save({ email: "frozen@example.com", status: "active", confirmTokenHash: null,
    unsubscribeTokenHash: "frozen-hash", unsubscribeToken: "frozen-token" }, null);
  deps.mailer.send = async message => {
    delivered.push(message);
    if (delivered.length === 1) throw new Error("Unknown result");
    return { ok: true };
  };
  await send(deps);
  deps.news.days = [];
  deps.now += 6 * 60000;
  assert.equal((await (await send(deps)).json()).sent, 1);
  assert.deepEqual(delivered[0], delivered[1]);
});

test("weekly management requests without authorization cannot touch storage or mail", async () => {
  let touched = false;
  const response = await onMailingList({
    request: new Request("https://news.oiyo.net/api/mailing-list/digest", {
      method: "POST", headers: { "content-type": "application/json" }, body: "{}",
    }),
    env: { MAILING_LIST_ADMIN_KEY: "test-management-key-with-at-least-32-characters",
      MAILING_LIST_DB: { prepare() { touched = true; throw new Error("must not be accessed"); } } },
  });
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { ok: false, error: "unauthorized" });
  assert.equal(touched, false);
});

test("authorized preview uses the last seven days and never invokes a sender", async () => {
  let sent = false;
  const response = await handleWeeklyRequest(new Request("https://news.oiyo.net/api/mailing-list/digest", {
    method: "POST", headers: { "content-type": "application/json", authorization: "Bearer test-management-key-with-at-least-32-characters" },
    body: JSON.stringify({ through: "2026-10-15" }),
  }), {
    adminKey: "test-management-key-with-at-least-32-characters", now: Date.parse("2026-10-15T03:00:00Z"),
    news: { days: [
      { date: "2026-10-08", items: [{ title: "OpenAI old release", url: "https://example.com/old" }] },
      { date: "2026-10-09", items: [{ title: "OpenAI release", url: "https://example.com/current" }] },
    ] },
    mailer: { canSend: true, async send() { sent = true; return { ok: true }; } },
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.mode, "preview");
  assert.equal(body.from, "2026-10-09");
  assert.equal(body.through, "2026-10-15");
  assert.equal(body.digest.itemCount, 1);
  assert.equal(body.digest.text.includes("https://example.com/old"), false);
  assert.equal(sent, false);
});
