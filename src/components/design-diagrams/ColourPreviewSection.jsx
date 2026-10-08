import React, { useState } from "react";
import { prominanceFinishes, finishCategories } from "../../data/designs/prominanceFinishes.js";

/**
 * Helper to generate layered procedural woodgrain background CSS for physical chip samples
 */
const getFinishChipBackground = (finish) => {
  if (finish.isWhite) {
    return {
      backgroundColor: "#f6f7f5",
      backgroundImage: `
        linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(246,247,245,0.6) 40%, rgba(220,225,223,0.5) 100%),
        linear-gradient(to right, rgba(255,255,255,0.6), transparent 25%, rgba(0,0,0,0.03) 75%, rgba(0,0,0,0.06))
      `,
      boxShadow: "inset 0 0 0 1px #d5dad8, inset 0 2px 4px rgba(255,255,255,0.9), 0 4px 12px rgba(13,33,48,0.06)"
    };
  }

  if (finish.family === "Contemporary Solid") {
    return {
      backgroundColor: finish.baseColor,
      backgroundImage: `
        linear-gradient(145deg, ${finish.highlightColor} 0%, ${finish.baseColor} 50%, ${finish.shadowColor} 100%),
        repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)
      `,
      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.12)"
    };
  }

  // Woodgrain layered shader
  return {
    backgroundColor: finish.baseColor,
    backgroundImage: `
      linear-gradient(175deg, rgba(255,255,255,0.2) 0%, transparent 20%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.3) 100%),
      repeating-linear-gradient(
        90deg,
        ${finish.baseColor} 0px,
        ${finish.grainDark} 2px,
        ${finish.baseColor} 4px,
        ${finish.grainLight} 7px,
        ${finish.baseColor} 9px,
        ${finish.grainDark} 12px,
        ${finish.baseColor} 16px,
        ${finish.grainLight} 18px,
        ${finish.baseColor} 22px
      )
    `,
    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.35), 0 4px 14px rgba(13,33,48,0.08)"
  };
};

