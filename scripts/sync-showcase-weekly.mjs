#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const explicit = process.env.SHOW_SUBMISSIONS_PATH;
const source = explicit ? path.resolve(explicit) : path.resolve(root, '../show/src/data/submissions.json');
const contract = path.resolve(path.dirname(source), '../lib/showcase.mjs');
// 2026-10-19: never recreate rankings or fabricate an open call when the canonical Show input is unavailable.
if (!fs.existsSync(source) || !fs.existsSync(contract)) throw new Error('Show source/contract unavailable; existing News payload preserved');
const { weeklyPayload } = await import(pathToFileURL(contract).href);
const payload = weeklyPayload(JSON.parse(fs.readFileSync(source, 'utf8')));
const output = process.env.SHOWCASE_OUTPUT_PATH ? path.resolve(process.env.SHOWCASE_OUTPUT_PATH) : path.join(root, 'src/data/showcase-weekly.json');
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + '\n');
console.log(`showcase-weekly synced: week=${payload.week} mode=${payload.newsCard.mode} eligible=${payload.eligibleCount}`);
