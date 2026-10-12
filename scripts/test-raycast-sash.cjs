const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    // Test 1: Sliding window
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=sliding&design=0');
    await page.locator('[data-load-status="ready"]').waitFor();
    
    const slidingRaycasts = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const ctx = api.ctx;
      const a = ctx.assembly;
      const dom = ctx.renderer.domElement;
      const rect = dom.getBoundingClientRect();
      
      function testMesh(meshName) {
        const mesh = a.root.getObjectByName(meshName);
        if (!mesh) return { meshName, found: false };
        const wp = mesh.getWorldPosition(ctx.camera.position.clone());
        const sp = wp.clone().project(ctx.camera);
        const clientX = rect.left + (sp.x + 1) * rect.width / 2;
        const clientY = rect.top + (1 - sp.y) * rect.height / 2;
        
        ctx.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
        ctx.scene.updateMatrixWorld(true);
        ctx.raycaster.setFromCamera(ctx.pointer, ctx.camera);
        const hits = ctx.raycaster.intersectObjects([ctx.assembly?.root, ctx.room].filter(Boolean), true);
        const firstHit = hits[0];
        const motion = ctx.assembly?.motions.find(m => m.id === firstHit?.object.userData.motionId);
        return {
          meshName,
          found: true,
          hitObject: firstHit?.object.name,
          hitRole: firstHit?.object.userData.role,
          motionId: firstHit?.object.userData.motionId,
          motionFound: !!motion,
          motionIdResolved: motion?.id
        };
      }
      
      return {
        glass: testMesh('main_1_Glass'),
        bead: testMesh('main_1_Bead'),
        profile: testMesh('main_1'),
        touchlock: testMesh('main_1_TouchLock')
      };
    });
    console.log('Sliding Raycast Test:');
    console.log(JSON.stringify(slidingRaycasts, null, 2));

    // Test 2: Casement recovered GLB
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4');
    await page.locator('[data-load-status="ready"]').waitFor();
    
    const casementRaycasts = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const ctx = api.ctx;
      const a = ctx.assembly;
      const dom = ctx.renderer.domElement;
      const rect = dom.getBoundingClientRect();
      
      function testMesh(meshName) {
        const mesh = a.root.getObjectByName(meshName);
        if (!mesh) return { meshName, found: false };
        const wp = mesh.getWorldPosition(ctx.camera.position.clone());
        const sp = wp.clone().project(ctx.camera);
        const clientX = rect.left + (sp.x + 1) * rect.width / 2;
        const clientY = rect.top + (1 - sp.y) * rect.height / 2;
        
        ctx.pointer.set((clientX - rect.left) / rect.width * 2 - 1, -(clientY - rect.top) / rect.height * 2 + 1);
        ctx.scene.updateMatrixWorld(true);
        ctx.raycaster.setFromCamera(ctx.pointer, ctx.camera);
        const hits = ctx.raycaster.intersectObjects([ctx.assembly?.root, ctx.room].filter(Boolean), true);
        const firstHit = hits[0];
        const motion = ctx.assembly?.motions.find(m => m.id === firstHit?.object.userData.motionId);
        return {
          meshName,
          found: true,
          hitObject: firstHit?.object.name,
          hitRole: firstHit?.object.userData.role,
          motionId: firstHit?.object.userData.motionId,
          motionFound: !!motion,
          motionIdResolved: motion?.id
        };
      }
      
      return {
        leftGlass: testMesh('Sash_Left_Glass'),
        leftHandle: testMesh('Handle_Left_Lever'),
        leftProfile: testMesh('Sash_Left_Profile_Left')
      };
    });
    console.log('Casement Raycast Test:');
    console.log(JSON.stringify(casementRaycasts, null, 2));

  } finally {
    await browser.close();
  }
})();
