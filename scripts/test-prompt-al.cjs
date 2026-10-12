const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

const QA_LOCAL = 'D:/FSQ_website/qa_inspect/prompt_al';
const QA_REPORT = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Prompt_AL';

fs.mkdirSync(QA_LOCAL, { recursive: true });
fs.mkdirSync(QA_REPORT, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    page.setDefaultTimeout(30000);

    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    console.log('Browser launched. Starting 8 system + 3 finish captures...');

    async function capturePair(name, url, overrideSys = null) {
      console.log(`Loading: ${name} -> ${url}`);
      await page.goto(url);
      await page.waitForFunction(() => !!window.__FSQ_STUDIO__?.snapshot());
      await page.waitForTimeout(800);

      if (overrideSys) {
        await page.evaluate(async (sysKey) => {
          const { buildAssembly, UNIFRAME_SYSTEMS, applyMotion } = await import('/src/components/design-diagrams/studioAssembly.js');
          const { updatePhotoRoom } = await import('/src/components/design-diagrams/studioPhotoRoom.js');
          const ctx = window.__FSQ_STUDIO__.ctx;
          const rec = { ...ctx.assembly.record, product: 'aluminium', uniframeSystem: sysKey };
          ctx.scene.remove(ctx.assembly.root);
          ctx.assembly = buildAssembly(rec);
          ctx.scene.add(ctx.assembly.root);
          if (ctx.photo && ctx.photo.config && ctx.photo.texture) {
            updatePhotoRoom(ctx.photo, ctx.photo.config, ctx.photo.texture, ctx.assembly, true);
          }
          ctx.controls.target.set(0, ctx.assembly.base + ctx.assembly.height / 2, 0);
          ctx.controls.update();
          ctx.dirty = true;
        }, overrideSys);
        await page.waitForTimeout(600);
      }

      // Ensure closed
      await page.evaluate(async () => {
        const { applyMotion } = await import('/src/components/design-diagrams/studioAssembly.js');
        const ctx = window.__FSQ_STUDIO__.ctx;
        ctx.assembly.motions.forEach(m => {
          m.current = m.target = 0;
          m.mode = 'turn';
          applyMotion(m);
        });
        ctx.dirty = true;
      });
      await page.waitForTimeout(400);

      // Screenshot closed
      const closedLocal = `${QA_LOCAL}/${name}_closed.png`;
      const closedReport = `${QA_REPORT}/${name}_closed.png`;
      await page.locator('.recovery-studio').screenshot({ path: closedLocal });
      fs.copyFileSync(closedLocal, closedReport);
      console.log(`Saved: ${name}_closed.png`);

      // Open sash
      await page.evaluate(async () => {
        const { applyMotion } = await import('/src/components/design-diagrams/studioAssembly.js');
        const ctx = window.__FSQ_STUDIO__.ctx;
        ctx.assembly.motions.forEach(m => {
          m.current = m.target = 1;
          applyMotion(m);
        });
        ctx.dirty = true;
      });
      await page.waitForTimeout(600);

      // Screenshot open
      const openLocal = `${QA_LOCAL}/${name}_open.png`;
      const openReport = `${QA_REPORT}/${name}_open.png`;
      await page.locator('.recovery-studio').screenshot({ path: openLocal });
      fs.copyFileSync(openLocal, openReport);
      console.log(`Saved: ${name}_open.png`);
    }

    // 1. Robus 40 Casement Window (Page 20: 48.5 frame, 70.5 sash)
    await capturePair('01_robus_40_casement', 'http://127.0.0.1:5173/#/products/window-studio?product=aluminium&type=casement&design=2&room=photo-living&finish=alu-slate');

    // 2. Livio Minimal Casement Window (Page 19: 54 frame, 52 slim sash)
    await capturePair('02_livio_minimal', 'http://127.0.0.1:5173/#/products/window-studio?product=aluminium&type=casement&design=2&room=photo-living&finish=alu-slate&sys=livio', 'livio-minimal');

    // 3. Graf 26 Sliding Window (Page 14: 44 frame, 53 sash, 32 interlock, single lock)
    await capturePair('03_graf_26_window', 'http://127.0.0.1:5173/#/products/window-studio?product=aluminium&type=sliding&design=0&room=photo-living&finish=alu-slate');

    // 4. Graf 32 Sliding Window (Page 16: 44 frame, 55 sash, 20 slim interlock, multipoint)
    await capturePair('04_graf_32_window', 'http://127.0.0.1:5173/#/products/window-studio?product=aluminium&type=sliding&design=3&room=photo-living&finish=alu-slate');

    // 5. Graf 32 Sliding Door (Page 17: 44 frame, 65 sash, 20 interlock, multipoint)
    await capturePair('05_graf_32_door', 'http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=door-sliding&design=0&room=photo-door-living&finish=white-base&sys=graf32', 'graf-32-door');

    // 6. Graf 45 Sliding Door (Page 18: 25 ultra-slim frame, 85 sash, 20 interlock)
    await capturePair('06_graf_45_door', 'http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=door-sliding&design=0&room=photo-door-living&finish=white-base&sys=graf45', 'graf-45-door');

    // 7. Robus 40 Casement Door (Page 21: 65 frame, 96 sash, multipoint)
    await capturePair('07_robus_40_door', 'http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=door-casement&design=0&room=photo-door-living&finish=white-base&sys=robus40door', 'robus-40-door');

    // 8. Robus 40 Fold and Slide (Page 22: 65 frame, 96 sash, bi-fold guide)
    await capturePair('08_robus_40_fold', 'http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=door-fold&design=0&room=photo-wide-living&finish=white-base&sys=robus40fold', 'robus-40-fold');

    // Finish Captures on Aluminium Single Casement Window (Robus 40)
    console.log('Capturing 3 Finish categories...');
    await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=aluminium&type=casement&design=2&room=photo-living&finish=alu-mystic-dark');
    await page.waitForFunction(() => !!window.__FSQ_STUDIO__?.snapshot());
    await page.waitForTimeout(800);

    // 9. Natural Finish (Mystic Dark - timber sublimation)
    await page.getByRole('button', { name: /^Mystic Dark/ }).first().click();
    await page.waitForTimeout(500);
    const f1Local = `${QA_LOCAL}/09_finish_natural_mystic_dark.png`;
    await page.locator('.recovery-studio').screenshot({ path: f1Local });
    fs.copyFileSync(f1Local, `${QA_REPORT}/09_finish_natural_mystic_dark.png`);
    console.log('Saved: 09_finish_natural_mystic_dark.png');

    // 10. Solid Finish (Noir - architectural powder coat)
    await page.getByRole('button', { name: /^Noir/ }).first().click();
    await page.waitForTimeout(500);
    const f2Local = `${QA_LOCAL}/10_finish_solid_noir.png`;
    await page.locator('.recovery-studio').screenshot({ path: f2Local });
    fs.copyFileSync(f2Local, `${QA_REPORT}/10_finish_solid_noir.png`);
    console.log('Saved: 10_finish_solid_noir.png');

    // 11. Premium Finish (Caramel - metallic satin)
    await page.getByRole('button', { name: /^Caramel/ }).first().click();
    await page.waitForTimeout(500);
    const f3Local = `${QA_LOCAL}/11_finish_premium_caramel.png`;
    await page.locator('.recovery-studio').screenshot({ path: f3Local });
    fs.copyFileSync(f3Local, `${QA_REPORT}/11_finish_premium_caramel.png`);
    console.log('Saved: 11_finish_premium_caramel.png');

    console.log('ALL_CAPTURES_SUCCESSFUL');
  } finally {
    await browser.close();
  }
})();
