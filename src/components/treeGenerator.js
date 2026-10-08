/**
 * Deterministic Procedural Green Tree Generator (Pure Functions)
 * Seeded RNG: Mulberry32 (Seed 7)
 * Strictly conforms to owner-approved botanical parameters:
 * - Thick, sculpted mature trunk with natural bark contours
 * - Strong primary scaffold boughs and balanced secondary branching
 * - Rich layered foliage masses + high-density detailed leaf clusters
 * - 48 grass blades (45-70) & 6 flowers (5-8)
 * - 0 blossoms, 0 butterflies, 0 birds, 0 pollen, 0 mouse gusts
 */

export function mulberry32(seed = 7) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BARK_PALETTE = [
  "#2c1b10",
  "#3a2416",
  "#4a3220",
  "#5b3f2a",
  "#6e4f37",
  "#80604a",
  "#8f7058"
];

const LEAF_PALETTE = [
  "#092612",
  "#0d3817",
  "#14532d",
  "#166534",
  "#1b5e20",
  "#2e7d32",
  "#388e3c",
  "#43a047",
  "#66bb6a",
  "#81c784",
  "#a5d6a7"
];

const GRASS_PALETTE = [
  "#1b5e20",
  "#2e7d32",
  "#388e3c",
  "#43a047",
  "#66bb6a"
];

