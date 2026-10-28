import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'oiyo-video-preflight-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const dir of ['scripts', 'scripts/lib', 'src/data', 'reports/video-briefings', 'bin']) fs.mkdirSync(path.join(root, dir), { recursive: true });
  fs.copyFileSync(new URL('../publish-social-video.mjs', import.meta.url), path.join(root, 'scripts/publish-social-video.mjs'));
  fs.copyFileSync(new URL('../lib/social-attribution.mjs', import.meta.url), path.join(root, 'scripts/lib/social-attribution.mjs'));
  fs.writeFileSync(path.join(root, 'src/data/news.json'), JSON.stringify({ days: [{ date: '2026-10-18', items: [{ title: 'A verified headline' }] }] }));
  const out = path.join(root, 'reports/video-briefings');
  fs.writeFileSync(path.join(out, '2026-10-18-briefing.mp4'), 'fixture');
  fs.writeFileSync(path.join(out, '2026-10-18-cover.png'), 'fixture');
  fs.writeFileSync(path.join(root, 'bin/ffprobe'), `#!${process.execPath}\nconsole.log(process.env.PROBE_JSON);\n`, { mode: 0o700 });
  const meta = { streams: [{ codec_type: 'video', codec_name: 'h264', width: 1080, height: 1920, duration: '45' }, { codec_type: 'audio', codec_name: 'aac' }], format: { duration: '45', size: '1024' } };
  const run = (args = [], override = {}) => spawnSync(process.execPath, [path.join(root, 'scripts/publish-social-video.mjs'), ...args], { encoding: 'utf8', env: { ...process.env, HOME: root, PATH: path.join(root, 'bin') + path.delimiter + process.env.PATH, PROBE_JSON: JSON.stringify(meta), ...override } });
  return { out, run, meta };
}

test('dry-run validates without creating payloads or changing an existing queue', t => {
  const { out, run } = fixture(t);
  const queue = '[{"date":"2026-10-18","status":"published","url":"https://example.test/video"}]';
  fs.writeFileSync(path.join(out, 'social-queue.json'), queue);
  const result = run(['--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.readFileSync(path.join(out, 'social-queue.json'), 'utf8'), queue);
  assert.equal(fs.existsSync(path.join(out, '2026-10-18-social-payload.json')), false);
});

test('invalid video metadata cannot enter the queue', t => {
  const { out, run, meta } = fixture(t);
  for (const patch of [
    { streams: [{ ...meta.streams[0], width: 720 }, meta.streams[1]] },
    { streams: [{ ...meta.streams[0], codec_name: 'hevc' }, meta.streams[1]] },
    { streams: [meta.streams[0]] },
    { format: { duration: '45', size: '60000000' } },
    { streams: [{ ...meta.streams[0], duration: 'NaN' }, meta.streams[1]], format: { duration: 'NaN', size: '1024' } },
  ]) {
    const result = run(['--queue'], { PROBE_JSON: JSON.stringify({ ...meta, ...patch }) });
    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(path.join(out, 'social-queue.json')), false);
  }
  assert.notEqual(run(['--queue'], { PROBE_JSON: 'broken' }).status, 0);
});

test('queue preparation preserves completed records and rejects corrupt original data', t => {
  const { out, run } = fixture(t);
  const queuePath = path.join(out, 'social-queue.json');
  const original = '[{"date":"2026-10-18","status":"published","publishedUrl":"https://example.test/video"}]';
  fs.writeFileSync(queuePath, original);
  assert.equal(run(['--queue']).status, 0);
  assert.equal(fs.readFileSync(queuePath, 'utf8'), original);
  fs.writeFileSync(queuePath, 'broken-original');
  assert.notEqual(run(['--queue']).status, 0);
  assert.equal(fs.readFileSync(queuePath, 'utf8'), 'broken-original');
});

test('unknown explicit date does not silently prepare another day', t => {
  const { out, run } = fixture(t);
  assert.notEqual(run(['2026-10-19', '--queue']).status, 0);
  assert.equal(fs.existsSync(path.join(out, 'social-queue.json')), false);
});

test('read-only missing video does not invoke the renderer', t => {
  const { out, run } = fixture(t);
  fs.unlinkSync(path.join(out, '2026-10-18-briefing.mp4'));
  const result = run(['--dry-run']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /read-only verification does not render/);
  assert.equal(fs.existsSync(path.join(out, 'social-queue.json')), false);
});

test('valid preparation produces a ready queue without claiming publication', t => {
  const { out, run } = fixture(t);
  const result = run(['--queue']);
  assert.equal(result.status, 0, result.stderr);
  const queue = JSON.parse(fs.readFileSync(path.join(out, 'social-queue.json'), 'utf8'));
  assert.equal(queue[0].status, 'ready');
  assert.equal(fs.existsSync(path.join(out, '2026-10-18-social-payload.json')), true);
});

// Verify the public preparation CLI's actual output, without posting or credentials.
test('prepared platform payloads attribute each OIYO destination without publishing', t => {
  const { out, run } = fixture(t);
  const result = run(['2026-10-18', '--queue']);
  assert.equal(result.status, 0, result.stderr);
  const { platforms } = JSON.parse(fs.readFileSync(path.join(out, '2026-10-18-social-payload.json'), 'utf8'));
  for (const [key, field, source, medium] of [['youtubeShorts', 'description', 'youtube', 'shorts'], ['instagramReels', 'caption', 'instagram', 'shorts'], ['xTwitter', 'text', 'x', 'social']]) {
    const links = platforms[key][field].match(/https:\/\/[^\s]+/g);
    assert.ok(links?.length);
    for (const link of links) {
      const url = new URL(link);
      assert.ok(['news.oiyo.net', 'show.oiyo.net'].includes(url.hostname));
      assert.equal(url.searchParams.get('utm_source'), source);
      assert.equal(url.searchParams.get('utm_medium'), medium);
      assert.equal(url.searchParams.get('utm_campaign'), 'briefing-2026-10-18');
    }
  }
  const queue = JSON.parse(fs.readFileSync(path.join(out, 'social-queue.json'), 'utf8'));
  assert.notEqual(queue[0].status, 'published');
});
