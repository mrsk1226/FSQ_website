import React, { useRef, useEffect, useMemo, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

/**
 * Seeded deterministic RNG: Mulberry32 (Seed 7)
 */
function mulberry32(seed = 7) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BARK_PALETTE = [
  "#2c1b10", // Deepest trunk base
  "#3a2416",
  "#4a3220",
  "#5b3f2a",
  "#6e4f37",
  "#80604a",
  "#8f7058"
];

const LEAF_PALETTE = [
  "#092612", // Deep shadow rear foliage
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

/**
 * Generates an established, majestic mature botanical tree with:
 * - Thick, sculpted, grounded trunk with natural root flares
 * - Heavy primary scaffold boughs and balanced secondary branching
 * - Rich layered foliage masses + high-density detailed leaf clusters
 * - Static grass and wildflowers
 */
function generateTreeData(seed = 7) {
  const rng = mulberry32(seed);

  const branches = [];
  const foliageMasses = [];
  const leaves = [];

  // Helper for arc length estimation
  function calcArcLen(x1, y1, cx, cy, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const chord = Math.hypot(dx, dy);
    const dcp = Math.hypot(cx - (x1 + x2) / 2, cy - (y1 + y2) / 2);
    return chord + (8 / 3) * (dcp * dcp) / (chord || 1);
  }

  // 1. TRUNK & STRUCTURAL SCAFFOLD BOUGHS (Strong, mature hierarchy)
  // Main Trunk: Base (300, 570) -> Crotch (300, 420)
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

  // Trunk Bark Shading & Contour Lines for wood realism
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
    if (depth > 5 || length < 8) return;

    const bend = (rng() - 0.5) * 0.30;
    const midAngle = angle + bend;
    const cx = x + Math.cos(midAngle) * (length * 0.54);
    const cy = y + Math.sin(midAngle) * (length * 0.54);

    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;

    // Enforce botanical crown envelope bounds: strictly keep canopy cohesive within x: 70..530, y >= 80
    if (ey < 80 || ex < 70 || ex > 530) {
      return;
    }

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

    // Place volumetric Foliage Masses & Detailed Leaf Clusters along outer branches (depth 2 to 5)
    if (depth >= 2) {
      // 8 spatial canopy sway groups
      let group = 0;
      if (ey < 190) group = 7; // Crown
      else if (ex < 230 && ey < 290) group = 0; // Back Left
      else if (ex > 370 && ey < 290) group = 1; // Back Right
      else if (ex < 270 && ey < 380) group = 2; // Mid Left
      else if (ex >= 270 && ex <= 330 && ey < 380) group = 3; // Mid Center
      else if (ex > 330 && ey < 380) group = 4; // Mid Right
      else if (ex < 300) group = 5; // Front Left
      else group = 6; // Front Right

      // Background volumetric foliage cloud mass for depth 2..4 ensuring full backdrop behind all leaves
      if (depth >= 2 && depth <= 4) {
        const massRadiusX = 28 + rng() * 24;
        const massRadiusY = 20 + rng() * 18;
        const massColor = LEAF_PALETTE[Math.min(3, Math.floor(rng() * 4))];
        const unfurlStart = 0.40 + (depth / 6) * 0.25 + rng() * 0.06;
        const unfurlEnd = Math.min(0.86, unfurlStart + 0.16);

        foliageMasses.push({
          id: `fmass-${foliageMasses.length}`,
          cx: ex + (rng() - 0.5) * 12,
          cy: ey + (rng() - 0.5) * 10,
          rx: massRadiusX,
          ry: massRadiusY,
          color: massColor,
          group,
          unfurlStart,
          unfurlEnd
        });
      }

      // Crisp detailed leaf shapes strictly placed along branch within crown boundaries
      const numLeaves = depth >= 4 ? 3 : 2;
      for (let i = 0; i < numLeaves; i++) {
        const t = 0.25 + rng() * 0.70;
        const lx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * cx + t * t * ex;
        const ly = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * cy + t * t * ey;

        // Skip any leaf that lies outside the natural canopy envelope
        if (ly < 75 || lx < 65 || lx > 535) continue;

        const tx = 2 * (1 - t) * (cx - x) + 2 * t * (ex - cx);
        const ty = 2 * (1 - t) * (cy - y) + 2 * t * (ey - cy);
        const baseAngle = Math.atan2(ty, tx);
        const leafAngle = (baseAngle + (rng() - 0.5) * 1.5) * (180 / Math.PI);

        const leafScale = 1.05 + rng() * 0.75;
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

    // Children branching with gentle phototropism
    const numChildren = depth === 0 ? 3 : rng() < 0.35 ? 3 : 2;
    const childLen = length * (0.72 + rng() * 0.08);
    const childWid = width * 0.65;
    const spread = 0.52 + rng() * 0.22;
    const verticalAngle = -Math.PI / 2;

    for (let i = 0; i < numChildren; i++) {
      const childAngleOffset = (i - (numChildren - 1) / 2) * spread + (rng() - 0.5) * 0.12;
      let childAngle = angle + childAngleOffset;

      // Gentle phototropism pull toward vertical
      childAngle = childAngle + (verticalAngle - childAngle) * 0.10;

      const nextStart = startTime + 0.07 + rng() * 0.03;
      growBranch(ex, ey, childAngle, childLen, childWid, depth + 1, nextStart);
    }
  }

  // 4 Primary Heavy Structural Boughs branching from trunk crotch (300, 420)
  // 1. Lower Left Bough
  growBranch(300, 420, -Math.PI * 0.78, 105, 18, 0, 0.18);
  // 2. Upper Left Bough
  growBranch(300, 420, -Math.PI * 0.62, 115, 19, 0, 0.20);
  // 3. Upper Right Bough
  growBranch(300, 420, -Math.PI * 0.38, 115, 19, 0, 0.20);
  // 4. Lower Right Bough
  growBranch(300, 420, -Math.PI * 0.22, 105, 18, 0, 0.18);

  // Subsurface Roots (Only during early root development phase s: 0.12-0.25, strictly below soil)
  const roots = [
    { d: "M 288 568 Q 262 582 230 592", strokeWidth: 6.5, arcLen: 68, drawStart: 0.12, drawEnd: 0.25 },
    { d: "M 294 570 Q 276 588 252 602", strokeWidth: 4.5, arcLen: 52, drawStart: 0.14, drawEnd: 0.25 },
    { d: "M 306 570 Q 324 588 348 602", strokeWidth: 4.5, arcLen: 52, drawStart: 0.14, drawEnd: 0.25 },
    { d: "M 312 568 Q 338 582 370 592", strokeWidth: 6.5, arcLen: 68, drawStart: 0.12, drawEnd: 0.25 }
  ];

  // Ground Grass Tufts (Static, firmly rooted on mound top surface)
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

  // Ground Wildflowers (6 static 5-petal flowers rooted around grass)
  const flowers = [
    { x: 195, y: 566, scale: 0.95 },
    { x: 250, y: 562, scale: 1.1 },
    { x: 350, y: 562, scale: 1.05 },
    { x: 405, y: 565, scale: 0.9 },
    { x: 450, y: 568, scale: 1.0 },
    { x: 495, y: 572, scale: 0.85 }
  ];

  return {
    branches,
    roots,
    foliageMasses,
    leaves,
    grass,
    flowers
  };
}

const CHAPTERS = [
  {
    id: "chapter-1",
    title: "The Seed of Change",
    body: "Every great journey begins with a single step. At Four Square, we planted the seed of sustainability from day one — believing that beautiful living spaces and a healthy planet go hand in hand."
  },
  {
    id: "chapter-2",
    title: "Roots of Commitment",
    body: "Our roots run deep in eco-conscious manufacturing. We source materials responsibly and implement responsible processes that nurture the environment while creating premium products."
  },
  {
    id: "chapter-3",
    title: "Growing Together",
    body: "Like a sapling reaching for sunlight, our green initiatives have grown stronger each year. We've planted over 1,500 trees and reduced our carbon footprint by 45% through innovative practices."
  },
  {
    id: "chapter-4",
    title: "Branches of Impact",
    body: "Our impact extends beyond our factory walls. We support greener choices and energy-efficient solutions that help create more responsible living spaces."
  },
  {
    id: "chapter-5",
    title: "Sustainably Designed for Tomorrow",
    body: "What started as one seed has grown into a wider commitment to responsible growth. Our vision is a future where better homes, durable products and greener choices grow together."
  }
];

export const GreenTreeSection = () => {
  const sectionRef = useRef(null);

  // SVG group and element refs for 60fps direct DOM manipulation (no React re-render loops)
  const sproutRef = useRef(null);
  const rootsGroupRef = useRef(null);
  const branchesGroupRef = useRef(null);
  const foliageMassesGroupRef = useRef(null);
  const leavesGroupRef = useRef(null);
  const grassGroupRef = useRef(null);
  const flowersGroupRef = useRef(null);
  const fallingLeavesGroupRef = useRef(null);

  // Chapter DOM refs
  const chapterRefs = useRef([]);

  // Live Stats Counter refs
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const statsStartedRef = useRef(false);

  // Memoized deterministic tree model
  const treeData = useMemo(() => generateTreeData(7), []);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Framer Motion useScroll pinned over 420vh runway
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring progression: stiffness 90, damping 24, mass 0.4
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const mediaHandler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", mediaHandler);

    return () => mediaQuery.removeEventListener("change", mediaHandler);
  }, []);

  // Stats Count-Up Function (Triggered once upon entering section s > 0.01)
  const startStatsCountUp = () => {
    if (statsStartedRef.current) return;
    statsStartedRef.current = true;

    const startTime = performance.now();
    const duration = 2000;

    const animateStats = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Easing: easeOutCubic
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const treesVal = Math.floor(easeOut * 1500);
      const carbonVal = Math.floor(easeOut * 45);
      const materialsVal = Math.floor(easeOut * 100);

      if (stat1Ref.current) stat1Ref.current.textContent = `${treesVal.toLocaleString()}+`;
      if (stat2Ref.current) stat2Ref.current.textContent = `${carbonVal}%`;
      if (stat3Ref.current) stat3Ref.current.textContent = `${materialsVal}%`;

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      } else {
        if (stat1Ref.current) stat1Ref.current.textContent = "1,500+";
        if (stat2Ref.current) stat2Ref.current.textContent = "45%";
        if (stat3Ref.current) stat3Ref.current.textContent = "100%";
      }
    };

    requestAnimationFrame(animateStats);
  };

  // Direct High-Performance DOM/SVG Timeline Mutation on Scroll Progress
  useEffect(() => {
    if (prefersReducedMotion) {
      // Direct full mature state display for reduced motion
      if (sproutRef.current) sproutRef.current.style.display = "none";
      if (rootsGroupRef.current) rootsGroupRef.current.style.display = "none";
      if (branchesGroupRef.current) {
        const paths = branchesGroupRef.current.querySelectorAll("path");
        paths.forEach((p) => {
          p.style.strokeDashoffset = "0";
        });
      }
      if (foliageMassesGroupRef.current) {
        const masses = foliageMassesGroupRef.current.querySelectorAll(".foliage-mass-cloud");
        masses.forEach((m) => {
          m.style.opacity = "0.92";
          m.style.transform = "scale(1)";
        });
      }
      if (leavesGroupRef.current) {
        const leafEls = leavesGroupRef.current.querySelectorAll(".leaf-shape");
        leafEls.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
        });
      }
      if (grassGroupRef.current) grassGroupRef.current.style.opacity = "1";
      if (flowersGroupRef.current) flowersGroupRef.current.style.opacity = "1";
      if (fallingLeavesGroupRef.current) {
        fallingLeavesGroupRef.current.style.display = "none";
        fallingLeavesGroupRef.current.classList.remove("is-active");
        fallingLeavesGroupRef.current.style.opacity = "0";
      }
      startStatsCountUp();
      return;
    }

    const unsubscribe = smoothProgress.on("change", (s) => {
      // 1. Trigger Stats Count-Up
      if (s > 0.01 && !statsStartedRef.current) {
        startStatsCountUp();
      }

      // 2. Chapter Transitions (0.00-0.20 -> 0, 0.20-0.40 -> 1, 0.40-0.60 -> 2, 0.60-0.80 -> 3, >=0.80 -> 4)
      let activeChapterIdx = 0;
      if (s >= 0.8) activeChapterIdx = 4;
      else if (s >= 0.6) activeChapterIdx = 3;
      else if (s >= 0.4) activeChapterIdx = 2;
      else if (s >= 0.2) activeChapterIdx = 1;
      else activeChapterIdx = 0;

      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeChapterIdx) {
          el.classList.add("is-active");
        } else {
          el.classList.remove("is-active");
        }
      });

      // 3. Sprout Shoot (s: 0.00 -> 0.12)
      if (sproutRef.current) {
        if (s <= 0.12) {
          const sproutOpacity = Math.max(0, 1 - s / 0.12);
          sproutRef.current.style.opacity = sproutOpacity.toString();
          sproutRef.current.style.display = "block";
        } else {
          sproutRef.current.style.display = "none";
        }
      }

      // 4. Subsurface Roots (s: 0.12 -> 0.25, strictly below ground)
      if (rootsGroupRef.current) {
        if (s < 0.12) {
          rootsGroupRef.current.style.opacity = "0";
        } else if (s <= 0.35) {
          const rootPaths = rootsGroupRef.current.querySelectorAll("path");
          treeData.roots.forEach((rt, i) => {
            const p = rootPaths[i];
            if (!p) return;
            if (s < rt.drawStart) {
              p.style.strokeDashoffset = rt.arcLen.toString();
            } else if (s > rt.drawEnd) {
              p.style.strokeDashoffset = "0";
            } else {
              const k = (s - rt.drawStart) / (rt.drawEnd - rt.drawStart);
              p.style.strokeDashoffset = ((1 - k) * rt.arcLen).toString();
            }
          });
          rootsGroupRef.current.style.opacity = "1";
        } else {
          // Fade roots away before mature tree so zero exposed root lines exist
          rootsGroupRef.current.style.opacity = "0";
        }
      }

      // 5. Procedural Trunk & Branch Growth (s: 0.00 -> 0.72)
      if (branchesGroupRef.current) {
        const branchPaths = branchesGroupRef.current.querySelectorAll("path");
        treeData.branches.forEach((br, i) => {
          const p = branchPaths[i];
          if (!p) return;
          if (s < br.drawStart) {
            p.style.strokeDashoffset = br.arcLen.toString();
          } else if (s > br.drawEnd) {
            p.style.strokeDashoffset = "0";
          } else {
            const k = (s - br.drawStart) / (br.drawEnd - br.drawStart);
            const easedK = 1 - Math.pow(1 - k, 2);
            p.style.strokeDashoffset = ((1 - easedK) * br.arcLen).toString();
          }
        });
      }

      // 6. Volumetric Canopy Foliage Masses (s: 0.40 -> 0.85)
      if (foliageMassesGroupRef.current) {
        const massEls = foliageMassesGroupRef.current.querySelectorAll(".foliage-mass-cloud");
        treeData.foliageMasses.forEach((fm, i) => {
          const el = massEls[i];
          if (!el) return;
          if (s < fm.unfurlStart) {
            el.style.opacity = "0";
            el.style.transform = `scale(0)`;
          } else if (s >= fm.unfurlEnd) {
            el.style.opacity = "0.92";
            el.style.transform = `scale(1)`;
          } else {
            const k = (s - fm.unfurlStart) / (fm.unfurlEnd - fm.unfurlStart);
            const eased = 1 - Math.pow(1 - k, 2);
            el.style.opacity = (k * 0.92).toString();
            el.style.transform = `scale(${eased})`;
          }
        });
      }

      // 7. Leaves Unfurling Across Foliage Groups (s: 0.42 -> 0.88)
      if (leavesGroupRef.current) {
        const leafGroups = leavesGroupRef.current.querySelectorAll(".leaf-shape");
        treeData.leaves.forEach((lf, i) => {
          const g = leafGroups[i];
          if (!g) return;
          if (s < lf.unfurlStart) {
            g.style.opacity = "0";
            g.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(0)`;
          } else if (s >= lf.unfurlEnd) {
            g.style.opacity = "0.98";
            g.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(${lf.scale})`;
          } else {
            const k = (s - lf.unfurlStart) / (lf.unfurlEnd - lf.unfurlStart);
            const easedK = 1 - Math.pow(1 - k, 2);
            g.style.opacity = (k * 0.98).toString();
            g.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(${lf.scale * easedK})`;
          }
        });
      }

      // 8. Grass Growth (s: 0.35 -> 0.65)
      if (grassGroupRef.current) {
        if (s < 0.35) {
          grassGroupRef.current.style.opacity = "0";
          grassGroupRef.current.style.transform = "scale(1, 0)";
        } else if (s >= 0.65) {
          grassGroupRef.current.style.opacity = "1";
          grassGroupRef.current.style.transform = "scale(1, 1)";
        } else {
          const k = (s - 0.35) / 0.30;
          const eased = 1 - Math.pow(1 - k, 3);
          grassGroupRef.current.style.opacity = k.toString();
          grassGroupRef.current.style.transform = `scale(1, ${eased})`;
        }
      }

      // 9. Ground Flowers Bloom (s: 0.60 -> 0.85)
      if (flowersGroupRef.current) {
        if (s < 0.60) {
          flowersGroupRef.current.style.opacity = "0";
        } else if (s >= 0.85) {
          flowersGroupRef.current.style.opacity = "1";
        } else {
          const k = (s - 0.60) / 0.25;
          flowersGroupRef.current.style.opacity = k.toString();
        }
      }

      // 10. Detached Falling Leaves (Strictly at s >= 0.92 after mature tree completion)
      if (fallingLeavesGroupRef.current) {
        if (s < 0.92) {
          // Immediately stop, hide, and reset when scrolling backward below 0.92
          fallingLeavesGroupRef.current.style.display = "none";
          fallingLeavesGroupRef.current.classList.remove("is-active");
          fallingLeavesGroupRef.current.style.opacity = "0";
        } else {
          // Start naturally from canopy at >= 0.92
          fallingLeavesGroupRef.current.style.display = "block";
          if (!fallingLeavesGroupRef.current.classList.contains("is-active")) {
            fallingLeavesGroupRef.current.classList.add("is-active");
          }
          const leafFade = Math.min(1, (s - 0.92) / 0.03);
          fallingLeavesGroupRef.current.style.opacity = leafFade.toString();
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion, treeData]);

  return (
    <section
      ref={sectionRef}
      className="green-tree-section"
      aria-label="Sustainability and Green Energy"
    >
      <div className="green-tree-sticky-frame">
        {/* Subtle warm sun glow behind upper right canopy */}
        <div className="green-tree-sun-glow" />

        <div className="green-tree-grid">
          {/* ============================================================
              LEFT CONTENT PANEL (Fixed editorial story structure)
              ============================================================ */}
          <div className="green-tree-left-panel">
            <span className="green-tree-eyebrow">
              Sustainability &amp; Green Energy
            </span>

            <div className="green-tree-chapters-stack">
              {CHAPTERS.map((ch, idx) => (
                <article
                  key={ch.id}
                  ref={(el) => (chapterRefs.current[idx] = el)}
                  className={`green-tree-chapter ${
                    idx === 0 || prefersReducedMotion ? "is-active" : ""
                  }`}
                  style={{
                    opacity: prefersReducedMotion ? (idx === 4 ? 1 : 0) : idx === 0 ? 1 : 0,
                    transform: "translateY(0)"
                  }}
                >
                  <h2 className="green-tree-chapter-title">
                    {idx === 4 ? "Sustainably Designed for Tomorrow" : ch.title}
                  </h2>
                  <p className="green-tree-chapter-body">{ch.body}</p>
                </article>
              ))}
            </div>

            <div className="green-tree-stats-row">
              <div className="green-tree-stat-card">
                <span ref={stat1Ref} className="green-tree-stat-val">
                  1,500+
                </span>
                <span className="green-tree-stat-label">Trees Planted</span>
              </div>
              <div className="green-tree-stat-card">
                <span ref={stat2Ref} className="green-tree-stat-val">
                  45%
                </span>
                <span className="green-tree-stat-label">Carbon Reduced</span>
              </div>
              <div className="green-tree-stat-card">
                <span ref={stat3Ref} className="green-tree-stat-val">
                  100%
                </span>
                <span className="green-tree-stat-label">Eco Materials</span>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT VISUAL SCENE: MAJESTIC MATURE BOTANICAL GREEN TREE
              ============================================================ */}
          <div className="green-tree-right-visual">
            <svg
              className="green-tree-svg"
              viewBox="0 0 600 600"
              aria-hidden="true"
            >
              <defs>
                {/* Natural Ground Mound Gradient */}
                <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a4d28" />
                  <stop offset="45%" stopColor="#133d20" />
                  <stop offset="100%" stopColor="#0a2312" />
                </linearGradient>

                {/* Mound Top Highlight Ring */}
                <linearGradient id="moundTopGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(74, 222, 128, 0.0)" />
                  <stop offset="50%" stopColor="rgba(74, 222, 128, 0.28)" />
                  <stop offset="100%" stopColor="rgba(74, 222, 128, 0.0)" />
                </linearGradient>

                {/* Wildflower Symbol (5-petal white wildflower, yellow center) */}
                <g id="gtWildflower">
                  <path d="M 0 0 Q 0 -6 0 -14" stroke="#2e7d32" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  <g transform="translate(0, -14)">
                    <circle cx="-3" cy="-2.5" r="2.4" fill="#ffffff" />
                    <circle cx="3" cy="-2.5" r="2.4" fill="#ffffff" />
                    <circle cx="-3.5" cy="2" r="2.4" fill="#ffffff" />
                    <circle cx="3.5" cy="2" r="2.4" fill="#ffffff" />
                    <circle cx="0" cy="4" r="2.4" fill="#ffffff" />
                    <circle cx="0" cy="0" r="2" fill="#fbbf24" />
                  </g>
                </g>

                {/* Leaf Shape Definition */}
                <path
                  id="gtLeafCluster"
                  d="M 0 0 C -6 -10, -8 -20, 0 -28 C 8 -20, 6 -10, 0 0 Z"
                />
              </defs>

              {/* 1. Ground Mound (Layered green elliptical base) */}
              <ellipse cx="300" cy="578" rx="245" ry="22" fill="url(#groundGrad)" />
              <ellipse cx="300" cy="568" rx="215" ry="10" fill="url(#moundTopGlow)" />

              {/* 2. Subsurface Roots (Only active during early root growth s: 0.12-0.25) */}
              <g ref={rootsGroupRef} id="roots" style={{ opacity: 0 }}>
                {treeData.roots.map((rt, i) => (
                  <path
                    key={`root-${i}`}
                    d={rt.d}
                    stroke="#3a2416"
                    strokeWidth={rt.strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: rt.arcLen,
                      strokeDashoffset: rt.arcLen
                    }}
                  />
                ))}
              </g>

              {/* 3. Sprout / Seed Shoot (Early Stage) */}
              <g ref={sproutRef} id="sprout-shoot" transform="translate(300, 566)">
                <path
                  d="M 0 0 Q -6 -18 -16 -24 Q -6 -20 0 -12 Q 6 -20 16 -24 Q 6 -18 0 0"
                  fill="#4ade80"
                />
              </g>

              {/* 4. Volumetric Background Foliage Masses (Nested in 8 canopy sway groups) */}
              <g ref={foliageMassesGroupRef} id="canopy-masses">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((groupNum) => (
                  <g key={`mass-group-${groupNum}`} className={`canopy-sway-${groupNum}`}>
                    {treeData.foliageMasses
                      .filter((fm) => fm.group === groupNum)
                      .map((fm) => (
                        <ellipse
                          key={fm.id}
                          className="foliage-mass-cloud"
                          cx={fm.cx}
                          cy={fm.cy}
                          rx={fm.rx}
                          ry={fm.ry}
                          fill={fm.color}
                          style={{
                            opacity: prefersReducedMotion ? 0.92 : 0,
                            transformOrigin: `${fm.cx}px ${fm.cy}px`
                          }}
                        />
                      ))}
                  </g>
                ))}
              </g>

              {/* 5. Structural Trunk & Branch Skeleton (100% STATIC during breeze) */}
              <g ref={branchesGroupRef} id="branches">
                {treeData.branches.map((br) => (
                  <path
                    key={br.id}
                    d={br.d}
                    stroke={br.strokeColor}
                    strokeWidth={br.strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: br.arcLen,
                      strokeDashoffset: prefersReducedMotion ? 0 : br.arcLen
                    }}
                  />
                ))}
              </g>

              {/* 6. 8 Independent Canopy Detailed Leaf Groups (Micro-breeze only on leaves) */}
              <g ref={leavesGroupRef} id="canopy-leaves">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((groupNum) => (
                  <g key={`leaf-group-${groupNum}`} className={`canopy-sway-${groupNum}`}>
                    {treeData.leaves
                      .filter((l) => l.group === groupNum)
                      .map((l) => (
                        <g
                          key={l.id}
                          className="leaf-shape"
                          style={{
                            opacity: prefersReducedMotion ? 0.98 : 0,
                            transform: `translate(${l.x}px, ${l.y}px) rotate(${l.angle}deg) scale(${prefersReducedMotion ? l.scale : 0})`
                          }}
                        >
                          <use href="#gtLeafCluster" fill={l.color} />
                        </g>
                      ))}
                  </g>
                ))}
              </g>

              {/* 7. Static Ground Grass Tufts (Firmly grounded on mound) */}
              <g ref={grassGroupRef} id="ground-grass" style={{ opacity: prefersReducedMotion ? 1 : 0, transformOrigin: "300px 574px" }}>
                {treeData.grass.map((gr) => (
                  <path
                    key={gr.id}
                    d={gr.d}
                    stroke={gr.color}
                    strokeWidth={gr.strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* 8. Static 5-Petal Botanical Wildflowers (Firmly rooted in grass) */}
              <g ref={flowersGroupRef} id="ground-flowers" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
                {treeData.flowers.map((fl, i) => (
                  <g key={`fl-${i}`} transform={`translate(${fl.x}, ${fl.y}) scale(${fl.scale})`}>
                    <use href="#gtWildflower" />
                  </g>
                ))}
              </g>

              {/* 9. Detached Falling Leaves (4 slow drifting leaves from canopy only when mature s >= 0.92) */}
              <g ref={fallingLeavesGroupRef} className="drifting-leaves-layer" style={{ display: "none", opacity: 0 }}>
                <g className="leaf-fall-1">
                  <path d="M 0 0 C 4 -6 12 -5 16 0 C 12 5 4 6 0 0 Z" fill="#66bb6a" />
                </g>
                <g className="leaf-fall-2">
                  <path d="M 0 0 C -4 -6 -12 -5 -16 0 C -12 5 -4 6 0 0 Z" fill="#81c784" />
                </g>
                <g className="leaf-fall-3">
                  <path d="M 0 0 C 3 -5 10 -4 14 0 C 10 4 3 5 0 0 Z" fill="#4ade80" />
                </g>
                <g className="leaf-fall-4">
                  <path d="M 0 0 C -3 -5 -10 -4 -14 0 C -10 4 -3 5 0 0 Z" fill="#86efac" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .green-tree-section {
          position: relative;
          height: 420vh;
          background: #071a12;
          color: #ffffff;
        }

        .green-tree-sticky-frame {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 70% 45%, #245f3b 0%, #14532d 38%, #0b2a1c 72%, #071a12 100%);
        }

        .green-tree-sun-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(254, 249, 195, 0.28) 0%, rgba(134, 239, 172, 0.12) 45%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        .green-tree-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 3.5rem;
          align-items: center;
          width: 100%;
          max-width: 1280px;
          padding: 0 2rem;
          margin: 0 auto;
        }

        .green-tree-left-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .green-tree-eyebrow {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(85, 199, 119, 0.15);
          border: 1px solid rgba(74, 222, 128, 0.4);
          color: #bbf7d0;
          font-family: "Inter", sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          width: fit-content;
          margin-bottom: 24px;
        }

        .green-tree-chapters-stack {
          position: relative;
          min-height: 200px;
          margin-bottom: 28px;
        }

        .green-tree-chapter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .green-tree-chapter.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .green-tree-chapter-title {
          font-family: "Poppins", sans-serif;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 600;
          line-height: 1.25;
          margin: 0 0 14px 0;
          color: #ffffff;
        }

        .green-tree-chapter-body {
          font-family: "Poppins", sans-serif;
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
          max-width: 520px;
        }

        .green-tree-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          max-width: 540px;
        }

        .green-tree-stat-val {
          display: block;
          font-family: "Poppins", sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #7ce8a0;
          margin-bottom: 4px;
        }

        .green-tree-stat-label {
          display: block;
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .green-tree-right-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 600px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        .green-tree-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.5));
        }

        /* Scope fill:none exclusively to branches and roots */
        #branches path,
        #roots path {
          fill: none !important;
        }

        /* 8 Independent Canopy Breeze Groups */
        @keyframes canopySway0 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(-0.8deg) translate(-1.2px, -1px); }
        }
        .canopy-sway-0 {
          animation: canopySway0 7.8s ease-in-out infinite;
          transform-origin: 220px 240px;
        }

        @keyframes canopySway1 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(0.7deg) translate(1.4px, -1.2px); }
        }
        .canopy-sway-1 {
          animation: canopySway1 8.6s ease-in-out infinite;
          transform-origin: 380px 240px;
        }

        @keyframes canopySway2 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(-0.9deg) translate(-1.0px, -0.8px); }
        }
        .canopy-sway-2 {
          animation: canopySway2 6.9s ease-in-out infinite;
          transform-origin: 250px 320px;
        }

        @keyframes canopySway3 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(0.5deg) translate(0px, -1.5px); }
        }
        .canopy-sway-3 {
          animation: canopySway3 9.2s ease-in-out infinite;
          transform-origin: 300px 300px;
        }

        @keyframes canopySway4 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(0.8deg) translate(1.2px, -1px); }
        }
        .canopy-sway-4 {
          animation: canopySway4 7.4s ease-in-out infinite;
          transform-origin: 350px 320px;
        }

        @keyframes canopySway5 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(-0.7deg) translate(-1px, -1.2px); }
        }
        .canopy-sway-5 {
          animation: canopySway5 8.2s ease-in-out infinite;
          transform-origin: 270px 360px;
        }

        @keyframes canopySway6 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(0.7deg) translate(1.1px, -1.1px); }
        }
        .canopy-sway-6 {
          animation: canopySway6 8.9s ease-in-out infinite;
          transform-origin: 330px 360px;
        }

        @keyframes canopySway7 {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(0.6deg) translate(0.5px, -1.6px); }
        }
        .canopy-sway-7 {
          animation: canopySway7 6.6s ease-in-out infinite;
          transform-origin: 300px 140px;
        }

        /* Detached Falling Leaves (Only active when .is-active is added at s >= 0.92) */
        .drifting-leaves-layer {
          display: none;
          opacity: 0;
          pointer-events: none;
        }

        .drifting-leaves-layer.is-active {
          display: block;
        }

        .leaf-fall-1,
        .leaf-fall-2,
        .leaf-fall-3,
        .leaf-fall-4 {
          opacity: 0;
        }

        @keyframes leafDrift1 {
          0% { transform: translate(220px, 180px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.9; }
          50% { transform: translate(190px, 360px) rotate(140deg); opacity: 0.75; }
          85% { opacity: 0.5; }
          100% { transform: translate(240px, 560px) rotate(280deg); opacity: 0; }
        }
        @keyframes leafDrift2 {
          0% { transform: translate(380px, 170px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.85; }
          50% { transform: translate(410px, 350px) rotate(-160deg); opacity: 0.7; }
          85% { opacity: 0.45; }
          100% { transform: translate(360px, 560px) rotate(-310deg); opacity: 0; }
        }
        @keyframes leafDrift3 {
          0% { transform: translate(300px, 140px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.9; }
          50% { transform: translate(280px, 330px) rotate(180deg); opacity: 0.75; }
          80% { opacity: 0.5; }
          100% { transform: translate(320px, 555px) rotate(360deg); opacity: 0; }
        }
        @keyframes leafDrift4 {
          0% { transform: translate(340px, 220px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.85; }
          50% { transform: translate(370px, 380px) rotate(150deg); opacity: 0.7; }
          85% { opacity: 0.45; }
          100% { transform: translate(330px, 560px) rotate(290deg); opacity: 0; }
        }

        .drifting-leaves-layer.is-active .leaf-fall-1 { animation: leafDrift1 9s cubic-bezier(0.4, 0, 0.6, 1) infinite both; }
        .drifting-leaves-layer.is-active .leaf-fall-2 { animation: leafDrift2 11s cubic-bezier(0.4, 0, 0.6, 1) infinite both; animation-delay: 2.2s; }
        .drifting-leaves-layer.is-active .leaf-fall-3 { animation: leafDrift3 13s cubic-bezier(0.4, 0, 0.6, 1) infinite both; animation-delay: 4.8s; }
        .drifting-leaves-layer.is-active .leaf-fall-4 { animation: leafDrift4 14s cubic-bezier(0.4, 0, 0.6, 1) infinite both; animation-delay: 7.2s; }

        @media (max-width: 992px) {
          .green-tree-section {
            height: 300vh;
          }
          .green-tree-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
            padding: 2rem 1.5rem;
          }
          .green-tree-left-panel {
            align-items: center;
          }
          .green-tree-eyebrow {
            margin-left: auto;
            margin-right: auto;
          }
          .green-tree-chapter-body {
            margin-left: auto;
            margin-right: auto;
          }
          .green-tree-stats-row {
            margin: 0 auto;
          }
          .green-tree-right-visual {
            max-width: 360px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .green-tree-section {
            height: auto;
          }
          .green-tree-sticky-frame {
            position: relative;
            height: auto;
            padding: 80px 0;
          }
          .canopy-sway-0,
          .canopy-sway-1,
          .canopy-sway-2,
          .canopy-sway-3,
          .canopy-sway-4,
          .canopy-sway-5,
          .canopy-sway-6,
          .canopy-sway-7,
          .leaf-fall-1,
          .leaf-fall-2,
          .leaf-fall-3,
          .leaf-fall-4 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export const EcoTreeSection = GreenTreeSection;
export default GreenTreeSection;
