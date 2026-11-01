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

const publishedFeed = () => ({ schemaVersion: 1, week: '2026-W43', eligibleCount: 0,
  newsCard: { mode: 'open-call', section: '인디 제품 쇼케이스', headline: '기존 주차',
    summary: '운영자 제품 소개', showcaseUrl: 'https://show.oiyo.net/',
    submitUrl: 'https://show.oiyo.net/submit/', featuredSeeds: [] }, socialDrafts: { xPost: '' } });
function remoteFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'oiyo-show-remote-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const script = path.join(root, 'sync.mjs'), output = path.join(root, 'published.json');
  fs.copyFileSync(new URL('../sync-showcase-weekly.mjs', import.meta.url), script);
  fs.writeFileSync(output, 'last-good');
  return { root, output, run(options = {}) {
    const env = { ...process.env, SHOWCASE_OUTPUT_PATH: output };
    delete env.SHOW_SUBMISSIONS_PATH; delete env.SHOW_WEEKLY_PAYLOAD_PATH;
    const args = [];
    if ('text' in options) {
      const feed = path.join(root, 'feed.json'); fs.writeFileSync(feed, options.text);
      env.SHOW_WEEKLY_PAYLOAD_PATH = feed;
    } else {
      const stub = path.join(root, 'fetch.mjs');
      // Exercise the public CLI and fetch contract without a network or a sibling Show repo.
      fs.writeFileSync(stub, `globalThis.fetch = async (url, options) => {
        if (url !== 'https://show.oiyo.net/weekly.json' || options.redirect !== 'error' || !options.signal) throw new Error('wrong fetch contract');
        ${options.reject ? "throw new Error('offline');" : `return new Response(${JSON.stringify(options.body ?? JSON.stringify(publishedFeed()))}, { status: ${options.status ?? 200}, headers: { 'content-type': ${JSON.stringify(options.type ?? 'application/json')} } });`}
      };`);
      args.push('--import', stub);
    }
    return spawnSync(process.execPath, [...args, script], { env, encoding: 'utf8' });
  } };
}
test('remote JSON sync works without any Show checkout and preserves the source week', t => {
  const f = remoteFixture(t); const r = f.run(); assert.equal(r.status, 0, r.stderr);
  const { schemaVersion, ...expected } = publishedFeed();
  assert.deepEqual(JSON.parse(fs.readFileSync(f.output)), expected);
  assert.equal(fs.existsSync(path.join(f.root, 'show')), false);
  assert.equal(fs.readdirSync(f.root).some(n => n.startsWith('.showcase-sync-')), false);
});
test('invalid version/week/link/content cannot replace the last good published payload', t => {
  const f = remoteFixture(t);
  for (const change of [d => { d.schemaVersion = 2; }, d => { d.week = '2026-W99'; },
    d => { d.newsCard.showcaseUrl = 'https://example.test/'; },
    d => { d.socialDrafts.xPost = 'invented winner'; }, d => { d.eligibleCount = -1; }]) {
    const data = publishedFeed(); change(data);
    assert.notEqual(f.run({ text: JSON.stringify(data) }).status, 0);
    assert.equal(fs.readFileSync(f.output, 'utf8'), 'last-good');
  }
});
test('network failure, HTTP error, HTML, malformed JSON and oversized feeds preserve prior output', t => {
  const f = remoteFixture(t);
  for (const options of [{ reject: true }, { status: 503 }, { type: 'text/html', body: '<h1>no</h1>' },
    { body: '{' }, { body: ' '.repeat(70 * 1024) }]) {
    assert.notEqual(f.run(options).status, 0);
    assert.equal(fs.readFileSync(f.output, 'utf8'), 'last-good');
  }
});
