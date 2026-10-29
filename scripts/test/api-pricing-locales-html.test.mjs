import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const dist=new URL('../../dist/',import.meta.url);
const ko=readFileSync(new URL('ai/pricing/index.html',dist),'utf8');
const table=html=>html.match(/<table data-api-pricing[^>]*>[\s\S]*?<\/table>/)?.[0];
const moneyColumns=html=>[...table(html).matchAll(/<tr\b[^>]*><th\b[^>]*scope="row"[^>]*>[\s\S]*?<\/th><td\b[^>]*>([^<]*)<\/td><td\b[^>]*>([^<]*)<\/td><td\b[^>]*>([^<]*)<\/td>/g)].map(match=>match.slice(1,4));
for(const lang of ['ko','en','ja','zh','fr','es']) test(`${lang}: all 16 model prices preserved and conditions localized in built HTML`,()=>{
 const html=lang==='ko'?ko:readFileSync(new URL(`ai/${lang}/pricing/index.html`,dist),'utf8');const api=table(html);assert.ok(api);
 assert.equal(moneyColumns(html).length,16);assert.deepEqual(moneyColumns(html),moneyColumns(ko));
 if(lang!=='ko') assert.doesNotMatch(api,/[가-힣]/);
 assert.ok(api.includes('2026-12-01'));assert.ok(api.includes('2027-01-01'));
 assert.ok(api.includes('https://dev.meta.ai/docs/pricing-rate-limits'));
 assert.doesNotMatch(html,/Wonder Full은 API 미제공|Wonder Full is not sold via API|Wonder FullはAPI提供がなく|Wonder Full n&#39;est pas vendu en API|Wonder Full no se vende por API/);
});
