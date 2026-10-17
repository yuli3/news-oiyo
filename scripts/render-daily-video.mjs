#!/usr/bin/env node
/**
 * scripts/render-daily-video.mjs
 *
 * 당일 AI·금융 60초 브리핑을
 * 1) 로컬 TTS(macOS say 'Yuna' 음성) 음성 합성 및 AAC 오디오 트랙 생성
 * 2) 1080x1920 (9:16) SVG 슬라이드 생성 및 macOS sips 고해상도 PNG 변환
 * 3) FFmpeg concat demuxer를 통한 실비디오(<date>-briefing.mp4) 렌더링
 * 4) HeyGen Hyperframes 호환 매니페스트(<date>-hyperframes.json) 생성
 * 5) 오디오 동기화 인터랙티브 HTML5 웹 플레이어(<date>-player.html) 생성
 *
 * WHY (2026-10-17 OSS 트렌딩 연동 & 세로형 쇼츠/릴스 무비용 파이프라인):
 * - 클라우드 유료 API나 특정 플러그인 없이, repo 소유 단일 스크립트로
 *   YouTube Shorts / Instagram Reels용 60초 세로형 영상과 나레이션을 완전 로컬에서 생성한다.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { storySections } from "./lib/story-scope.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const newsPath = path.resolve(__dirname, "../src/data/news.json");
const outDir = path.resolve(__dirname, "../reports/video-briefings");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const news = JSON.parse(fs.readFileSync(newsPath, "utf8"));
const days = Array.isArray(news.days) ? news.days : [];
const targetDateArg = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const targetDay =
  (targetDateArg ? days.find((d) => d.date === targetDateArg) : null) ||
  days.find((d) => Array.isArray(d.items) && d.items.length > 0);

if (!targetDay) {
  console.error("❌ 생성할 뉴스 날짜를 찾지 못했습니다.");
  process.exit(1);
}

const dateStr = targetDay.date;
console.log(`🎬 [OIYO Video Pipeline] ${dateStr} 브리핑 렌더링 시작...`);

const hasHangul = (s = "") => /[가-힣]/.test(s);
const cleanText = (s = "") =>
  String(s)
    .replace(/\s+/g, " ")
    .replace(/["'<>]/g, "")
    .trim();

const escapeXml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// 줄바꿈 헬퍼
function wrapText(text, maxCharsPerLine = 22) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxCharsPerLine) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = current ? current + " " + w : w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const items = (targetDay.items || []).filter((item) => item && item.title);
const aiItems = items
  .filter((item) => storySections(item).includes("ai"))
  .sort((a, b) => Number(hasHangul(b.summary)) - Number(hasHangul(a.summary)))
  .slice(0, 3);
const financeItems = items
  .filter((item) => storySections(item).includes("finance"))
  .sort((a, b) => Number(hasHangul(b.summary)) - Number(hasHangul(a.summary)))
  .slice(0, 2);

const picked = [
  ...aiItems.map((it, idx) => ({ desk: "AI", rank: idx + 1, item: it })),
  ...financeItems.map((it, idx) => ({ desk: "금융", rank: idx + 1, item: it })),
].slice(0, 5);

const scenes = [
  {
    id: "scene-0",
    badge: `${dateStr} OIYO 60초 브리핑`,
    tag: "오늘의 헤드라인",
    headline: "오늘 놓치면 안 될 AI·금융 핵심 뉴스 5선",
    subline: cleanText(targetDay.summary || "출처와 함께 핵심만 짚어드립니다.").slice(0, 100),
    narration: `${dateStr} 오이요 60초 AI·금융 브리핑입니다. 오늘의 핵심 뉴스입니다.`,
    isHook: true,
  },
];

picked.forEach((entry, idx) => {
  const title = cleanText(entry.item.title);
  const summary = cleanText(entry.item.detailSummary || entry.item.summary || entry.item.title).slice(0, 110);
  // 간결한 나레이션으로 60초 이내 준수
  const shortTitle = title.length > 38 ? title.slice(0, 38) : title;
  scenes.push({
    id: `scene-${idx + 1}`,
    badge: `${entry.desk} #${entry.rank} · ${entry.item.source || "News"}`,
    tag: `${entry.desk} 핵심 이슈`,
    headline: title,
    subline: summary,
    sourceUrl: entry.item.url || "https://news.oiyo.net",
    narration: `${entry.desk} ${entry.rank}위 소식. ${shortTitle}.`,
    isHook: false,
    rank: idx + 1,
  });
});

scenes.push({
  id: `scene-${picked.length + 1}`,
  badge: "OIYO News",
  tag: "더 알아보기",
  headline: "자세한 뉴스 원문은 news.oiyo.net",
  subline: "매일 아침 AI가 팩트체크하고 요약하는 데일리 뉴스 포털",
  narration: "자세한 원문과 팩트체크는 프로필 링크 news.oiyo.net에서 확인하세요.",
  isHook: false,
});

const tmpDir = path.resolve(outDir, `.tmp-${dateStr}`);
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// 1. TTS 합성 (macOS say)
console.log(`🎙️ [1/4] macOS Yuna 음성으로 나레이션 오디오 합성 중...`);
const audioFiles = [];
const sceneDurations = [];

for (let i = 0; i < scenes.length; i++) {
  const sc = scenes[i];
  const aiffPath = path.resolve(tmpDir, `scene_${i}.aiff`);
  const m4aPath = path.resolve(tmpDir, `scene_${i}.m4a`);

  try {
    execSync(`say -v Yuna -o "${aiffPath}" "${sc.narration}"`);
    execSync(`ffmpeg -y -i "${aiffPath}" -c:a aac "${m4aPath}" 2>/dev/null`);
    const durStr = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${m4aPath}"`
    )
      .toString()
      .trim();
    const dur = Math.max(3.0, parseFloat(durStr) || 8.0);
    sc.duration = dur;
    sceneDurations.push(dur);
    audioFiles.push(m4aPath);
  } catch (err) {
    console.warn(`  ⚠️ Scene ${i} TTS 오류 (기본 시간 적용):`, err.message);
    sc.duration = i === 0 ? 5.0 : 11.0;
    sceneDurations.push(sc.duration);
  }
}

// 오디오 병합
const concatListPath = path.resolve(tmpDir, "audio_concat.txt");
const concatListContent = audioFiles.map((f) => `file '${f}'`).join("\n");
fs.writeFileSync(concatListPath, concatListContent, "utf8");

const fullAudioPath = path.resolve(outDir, `${dateStr}-narration.m4a`);
try {
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c:a copy "${fullAudioPath}" 2>/dev/null`);
  console.log(`  ✅ 통합 오디오 트랙 생성 완료: ${fullAudioPath}`);
} catch (e) {
  console.warn(`  ⚠️ 오디오 병합 실패:`, e.message);
}

// 2. 1080x1920 SVG 슬라이드 및 PNG 생성
console.log(`🎨 [2/4] 1080x1920 세로형 슬라이드 및 고해상도 PNG 렌더링 중...`);
const pngFiles = [];

for (let i = 0; i < scenes.length; i++) {
  const sc = scenes[i];
  const svgPath = path.resolve(tmpDir, `scene_${i}.svg`);
  const pngPath = path.resolve(tmpDir, `scene_${i}.png`);

  const headlineLines = wrapText(sc.headline, 20);
  const headlineSvg = headlineLines
    .map(
      (line, lIdx) =>
        `<tspan x="96" dy="${lIdx === 0 ? 0 : 72}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const sublineLines = wrapText(sc.subline, 24);
  const sublineSvg = sublineLines
    .map(
      (line, lIdx) =>
        `<tspan x="144" dy="${lIdx === 0 ? 0 : 54}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const progressDots = scenes
    .slice(1)
    .map((_, dotIdx) => {
      const active = i === dotIdx + 1;
      const fill = active ? "#84cc16" : "#2c4033";
      const r = active ? "10" : "7";
      return `<circle cx="${440 + dotIdx * 48}" cy="180" r="${r}" fill="${fill}" />`;
    })
    .join("");

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#1f3325" />
      <stop offset="100%" stop-color="#111a14" />
    </radialGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- 배경 -->
  <rect width="1080" height="1920" fill="url(#bgGrad)" />

  <!-- 헤더 바 -->
  <g id="header">
    <text x="96" y="190" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="44" font-weight="900" fill="#f3f7f2" letter-spacing="-1">OIYO <tspan fill="#84cc16">NEWS</tspan></text>
    ${progressDots}
    <rect x="740" y="142" width="244" height="64" rx="32" fill="#1f3325" stroke="#84cc16" stroke-width="2" />
    <text x="862" y="186" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="28" font-weight="800" fill="#84cc16" text-anchor="middle">${dateStr}</text>
  </g>

  <!-- 구분선 -->
  <line x1="96" y1="240" x2="984" y2="240" stroke="#2c4033" stroke-width="2" />

  <!-- 씬 본문 컨테이너 -->
  <g id="content">
    <!-- 씬 뱃지 -->
    <rect x="96" y="380" width="360" height="56" rx="28" fill="#1a271e" stroke="#3d5a45" stroke-width="2" />
    <circle cx="128" cy="408" r="8" fill="#84cc16" />
    <text x="152" y="418" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="26" font-weight="800" fill="#84cc16">${escapeXml(sc.badge)}</text>

    <!-- 메인 헤드라인 -->
    <text x="96" y="540" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="62" font-weight="900" fill="#ffffff" letter-spacing="-1.5">
      ${headlineSvg}
    </text>

    <!-- 요약 카드 -->
    <g filter="url(#shadow)">
      <rect x="96" y="880" width="888" height="480" rx="36" fill="#1a271e" stroke="#2c4033" stroke-width="3" />
      <rect x="144" y="930" width="130" height="42" rx="21" fill="rgba(132, 204, 22, 0.15)" />
      <text x="209" y="958" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="22" font-weight="800" fill="#84cc16" text-anchor="middle">FACT BRIEF</text>
      <text x="144" y="1040" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="34" font-weight="500" fill="#d2ded5" letter-spacing="-0.5">
        ${sublineSvg}
      </text>
    </g>

    <!-- 60초 브리핑 알림 태그 -->
    <rect x="96" y="1420" width="888" height="84" rx="24" fill="#162219" stroke="#27382d" stroke-width="2" />
    <text x="540" y="1474" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="28" font-weight="700" fill="#a6b9ab" text-anchor="middle">
      ⚡ AI·금융 매일 60초 요약 · news.oiyo.net
    </text>
  </g>

  <!-- 푸터 바 -->
  <g id="footer">
    <line x1="96" y1="1720" x2="984" y2="1720" stroke="#2c4033" stroke-width="2" />
    <text x="96" y="1780" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="30" font-weight="800" fill="#84cc16">OIYO <tspan fill="#a6b9ab">Ecosystem</tspan></text>
    <text x="984" y="1780" font-family="-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif" font-size="26" font-weight="600" fill="#889c8d" text-anchor="end">AI Showcase: show.oiyo.net</text>
  </g>
</svg>`;

  fs.writeFileSync(svgPath, svgContent, "utf8");
  try {
    execSync(`sips -s format png "${svgPath}" --out "${pngPath}" 2>/dev/null`);
    pngFiles.push(pngPath);
  } catch (err) {
    console.warn(`  ⚠️ Scene ${i} PNG 변환 실패:`, err.message);
  }
}

// 3. 비디오 렌더링 (FFmpeg)
console.log(`🎥 [3/4] FFmpeg를 통한 1080x1920 MP4 비디오 렌더링 중...`);
const videoConcatTxt = path.resolve(tmpDir, "video_concat.txt");
let videoConcatLines = "";
for (let i = 0; i < pngFiles.length; i++) {
  const dur = sceneDurations[i] || 10.0;
  videoConcatLines += `file '${pngFiles[i]}'\nduration ${dur.toFixed(2)}\n`;
}
// Concat demuxer requirement: 마지막 파일 한 번 더 기재
if (pngFiles.length > 0) {
  videoConcatLines += `file '${pngFiles[pngFiles.length - 1]}'\n`;
}
fs.writeFileSync(videoConcatTxt, videoConcatLines, "utf8");

const mp4OutPath = path.resolve(outDir, `${dateStr}-briefing.mp4`);
try {
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${videoConcatTxt}" -i "${fullAudioPath}" -c:v libx264 -pix_fmt yuv420p -r 30 -c:a aac -shortest "${mp4OutPath}" 2>/dev/null`
  );
  console.log(`  🎉 MP4 렌더링 완료: ${mp4OutPath}`);
} catch (e) {
  console.warn(`  ⚠️ MP4 렌더링 실패:`, e.message);
}

// 4. Hyperframes 매니페스트 & 웹 플레이어 생성
console.log(`📑 [4/4] Hyperframes 규격 매니페스트 및 HTML5 인터랙티브 플레이어 생성 중...`);
const hyperframesManifest = {
  version: "1.0",
  generator: "OIYO Video Briefing Pipeline",
  date: dateStr,
  resolution: { width: 1080, height: 1920, aspectRatio: "9:16" },
  fps: 30,
  audioTrack: `${dateStr}-narration.m4a`,
  scenes: scenes.map((sc, idx) => ({
    id: sc.id,
    durationSec: sc.duration,
    badge: sc.badge,
    headline: sc.headline,
    subline: sc.subline,
    slideAsset: `scenes/scene_${idx}.png`,
  })),
};
fs.writeFileSync(
  path.resolve(outDir, `${dateStr}-hyperframes.json`),
  JSON.stringify(hyperframesManifest, null, 2),
  "utf8"
);

// HTML5 웹 플레이어 (브라우저에서 바로 보고 들을 수 있는 반응형 9:16 플레이어)
const playerHtml = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${dateStr} OIYO 60초 비디오 브리핑 플레이어</title>
  <style>
    body {
      background: #0d140f;
      color: #f3f7f2;
      font-family: -apple-system, BlinkMacSystemFont, "Pretendard", sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .container {
      max-width: 480px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
    .video-viewport {
      width: 100%;
      aspect-ratio: 9/16;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      border: 2px solid #2c4033;
      background: #000;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .meta-box {
      width: 100%;
      background: #1a271e;
      border: 1px solid #2c4033;
      border-radius: 18px;
      padding: 18px;
      box-sizing: border-box;
    }
    .meta-title { font-size: 15px; font-weight: 800; color: #84cc16; margin-bottom: 8px; }
    .meta-content { font-size: 13px; color: #a6b9ab; line-height: 1.5; white-space: pre-wrap; }
    .btn {
      background: #84cc16;
      color: #111a14;
      font-weight: 800;
      border: none;
      border-radius: 12px;
      padding: 10px 16px;
      cursor: pointer;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 style="margin:0 0 8px 0; font-size:20px; font-weight:900;">OIYO 60s Briefing <span style="color:#84cc16;">${dateStr}</span></h2>
    <div class="video-viewport">
      <video controls playsinline poster=".tmp-${dateStr}/scene_0.png">
        <source src="${dateStr}-briefing.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="meta-box">
      <div class="meta-title">YouTube Shorts & Instagram Reels 메타데이터</div>
      <div class="meta-content" id="socialText">[${dateStr}] 오늘의 AI·금융 1분 핵심 브리핑 | OIYO News #Shorts

1. ${scenes[1]?.headline || ""}
2. ${scenes[2]?.headline || ""}
3. ${scenes[3]?.headline || ""}
4. ${scenes[4]?.headline || ""}
5. ${scenes[5]?.headline || ""}

🔗 원문 출처·상세 요약: news.oiyo.net
✨ AI 창작 쇼케이스: show.oiyo.net</div>
      <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('socialText').innerText); alert('복사되었습니다!');">소셜 문구 복사</button>
    </div>
  </div>
</body>
</html>`;
fs.writeFileSync(path.resolve(outDir, `${dateStr}-player.html`), playerHtml, "utf8");

console.log(`\n✨ [완료] ${dateStr} 비디오 브리핑 파이프라인 생성 완료!`);
console.log(`  - 비디오: ${mp4OutPath}`);
console.log(`  - 오디오: ${fullAudioPath}`);
console.log(`  - 매니페스트: ${path.resolve(outDir, `${dateStr}-hyperframes.json`)}`);
console.log(`  - 플레이어: ${path.resolve(outDir, `${dateStr}-player.html`)}`);
