#!/usr/bin/env node
// 번역용 원문 읽기 폴백 체인 (docs/translation-workflow.md "원문 읽기" 참고).
//   1) direct fetch (브라우저형 UA)
//   2) Reddit: REDDIT_CLIENT_ID/SECRET 있으면 공식 OAuth API, 없으면 바로 Wayback (비인증 .json/old.reddit 은 쓰지 않음)
//   3) Wayback Machine (archive.org availability API)
//   4) needs-browser — Grok Bot 이 데스크톱 브라우저로 직접 읽는다.
// 페이월/캡차/Cloudflare challenge 는 우회하지 않는다. 페이월 매체는 'paywalled' 로 기록하고
// 1차 출처(보도자료, 공식 블로그)를 찾으라고 안내한다.
// 시크릿은 env 또는 .env.local(gitignored: .env.*)에서만 읽는다.
//
// 사용: node scripts/fetch-source.mjs <url> [--json] [--max-chars N]
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VERSION = "1.0.0";
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const TIMEOUT_MS = 20_000;

export const PAYWALLED = [
  "bloomberg.com", "wsj.com", "ft.com", "nytimes.com", "economist.com", "theinformation.com",
  "barrons.com", "washingtonpost.com", "businessinsider.com", "theathletic.com", "nikkei.com",
];

export function loadEnvLocal(file = join(ROOT, ".env.local")) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

const hostOf = (u) => new URL(u).hostname.replace(/^www\./, "");
export const isPaywalled = (u) => PAYWALLED.some((d) => hostOf(u) === d || hostOf(u).endsWith(`.${d}`));
export const isReddit = (u) => /(^|\.)reddit\.com$|^redd\.it$/.test(hostOf(u));
const redditUA = () =>
  `node:net.oiyo.news.fetch-source:v${VERSION} (by /u/${process.env.REDDIT_USERNAME || "oiyo_news"})`;

async function get(url, headers = {}) {
  const ctrl = AbortSignal.timeout(TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "user-agent": BROWSER_UA, "accept-language": "en-US,en;q=0.9", ...headers }, redirect: "follow", signal: ctrl });
    return { status: res.status, url: res.url, type: res.headers.get("content-type") ?? "", body: await res.text() };
  } catch (e) {
    return { status: 0, error: String(e?.message ?? e), body: "" };
  }
}

// 캡차/챌린지 페이지는 "성공"으로 치지 않는다(우회하지 않고 다음 단계로).
const CHALLENGE = /cf-chl-|\/cdn-cgi\/challenge-platform|<title>\s*(Just a moment|Attention Required|Access denied|Are you a robot)|px-captcha|g-recaptcha|h-captcha/i;

export function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg|nav|footer|header)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|blockquote|pre)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}
const titleOf = (html) => htmlToText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");

function okHtml(r) {
  return r.status >= 200 && r.status < 300 && r.body && !CHALLENGE.test(r.body.slice(0, 20000));
}

function redditListingToText(json) {
  const post = json?.[0]?.data?.children?.[0]?.data;
  if (!post) return null;
  const comments = (json?.[1]?.data?.children ?? [])
    .filter((c) => c.kind === "t1").slice(0, 15)
    .map((c) => `- (${c.data.score}) ${c.data.body}`).join("\n");
  return {
    title: post.title,
    text: [`r/${post.subreddit} · ${post.score} points`, post.url && !post.is_self ? `link: ${post.url}` : "", post.selftext, comments && `\n### Top comments\n${comments}`].filter(Boolean).join("\n\n"),
    linkedUrl: post.is_self ? null : post.url,
  };
}

const postPath = (u) => new URL(u).pathname.replace(/\/$/, "");

