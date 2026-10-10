const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const qa = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const network = [];
  const errors = [];

  page.on('response', resp => {
    const url = resp.url();
    if (url.includes('FSQ_TouchLock_Visual_Recovery_v02.glb')) {
      network.push({
        url,
        status: resp.status(),
        contentType: resp.headers()['content-type'],
        contentLength: resp.headers()['content-length']
      });
    }
  });

  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });

  await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=sliding&design=0');
  await page.locator('[data-load-status="ready"]').waitFor({ timeout: 60000 });
  await page.locator('.recovery-studio').scrollIntoViewIfNeeded();

  // Click Hardware preset for camera zoom onto Touch Lock
  await page.locator('.recovery-studio').getByRole('button', { name: 'Hardware', exact: true }).click();
  await page.waitForTimeout(1000);

  // Inspect the hardware mesh in the scene
  const meshInfo = await page.evaluate(() => {
    const c = window.__FSQ_STUDIO__.ctx;
    const a = c.assembly;
    const m = a.motions[0];
    const body = a.root.getObjectByName(`${m.id}_TouchLock_Left_RebuiltBody`) ||
                 a.root.getObjectByName(`${m.id}_TouchLock_Right_RebuiltBody`);
    const actuator = m.actuator;
    const latch = m.latch;

    return {
      bodyFound: !!body,
      bodyName: body ? body.name : null,
      flatShading: body ? body.material.flatShading : null,
      vertexCount: body ? body.geometry.attributes.position.count : 0,
      hasNormals: body ? !!body.geometry.attributes.normal : false,
      actuatorFound: !!actuator,
      latchFound: !!latch,
      hardwareSource: a.hardwareSource
    };
  });

  // Take full studio and close-up screenshots
  const closeupPath = `${qa}/touchlock-v02-closeup.png`;
  await page.locator('.recovery-studio').screenshot({ path: closeupPath });

  const result = {
    milestone: 'M1',
    status: (network.length > 0 && network[0].status === 200 && meshInfo.flatShading === false) ? 'BROWSER_TESTED' : 'FAIL',
    glbNetwork: network,
    meshInfo,
    errors,
    screenshotPath: closeupPath,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(`${qa}/touchlock-v02-review.json`, JSON.stringify(result, null, 2));
  console.log('TOUCHLOCK_REVIEW_RESULT:', JSON.stringify(result, null, 2));

  await browser.close();
  if (result.status !== 'BROWSER_TESTED') {
    process.exitCode = 1;
  }
})().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
