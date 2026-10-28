#!/usr/bin/env node
import { readFile, mkdir, writeFile, rename, rm, access } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function text(value, name, max) {
  if (typeof value !== 'string' || !value.trim() || [...value].length > max || /[\u0000-\u001f\u007f]/u.test(value)) throw new Error(`${name}: non-empty text up to ${max} characters required`);
  return value.trim();
}
function url(value, name) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error(`${name}: public HTTPS URL without credentials required`);
  return parsed.href;
}
export function validateDeck(input) {
  if (!input || input.schemaVersion !== 1 || !Array.isArray(input.cards) || input.cards.length < 3 || input.cards.length > 8) throw new Error('schemaVersion 1 and 3–8 cards required');
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(input.language ?? '')) throw new Error('language tag required');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.checkedOn ?? '') || new Date(`${input.checkedOn}T00:00:00Z`).toISOString().slice(0,10) !== input.checkedOn) throw new Error('valid checkedOn date required');
  const landing = url(input.landingUrl, 'landingUrl');
  if (!['news.oiyo.net','tools.oiyo.net','oiyo.net','game.oiyo.net','wiki.oiyo.net','blog.oiyo.net','show.oiyo.net'].includes(new URL(landing).hostname)) throw new Error('landingUrl must be an existing OIYO family destination');
  return {schemaVersion:1, status:'draft', title:text(input.title,'title',72), language:input.language, checkedOn:input.checkedOn, landingUrl:landing,
    cards:input.cards.map((card,index) => ({heading:text(card.heading,`card ${index+1} heading`,56), body:text(card.body,`card ${index+1} body`,220), sourceLabel:text(card.sourceLabel,`card ${index+1} sourceLabel`,70), sourceUrl:url(card.sourceUrl,`card ${index+1} sourceUrl`)}))};
}
// 2026-10-29: deterministic, bounded text wrapping avoids silently clipping facts.
// The HTML preview contains the complete same copy and source links, not hover-only text.
function lines(value, max) {
  const result = []; let line = '';
  for (const char of [...value]) { if ([...line].length === max) { result.push(line); line = ''; } line += char; }
  if (line) result.push(line);
  return result;
}
function svgCard(deck, card, index) {
  const heading = lines(card.heading,20), body = lines(card.body,20);
  const rows = (values,x,y,step,size,fill) => values.map((line,i)=>`<text x="${x}" y="${y+i*step}" font-size="${size}" fill="${fill}">${escape(line)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc"><title id="title">${escape(card.heading)}</title><desc id="desc">${escape(card.body)} Source: ${escape(card.sourceLabel)}</desc><rect width="1080" height="1350" fill="#0d1725"/><rect x="56" y="56" width="968" height="1238" rx="24" fill="#14283a" stroke="#456477"/><g font-family="sans-serif"><text x="96" y="130" font-size="26" fill="#8ae6c4">OIYO · DRAFT · ${index+1}/${deck.cards.length}</text>${rows(heading,96,230,66,50,'#f6f7f8')}<path d="M96 420H984" stroke="#8ae6c4" stroke-width="4"/>${rows(body,96,490,50,42,'#e2e9ee')}${rows(lines(card.sourceLabel,44),96,1110,34,22,'#a5bbc9')}<text x="96" y="1235" font-size="22" fill="#a5bbc9">${escape(deck.checkedOn)} · ${escape(new URL(card.sourceUrl).hostname)}</text></g></svg>`;
}
export function renderDeck(input) {
  const deck=validateDeck(input), files=new Map();
  deck.cards.forEach((card,index)=>files.set(`card-${String(index+1).padStart(2,'0')}.svg`,svgCard(deck,card,index)));
  const cards=deck.cards.map((card,index)=>`<article><img src="card-${String(index+1).padStart(2,'0')}.svg" alt="${escape(card.heading)}"/><h2>${escape(card.heading)}</h2><p>${escape(card.body)}</p><a href="${escape(card.sourceUrl)}">${escape(card.sourceLabel)}</a></article>`).join('');
  files.set('index.html',`<!doctype html><html lang="${escape(deck.language)}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(deck.title)} · draft</title><style>body{margin:0;background:#0d1725;color:#e2e9ee;font:16px/1.6 system-ui}main{max-width:1050px;margin:auto;padding:16px}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px}article{min-width:0;border:1px solid #456477;border-radius:12px;padding:12px}img{display:block;width:100%;height:auto}a{color:#8ae6c4;overflow-wrap:anywhere}h2{font-size:20px}p{overflow-wrap:anywhere}</style><main><p>Draft · ${escape(deck.checkedOn)}</p><h1>${escape(deck.title)}</h1><p>제작 초안이에요. 출처·문맥·실제 화면을 검토한 뒤 기존 게시 담당 흐름에 전달해 주세요. 이 명령은 게시하거나 발송하지 않아요.</p><p><a href="${escape(deck.landingUrl)}">OIYO 원문 / destination</a></p><section>${cards}</section></main></html>`);
  files.set('manifest.json',JSON.stringify({...deck,contentHash:createHash('sha256').update(JSON.stringify(deck)).digest('hex'),files:[...files.keys()]},null,2)+'\n');
  return files;
}
export async function main(args) {
  if (args.length===1 && args[0]==='--help') { console.log('node scripts/render-cardnews.mjs --input <reviewed-deck.json> --out <new-directory> [--dry-run]\nDraft SVG cards and accessible HTML only. No uploads, network calls or overwrite.'); return; }
  const values={}; let dry=false;
  for(let i=0;i<args.length;i++) {
    if(args[i]==='--dry-run') { dry=true; continue; }
    if(!['--input','--out'].includes(args[i]) || !args[i+1] || args[i+1].startsWith('--') || values[args[i]]) throw new Error(`Unknown, repeated or missing option: ${args[i]}`);
    values[args[i]]=args[++i];
  }
  if(!values['--input'] || !values['--out']) throw new Error('--input and --out required');
  const files=renderDeck(JSON.parse(await readFile(resolve(values['--input']),'utf8')));
  if(dry) { console.log(JSON.stringify({status:'dry-run',files:[...files.keys()]})); return; }
  const out=resolve(values['--out']);
  try { await access(out); throw new Error('Output already exists; choose a new directory'); } catch(error) { if(error.code!=='ENOENT') throw error; }
  await mkdir(dirname(out),{recursive:true});
  const temp=resolve(dirname(out),`.${basename(out)}-${process.pid}-${Date.now()}.tmp`);
  await mkdir(temp);
  try { for(const [name,body] of files) await writeFile(resolve(temp,name),body,{flag:'wx'}); await rename(temp,out); }
  catch(error) { await rm(temp,{recursive:true,force:true}); throw error; }
  console.log(JSON.stringify({status:'draft',out,files:[...files.keys()]}));
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) main(process.argv.slice(2)).catch(error=>{console.error(error.message);process.exitCode=1;});