async function redditOAuth(url) {
  const { REDDIT_CLIENT_ID: id, REDDIT_CLIENT_SECRET: secret, REDDIT_USERNAME: user, REDDIT_PASSWORD: pass } = process.env;
  if (!id || !secret) return { method: "reddit-oauth", status: "skipped", note: "REDDIT_CLIENT_ID/SECRET 없음" };
  const form = user && pass ? new URLSearchParams({ grant_type: "password", username: user, password: pass }) : new URLSearchParams({ grant_type: "client_credentials" });
  let token;
  try {
    const res = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST", body: form, signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`, "user-agent": redditUA(), "content-type": "application/x-www-form-urlencoded" },
    });
    token = (await res.json())?.access_token;
    if (!token) return { method: "reddit-oauth", status: "failed", http: res.status, note: "토큰 발급 실패" };
  } catch (e) { return { method: "reddit-oauth", status: "failed", note: String(e) }; }
  const r = await get(`https://oauth.reddit.com${postPath(url)}?raw_json=1&limit=30`, { authorization: `bearer ${token}`, "user-agent": redditUA() });
  if (r.status !== 200) return { method: "reddit-oauth", status: "failed", http: r.status };
  const parsed = redditListingToText(JSON.parse(r.body));
  return parsed ? { method: "reddit-oauth", status: "ok", http: 200, ...parsed } : { method: "reddit-oauth", status: "failed", note: "파싱 실패" };
}

async function wayback(url) {
  const r = await get(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, { accept: "application/json" });
  let snap;
  try { snap = JSON.parse(r.body)?.archived_snapshots?.closest; } catch { /* ignore */ }
  if (!snap?.available || !snap.url) return { method: "wayback", status: "failed", http: r.status, note: "스냅샷 없음" };
  const s = await get(snap.url.replace(/^http:/, "https:"));
  if (!okHtml(s)) return { method: "wayback", status: "failed", http: s.status, archiveUrl: snap.url };
  return { method: "wayback", status: "ok", http: s.status, archiveUrl: snap.url, archivedAt: snap.timestamp, title: titleOf(s.body), text: htmlToText(s.body) };
}

export async function fetchSource(url) {
  loadEnvLocal();
  const attempts = [];
  const done = (a, extra = {}) => ({ url, result: a.status === "ok" ? "ok" : a.status, via: a.method, title: a.title ?? "", text: a.text ?? "", attempts, ...extra });

  if (isPaywalled(url)) {
    return { url, result: "paywalled", via: null, title: "", text: "", attempts,
      advice: "페이월 매체는 우회하지 않아요. 1차 출처(보도자료, 공식 블로그, 공시, 논문)를 찾아 그걸로 번역하고, 못 찾으면 translationStatus를 blocked로 두세요." };
  }

  if (isReddit(url)) {
    const o = await redditOAuth(url); attempts.push(o);
    if (o.status === "ok") return done(o, { linkedUrl: o.linkedUrl });
  } else {
    const r = await get(url);
    const a = { method: "direct", status: okHtml(r) ? "ok" : "failed", http: r.status, error: r.error };
    if (a.status === "ok") { a.title = titleOf(r.body); a.text = htmlToText(r.body); }
    else if (r.status === 200) a.note = "challenge/captcha 페이지";
    attempts.push(a);
    if (a.status === "ok") return done(a);
  }

  const w = await wayback(url); attempts.push(w);
  if (w.status === "ok") return done(w, { archiveUrl: w.archiveUrl, archivedAt: w.archivedAt });

  return { url, result: "needs-browser", via: null, title: "", text: "", attempts,
    advice: "자동 경로가 모두 막혔어요. Grok Bot이 데스크톱 브라우저로 직접 읽어요(로그인/캡차/페이월 우회 금지). 다른 에이전트는 blocked로 기록하세요." };
}

async function main() {
  const args = process.argv.slice(2);
  const url = args.find((a) => /^https?:\/\//.test(a));
  if (!url) { console.error("usage: node scripts/fetch-source.mjs <url> [--json] [--max-chars N]"); process.exit(2); }
  const maxIdx = args.indexOf("--max-chars");
  const max = maxIdx >= 0 ? Number(args[maxIdx + 1]) : 20000;
  const out = await fetchSource(url);
  out.text = out.text.slice(0, max);
  if (args.includes("--json")) console.log(JSON.stringify(out, null, 2));
  else {
    console.log(`result: ${out.result}${out.via ? ` (via ${out.via})` : ""}`);
    for (const a of out.attempts) console.log(`  - ${a.method}: ${a.status}${a.http != null ? ` [${a.http}]` : ""}${a.note ? ` ${a.note}` : ""}`);
    if (out.advice) console.log(`advice: ${out.advice}`);
    if (out.linkedUrl) console.log(`linked: ${out.linkedUrl}`);
    if (out.title) console.log(`\n# ${out.title}\n`);
    if (out.text) console.log(out.text);
  }
  process.exit(out.result === "ok" ? 0 : 3);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
