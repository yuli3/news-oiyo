import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'oiyo-news-show-sync-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const dir of ['news/scripts', 'news/src/data', 'show/src/data', 'show/src/lib']) fs.mkdirSync(path.join(root, dir), { recursive: true });
  const script = path.join(root, 'news/scripts/sync-showcase-weekly.mjs');
  fs.copyFileSync(new URL('../sync-showcase-weekly.mjs', import.meta.url), script);
  const source = path.join(root, 'show/src/data/submissions.json');
  const contract = path.join(root, 'show/src/lib/showcase.mjs');
  const output = path.join(root, 'news/src/data/showcase-weekly.json');
  fs.writeFileSync(output, 'original-published-payload');
  const run = () => spawnSync(process.execPath, [script], { encoding: 'utf8', env: { ...process.env, SHOW_SUBMISSIONS_PATH: source, SHOWCASE_OUTPUT_PATH: output } });
  return { source, contract, output, run };
}
test('News CLI forwards the canonical Show payload without inventing its own ranking', t => {
  const f = fixture(t);
  const expected = { week: '2026-W43', eligibleCount: 0, newsCard: { mode: 'open-call', headline: '인디 제품', featuredSeeds: [{ title: 'Arcade 전체' }] }, socialDrafts: { xPost: '' } };
  fs.writeFileSync(f.source, JSON.stringify({ expected }));
  // The stub tests the CLI delegation boundary, not the Show ranking algorithm (tested in Show).
  fs.writeFileSync(f.contract, 'export function weeklyPayload(data) { return data.expected; }');
  const r = f.run(); assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(JSON.parse(fs.readFileSync(f.output)), expected);
});
test('missing source or contract does not replace the published payload with an invented empty week', t => {
  const f = fixture(t);
  assert.notEqual(f.run().status, 0);
  assert.equal(fs.readFileSync(f.output, 'utf8'), 'original-published-payload');
  fs.writeFileSync(f.source, '{}');
  assert.notEqual(f.run().status, 0);
  assert.equal(fs.readFileSync(f.output, 'utf8'), 'original-published-payload');
});
test('malformed Show data or rejected contract leaves previous News data intact', t => {
  const f = fixture(t);
  fs.writeFileSync(f.contract, 'export function weeklyPayload() { throw new Error("invalid week"); }');
  fs.writeFileSync(f.source, 'broken');
  assert.notEqual(f.run().status, 0);
  assert.equal(fs.readFileSync(f.output, 'utf8'), 'original-published-payload');
  fs.writeFileSync(f.source, '{}');
  assert.notEqual(f.run().status, 0);
  assert.equal(fs.readFileSync(f.output, 'utf8'), 'original-published-payload');
});
