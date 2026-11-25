#!/usr/bin/env node
// 「이번 주 AI로 만든 놀라운 것 N선」 60초 세로 쇼츠(1080x1920) 렌더러 (2026-11-25).
// src/data/ai-wow/<week>.json 의 앞 7개 항목을 글자 카드로 그린다. 원작자의 영상·이미지는 쓰지 않는다(링크는 설명란).
// 장면 HTML → Playwright 스크린샷 → ffmpeg. 배경음·나레이션은 경제 속보 쇼츠의 music.py·narrate.py 를 같이 쓴다.
//
//   node scripts/render-ai-wow-short.mjs [--week 2026-W48] [--out reports/ai-wow-shorts]
//   (Playwright 가 repo 에 없으면 NODE_PATH=$(npm root -g))
import { execFileSync } from "node:child_process";
import { appendFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMeta, CATEGORIES, credit, host, narrationLines, shortItems, timeline, validateIssue, weekLabel } from "./lib/ai-wow.mjs";
import { speakKo } from "./lib/econ-shorts.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const W = 1080, H = 1920;
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function loadIssue() {
  const dir = join(root, "src/data/ai-wow");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  const want = arg("--week");
  const file = want ? `${want}.json` : files.at(-1);
  if (!files.includes(file)) throw new Error(`호 없음: ${file}`);
  const issue = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const errs = validateIssue(issue, file);
  if (errs.length) throw new Error(errs.join("\n"));
  return issue;
}

const css = `*{margin:0;box-sizing:border-box;word-break:keep-all;overflow-wrap:anywhere}
body{width:${W}px;height:${H}px;overflow:hidden;color:#f6f4fb;position:relative;
font-family:"Noto Sans CJK KR","Noto Sans KR","Apple SD Gothic Neo",sans-serif;
background:radial-gradient(circle at 18% 10%,color-mix(in srgb,var(--a) 35%,transparent),transparent 52%),radial-gradient(circle at 90% 88%,#5b3fa055,transparent 50%),#120f1f}
.top{position:absolute;top:120px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center;font-size:38px;font-weight:700}
.brand{color:var(--a)}.count{background:#ffffff1a;border-radius:40px;padding:10px 28px}
.bar{position:absolute;top:196px;left:70px;right:70px;height:10px;border-radius:5px;background:#ffffff1a;overflow:hidden}
.bar i{display:block;height:100%;background:var(--a)}
.c{position:absolute;left:70px;right:70px;top:280px;bottom:320px;display:flex;flex-direction:column;justify-content:center;gap:36px}
.row{display:flex;align-items:center;gap:22px}
.no{font-size:150px;font-weight:900;line-height:1;color:var(--a)}
.cat{font-size:40px;font-weight:700;padding:14px 30px;border-radius:16px;background:var(--a);color:#120f1f}
.kr{font-size:36px;font-weight:700;border:3px solid #fff8;border-radius:40px;padding:8px 24px}
h1{font-weight:800;line-height:1.3;text-shadow:0 4px 24px #0009}
.by{font-size:46px;font-weight:700;color:var(--a)}
.how{font-size:40px;line-height:1.5;opacity:.85}
.foot{position:absolute;bottom:170px;left:70px;right:70px;font-size:34px;opacity:.72;display:flex;justify-content:space-between;gap:20px}
.center{text-align:center;align-items:center}
.big{font-size:124px;font-weight:900;line-height:1.15}
.sub{font-size:56px;font-weight:700;line-height:1.35}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:18px}.chips b{font-size:36px;font-weight:600;background:#ffffff1a;border-radius:40px;padding:12px 28px}
.url{font-size:50px;font-weight:800;background:var(--a);color:#120f1f;border-radius:22px;padding:26px 40px}
.note{font-size:34px;line-height:1.5;opacity:.75;text-align:center}`;

const hsize = (s) => (s.length <= 24 ? 88 : s.length <= 36 ? 76 : s.length <= 50 ? 66 : 58);
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).replace(/[\s,.]+$/, "")}…` : s);
const page = (accent, body) => `<!doctype html><meta charset=utf-8><style>${css}</style><body style="--a:${accent}">${body}</body>`;
const BRAND = "#f5a3c7";

function scenes(issue) {
  const items = shortItems(issue);
  const cats = [...new Set(items.map((it) => CATEGORIES[it.category].label))];
  const out = [page(BRAND, `<div class=top><span class=brand>OIYO · AI 위클리</span><span class=count>${esc(weekLabel(issue))}</span></div>
<div class="c center"><div class=sub>이번 주</div><div class=big>AI로 만든<br>놀라운 것<br>${items.length}선</div>
<div class=chips>${cats.map((c) => `<b>${esc(c)}</b>`).join("")}</div></div>
<div class=foot><span>만든 사람·원문 링크는 설명란</span><span>60초</span></div>`)];
  items.forEach((it, i) => {
    const c = CATEGORIES[it.category];
    out.push(page(c.color, `<div class=top><span class=brand>AI로 만든 놀라운 것</span><span class=count>${i + 1} / ${items.length}</span></div>
