#!/usr/bin/env node
// 경제 속보 쇼츠를 유튜브 「OIYO 경제 속보」 채널에 직접 올린다 (2026-11-23, YouTube Data API v3).
// Buffer 무료 3채널을 비우지 않으려고 관리 도구 없이 올린다. 인증은 OAuth 갱신 토큰 하나:
//   YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN (GitHub Actions 비밀값). 없으면 아무것도 안 하고 끝난다.
//   YT_PRIVACY: private(기본) | unlisted | public. 구글 API 심사 전에는 무엇을 넣어도 유튜브가 비공개로 잠근다.
//   YT_CHANNEL_ID: 넣어 두면 토큰의 채널이 다를 때 올리지 않는다(다른 채널에 잘못 올라가는 것 방지).
// 같은 날 두 번 올리지 않는다: --prev 의 JSON(econ-shorts 브랜치의 그날 파일)에 youtube.id 가 있으면 건너뛴다.
//
//   node scripts/upload-econ-short.mjs --json out/2026-11-23.json --video out/2026-11-23.mp4 [--prev keep/2026-11-23.json]
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";

const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };
const env = process.env;

export function videoResource(meta, privacy = "private") {
  return {
    snippet: {
      title: meta.youtube.title.slice(0, 100),
      description: meta.youtube.description.slice(0, 4900),
      categoryId: meta.youtube.categoryId || "25",
      defaultLanguage: "ko",
      tags: ["경제뉴스", "경제속보", "공식발표", "금리", "환율", "Shorts"],
    },
    status: {
      privacyStatus: ["private", "unlisted", "public"].includes(privacy) ? privacy : "private",
      selfDeclaredMadeForKids: false,
      containsSyntheticMedia: false,
      embeddable: true,
    },
  };
}

async function token() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.YT_CLIENT_ID, client_secret: env.YT_CLIENT_SECRET, refresh_token: env.YT_REFRESH_TOKEN, grant_type: "refresh_token" }),
  });
  const j = await res.json();
  if (!res.ok || !j.access_token) throw new Error(`토큰 갱신 실패 ${res.status} ${j.error || ""} ${j.error_description || ""}`);
  return j.access_token;
}

async function main() {
  const jsonPath = arg("--json"), videoPath = arg("--video"), prevPath = arg("--prev");
  if (!env.YT_CLIENT_ID || !env.YT_CLIENT_SECRET || !env.YT_REFRESH_TOKEN) {
    console.log("유튜브 비밀값(YT_CLIENT_ID·YT_CLIENT_SECRET·YT_REFRESH_TOKEN)이 없어 업로드를 건너뜁니다.");
    return;
  }
  if (prevPath && existsSync(prevPath)) {
    const prev = JSON.parse(readFileSync(prevPath, "utf8"));
    if (prev.youtubeUpload?.id) {
      console.log(`오늘 영상은 이미 올렸습니다: https://youtu.be/${prev.youtubeUpload.id}`);
      const meta = JSON.parse(readFileSync(jsonPath, "utf8"));
      writeFileSync(jsonPath, JSON.stringify({ ...meta, youtubeUpload: prev.youtubeUpload }, null, 2) + "\n");
      return;
    }
  }
  const meta = JSON.parse(readFileSync(jsonPath, "utf8"));
  const access = await token();
  const auth = { Authorization: `Bearer ${access}` };

  const ch = await (await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: auth })).json();
  const channel = ch.items?.[0];
  if (!channel) throw new Error(`채널을 찾지 못했습니다: ${JSON.stringify(ch.error || ch).slice(0, 300)}`);
  console.log(`채널: ${channel.snippet.title} (${channel.id})`);
  if (env.YT_CHANNEL_ID && env.YT_CHANNEL_ID !== channel.id) throw new Error(`토큰 채널(${channel.id})이 YT_CHANNEL_ID(${env.YT_CHANNEL_ID})와 다릅니다. 올리지 않습니다.`);

  const size = statSync(videoPath).size;
  const init = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": String(size) },
    body: JSON.stringify(videoResource(meta, env.YT_PRIVACY || "private")),
  });
  const location = init.headers.get("location");
  if (!init.ok || !location) throw new Error(`업로드 시작 실패 ${init.status} ${(await init.text()).slice(0, 400)}`);
  const put = await fetch(location, { method: "PUT", headers: { ...auth, "Content-Type": "video/mp4", "Content-Length": String(size) }, body: readFileSync(videoPath) });
  const video = await put.json();
  if (!put.ok || !video.id) throw new Error(`업로드 실패 ${put.status} ${JSON.stringify(video).slice(0, 400)}`);
  const result = { id: video.id, url: `https://youtu.be/${video.id}`, channelId: channel.id, privacy: video.status?.privacyStatus, uploadedAt: new Date().toISOString() };
  writeFileSync(jsonPath, JSON.stringify({ ...meta, youtubeUpload: result }, null, 2) + "\n");
  console.log(`업로드 완료: ${result.url} (${result.privacy})`);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e.message || e); process.exit(1); });
