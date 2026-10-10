const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const qa = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const localShots = 'D:/FSQ_website/room-screenshots';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  await page.goto('http://localhost:5173/#/products/window-studio?product=upvc&type=casement&design=4');
  await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
  await page.waitForTimeout(2000);

  // Select garden-living and garden
  await page.locator('#fsq-studio-room').selectOption('garden-living');
  await page.locator('#fsq-studio-scenery').selectOption('garden');

  // Wait for texture decode and mark
  await page.waitForTimeout(4000);

  const captureCanvas = async (outPath) => {
    const dataUrl = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      c.renderer.render(c.scene, c.camera);
      return c.renderer.domElement.toDataURL('image/png');
    });
    const buffer = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(outPath, buffer);
  };

  const closedQa = `${qa}/room-garden-living-closed.png`;
  const closedLocal = `${localShots}/room-garden-living-closed.png`;
  await captureCanvas(closedQa);
  fs.copyFileSync(closedQa, closedLocal);

  console.log('GARDEN_CLOSED_CAPTURED_SUCCESSFULLY');
  await browser.close();
})();