export const ColourPreviewSection = ({ isDoor = false, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFinish, setSelectedFinish] = useState(
    prominanceFinishes.find((f) => f.id === "golden-oak") || prominanceFinishes[0]
  );

  const filteredFinishes = activeCategory === "all"
    ? prominanceFinishes
    : prominanceFinishes.filter((f) => f.category === activeCategory);

  const handleStudioNavigate = (finishId) => {
    if (onNavigate) {
      onNavigate(`/products/window-studio?product=upvc&finish=${finishId}`);
    }
  };

  return (
    <div style={{ background: "#f9fcfd", padding: "60px 0 90px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* 1. Hero / Page Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "rgba(13, 110, 170, 0.08)",
              border: "1px solid rgba(13, 110, 170, 0.2)",
              color: "#0d6eaa",
              fontSize: "0.74rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px"
            }}
          >
            PROMINANCE ARCHITECTURAL LAMINATES
          </span>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: "300",
              color: "#1a2a3a",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              margin: "0 0 12px"
            }}
          >
            {isDoor ? "UPVC DOOR COLOUR OPTIONS" : "UPVC WINDOW COLOUR OPTIONS"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "14px 0 18px" }}>
            <span style={{ width: "50px", height: "2px", background: "#0d6eaa" }} />
            <span style={{ width: "10px", height: "10px", border: "2px solid #0d6eaa", transform: "rotate(45deg)", background: "transparent" }} />
            <span style={{ width: "50px", height: "2px", background: "#0d6eaa" }} />
          </div>
          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              color: "#526270",
              fontSize: "1rem",
              lineHeight: "1.6"
            }}
          >
            Explore Prominance laminate and profile finishes for architectural uPVC applications. Certified multi-layer exterior foils engineered for extreme weather resistance, UV stability, and natural timber aesthetics.
          </p>
        </div>

        {/* 2. Finish Category Tabs */}
        <div
          role="tablist"
          aria-label="Filter finishes by category"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "38px"
          }}
        >
          {finishCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "999px",
                  border: isActive ? "2px solid #0d6eaa" : "1px solid #d0dbe2",
                  background: isActive ? "#0d6eaa" : "#ffffff",
                  color: isActive ? "#ffffff" : "#334155",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 4px 12px rgba(13,110,170,0.2)" : "0 1px 3px rgba(0,0,0,0.04)"
                }}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* 3. Professional Colour Swatch Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "18px",
            marginBottom: "48px"
          }}
        >
          {filteredFinishes.map((finish) => {
            const isSelected = selectedFinish.id === finish.id;
            const chipStyle = getFinishChipBackground(finish);

            return (
              <button
                key={finish.id}
                type="button"
                aria-label={`Select ${finish.name} finish`}
                aria-pressed={isSelected}
                onClick={() => setSelectedFinish(finish)}
                style={{
                  background: "#ffffff",
                  border: isSelected ? "2.5px solid #0d6eaa" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "14px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.22s ease",
                  transform: isSelected ? "translateY(-3px)" : "none",
                  boxShadow: isSelected
                    ? "0 10px 24px rgba(13,110,170,0.18)"
                    : "0 2px 8px rgba(13,33,48,0.04)",
                  outline: "none"
                }}
              >
                {/* Physical Chip Sample */}
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    position: "relative",
                    overflow: "hidden",
                    ...chipStyle
                  }}
                >
                  {/* Subtle satin reflection diagonal highlight */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(115deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.12) 75%, transparent 100%)",
                      pointerEvents: "none"
                    }}
                  />

                  {/* Active Selection Badge */}
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "#0d6eaa",
                        color: "#ffffff",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "0.75rem",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>

                {/* Finish Labeling */}
                <strong
                  style={{
                    display: "block",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    color: isSelected ? "#0d6eaa" : "#1a2a3a",
                    lineHeight: "1.3",
                    marginBottom: "4px"
                  }}
                >
                  {finish.name}
                </strong>
                <span
                  style={{
                    fontSize: "0.74rem",
                    color: "#64748b",
                    fontWeight: "500",
                    display: "block"
                  }}
                >
                  {finish.family}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "#94a3b8",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}
                >
                  {finish.categoryLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Selected Finish Detail Panel */}
        {selectedFinish && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "36px",
              boxShadow: "0 14px 40px rgba(13,33,48,0.08)",
              marginBottom: "50px"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "36px",
                alignItems: "center"
              }}
            >
              {/* Left Large Physical Chip */}
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "16px",
                    ...getFinishChipBackground(selectedFinish)
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, transparent 45%, rgba(255,255,255,0.15) 80%, transparent 100%)",
                      pointerEvents: "none"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "rgba(15,23,42,0.75)",
                      color: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      backdropFilter: "blur(4px)"
                    }}
                  >
                    PHYSICAL CHIP SAMPLE
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStudioNavigate(selectedFinish.id)}
                  style={{
                    width: "100%",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    background: "#0d6eaa",
                    color: "#ffffff",
                    border: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.88rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(13,110,170,0.3)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>VIEW IN WINDOW STUDIO</span>
                  <span>→</span>
                </button>
              </div>

              {/* Right Architectural Specifications */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "#e0f2fe",
                      color: "#0369a1",
                      fontSize: "0.74rem",
                      fontWeight: "700",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase"
                    }}
                  >
                    {selectedFinish.family}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    Category: <strong>{selectedFinish.categoryLabel}</strong>
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#0d2130",
                    margin: "0 0 18px"
                  }}
                >
                  {selectedFinish.name}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Visual Character
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      {selectedFinish.visualCharacter}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Best Visual Pairing
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      {selectedFinish.bestPairing}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Lighting Character
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      {selectedFinish.lightingCharacter}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Maintenance Appearance
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      {selectedFinish.maintenanceAppearance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Finish Technology / Construction Information Section */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "36px",
            marginBottom: "40px"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              ENGINEERED LAMINATION ARCHITECTURE
            </span>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.5rem", color: "#1a2a3a", margin: "6px 0 10px" }}>
              Prominance Profile Foil Technology
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.92rem", maxWidth: "700px", margin: "0 auto" }}>
              Four-layer European lamination process engineered for high UV resistance and long-term tropical stability.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px"
            }}
          >
            {[
              {
                num: "01",
                title: "uPVC Base Profile",
                desc: "High-impact European calcium-zinc stabilized uPVC core reinforced with galvanized steel."
              },
              {
                num: "02",
                title: "Polyurethane Adhesive",
                desc: "Solvent-free reactive PUR adhesive melted at high temperatures forming an irreversible structural bond."
              },
              {
                num: "03",
                title: "Decorative Printed Foil",
                desc: "High-definition architectural woodgrain or solid pigment layer resistant to thermal expansion."
              },
              {
                num: "04",
                title: "Protective PMMA Shield",
                desc: "Transparent acrylic topcoat reflecting up to 95% of solar heat gain and preventing UV degradation."
              }
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  background: "#f8fafc",
                  borderRadius: "10px",
                  padding: "22px",
                  border: "1px solid #e2e8f0"
                }}
              >
                <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "#0d6eaa", display: "block", marginBottom: "8px", fontFamily: "Outfit, sans-serif" }}>
                  {step.num}
                </span>
                <strong style={{ fontSize: "0.95rem", color: "#1a2a3a", display: "block", marginBottom: "6px" }}>
                  {step.title}
                </strong>
                <p style={{ fontSize: "0.82rem", color: "#526270", margin: 0, lineHeight: "1.55" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Colour Selection Guidance & Subtle Professional Disclaimer */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            alignItems: "center",
            background: "linear-gradient(135deg, #0d2130, #132f45)",
            color: "#ffffff",
            borderRadius: "14px",
            padding: "32px 36px"
          }}
        >
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem", margin: "0 0 10px" }}>
              Architectural Colour Consultation
            </h4>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)", margin: "0 0 14px", lineHeight: "1.6" }}>
              Selecting window finishes involves harmonizing exterior facade materials (stone, render, brick) with interior furnishings and lighting temperature. Visit our Erode showroom to inspect full-scale physical profile samples under natural daylight.
            </p>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic" }}>
              Digital colour swatches are visual approximations. Actual laminate appearance may vary depending on lighting, texture and display calibration.
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={() => handleStudioNavigate("golden-oak")}
              style={{
                display: "inline-block",
                padding: "14px 26px",
                borderRadius: "8px",
                background: "#0d6eaa",
                color: "#ffffff",
                border: "none",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(13,110,170,0.4)",
                transition: "all 0.2s ease"
              }}
            >
              Open 3D Window Studio →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ColourPreviewSection;
