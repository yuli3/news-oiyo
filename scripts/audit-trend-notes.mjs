#!/usr/bin/env node
// 트렌드 노트 형식 감사.
//
// 2026-08-23~09-01 의 노트 7건이 `## Summary` 헤딩 없이 본문을 h1 바로 아래
// 두는 바람에, sync-news.mjs 의 요약 추출이 조용히 빈 문자열을 냈고 사이트는
// 일주일 내내 리드 문단 없는 날짜 페이지를 서빙했다. 아무도 못 알아챈 이유는
// 형식을 검사하는 것이 없었기 때문이다. 이 파일이 그 검사다.
//
// usage: node scripts/audit-trend-notes.mjs [--json]
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TRENDS = join(process.env.HOME, "coding", "company-brain", "AI-Sessions", "wiki", "sources", "trends");
const REGISTRY = JSON.parse(readFileSync(join(__dirname, "lib", "news-pipeline-sources.json"), "utf8"));
// 어댑터(news-pipeline-adapter.mjs sourceLookup)와 **같은 규칙**으로 조회한다.
// id 만 보면 감사가 파이프라인보다 엄격해져서, 실제로는 통과하는 alias 를
// 실패로 보고한다. 두 곳이 다르게 판단하면 감사를 믿을 수 없다.
const REGISTERED = new Set(REGISTRY.sources.flatMap((s) => [s.id, s.name, ...(s.aliases ?? [])].map((x) => x.toLowerCase())));
const REQUIRED_FIELDS = ["type", "project", "layer", "date", "status", "confidence"];

const failures = [];
const fail = (file, message) => failures.push({ file, message });

const files = readdirSync(TRENDS).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort();
for (const file of files) {
  const text = readFileSync(join(TRENDS, file), "utf8");
  const date = file.replace(/\.md$/, "");

  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) { fail(file, "frontmatter 없음"); continue; }
  const fields = Object.fromEntries(frontmatter[1].split(/\r?\n/)
    .map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()])
    .filter(([k]) => k));
  for (const key of REQUIRED_FIELDS) if (!fields[key]) fail(file, `frontmatter 누락: ${key}`);
  if (fields.date && fields.date !== date) fail(file, `frontmatter date(${fields.date}) 가 파일명(${date}) 과 다르다`);

  // sync-news.mjs 가 이 헤딩으로 사이트 요약을 뽑는다. 없으면 그 날은 요약이 빈다.
  const summary = (text.match(/## Summary\s+([\s\S]*?)(\n## |$)/) || [])[1]?.trim();
  if (!summary) fail(file, "`## Summary` 절이 없거나 비었다 — 사이트 리드 문단이 통째로 빠진다");

  // envelope 는 선택이다. sync-news.mjs 가 existsSync 로 감싸고 없으면 본문에서
  // 항목을 읽는다(2026-07 이전 노트가 그 형태다). 감사가 파이프라인보다 엄격하면
  // 옛 노트가 영구 실패로 남아 게이트가 무력해진다.
  const envelopePath = join(TRENDS, `${date}.sources.json`);
  if (!existsSync(envelopePath)) continue;
  let envelope;
  try { envelope = JSON.parse(readFileSync(envelopePath, "utf8")); }
  catch { fail(file, `${date}.sources.json 이 유효한 JSON 이 아니다`); continue; }

  for (const [index, item] of (envelope.items ?? []).entries()) {
    const where = `${date}.sources.json[${index}]`;
    if (!REGISTERED.has(String(item.src ?? "").toLowerCase())) fail(where, `미등록 소스 '${item.src}' — sync 가 버린다`);
    if (!String(item.url ?? "").startsWith("https://")) fail(where, `https 아님: ${item.url}`);
    if (!String(item.title ?? "").trim()) fail(where, "제목이 비었다");
  }
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ checked: files.length, failures }, null, 2));
} else {
  for (const f of failures) console.error(`FAIL ${f.file}: ${f.message}`);
  console.log(failures.length
    ? `트렌드 노트 감사: ${files.length}건 검사, ${failures.length}건 실패`
    : `트렌드 노트 감사: PASS — ${files.length}건 전부 통과`);
}
// process.exit() 는 stdout 을 flush 하기 전에 잘라 버린다. --json 출력이
// 중간에서 끊겼다. exitCode 만 세우고 정상 종료에 맡긴다.
process.exitCode = failures.length ? 1 : 0;
