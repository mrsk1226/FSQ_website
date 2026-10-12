const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=sliding&design=0');
  await page.locator('[data-load-status="ready"]').waitFor();
  
  const res = await page.evaluate(() => {
    const api = window.__FSQ_STUDIO__;
    const ctx = api.ctx;
    const a = ctx.assembly;
    const dom = ctx.renderer.domElement;
    const rect = dom.getBoundingClientRect();
    
    // Pick center of sliding glass
    const glass = a.root.getObjectByName('main_1_Glass');
    const wp = glass.getWorldPosition(ctx.camera.position.clone());
    const sp = wp.clone().project(ctx.camera);
    const clientX = rect.left + (sp.x + 1) * rect.width / 2;
    const clientY = rect.top + (1 - sp.y) * rect.height / 2;
    
    ctx.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
    ctx.scene.updateMatrixWorld(true);
    ctx.raycaster.setFromCamera(ctx.pointer, ctx.camera);
    const hits = ctx.raycaster.intersectObjects([ctx.assembly?.root].filter(Boolean), true);
    
    const hitList = hits.map(h => ({ name: h.object.name, motionId: h.object.userData.motionId }));
    let foundMotion = null;
    for (const h of hits) {
      if (h.object.userData.motionId) {
        foundMotion = a.motions.find(m => m.id === h.object.userData.motionId);
        if (foundMotion) break;
      }
    }
    return { hitCount: hits.length, hitList, foundMotionId: foundMotion?.id };
  });
  console.log('Raycast hit test through glass:');
  console.log(JSON.stringify(res, null, 2));
  await browser.close();
})();
