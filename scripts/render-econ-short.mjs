#!/usr/bin/env node
// 경제 속보 60초 세로 쇼츠(1080x1920) 렌더러 (2026-11-23).
// /api/wire 에서 공식 기관 발표만 골라(scripts/lib/econ-shorts.mjs) 장면을 HTML 로 그리고,
// Playwright 로 찍은 뒤 ffmpeg 로 이어 붙인다. 배경음은 scripts/econ-shorts/music.py 가 합성한 원곡.
// 런타임 LLM·유료 API·외부 영상 소스 없음. 공식 발표가 3건 미만인 날은 영상을 만들지 않는다(exit 0).
//
//   node scripts/render-econ-short.mjs [--wire wire.json] [--now 2026-11-23T08:00:00+09:00] [--out reports/econ-shorts]
//   (Playwright 가 repo 에 없으면 NODE_PATH=$(npm root -g))
import { execFileSync } from "node:child_process";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMeta, card, kst, selectItems, timeline } from "./lib/econ-shorts.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const W = 1080, H = 1920;
const WIRE_URL = "https://news.oiyo.net/api/wire?limit=120";

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function loadWire() {
  const file = arg("--wire");
  if (file) return JSON.parse(readFileSync(file, "utf8"));
  const res = await fetch(WIRE_URL, { headers: { "User-Agent": "OIYO-econ-shorts/1.0 (+https://news.oiyo.net/finance/live/)" } });
  if (!res.ok) throw new Error(`wire ${res.status}`);
  return res.json();
}

const css = `*{margin:0;box-sizing:border-box;word-break:keep-all;overflow-wrap:anywhere}
body{width:${W}px;height:${H}px;overflow:hidden;color:#f4f6fb;position:relative;
font-family:"Noto Sans CJK KR","Noto Sans KR","Apple SD Gothic Neo","WenQuanYi Zen Hei",sans-serif;
background:radial-gradient(circle at 20% 12%,#1e5a8a66,transparent 50%),radial-gradient(circle at 85% 90%,#0f8a7a55,transparent 50%),#0b1424}
.top{position:absolute;top:120px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;font-size:38px;font-weight:700;letter-spacing:1px}
.brand{color:#7fd6c8}.count{background:#ffffff1a;border-radius:40px;padding:10px 28px}
.bar{position:absolute;top:196px;left:70px;right:70px;height:10px;border-radius:5px;background:#ffffff1a;overflow:hidden}
.bar i{display:block;height:100%;background:#7fd6c8}
.c{position:absolute;left:70px;right:70px;top:300px;bottom:300px;display:flex;flex-direction:column;justify-content:center;gap:40px}
.org{align-self:flex-start;font-size:46px;font-weight:700;padding:16px 32px;border-radius:16px;background:var(--a);color:#0b1424}
.when{font-size:40px;opacity:.75}
h1{font-weight:800;line-height:1.28;text-shadow:0 4px 24px #0009}
.orig{font-size:36px;line-height:1.35;opacity:.6;font-style:italic}
.tags{display:flex;gap:18px;flex-wrap:wrap}.tags b{font-size:36px;font-weight:600;border:3px solid var(--a);color:var(--a);border-radius:40px;padding:8px 26px}
.flash{color:#ff6b5a;font-weight:800;font-size:42px}
.foot{position:absolute;bottom:170px;left:70px;right:70px;font-size:34px;opacity:.7;display:flex;justify-content:space-between}
.center{text-align:center;align-items:center}
.big{font-size:120px;font-weight:800;line-height:1.15}
.sub{font-size:58px;font-weight:700;line-height:1.35}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:18px}.chips b{font-size:38px;font-weight:600;background:#ffffff1a;border-radius:40px;padding:12px 30px}
.url{font-size:54px;font-weight:800;background:#7fd6c8;color:#0b1424;border-radius:22px;padding:26px 40px}
.note{font-size:34px;line-height:1.5;opacity:.7;text-align:center}`;

const accent = (c) => (c.org.startsWith("미국") ? "#8ab4ff" : /유럽|일본|영란/.test(c.org) ? "#f5c56b" : "#7fd6c8");
const hsize = (s) => (s.length <= 22 ? 92 : s.length <= 40 ? 78 : s.length <= 60 ? 66 : 56);
const page = (body) => `<!doctype html><meta charset=utf-8><style>${css}</style>${body}`;

