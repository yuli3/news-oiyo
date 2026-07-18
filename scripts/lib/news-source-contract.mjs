// oiyo.news-source v1 — B5 Wave 0 contracts for the news/ai pipeline.
//
// Scope (deliberately narrow): source registry with official/primary
// preference, fetchedAt/effectiveAt discipline, canonical-URL + content-hash
// dedupe, append-only corrections, and an evergreen transition that can only
// be PROPOSED here — publishing an evergreen page is a human decision, and
// ai/news do not grow before the index gate (G1). Timelines are official-source
// chronologies with no comments or reaction counts (that layer needs
// moderation/defamation/deletion design first).
import { createHash } from "node:crypto";

export const NEWS_SOURCE_SCHEMA = "oiyo.news-source";
export const NEWS_SOURCE_SCHEMA_VERSION = 1;

// Preference order follows the source-authority principle: official and
// primary sources outrank secondary reporting.
export const SOURCE_TYPES = ["official", "primary", "secondary"];
export const TIMELINE_ALLOWED_SOURCE_TYPES = ["official", "primary"];
export const EVERGREEN_MIN_AGE_DAYS = 30;

export function validateSource(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new TypeError("source 레코드가 아닙니다");
  for (const field of ["id", "name", "homepage"]) {
    if (typeof value[field] !== "string" || !value[field].trim()) throw new TypeError(`source.${field}가 비었습니다`);
  }
  if (!SOURCE_TYPES.includes(value.type)) throw new TypeError(`알 수 없는 source type: ${value.type}`);
  if (!/^https:\/\//.test(value.homepage)) throw new TypeError("homepage는 https 원본 주소여야 합니다");
  return value;
}

export function validateRegistry(registry) {
  if (!registry || registry.schema !== NEWS_SOURCE_SCHEMA || registry.schemaVersion !== NEWS_SOURCE_SCHEMA_VERSION) {
    throw new TypeError("registry schema/version 불일치");
  }
  if (!Array.isArray(registry.sources) || registry.sources.length === 0) throw new TypeError("등록된 출처가 없습니다");
  const seen = new Set();
  for (const source of registry.sources) {
    validateSource(source);
    if (seen.has(source.id)) throw new TypeError(`source id 중복: ${source.id}`);
    seen.add(source.id);
  }
  return registry;
}

// --- Items: fetchedAt/effectiveAt + dedupe --------------------------------

// Canonicalization for dedupe: strip tracking params, fragments, trailing
// slash, and lowercase the host. Content hash catches same-story mirrors.
const TRACKING_PARAMS = /^(utm_|fbclid|gclid|ref$|source$)/;

export function canonicalUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  const kept = [...url.searchParams.entries()].filter(([key]) => !TRACKING_PARAMS.test(key.toLowerCase()));
  url.search = "";
  for (const [key, value] of kept.sort(([a], [b]) => a.localeCompare(b))) url.searchParams.append(key, value);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.toString();
}

export function contentHash(text) {
  return createHash("sha256").update(String(text ?? "").replace(/\s+/g, " ").trim().toLowerCase()).digest("hex").slice(0, 16);
}

export function validateItem(item, registry) {
  if (!item || typeof item !== "object") throw new TypeError("item 레코드가 아닙니다");
  for (const field of ["id", "sourceId", "url", "title"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) throw new TypeError(`item.${field}가 비었습니다`);
  }
  if (!registry.sources.some((source) => source.id === item.sourceId)) {
    throw new TypeError(`레지스트리에 없는 출처: ${item.sourceId}`);
  }
  if (Number.isNaN(Date.parse(item.fetchedAt))) throw new TypeError("fetchedAt이 올바른 시각이 아닙니다");
  // effectiveAt: when the fact holds (e.g. a rate change date). Optional but
  // must be valid when present; fetchedAt never substitutes for it.
  if (item.effectiveAt !== undefined && Number.isNaN(Date.parse(item.effectiveAt))) {
    throw new TypeError("effectiveAt이 올바른 시각이 아닙니다");
  }
  return item;
}

export function dedupeKey(item) {
  return `${canonicalUrl(item.url)}#${item.contentHash ?? ""}`;
}

