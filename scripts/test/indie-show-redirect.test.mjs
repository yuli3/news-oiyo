import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('both legacy Indie hub spellings go directly to the Show canonical home', async () => {
  const rules = (await readFile(new URL('../../public/_redirects', import.meta.url), 'utf8'))
    .split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'))
    .map(line => line.split(/\s+/));
  for (const path of ['/indie', '/indie/']) {
    const matches = rules.filter(([source]) => source === path);
    assert.equal(matches.length, 1);
    assert.deepEqual(matches[0], [path, 'https://show.oiyo.net/', '301']);
  }
  assert.ok(!rules.some(([source]) => source === '/indie/*'), 'do not invent mappings for unpublished item slugs');
});
