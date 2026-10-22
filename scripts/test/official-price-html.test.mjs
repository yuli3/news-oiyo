import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const lang of ['ko','en','ja','zh','fr','es']) {
  test(`${lang}: rendered article exposes dated sourced prices, assumptions and static conditions`, () => {
    const html = readFileSync(new URL(`../../dist/analysis/${lang}/ai-price-performance/index.html`, import.meta.url),'utf8');
    const section = html.match(/<section data-official-prices="2026-10-23"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section);
    for (const model of ['GPT-6.1 Sol','Claude Sonnet 5.5','Gemini 4 Argon']) assert.ok(section.includes(model));
    for (const url of ['https://developers.openai.com/api/docs/pricing','https://platform.claude.com/docs/en/about-claude/pricing','https://ai.google.dev/gemini-api/docs/pricing']) assert.ok(section.includes(`href="${url}"`));
    assert.equal((section.match(/<tr\b/g)||[]).length,4);
    assert.match(section,/<caption/);
    assert.match(section,/<details\b/);
    assert.ok(section.includes('272K'));
    assert.ok(section.includes('2026-11-30'));
    assert.ok(section.includes('0.30') || section.includes('0,30'));
    assert.doesNotMatch(section,/undefined|NaN|\*\*/);
    assert.ok(html.includes('"dateModified":"2026-10-23"'));
    if(lang!=='ko') assert.doesNotMatch(section,/[가-힣]/);
  });
}