export function generateTreeData(seed = 7) {
  const rng = mulberry32(seed);

  const branches = [];
  const foliageMasses = [];
  const leaves = [];

  function calcArcLen(x1, y1, cx, cy, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const chord = Math.hypot(dx, dy);
    const dcp = Math.hypot(cx - (x1 + x2) / 2, cy - (y1 + y2) / 2);
    return chord + (8 / 3) * (dcp * dcp) / (chord || 1);
  }

  // 1. Heavy Central Trunk
  const trunkArcLen = calcArcLen(300, 570, 301, 495, 300, 420);
  branches.push({
    id: "br-trunk-main",
    d: "M 300 570 Q 301 495 300 420",
    strokeColor: BARK_PALETTE[0],
    strokeWidth: 32,
    arcLen: trunkArcLen,
    drawStart: 0.00,
    drawEnd: 0.22,
    depth: 0
  });

  // Trunk Bark Shading & Contour Lines
  branches.push({
    id: "br-trunk-shadow-left",
    d: "M 288 569 Q 289 495 292 422",
    strokeColor: "#1d1109",
    strokeWidth: 6,
    arcLen: trunkArcLen,
    drawStart: 0.04,
    drawEnd: 0.24,
    depth: 0
  });
  branches.push({
    id: "br-trunk-highlight-right",
    d: "M 309 568 Q 308 495 306 422",
    strokeColor: "rgba(255, 255, 255, 0.16)",
    strokeWidth: 4,
    arcLen: trunkArcLen,
    drawStart: 0.06,
    drawEnd: 0.26,
    depth: 0
  });

  // Recursive Branching from Main Crotch
  function growBranch(x, y, angle, length, width, depth, startTime) {
    if (depth > 6 || length < 7) return;

    const bend = (rng() - 0.5) * 0.36;
    const midAngle = angle + bend;
    const cx = x + Math.cos(midAngle) * (length * 0.54);
    const cy = y + Math.sin(midAngle) * (length * 0.54);

    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;

    const arcLen = calcArcLen(x, y, cx, cy, ex, ey);
    const d = `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
    const strokeColor = BARK_PALETTE[Math.min(depth + 1, BARK_PALETTE.length - 1)];
    const strokeWidth = Math.max(1.8, width);

    const drawDuration = 0.11;
    const drawStart = Math.min(0.62, startTime);
    const drawEnd = drawStart + drawDuration;

    branches.push({
      id: `br-${branches.length}`,
      d,
      strokeColor,
      strokeWidth,
      arcLen,
      drawStart,
      drawEnd,
      depth: depth + 1
    });

    // Place volumetric Foliage Masses & Detailed Leaf Clusters along outer branches
    if (depth >= 2) {
      let group = 0;
      if (ey < 190) group = 7;
      else if (ex < 230 && ey < 290) group = 0;
      else if (ex > 370 && ey < 290) group = 1;
      else if (ex < 270 && ey < 380) group = 2;
      else if (ex >= 270 && ex <= 330 && ey < 380) group = 3;
      else if (ex > 330 && ey < 380) group = 4;
      else if (ex < 300) group = 5;
      else group = 6;

      if (depth === 2 || depth === 3) {
        const massRadiusX = 34 + rng() * 26;
        const massRadiusY = 24 + rng() * 18;
        const massColor = LEAF_PALETTE[Math.min(3, Math.floor(rng() * 4))];
        const unfurlStart = 0.40 + (depth / 6) * 0.25 + rng() * 0.06;
        const unfurlEnd = Math.min(0.86, unfurlStart + 0.16);

        foliageMasses.push({
          id: `fmass-${foliageMasses.length}`,
          cx: ex + (rng() - 0.5) * 16,
          cy: ey + (rng() - 0.5) * 14,
          rx: massRadiusX,
          ry: massRadiusY,
          color: massColor,
          group,
          unfurlStart,
          unfurlEnd
        });
      }

      const numLeaves = depth >= 4 ? 4 : 2;
      for (let i = 0; i < numLeaves; i++) {
        const t = 0.20 + rng() * 0.78;
        const lx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * cx + t * t * ex;
        const ly = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * ey;

        const tx = 2 * (1 - t) * (cx - x) + 2 * t * (ex - cx);
        const ty = 2 * (1 - t) * (cy - y) + 2 * t * (ey - cy);
        const baseAngle = Math.atan2(ty, tx);
        const leafAngle = (baseAngle + (rng() - 0.5) * 1.7) * (180 / Math.PI);

        const leafScale = 1.1 + rng() * 0.85;
        const colorIdx = Math.min(LEAF_PALETTE.length - 1, 2 + Math.floor(rng() * (LEAF_PALETTE.length - 2)));
        const color = LEAF_PALETTE[colorIdx];

        const unfurlStart = 0.42 + (depth / 6) * 0.30 + rng() * 0.08;
        const unfurlEnd = Math.min(0.88, unfurlStart + 0.14);

        leaves.push({
          id: `lf-${leaves.length}`,
          x: lx,
          y: ly,
          angle: leafAngle,
          scale: leafScale,
          color,
          group,
          unfurlStart,
          unfurlEnd
        });
      }
    }

    const numChildren = depth === 0 ? 3 : rng() < 0.35 ? 3 : 2;
    const childLen = length * (0.74 + rng() * 0.08);
    const childWid = width * 0.65;
    const spread = 0.54 + rng() * 0.24;
    const verticalAngle = -Math.PI / 2;

    for (let i = 0; i < numChildren; i++) {
      const childAngleOffset = (i - (numChildren - 1) / 2) * spread + (rng() - 0.5) * 0.14;
      let childAngle = angle + childAngleOffset;

      childAngle = childAngle + (verticalAngle - childAngle) * 0.14;

      const nextStart = startTime + 0.07 + rng() * 0.03;
      growBranch(ex, ey, childAngle, childLen, childWid, depth + 1, nextStart);
    }
  }

  // 4 Primary Heavy Structural Boughs
  growBranch(300, 420, -Math.PI * 0.78, 105, 18, 0, 0.18);
  growBranch(300, 420, -Math.PI * 0.62, 115, 19, 0, 0.20);
  growBranch(300, 420, -Math.PI * 0.38, 115, 19, 0, 0.20);
  growBranch(300, 420, -Math.PI * 0.22, 105, 18, 0, 0.18);

  // Subsurface Roots
  const roots = [
    { d: "M 288 568 Q 262 582 230 592", strokeWidth: 6.5, arcLen: 68, drawStart: 0.12, drawEnd: 0.25 },
    { d: "M 294 570 Q 276 588 252 602", strokeWidth: 4.5, arcLen: 52, drawStart: 0.14, drawEnd: 0.25 },
    { d: "M 306 570 Q 324 588 348 602", strokeWidth: 4.5, arcLen: 52, drawStart: 0.14, drawEnd: 0.25 },
    { d: "M 312 568 Q 338 582 370 592", strokeWidth: 6.5, arcLen: 68, drawStart: 0.12, drawEnd: 0.25 }
  ];

  // Ground Grass
  const grass = [];
  for (let i = 0; i < 48; i++) {
    const gx = 85 + (i / 48) * 430 + (rng() - 0.5) * 8;
    const gh = 14 + rng() * 22;
    const lean = (rng() - 0.5) * 16;
    const color = GRASS_PALETTE[Math.floor(rng() * GRASS_PALETTE.length)];
    const sw = 1.6 + rng() * 1.4;

    const d = `M ${gx.toFixed(1)} 574 Q ${(gx + lean * 0.5).toFixed(1)} ${(574 - gh * 0.6).toFixed(1)} ${(gx + lean).toFixed(1)} ${(574 - gh).toFixed(1)}`;
    grass.push({
      id: `gr-${i}`,
      d,
      color,
      strokeWidth: sw
    });
  }

  // Ground Wildflowers
  const groundFlowers = [
    { headX: 195, headY: 552, stemD: "M 195 566 Q 195 560 195 552", color: "#ffffff", scale: 0.95 },
    { headX: 250, headY: 548, stemD: "M 250 562 Q 250 556 250 548", color: "#ffffff", scale: 1.1 },
    { headX: 350, headY: 548, stemD: "M 350 562 Q 350 556 350 548", color: "#ffffff", scale: 1.05 },
    { headX: 405, headY: 551, stemD: "M 405 565 Q 405 558 405 551", color: "#ffffff", scale: 0.9 },
    { headX: 450, headY: 554, stemD: "M 450 568 Q 450 562 450 554", color: "#ffffff", scale: 1.0 },
    { headX: 495, headY: 558, stemD: "M 495 572 Q 495 566 495 558", color: "#ffffff", scale: 0.85 }
  ];

  return {
    branches,
    roots,
    foliageMasses,
    leaves,
    grass,
    groundFlowers
  };
}
