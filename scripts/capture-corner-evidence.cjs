const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const qaDir = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const siteDir = 'D:/FSQ_website/room-screenshots';

const targets = [
  {
    name: 'single-casement',
    product: 'upvc',
    type: 'casement',
    design: '2', // Single Right Casement (procedural with mitred outer frame & sash)
    label: 'Single Casement (procedural mitres)'
  },
  {
    name: 'double-casement',
    product: 'upvc',
    type: 'casement',
    design: '4', // Two Openings / Double Casement (v04 GLB with mitred outer frame & sashes)
    label: 'Double Casement (v04 GLB mitres)'
  },
  {
    name: '3track-sliding',
    product: 'upvc',
    type: 'sliding',
    design: '3', // 3-Track 3-Panel Sliding
    label: '3-Track Sliding (procedural mitres)'
  }
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

    for (const t of targets) {
      console.log(`Navigating to ${t.name}: type=${t.type}, design=${t.design}...`);
      await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=${t.product}&type=${t.type}&design=${t.design}`);
      await page.locator('[data-load-status="ready"]').waitFor({ timeout: 30000 });
      await page.waitForTimeout(1000);

      // Verify closed state
      await page.evaluate(() => {
        const api = window.__FSQ_STUDIO__;
        if (api && api.ctx && api.ctx.assembly) {
          api.ctx.assembly.motions.forEach(m => {
            m.target = 0;
            m.current = 0;
          });
        }
      });
      await page.waitForTimeout(500);

      // Position camera for a crisp, detailed close-up of the bottom-left corner from interior
      await page.evaluate(() => {
        const api = window.__FSQ_STUDIO__;
        const ctx = api.ctx;
        const a = ctx.assembly;
        // Bottom-left corner
        const cornerX = -a.width / 2 + 0.08;
        const cornerY = a.base + 0.08;
        ctx.controls.target.set(cornerX, cornerY, 0);
        ctx.camera.position.set(cornerX + 0.04, cornerY + 0.04, 0.42);
        ctx.camera.lookAt(cornerX, cornerY, 0);
        ctx.controls.update();
        ctx.dirty = true;
      });

      await page.waitForTimeout(1200);

      const qaPath = path.join(qaDir, `corner-${t.name}.png`);
      const sitePath = path.join(siteDir, `corner-${t.name}.png`);

      const canvasClip = await page.locator('.recovery-studio').boundingBox();
      await page.screenshot({ clip: canvasClip, path: qaPath, timeout: 60000 });
      fs.copyFileSync(qaPath, sitePath);
      console.log(`Saved screenshot to ${qaPath} and ${sitePath}`);
    }

    console.log('All corner evidence screenshots captured successfully.');
  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});
