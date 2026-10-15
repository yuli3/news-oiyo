import { test } from "node:test";
import assert from "node:assert/strict";
import { handleMailingRequest } from "../../functions/lib/http.mjs";
import { createMemoryStore } from "../../functions/lib/stores.mjs";
import { spawn } from "node:child_process";
import http from "node:http";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ORIGIN = "https://news.oiyo.net";

test("local HTTP rejects an oversized unfinished upload without waiting for the rest", async t => {
  const temp = mkdtempSync(join(tmpdir(), "news-dev-http-"));
  const child = spawn(process.execPath, ["scripts/mailing-list-dev.mjs"], {
    cwd: new URL("../../", import.meta.url),
    env: { ...process.env, MAILING_LIST_PORT: "0", MAILING_LIST_FILE: join(temp, "subscribers.json"),
      MAILING_LIST_OUTBOX: join(temp, "outbox.jsonl") }, stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(() => { child.kill("SIGTERM"); });
  const address = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Local server did not become ready")), 2000);
    child.stdout.once("data", chunk => {
      clearTimeout(timer);
      const match = chunk.toString().match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) resolve(match[0]); else reject(new Error("Local server readiness had no address"));
    });
    child.once("exit", () => { clearTimeout(timer); reject(new Error("Local server exited before readiness")); });
  });
  const status = await new Promise((resolve, reject) => {
    const req = http.request(`${address}/api/mailing-list/subscribe`, {
      method: "POST", headers: { "content-type": "application/json", "transfer-encoding": "chunked" },
    }, response => { response.resume(); resolve(response.statusCode); req.destroy(); });
    req.on("error", reject);
    req.setTimeout(1000, () => { reject(new Error("Server waited for the unfinished oversized body")); req.destroy(); });
    // Deliberately do not end the request: a streaming limit must reject this first chunk.
    req.write(Buffer.alloc(4097, "x"));
  });
  assert.equal(status, 413);
});

test("all production API entrypoints load and expose their expected HTTP boundary", async () => {
  for (const action of ["subscribe", "confirm", "unsubscribe", "digest"]) {
    const { onRequest } = await import(`../../functions/api/mailing-list/${action}.js`);
    const response = await onRequest({ env: {}, request: new Request(`${ORIGIN}/api/mailing-list/${action}`, {
      method: "POST", headers: { "content-type": "application/json" }, body: "{}",
    }) });
    assert.equal(response.status, action === "digest" ? 401 : 400);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
});
function request(body, headers = {}, action = "subscribe") {
  return new Request(`${ORIGIN}/api/mailing-list/${action}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("sender exceptions return a private failure response instead of escaping", async () => {
  const response = await handleMailingRequest(request({ email: "reader@example.com", consent: true }), {
    origin: ORIGIN,
    store: createMemoryStore(),
    mailer: { canSend: true, async send() { throw new Error("secret provider detail reader@example.com"); } },
  });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, error: "service_unavailable" });
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("cross-origin form cannot trigger confirmation mail", async () => {
  let sent = false;
  const response = await handleMailingRequest(request({ email: "reader@example.com", consent: true }, {
    origin: "https://unrelated.example", "sec-fetch-site": "cross-site",
  }), {
    origin: ORIGIN, store: createMemoryStore(),
    mailer: { canSend: true, async send() { sent = true; return { ok: true }; } },
  });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { ok: false, error: "origin_not_allowed" });
  assert.equal(sent, false);
});

test("oversized streaming bodies are stopped before the remainder is read", async () => {
  let secondChunkRead = false;
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(4097)); },
    pull(controller) { secondChunkRead = true; controller.close(); },
  }, { highWaterMark: 0 });
  const response = await handleMailingRequest(new Request(`${ORIGIN}/api/mailing-list/subscribe`, {
    method: "POST", headers: { "content-type": "application/json" }, body: stream, duplex: "half",
  }), { origin: ORIGIN });
  assert.equal(response.status, 413);
  assert.equal(secondChunkRead, false);
});

test("an in-flight confirmation cannot reactivate a subscription after unsubscribe", async () => {
  const store = createMemoryStore();
  let message;
  const deps = { origin: ORIGIN, store,
    mailer: { canSend: true, devExpose: true, async send(mail) { message = mail.text; return { ok: true }; } },
  };
  const applied = await (await handleMailingRequest(request({ email: "race@example.com", consent: true }), deps)).json();
  const token = new URL(applied.devConfirmUrl).searchParams.get("token");
  const unsubToken = new URL(message.match(/https:\/\/[^\s]+\/unsubscribe\/\?token=[^\s]+/)[0]).searchParams.get("token");
  let release;
  let reached;
  const paused = new Promise(resolve => { reached = resolve; });
  const resume = new Promise(resolve => { release = resolve; });
  const lookup = store.findByToken.bind(store);
  // Pause only the database read of confirmation to deterministically model network overlap.
  store.findByToken = async (kind, hash) => {
    const snapshot = await lookup(kind, hash);
    if (kind === "confirm") { reached(); await resume; }
    return snapshot;
  };
  const confirming = handleMailingRequest(request({ token }, {}, "confirm"), deps);
  await paused;
  const removed = await handleMailingRequest(request({ token: unsubToken }, {}, "unsubscribe"), deps);
  assert.equal((await removed.json()).state, "unsubscribed");
  release();
  const response = await confirming;
  assert.equal(response.status, 409);
  assert.deepEqual(await response.json(), { ok: false, error: "state_changed" });
});
