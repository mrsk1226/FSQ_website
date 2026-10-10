const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const qa = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const localShots = 'D:/FSQ_website/room-screenshots';

const rooms = [
  { id: 'modern-bedroom', outdoor: 'city', name: 'Modern Bedroom' },
  { id: 'luxury-living', outdoor: 'city', name: 'Luxury Living' },
  { id: 'apartment-living', outdoor: 'city', name: 'Apartment Living' },
  { id: 'home-office', outdoor: 'hills', name: 'Home Office' },
  { id: 'hillside-living', outdoor: 'hills', name: 'Hillside Living' },
  { id: 'ooty-bay', outdoor: 'ooty', name: 'Bay Seating' },
  { id: 'garden-living', outdoor: 'garden', name: 'Garden Living' }
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const results = [];
  const errors = [];

  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });

  await page.goto('http://localhost:5173/#/products/window-studio?product=upvc&type=casement&design=4');
  await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
  await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // Helper to grab canvas render directly
  const captureCanvas = async (outPath) => {
    const dataUrl = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      c.renderer.render(c.scene, c.camera);
      return c.renderer.domElement.toDataURL('image/png');
    });
    const buffer = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(outPath, buffer);
  };

  // Baseline reference objects
  await page.evaluate(() => {
    const c = window.__FSQ_STUDIO__.ctx;
    window._originalModel = c.assembly.root;
    window._originalRenderer = c.renderer;
    window._initialCamera = c.camera.position.toArray();
  });

  for (const r of rooms) {
    console.log(`Testing room: ${r.name} (${r.id})...`);
    // Select room
    await page.locator('#fsq-studio-room').selectOption(r.id);
    await page.waitForTimeout(500);

    // Select scenery
    await page.locator('#fsq-studio-scenery').selectOption(r.outdoor);
    await page.waitForTimeout(1500);

    // Verify model not reloaded
    const checks = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      return {
        modelPreserved: c.assembly.root === window._originalModel,
        rendererPreserved: c.renderer === window._originalRenderer,
        furnitureFound: !!c.room.getObjectByName(/Furniture_/),
        childCount: c.room.children.length
      };
    });

    // 1. Capture CLOSED sash
    const closedQa = `${qa}/room-${r.id}-closed.png`;
    const closedLocal = `${localShots}/room-${r.id}-closed.png`;
    await captureCanvas(closedQa);
    fs.copyFileSync(closedQa, closedLocal);

    // 2. Open sash
    await page.evaluate(() => {
      const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
      if (m) {
        m.target = 0.85;
        window.__FSQ_STUDIO__.ctx.dirty = true;
      }
    });
    await page.waitForTimeout(1200);

    // Capture OPEN sash
    const openQa = `${qa}/room-${r.id}-open.png`;
    const openLocal = `${localShots}/room-${r.id}-open.png`;
    await captureCanvas(openQa);
    fs.copyFileSync(openQa, openLocal);

    // Reset sash to closed
    await page.evaluate(() => {
      const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
      if (m) {
        m.target = 0;
        window.__FSQ_STUDIO__.ctx.dirty = true;
      }
    });
    await page.waitForTimeout(800);

    results.push({
      room: r.id,
      name: r.name,
      outdoor: r.outdoor,
      checks,
      closedScreenshot: closedQa,
      openScreenshot: openQa,
      localClosed: closedLocal,
      localOpen: openLocal
    });
  }

  const output = {
    milestone: 'M2',
    status: (results.length === 7 && results.every(r => r.checks.modelPreserved)) ? 'BROWSER_TESTED' : 'FAIL',
    rooms: results,
    errors,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(`${qa}/m2-room-review.json`, JSON.stringify(output, null, 2));
  console.log('M2_REVIEW_RESULT:', JSON.stringify(output, null, 2));

  await browser.close();
  if (output.status !== 'BROWSER_TESTED') {
    process.exitCode = 1;
  }
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
