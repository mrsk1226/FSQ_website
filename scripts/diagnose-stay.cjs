const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4&room=modern-bedroom');
  await page.locator('[data-load-status="ready"]').waitFor();

  const diag = await page.evaluate(() => {
    const api = window.__FSQ_STUDIO__;
    const a = api.ctx.assembly;
    a.motions.forEach(m => { m.current = m.target = 1; });
    api.ctx.dirty = true;
    const audit = api.inspect();
    const left = a.motions[0];
    const sill = a.root.getObjectByName('Sash_Left_Profile_Bottom');
    sill.geometry.computeBoundingBox();
    const rel = left.node.matrixWorld.clone().invert().multiply(sill.matrixWorld);
    const bounds = sill.geometry.boundingBox.clone().applyMatrix4(rel);
    const frame = a.root.getObjectByName('Frame_Bottom');
    frame.geometry.computeBoundingBox();
    const fb = frame.geometry.boundingBox.clone().applyMatrix4(left.node.parent.matrixWorld.clone().invert().multiply(frame.matrixWorld));
    const inst = api.ctx.room.getObjectByName('Installation_Architecture');
    const jambs = [];
    inst.traverse(n => {
      if (n.name === 'Reveal_Jamb') {
        n.updateWorldMatrix(true, false);
        jambs.push({
          name: n.name,
          box: n.geometry.boundingBox.clone().applyMatrix4(n.matrixWorld)
        });
      }
    });
    const pad = left.stay.pad;
    pad.updateWorldMatrix(true, false);
    const padBox = pad.geometry.boundingBox.clone().applyMatrix4(pad.matrixWorld);
    const res = {
      bounds,
      fb,
      nodePos: left.node.position.toArray(),
      nodeScale: left.node.scale.toArray(),
      padScale: pad.scale.toArray(),
      padGeom: pad.geometry.parameters,
      nodeRot: left.node.rotation.toArray(),
      padLocalPos: pad.position.toArray(),
      padWorldPos: pad.getWorldPosition(new pad.position.constructor()).toArray(),
      padBox: padBox,
      jambs,
      stayCollisions: audit.stayCollisions
    };
    return res;
  });
  console.log(JSON.stringify(diag, null, 2));
  await browser.close();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
