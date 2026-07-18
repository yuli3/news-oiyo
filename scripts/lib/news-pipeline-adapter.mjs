// Adapter between trend_scout's raw signals and the public news snapshot.
// It deliberately reuses oiyo.news-source v1: source registry validation,
// fetchedAt/effectiveAt separation, canonical URL + content hash dedupe,
// append-only corrections, and evergreen proposal-only eligibility.
import {
  applyCorrection,
  canProposeEvergreen,
  canonicalUrl,
  contentHash,
  dedupeItems,
  validateItem,
  validateRegistry,
} from "./news-source-contract.mjs";

const ALLOWED_CORRECTION_FIELDS = new Set(["title", "effectiveAt", "summary"]);

function sourceLookup(registry) {
  const lookup = new Map();
  for (const source of registry.sources) {
    lookup.set(source.id.toLowerCase(), source);
    lookup.set(source.name.toLowerCase(), source);
    for (const alias of source.aliases ?? []) lookup.set(alias.toLowerCase(), source);
  }
  return lookup;
}

function requireIsoInstant(value, field) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) throw new TypeError(`${field} must be an ISO timestamp`);
  return value;
}

export function adaptTrendSignals(rawItems, rawRegistry, options = {}) {
  const registry = validateRegistry(rawRegistry);
  if (!Array.isArray(rawItems)) throw new TypeError("rawItems must be an array");
  const lookup = sourceLookup(registry);
  const fallbackFetchedAt = requireIsoInstant(options.fetchedAt, "fetchedAt");
  const errors = [];
  const normalized = [];

  for (const [index, raw] of rawItems.entries()) {
    try {
      if (!raw || typeof raw !== "object") throw new TypeError("signal must be an object");
      const sourceKey = String(raw.sourceId ?? raw.src ?? "").trim().toLowerCase();
      const source = lookup.get(sourceKey);
      if (!source) throw new TypeError(`unregistered source: ${raw.sourceId ?? raw.src ?? "(empty)"}`);
      if (typeof raw.title !== "string" || !raw.title.trim()) throw new TypeError("title is empty");
      const normalizedUrl = canonicalUrl(raw.url);
      if (!normalizedUrl.startsWith("https://")) throw new TypeError("url must use https");
      const fetchedAt = requireIsoInstant(raw.fetchedAt ?? fallbackFetchedAt, "fetchedAt");
      const hash = contentHash(raw.title);
      let item = {
        id: raw.id ?? `trend-${contentHash(`${normalizedUrl}|${raw.title}`)}`,
        sourceId: source.id,
        src: String(raw.src ?? source.name),
        url: normalizedUrl,
        canonicalUrl: normalizedUrl,
        title: raw.title.trim(),
        score: Number.isFinite(raw.score) ? raw.score : null,
        fetchedAt,
        contentHash: hash,
        corrections: [],
      };
      if (raw.effectiveAt !== undefined) item.effectiveAt = requireIsoInstant(raw.effectiveAt, "effectiveAt");
      if (raw.stillAccurate === true) item.stillAccurate = true;
      validateItem(item, registry);
      normalized.push(item);
    } catch (error) {
      errors.push({ index, reason: error instanceof Error ? error.message : String(error) });
    }
  }

  if (errors.length && options.strict !== false) {
    throw new TypeError(`news source adaptation failed: ${errors.map(({ index, reason }) => `[${index}] ${reason}`).join("; ")}`);
  }

  const deduped = dedupeItems(normalized);
  const corrections = Array.isArray(options.corrections) ? options.corrections : [];
  const correctionsByItem = new Map();
  for (const correction of corrections) {
    if (!correction || typeof correction.itemId !== "string") throw new TypeError("correction.itemId is required");
    if (!ALLOWED_CORRECTION_FIELDS.has(correction.field)) throw new TypeError(`correction field is not append-only eligible: ${correction.field}`);
    const list = correctionsByItem.get(correction.itemId) ?? [];
    list.push(correction);
    correctionsByItem.set(correction.itemId, list);
  }

  const correctedItems = deduped.kept.map((original) => {
    let item = original;
    for (const correction of correctionsByItem.get(item.id) ?? []) item = applyCorrection(item, correction);
    return item;
  });
  const knownIds = new Set(correctedItems.map(({ id }) => id));
  for (const itemId of correctionsByItem.keys()) {
    if (!knownIds.has(itemId)) throw new TypeError(`correction references unknown or deduped item: ${itemId}`);
  }

  const now = options.now instanceof Date ? options.now : new Date();
  const evergreenProposals = [];
  for (const item of correctedItems) {
    const result = canProposeEvergreen(item, registry, now);
    if (result.eligible) evergreenProposals.push(result.proposal);
  }

  return {
    schema: "oiyo.news-pipeline-batch",
    schemaVersion: 1,
    items: correctedItems,
    dropped: [...errors.map(({ index, reason }) => ({ index, reason })), ...deduped.dropped],
    evergreenProposals,
  };
}

export function auditNewsPayload(payload, registry) {
  validateRegistry(registry);
  const errors = [];
  if (!payload || typeof payload !== "object") return ["payload must be an object"];
  if (payload.sourceContract?.schema !== "oiyo.news-source" || payload.sourceContract?.schemaVersion !== 1) {
    errors.push("sourceContract must declare oiyo.news-source v1");
  }
  if (payload.sourceContract?.evergreenMode !== "propose-only") errors.push("evergreenMode must be propose-only");
  for (const [dayIndex, day] of (payload.days ?? []).entries()) {
    for (const [itemIndex, item] of (day.items ?? []).entries()) {
      const path = `days[${dayIndex}].items[${itemIndex}]`;
      try {
        validateItem(item, registry);
        if (item.canonicalUrl !== canonicalUrl(item.url)) errors.push(`${path}: canonicalUrl mismatch`);
        const firstTitleCorrection = item.corrections?.find(({ field }) => field === "title");
        const hashBasis = firstTitleCorrection?.from ?? item.title;
        if (item.contentHash !== contentHash(hashBasis)) errors.push(`${path}: contentHash mismatch`);
        if (!Array.isArray(item.corrections)) errors.push(`${path}: corrections must be append-only array`);
        if ("evergreen" in item || item.status === "published") errors.push(`${path}: evergreen publication state is forbidden`);
      } catch (error) {
        errors.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  return errors;
}
