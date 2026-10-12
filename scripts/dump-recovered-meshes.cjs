const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4');
  await page.locator('[data-load-status="ready"]').waitFor();

  const meshes = await page.evaluate(() => {
    const a = window.__FSQ_STUDIO__.ctx.assembly;
    const res = [];
    a.root.traverse(n => {
      res.push({
        name: n.name,
        type: n.type,
        role: n.userData.role,
        motionId: n.userData.motionId,
        parent: n.parent?.name
      });
    });
    return res;
  });

  console.log('Total nodes in recovered GLB:', meshes.length);
  const meshOnly = meshes.filter(m => m.type === 'Mesh');
  console.log('Meshes with role and motionId:');
  meshOnly.forEach(m => console.log(`Mesh: "${m.name}", role: ${m.role}, motionId: ${m.motionId}, parent: "${m.parent}"`));

  await browser.close();
})();
