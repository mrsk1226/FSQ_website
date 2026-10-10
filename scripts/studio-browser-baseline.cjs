const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs=require('fs');
const out='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/Checkpoint_01';
(async()=>{const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const page=await browser.newPage({viewport:{width:1440,height:1100}});const requests=[],errors=[];page.on('request',r=>{if(r.url().includes('.glb'))requests.push(r.url())});page.on('pageerror',e=>errors.push(e.message));
for(const design of [2,4,1]){await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=${design}`);await page.waitForTimeout(6500);await page.screenshot({path:`${out}/baseline-casement-${design}.png`,fullPage:true});}
fs.writeFileSync(`${out}/browser-baseline.json`,JSON.stringify({requests,errors,renderer:'headless Chromium; SwiftShader software GPU; not a hardware FPS benchmark'},null,2)); console.log(JSON.stringify({requests,errors}));await browser.close();})();
