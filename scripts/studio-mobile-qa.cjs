const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

const outDir = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/mobile-qa';
const inspectDir = 'D:/FSQ_website/qa_inspect';
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(inspectDir, { recursive: true });

setTimeout(() => {
  console.error('Mobile QA script timeout after 300s');
  process.exit(1);
}, 300000).unref();

const mobileCases = [
  {
    id: 'upvc-casement:2',
    product: 'upvc',
    type: 'casement',
    index: 2,
    room: 'photo-bedroom',
    name: 'Single Casement',
    filename: 'mobile-casement-bedroom.png'
  },
  {
    id: 'upvc-casement:4',
    product: 'upvc',
    type: 'casement',
    index: 4,
    room: 'photo-living',
    name: 'Double Casement (Recovered GLB)',
    filename: 'mobile-double-casement-living.png'
  },
  {
    id: 'upvc-sliding:3',
    product: 'upvc',
    type: 'sliding',
    index: 3,
    room: 'photo-garden-sitting',
    name: '4-Panel Sliding Window',
    filename: 'mobile-sliding-garden.png'
  }
];

(async () => {
  console.log('Launching Chromium for Mobile 390x844 QA...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  // Mobile iPhone viewport: 390 x 844
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  const results = [];

  for (const c of mobileCases) {
    console.log(`\nTesting Mobile 390x844: ${c.id} (${c.name}) in ${c.room}...`);

    await page.goto(
      `http://127.0.0.1:5173/#/products/window-studio?product=${c.product}&type=${c.type}&design=${c.index}&room=${c.room}&finish=white-base&glass=clear`
    );

    // Wait for studio ready
    await page.waitForFunction(
      ({ id, roomName }) => {
        const s = window.__FSQ_STUDIO__?.snapshot();
        return s?.id === id && s?.photo?.ready && s?.photo?.room === roomName;
      },
      { id: c.id, roomName: c.room }
    );
    await page.locator('[data-load-status="ready"]').waitFor();

    // Scroll 3D studio into view for mobile viewport reachability
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // 1. Layout & Overflow Checks
    const layout = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const winWidth = window.innerWidth;
      const studioEl = document.querySelector('.recovery-studio');
      const studioRect = studioEl ? studioEl.getBoundingClientRect() : null;

      const topBtns = Array.from(document.querySelectorAll('.recovery-studio div[style*="top: 8px"] button'));
      const topBtnsReachable = topBtns.every(b => {
        const r = b.getBoundingClientRect();
        return r.width > 20 && r.height > 20 && r.left >= 0 && r.right <= winWidth + 1;
      });

      const bottomBar = document.querySelector('.recovery-studio div[style*="bottom: 8px"]');
      const bottomRect = bottomBar ? bottomBar.getBoundingClientRect() : null;
      const bottomReachable = !!bottomRect && bottomRect.width > 200 && bottomRect.left >= 0 && bottomRect.right <= winWidth + 1;

      // Check room image mesh dimensions vs studio canvas
      const studioSnapshot = window.__FSQ_STUDIO__?.snapshot();
      const photoFit = studioSnapshot?.photo?.fit;

      return {
        docWidth,
        bodyWidth,
        winWidth,
        hasHorizontalOverflow: docWidth > winWidth + 1 || bodyWidth > winWidth + 1,
        topBtnsCount: topBtns.length,
        topBtnsReachable,
        bottomReachable,
        studioRect: studioRect ? { width: studioRect.width, height: studioRect.height } : null,
        photoFit
      };
    });

    console.log(`  Layout: winWidth=${layout.winWidth}, docWidth=${layout.docWidth}, overflow=${layout.hasHorizontalOverflow}, topBtns=${layout.topBtnsCount} (reachable=${layout.topBtnsReachable}), bottomBar reachable=${layout.bottomReachable}`);

    // 2. Touch Drag Sash Separation vs Camera Orbit Test
    console.log(`  Testing touch drag on sash...`);
    const touchDragResult = await page.evaluate(async () => {
      const T = await import('/node_modules/.vite/deps/three.js');
      const studio = window.__FSQ_STUDIO__;
      const ctx = studio.ctx;
      const cam = ctx.camera;
      const controls = ctx.controls;

      const camStart = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
      const targetStart = { x: controls.target.x, y: controls.target.y, z: controls.target.z };

      // Find an operable sash motion
      const motion = ctx.assembly.motions.find(m => !m.locked);
      if (!motion) return { hasMotion: false, error: 'No unlocked motion found' };

      const motionStart = motion.current;

      // Project handle / sash position to screen coordinates
      const targetNode = motion.handle || motion.node;
      ctx.assembly.root.updateMatrixWorld(true);
      const worldPos = new T.Vector3();
      targetNode.getWorldPosition(worldPos);

      // Convert to screen coordinates
      const screenPos = worldPos.clone().project(cam);
      const rect = ctx.renderer.domElement.getBoundingClientRect();
      const clientX = rect.left + ((screenPos.x + 1) / 2) * rect.width;
      const clientY = rect.top + ((-screenPos.y + 1) / 2) * rect.height;

      // Dispatch simulated touch/pointer drag events
      const dom = ctx.renderer.domElement;
      const pointerId = 101;

      const downEvt = new PointerEvent('pointerdown', {
        pointerId,
        pointerType: 'touch',
        clientX,
        clientY,
        bubbles: true,
        cancelable: true
      });
      dom.dispatchEvent(downEvt);

      // Verify controls were disabled during down!
      const controlsDisabledOnDown = controls.enabled === false;

      // Drag across screen by 60px
      const deltaX = motion.kind === 'slide' ? (motion.travel > 0 ? 60 : -60) : 60;
      const moveEvt = new PointerEvent('pointermove', {
        pointerId,
        pointerType: 'touch',
        clientX: clientX + deltaX,
        clientY,
        bubbles: true,
        cancelable: true
      });
      dom.dispatchEvent(moveEvt);

      // Let animation loop damp
      await new Promise(r => setTimeout(r, 100));

      const upEvt = new PointerEvent('pointerup', {
        pointerId,
        pointerType: 'touch',
        clientX: clientX + deltaX,
        clientY,
        bubbles: true,
        cancelable: true
      });
      dom.dispatchEvent(upEvt);

      // Wait 300ms for motion dampening to settle
      await new Promise(r => setTimeout(r, 300));

      const camEnd = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
      const targetEnd = { x: controls.target.x, y: controls.target.y, z: controls.target.z };

      const camMovedDistance = Math.hypot(camEnd.x - camStart.x, camEnd.y - camStart.y, camEnd.z - camStart.z);
      const targetMovedDistance = Math.hypot(targetEnd.x - targetStart.x, targetEnd.y - targetStart.y, targetEnd.z - targetStart.z);
      const motionDelta = Math.abs(motion.current - motionStart);

      return {
        hasMotion: true,
        motionId: motion.id,
        motionKind: motion.kind,
        motionDelta,
        controlsDisabledOnDown,
        controlsReenabled: controls.enabled === true,
        camMovedDistance,
        targetMovedDistance,
        cameraOrbitPrevented: camMovedDistance < 0.0001 && targetMovedDistance < 0.0001,
        motionOperated: motionDelta > 0.02
      };
    });

    console.log(`  Touch Drag: motion=${touchDragResult.motionId} (delta=${touchDragResult.motionDelta?.toFixed(3)}), controlsDisabledOnDown=${touchDragResult.controlsDisabledOnDown}, camMovedDist=${touchDragResult.camMovedDistance}, cameraOrbitPrevented=${touchDragResult.cameraOrbitPrevented}`);

    // 3. Capture mobile screenshot
    const screenshotPath = path.join(outDir, c.filename);
    const inspectPath = path.join(inspectDir, c.filename);

    await page.locator('.recovery-studio').screenshot({ path: screenshotPath });
    fs.copyFileSync(screenshotPath, inspectPath);
    console.log(`  Captured screenshot -> ${screenshotPath}`);

    results.push({
      case: c,
      layout,
      touchDragResult,
      screenshot: screenshotPath,
      inspectPath
    });
  }

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'mobile-qa-results.json'), JSON.stringify(results, null, 2));
  console.log(`\nMobile QA results saved to ${path.join(outDir, 'mobile-qa-results.json')}`);
})().catch(e => {
  console.error('Mobile QA failed:', e);
  process.exit(1);
});
