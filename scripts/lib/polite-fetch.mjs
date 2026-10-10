// Polite fetch: 429/503 backoff (Retry-After 존중) + 파일 캐시.
// 2026-10-10: Reddit r/MachineLearning 429, Yahoo 429 가 매일 반복돼서 만들었다.
// 접근 제어(Cloudflare challenge 등)를 우회하지 않는다 — 403 은 재시도하지 않고 그대로 실패로 돌려준다.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const CACHE_DIR = process.env.NEWS_FETCH_CACHE_DIR ?? join(ROOT, ".cache", "fetch");

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

/** Retry-After 헤더(초 또는 HTTP-date)를 ms 로. 없거나 이상하면 null. 상한 maxMs. */
export function retryAfterMs(value, now = Date.now(), maxMs = 60_000) {
  if (!value) return null;
  const s = String(value).trim();
  let ms = null;
  if (/^\d+(\.\d+)?$/.test(s)) ms = Number(s) * 1000;
  else if (!Number.isNaN(Date.parse(s))) ms = Date.parse(s) - now;
  if (ms == null || !Number.isFinite(ms)) return null;
  return Math.min(Math.max(ms, 0), maxMs);
}

/**
 * Reddit 식 x-ratelimit-remaining / x-ratelimit-reset(초) 헤더. 비로그인 RSS 는
 * 2026-10-10 실측으로 "1회 쓰면 remaining 0, reset ~60s" 였다 — 즉 IP 당 분당 1회.
 */
export function rateLimitInfo(headers, maxMs = 90_000) {
  const get = (k) => headers?.get?.(k);
  const remaining = Number.parseFloat(get("x-ratelimit-remaining") ?? "");
  const reset = Number.parseFloat(get("x-ratelimit-reset") ?? "");
  return {
    remaining: Number.isFinite(remaining) ? remaining : null,
    resetMs: Number.isFinite(reset) ? Math.min(Math.max(reset * 1000, 0), maxMs) : null,
  };
}

/** 지수 백오프 + 지터. attempt 는 0 부터. */
export function backoffMs(attempt, { baseMs = 2000, maxMs = 30_000, random = Math.random } = {}) {
  const exp = Math.min(maxMs, baseMs * 2 ** attempt);
  return Math.round(exp / 2 + random() * (exp / 2));
}

function cachePath(key) {
  return join(CACHE_DIR, `${key.replace(/[^a-zA-Z0-9._-]+/g, "_")}.txt`);
}

export function readCache(key, maxAgeMs) {
  const p = cachePath(key);
  if (!existsSync(p)) return null;
  const age = Date.now() - statSync(p).mtimeMs;
  if (maxAgeMs != null && age > maxAgeMs) return null;
  return { text: readFileSync(p, "utf8"), ageMs: age };
}

export function writeCache(key, text) {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cachePath(key), text);
  } catch { /* 캐시는 best-effort */ }
}

/**
 * GET with backoff on 429/5xx. Optional cache: fresh hit (ttlMs) skips the network;
 * on final failure a stale copy (staleMs) is returned with stale=true.
 * @returns {Promise<{ text: string, status: number|null, error: string|null, fromCache: boolean, stale: boolean }>}
 */
export async function politeGet(url, {
  headers = {},
  retries = 3,
  baseMs = 2000,
  maxWaitMs = 30_000,
  timeoutMs = 20_000,
  cacheKey = null,
  ttlMs = 0,
  staleMs = 3 * 86_400_000,
  fetchImpl = fetch,
  sleepImpl = sleep,
  log = (m) => console.error(m),
} = {}) {
  if (cacheKey && ttlMs > 0) {
    const hit = readCache(cacheKey, ttlMs);
    if (hit) return { text: hit.text, status: 200, error: null, fromCache: true, stale: false };
  }
  let lastError = null;
  let lastStatus = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    let res;
    try {
      res = await fetchImpl(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = null;
      if (attempt < retries) await sleepImpl(backoffMs(attempt, { baseMs, maxMs: maxWaitMs }));
      continue;
    }
    lastStatus = res.status;
    if (res.ok) {
      const text = await res.text();
      if (cacheKey) writeCache(cacheKey, text);
      return { text, status: res.status, error: null, fromCache: false, stale: false, rateLimit: rateLimitInfo(res.headers) };
    }
    try { await res.body?.cancel(); } catch { /* ignore */ }
    lastError = `HTTP ${res.status}`;
    if (!RETRYABLE.has(res.status) || attempt >= retries) break;
    const ra = retryAfterMs(res.headers.get("retry-after"), Date.now(), maxWaitMs);
    const reset = rateLimitInfo(res.headers, maxWaitMs).resetMs;
    const wait = (ra || null) ?? (reset != null ? reset + 1000 : null) ?? backoffMs(attempt, { baseMs, maxMs: maxWaitMs });
    log(`  ${lastError} ${url} — ${Math.round(wait / 1000)}s 후 재시도 (${attempt + 1}/${retries})`);
    await sleepImpl(wait);
  }
  if (cacheKey) {
    const stale = readCache(cacheKey, staleMs);
    if (stale) {
      log(`  ${lastError} ${url} — 캐시(${Math.round(stale.ageMs / 60_000)}분 전) 사용`);
      return { text: stale.text, status: lastStatus, error: lastError, fromCache: true, stale: true };
    }
  }
  return { text: "", status: lastStatus, error: lastError, fromCache: false, stale: false };
}
