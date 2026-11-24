#!/usr/bin/env node
// 유튜브 반응 모으기 (2026-11-24). 매일 아침 요약(프로젝트 스레드 「메일·소셜 반응 확인 자동화」)이 읽는다.
// 경제 속보 업로더와 같은 OAuth 갱신 토큰(youtube.readonly 포함)을 쓴다. 공개 댓글·통계만 읽고 아무것도 쓰지 않는다.
//   YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN: 없으면 아무것도 안 하고 끝난다.
//   YT_WATCH_CHANNELS: 쉼표로 구분한 채널 ID. 토큰 채널(「OIYO 경제 속보」)은 항상 포함된다.
//     기본값은 집사 공감툰 채널(UCjhM7iAyQ1EZLyl4_gze_cw).
//   SINCE_HOURS: 이 시간 안에 달리거나 고쳐진 댓글만 (기본 26).
// 결과: --out 경로에 JSON, 표준 출력과 GITHUB_STEP_SUMMARY 에 사람이 읽는 요약.
//
//   node scripts/youtube-reactions.mjs --out out/youtube-reactions.json
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const API = "https://www.googleapis.com/youtube/v3";
const DEFAULT_CHANNELS = ["UCjhM7iAyQ1EZLyl4_gze_cw"];

const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };

export function recentComments(threads, sinceMs) {
  const out = [];
  for (const t of threads || []) {
    const top = t.snippet?.topLevelComment?.snippet;
    if (!top) continue;
    const when = Date.parse(top.updatedAt || top.publishedAt);
    if (!(when >= sinceMs)) continue;
    out.push({
      videoId: top.videoId || t.snippet.videoId || null,
      author: top.authorDisplayName || "",
      text: String(top.textOriginal ?? top.textDisplay ?? "").replace(/\s+/g, " ").trim().slice(0, 300),
      likes: top.likeCount || 0,
      replies: t.snippet.totalReplyCount || 0,
      at: top.publishedAt,
    });
  }
  return out.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
}

export function renderSummary(report) {
  const lines = [`# 유튜브 반응 (${report.since} 이후)`, ""];
  for (const ch of report.channels) {
    lines.push(`## ${ch.title} (${ch.id})`);
    if (ch.error) { lines.push(`- 읽기 실패: ${ch.error}`, ""); continue; }
    lines.push(`- 구독자 ${ch.subscribers ?? "?"} · 총 조회 ${ch.views ?? "?"} · 영상 ${ch.videoCount ?? "?"}`);
    if (ch.commentsNote) lines.push(`- 댓글: ${ch.commentsNote}`);
    lines.push(`- 새 댓글 ${ch.comments.length}개`);
    for (const c of ch.comments) lines.push(`  - [${c.at}] ${c.author}: ${c.text} (좋아요 ${c.likes}, 답글 ${c.replies}) https://youtu.be/${c.videoId}`);
    if (ch.recentVideos.length) {
      lines.push("- 최근 영상");
      for (const v of ch.recentVideos) lines.push(`  - ${v.publishedAt.slice(0, 10)} ${v.title} · ${v.privacy} · 조회 ${v.views} · 좋아요 ${v.likes} · 댓글 ${v.comments}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

async function token(env) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.YT_CLIENT_ID, client_secret: env.YT_CLIENT_SECRET, refresh_token: env.YT_REFRESH_TOKEN, grant_type: "refresh_token" }),
  });
  const j = await res.json();
  if (!res.ok || !j.access_token) throw new Error(`토큰 갱신 실패 ${res.status} ${j.error || ""}`);
  return j.access_token;
}

async function main() {
  const env = process.env;
  if (!env.YT_CLIENT_ID || !env.YT_CLIENT_SECRET || !env.YT_REFRESH_TOKEN) {
    console.log("유튜브 비밀값이 없어 건너뜁니다.");
    return;
  }
  const outPath = arg("--out") || "out/youtube-reactions.json";
  const sinceMs = Date.now() - Number(env.SINCE_HOURS || 26) * 3600e3;
  const auth = { Authorization: `Bearer ${await token(env)}` };
  const get = async (path) => {
    const res = await fetch(`${API}/${path}`, { headers: auth });
    const j = await res.json();
    if (!res.ok) throw new Error(`${res.status} ${j.error?.errors?.[0]?.reason || j.error?.message || ""}`.trim());
    return j;
  };

  const mine = (await get("channels?part=id&mine=true")).items?.[0]?.id;
  const watch = (env.YT_WATCH_CHANNELS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ids = [...new Set([mine, ...(watch.length ? watch : DEFAULT_CHANNELS)].filter(Boolean))];

  const channels = [];
  for (const id of ids) {
    const ch = { id, title: id, comments: [], recentVideos: [] };
    try {
      const info = (await get(`channels?part=snippet,statistics,contentDetails&id=${id}`)).items?.[0];
      if (!info) throw new Error("채널 없음");
      ch.title = info.snippet.title;
      ch.subscribers = info.statistics.hiddenSubscriberCount ? "비공개" : Number(info.statistics.subscriberCount);
      ch.views = Number(info.statistics.viewCount);
      ch.videoCount = Number(info.statistics.videoCount);
      try {
        const threads = await get(`commentThreads?part=snippet&allThreadsRelatedToChannelId=${id}&maxResults=50&order=time`);
        ch.comments = recentComments(threads.items, sinceMs);
      } catch (e) {
        ch.commentsNote = `읽지 못함 (${e.message})`;
      }
      const uploads = info.contentDetails?.relatedPlaylists?.uploads;
      if (uploads) {
        const items = (await get(`playlistItems?part=contentDetails&playlistId=${uploads}&maxResults=5`)).items || [];
        const vids = items.map((i) => i.contentDetails.videoId).join(",");
        if (vids) {
          const vs = (await get(`videos?part=snippet,statistics,status&id=${vids}`)).items || [];
          ch.recentVideos = vs.map((v) => ({
            id: v.id,
            title: v.snippet.title.slice(0, 80),
            publishedAt: v.snippet.publishedAt,
            privacy: v.status?.privacyStatus || "?",
            views: Number(v.statistics.viewCount || 0),
            likes: Number(v.statistics.likeCount || 0),
            comments: Number(v.statistics.commentCount || 0),
          }));
        }
      }
    } catch (e) {
      ch.error = e.message;
    }
    channels.push(ch);
  }

  const report = { generatedAt: new Date().toISOString(), since: new Date(sinceMs).toISOString(), channels };
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");
  const md = renderSummary(report);
  console.log(md);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, md + "\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
