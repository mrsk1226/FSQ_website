const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

const output = 'public/textures/rooms-real';

const roomSpecs = [
  {
    id: 'bedroom',
    name: 'Photo Bedroom',
    category: 'window',
    openingReal: { w: 1.8, h: 1.25 }
  },
  {
    id: 'living',
    name: 'Photo Living Room',
    category: 'window',
    openingReal: { w: 1.8, h: 1.25 }
  },
  {
    id: 'garden-sitting',
    name: 'Photo Garden Sitting Room',
    category: 'window',
    openingReal: { w: 1.8, h: 1.25 }
  },
  {
    id: 'door-living',
    name: 'Photo Door Living Room',
    category: 'door',
    openingReal: { w: 2.1, h: 2.2 }
  },
  {
    id: 'wide-living',
    name: 'Photo Wide Living Room',
    category: 'wide',
    openingReal: { w: 3.6, h: 2.2 }
  }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const rooms = [];
    fs.mkdirSync(output, { recursive: true });

    for (const spec of roomSpecs) {
      const source = `design-references/real-rooms/${spec.id}.png`;
      if (!fs.existsSync(source)) {
        console.warn(`Source missing: ${source}`);
        continue;
      }
      const bytes = fs.readFileSync(source);
      const result = await page.evaluate(async ({ url, spec }) => {
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
        if (!count) throw Error(`No usable chroma opening in ${spec.id}`);
        const w = x1 - x0 + 1, h = y1 - y0 + 1, fill = count / (w * h);

        // Average adjacent plaster strips
        const samples = [];
        const isDoor = spec.category === 'door' || spec.category === 'wide';
        const yTopSample = y0 + 30;
        const yBottomSample = isDoor ? Math.min(y1 - 60, c.height - 120) : y1 - 30;

        for (const xStart of [x0 - 55, x1 + 35]) {
          for (let y = yTopSample; y < yBottomSample; y += 4) {
            for (let x = xStart; x < xStart + 16; x += 4) {
              if (x >= 0 && x < c.width && y >= 0 && y < c.height) {
                const i = (y * c.width + x) * 4;
                samples.push([data[i], data[i + 1], data[i + 2]]);
              }
            }
          }
        }
        const wallColor = [0, 1, 2].map(k => Math.round(samples.reduce((s, p) => s + p[k], 0) / (samples.length || 1)));

        return {
          width: c.width,
          height: c.height,
          opening: {
            x: x0 / c.width,
            y: y0 / c.height,
            w: w / c.width,
            h: h / c.height
          },
          pixelRect: [x0, y0, w, h],
          greenFill: fill,
          wallColor,
          data: c.toDataURL('image/webp', 0.85).split(',')[1]
        };
      }, { url: `data:image/png;base64,${bytes.toString('base64')}`, spec });

      const { data, ...metadata } = result;
      const encoded = Buffer.from(data, 'base64');
      fs.writeFileSync(`${output}/${spec.id}.webp`, encoded);

      rooms.push({
        id: `photo-${spec.id}`,
        name: spec.name,
        category: spec.category,
        image: `/textures/rooms-real/${spec.id}.webp`,
        openingReal: spec.openingReal,
        ...metadata,
        status: 'PROVISIONAL',
        sourceSha256: crypto.createHash('sha256').update(bytes).digest('hex'),
        optimizedBytes: encoded.length
      });
      console.log(`Processed ${spec.id}: ${encoded.length} bytes, greenFill: ${metadata.greenFill.toFixed(4)}`);
    }

    fs.writeFileSync(
      `${output}/rooms.json`,
      JSON.stringify(
        {
          version: 2,
          key: 'green opening only; RGB G>160 R/B<100 G-max(R,B)>100',
          rooms
        },
        null,
        2
      )
    );
    console.log(`\nSuccessfully wrote ${rooms.length} rooms to ${output}/rooms.json`);
  } finally {
    await browser.close();
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});
