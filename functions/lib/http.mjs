import { confirm, subscribe, unsubscribe } from "./mailing-list.mjs";

const ACTIONS = new Set(["subscribe", "confirm", "unsubscribe"]);

function actionFrom(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.at(-1) || "";
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function readMailingBody(request) {
  const limit = 4096;
  if (Number(request.headers.get("content-length")) > limit) return { error: "too_large" };
  const reader = request.body?.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  if (reader) {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        // Limit bytes as they arrive; request.text() would buffer arbitrary input first (2026-10-15).
        if (bytes > limit) {
          await reader.cancel();
          return { error: "too_large" };
        }
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
    } finally {
      reader.releaseLock();
    }
  }
  const type = request.headers.get("content-type") || "";
  try {
    if (type.includes("application/json")) return { data: text ? JSON.parse(text) : {} };
    const params = new URLSearchParams(text);
    const data = Object.fromEntries(params);
    if (data.consent === "on" || data.consent === "true") data.consent = true;
    else data.consent = false;
    return { data };
  } catch {
    return { error: "bad_json" };
  }
}

function clientIp(request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

async function processMailingRequest(request, deps) {
  const url = new URL(request.url);
  const action = actionFrom(url.pathname);
  if (!ACTIONS.has(action)) return json(404, { ok: false, error: "not_found" });
  if (request.method !== "POST") return json(405, { ok: false, error: "method" });

  // Same-site subdomains can also forge consent; require the exact configured origin (2026-10-15).
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(deps.origin).origin)
      || request.headers.get("sec-fetch-site") === "cross-site") {
    return json(403, { ok: false, error: "origin_not_allowed" });
  }

  const parsed = await readMailingBody(request);
  if (parsed.error === "too_large") return json(413, { ok: false, error: "too_large" });
  if (parsed.error) return json(400, { ok: false, error: "bad_json" });

  const data = parsed.data || {};
  const common = { ...deps, now: deps.now ?? Date.now() };
  let result;
  if (action === "subscribe") {
    result = await subscribe({
      ...common,
      email: data.email,
      consent: data.consent === true,
      topic: data.topic,
      lang: data.lang,
      trap: String(data.company || "").trim() !== "",
      ip: clientIp(request),
    });
  } else if (action === "confirm") {
    result = await confirm({ ...common, token: data.token });
  } else {
    result = await unsubscribe({ ...common, token: data.token });
  }

  const accept = request.headers.get("accept") || "";
  const postedForm = !(request.headers.get("content-type") || "").includes("json");
  if (postedForm && accept.includes("text/html")) {
    const dest = new URL(pageFor(action, data.topic, data.lang), deps.origin);
    dest.searchParams.set("status", result.body.state || result.body.error || "error");
    return new Response(null, {
      status: 303,
      headers: { location: dest.toString(), "cache-control": "no-store" },
    });
  }
  return json(result.status, result.body);
}

function pageFor(action, topic, lang) {
  if (action === "subscribe" && topic === "new-year-2027") return lang === "en" ? "/subscribe/new-year-2027/en/" : "/subscribe/new-year-2027/";
  if (action === "confirm") return "/subscribe/confirm/";
  if (action === "unsubscribe") return "/subscribe/unsubscribe/";
  return "/subscribe/";
}

export async function handleMailingRequest(request, deps) {
  try {
    return await processMailingRequest(request, deps);
  } catch {
    // Provider/storage errors can contain addresses and credentials; never reflect them (2026-10-15).
    return json(503, { ok: false, error: "service_unavailable" });
  }
}
