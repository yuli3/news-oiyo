// Shared article fetch for list-summary fill and detail excerpts.
// Extracted from collect-news HN og/meta helpers (2026-10-05).
// Soft-fail: callers must not abort collect on one bad URL.

export const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

/** Hosts with no usable article body for summarization. */
export const SKIP_ARTICLE_HOST =
  /^(?:[\w-]+\.)*(?:youtube\.com|youtu\.be|github\.com|x\.com|twitter\.com)$/i;

export const HTML_BYTE_CAP = 200_000;
export const EXCERPT_CHAR_CAP = 4_000;
export const LIST_SUMMARY_CAP = 240;
export const FETCH_TIMEOUT_MS = 12_000;
export const MAX_REDIRECTS = 5;

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  "#39": "'",
  "#x27": "'",
  "#x2F": "/",
  "#47": "/",
};

export function decodeEntities(s) {
  return String(s ?? "").replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, name) => {
    const key = name.toLowerCase();
    if (ENTITIES[key] !== undefined) return ENTITIES[key];
    if (/^#x/.test(key)) return String.fromCodePoint(parseInt(key.slice(2), 16));
    if (/^#\d+$/.test(key)) return String.fromCodePoint(parseInt(key.slice(1), 10));
    return whole;
  });
}

/** Strip tags, decode entities, collapse space. Cap length; drop URL-only lines. */
export function cleanText(s, max = LIST_SUMMARY_CAP) {
  const text = decodeEntities(String(s ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (!text || /^https?:\/\/\S+$/.test(text)) return "";
  if (max > 0 && text.length > max) return `${text.slice(0, max - 1).trimEnd()}…`;
  return text;
}

export function httpUrl(raw) {
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

/** Private / link-local / loopback — SSRF block. */
export function blockedHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  if (host === "::1" || host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd")) return true;
  return false;
}

export function shouldSkipArticle(url) {
  const u = httpUrl(url);
  if (!u || blockedHost(u.hostname)) return true;
  return SKIP_ARTICLE_HOST.test(u.hostname);
}

export function metaContent(html, attr, value) {
  const want = value.toLowerCase();
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs = {};
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? "";
    }
    if ((attrs[attr] ?? "").toLowerCase() === want && attrs.content?.trim()) return attrs.content;
  }
  return "";
}

function pageTitle(html) {
  const og = metaContent(html, "property", "og:title") || metaContent(html, "name", "og:title");
  if (og.trim()) return decodeEntities(og).replace(/\s+/g, " ").trim();
  const t = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  return t ? decodeEntities(t).replace(/\s+/g, " ").trim() : "";
}

/** First visible paragraphs (or stripped body), capped for agent summarization. */
export function firstVisibleParagraphs(html, max = EXCERPT_CHAR_CAP) {
  const body = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const paras = [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((t) => t.length >= 40);
  if (paras.length) {
    let out = "";
    for (const p of paras) {
      const next = out ? `${out} ${p}` : p;
      if (next.length > max) {
        out = out || p.slice(0, max);
        break;
      }
      out = next;
      if (out.length >= Math.min(max, 800)) break;
    }
    return out.slice(0, max);
  }
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Prefer og:description, then meta description, then body paragraphs.
 * Returns { excerptSource, excerptText, title } with excerptText already cleaned/capped.
 */
export function extractExcerpt(html, { excerptMax = EXCERPT_CHAR_CAP } = {}) {
  const title = pageTitle(html) || undefined;
  const og = metaContent(html, "property", "og:description") || metaContent(html, "name", "og:description");
  const meta = metaContent(html, "name", "description");
  if (og.trim()) {
    const excerptText = cleanText(og, excerptMax);
    if (excerptText) return { excerptSource: "og", excerptText, title };
  }
  if (meta.trim()) {
    const excerptText = cleanText(meta, excerptMax);
    if (excerptText) return { excerptSource: "meta", excerptText, title };
  }
  const body = firstVisibleParagraphs(html, excerptMax);
  const excerptText = cleanText(body, excerptMax);
  if (excerptText) return { excerptSource: "body", excerptText, title };
  return { excerptSource: null, excerptText: "", title };
}

/** Short list-line from HTML (≤240). Same priority as extractExcerpt. */
export function listSummaryFromHtml(html) {
  const { excerptText } = extractExcerpt(html, { excerptMax: LIST_SUMMARY_CAP });
  return excerptText;
}

export async function readCappedText(res, max = HTML_BYTE_CAP) {
  const reader = res.body?.getReader?.();
  if (!reader) return "";
  const chunks = [];
  let size = 0;
  try {
    while (size < max) {
      const { done, value } = await reader.read();
      if (done) break;
      const room = max - size;
      const slice = value.byteLength > room ? value.subarray(0, room) : value;
      chunks.push(slice);
      size += slice.byteLength;
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      /* cap cut-off */
    }
  }
  const buf = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    buf.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const charset = (res.headers.get("content-type") ?? "").match(/charset=([^;\s]+)/i)?.[1]?.replace(/["']/g, "");
  try {
    return new TextDecoder(charset || "utf-8").decode(buf);
  } catch {
    return new TextDecoder().decode(buf);
  }
}

/**
 * Fetch HTML with manual redirects, size cap, timeout, SSRF/skip checks.
 * Returns "" on soft failure (caller maps to status).
 */
export async function fetchArticleHtml(start, { timeoutMs = FETCH_TIMEOUT_MS, userAgent = UA } = {}) {
  let current = start;
  for (let hop = 0; hop < MAX_REDIRECTS; hop++) {
    if (shouldSkipArticle(current)) return { html: "", error: "skipped_host" };
    let res;
    try {
      res = await fetch(current, {
        redirect: "manual",
        headers: { "User-Agent": userAgent, Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1" },
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (error) {
      return { html: "", error: error instanceof Error ? error.message : String(error) };
    }
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      try {
        await res.body?.cancel();
      } catch {
        /* redirect body */
      }
      if (!loc) return { html: "", error: "redirect_without_location" };
      try {
        current = new URL(loc, current).href;
      } catch {
        return { html: "", error: "bad_redirect" };
      }
      continue;
    }
    if (!res.ok) {
      try {
        await res.body?.cancel();
      } catch {
        /* error body */
      }
      return { html: "", error: `HTTP ${res.status}` };
    }
    const type = res.headers.get("content-type") ?? "";
    if (type && !/html|xml|\btext\//i.test(type)) {
      try {
        await res.body?.cancel();
      } catch {
        /* non-html */
      }
      return { html: "", error: `non_html:${type}` };
    }
    return { html: await readCappedText(res), error: null };
  }
  return { html: "", error: "too_many_redirects" };
}

/**
 * Structured fetch for detail seeding / list summary.
 * @returns {{ status: 'ok'|'skipped'|'failed', excerptSource: string|null, excerptText: string, title?: string, fetchedAt: string, error?: string }}
 */
export async function fetchArticleExcerpt(url, opts = {}) {
  const fetchedAt = new Date().toISOString();
  if (shouldSkipArticle(url)) {
    return { status: "skipped", excerptSource: null, excerptText: "", fetchedAt, error: "skipped_host" };
  }
  const { html, error } = await fetchArticleHtml(url, opts);
  if (!html) {
    return {
      status: error === "skipped_host" ? "skipped" : "failed",
      excerptSource: null,
      excerptText: "",
      fetchedAt,
      error: error || "empty_body",
    };
  }
  const extracted = extractExcerpt(html, { excerptMax: opts.excerptMax ?? EXCERPT_CHAR_CAP });
  if (!extracted.excerptText) {
    return { status: "failed", excerptSource: null, excerptText: "", title: extracted.title, fetchedAt, error: "no_excerpt" };
  }
  return {
    status: "ok",
    excerptSource: extracted.excerptSource,
    excerptText: extracted.excerptText,
    title: extracted.title,
    fetchedAt,
  };
}

/** Simple concurrency pool. */
export async function mapPool(items, concurrency, worker) {
  const pending = [...items];
  let cursor = 0;
  const results = new Array(items.length);
  const n = Math.min(Math.max(1, concurrency), Math.max(1, pending.length) || 1);
  if (pending.length === 0) return results;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (cursor < pending.length) {
        const i = cursor++;
        results[i] = await worker(pending[i], i);
      }
    }),
  );
  return results;
}