export function dedupeItems(items) {
  const seenUrl = new Set();
  const seenContent = new Set();
  const kept = [];
  const dropped = [];
  for (const item of items) {
    const url = canonicalUrl(item.url);
    const hash = item.contentHash ?? null;
    if (seenUrl.has(url) || (hash && seenContent.has(hash))) {
      dropped.push({ id: item.id, reason: seenUrl.has(url) ? "duplicate-url" : "duplicate-content" });
      continue;
    }
    seenUrl.add(url);
    if (hash) seenContent.add(hash);
    kept.push(item);
  }
  return { dropped, kept };
}

// --- Corrections: append-only, never a silent overwrite ---------------------

export function applyCorrection(item, { field, to, reason, correctedBy, at = new Date().toISOString() }) {
  if (!["title", "effectiveAt", "summary"].includes(field)) throw new TypeError(`정정 불가 필드: ${field}`);
  for (const [name, value] of [["reason", reason], ["correctedBy", correctedBy]]) {
    if (typeof value !== "string" || !value.trim()) throw new TypeError(`${name}이 비었습니다`);
  }
  if (Number.isNaN(Date.parse(at))) throw new TypeError("정정 시각이 올바르지 않습니다");
  const correction = { at, correctedBy, field, from: item[field] ?? null, reason, to };
  return { ...item, [field]: to, corrections: [...(item.corrections ?? []), correction] };
}

// --- Evergreen transition: propose only, publish is human ------------------

export function canProposeEvergreen(item, registry, now = new Date()) {
  const source = registry.sources.find((entry) => entry.id === item.sourceId);
  if (!source || source.type === "secondary") return { eligible: false, reason: "official/primary 출처 필요" };
  const basis = item.effectiveAt ?? item.fetchedAt;
  const ageDays = (now.getTime() - Date.parse(basis)) / 86_400_000;
  if (!(ageDays >= EVERGREEN_MIN_AGE_DAYS)) return { eligible: false, reason: `최소 ${EVERGREEN_MIN_AGE_DAYS}일 경과 필요` };
  if (item.stillAccurate !== true) return { eligible: false, reason: "정확성 재확인(stillAccurate) 필요" };
  return {
    eligible: true,
    proposal: { itemId: item.id, kind: "evergreen-transition", requiresHumanReview: true, status: "proposed" },
  };
}

// --- Timeline: official-source chronology, no comments/reactions ------------

const TIMELINE_FORBIDDEN_KEYS = ["comments", "reactions", "likes", "votes", "replies"];

export function validateTimeline(timeline, registry) {
  if (!timeline || typeof timeline !== "object") throw new TypeError("timeline 레코드가 아닙니다");
  if (typeof timeline.topic !== "string" || !timeline.topic.trim()) throw new TypeError("timeline.topic이 비었습니다");
  if (!Array.isArray(timeline.entries) || timeline.entries.length === 0) throw new TypeError("timeline entries가 없습니다");
  for (const key of Object.keys(timeline)) {
    if (TIMELINE_FORBIDDEN_KEYS.includes(key)) throw new TypeError(`타임라인에 반응 레이어는 설계 게이트 뒤에만 가능: ${key}`);
  }
  let previous = 0;
  for (const entry of timeline.entries) {
    for (const key of Object.keys(entry)) {
      if (TIMELINE_FORBIDDEN_KEYS.includes(key)) throw new TypeError(`타임라인 entry에 반응 레이어 금지: ${key}`);
    }
    const source = registry.sources.find((candidate) => candidate.id === entry.sourceId);
    if (!source || !TIMELINE_ALLOWED_SOURCE_TYPES.includes(source.type)) {
      throw new TypeError(`타임라인은 official/primary 출처만 허용: ${entry.sourceId}`);
    }
    const ts = Date.parse(entry.ts);
    if (Number.isNaN(ts)) throw new TypeError("entry.ts가 올바른 시각이 아닙니다");
    if (ts < previous) throw new TypeError("타임라인은 시간순이어야 합니다");
    previous = ts;
    if (typeof entry.claim !== "string" || !entry.claim.trim()) throw new TypeError("entry.claim이 비었습니다");
    if (typeof entry.url !== "string" || !/^https:\/\//.test(entry.url)) throw new TypeError("entry.url은 https 원문이어야 합니다");
  }
  return timeline;
}