<div class=bar><i style="width:${((i + 1) / items.length) * 100}%"></i></div>
<div class=c><div class=row><span class=no>${i + 1}</span><span class=cat>${esc(c.label)}</span>${it.kr ? "<span class=kr>한국</span>" : ""}</div>
<h1 style="font-size:${hsize(it.title)}px">${esc(it.title)}</h1>
<div class=by>${esc(credit(it))}</div>
<div class=how>${esc(clip(it.how, 90))}</div></div>
<div class=foot><span>원문 · ${esc(it.via ? it.via : host(it.url))}</span><span>${esc(it.date.slice(5).replace("-", "."))}</span></div>`));
  });
  out.push(page(BRAND, `<div class="c center"><div class=sub>만든 사람과 원문 링크<br>전체 ${issue.items.length}선은 여기에</div>
<div class=big style="font-size:100px">매주 수요일<br>AI 위클리</div><div class=url>news.oiyo.net/ai/wow</div>
<div class=note>영상 속 화면은 OIYO가 만든 글자 카드예요.<br>원작 영상·이미지는 쓰지 않았어요.<br>숫자는 게시자 주장이에요.</div></div>`));
  return out;
}

async function main() {
  const issue = loadIssue();
  const outDir = resolve(arg("--out") || join(root, "reports/ai-wow-shorts"));
  const items = shortItems(issue);
  const meta = buildMeta(issue);
  const tl = timeline(items.length);
  const tmp = join(root, ".tmp/ai-wow-shorts", issue.week);
  mkdirSync(tmp, { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const setOut = (k, v) => process.env.GITHUB_OUTPUT && appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);

  const { chromium } = createRequire(import.meta.url)("playwright");
  const browser = await chromium.launch();
  const pngs = [];
  try {
    const p = await browser.newPage({ viewport: { width: W, height: H } });
    for (const [i, html] of scenes(issue).entries()) {
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
  const seed = Number(issue.week.replace(/\D/g, ""));
  execFileSync("python3", [join(root, "scripts/econ-shorts/music.py"), wav, String(tl.length), tl.starts.slice(1).map(String).join(","), String(seed)]);

  let voice = null;
  const lead = 0.35;
  const lines = narrationLines(issue).map((text, i) => ({
    text: speakKo(text), shown: text,
    start: Math.round((tl.starts[i] + lead) * 100) / 100,
    max: Math.round((tl.durs[i] - lead - tl.fade - 0.25) * 100) / 100,
  }));
  if ((process.env.NARRATION || "supertonic") !== "off") {
    const segFile = join(tmp, "narration.json");
    const vwav = join(tmp, "voice.wav");
    writeFileSync(segFile, JSON.stringify(lines, null, 2));
    try {
      const rep = execFileSync("python3", [join(root, "scripts/econ-shorts/narrate.py"), segFile, vwav, String(tl.length), process.env.NARRATION_VOICE || "F1"], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
      voice = { wav: vwav, ...JSON.parse(rep.trim().split("\n").pop()) };
    } catch (e) {
      console.warn("나레이션을 만들지 못해 배경음만 씁니다:", e.message?.split("\n")[0]);
    }
  }
  if (voice) {
    meta.youtube.containsSyntheticMedia = true;
    meta.youtube.description = meta.youtube.description.replace("\n\n#", "\n\n나레이션: AI 음성(Supertonic)\n\n#");
  }

  const fps = 30;
  const zoom = (i, d) => `[${i}:v]scale=${Math.round(W * 1.5)}:${Math.round(H * 1.5)},zoompan=z='min(zoom+0.0004,1.04)':d=${Math.round(d * fps)}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${fps},setsar=1,format=yuv420p[v${i}]`;
  const parts = tl.durs.map((d, i) => zoom(i, d));
  let last = "v0";
  for (let i = 1; i < tl.durs.length; i++) {
    const label = i === tl.durs.length - 1 ? "v" : `x${i}`;
    parts.push(`[${last}][v${i}]xfade=transition=fade:duration=${tl.fade}:offset=${tl.starts[i]}[${label}]`);
    last = label;
  }
  const mp4 = join(outDir, `${issue.week}.mp4`);
  execFileSync("ffmpeg", ["-v", "error", "-y",
    ...pngs.flatMap((p, i) => ["-loop", "1", "-t", String(tl.durs[i]), "-i", p]),
    "-i", wav, ...(voice ? ["-i", voice.wav] : []),
    "-filter_complex", [...parts, voice
      ? `[${pngs.length}:a]volume=0.32[m];[${pngs.length + 1}:a]aresample=44100,volume=1.0[n];[m][n]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]`
      : `[${pngs.length}:a]anull[a]`].join(";"),
    "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-preset", "medium", "-crf", "27", "-r", String(fps), "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k", "-t", String(tl.length), "-movflags", "+faststart", mp4]);
  writeFileSync(join(outDir, `${issue.week}.json`), JSON.stringify({ ...meta, length: tl.length, video: `${issue.week}.mp4`, narration: voice ? { engine: "supertonic-3", voice: voice.voice } : null }, null, 2) + "\n");
  console.log(mp4);
  setOut("week", issue.week);
}

main().catch((e) => { console.error(e); process.exit(1); });
