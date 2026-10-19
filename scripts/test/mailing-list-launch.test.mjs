import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { createD1Store } from "../../functions/lib/d1-store.mjs";
import { handleLaunchNoticeRequest } from "../../functions/lib/launch-handler.mjs";
import { LAUNCH_NOTICE_ID, NEW_YEAR_PURGE_AT, retireLaunchNotices } from "../../functions/lib/launch-notice.mjs";
import { sha256Hex } from "../../functions/lib/mailing-list.mjs";
import { onMailingList } from "../../functions/lib/pages-handler.mjs";
import retentionWorker from "../../workers/mailing-retention.mjs";

const KEY = "test-management-key-with-at-least-32-characters";
const SECRET = "test-only-suppression-secret-at-least-32-characters";
const LAUNCH = "https://oiyo.net/ko/saju/new-year-2027/";
const NOW = Date.parse("2026-12-01T03:00:00Z");

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

function subscriber(email, topics, status = "active") {
  return { email, status, topics, consentedAt: new Date(NOW).toISOString(), confirmTokenHash: null,
    unsubscribeTokenHash: `hash-${email}`, unsubscribeToken: `token-${email}` };
}

function fixture(t) {
  const db = database(t);
  const delivered = [];
  const deps = { adminKey: KEY, db, now: NOW,
    mailer: { canSend: true, scope: "test-sender", async send(message) { delivered.push(message); return { ok: true }; } } };
  return { db, deps, delivered, store: createD1Store(db) };
}

