const {chromium} = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const assert = require('assert/strict');

const outDir = 'D:/FSQ_website/qa_inspect/prompt5d';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
    page.setDefaultTimeout(120000);
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    async function capture(filename) {
      const studio = page.locator('.recovery-studio');
      await studio.screenshot({ timeout: 120000, path: `${outDir}/${filename}` });
      console.log(`Saved ${filename}`);
    }

    console.log('Testing 1: Single Casement Door closed in photo-door-living');
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=door-casement&design=0');
    await page.waitForFunction(() => {
      const snap = window.__FSQ_STUDIO__?.snapshot();
      return snap?.id === 'upvc-door-casement:0' && snap.photo?.ready && snap.photo?.room === 'photo-door-living';
    });
    await page.locator('.recovery-studio').scrollIntoViewIfNeeded();

    // Set fast quality for quick rasterization under SwiftShader
    const sBtn = page.getByRole('button', { name: /Settings/ });
    if (await sBtn.isVisible()) {
      await sBtn.click();
      await page.getByLabel('3D quality', { exact: true }).selectOption('fast');
      await sBtn.click();
    }
    await page.waitForTimeout(500);

    const snap1 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit1 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(snap1.photo.room, 'photo-door-living');
    assert.equal(audit1.collisions.length, 0);
    await capture('01_casement_single_closed.png');

    console.log('Testing 2: Single Casement Door open via canvas click/drag');
    const handlePos = await page.evaluate(() => {
      const api = window.__FSQ_STUDIO__;
      const lever = api.ctx.assembly.root.getObjectByName('main_0_Handle_Lever') || api.ctx.assembly.root.getObjectByName('main_0_Sash');
      const r = api.ctx.renderer.domElement.getBoundingClientRect();
      const p = lever.getWorldPosition(api.ctx.controls.target.clone()).project(api.ctx.camera);
      return { x: r.left + (p.x + 1) * r.width / 2, y: r.top + (1 - p.y) * r.height / 2 };
    });
    await page.mouse.click(handlePos.x, handlePos.y);
    await page.waitForTimeout(1400);

    const snap2 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit2 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    console.log('Single door motion target:', snap2.motions[0]?.target, 'current:', snap2.motions[0]?.current);
    assert.ok(snap2.motions[0]?.current > 0.8, 'Expected door sash to open on click');
    assert.equal(audit2.collisions.length, 0);
    await capture('02_casement_single_open.png');

    console.log('Testing 3: Double French Door closed');
    await page.locator('#fsq-studio-design').selectOption('2');
    await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().id === 'upvc-door-casement:2');
    await page.evaluate(() => {
      const snap = window.__FSQ_STUDIO__.snapshot();
      snap.motions.forEach(m => window.__FSQ_STUDIO__.operate(m.id, 0));
    });
    await page.waitForTimeout(1000);

    const snap3 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit3 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(audit3.collisions.length, 0);
    await capture('03_casement_double_closed.png');

    console.log('Testing 4: Double French Door open');
    await page.evaluate(() => {
      const snap = window.__FSQ_STUDIO__.snapshot();
      snap.motions.forEach(m => window.__FSQ_STUDIO__.operate(m.id, 1));
    });
    await page.waitForTimeout(1400);

    const snap4 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit4 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.ok(snap4.motions.every(m => m.current > 0.9));
    assert.equal(audit4.collisions.length, 0);
    await capture('04_casement_double_open.png');

    console.log('Testing 5: Sliding Door closed in photo-door-living');
    await page.locator('#fsq-studio-type').selectOption('door-sliding');
    await page.waitForTimeout(400);
    await page.locator('#fsq-studio-design').selectOption('0');
    await page.waitForFunction(() => {
      const snap = window.__FSQ_STUDIO__?.snapshot();
      return snap?.id === 'upvc-door-sliding:0' && snap.photo?.ready && snap.photo?.room === 'photo-door-living';
    });
    await page.waitForTimeout(500);

    const snap5 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit5 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(snap5.photo.room, 'photo-door-living');
    assert.equal(audit5.collisions.length, 0);
    await capture('05_sliding_door_closed.png');

    console.log('Testing 6: Sliding Door half open');
    await page.evaluate(() => {
      const slideMotion = window.__FSQ_STUDIO__.snapshot().motions.find(m => m.kind === 'slide');
      if (slideMotion) window.__FSQ_STUDIO__.operate(slideMotion.id, 0.5);
    });
    await page.waitForTimeout(1400);

    const snap6 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit6 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    const activeSlide = snap6.motions.find(m => m.kind === 'slide');
    assert.ok(Math.abs(activeSlide.current - 0.5) < 0.05);
    assert.equal(audit6.collisions.length, 0);
    await capture('06_sliding_door_half_open.png');

    console.log('Testing 7: Fold Door closed in photo-wide-living');
    await page.locator('#fsq-studio-type').selectOption('door-fold');
    await page.waitForTimeout(400);
    await page.locator('#fsq-studio-design').selectOption('0');
    await page.waitForFunction(() => {
      const snap = window.__FSQ_STUDIO__?.snapshot();
      return snap?.id === 'upvc-door-fold:0' && snap.photo?.ready && snap.photo?.room === 'photo-wide-living';
    });
    await page.waitForTimeout(500);

    const snap7 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit7 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(snap7.photo.room, 'photo-wide-living');
    assert.equal(audit7.collisions.length, 0);
    await capture('07_fold_door_closed.png');

    console.log('Testing 8: Fold Door folded in photo-wide-living');
    await page.evaluate(() => {
      window.__FSQ_STUDIO__.operate('main_0', 1.0);
    });
    await page.waitForTimeout(1500);

    const snap8 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit8 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.ok(snap8.motions[0].current > 0.95);
    assert.equal(audit8.collisions.length, 0);
    await capture('08_fold_door_folded.png');

    console.log('Testing 9: Bay 3-Panel in photo-wide-living');
    await page.locator('#fsq-studio-type').selectOption('bay-concepts');
    await page.waitForTimeout(400);
    await page.locator('#fsq-studio-design').selectOption('0');
    await page.waitForFunction(() => {
      const snap = window.__FSQ_STUDIO__?.snapshot();
      return snap?.id === 'upvc-bay-concepts:0' && snap.photo?.ready && snap.photo?.room === 'photo-wide-living';
    });
    await page.waitForTimeout(500);

    const snap9 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit9 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(snap9.photo.room, 'photo-wide-living');
    assert.equal(audit9.collisions.length, 0);
    await capture('09_bay_3panel.png');

    console.log('Testing 10: Curved / Bow Style in photo-wide-living');
    await page.locator('#fsq-studio-design').selectOption('2');
    await page.waitForFunction(() => {
      const snap = window.__FSQ_STUDIO__?.snapshot();
      return snap?.id === 'upvc-bay-concepts:2' && snap.photo?.ready && snap.photo?.room === 'photo-wide-living';
    });
    await page.waitForTimeout(500);

    const snap10 = await page.evaluate(() => window.__FSQ_STUDIO__.snapshot());
    const audit10 = await page.evaluate(() => window.__FSQ_STUDIO__.inspect());
    assert.equal(snap10.photo.room, 'photo-wide-living');
    assert.equal(audit10.collisions.length, 0);
    await capture('10_bow_style.png');

    console.log('Testing 11: Colour Change live without room reload');
    await page.locator('#fsq-studio-type').selectOption('door-casement');
    await page.waitForTimeout(400);
    await page.locator('#fsq-studio-design').selectOption('2');
    await page.waitForFunction(() => window.__FSQ_STUDIO__?.snapshot().id === 'upvc-door-casement:2');
    await page.waitForTimeout(400);

    await page.evaluate(() => {
      window.__BEFORE_COLOR__ = {
        texture: window.__FSQ_STUDIO__.ctx.photo.texture,
        room: window.__FSQ_STUDIO__.ctx.photo.group
      };
    });
    await page.getByRole('button', { name: /^Mahogany/ }).click();
    await page.waitForTimeout(400);

    const colourCheck = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      const b = window.__BEFORE_COLOR__;
      return {
        profileMapped: !!c.assembly.mats.profile.map,
        sameRoomTexture: c.photo.texture === b.texture,
        sameRoomGroup: c.photo.group === b.room,
        roomStillReady: c.photo.texture.userData.ready
      };
    });
    assert.ok(colourCheck.profileMapped, 'Profile texture should be updated to Mahogany');
    assert.ok(colourCheck.sameRoomTexture, 'Room texture should not be recreated');
    assert.ok(colourCheck.sameRoomGroup, 'Room group should not be recreated');
    await capture('11_colour_change_mahogany.png');

    console.log('Testing 12: Room Selector Filtering constraints');
    const doorRoomOptions = await page.locator('#fsq-studio-room option').allTextContents();
    console.log('Door room selector options:', doorRoomOptions);
    assert.ok(doorRoomOptions.some(o => o.includes('Door Living Room')));
    assert.ok(!doorRoomOptions.some(o => o.includes('Photo Bedroom')), 'Photo Bedroom must NOT appear for doors');

    await page.locator('#fsq-studio-type').selectOption('casement');
    await page.waitForTimeout(400);
    const windowRoomOptions = await page.locator('#fsq-studio-room option').allTextContents();
    console.log('Window room selector options:', windowRoomOptions);
    assert.ok(windowRoomOptions.some(o => o.includes('Photo Bedroom')));
    assert.ok(!windowRoomOptions.some(o => o.includes('Door Living Room')), 'Photo Door Living Room must NOT appear for windows');

    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
    fs.writeFileSync('D:/FSQ_website/qa_inspect/prompt5d/verification-summary.json', JSON.stringify({
      status: 'VERIFIED',
      errors,
      screenshots: [
        '01_casement_single_closed.png',
        '02_casement_single_open.png',
        '03_casement_double_closed.png',
        '04_casement_double_open.png',
        '05_sliding_door_closed.png',
        '06_sliding_door_half_open.png',
        '07_fold_door_closed.png',
        '08_fold_door_folded.png',
        '09_bay_3panel.png',
        '10_bow_style.png',
        '11_colour_change_mahogany.png'
      ]
    }, null, 2));

  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error('Verification failed:', e);
  process.exit(1);
});
