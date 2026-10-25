import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const source=new URL('../render-daily-video.mjs',import.meta.url);
function fixture(t){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'oiyo-render-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 for(const p of ['scripts/lib','src/data','bin'])fs.mkdirSync(path.join(root,p),{recursive:true});
 fs.copyFileSync(source,path.join(root,'scripts/render-daily-video.mjs'));
 fs.copyFileSync(new URL('../lib/story-scope.mjs',import.meta.url),path.join(root,'scripts/lib/story-scope.mjs'));
 const marker=path.join(root,'injected');
 fs.writeFileSync(path.join(root,'src/data/news.json'),JSON.stringify({days:[{date:'2026-10-25',items:[{title:`AI $(touch ${marker})`,summary:'A short fixture',source:'OpenAI'}]}]}));
 const stub=`#!${process.execPath}\nconst fs=require('node:fs'),path=require('node:path');const args=process.argv.slice(2),name=path.basename(process.argv[1]);fs.appendFileSync(process.env.RENDER_LOG,JSON.stringify({name,args})+'\\n');if(process.env.FAIL_STAGE===name)process.exit(2);if(name==='ffprobe'){process.stdout.write(process.env.PROBE_TEXT || '8.0');}else if(name==='say'){fs.writeFileSync(args[args.indexOf('-o')+1],'audio');}else if(name==='rsvg-convert'){fs.writeFileSync(args[args.indexOf('-o')+1],'image');}else{fs.writeFileSync(args.at(-1),'media');}`;
 for(const name of ['say','ffmpeg','ffprobe','rsvg-convert'])fs.writeFileSync(path.join(root,'bin',name),stub,{mode:0o755});
 const run=(date='2026-10-25',extra={})=>spawnSync(process.execPath,[path.join(root,'scripts/render-daily-video.mjs'),date],{cwd:root,encoding:'utf8',env:{...process.env,PATH:path.join(root,'bin')+path.delimiter+process.env.PATH,RENDER_LOG:path.join(root,'calls.jsonl'),...extra}});
 return{root,marker,run,out:path.join(root,'reports/video-briefings')};
}
test('public renderer passes narration literally and produces assets referenced by the manifest',t=>{
 const f=fixture(t),r=f.run();assert.equal(r.status,0,r.stderr);assert.equal(fs.existsSync(f.marker),false);
 const calls=fs.readFileSync(path.join(f.root,'calls.jsonl'),'utf8');assert.match(calls,/\$\(touch/);
 const m=JSON.parse(fs.readFileSync(path.join(f.out,'2026-10-25-hyperframes.json')));
 assert.ok(m.scenes.length>=3);for(const s of m.scenes)assert.ok(fs.existsSync(path.join(f.out,s.slideAsset)),s.slideAsset);
 assert.ok(fs.existsSync(path.join(f.out,'2026-10-25-briefing.mp4')));
});
test('failed narration stops before claiming a rendered video',t=>{
 const f=fixture(t),r=f.run('2026-10-25',{FAIL_STAGE:'say'});assert.notEqual(r.status,0);assert.match(r.stderr,/narration failed/);assert.equal(fs.existsSync(path.join(f.out,'2026-10-25-hyperframes.json')),false);
});
test('unknown explicit date cannot render a different date',t=>{
 const f=fixture(t),r=f.run('2026-10-24');assert.notEqual(r.status,0);assert.equal(fs.existsSync(path.join(f.out,'2026-10-25-briefing.mp4')),false);
});

test('invalid measured duration cannot become a fabricated default',t=>{
 const f=fixture(t),r=f.run('2026-10-25',{PROBE_TEXT:'NaN'});assert.notEqual(r.status,0);assert.match(r.stderr,/Invalid narration duration/);assert.equal(fs.existsSync(path.join(f.out,'2026-10-25-briefing.mp4')),false);
});
