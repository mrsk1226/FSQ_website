const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');

const qa = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
const localDir = 'D:/FSQ_website/room-screenshots';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const results = {};
  const errors = [];

  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });

  const captureCanvas = async (outPath) => {
    const dataUrl = await page.evaluate(() => {
      const c = window.__FSQ_STUDIO__.ctx;
      c.renderer.render(c.scene, c.camera);
      return c.renderer.domElement.toDataURL('image/png');
    });
    const buffer = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(outPath, buffer);
  };

  // 1. Aluminium Casement
  console.log('Testing Aluminium Casement...');
  await page.goto('http://localhost:5173/#/products/window-studio?product=aluminium&type=casement&design=0');
  await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
  await page.waitForTimeout(2000);

  const aluCasementInfo = await page.evaluate(() => {
    const c = window.__FSQ_STUDIO__.ctx;
    const a = c.assembly;
    let profileMat = null;
    let headMesh = null;
    a.root.traverse(n => {
      if (n.userData.role === 'profile' && !profileMat) {
        profileMat = {
          color: '#' + n.material.color.getHexString(),
          metalness: n.material.metalness,
          roughness: n.material.roughness,
          hasMap: !!n.material.map
        };
      }
      if (n.name.includes('_Head') && !headMesh) {
        headMesh = {
          name: n.name,
          geometry: n.geometry.parameters
        };
      }
    });
    return {
      product: a.record.product,
      type: a.record.type,
      profileMat,
      headMesh
    };
  });
  results.aluCasement = aluCasementInfo;

  // Capture closed
  await captureCanvas(`${qa}/alu-casement-closed.png`);
  fs.copyFileSync(`${qa}/alu-casement-closed.png`, `${localDir}/alu-casement-closed.png`);

  // Open sash
  await page.evaluate(() => {
    const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
    if (m) {
      m.target = 0.8;
      window.__FSQ_STUDIO__.ctx.dirty = true;
    }
  });
  await page.waitForTimeout(1000);

  // Capture open
  await captureCanvas(`${qa}/alu-casement-open.png`);
  fs.copyFileSync(`${qa}/alu-casement-open.png`, `${localDir}/alu-casement-open.png`);

  // 2. Aluminium Sliding
  console.log('Testing Aluminium Sliding...');
  await page.goto('http://localhost:5173/#/products/window-studio?product=aluminium&type=sliding&design=0');
  await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
  await page.waitForTimeout(2000);

  const aluSlidingInfo = await page.evaluate(() => {
    const c = window.__FSQ_STUDIO__.ctx;
    const a = c.assembly;
    return {
      product: a.record.product,
      type: a.record.type,
      tracks: a.tracks,
      motions: a.motions.length,
      metalness: a.mats.profile.metalness,
      roughness: a.mats.profile.roughness
    };
  });
  results.aluSliding = aluSlidingInfo;

  // Capture closed
  await captureCanvas(`${qa}/alu-sliding-closed.png`);
  fs.copyFileSync(`${qa}/alu-sliding-closed.png`, `${localDir}/alu-sliding-closed.png`);

  // Slide sash
  await page.evaluate(() => {
    const m = window.__FSQ_STUDIO__.ctx.assembly.motions[0];
    if (m) {
      m.target = 0.85;
      window.__FSQ_STUDIO__.ctx.dirty = true;
    }
  });
  await page.waitForTimeout(1000);

  // Capture sliding open
  await captureCanvas(`${qa}/alu-sliding-open.png`);
  fs.copyFileSync(`${qa}/alu-sliding-open.png`, `${localDir}/alu-sliding-open.png`);

  console.log('ALU_TEST_RESULTS:', JSON.stringify({ results, errors }, null, 2));
  await browser.close();
})();
