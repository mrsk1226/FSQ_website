import React, { useState } from "react";
import { aluminiumShades } from "../../data/designs/aluminiumColours.js";

// Partition shades: 15 architectural + 3 wood sublimation (Alumination)
const architecturalShades = aluminiumShades.filter((s) => s.category !== "wood");
const aluminationShades = aluminiumShades.filter((s) => s.category === "wood");

export const AluminiumColoursSection = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedShade, setSelectedShade] = useState(architecturalShades[0]); // Slate

  const getFilteredArchitectural = () => {
    if (activeCategory === "all") return architecturalShades;
    if (activeCategory === "solids") return architecturalShades.filter((s) => s.category === "architectural");
    if (activeCategory === "warm") return architecturalShades.filter((s) => s.category === "warm");
    return architecturalShades;
  };

  const handleStudioNavigate = (shade) => {
    const finishId = `alu-${shade.name.toLowerCase().replace(/\s+/g, "-")}`;
    if (onNavigate) {
      onNavigate(`/products/window-studio?product=aluminium&finish=${finishId}`);
    }
  };

  const filteredArchitectural = getFilteredArchitectural();

  return (
    <div style={{ background: "#f8fafc", padding: "60px 0 90px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* 1. Page Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "rgba(100, 116, 139, 0.12)",
              border: "1px solid rgba(100, 116, 139, 0.25)",
              color: "#334155",
              fontSize: "0.74rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px"
            }}
          >
            QUALICOAT SEASIDE CLASS II CERTIFIED FINISHES
          </span>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: "300",
              color: "#0f172a",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              margin: "0 0 12px"
            }}
          >
            ALUMINIUM COLOUR &amp; FINISH CATALOGUE
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
              color: "#475569",
              fontSize: "1rem",
              lineHeight: "1.6"
            }}
          >
            Architectural electrostatic powder coatings, metallic satin anodized finishes, and thermal sublimation woodgrain profiles engineered for maximum coastal endurance and slender sightlines.
          </p>
        </div>

        {/* 2. Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter aluminium finishes"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "36px"
          }}
        >
          {[
            { id: "all", label: `ALL ARCHITECTURAL (${architecturalShades.length})` },
            { id: "solids", label: "MONOCHROME & METALLIC" },
            { id: "warm", label: "WARM BRONZE & EARTH" }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "999px",
                  border: isActive ? "2px solid #0d6eaa" : "1px solid #cbd5e1",
                  background: isActive ? "#0d6eaa" : "#ffffff",
                  color: isActive ? "#ffffff" : "#334155",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. Architectural Powder-Coat & Satin Swatches Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "18px",
            marginBottom: "48px"
          }}
        >
          {filteredArchitectural.map((shade, idx) => {
            const isSelected = selectedShade.name === shade.name;

            return (
              <button
                key={idx}
                type="button"
                aria-label={`Select ${shade.name} finish`}
                aria-pressed={isSelected}
                onClick={() => setSelectedShade(shade)}
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
                    : "0 2px 8px rgba(15,23,42,0.04)",
                  outline: "none"
                }}
              >
                {/* Physical Sample Chip with Metallic Sheen */}
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${shade.bg} 0%, ${shade.border} 100%)`,
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Subtle Brushed Metallic Sheen */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(115deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 70%, transparent 100%)",
                      pointerEvents: "none"
                    }}
                  />

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

                <strong
                  style={{
                    display: "block",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    color: isSelected ? "#0d6eaa" : "#0f172a",
                    lineHeight: "1.3",
                    marginBottom: "4px"
                  }}
                >
                  {shade.name}
                </strong>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: "500" }}>
                  {shade.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Dedicated ALUMINATION Woodgrain Sublimation Section */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "36px",
            marginBottom: "48px"
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "6px",
                background: "#fef3c7",
                color: "#92400e",
                fontSize: "0.74rem",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}
            >
              ALUMINATION SERIES
            </span>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", color: "#1a2a3a", margin: "0 0 8px" }}>
              Aluminium Timber Sublimation
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.92rem", margin: 0, maxWidth: "720px" }}>
              High-temperature vacuum thermal sublimation transfers high-definition wood grain pigments into the powder-coat matrix, delivering the warmth of natural timber with the structural stiffness of 6063-T6 alloy.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}
          >
            {aluminationShades.map((shade, idx) => {
              const isSelected = selectedShade.name === shade.name;

              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Select ${shade.name} Alumination finish`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedShade(shade)}
                  style={{
                    background: "#f8fafc",
                    border: isSelected ? "2.5px solid #0d6eaa" : "1px solid #cbd5e1",
                    borderRadius: "12px",
                    padding: "16px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "110px",
                      borderRadius: "8px",
                      marginBottom: "12px",
                      position: "relative",
                      overflow: "hidden",
                      background: `linear-gradient(135deg, ${shade.bg} 0%, ${shade.border} 100%)`,
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(115deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.1) 70%, transparent 100%)",
                        pointerEvents: "none"
                      }}
                    />
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
                          fontSize: "0.75rem"
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </div>
                  <strong style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", color: "#1a2a3a", marginBottom: "4px" }}>
                    {shade.name}
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Woodgrain Thermal Sublimation
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Selected Finish Architectural Detail Panel */}
        {selectedShade && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "36px",
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
              marginBottom: "48px"
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
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "16px",
                    background: `linear-gradient(135deg, ${selectedShade.bg} 0%, ${selectedShade.border} 100%)`,
                    boxShadow: "inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.3)"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, transparent 45%, rgba(255,255,255,0.18) 75%, transparent 100%)",
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
                      background: "rgba(15,23,42,0.8)",
                      color: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase"
                    }}
                  >
                    ALUMINIUM PHYSICAL SAMPLE
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStudioNavigate(selectedShade)}
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

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "#f1f5f9",
                    color: "#334155",
                    fontSize: "0.74rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "8px"
                  }}
                >
                  {selectedShade.tag}
                </span>

                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: "0 0 16px"
                  }}
                >
                  {selectedShade.name}
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Surface Character
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      Satin architectural texture offering fine metallic diffuse reflection and extreme resistance against salt spray and coastal airborne moisture.
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Best Architectural Pairing
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      Expansive floor-to-ceiling panoramic glass spans, modern cantilevered villas, steel pergolas, and minimalist granite facades.
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Coating Standard
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      Qualicoat Seaside Class II certified 60–80 micron electrostatic application tested for 1,000+ hours acetic salt spray exposure.
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Maintenance Profile
                    </span>
                    <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.55" }}>
                      Smooth architectural surface sheds dust during rainfall and requires only periodic neutral-rinse wipe downs to maintain factory luster.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Professional Disclaimer & 3D Studio Banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            alignItems: "center",
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            color: "#ffffff",
            borderRadius: "14px",
            padding: "32px 36px"
          }}
        >
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem", margin: "0 0 10px" }}>
              Custom Architectural Coating Consultation
            </h4>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)", margin: "0 0 14px", lineHeight: "1.6" }}>
              Beyond our standard architectural palette, Four Square provides bespoke project powder-coating in specialized metallic tints, textured matte coatings, and anodized shades for commercial facades and boutique villas.
            </p>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic" }}>
              Digital colour swatches are visual approximations. Actual laminate appearance may vary depending on lighting, texture and display calibration.
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={() => handleStudioNavigate(architecturalShades[0])}
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

export default AluminiumColoursSection;
