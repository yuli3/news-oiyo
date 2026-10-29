import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateDeck, renderDeck } from '../render-cardnews.mjs';
const input = JSON.parse(readFileSync(new URL('../../public/examples/cardnews-deck.json', import.meta.url)));
test('downloadable example renders three source-linked SVGs and readable HTML', () => {
  assert.equal(validateDeck(input).cards.length, 3);
  const output = renderDeck(input);
  assert.equal([...output.keys()].filter(name => name.endsWith('.svg')).length, 3);
  assert.ok(output.get('index.html').includes('Do not make the image'));
});
for (const lang of ['ko','en','ja','zh','fr','es']) test(`${lang} guide is discoverable, linked and complete before JavaScript`, () => {
  const html = readFileSync(new URL(`../../dist/analysis/${lang}/cardnews-production/index.html`,import.meta.url),'utf8');
  assert.ok(html.includes(`<html lang="${lang}"`));
  assert.ok(html.includes(`https://news.oiyo.net/analysis/${lang}/cardnews-production/`));
  assert.match(html, /href="\/examples\/cardnews-deck.json"/);
  assert.ok(html.includes('https://www.w3.org/WAI/tutorials/images/complex/'));
  assert.ok(html.includes('--dry-run'));
  assert.ok(html.includes('<details>'));
  assert.ok(html.includes('<table>'));
  assert.ok(!html.includes('**'));
  const index = readFileSync(new URL('../../dist/analysis/index.html',import.meta.url),'utf8');
  assert.equal(index.split(`href="/analysis/${lang}/cardnews-production/"`).length - 1, lang === "ko" ? 2 : 1);
});
