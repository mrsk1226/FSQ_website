const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const qaDir = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa';
const inspectDir = 'd:/FSQ_website/qa_inspect';

const tasks = [
  { name: 'casement', product: 'upvc', type: 'casement', design: '2' },
  { name: 'double-casement', product: 'upvc', type: 'casement', design: '4' },
  { name: 'sliding', product: 'upvc', type: 'sliding', design: '3' }
];

const rooms = [
  'photo-bedroom',
  'photo-living',
  'photo-garden-sitting'
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    page.setDefaultTimeout(30000);

    for (const t of tasks) {
      for (const r of rooms) {
        const url = `http://127.0.0.1:5173/#/products/window-studio?product=${t.product}&type=${t.type}&design=${t.design}&room=${r}`;
        console.log(`Navigating to: ${t.name} in ${r}`);
        await page.goto(url);
        
        // Wait for studio and photo room to be ready
        await page.waitForFunction((expectedType) => {
          const snap = window.__FSQ_STUDIO__?.snapshot();
          return snap?.photo?.ready && snap?.id?.includes(expectedType);
        }, t.type, { timeout: 20000 });

        await page.locator('.recovery-studio').scrollIntoViewIfNeeded();
        // Wait for any initial damping/rendering to settle
        await page.waitForTimeout(600);

        const filename = `${t.name}-${r}.png`;
        const qaPath = path.join(qaDir, filename);
        const inspectPath = path.join(inspectDir, filename);

        const clip = await page.locator('.recovery-studio').boundingBox();
        await page.screenshot({ path: qaPath, clip });
        fs.copyFileSync(qaPath, inspectPath);
        console.log(`Captured ${filename}`);
      }
    }
  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});