function call(deps, body, headers = {}) {
  return handleLaunchNoticeRequest(new Request("https://news.oiyo.net/api/mailing-list/launch-notice", {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${KEY}`, ...headers },
    body: JSON.stringify(body),
  }), deps);
}
const SEND = { launchUrl: LAUNCH, send: true, confirm: "new-year-2027" };
const count = (db, table) => db.sql.prepare(`SELECT count(*) AS n FROM ${table}`).get().n;

test("출시 알림은 관리 키·출시 주소·send·confirm이 모두 있어야 보낸다", async t => {
  const { deps, delivered, store } = fixture(t);
  await store.save(subscriber("fortune@example.com", ["new-year-2027"]), null);
  assert.equal((await call(deps, SEND, { authorization: "Bearer wrong-key-wrong-key-wrong-key-wrong" })).status, 401);
  assert.equal((await (await call(deps, { send: true, confirm: "new-year-2027" })).json()).error, "launch_url_required");
  for (const launchUrl of ["http://oiyo.net/x", "https://evil.example/oiyo.net", "https://user:pw@oiyo.net/", "javascript:alert(1)"]) {
    assert.equal((await call(deps, { ...SEND, launchUrl })).status, 400, launchUrl);
  }
  const preview = await (await call(deps, { launchUrl: LAUNCH })).json();
  assert.equal(preview.mode, "preview");
  assert.equal((await (await call(deps, { launchUrl: LAUNCH, send: true })).json()).error, "confirm_required");
  assert.equal((await (await call(deps, { ...SEND, confirm: true })).json()).error, "confirm_required");
  assert.equal(delivered.length, 0);
  assert.equal(count(deps.db, "mailing_issues"), 0, "미리보기와 거절은 발송 기록을 만들지 않는다");
});

test("확인된 신년운세 신청자에게만 한 번 보내고, 보낸 뒤 신청을 거둔다", async t => {
  const { db, deps, delivered, store } = fixture(t);
  await store.save(subscriber("fortune@example.com", ["new-year-2027"]), null);
  await store.save(subscriber("both@example.com", ["weekly", "new-year-2027"]), null);
  await store.save(subscriber("weekly@example.com", ["weekly"]), null);
  await store.save(subscriber("legacy@example.com", undefined), null);
  await store.save(subscriber("pending@example.com", ["new-year-2027"], "pending"), null);
  const first = await (await call(deps, SEND)).json();
  assert.equal(first.sent, 2);
  assert.equal(first.skipped, 2);
  assert.deepEqual(delivered.map(message => message.to).sort(), ["both@example.com", "fortune@example.com"]);
  for (const message of delivered) {
    assert.match(message.subject, /^\(광고\) /);
    assert.ok(message.text.startsWith("(광고) "));
    assert.ok(message.text.includes("보내는 이: OIYO News"));
    assert.ok(message.text.includes(LAUNCH));
    assert.ok(message.text.includes(`수신 거부: https://news.oiyo.net/subscribe/unsubscribe/?token=${encodeURIComponent(`token-${message.to}`)}`));
    assert.equal(message.text.includes("수신 거부 링크는 받는 사람마다"), false);
    assert.match(message.idempotencyKey, /^news-launch\/new-year-2027\/[a-f0-9]{64}$/);
  }
  // 주제가 신년운세뿐이면 지우고, 주간 소식도 있으면 주제만 뺀다.
  assert.equal(await store.getByEmail("fortune@example.com"), null);
  const both = await store.getByEmail("both@example.com");
  assert.deepEqual(both.topics, ["weekly"]);
  assert.equal(both.status, "active");
  assert.ok(await store.getByEmail("weekly@example.com"));
  assert.ok(await store.getByEmail("pending@example.com"));
  // 다시 돌려도 보내지 않는다. 같은 주소로 다시 신청해도 발송 기록이 남아 있는 동안 막는다.
  assert.equal((await (await call(deps, SEND)).json()).sent, 0);
  await store.save(subscriber("fortune@example.com", ["new-year-2027"]), null);
  const again = await (await call(deps, SEND)).json();
  assert.equal(again.sent, 0);
  assert.equal(delivered.length, 2);
  const markers = db.sql.prepare("SELECT state, subscriber_payload FROM mailing_deliveries WHERE issue_id = ?").all(LAUNCH_NOTICE_ID);
  assert.equal(markers.length, 2);
  assert.ok(markers.every(row => row.state === "sent" && row.subscriber_payload === ""), "발송 기록에 주소 사본을 남기지 않는다");
  assert.equal((await (await call(deps, { ...SEND, launchUrl: "https://oiyo.net/ko/other/" })).json()).error, "launch_url_changed");
});

test("불확실 발송은 같은 메일·같은 키로만 재시도하고, 23시간 뒤에는 정리 작업이 보낸 것으로 보고 거둔다", async t => {
  const { db, deps, delivered, store } = fixture(t);
  await store.save(subscriber("retry@example.com", ["new-year-2027"]), null);
  await store.save(subscriber("lost@example.com", ["weekly", "new-year-2027"]), null);
  deps.mailer.send = async message => {
    delivered.push(message);
    if (message.to === "lost@example.com") throw new Error("응답 유실");
    return { ok: true };
  };
  const first = await (await call(deps, SEND)).json();
  assert.equal(first.sent, 1);
  assert.equal(first.pending, 1);
  assert.equal((await (await call(deps, SEND)).json()).pending, 1, "임대 시간 안에는 다시 보내지 않는다");
  assert.equal(await store.getByEmail("retry@example.com"), null);
  deps.now += 6 * 60000;
  await call(deps, SEND);
  const retried = delivered.filter(message => message.to === "lost@example.com");
  assert.equal(retried.length, 2);
  assert.deepEqual(retried[0], retried[1]);
  // 23시간이 지나면 자동 재발송하지 않는다.
  deps.now += 23 * 3600000;
  assert.equal((await (await call(deps, SEND)).json()).review, 1);
  assert.equal(delivered.filter(message => message.to === "lost@example.com").length, 2);
  const counts = await retireLaunchNotices(db, deps.now);
  assert.equal(counts.trimmed, 1);
  assert.deepEqual((await store.getByEmail("lost@example.com")).topics, ["weekly"]);
  const snapshot = db.sql.prepare("SELECT subscriber_payload FROM mailing_deliveries WHERE email_hash = ?").get(await sha256Hex("lost@example.com"));
  assert.equal(snapshot.subscriber_payload, "", "불확실 발송 기록의 주소·토큰 사본도 비운다");
});

test("정리 작업은 2027-02-28(KST)부터 남은 신년운세 신청을 모두 거두고 그 전에는 건드리지 않는다", async t => {
  const { db, store } = fixture(t);
  await store.save(subscriber("fortune@example.com", ["new-year-2027"]), null);
  await store.save(subscriber("pending@example.com", ["new-year-2027"], "pending"), null);
  await store.save(subscriber("both@example.com", ["weekly", "new-year-2027"]), null);
  await store.save(subscriber("weekly@example.com", ["weekly"]), null);
  await store.save(subscriber("legacy@example.com", undefined), null);
  db.sql.prepare("INSERT INTO mailing_issues VALUES (?, '{}')").run(LAUNCH_NOTICE_ID);
  db.sql.prepare("INSERT INTO mailing_issues VALUES (?, '{}')").run("2027-02-22");
  assert.equal(NEW_YEAR_PURGE_AT, Date.parse("2027-02-27T15:00:00Z"));
  assert.deepEqual(await retireLaunchNotices(db, NEW_YEAR_PURGE_AT - 1), { deleted: 0, trimmed: 0 });
  assert.equal(count(db, "mailing_subscribers"), 5);
  const events = [];
  t.mock.method(console, "log", value => events.push(JSON.parse(value)));
  await retentionWorker.scheduled({ scheduledTime: NEW_YEAR_PURGE_AT }, { MAILING_LIST_DB: db });
  assert.deepEqual(events[0].launchNotice, { deleted: 2, trimmed: 1 });
  assert.equal(JSON.stringify(events).includes("@example.com"), false);
  assert.equal(await store.getByEmail("fortune@example.com"), null);
  assert.equal(await store.getByEmail("pending@example.com"), null);
  assert.deepEqual((await store.getByEmail("both@example.com")).topics, ["weekly"]);
  assert.ok(await store.getByEmail("weekly@example.com"));
  assert.ok(await store.getByEmail("legacy@example.com"));
  assert.equal(db.sql.prepare("SELECT count(*) AS n FROM mailing_issues WHERE issue_id = ?").get(LAUNCH_NOTICE_ID).n, 0);
  assert.equal((await call({ adminKey: KEY, db, now: NEW_YEAR_PURGE_AT }, SEND)).status, 410, "기한 뒤에는 보내지 않는다");
});

test("정리 작업은 발송 기록이 있는 신청만 거두고 해지와 경합하면 덮어쓰지 않는다", async t => {
  const { db, store } = fixture(t);
  const sent = subscriber("sent@example.com", ["new-year-2027"]);
  await store.save(sent, null);
  await store.save(subscriber("waiting@example.com", ["new-year-2027"]), null);
  db.sql.prepare("INSERT INTO mailing_deliveries VALUES (?, ?, '', 'sent', ?, ?)").run(LAUNCH_NOTICE_ID, await sha256Hex(sent.email), NOW, NOW);
  assert.deepEqual(await retireLaunchNotices(db, NOW), { deleted: 1, trimmed: 0 });
  assert.equal(await store.getByEmail("sent@example.com"), null);
  assert.ok(await store.getByEmail("waiting@example.com"));
  const { retireLaunchSubscriber } = await import("../../functions/lib/launch-notice.mjs");
  const waiting = await store.getByEmail("waiting@example.com");
  const stale = JSON.stringify({ ...waiting, status: "pending" });
  assert.equal(await retireLaunchSubscriber(db, await sha256Hex(waiting.email), stale), null);
  assert.ok(await store.getByEmail("waiting@example.com"));
});

test("테스트 모드의 운영 연결은 테스트 수신자 한 명에게만 보내고, 해시가 없으면 아무에게도 보내지 않는다", async t => {
  const db = database(t);
  const store = createD1Store(db);
  await store.save(subscriber("allowed@example.com", ["new-year-2027"]), null);
  await store.save(subscriber("other@example.com", ["new-year-2027"]), null);
  const sent = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent.push(JSON.parse(options.body).to);
    return new Response("{}", { status: 200 });
  });
  const env = { MAILING_LIST_DB: db, MAILING_LIST_MODE: "test", MAILING_LIST_SEND: "1", MAILING_LIST_ADMIN_KEY: KEY,
    MAILING_LIST_RETENTION_REQUIRED: "1", MAILING_LIST_SUPPRESSION_SECRET: SECRET,
    MAILING_LIST_FROM: "test@example.com", RESEND_API_KEY: "test-only",
    MAILING_LIST_TEST_RECIPIENT_HASH: await sha256Hex("allowed@example.com") };
  const post = overrides => onMailingList({ env: { ...env, ...overrides }, request: new Request("https://news.oiyo.net/api/mailing-list/launch-notice", {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${KEY}` }, body: JSON.stringify(SEND) }) });
  assert.equal((await post({ MAILING_LIST_TEST_RECIPIENT_HASH: "" })).status, 503);
  assert.equal((await post({ MAILING_LIST_SUPPRESSION_SECRET: "" })).status, 503, "보존 정리 준비 전에는 보내지 않는다");
  assert.equal(sent.length, 0);
  const body = await (await post({})).json();
  assert.equal(body.sent, 1);
  assert.equal(body.skipped, 1);
  assert.deepEqual(sent, ["allowed@example.com"]);
  assert.ok(await store.getByEmail("other@example.com"));
});
