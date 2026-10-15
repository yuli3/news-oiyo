// 로컬 전용. 127.0.0.1 에서만 듣고, 확인 메일은 .cache 아웃박스에 남긴다.
// 프로덕션 발송 키를 여기서 읽지 않는다.
import http from "node:http";
import { resolve } from "node:path";
import { handleMailingRequest } from "../functions/lib/http.mjs";
import { createLimiter } from "../functions/lib/mailing-list.mjs";
import { createDevMailer } from "../functions/lib/mailer.mjs";
import { createFileStore } from "../functions/lib/stores.mjs";

const port = Number(process.env.MAILING_LIST_PORT || 8788);
const origin = process.env.MAILING_LIST_ORIGIN || "http://127.0.0.1:4321";
const root = process.cwd();
const store = createFileStore(resolve(root, process.env.MAILING_LIST_FILE || ".cache/mailing-list.json"));
const mailer = createDevMailer(resolve(root, process.env.MAILING_LIST_OUTBOX || ".cache/mailing-list-outbox.jsonl"));
const limiter = createLimiter();

const server = http.createServer(async (nodeReq, nodeRes) => {
  try {
    const chunks = [];
    let bytes = 0;
    // Keep the socket alive long enough to return 413; the default iterator destroys it on early exit.
    for await (const chunk of nodeReq.iterator({ destroyOnReturn: false })) {
      bytes += chunk.byteLength;
      if (bytes > 4096) {
        nodeRes.writeHead(413, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", connection: "close" });
        nodeRes.end(JSON.stringify({ ok: false, error: "too_large" }));
        nodeReq.resume();
        return;
      }
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);
    const request = new Request(`http://127.0.0.1:${port}${nodeReq.url}`, {
      method: nodeReq.method,
      headers: nodeReq.headers,
      body: nodeReq.method === "GET" || nodeReq.method === "HEAD" ? undefined : body,
      duplex: "half",
    });
    const response = await handleMailingRequest(request, { store, mailer, origin, limiter, now: Date.now() });
    nodeRes.writeHead(response.status, Object.fromEntries(response.headers));
    nodeRes.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    nodeRes.writeHead(500, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    nodeRes.end(JSON.stringify({ ok: false, error: "server" }));
    console.error(error instanceof Error ? error.message : "mailing-list dev failed");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`mailing-list dev http://127.0.0.1:${server.address().port} origin ${origin}`);
});
