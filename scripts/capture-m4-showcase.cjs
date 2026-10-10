const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');

const qa = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const localDir = 'D:/FSQ_website/room-screenshots';

const targets = [
  { id: 'tilt-turn', url: 'http://localhost:5173/#/products/window-studio?product=upvc&type=tilt-turn&design=0', name: 'Tilt & Turn', kind: 'tt' },
  { id: 'door-casement', url: 'http://localhost:5173/#/products/window-studio?product=upvc&type=door-casement&design=0', name: 'Casement Door', kind: 'door' },
  { id: 'door-fold', url: 'http://localhost:5173/#/products/window-studio?product=upvc&type=door-fold&design=0', name: 'Slide & Fold Door', kind: 'fold' },
  { id: 'bay-3panel', url: 'http://localhost:5173/#/products/window-studio?product=upvc&type=bay-concepts&design=0', name: '3-Panel Bay', kind: 'bay' },
  { id: 'bay-bow', url: 'http://localhost:5173/#/products/window-studio?product=upvc&type=bay-concepts&design=2', name: 'Curved Bow Bay', kind: 'bay' }
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  const captureCanvas = async (outPath) => {
    const dataUrl = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      c.renderer.render(c.scene, c.camera);
      return c.renderer.domElement.toDataURL('image/png');
    });
    const buffer = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(outPath, buffer);
  };

  for (const t of targets) {
    console.log(`Testing ${t.name}...`);
    await page.goto(t.url);
    await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
    await page.waitForTimeout(2000);

    // Capture CLOSED
    const closedQa = `${qa}/m4-${t.id}-closed.png`;
    const closedLocal = `${localDir}/m4-${t.id}-closed.png`;
    await captureCanvas(closedQa);
    fs.copyFileSync(closedQa, closedLocal);

    if (t.kind === 'tt') {
      // 1. Tilt mode
      await page.evaluate(() => {
        const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
        m.mode = 'tilt';
        m.target = 1.0;
        window.__FSQ_STUDIO__.ctx.dirty = true;
      });
      await page.waitForTimeout(1000);
      const tiltQa = `${qa}/m4-${t.id}-tilt.png`;
      const tiltLocal = `${localDir}/m4-${t.id}-tilt.png`;
      await captureCanvas(tiltQa);
      fs.copyFileSync(tiltQa, tiltLocal);

      // 2. Turn mode
      await page.evaluate(() => {
        const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
        m.mode = 'turn';
        m.target = 1.0;
        window.__FSQ_STUDIO__.ctx.dirty = true;
      });
      await page.waitForTimeout(1000);
      const turnQa = `${qa}/m4-${t.id}-turn.png`;
      const turnLocal = `${localDir}/m4-${t.id}-turn.png`;
      await captureCanvas(turnQa);
      fs.copyFileSync(turnQa, turnLocal);
    } else if (t.kind === 'door' || t.kind === 'fold') {
      // Open door
      await page.evaluate(() => {
        const motions = window.__FSQ_STUDIO__.ctx.assembly.motions;
        motions.forEach(m => { m.target = 0.85; });
        window.__FSQ_STUDIO__.ctx.dirty = true;
      });
      await page.waitForTimeout(1000);
      const openQa = `${qa}/m4-${t.id}-open.png`;
      const openLocal = `${localDir}/m4-${t.id}-open.png`;
      await captureCanvas(openQa);
      fs.copyFileSync(openQa, openLocal);
    }
  }

  console.log('M4_SHOWCASE_CAPTURES_COMPLETED');
  await browser.close();
})();
