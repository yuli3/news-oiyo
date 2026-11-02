import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {renderDeck} from '../render-cardnews.mjs';
const deck={schemaVersion:1,language:'ko',checkedOn:'2026-10-29',title:'설명 <초안>',landingUrl:'https://tools.oiyo.net/en/us-bankruptcy-income-worksheet/',cards:Array.from({length:3},()=>({heading:'계산 & 근거',body:'금액 < 0 이면? "이것"을 확인해요.',sourceLabel:'공식 출처',sourceUrl:'https://www.justice.gov/ust/means-testing'}))};
test('SVG and accessible preview escape content, retain sources, and always remain draft',()=>{
 const files=renderDeck(deck);assert.equal(files.size,5);assert.match(files.get('card-01.svg'),/계산 &amp; 근거/);assert.match(files.get('index.html'),/금액 &lt; 0/);assert.ok(files.get('index.html').includes('https://www.justice.gov/ust/means-testing'));assert.equal(JSON.parse(files.get('manifest.json')).status,'draft');
 assert.deepEqual([...renderDeck(deck)], [...files]);
});
test('unsafe links, invalid dates and overflowing copy are rejected before rendering',()=>{
 for(const change of [{checkedOn:'2026-02-30'},{landingUrl:'https://example.com/'},{cards:deck.cards.map(c=>({...c,sourceUrl:'javascript:alert(1)'}))},{cards:deck.cards.map(c=>({...c,body:'x'.repeat(221)}))}]) assert.throws(()=>renderDeck({...deck,...change}));
});
test('public CLI: help/dry-run invalid option never writes; explicit render refuses overwrite',async()=>{
 const root=await mkdtemp(join(tmpdir(),'oiyo-cardnews-'));const input=join(root,'deck.json'),out=join(root,'out');
 const command=resolve('scripts/render-cardnews.mjs');
 const run=(...args)=>spawnSync(process.execPath,[command,...args],{cwd:root,encoding:'utf8'});
 try {await writeFile(input,JSON.stringify(deck));
 assert.equal(run('--help').status,0);assert.equal(run('--wrong').status,1);
 assert.equal(run('--input',input,'--out',out,'--dry-run').status,0);assert.deepEqual(await readdir(root),['deck.json']);
 assert.equal(run('--input',input,'--out',out).status,0);assert.equal((await readdir(out)).length,5);
 const original=await readFile(join(out,'manifest.json'),'utf8');assert.equal(run('--input',input,'--out',out).status,1);assert.equal(await readFile(join(out,'manifest.json'),'utf8'),original);
 } finally {await rm(root,{recursive:true,force:true});}
});
