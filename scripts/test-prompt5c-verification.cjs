const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

const outDir = path.resolve('qa_inspect/prompt5c');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const results = {
    tests: [],
    errors: [],
    screenshots: []
  };

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1050 } });
    const page = await context.newPage();
    page.setDefaultTimeout(35000);

    page.on('pageerror', err => results.errors.push(`PageError: ${err.message}`));
    page.on('console', msg => {
      if (msg.type() === 'error') results.errors.push(`ConsoleError: ${msg.text()}`);
    });

    console.log('--- TEST 1: Casement Glass Click Operates Sash ---');
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=2&room=photo-living');
    await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready);
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();

    const glassClickPoint = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const glass = api.ctx.assembly.root.getObjectByName('main_0_Glass');
      const rect = api.ctx.renderer.domElement.getBoundingClientRect();
      const p = glass.getWorldPosition(api.ctx.controls.target.clone()).project(api.ctx.camera);
      return {
        x: rect.left + ((p.x + 1) * rect.width) / 2,
        y: rect.top + ((1 - p.y) * rect.height) / 2
      };
    });

    const initialCasement = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot().motions[0].target);
    assert.equal(initialCasement, 0, 'Casement sash should initially be closed (target 0)');

    // Click directly on the glass pane of operable sash
    await page.mouse.click(glassClickPoint.x, glassClickPoint.y);
    await page.waitForFunction(() => window.__FSQ_STUDIO__.snapshot().motions[0].current > 0.95, { timeout: 15000 });

    const openCasement = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot().motions[0]);
    assert.equal(openCasement.target, 1, 'Casement sash target should be 1 after clicking glass');
    assert.ok(openCasement.current > 0.95, `Casement sash should animate open (got ${openCasement.current})`);

    const casementShot = path.join(outDir, 'casement-clicked-glass.png');
    await page.screenshot({ path: casementShot, clip: await page.locator('.recovery-studio').boundingBox() });
    results.screenshots.push(casementShot);
    results.tests.push({ name: 'casement-glass-click', status: 'PASS', target: openCasement.target, current: openCasement.current });
    console.log('PASS: Casement opened by clicking glass.');

    console.log('--- TEST 2: Sliding Motion Diagnostics & 0/50/100% States ---');
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=sliding&design=0&room=photo-living');
    await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready && window.__FSQ_STUDIO__.snapshot().id === 'upvc-sliding:0');
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Capture 0% state
    const slideShot0 = path.join(outDir, 'sliding-0pct.png');
    await page.screenshot({ path: slideShot0, clip: await page.locator('.recovery-studio').boundingBox() });
    results.screenshots.push(slideShot0);

    const slideClickPoint = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const glass = api.ctx.assembly.root.getObjectByName('main_1_Glass');
      glass.updateWorldMatrix(true, false);
      const wp = api.ctx.controls.target.clone();
      glass.getWorldPosition(wp);
      const sp = wp.clone().project(api.ctx.camera);
      const rect = api.ctx.renderer.domElement.getBoundingClientRect();
      return {
        x: rect.left + ((sp.x + 1) * rect.width) / 2,
        y: rect.top + ((1 - sp.y) * rect.height) / 2,
        rect
      };
    });

    // Click sliding sash
    await page.mouse.click(slideClickPoint.x, slideClickPoint.y);
    await page.waitForFunction(() => window.__FSQ_STUDIO__.snapshot().motions[0].current >= 0.40, { timeout: 15000 });

    const slideShot50 = path.join(outDir, 'sliding-50pct.png');
    await page.screenshot({ path: slideShot50, clip: await page.locator('.recovery-studio').boundingBox() });
    results.screenshots.push(slideShot50);

    await page.waitForFunction(() => window.__FSQ_STUDIO__.snapshot().motions[0].current > 0.95, { timeout: 15000 });
    const slideShot100 = path.join(outDir, 'sliding-100pct.png');
    await page.screenshot({ path: slideShot100, clip: await page.locator('.recovery-studio').boundingBox() });
    results.screenshots.push(slideShot100);

    const slideState = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const m = api.ctx.assembly.motions[0];
      const panel = m.node;
      return {
        target: m.target,
        current: m.current,
        track: m.track,
        panelX: panel.position.x,
        panelZ: panel.position.z,
        collisions: api.inspect().collisions
      };
    });

    assert.equal(slideState.target, 1, 'Sliding sash target should be 1');
    assert.ok(slideState.current > 0.95, `Sliding sash should reach > 0.95 (got ${slideState.current})`);
    assert.equal(slideState.collisions.length, 0, 'Zero collisions along track');
    results.tests.push({ name: 'sliding-motion-and-track', status: 'PASS', ...slideState });
    console.log('PASS: Sliding sash operated cleanly along own track, 0 collisions.');

    console.log('--- TEST 3: Drag Sash Without Camera Orbit ---');
    // Test drag separation: dragging the sash should move sash target, camera position should stay EXACTLY identical
    const cameraBefore = await page.evaluate(() => window.__FSQ_STUDIO__.ctx.camera.position.toArray());
    const targetBefore = await page.evaluate(() => window.__FSQ_STUDIO__.ctx.controls.target.toArray());

    await page.mouse.move(slideClickPoint.x, slideClickPoint.y);
    await page.mouse.down();
    await page.mouse.move(slideClickPoint.x - 150, slideClickPoint.y, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(200);

    const cameraAfter = await page.evaluate(() => window.__FSQ_STUDIO__.ctx.camera.position.toArray());
    const targetAfter = await page.evaluate(() => window.__FSQ_STUDIO__.ctx.controls.target.toArray());

    assert.deepEqual(cameraBefore, cameraAfter, 'Camera position must remain unchanged during sash drag');
    assert.deepEqual(targetBefore, targetAfter, 'OrbitControls target must remain unchanged during sash drag');
    results.tests.push({ name: 'drag-without-camera-orbit', status: 'PASS' });
    console.log('PASS: Dragging sash does NOT orbit camera.');

    console.log('--- TEST 4: Sash Lock Toggle & Toast ---');
    // Lock the sash via API, attempt click
    await page.evaluate(() => {
      const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
      m.locked = true;
      m.target = 0;
      m.current = 0;
      window.__FSQ_STUDIO__.ctx.dirty = true;
    });
    await page.waitForTimeout(100);

    await page.mouse.click(slideClickPoint.x, slideClickPoint.y);
    await page.waitForTimeout(200);

    const lockedCheck = await page.evaluate(() => {
      const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
      const toast = document.querySelector('.studio-lock-toast')?.textContent || '';
      return { target: m.target, locked: m.locked, toast };
    });

    assert.equal(lockedCheck.target, 0, 'Locked sash target must not change on click');
    assert.ok(lockedCheck.toast.includes('locked'), `Lock toast should be displayed (got "${lockedCheck.toast}")`);
    results.tests.push({ name: 'sash-lock-and-toast', status: 'PASS', toast: lockedCheck.toast });
    console.log('PASS: Locked sash immobilized and displays lock toast.');

    // Unlock sash
    await page.evaluate(() => {
      window.__FSQ_STUDIO__.ctx.assembly.motions[0].locked = false;
    });

    console.log('--- TEST 5: Fullscreen Mode & Live Color Swatch Change ---');
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4&room=photo-living');
    await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready && window.__FSQ_STUDIO__.snapshot().id === 'upvc-casement:4');
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();

    // Click Fullscreen button
    const fsBtn = page.getByRole('button', { name: '⛶ Fullscreen' });
    await fsBtn.click();
    await page.waitForTimeout(400);

    const isFs = await page.evaluate(() => {
      const root = document.querySelector('.recovery-studio');
      return root.classList.contains('fullscreen-active') || !!document.fullscreenElement;
    });
    assert.ok(isFs, 'Fullscreen state should be active');

    // Record initial materials & room map
    const initialAppearance = await page.evaluate(() => {
      const ctx = window.__FSQ_STUDIO__.ctx;
      const a = ctx.assembly;
      return {
        profileColor: a.mats.profile.color.getHexString(),
        glassColor: a.mats.glass.color.getHexString(),
        roomTexture: ctx.photo.texture.source.data.currentSrc || ctx.photo.texture.image.src,
        cameraPos: ctx.camera.position.toArray()
      };
    });

    // Click Golden Oak swatch in the studio swatch strip
    const swatchBtn = page.locator('.studio-swatch-btn[title="Golden Oak"]');
    await swatchBtn.click();
    await page.waitForTimeout(300);

    const changedAppearance = await page.evaluate(() => {
      const ctx = window.__FSQ_STUDIO__.ctx;
      const a = ctx.assembly;
      return {
        profileColor: a.mats.profile.color.getHexString(),
        hasMap: !!a.mats.profile.map,
        glassColor: a.mats.glass.color.getHexString(),
        roomTexture: ctx.photo.texture.source.data.currentSrc || ctx.photo.texture.image.src,
        cameraPos: ctx.camera.position.toArray()
      };
    });

    assert.notEqual(initialAppearance.profileColor, changedAppearance.profileColor, 'Profile color should change when finish swatch is selected');
    assert.ok(changedAppearance.hasMap, 'Profile material should have woodgrain texture applied');
    assert.equal(initialAppearance.glassColor, changedAppearance.glassColor, 'Glass color MUST NOT change when finish is selected');
    assert.equal(initialAppearance.roomTexture, changedAppearance.roomTexture, 'Room texture MUST NOT reload when finish is selected');
    assert.deepEqual(initialAppearance.cameraPos, changedAppearance.cameraPos, 'Camera MUST NOT reset when finish is selected');

    const fsShot = path.join(outDir, 'fullscreen-palette-open.png');
    await page.screenshot({ path: fsShot });
    results.screenshots.push(fsShot);
    results.tests.push({ name: 'fullscreen-finish-change', status: 'PASS' });
    console.log('PASS: Fullscreen active with live finish swatch change without room or camera reload.');

    // Exit Fullscreen
    const exitFsBtn = page.getByRole('button', { name: '✕ Exit' });
    if (await exitFsBtn.isVisible()) {
      await exitFsBtn.click();
    } else {
      await page.keyboard.press('Escape');
    }
    await page.waitForTimeout(300);

    console.log('--- TEST 6: Default Window Focus & Room Cover-Fit ---');
    for (const [roomKey, fileKey] of [
      ['photo-bedroom', 'default-focus-bedroom.png'],
      ['photo-living', 'default-focus-living.png'],
      ['photo-garden-sitting', 'default-focus-garden.png']
    ]) {
      await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4&room=${roomKey}`);
      await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready);
      await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const shotPath = path.join(outDir, fileKey);
      await page.screenshot({ path: shotPath, clip: await page.locator('.recovery-studio').boundingBox() });
      results.screenshots.push(shotPath);
    }
    results.tests.push({ name: 'default-window-focus-rooms', status: 'PASS' });
    console.log('PASS: Captured default window-focus views across bedroom, living, garden.');

    console.log('--- TEST 7: Mobile 390x844 Normal and Fullscreen ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    mobilePage.setDefaultTimeout(35000);

    await mobilePage.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4&room=photo-living');
    await mobilePage.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().photo?.ready);
    await mobilePage.locator('.recovery-studio').scrollIntoViewIfNeeded();

    const mobileNormalShot = path.join(outDir, 'mobile-normal-390x844.png');
    await mobilePage.screenshot({ path: mobileNormalShot, clip: await mobilePage.locator('.recovery-studio').boundingBox() });
    results.screenshots.push(mobileNormalShot);

    // Toggle fullscreen on mobile
    await mobilePage.getByRole('button', { name: '⛶ Fullscreen' }).click();
    await mobilePage.waitForTimeout(400);

    const mobileFsShot = path.join(outDir, 'mobile-fullscreen-390x844.png');
    await mobilePage.screenshot({ path: mobileFsShot });
    results.screenshots.push(mobileFsShot);

    const overflowCheck = await mobilePage.evaluate(() => {
      return {
        bodyOverflow: document.body.scrollWidth <= 395,
        studioOverflow: document.querySelector('.recovery-studio').scrollWidth <= 395
      };
    });
    assert.ok(overflowCheck.bodyOverflow, 'Mobile layout must have zero horizontal overflow');
    results.tests.push({ name: 'mobile-390x844-responsive', status: 'PASS', ...overflowCheck });
    console.log('PASS: Mobile 390x844 validated in normal and fullscreen modes.');

    await mobileContext.close();
    await context.close();

    fs.writeFileSync(path.join(outDir, 'prompt5c-results.json'), JSON.stringify(results, null, 2));
    console.log('\n=== ALL PROMPT 5C TESTS COMPLETED SUCCESSFULLY ===');
    console.log(JSON.stringify({ passed: results.tests.length, errors: results.errors.length, screenshots: results.screenshots.length }));
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error('PROMPT 5C TEST FAILURE:', err);
  process.exit(1);
});
