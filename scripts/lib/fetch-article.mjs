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
  mdash: "—",
  ndash: "–",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  middot: "·",
  copy: "©",
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
    if (excerptText && !isThinExcerpt(excerptText, { title })) return { excerptSource: "og", excerptText, title };
  }
  if (meta.trim()) {
    const excerptText = cleanText(meta, excerptMax);
    if (excerptText && !isThinExcerpt(excerptText, { title })) return { excerptSource: "meta", excerptText, title };
  }
  const body = firstVisibleParagraphs(html, excerptMax);
  const excerptText = cleanText(body, excerptMax);
  if (excerptText && !isThinExcerpt(excerptText, { title })) return { excerptSource: "body", excerptText, title };
  // Nothing better: keep the best thin candidate but flag it so callers can mark it thin.
  const fallback = [["og", og], ["meta", meta], ["body", body]]
    .map(([src, v]) => [src, cleanText(v, excerptMax)]).find(([, v]) => v);
  if (fallback) return { excerptSource: fallback[0], excerptText: fallback[1], title, thin: true };
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
    ...(extracted.thin ? { thin: true } : {}),
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

// ---------------------------------------------------------------------------
// Primary-source resolution (2026-10-07).
// HN·GeekNews·Lobsters·Reddit are curators: they tell us *where* a story is
// being discussed, not what it says. Detail summaries must be written from the
// 1st-party page (official blog, article, paper, release notes). Curator text
// is only a marked fallback (detailOrigin = "curator").

/** Hosts that are discussion/curation pages, never a primary source. */
export const CURATOR_HOST =
  /^(?:[\w-]+\.)*(?:news\.ycombinator\.com|news\.hada\.io|lobste\.rs|reddit\.com|redd\.it)$/i;

export function isCuratorUrl(url) {
  const u = httpUrl(url);
  return Boolean(u && CURATOR_HOST.test(u.hostname));
}

/**
 * `owner/repo` for a github.com repository URL, else null.
 * rootOnly: only the repo home page (a PR/issue/file link is not "the repo", so its
 * README is not the primary source).
 */
export function githubRepoFromUrl(url, { rootOnly = false } = {}) {
  const u = httpUrl(url);
  if (!u || !/^(?:www\.)?github\.com$/i.test(u.hostname)) return null;
  const parts = u.pathname.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  if (rootOnly && parts.length > 2) return null;
  const [owner, repo] = parts;
  if (/^(?:orgs|topics|trending|collections|sponsors|settings|marketplace|features)$/i.test(owner)) return null;
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;
  return `${owner}/${repo.replace(/\.git$/, "")}`;
}

/** Markdown/HTML README → plain text for agent summarization (no re-publication). */
export function readmeToText(md, max = EXCERPT_CHAR_CAP) {
  const text = String(md ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/[`*_>|]/g, " ");
  return cleanText(text, max);
}

/**
 * GitHub README via the public REST API (raw media type). github.com HTML stays
 * skipped; this is the sanctioned endpoint and returns the default-branch README.
 * Unauthenticated limit is 60/h — enough for one day's trending selection.
 */
export async function fetchGithubReadme(repo, { timeoutMs = FETCH_TIMEOUT_MS, excerptMax = EXCERPT_CHAR_CAP } = {}) {
  const fetchedAt = new Date().toISOString();
  if (!/^[\w.-]+\/[\w.-]+$/.test(String(repo ?? ""))) {
    return { status: "failed", excerptSource: null, excerptText: "", fetchedAt, error: "bad_repo" };
  }
  let res;
  try {
    res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
      headers: { "User-Agent": UA, Accept: "application/vnd.github.raw", "X-GitHub-Api-Version": "2022-11-28" },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    return { status: "failed", excerptSource: null, excerptText: "", fetchedAt, error: error instanceof Error ? error.message : String(error) };
  }
  if (!res.ok) {
    try { await res.body?.cancel(); } catch { /* error body */ }
    return { status: "failed", excerptSource: null, excerptText: "", fetchedAt, error: `HTTP ${res.status}` };
  }
  const excerptText = readmeToText(await readCappedText(res), excerptMax);
  if (!excerptText) return { status: "failed", excerptSource: null, excerptText: "", fetchedAt, error: "empty_readme" };
  return { status: "ok", excerptSource: "readme", excerptText, fetchedAt };
}

/** First external link in a curator HTML fragment (GeekNews topic body, Reddit [link]). */
export function firstExternalLink(html, { exclude = CURATOR_HOST } = {}) {
  for (const m of String(html ?? "").matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    const href = decodeEntities(m[1]);
    const u = httpUrl(href);
    if (!u || u.protocol !== "https:" || blockedHost(u.hostname)) continue;
    if (exclude.test(u.hostname)) continue;
    if (/(?:^|\.)(?:redditmedia\.com|redditstatic\.com|gstatic\.com|googleapis\.com|googletagmanager\.com)$/i.test(u.hostname)) continue;
    return u.href;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Thin excerpt detection (2026-10-10).
// 10-08·10-09 에 "submitted by /u/…" 나 사이트 슬로건(Hugging Face 의 "We're on a
// journey to advance…") 만 excerpt 로 들어갔다. 요약 근거가 될 수 없으므로 thin 으로 본다.
const THIN_PATTERNS = [
  /^submitted by \/?u\/[\w-]+(\s*\[(?:link|comments)\])*\s*$/i,
  /^\[?(?:link|comments)\]?$/i,
  /we[’']re on a journey to advance and democratize artificial intelligence/i,
  /^(?:the )?home of [\w\s]+$/i,
  /^(?:sign in|log in|just a moment|access denied|enable javascript)/i,
  // CSS/JS 가 본문으로 새어 나온 경우(예: ".a-svg--picto-podcast{background:url(…)").
  /^[.#@]?[\w-]+(?:[\s,>.#:-][\w-]*)*\s*\{[\w-]+\s*:/,
];

/** Known tagline / boilerplate per host — exact-ish site slogans that are never article text. */
export const SITE_TAGLINES = [
  "We’re on a journey to advance and democratize artificial intelligence through open source and open science.",
  "We're on a journey to advance and democratize artificial intelligence through open source and open science.",
  "GitHub is where people build software.",
  "Contribute to development by creating an account on GitHub.",
];

/**
 * True when the text cannot serve as a summary basis: empty, very short,
 * a "submitted by /u/x" Reddit stub, or a site tagline/slogan.
 * `title` (optional) — an excerpt that only repeats the title is thin too.
 */
export function isThinExcerpt(text, { title = "", minChars = 60 } = {}) {
  const t = cleanText(String(text ?? "").replace(/submitted by\s+\/?u\/[\w-]+/gi, " ").replace(/\[(?:link|comments)\]/gi, " "), 0);
  const raw = cleanText(text, 0);
  if (!raw) return true;
  if (THIN_PATTERNS.some((re) => re.test(raw))) return true;
  if (SITE_TAGLINES.some((s) => raw.startsWith(s.slice(0, 50)) && raw.length < s.length + 40)) return true;
  if (!t || t.length < minChars) return true;
  if (title && t.toLowerCase().replace(/\W+/g, "") === String(title).toLowerCase().replace(/\W+/g, "")) return true;
  return false;
}
