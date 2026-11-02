#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIMIT = 64 * 1024;
function validateFeed(text) {
  if (Buffer.byteLength(text) > LIMIT) throw new Error('Show feed too large');
  const feed = JSON.parse(text);
  if (feed.schemaVersion !== 1 || !/^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(feed.week) ||
      !Number.isSafeInteger(feed.eligibleCount) || feed.eligibleCount < 0) throw new Error('Invalid Show feed version/week/count');
  const card = feed.newsCard;
  if (!card || !['winner', 'open-call'].includes(card.mode) ||
      typeof card.section !== 'string' || typeof feed.socialDrafts?.xPost !== 'string' ||
      (card.aiTools !== undefined && (!Array.isArray(card.aiTools) || !card.aiTools.every(x => typeof x === 'string'))))
    throw new Error('Invalid Show feed content');
  const safeUrl = value => {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'show.oiyo.net' || url.port || url.username || url.password || url.search || url.hash)
      throw new Error('Invalid Show link');
  };
  safeUrl(card.showcaseUrl); safeUrl(card.submitUrl);
  if (card.mode === 'winner') {
    if (feed.eligibleCount < 1 || typeof card.title !== 'string' || !card.title ||
        typeof card.oneLiner !== 'string' || typeof card.maker !== 'string' || !Array.isArray(card.runnersUp))
      throw new Error('Invalid Show winner');
    for (const entry of card.runnersUp) safeUrl(entry.url);
  } else {
    if (typeof card.headline !== 'string' || typeof card.summary !== 'string' ||
        !Array.isArray(card.featuredSeeds) || feed.socialDrafts.xPost !== '')
      throw new Error('Invalid Show open call');
    for (const entry of card.featuredSeeds) {
      if (typeof entry.title !== 'string' || typeof entry.oneLiner !== 'string') throw new Error('Invalid Show seed');
      safeUrl(entry.url);
    }
  }
  return { week: feed.week, eligibleCount: feed.eligibleCount, newsCard: card, socialDrafts: feed.socialDrafts };
}

async function readRemoteFeed() {
  // WHY 2026-11-01: Show owns ranking logic; only curated JSON crosses this boundary.
  // No remote code execution, sibling repository, authentication, or invented fallback week.
  const response = await fetch('https://show.oiyo.net/weekly.json', { signal: AbortSignal.timeout(15000), redirect: 'error' });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json') || !response.body)
    throw new Error('Show feed unavailable; existing News payload preserved');
  const reader = response.body.getReader(); const parts = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > LIMIT) throw new Error('Show feed too large');
      parts.push(value);
    }
  } finally { await reader.cancel(); }
  return validateFeed(Buffer.concat(parts).toString('utf8'));
}

let payload;
if (process.env.SHOW_SUBMISSIONS_PATH) {
  // Explicit local fixtures remain available; production never guesses a ../show path.
  const source = path.resolve(process.env.SHOW_SUBMISSIONS_PATH);
  const contract = path.resolve(path.dirname(source), '../lib/showcase.mjs');
  if (!fs.existsSync(source) || !fs.existsSync(contract)) throw new Error('Show source/contract unavailable; existing News payload preserved');
  const { weeklyPayload } = await import(pathToFileURL(contract).href);
  payload = weeklyPayload(JSON.parse(fs.readFileSync(source, 'utf8')));
} else if (process.env.SHOW_WEEKLY_PAYLOAD_PATH) {
  payload = validateFeed(fs.readFileSync(process.env.SHOW_WEEKLY_PAYLOAD_PATH, 'utf8'));
} else {
  payload = await readRemoteFeed();
}
const output = process.env.SHOWCASE_OUTPUT_PATH ? path.resolve(process.env.SHOWCASE_OUTPUT_PATH) : path.join(root, 'src/data/showcase-weekly.json');
const staging = fs.mkdtempSync(path.join(path.dirname(output), '.showcase-sync-'));
try {
  const temp = path.join(staging, 'payload.json');
  fs.writeFileSync(temp, JSON.stringify(payload, null, 2) + '\n');
  fs.renameSync(temp, output);
} finally { fs.rmSync(staging, { recursive: true, force: true }); }
console.log(`showcase-weekly synced: week=${payload.week} mode=${payload.newsCard.mode} eligible=${payload.eligibleCount}`);
