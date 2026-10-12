const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs=require('fs');
setTimeout(()=>{console.error('Screenshot review deadline exceeded');process.exit(1);},480000).unref();
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const all=process.argv.includes('--all');const targets=all?['2','4'].flatMap(design=>[0,.3,.6,1].map(progress=>({design,progress}))):[{design:process.argv[2]||'2',progress:Number(process.argv[3]||0)}];
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:3});page.setDefaultTimeout(30000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const {design,progress} of targets){
 await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=${design}&room=photo-living`);await page.waitForFunction(design=>window.__FSQ_STUDIO__?.snapshot().id===`upvc-casement:${design}`,design);await page.locator('[data-load-status="ready"]').waitFor();await page.waitForFunction(()=>window.__FSQ_STUDIO__?.snapshot().photo?.ready);await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
 await page.evaluate(({p,close})=>{const api=window.__FSQ_STUDIO__,ctx=api.ctx,a=ctx.assembly;a.motions.forEach(m=>{m.current=m.target=p;});ctx.controls.minDistance=.35;ctx.controls.maxDistance=7;ctx.controls.minAzimuthAngle=-.3;ctx.controls.maxAzimuthAngle=.3;ctx.controls.enablePan=false;ctx.controls.minPolarAngle=.01;ctx.controls.maxPolarAngle=Math.PI-.01;ctx.controls.target.set(0,0,0);ctx.camera.position.set(0,0,6);ctx.renderer.setPixelRatio(3);ctx.controls.update();ctx.dirty=true;},{p:progress>0?.25+.75*progress:0,close:process.argv.includes('--mount')});
 await page.waitForTimeout(2500);
 const audit=await page.evaluate(()=>{const api=window.__FSQ_STUDIO__;return {state:api.snapshot(),audit:api.inspect()};});
 const name=process.argv.includes('--mount')?'stay-4a-mount-closeup':`stay-4a-${design==='4'?'double':'single'}-${Math.round(progress*100)}`;
 fs.writeFileSync(`${qa}/${name}.json`,JSON.stringify({status:'BROWSER_TESTED',hardwareStatus:'PROVISIONAL',errors,...audit},null,2));
 const clip=await page.evaluate(close=>{const ctx=window.__FSQ_STUDIO__.ctx,a=ctx.assembly,r=ctx.renderer.domElement.getBoundingClientRect();let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;a.root.updateMatrixWorld(true);a.root.traverse(n=>{if(!n.isMesh)return;n.geometry.computeBoundingBox();const b=n.geometry.boundingBox;for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const v=n.localToWorld(ctx.controls.target.clone().set(x,y,z)).project(ctx.camera);const px=r.left+(v.x+1)*r.width/2,py=r.top+(1-v.y)*r.height/2;minX=Math.min(minX,px);minY=Math.min(minY,py);maxX=Math.max(maxX,px);maxY=Math.max(maxY,py);}});if(close){const v=a.motions[0].stay.rosette.getWorldPosition(ctx.controls.target.clone()).project(ctx.camera);const x=r.left+(v.x+1)*r.width/2,y=r.top+(1-v.y)*r.height/2;return {x:x-45,y:y-40,width:90,height:80};}return {x:minX-45,y:minY-25,width:maxX-minX+90,height:maxY-minY+50};},process.argv.includes('--mount'));await page.screenshot({clip,path:`${qa}/${name}.png`,timeout:60000});
 console.log(JSON.stringify({screenshot:`${qa}/${name}.png`,errors,stays:audit.audit.frictionStays,collisions:audit.audit.stayCollisions}));
 if(errors.length||audit.audit.stayCollisions.length||audit.audit.frictionStays.some(s=>!s.sliderOnTrack||s.attachmentError>1e-6))process.exitCode=1;
 if(all){console.log('PAUSED_FOR_IMAGE_REVIEW');await new Promise(resolve=>{process.stdin.resume();process.stdin.once('data',()=>{process.stdin.pause();resolve();});});}
 }
 process.stdin.pause();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
