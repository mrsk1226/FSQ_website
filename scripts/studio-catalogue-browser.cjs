const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs=require('fs');const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const filters=process.argv.slice(2),output=filters.length?'catalogue-sliding-final.json':'catalogue-browser-results.json';
const records=JSON.parse(fs.readFileSync(`${qa}/catalogue-test-input.json`)).filter(r=>!filters.length||filters.includes(r.type));
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=2');
let product='upvc',type='casement';for(const r of records){const before=errors.length;try{
 if(product!==r.product){await page.locator('#fsq-studio-product').selectOption(r.product);product=r.product;}
 if(type!==r.type){await page.locator('#fsq-studio-type').selectOption(r.type);type=r.type;}
 await page.locator('#fsq-studio-design').selectOption(String(r.index));await page.waitForFunction(id=>window.__FSQ_STUDIO__?.snapshot().id===id,r.id,{timeout:30000});await page.locator('[data-load-status="ready"]').waitFor({timeout:30000});
 const closed=await page.evaluate(()=>({state:window.__FSQ_STUDIO__.snapshot(),audit:window.__FSQ_STUDIO__.inspect(),clearOpening:window.__FSQ_STUDIO__.clearOpening()}));
 const layoutPass=closed.state.panels.length===r.panes.length&&closed.state.panels.every((p,i)=>p.type===r.panes[i].type)&&closed.state.tracks===r.tracks;
 const motionPass=closed.state.motions.length===r.panes.filter(p=>p.type!=='fixed').length;
 // Test the maximum pose and stationary fixed sections. Retain collision evidence; do not promote statuses.
 const open=await page.evaluate(()=>{const api=window.__FSQ_STUDIO__;api.ctx.assembly.motions.forEach(m=>{m.target=m.current=1;});return import('/src/components/design-diagrams/studioAssembly.js').then(({applyMotion})=>{api.ctx.assembly.motions.forEach(applyMotion);api.ctx.dirty=true;return {state:api.snapshot(),audit:api.inspect(),clearOpening:api.clearOpening()};});});
 const staticBefore=closed.audit.meshes.filter(m=>!m.motion),staticAfter=open.audit.meshes.filter(m=>!m.motion);const fixedPass=JSON.stringify(staticBefore)===JSON.stringify(staticAfter);
 if([0,2,4,7,15,23].includes(r.index)||r.type.includes('door')||r.concept){await page.locator('.recovery-studio').scrollIntoViewIfNeeded();await page.waitForTimeout(180);await page.locator('.recovery-studio').screenshot({path:`${qa}/${r.id.replace(':','-')}-open.png`});}
 const result={closedClearOpening:closed.clearOpening,closedSealPass:closed.clearOpening===null||Math.abs(closed.clearOpening)<1e-8,id:r.id,name:r.name,layoutPass,motionPass,fixedPass,closedCollisions:closed.audit.collisions,openCollisions:open.audit.collisions,meshRoles:closed.state.roles,tracks:closed.state.tracks,source:closed.state.source,clearOpening:open.clearOpening,drawCalls:open.state.renderer.calls,triangles:open.state.renderer.triangles,runtimeErrors:errors.slice(before),acceptance:'NOT VERIFIED: manufacturer spec, swept collisions, hardware accuracy and visual acceptance outstanding'};results.push(result);console.log(`${r.id}: layout=${layoutPass} fixed=${fixedPass} closedCollisions=${result.closedCollisions.length} openCollisions=${result.openCollisions.length}`);
 }catch(e){results.push({id:r.id,error:e.message});console.log(`${r.id}: FAILED ${e.message}`);}
 fs.writeFileSync(`${qa}/${output}`,JSON.stringify({renderer:'Chromium SwiftShader software GPU',results,errors},null,2));
}
await browser.close();})().catch(e=>{console.error(e);process.exitCode=1;});

