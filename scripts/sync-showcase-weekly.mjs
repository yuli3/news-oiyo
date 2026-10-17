#!/usr/bin/env node
/**
 * scripts/sync-showcase-weekly.mjs
 *
 * show.oiyo.net 의 주간 출품작 데이터를 읽어
 * 1) news.oiyo.net 홈에 노출할 `src/data/showcase-weekly.json`
 * 2) 공식 X (@oiyo_net) · Instagram (oiyo_net) 주간 홍보 초안
 * 을 생성한다.
 *
 * WHY (2026-10-17 showcase-mvp-20261017):
 * - 운영자 시드(`isOperatorSeed: true`)는 주간 1위 집계에서 제외한다.
 * - 능력은 런타임이 아니라 repo 스크립트가 소유한다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidatePaths = [
  process.env.SHOW_SUBMISSIONS_PATH ? path.resolve(process.env.SHOW_SUBMISSIONS_PATH) : "",
  path.resolve(__dirname, "../../show/src/data/submissions.json"),
  path.resolve(__dirname, "../../../show/src/data/submissions.json"),
].filter(Boolean);
const submissionsPath = candidatePaths.find((p) => fs.existsSync(p)) || candidatePaths[0];
const outPath = path.resolve(__dirname, "../src/data/showcase-weekly.json");

let currentWeek = "2026-W42";
let entries = [];

if (fs.existsSync(submissionsPath)) {
  const raw = JSON.parse(fs.readFileSync(submissionsPath, "utf8"));
  currentWeek = raw.currentWeek || currentWeek;
  entries = Array.isArray(raw.entries) ? raw.entries : [];
}

const eligible = entries
  .filter((e) => e.status === "approved" && !e.isOperatorSeed && e.week === currentWeek)
  .sort((a, b) => (b.votes || 0) - (a.votes || 0));

const seeds = entries
  .filter((e) => e.status === "approved" && e.isOperatorSeed)
  .slice(0, 3);

const winner = eligible[0] ?? null;
const runnersUp = eligible.slice(1, 5).filter((e) => (e.votes || 0) >= 5);

const payload = {
  week: currentWeek,
  updatedAt: new Date().toISOString(),
  eligibleCount: eligible.length,
  newsCard: winner
    ? {
        mode: "winner",
        section: "이번 주 AI 창작 쇼케이스 1위",
        title: winner.title,
        oneLiner: winner.oneLiner,
        maker: winner.makerName,
        aiTools: winner.aiDisclosure?.toolsUsed ?? [],
        showcaseUrl: `https://show.oiyo.net/p/${winner.slug}/`,
        submitUrl: "https://show.oiyo.net/submit/",
        runnersUp: runnersUp.map((r) => ({
          title: r.title,
          oneLiner: r.oneLiner,
          votes: r.votes,
          url: `https://show.oiyo.net/p/${r.slug}/`,
        })),
      }
    : {
        mode: "open-call",
        section: "이번 주 AI 창작 쇼케이스",
        headline: "AI로 만든 앱·게임·그림·음악·영상, 첫 주간 주인공을 찾아요",
        summary:
          "매주 추천수 상위 외부 메이커 작품을 OIYO News 홈과 공식 X·인스타그램에서 소개합니다. 운영자 시드 작품은 주간 1위 집계에서 제외됩니다.",
        showcaseUrl: "https://show.oiyo.net/",
        submitUrl: "https://show.oiyo.net/submit/",
        featuredSeeds: seeds.map((s) => ({
          title: s.title,
          oneLiner: s.oneLiner,
          aiTools: s.aiDisclosure?.toolsUsed ?? [],
          url: `https://show.oiyo.net/p/${s.slug}/`,
        })),
      },
  socialDrafts: {
    xPost: winner
      ? `[${currentWeek} OIYO 쇼케이스 1위] ${winner.title} — ${winner.oneLiner}\n사용 AI: ${(winner.aiDisclosure?.toolsUsed ?? []).join(", ")}\n자세히 보기: https://show.oiyo.net/p/${winner.slug}/`
      : `AI로 만든 앱·바이브코딩 사이트·그림·음악·영상·GPTs, OIYO 쇼케이스에서 자랑해요! 매주 1등은 OIYO News와 X·인스타에서 소개해 드려요. https://show.oiyo.net/`,
    instagramCaption: winner
      ? `✨ [${currentWeek} OIYO AI 창작 쇼케이스 1위]\n\n🏆 ${winner.title}\n"${winner.oneLiner}"\n🛠️ 사용 AI: ${(winner.aiDisclosure?.toolsUsed ?? []).join(", ")}\n\n프로필 링크(show.oiyo.net)에서 직접 써보고 내 AI 작업물도 등록해 보세요!\n#AI창작 #바이브코딩 #생성형AI #OIYO쇼케이스`
      : `✨ AI로 만든 내 작품, 어디에 자랑하지?\n\n바이브코딩 웹앱부터 AI 일러스트·음악·영상·프롬프트까지!\nshow.oiyo.net에 등록하면 매주 추천 상위작을 OIYO News와 공식 SNS에서 소개해 드려요.\n\n#AI창작 #바이브코딩 #생성형AI #OIYO쇼케이스`,
  },
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`showcase-weekly synced: week=${payload.week} mode=${payload.newsCard.mode} eligible=${payload.eligibleCount}`);
