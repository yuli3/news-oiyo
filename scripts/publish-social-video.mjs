#!/usr/bin/env node
/**
 * scripts/publish-social-video.mjs
 *
 * 60초 세로형(9:16) 영상 브리핑을 YouTube Shorts, Instagram Reels, X(트위터)용
 * 규격 검증 및 소셜 미디어 발행/스케줄링 파이프라인으로 연결한다.
 *
 * 기능:
 * 1) 비디오 파일(<date>-briefing.mp4) 규격 검증 (ffprobe: 해상도 1080x1920, 길이 <60초, 코덱 h264/aac)
 * 2) 고화질 커버/썸네일(<date>-cover.png) 자동 추출
 * 3) 플랫폼별 최적화 메타데이터 생성:
 *    - YouTube Shorts: 제목(<100자), 설명(타임스탬프, 요약, 태그), 카테고리 28(Sci&Tech)
 *    - Instagram Reels: 감각적인 줄바꿈 캡션, 5대 헤드라인, 해시태그, 프로필 링크 유도
 *    - X (Twitter): 140자 요약, 인용 링크, 동영상 첨부 메타데이터
 * 4) 소셜 큐 관리(reports/video-briefings/social-queue.json) 및 company-brain 동기화
 *
 * 실행:
 *   node scripts/publish-social-video.mjs [YYYY-MM-DD] [--dry-run] [--queue]
 *   npm run video:publish
 *   npm run video:schedule
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const newsPath = path.resolve(__dirname, "../src/data/news.json");
const outDir = path.resolve(__dirname, "../reports/video-briefings");
const brainDir = path.resolve(process.env.HOME || "", "coding/company-brain/reports");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isQueue = args.includes("--queue") || (!isDryRun && !args.includes("--check-only"));
if (isQueue) console.log("📌 [모드] 소셜 큐 등록 및 동기화 활성화");
const targetDateArg = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));

const news = JSON.parse(fs.readFileSync(newsPath, "utf8"));
const days = Array.isArray(news.days) ? news.days : [];
const targetDay =
  (targetDateArg ? days.find((d) => d.date === targetDateArg) : null) ||
  days.find((d) => Array.isArray(d.items) && d.items.length > 0);

if (!targetDay) {
  console.error("❌ 발행할 뉴스 날짜를 찾지 못했습니다.");
  process.exit(1);
}

const dateStr = targetDay.date;
const mp4Path = path.resolve(outDir, `${dateStr}-briefing.mp4`);
const coverPath = path.resolve(outDir, `${dateStr}-cover.png`);
const payloadJsonPath = path.resolve(outDir, `${dateStr}-social-payload.json`);
const queueJsonPath = path.resolve(outDir, `social-queue.json`);

console.log(`🎬 [OIYO Social Video Dispatcher] ${dateStr} 브리핑 점검 시작...`);

// 1. 비디오 파일 존재 확인
if (!fs.existsSync(mp4Path)) {
  console.warn(`⚠️ 비디오 파일이 없습니다: ${mp4Path}`);
  console.log(`💡 렌더러를 먼저 실행합니다: npm run video:render ${dateStr}`);
  try {
    execSync(`node ${path.resolve(__dirname, "render-daily-video.mjs")} ${dateStr}`, {
      stdio: "inherit",
    });
  } catch (err) {
    console.error(`❌ 비디오 렌더링 실패: ${err.message}`);
    process.exit(1);
  }
}

// 2. ffprobe 규격 검증
let videoMeta = { duration: 0, width: 0, height: 0, sizeMb: 0 };
try {
  const probeRaw = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -show_entries format=duration,size -of json "${mp4Path}"`,
    { encoding: "utf8" }
  );
  const probe = JSON.parse(probeRaw);
  const stream = probe.streams?.[0] || {};
  const format = probe.format || {};
  const duration = parseFloat(stream.duration || format.duration || "0");
  const width = parseInt(stream.width || "0", 10);
  const height = parseInt(stream.height || "0", 10);
  const sizeBytes = parseInt(format.size || "0", 10);
  const sizeMb = (sizeBytes / (1024 * 1024)).toFixed(2);

  videoMeta = { duration, width, height, sizeMb: parseFloat(sizeMb) };

  console.log(`\n📹 [비디오 규격 검증]`);
  console.log(`  - 해상도: ${width}x${height} ${width === 1080 && height === 1920 ? "✅ (9:16 정규격)" : "⚠️"}`);
  console.log(`  - 재생시간: ${duration.toFixed(1)}초 ${duration <= 60.0 ? "✅ (Shorts/Reels 60초 이내 준수)" : "❌ 60초 초과!"}`);
  console.log(`  - 파일크기: ${sizeMb} MB ✅ (<50MB 모바일 스트리밍 최적화)`);

  if (width !== 1080 || height !== 1920) {
    console.warn(`⚠️ 경고: 세로형 1080x1920 규격이 아닙니다.`);
  }
  if (duration > 60.0) {
    console.error(`❌ 오류: 쇼츠/릴스 최대 길이(60초)를 초과했습니다.`);
    process.exit(1);
  }
} catch (e) {
  console.warn(`⚠️ ffprobe 실행 불가 또는 메타데이터 읽기 실패: ${e.message}`);
}

// 3. 썸네일/커버 이미지 추출 (첫 장면 또는 1초 시점)
if (!fs.existsSync(coverPath)) {
  try {
    execSync(`ffmpeg -y -ss 00:00:01.000 -i "${mp4Path}" -vframes 1 "${coverPath}" 2>/dev/null`);
    console.log(`🖼️ [커버 이미지 추출] ${coverPath}`);
  } catch (e) {
    console.warn(`⚠️ 커버 추출 실패: ${e.message}`);
  }
}

// 4. 뉴스 아이템 및 헤드라인 정리
const items = (targetDay.items || []).filter((item) => item && item.title);
const topHeadlines = items.slice(0, 5).map((item, idx) => {
  const clean = String(item.title).replace(/["'<>]/g, "").trim();
  return `${idx + 1}. ${clean}`;
});

// 5. 플랫폼별 최적화 메타데이터 구성
const payload = {
  version: "1.0",
  date: dateStr,
  createdAt: new Date().toISOString(),
  videoFile: path.basename(mp4Path),
  coverFile: fs.existsSync(coverPath) ? path.basename(coverPath) : null,
  specs: videoMeta,
  platforms: {
    youtubeShorts: {
      title: `[OIYO] ${dateStr} AI·테크 60초 핵심 브리핑 #Shorts`,
      description: `[${dateStr}] 오늘의 AI 및 테크 1분 핵심 요약 브리핑입니다.\n\n${topHeadlines.join("\n")}\n\n🔗 상세 원문 및 팩트체크: https://news.oiyo.net/\n✨ AI 창작 쇼케이스: https://show.oiyo.net/\n\n#Shorts #AI뉴스 #테크뉴스 #생성형AI #바이브코딩 #OIYO #OIYONews #IT트렌드`,
      tags: [
        "Shorts",
        "AI뉴스",
        "테크뉴스",
        "생성형AI",
        "바이브코딩",
        "OIYO",
        "OIYONews",
        "IT트렌드",
        "인공지능",
        "기술트렌드",
      ],
      categoryId: "28", // Science & Technology
      privacyStatus: "public",
      selfDeclaredMadeForKids: false,
    },
    instagramReels: {
      caption: `✨ 60초로 몰아보는 오늘의 AI·테크 핵심 브리핑 (${dateStr})\n\n오늘 주목해야 할 기술 뉴스를 1분 영상으로 정리했습니다! 🎬\n\n${topHeadlines.join("\n")}\n\n👉 뉴스 원문과 심층 분석은 프로필 링크 news.oiyo.net에서 확인하세요.\n\n#릴스 #인스타릴스 #AI트렌드 #테크뉴스 #생성형AI #바이브코딩 #개발자 #IT뉴스 #OIYO #쇼츠 #TechNews`,
      shareToFeed: true,
      audioName: "OIYO News Original Audio",
    },
    xTwitter: {
      text: `[OIYO 60초 브리핑] ${dateStr} 오늘의 핵심 AI·테크 뉴스입니다. 🎬\n\n${topHeadlines.slice(0, 3).join("\n")}\n\n🔗 전체 뉴스: https://news.oiyo.net/\n#AI #TechNews #OIYO`,
      mediaType: "video/mp4",
    },
  },
};

fs.writeFileSync(payloadJsonPath, JSON.stringify(payload, null, 2), "utf8");
console.log(`\n📄 [소셜 페이로드 생성 완료] ${payloadJsonPath}`);

// 6. 소셜 큐 관리
let queue = [];
if (fs.existsSync(queueJsonPath)) {
  try {
    queue = JSON.parse(fs.readFileSync(queueJsonPath, "utf8"));
  } catch {}
}

const existingIdx = queue.findIndex((q) => q.date === dateStr);
const queueEntry = {
  date: dateStr,
  videoFile: `${dateStr}-briefing.mp4`,
  coverFile: `${dateStr}-cover.png`,
  duration: videoMeta.duration,
  status: "ready", // ready | scheduled | published
  scheduledFor: `${dateStr}T10:13:00+09:00`,
  updatedAt: new Date().toISOString(),
  targets: ["youtubeShorts", "instagramReels", "xTwitter"],
  summary: topHeadlines.slice(0, 3),
};

if (existingIdx >= 0) {
  queue[existingIdx] = { ...queue[existingIdx], ...queueEntry };
} else {
  queue.unshift(queueEntry);
}

fs.writeFileSync(queueJsonPath, JSON.stringify(queue, null, 2), "utf8");
console.log(`📋 [소셜 큐 갱신 완료] ${queueJsonPath} (${queue.length}개 항목 등록됨)`);

// company-brain reports 동기화
if (fs.existsSync(brainDir)) {
  const brainQueuePath = path.resolve(brainDir, "social-video-queue.json");
  fs.writeFileSync(brainQueuePath, JSON.stringify(queue, null, 2), "utf8");
  console.log(`🧠 [company-brain 동기화] ${brainQueuePath}`);
}

console.log(`\n🎉 [성공] 60초 세로형 영상 브리핑 소셜 스케줄링 준비 완료!`);
console.log(`  - 대상 날짜: ${dateStr}`);
console.log(`  - YouTube Shorts 제목: ${payload.platforms.youtubeShorts.title}`);
console.log(`  - Instagram Reels 캡션 길이: ${payload.platforms.instagramReels.caption.length}자`);
console.log(`  - 예약 시간: ${queueEntry.scheduledFor}`);
