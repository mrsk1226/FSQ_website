const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs=require('fs');
setTimeout(()=>{console.error('Screenshot review deadline exceeded');process.exit(1);},300000).unref();
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const all=process.argv.includes('--all');const targets=all?['2','4'].flatMap(design=>[0,.3,.6,1].map(progress=>({design,progress}))):[{design:process.argv[2]||'2',progress:Number(process.argv[3]||0)}];
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.setDefaultTimeout(30000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const {design,progress} of targets){
 await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=${design}`);await page.locator('[data-load-status="ready"]').waitFor();await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
 await page.evaluate(p=>{const api=window.__FSQ_STUDIO__,ctx=api.ctx,a=ctx.assembly;a.motions.forEach(m=>{m.current=m.target=p;});ctx.controls.minDistance=.4;ctx.controls.target.set(0,a.base+.25,-.08);ctx.camera.position.set(0,a.base+.65,1.25);ctx.controls.update();ctx.dirty=true;},progress>0?.25+.75*progress:0);
 await page.waitForTimeout(1500);
 const audit=await page.evaluate(()=>{const api=window.__FSQ_STUDIO__;return {state:api.snapshot(),audit:api.inspect()};});
 const name=`friction-stay-${design==='4'?'double':'single'}-${Math.round(progress*100)}`;
 fs.writeFileSync(`${qa}/${name}.json`,JSON.stringify({status:'BROWSER_TESTED',hardwareStatus:'PROVISIONAL',errors,...audit},null,2));
 await page.screenshot({clip:await page.locator('.recovery-studio').boundingBox(),path:`${qa}/${name}.png`,timeout:60000});
 console.log(JSON.stringify({screenshot:`${qa}/${name}.png`,errors,stays:audit.audit.frictionStays,collisions:audit.audit.stayCollisions}));
 if(errors.length||audit.audit.stayCollisions.length||audit.audit.frictionStays.some(s=>!s.sliderOnTrack||s.attachmentError>1e-6))process.exitCode=1;
 if(all){console.log('PAUSED_FOR_IMAGE_REVIEW');await new Promise(resolve=>{process.stdin.resume();process.stdin.once('data',resolve);});}
 }
 process.stdin.pause();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
