import React, { useState } from "react";
import { glassOptions } from "../../data/designs/glassData.js";
import RealisticWindowModel from "./RealisticWindowModel.jsx";
import { upvcCasementDesigns } from "../../data/designs/upvcCasement.js";
import { upvcFinishes } from "../../data/designs/windowSystems.js";

/**
 * GlassOptionsExplorer Component
 * Interactive glass selector, deep educational guidance, and comparison matrix.
 */
export const GlassOptionsExplorer = ({ onSelectGlass, onNavigate }) => {
  const [selectedGlassId, setSelectedGlassId] = useState("dgu");
  const [filterCategory, setFilterCategory] = useState("all");
  const [compareList, setCompareList] = useState(["clear", "dgu", "laminated"]);

  const selectedGlass = glassOptions.find((g) => g.id === selectedGlassId) || glassOptions[0];
  const sampleDesign = upvcCasementDesigns[4]; // Double Side Hung
  const sampleFinish = upvcFinishes[9]; // Golden Oak

  const filteredGlass = glassOptions.filter((g) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "solar") return g.category.includes("Solar") || g.category.includes("Energy");
    if (filterCategory === "safety") return g.category.includes("Safety") || g.category.includes("Security");
    if (filterCategory === "privacy") return g.category.includes("Privacy");
    return true;
  });

  const toggleCompare = (id) => {
    if (compareList.includes(id)) {
      if (compareList.length > 1) {
        setCompareList(compareList.filter((item) => item !== id));
      }
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id]);
      } else {
        setCompareList([compareList[1], compareList[2], id]);
      }
    }
  };

  return (
    <div className="glass-explorer-root" style={{ padding: "80px 0", background: "#f9fcfd" }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 56px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(13, 110, 170, 0.1)",
              border: "1px solid rgba(13, 110, 170, 0.25)",
              color: "#0d6eaa",
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}
          >
            ARCHITECTURAL GLAZING INTELLIGENCE
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: "600",
              color: "#1a2a3a",
              lineHeight: "1.15",
              margin: "0 0 16px",
              letterSpacing: "-0.02em"
            }}
          >
            Engineering the <span style={{ color: "#0d6eaa" }}>Right Glass</span> for Your Climate
          </h2>
          <p style={{ color: "#4a5c6a", fontSize: "1.05rem", lineHeight: "1.7", margin: 0 }}>
            Windows account for up to 37% of energy loss in modern buildings. Choose from acoustic, solar-control, and thermal glazing systems calibrated for Indian weather.
          </p>
        </div>

        {/* 1. Interactive Live Glass Preview Stage */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 20px 50px rgba(13, 33, 48, 0.08)",
            padding: "40px",
            marginBottom: "70px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "48px",
              alignItems: "center"
            }}
            className="glass-preview-grid"
          >
            {/* Visualizer Frame on Backdrop */}
            <div
              style={{
                background: "linear-gradient(145deg, #e0f2fe 0%, #bae6fd 45%, #7dd3fc 100%)",
                borderRadius: "16px",
                padding: "40px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                minHeight: "380px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.7) 0%, transparent 50%), linear-gradient(to top, rgba(14,116,144,0.15), transparent)",
                  pointerEvents: "none"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#0369a1",
                  background: "rgba(255,255,255,0.85)",
                  padding: "4px 10px",
                  borderRadius: "6px"
                }}
              >
                Daylight Simulation
              </span>

              <RealisticWindowModel
                design={sampleDesign}
                finish={sampleFinish}
                glass={selectedGlass}
                mode="experience"
              />

              <div
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#0f172a"
                }}
              >
                Previewing: <strong style={{ color: "#0d6eaa" }}>{selectedGlass.name}</strong> on Golden Oak Frame
              </div>
            </div>

            {/* Glass Detail Sidebar */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "rgba(13, 110, 170, 0.12)",
                    color: "#0d6eaa",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textTransform: "uppercase"
                  }}
                >
                  {selectedGlass.category}
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: selectedGlass.availability.includes("Standard") ? "#ecfdf5" : "#fef3c7",
                    color: selectedGlass.availability.includes("Standard") ? "#047857" : "#b45309",
                    fontSize: "0.72rem",
                    fontWeight: "600"
                  }}
                >
                  {selectedGlass.availability}
                </span>
              </div>

              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.8rem", color: "#1a2a3a", margin: "0 0 14px" }}>
                {selectedGlass.name}
              </h3>
              <p style={{ color: "#4a5c6a", fontSize: "0.95rem", lineHeight: "1.65", margin: "0 0 20px" }}>
                {selectedGlass.description}
              </p>

              {/* Specs Breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                    Glazing Format
                  </span>
                  <strong style={{ fontSize: "0.88rem", color: "#1e293b" }}>{selectedGlass.glazingFormat}</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                    Typical Application
                  </span>
                  <strong style={{ fontSize: "0.88rem", color: "#1e293b" }}>{selectedGlass.typicalUse}</strong>
                </div>
              </div>

              {/* Qualitative Metrics Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
                {Object.entries(selectedGlass.metrics).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
                    <span style={{ color: "#64748b", textTransform: "capitalize" }}>
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span
                      style={{
                        fontWeight: "700",
                        color: val === "High" ? "#0d6eaa" : val === "Medium" ? "#f59e0b" : "#94a3b8"
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={`#/products/window-studio?glass=${selectedGlass.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onSelectGlass) onSelectGlass(selectedGlass);
                    if (onNavigate) onNavigate(`/products/window-studio?glass=${selectedGlass.id}`);
                  }}
                  className="btn-fsq-primary"
                  style={{ textDecoration: "none" }}
                >
                  VIEW IN WINDOW STUDIO →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Glass Selection & Educational Cards Grid */}
        <div style={{ marginBottom: "70px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.6rem", color: "#1a2a3a", margin: "0 0 6px" }}>
                All Glazing Families
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Click any glass type to inspect its visual transmission and technical characteristics.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: "All Glass" },
                { id: "solar", label: "Solar & Energy" },
                { id: "safety", label: "Safety & Acoustic" },
                { id: "privacy", label: "Privacy" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: filterCategory === f.id ? "2px solid #0d6eaa" : "1px solid #cbd5e1",
                    background: filterCategory === f.id ? "#0d6eaa" : "#ffffff",
                    color: filterCategory === f.id ? "#ffffff" : "#475569",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: "24px"
            }}
          >
            {filteredGlass.map((glass) => {
              const isSelected = selectedGlassId === glass.id;
              const isCompared = compareList.includes(glass.id);

              return (
                <div
                  key={glass.id}
                  onClick={() => setSelectedGlassId(glass.id)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid #0d6eaa" : "1px solid #e2e8f0",
                    padding: "24px",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 12px 30px rgba(13,110,170,0.15)" : "0 4px 16px rgba(0,0,0,0.04)",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    {/* Visual Tint Preview Chip */}
                    <div
                      style={{
                        height: "90px",
                        borderRadius: "8px",
                        background: glass.visualTint,
                        border: "1px solid rgba(0,0,0,0.1)",
                        position: "relative",
                        overflow: "hidden",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)"
                        }}
                      />
                      {glass.isDgu && (
                        <span
                          style={{
                            background: "#0d6eaa",
                            color: "#ffffff",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "0.68rem",
                            fontWeight: "700"
                          }}
                        >
                          DGU Insulated
                        </span>
                      )}
                      {glass.isFrosted && (
                        <span style={{ color: "#334155", fontSize: "0.78rem", fontWeight: "700" }}>
                          Satin Privacy
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                      <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.1rem", margin: 0, color: "#1a2a3a" }}>
                        {glass.name}
                      </h4>
                      <span style={{ fontSize: "0.72rem", color: "#0d6eaa", fontWeight: "700" }}>
                        {glass.badgeText}
                      </span>
                    </div>

                    <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: "1.5", margin: "0 0 16px" }}>
                      {glass.visualCharacter}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {glass.availability}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(glass.id);
                      }}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: isCompared ? "1px solid #0d6eaa" : "1px solid #cbd5e1",
                        background: isCompared ? "rgba(13,110,170,0.1)" : "#ffffff",
                        color: isCompared ? "#0d6eaa" : "#64748b"
                      }}
                    >
                      {isCompared ? "✓ In Comparison" : "+ Compare"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Qualitative Comparison Matrix */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            padding: "36px",
            boxShadow: "0 14px 40px rgba(13,33,48,0.06)"
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.5rem", color: "#1a2a3a", margin: "0 0 6px" }}>
              Side-by-Side Qualitative Comparison
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Comparing selected architectural glazing options across performance vectors.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "14px", color: "#64748b", fontWeight: "600" }}>Performance Factor</th>
                  {compareList.map((id) => {
                    const g = glassOptions.find((x) => x.id === id);
                    return (
                      <th key={id} style={{ padding: "14px", color: "#0d6eaa", fontWeight: "700", fontFamily: "Poppins, sans-serif" }}>
                        {g?.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "transparency", label: "Daylight Transparency" },
                  { key: "privacy", label: "Exterior Privacy" },
                  { key: "safety", label: "Impact & Mechanical Safety" },
                  { key: "solarControl", label: "Solar Heat Rejection" },
                  { key: "thermalComfort", label: "AC Energy Savings" },
                  { key: "acousticPotential", label: "Acoustic Insulation (dB)" }
                ].map((row, rIdx) => (
                  <tr key={row.key} style={{ borderBottom: "1px solid #f1f5f9", background: rIdx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                    <td style={{ padding: "14px", fontWeight: "600", color: "#334155" }}>{row.label}</td>
                    {compareList.map((id) => {
                      const g = glassOptions.find((x) => x.id === id);
                      const val = g?.metrics[row.key];
                      return (
                        <td
                          key={id}
                          style={{
                            padding: "14px",
                            fontWeight: "700",
                            color: val === "High" ? "#0d6eaa" : val === "Medium" ? "#f59e0b" : "#94a3b8"
                          }}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .glass-preview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GlassOptionsExplorer;
