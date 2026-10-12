const fs=require('fs');const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
(async()=>{
  const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=2&room=photo-living');
    await page.locator('[data-load-status="ready"]').waitFor();
    await page.waitForFunction(()=>window.__FSQ_STUDIO__?.snapshot().photo?.ready);
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = await page.locator('.recovery-studio').boundingBox();
    await page.screenshot({clip:box, path:`${qa}/photo-mobile-390x844.png`});
    fs.copyFileSync(`${qa}/photo-mobile-390x844.png`,'d:/FSQ_website/qa_inspect/photo-mobile-390x844.png');
    console.log('Mobile screenshot clipped to studio captured');
  }finally{
    await browser.close();
  }
})().catch(e=>{console.error(e);process.exit(1);});
