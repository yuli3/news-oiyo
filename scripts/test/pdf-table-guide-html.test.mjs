import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for(const locale of ['ko','en','ja','zh','fr','es'])test('PDF verification guide '+locale,()=>{
 const path=locale==='ko'?'ai/use-cases/pdf-table-verification/':'ai/'+locale+'/use-cases/pdf-table-verification/';
 const h=readFileSync(new URL('../../dist/'+path+'index.html',import.meta.url),'utf8');
 assert.ok(h.includes('data-pdf-check'));
 assert.equal((h.match(/data-pdf-example=/g)||[]).length,4);
 for(const x of ['120000 KRW','−20','null ≠ 0','180 ≠ 330'])assert.ok(h.includes(x));
 assert.ok(h.includes('https://www.w3.org/WAI/tutorials/tables/multi-level/'));
 assert.ok(h.includes('https://news.oiyo.net/'+path));
 assert.equal((h.match(/<h1(?:\s|>)/g)||[]).length,1);
});
