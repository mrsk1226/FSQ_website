const fs=require('fs');const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const all=process.argv.includes('--all');const targets=all?['photo-bedroom','photo-living','photo-garden-sitting'].flatMap(room=>[['casement','2','closed'],['casement','2','open'],['casement','4','closed'],['casement','4','open'],['sliding','3','closed']].map(([type,design,state])=>({room,type,design,state}))):[{room:process.argv[2]||'photo-living',type:process.argv[3]||'casement',design:process.argv[4]||'4',state:process.argv[5]||'closed'}];
setTimeout(()=>{console.error('Evidence timeout');process.exit(1);},360000).unref();
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.setDefaultTimeout(30000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});
 const results=[];
 for(const {room,type,design,state} of targets){
 await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=${type}&design=${design}&room=${room}`);await page.locator('[data-load-status="ready"]').waitFor();await page.waitForFunction(({room,type,design})=>{const s=window.__FSQ_STUDIO__?.snapshot();return s?.photo?.ready&&s.photo.room===room&&s.id===`upvc-${type}:${design}`;},{room,type,design});await page.locator('[data-load-status="ready"]').waitFor();
 await page.locator('.recovery-studio').scrollIntoViewIfNeeded();const snapshot=await page.evaluate(()=>window.__FSQ_STUDIO__.snapshot());
 for(const m of snapshot.motions)await page.getByLabel(`${m.id} opening`,{exact:true}).fill(state==='open'?'1':'0');
 await page.waitForFunction(open=>window.__FSQ_STUDIO__.snapshot().motions.every(m=>Math.abs(m.current-(open?1:0))<.002),state==='open');await page.waitForTimeout(250);
 const name=`${room}-${type}-${design}-${state}`;
 const result={errors,snapshot:await page.evaluate(()=>window.__FSQ_STUDIO__.snapshot())};if(result.snapshot.photo.room!==room)throw Error("Wrong room evidence");fs.writeFileSync(`${qa}/${name}.json`,JSON.stringify(result,null,2));
 await page.screenshot({clip:await page.locator('.recovery-studio').boundingBox(),path:`${qa}/${name}.png`,timeout:60000});console.log(JSON.stringify({image:`${qa}/${name}.png`,errors,photo:result.snapshot.photo,render:result.snapshot.renderer}));if(errors.length)process.exitCode=1;results.push({name,...result});
 if(all){console.log('PAUSED_FOR_IMAGE_REVIEW');await new Promise(resolve=>{process.stdin.resume();process.stdin.once('data',()=>{process.stdin.pause();resolve();});});}
 }
 fs.writeFileSync(`${qa}/photo-room-evidence-results.json`,JSON.stringify({status:'BROWSER_TESTED',results},null,2));process.stdin.pause();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
