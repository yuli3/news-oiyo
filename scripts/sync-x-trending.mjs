import { existsSync, readFileSync, writeFileSync, renameSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeXTrending } from './lib/x-trending.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
try {
  const values = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!['--date', '--input', '--min-score'].includes(args[i]) || !args[i + 1]) throw new Error('Usage: sync:x-trending -- [--date YYYY-MM-DD | --input FILE] [--min-score NUMBER]');
    values[args[i]] = args[i + 1];
  }
  const date = values['--date'] ?? new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('invalid date');
  const input = resolve(root, values['--input'] ?? `data/x-trending/${date}.json`);
  if (!existsSync(input)) { console.log('X input absent; news.json unchanged'); process.exit(0); }
  const out = resolve(root, 'src/data/news.json');
  const raw = readFileSync(out, 'utf8');
  const data = JSON.parse(readFileSync(input, 'utf8'));
  const merged = mergeXTrending(JSON.parse(raw), data, { minScore: Number(values['--min-score'] ?? 0) });
  const result = JSON.stringify(merged, null, 1);
  if (result !== raw) {
    writeFileSync(`${out}.tmp`, result, 'utf8');
    renameSync(`${out}.tmp`, out);
  }
  console.log(`X: ${merged.x_trending.posts.length} cards, ${merged.x_trending.duplicates.length} duplicates, hidden=${merged.x_trending.hidden}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
