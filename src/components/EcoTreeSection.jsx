import React, { useRef, useEffect, useMemo, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { generateTreeData } from "./treeGenerator.js";
import "./ecoTree.css";

const CHAPTERS = [
  {
    id: "seed",
    title: "The Seed of Change",
    body: "Every great journey begins with a single step. At Four Square, we planted the seed of sustainability from day one — believing that beautiful living spaces and a healthy planet go hand in hand."
  },
  {
    id: "roots",
    title: "Roots of Commitment",
    body: "Our roots run deep in eco-conscious manufacturing. We source materials responsibly and implement responsible processes that nurture the environment while creating premium products."
  },
  {
    id: "growing",
    title: "Growing Together",
    body: "Like a sapling reaching for sunlight, our green initiatives have grown stronger each year. We've planted over 1,500 trees and reduced our carbon footprint by 45% through innovative practices."
  },
  {
    id: "branches",
    title: "Branches of Impact",
    body: "Our impact extends beyond our factory walls. We support greener choices and energy-efficient solutions that help create more responsible living spaces."
  },
  {
    id: "forest",
    title: "Sustainably Designed for Tomorrow",
    body: "What started as one seed has grown into a wider commitment to responsible growth. Our vision is a future where better homes, durable products and greener choices grow together."
  }
];

export const EcoTreeSection = () => {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  const sproutRef = useRef(null);
  const rootsGroupRef = useRef(null);
  const branchesGroupRef = useRef(null);
  const foliageMassesGroupRef = useRef(null);
  const leavesGroupRef = useRef(null);
  const grassGroupRef = useRef(null);
  const groundFlowersGroupRef = useRef(null);

  const chapterRefs = useRef([]);

  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const statsStartedRef = useRef(false);

  const treeData = useMemo(() => generateTreeData(7), []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

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

  const startStatsCountUp = () => {
    if (statsStartedRef.current) return;
    statsStartedRef.current = true;

    const startTime = performance.now();
    const duration = 2000;

    const animateStats = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
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

  useEffect(() => {
    if (prefersReducedMotion) {
      if (sproutRef.current) sproutRef.current.style.display = "none";
      if (rootsGroupRef.current) rootsGroupRef.current.style.display = "none";
      if (branchesGroupRef.current) {
        const paths = branchesGroupRef.current.querySelectorAll("path");
        paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      }
      if (foliageMassesGroupRef.current) {
        const masses = foliageMassesGroupRef.current.querySelectorAll(".foliage-mass-cloud");
        masses.forEach((m) => {
          m.style.opacity = "0.92";
          m.style.transform = "scale(1)";
        });
      }
      if (leavesGroupRef.current) {
        const leafEls = leavesGroupRef.current.querySelectorAll(".tree-leaf-item");
        leafEls.forEach((el) => {
          el.style.opacity = "0.98";
          el.style.transform = "scale(1)";
        });
      }
      if (grassGroupRef.current) grassGroupRef.current.style.opacity = "1";
      if (groundFlowersGroupRef.current) groundFlowersGroupRef.current.style.opacity = "1";
      startStatsCountUp();
      return;
    }

    const unsubscribe = smoothProgress.on("change", (s) => {
      if (s > 0.01 && !statsStartedRef.current) {
        startStatsCountUp();
      }

      let activeIdx = 0;
      if (s < 0.20) activeIdx = 0;
      else if (s < 0.40) activeIdx = 1;
      else if (s < 0.60) activeIdx = 2;
      else if (s < 0.80) activeIdx = 3;
      else activeIdx = 4;

      chapterRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeIdx) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
          el.classList.add("active");
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(16px)";
          el.classList.remove("active");
        }
      });

      // Sprout Shoot (s: 0.00 -> 0.15)
      if (sproutRef.current) {
        if (s <= 0.12) {
          const sproutOpacity = Math.max(0, 1 - s / 0.12);
          sproutRef.current.style.opacity = sproutOpacity.toString();
          sproutRef.current.style.display = "block";
        } else {
          sproutRef.current.style.display = "none";
        }
      }

      // Subsurface Roots (s: 0.12 -> 0.25)
      if (rootsGroupRef.current) {
        const rootPaths = rootsGroupRef.current.querySelectorAll("path");
        if (s < 0.10) {
          rootsGroupRef.current.style.opacity = "0";
        } else if (s <= 0.30) {
          rootsGroupRef.current.style.opacity = "1";
          rootPaths.forEach((path, i) => {
            const root = treeData.roots[i];
            if (!root) return;
            if (s < root.drawStart) {
              path.style.strokeDashoffset = `${root.arcLen}`;
            } else if (s >= root.drawEnd) {
              path.style.strokeDashoffset = "0";
            } else {
              const p = (s - root.drawStart) / (root.drawEnd - root.drawStart);
              path.style.strokeDashoffset = `${root.arcLen * (1 - p)}`;
            }
          });
        } else {
          rootsGroupRef.current.style.opacity = "0";
        }
      }

      // Branch Paths Drawing (s: 0.00 -> 0.72)
      if (branchesGroupRef.current) {
        const branchPaths = branchesGroupRef.current.querySelectorAll("path");
        branchPaths.forEach((path, i) => {
          const br = treeData.branches[i];
          if (!br) return;
          if (s < br.drawStart) {
            path.style.strokeDashoffset = `${br.arcLen}`;
            path.style.opacity = "0";
          } else if (s >= br.drawEnd) {
            path.style.strokeDashoffset = "0";
            path.style.opacity = "1";
          } else {
            const p = (s - br.drawStart) / (br.drawEnd - br.drawStart);
            const easeP = 1 - Math.pow(1 - p, 2);
            path.style.strokeDashoffset = `${br.arcLen * (1 - easeP)}`;
            path.style.opacity = "1";
          }
        });
      }

      // Volumetric Canopy Foliage Masses (s: 0.40 -> 0.85)
      if (foliageMassesGroupRef.current) {
        const massEls = foliageMassesGroupRef.current.querySelectorAll(".foliage-mass-cloud");
        treeData.foliageMasses.forEach((fm, i) => {
          const el = massEls[i];
          if (!el) return;
          if (s < fm.unfurlStart) {
            el.style.opacity = "0";
            el.style.transform = "scale(0)";
          } else if (s >= fm.unfurlEnd) {
            el.style.opacity = "0.92";
            el.style.transform = "scale(1)";
          } else {
            const k = (s - fm.unfurlStart) / (fm.unfurlEnd - fm.unfurlStart);
            const eased = 1 - Math.pow(1 - k, 2);
            el.style.opacity = (k * 0.92).toString();
            el.style.transform = `scale(${eased})`;
          }
        });
      }

      // Detailed Leaves Unfurl (s: 0.42 -> 0.88)
      if (leavesGroupRef.current) {
        const leafElements = leavesGroupRef.current.querySelectorAll("g.tree-leaf-item");
        leafElements.forEach((leafEl, i) => {
          const lf = treeData.leaves[i];
          if (!lf) return;
          if (s < lf.unfurlStart) {
            leafEl.style.opacity = "0";
            leafEl.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(0)`;
          } else if (s >= lf.unfurlEnd) {
            leafEl.style.opacity = "0.98";
            leafEl.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(${lf.scale})`;
          } else {
            const p = (s - lf.unfurlStart) / (lf.unfurlEnd - lf.unfurlStart);
            const easeP = 1 - Math.pow(1 - p, 2);
            leafEl.style.opacity = `${p * 0.98}`;
            leafEl.style.transform = `translate(${lf.x}px, ${lf.y}px) rotate(${lf.angle}deg) scale(${lf.scale * easeP})`;
          }
        });
      }

      // Grass Growth (s: 0.35 -> 0.65)
      if (grassGroupRef.current) {
        if (s < 0.35) {
          grassGroupRef.current.style.opacity = "0";
        } else if (s >= 0.65) {
          grassGroupRef.current.style.opacity = "1";
        } else {
          const p = (s - 0.35) / 0.30;
          grassGroupRef.current.style.opacity = `${p}`;
        }
      }

      // Wildflowers Bloom (s: 0.60 -> 0.85)
      if (groundFlowersGroupRef.current) {
        if (s < 0.60) {
          groundFlowersGroupRef.current.style.opacity = "0";
        } else if (s >= 0.85) {
          groundFlowersGroupRef.current.style.opacity = "1";
        } else {
          const p = (s - 0.60) / 0.25;
          groundFlowersGroupRef.current.style.opacity = `${p}`;
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion, treeData]);

  return (
    <section
      ref={sectionRef}
      className="eco-tree-section-wrapper"
      aria-label="Sustainability and Green Energy"
    >
      <div className="eco-tree-sticky-viewport">
        <div className="eco-tree-ambient-glow" />

        {/* 4 Detached Falling Leaves */}
        <div className="falling-leaf-item leaf-fall-1" aria-hidden="true">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path d="M7 0 C12 5, 13 13, 7 18 C1 13, 2 5, 7 0 Z" fill="#388e3c" opacity="0.85" />
          </svg>
        </div>
        <div className="falling-leaf-item leaf-fall-2" aria-hidden="true">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 0 C10 4, 11 11, 6 16 C1 11, 2 4, 6 0 Z" fill="#43a047" opacity="0.8" />
          </svg>
        </div>
        <div className="falling-leaf-item leaf-fall-3" aria-hidden="true">
          <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
            <path d="M6.5 0 C11 4.5, 12 12, 6.5 17 C1 12, 2 4.5, 6.5 0 Z" fill="#2e7d32" opacity="0.9" />
          </svg>
        </div>
        <div className="falling-leaf-item leaf-fall-4" aria-hidden="true">
          <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
            <path d="M5.5 0 C9.5 4, 10 10.5, 5.5 15 C1 10.5, 1.5 4, 5.5 0 Z" fill="#66bb6a" opacity="0.8" />
          </svg>
        </div>

        <div className="eco-tree-container">
          <div className="eco-story-column">
            <span className="eco-eyebrow">Sustainability &amp; Green Energy</span>

            <div className="eco-chapter-deck">
              {CHAPTERS.map((ch, idx) => (
                <div
                  key={ch.id}
                  ref={(el) => (chapterRefs.current[idx] = el)}
                  className={`eco-chapter-card ${idx === 0 || prefersReducedMotion ? "active" : ""}`}
                  style={{
                    opacity: prefersReducedMotion ? (idx === 4 ? 1 : 0) : idx === 0 ? 1 : 0,
                    transform: "translateY(0px)"
                  }}
                >
                  <h2 className="eco-chapter-title">{ch.title}</h2>
                  <p className="eco-chapter-body">{ch.body}</p>
                </div>
              ))}
            </div>

            <div className="eco-divider" />

            <div className="eco-metrics-row">
              <div className="eco-metric-item">
                <span ref={stat1Ref} className="eco-metric-number">
                  1,500+
                </span>
                <span className="eco-metric-label">Trees Planted</span>
              </div>
              <div className="eco-metric-item">
                <span ref={stat2Ref} className="eco-metric-number">
                  45%
                </span>
                <span className="eco-metric-label">Carbon Reduced</span>
              </div>
              <div className="eco-metric-item">
                <span ref={stat3Ref} className="eco-metric-number">
                  100%
                </span>
                <span className="eco-metric-label">Eco Materials</span>
              </div>
            </div>
          </div>

          <div className="eco-graphic-column">
            <svg
              ref={svgRef}
              className="eco-svg-tree"
              viewBox="0 0 600 600"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="groundGradEco" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a4d28" />
                  <stop offset="45%" stopColor="#133d20" />
                  <stop offset="100%" stopColor="#0a2312" />
                </linearGradient>

                <linearGradient id="moundTopGlowEco" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(74, 222, 128, 0.0)" />
                  <stop offset="50%" stopColor="rgba(74, 222, 128, 0.28)" />
                  <stop offset="100%" stopColor="rgba(74, 222, 128, 0.0)" />
                </linearGradient>
              </defs>

              {/* 1. Ground Mound */}
              <ellipse cx="300" cy="578" rx="245" ry="22" fill="url(#groundGradEco)" />
              <ellipse cx="300" cy="568" rx="215" ry="10" fill="url(#moundTopGlowEco)" />

              {/* 2. Subsurface Roots */}
              <g ref={rootsGroupRef} id="roots" opacity="0">
                {treeData.roots.map((root, i) => (
                  <path
                    key={`root-${i}`}
                    d={root.d}
                    stroke="#3a2416"
                    strokeWidth={root.strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={root.arcLen}
                    strokeDashoffset={prefersReducedMotion ? 0 : root.arcLen}
                  />
                ))}
              </g>

              {/* 3. Sprout Shoot */}
              <g
                ref={sproutRef}
                id="sprout"
                transform="translate(300, 566)"
              >
                <path
                  d="M 0 0 Q -6 -18 -16 -24 Q -6 -20 0 -12 Q 6 -20 16 -24 Q 6 -18 0 0"
                  fill="#4ade80"
                />
              </g>

              {/* 4. Volumetric Canopy Foliage Masses */}
              <g ref={foliageMassesGroupRef} id="foliage-masses">
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

              {/* 5. Structural Trunk & Branches */}
              <g ref={branchesGroupRef} id="branches">
                {treeData.branches.map((br) => (
                  <path
                    key={br.id}
                    d={br.d}
                    stroke={br.strokeColor}
                    strokeWidth={br.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={br.arcLen}
                    strokeDashoffset={prefersReducedMotion ? 0 : br.arcLen}
                    opacity={prefersReducedMotion ? 1 : 0}
                  />
                ))}
              </g>

              {/* 6. Canopy Detailed Leaves */}
              <g ref={leavesGroupRef} id="leaves">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((groupNum) => (
                  <g
                    key={`canopy-group-${groupNum}`}
                    className={`canopy-sway-${groupNum}`}
                  >
                    {treeData.leaves
                      .filter((lf) => lf.group === groupNum)
                      .map((lf) => (
                        <g
                          key={lf.id}
                          className="tree-leaf-item"
                          transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.angle}) scale(${prefersReducedMotion ? lf.scale : 0})`}
                          opacity={prefersReducedMotion ? "0.98" : "0"}
                        >
                          <path
                            d="M 0 0 C -5 -9, -7 -18, 0 -25 C 7 -18, 5 -9, 0 0 Z"
                            fill={lf.color}
                          />
                        </g>
                      ))}
                  </g>
                ))}
              </g>

              {/* 7. Ground Grass */}
              <g ref={grassGroupRef} id="grass">
                {treeData.grass.map((gr) => (
                  <path
                    key={gr.id}
                    d={gr.d}
                    stroke={gr.color}
                    strokeWidth={gr.strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    opacity={prefersReducedMotion ? 1 : 0}
                  />
                ))}
              </g>

              {/* 8. Ground Wildflowers */}
              <g ref={groundFlowersGroupRef} id="groundFlowers" opacity={prefersReducedMotion ? 1 : 0}>
                {treeData.groundFlowers.map((fl, idx) => (
                  <g key={`fl-${idx}`}>
                    <path
                      d={fl.stemD}
                      stroke="#2e7d32"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <g transform={`translate(${fl.headX}, ${fl.headY}) scale(${fl.scale})`}>
                      <circle cx="-3" cy="-2.5" r="2.4" fill="#ffffff" />
                      <circle cx="3" cy="-2.5" r="2.4" fill="#ffffff" />
                      <circle cx="-3.5" cy="2" r="2.4" fill="#ffffff" />
                      <circle cx="3.5" cy="2" r="2.4" fill="#ffffff" />
                      <circle cx="0" cy="4" r="2.4" fill="#ffffff" />
                      <circle cx="0" cy="0" r="2" fill="#fbbf24" />
                    </g>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export const GreenTreeSection = EcoTreeSection;
export default EcoTreeSection;
