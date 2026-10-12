const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });

  await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=sliding&design=0&room=photo-living');
  await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready && window.__FSQ_STUDIO__.snapshot().id === 'upvc-sliding:0');
  await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const debug = await page.evaluate(() => {
    const api = window.__FSQ_STUDIO__;
    const ctx = api.ctx;
    const glass = ctx.assembly.root.getObjectByName('main_1_Glass');
    glass.updateWorldMatrix(true, false);
    const wp = new ctx.camera.position.constructor();
    glass.getWorldPosition(wp);
    const sp = wp.clone().project(ctx.camera);
    const rect = ctx.renderer.domElement.getBoundingClientRect();
    const clientX = rect.left + ((sp.x + 1) * rect.width) / 2;
    const clientY = rect.top + ((1 - sp.y) * rect.height) / 2;

    ctx.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    ctx.scene.updateMatrixWorld(true);
    ctx.raycaster.setFromCamera(ctx.pointer, ctx.camera);
    const hits = ctx.raycaster.intersectObjects([ctx.assembly?.root].filter(Boolean), true);
    return {
      wp: wp.toArray(),
      sp: sp.toArray(),
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      client: { clientX, clientY },
      hits: hits.map(h => ({ name: h.object.name, motionId: h.object.userData.motionId }))
    };
  });

  console.log('DEBUG SLIDE CLICK:', JSON.stringify(debug, null, 2));

  // Now click and check target
  await page.mouse.click(debug.client.clientX, debug.client.clientY);
  await page.waitForTimeout(100);
  const afterClick = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot().motions[0]);
  console.log('AFTER CLICK:', JSON.stringify(afterClick, null, 2));

  await browser.close();
})();
