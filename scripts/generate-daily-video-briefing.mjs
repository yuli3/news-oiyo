#!/usr/bin/env node
/**
 * scripts/generate-daily-video-briefing.mjs
 *
 * 당일(또는 최신 날짜) `src/data/news.json` 의 AI·금융 주요 헤드라인을 읽어
 * 1) 60초 세로형(9:16, 1080x1920, 30fps) 씬 타임라인 + TTS 대본 JSON
 * 2) Hyperframes / Headless Chromium 프레임 캡처용 9:16 HTML5 스토리보드
 * 를 `reports/video-briefings/<date>-*` 로 생성한다.
 *
 * WHY (2026-10-17 yt-shorts / insta-reels / yt-video-news):
 * - 특정 런타임 플러그인이 아닌 repo 소유 단일 명령(`npm run video:briefing`)으로
 *   매일 쇼츠·릴스·영상 뉴스 대본과 9:16 렌더 템플릿을 결정론적으로 생성한다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storySections } from "./lib/story-scope.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const newsPath = path.resolve(__dirname, "../src/data/news.json");
const outDir = path.resolve(__dirname, "../reports/video-briefings");

const news = JSON.parse(fs.readFileSync(newsPath, "utf8"));
const days = Array.isArray(news.days) ? news.days : [];
const targetDateArg = process.argv.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const targetDay =
  (targetDateArg ? days.find((d) => d.date === targetDateArg) : null) ||
  days.find((d) => Array.isArray(d.items) && d.items.length > 0);

if (!targetDay) {
  console.error("생성할 뉴스 날짜를 찾지 못했습니다.");
  process.exit(1);
}

const hasHangul = (s = "") => /[가-힣]/.test(s);
const cleanText = (s = "") =>
  String(s)
    .replace(/\s+/g, " ")
    .trim();

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

const sceneDurations = [11, 11, 10, 10, 9];
let cursorSec = 5;

const scenes = [
  {
    id: "scene-0-hook",
    startSec: 0,
    endSec: 5,
    durationSec: 5,
    startFrame: 0,
    endFrame: 150,
    badge: `${targetDay.date} OIYO 60초 브리핑`,
    headline: "오늘 놓치면 안 될 AI·금융 핵심 뉴스 5선",
    subline: cleanText(targetDay.summary || "출처와 함께 핵심만 짚어드립니다."),
    narration: `${targetDay.date} 오이요 60초 AI·금융 브리핑입니다. 오늘 가장 중요한 소식 다섯 가지를 빠르게 짚어드립니다.`,
  },
];

picked.forEach((entry, idx) => {
  const dur = sceneDurations[idx] ?? 10;
  const startSec = cursorSec;
  const endSec = cursorSec + dur;
  cursorSec = endSec;
  const title = cleanText(entry.item.title);
  const summary = cleanText(entry.item.detailSummary || entry.item.summary || entry.item.title).slice(0, 140);
  const sourceLabel = cleanText(entry.item.source || entry.item.sourceId || "출처 확인");

  scenes.push({
    id: `scene-${idx + 1}-${entry.desk.toLowerCase()}-${entry.rank}`,
    startSec,
    endSec,
    durationSec: dur,
    startFrame: startSec * 30,
    endFrame: endSec * 30,
    badge: `${entry.desk} #${entry.rank} · ${sourceLabel}`,
    headline: title,
    subline: summary,
    sourceUrl: entry.item.url,
    narration: `${entry.desk} ${entry.rank}번째 소식입니다. ${title}. ${summary}`,
  });
});

scenes.push({
  id: "scene-outro-cta",
  startSec: cursorSec,
  endSec: 60,
  durationSec: Math.max(4, 60 - cursorSec),
  startFrame: cursorSec * 30,
  endFrame: 1800,
  badge: "news.oiyo.net · show.oiyo.net",
  headline: "원문 출처와 상세 요약은 news.oiyo.net에서 확인하세요",
  subline: "내가 만든 AI 작품 자랑은 show.oiyo.net 주간 쇼케이스에서!",
  narration: "원문 링크와 전체 요약은 뉴스 점 오이요 점 넷에서 보실 수 있습니다.",
});

const spec = {
  schema: "oiyo.daily-video-briefing.v1",
  date: targetDay.date,
  generatedAt: new Date().toISOString(),
  format: {
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    fps: 30,
    durationSec: 60,
    totalFrames: 1800,
  },
  narrationFullText: scenes.map((s) => s.narration).join("\n\n"),
  socialMetadata: {
    youtubeShortsTitle: `[${targetDay.date}] 오늘의 AI·금융 1분 핵심 브리핑 | OIYO News #Shorts`,
    instagramReelsCaption: `📌 ${targetDay.date} AI·금융 60초 핵심 브리핑\n\n${picked
      .map((p, i) => `${i + 1}. [${p.desk}] ${cleanText(p.item.title)}`)
      .join("\n")}\n\n🔗 원문 출처·상세 요약: news.oiyo.net\n✨ AI 창작 쇼케이스: show.oiyo.net\n#AI뉴스 #금융브리핑 #생성형AI #재테크 #OIYO`,
  },
  scenes,
};

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1080, initial-scale=1.0" />
  <title>${escapeHtml(targetDay.date)} OIYO 60s Briefing (9:16)</title>
  <style>
    :root {
      --bg: #111a14;
      --card: #1a271e;
      --ink: #f3f7f2;
      --muted: #a6b9ab;
      --accent: #84cc16;
      --border: #2c4033;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 0%, #1f3325 0%, var(--bg) 70%);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 96px 72px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--border);
      padding-bottom: 28px;
    }
    .brand { font-size: 42px; font-weight: 900; letter-spacing: -0.03em; }
    .brand span { color: var(--accent); }
    .date-pill {
      background: rgba(132, 204, 22, 0.16);
      color: var(--accent);
      border: 2px solid var(--accent);
      padding: 10px 24px;
      border-radius: 999px;
      font-size: 28px;
      font-weight: 800;
    }
    .deck {
      display: flex;
      flex-direction: column;
      gap: 28px;
      my: auto;
    }
    .scene-card {
      background: var(--card);
      border: 2px solid var(--border);
      border-radius: 28px;
      padding: 34px 38px;
    }
    .scene-badge {
      display: inline-block;
      color: var(--accent);
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .scene-title {
      font-size: 36px;
      line-height: 1.32;
      font-weight: 850;
      margin-bottom: 12px;
    }
    .scene-sub {
      font-size: 26px;
      line-height: 1.45;
      color: var(--muted);
    }
    footer {
      border-top: 2px solid var(--border);
      padding-top: 28px;
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      color: var(--muted);
      font-weight: 700;
    }
    footer strong { color: var(--accent); }
  </style>
</head>
<body>
  <header>
    <div class="brand">OIYO <span>news</span></div>
    <div class="date-pill">${escapeHtml(targetDay.date)} · 60s BRIEFING</div>
  </header>
  <main class="deck">
    ${picked
      .map(
        (entry) => `
    <article class="scene-card">
      <div class="scene-badge">${escapeHtml(entry.desk)} #${entry.rank} · ${escapeHtml(entry.item.source || entry.item.sourceId || "")}</div>
      <h2 class="scene-title">${escapeHtml(cleanText(entry.item.title))}</h2>
      <p class="scene-sub">${escapeHtml(cleanText(entry.item.detailSummary || entry.item.summary || "").slice(0, 110))}</p>
    </article>`
      )
      .join("\n")}
  </main>
  <footer>
    <span>원문·상세 요약 <strong>news.oiyo.net</strong></span>
    <span>AI 창작 쇼케이스 <strong>show.oiyo.net</strong></span>
  </footer>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
const jsonPath = path.join(outDir, `${targetDay.date}-briefing.json`);
const htmlPath = path.join(outDir, `${targetDay.date}-vertical-9x16.html`);
fs.writeFileSync(jsonPath, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
fs.writeFileSync(htmlPath, html, "utf8");
console.log(`video briefing generated: date=${targetDay.date} scenes=${scenes.length} json=${path.relative(process.cwd(), jsonPath)} html=${path.relative(process.cwd(), htmlPath)}`);