function scenes(cards, now) {
  const d = kst(now.toISOString());
  const orgs = [...new Set(cards.map((c) => c.org.split(" · ")[0]))];
  const out = [page(`<div class=top><span class=brand>OIYO 경제 속보</span><span class=count>공식 발표만</span></div>
<div class="c center"><div class=sub>${esc(d.md)}(${d.dow})</div><div class=big>경제<br>공식 발표<br>${cards.length}건</div>
<div class=chips>${orgs.map((o) => `<b>${esc(o)}</b>`).join("")}</div></div>
<div class=foot><span>중앙은행·정부·통계기관 발표</span><span>60초 정리</span></div>`)];
  cards.forEach((c, i) => {
    out.push(page(`<div class=top><span class=brand>OIYO 경제 속보</span><span class=count>${i + 1} / ${cards.length}</span></div>
<div class=bar><i style="width:${((i + 1) / cards.length) * 100}%"></i></div>
<div class=c style="--a:${accent(c)}">
${c.flash ? `<div class=flash>● 속보(공식)</div>` : ""}<div class=org>${esc(c.org)}</div><div class=when>${esc(c.when)} (한국시간)</div>
<h1 style="font-size:${hsize(c.headline)}px">${esc(c.headline)}</h1>${c.original ? `<div class=orig>${esc(c.original)}</div>` : ""}
${c.tags.length ? `<div class=tags>${c.tags.map((t) => `<b>${esc(t)}</b>`).join("")}</div>` : ""}</div>
<div class=foot><span>원문 · ${esc(c.host)}</span><span>제목만 옮김</span></div>`));
  });
  out.push(page(`<div class="c center"><div class=sub>발표가 나오는 대로<br>실시간으로</div>
<div class=big style="font-size:104px">경제 속보<br>모아 보기</div><div class=url>news.oiyo.net/finance/live</div>
<div class=note>공식 발표의 제목만 모았어요.<br>자세한 내용은 각 기관 원문에서 확인하세요.<br>투자 권유가 아닙니다.</div></div>`));
  return out;
}

async function main() {
  const now = arg("--now") ? new Date(arg("--now")) : new Date();
  const outDir = resolve(arg("--out") || join(root, "reports/econ-shorts"));
  const wire = await loadWire();
  const items = selectItems(wire, { now });
  const setOut = (k, v) => process.env.GITHUB_OUTPUT && appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
  if (!items.length) {
    console.log("공식 발표가 3건 미만이라 오늘은 영상을 만들지 않습니다.");
    setOut("skip", "true");
    return;
  }
  const cards = items.map(card);
  const meta = buildMeta(cards, now);
  const tl = timeline(cards.length);
  const tmp = join(root, ".tmp/econ-shorts", meta.date);
  mkdirSync(tmp, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  const { chromium } = createRequire(import.meta.url)("playwright");
  const browser = await chromium.launch();
  const pngs = [];
  try {
    const p = await browser.newPage({ viewport: { width: W, height: H } });
    for (const [i, html] of scenes(cards, now).entries()) {
      const f = join(tmp, `s${i}.html`);
      writeFileSync(f, html);
      await p.goto("file://" + f);
      await p.evaluate(() => document.fonts.ready);
      const png = join(tmp, `s${i}.png`);
      await p.screenshot({ path: png });
      pngs.push(png);
    }
  } finally { await browser.close(); }

  const wav = join(tmp, "music.wav");
  const seed = Number(meta.date.replaceAll("-", ""));
  execFileSync("python3", [join(root, "scripts/econ-shorts/music.py"), wav, String(tl.length), tl.starts.slice(1).map(String).join(","), String(seed)]);

  const fps = 30;
  const zoom = (i, d) => `[${i}:v]scale=${Math.round(W * 1.5)}:${Math.round(H * 1.5)},zoompan=z='min(zoom+0.0004,1.04)':d=${Math.round(d * fps)}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${fps},setsar=1,format=yuv420p[v${i}]`;
  const parts = tl.durs.map((d, i) => zoom(i, d));
  let last = "v0";
  for (let i = 1; i < tl.durs.length; i++) {
    const label = i === tl.durs.length - 1 ? "v" : `x${i}`;
    parts.push(`[${last}][v${i}]xfade=transition=fade:duration=${tl.fade}:offset=${tl.starts[i]}[${label}]`);
    last = label;
  }
  const mp4 = join(outDir, `${meta.date}.mp4`);
  execFileSync("ffmpeg", ["-v", "error", "-y",
    ...pngs.flatMap((p, i) => ["-loop", "1", "-t", String(tl.durs[i]), "-i", p]),
    "-i", wav, "-filter_complex", parts.join(";"), "-map", "[v]", "-map", `${pngs.length}:a`,
    "-c:v", "libx264", "-preset", "medium", "-crf", "27", "-r", String(fps), "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-t", String(tl.length), "-movflags", "+faststart", mp4]);
  writeFileSync(join(outDir, `${meta.date}.json`), JSON.stringify({ ...meta, length: tl.length, video: `${meta.date}.mp4`, items: cards }, null, 2) + "\n");
  console.log(mp4);
  setOut("date", meta.date);
}

main().catch((e) => { console.error(e); process.exit(1); });
