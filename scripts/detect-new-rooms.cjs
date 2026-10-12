const fs = require('fs');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const id of ['door-living', 'wide-living']) {
    const file = `design-references/real-rooms/${id}.png`;
    if (!fs.existsSync(file)) {
      console.log(`File not found: ${file}`);
      continue;
    }
    const bytes = fs.readFileSync(file);
    const info = await page.evaluate(async ({ url, id }) => {
      const img = new Image();
      img.src = url;
      await img.decode();
      const c = document.createElement('canvas');
      const factor = Math.min(1, 2560 / img.width);
      c.width = Math.round(img.width * factor);
      c.height = Math.round(img.height * factor);
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);

      let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0, count = 0;
      for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
          const i = (y * c.width + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (g > 160 && r < 100 && b < 100 && g - Math.max(r, b) > 100) {
            x0 = Math.min(x0, x);
            y0 = Math.min(y0, y);
            x1 = Math.max(x1, x);
            y1 = Math.max(y1, y);
            count++;
          }
        }
      }
      const w = x1 - x0 + 1, h = y1 - y0 + 1;
      const fill = count / (w * h);

      // Check adjacent pixels for wall color
      const samples = [];
      for (const xStart of [x0 - 45, x1 + 30]) {
        for (let y = y0 + 30; y < Math.min(y1 - 30, c.height - 100); y += 4) {
          for (let x = xStart; x < xStart + 16; x += 4) {
            if (x >= 0 && x < c.width) {
              const i = (y * c.width + x) * 4;
              samples.push([data[i], data[i + 1], data[i + 2]]);
            }
          }
        }
      }
      const wallColor = [0, 1, 2].map(k => Math.round(samples.reduce((s, p) => s + p[k], 0) / (samples.length || 1)));

      return {
        id,
        origW: img.width,
        origH: img.height,
        cW: c.width,
        cH: c.height,
        x0, y0, x1, y1,
        w, h,
        count,
        fill,
        wallColor,
        opening: {
          x: x0 / c.width,
          y: y0 / c.height,
          w: w / c.width,
          h: h / c.height
        }
      };
    }, { url: `data:image/png;base64,${bytes.toString('base64')}`, id });

    console.log(`\n--- RESULT FOR ${id} ---`);
    console.log(JSON.stringify(info, null, 2));
  }

  await browser.close();
})();
