const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

const outDir = 'D:/FSQ_website/qa_inspect/sliding_diagnostics';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const slidingLayouts = [
  { id: 'upvc-sliding:0', name: '2-Track 2-Panel (uPVC)', system: 'upvc-sliding', designIdx: 0, tracks: 2, captureFrames: true },
  { id: 'upvc-sliding:1', name: '2-Track 3-Panel (uPVC)', system: 'upvc-sliding', designIdx: 1, tracks: 2, captureFrames: false },
  { id: 'upvc-sliding:2', name: '2-Track 4-Panel (uPVC)', system: 'upvc-sliding', designIdx: 2, tracks: 2, captureFrames: true },
  { id: 'upvc-sliding:3', name: '3-Track 3-Panel (uPVC)', system: 'upvc-sliding', designIdx: 3, tracks: 3, captureFrames: true },
  { id: 'upvc-sliding:4', name: 'Sliding with Top Fixed (uPVC)', system: 'upvc-sliding', designIdx: 4, tracks: 2, captureFrames: false },
  { id: 'aluminium-sliding:0', name: '2-Track 2-Panel (Aluminium)', system: 'aluminium-sliding', designIdx: 0, tracks: 2, captureFrames: false },
  { id: 'aluminium-sliding:1', name: '2-Track 3-Panel (Aluminium)', system: 'aluminium-sliding', designIdx: 1, tracks: 2, captureFrames: false },
  { id: 'aluminium-sliding:2', name: '2-Track 4-Panel (Aluminium)', system: 'aluminium-sliding', designIdx: 2, tracks: 2, captureFrames: false },
  { id: 'aluminium-sliding:3', name: '3-Track 3-Panel (Aluminium)', system: 'aluminium-sliding', designIdx: 3, tracks: 3, captureFrames: false },
  { id: 'aluminium-sliding:4', name: 'Sliding with Top Fixed (Aluminium)', system: 'aluminium-sliding', designIdx: 4, tracks: 2, captureFrames: false },
  { id: 'upvc-door-sliding:0', name: '2-Track 2-Panel Left (uPVC Door)', system: 'upvc-door-sliding', designIdx: 0, tracks: 2, captureFrames: false },
  { id: 'upvc-door-sliding:1', name: '2-Track 2-Panel Right (uPVC Door)', system: 'upvc-door-sliding', designIdx: 1, tracks: 2, captureFrames: false },
  { id: 'upvc-door-sliding:2', name: '3-Panel Center Slide (uPVC Door)', system: 'upvc-door-sliding', designIdx: 2, tracks: 2, captureFrames: false },
  { id: 'upvc-door-sliding:3', name: '4-Panel Center Open (uPVC Door)', system: 'upvc-door-sliding', designIdx: 3, tracks: 2, captureFrames: false }
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const diagnostics = [];

    for (const layout of slidingLayouts) {
      const isAlu = layout.id.startsWith('aluminium');
      const isDoor = layout.id.startsWith('upvc-door');
      const prod = isAlu ? 'aluminium' : 'upvc';
      const type = isDoor ? 'door-sliding' : 'sliding';

      const url = `http://127.0.0.1:5173/#/products/window-studio?product=${prod}&type=${type}&design=${layout.designIdx}`;
      await page.goto(url);
      await page.locator('[data-load-status="ready"]').waitFor();
      await page.locator('.recovery-studio').scrollIntoViewIfNeeded();

      // Gather baseline assembly metadata
      const meta = await page.evaluate(() => {
        const snap = window.__FSQ_STUDIO__.snapshot();
        return {
          id: snap.id,
          tracks: snap.tracks,
          panels: snap.panels,
          motions: snap.motions
        };
      });

      const frameResults = [];
      const steps = [0, 0.25, 0.5, 0.75, 1.0];

      for (const step of steps) {
        // Set motion target
        await page.evaluate((val) => {
          const api = window.__FSQ_STUDIO__;
          api.ctx.assembly.motions.forEach(m => {
            m.target = val;
            m.current = val; // direct evaluate pose
          });
          api.ctx.dirty = true;
        }, step);

        await page.waitForTimeout(100);

        // Snapshot world positions of all panels
        const panelPos = await page.evaluate(() => {
          const a = window.__FSQ_STUDIO__.ctx.assembly;
          const res = [];
          a.panels.forEach(p => {
            const node = a.root.getObjectByName(`${p.id}_Sash`);
            if (node) {
              const wp = node.getWorldPosition(window.__FSQ_STUDIO__.ctx.camera.position.clone());
              res.push({ id: p.id, type: p.type, track: p.track, localX: node.position.x, localZ: node.position.z, worldX: wp.x, worldZ: wp.z });
            }
          });
          const audit = window.__FSQ_STUDIO__.inspect();
          return { panels: res, collisions: audit?.collisions || [] };
        });

        frameResults.push({ step, panelPos });

        if (layout.captureFrames) {
          const prefix = layout.id.replace(':', '_');
          const percent = Math.round(step * 100);
          const ssPath = path.join(outDir, `${prefix}_step_${percent}pct.png`);
          await page.locator('.recovery-studio').screenshot({ path: ssPath });
          console.log(`Saved screenshot: ${ssPath}`);
        }
      }

      // Check click behavior on sash vs handle
      const clickTest = await page.evaluate(() => {
        const api = window.__FSQ_STUDIO__;
        const a = api.ctx.assembly;
        const dom = api.ctx.renderer.domElement;
        const rect = dom.getBoundingClientRect();
        
        // Find glass mesh of the first sliding sash
        const firstMotion = a.motions[0];
        if (!firstMotion) return { error: 'No motion' };
        
        const glass = a.root.getObjectByName(`${firstMotion.id}_Glass`);
        const handle = a.root.getObjectByName(`${firstMotion.id}_TouchLock`);
        
        return {
          glassHasMotionId: glass?.userData?.motionId === firstMotion.id,
          handleHasMotionId: handle?.userData?.motionId === firstMotion.id,
          glassName: glass?.name,
          handleName: handle?.name
        };
      });

      diagnostics.push({
        id: layout.id,
        name: layout.name,
        meta,
        frames: frameResults,
        clickTest
      });
    }

    fs.writeFileSync(path.join(outDir, 'diagnostics.json'), JSON.stringify(diagnostics, null, 2));
    console.log(`Diagnostics completed for all ${slidingLayouts.length} layouts.`);
  } finally {
    await browser.close();
  }
})();
