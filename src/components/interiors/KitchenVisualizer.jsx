import React, { useState } from "react";
import "./interiors.css";

const FINISH_OPTIONS = {
  upper: [
    { id: "white-gloss", name: "High-Gloss Arctic White", color: "#f8fafc", textColor: "#1a2a3a", type: "Acrylic" },
    { id: "sky-acrylic", name: "High-Gloss Sky Mist", color: "#dff2ff", textColor: "#0d6eaa", type: "Acrylic" },
    { id: "matte-grey", name: "Super-Matte Slate", color: "#64748b", textColor: "#ffffff", type: "Super-Matte" },
    { id: "oak-grain", name: "Natural Oak Woodgrain", color: "#c9a06e", textColor: "#ffffff", type: "Woodgrain" },
    { id: "cream-pu", name: "English Cream Shaker", color: "#eee8d8", textColor: "#1a2a3a", type: "PU Lacquer" }
  ],
  lower: [
    { id: "charcoal-matte", name: "Super-Matte Charcoal", color: "#1e293b", textColor: "#ffffff", type: "Super-Matte" },
    { id: "navy-gloss", name: "High-Gloss Oceanic Navy", color: "#0f3a5d", textColor: "#ffffff", type: "Acrylic" },
    { id: "walnut-grain", name: "Deep Walnut Woodgrain", color: "#5c3a21", textColor: "#ffffff", type: "Woodgrain" },
    { id: "teak-grain", name: "Royal Teak Woodgrain", color: "#8a5229", textColor: "#ffffff", type: "Woodgrain" },
    { id: "forest-matte", name: "Super-Matte Forest", color: "#144a33", textColor: "#ffffff", type: "Super-Matte" }
  ],
  countertop: [
    { id: "pure-quartz", name: "Engineered Quartz White", color: "#f5f5f2", textColor: "#1a2a3a", type: "Quartz" },
    { id: "jet-black", name: "Jet Black Granite", color: "#18181b", textColor: "#ffffff", type: "Granite" },
    { id: "beige-quartz", name: "Warm Sand Quartz", color: "#e8dec8", textColor: "#1a2a3a", type: "Quartz" },
    { id: "grey-quartz", name: "Smoky Grey Quartz", color: "#52525b", textColor: "#ffffff", type: "Quartz" }
  ],
  backsplash: [
    { id: "subway-tile", name: "Gloss Subway Tile", color: "#eef2f6", pattern: "subway", type: "Ceramic" },
    { id: "herringbone", name: "Herringbone Accent", color: "#e2e8f0", pattern: "herringbone", type: "Mosaic" },
    { id: "terrazzo", name: "Calacatta Gold Texture", color: "#f8f6f0", pattern: "terrazzo", type: "Quartz" },
    { id: "smoked-glass", name: "Smoked Grey Glass", color: "#334155", pattern: "glass", type: "Tempered Glass" }
  ]
};

export const KitchenVisualizer = ({ layouts = [] }) => {
  const [selectedLayoutId, setSelectedLayoutId] = useState("straight");
  const [activeUpper, setActiveUpper] = useState(FINISH_OPTIONS.upper[0]);
  const [activeLower, setActiveLower] = useState(FINISH_OPTIONS.lower[0]);
  const [activeCountertop, setActiveCountertop] = useState(FINISH_OPTIONS.countertop[0]);
  const [activeBacksplash, setActiveBacksplash] = useState(FINISH_OPTIONS.backsplash[0]);
  const [compareIds, setCompareIds] = useState(["straight", "l-shaped", "island"]);

  const selectedLayout = layouts.find((l) => l.id === selectedLayoutId) || layouts[0] || {};

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      if (compareIds.length > 1) {
        setCompareIds(compareIds.filter((item) => item !== id));
      }
    } else {
      if (compareIds.length < 3) {
        setCompareIds([...compareIds, id]);
      } else {
        setCompareIds([compareIds[1], compareIds[2], id]);
      }
    }
  };

  return (
    <section className="interior-section bg-warm" id="kitchen-visualizer-section">
      <div className="interior-container">
        {/* Section Header */}
        <div className="interior-section-header">
          <span className="interior-eyebrow">INTERACTIVE DESIGN STUDIO</span>
          <h2 className="interior-title">Kitchen Layout &amp; Finish Visualizer</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            Switch layout families, inspect architectural floor plans, and live-preview verified finish combinations in real-time.
          </p>
        </div>

        {/* 1. Layout Selector Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
          {layouts.map((l) => {
            const isSelected = l.id === selectedLayoutId;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelectedLayoutId(l.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  fontSize: "0.88rem",
                  fontWeight: isSelected ? "600" : "500",
                  background: isSelected ? "#0d6eaa" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#1a2a3a",
                  border: isSelected ? "1.5px solid #0d6eaa" : "1.5px solid #dfe7ec",
                  boxShadow: isSelected ? "0 4px 14px rgba(13, 110, 170, 0.25)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {l.title}
              </button>
            );
          })}
        </div>

        {/* 2. Main Studio Grid: Left Live Interactive Preview, Right Architectural Spec & Floor Plan */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "28px",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #dfe7ec",
            boxShadow: "0 18px 45px rgba(13, 33, 48, 0.08)",
            padding: "28px",
            marginBottom: "48px"
          }}
          className="kitchen-studio-grid"
        >
          {/* Left Column: Live Elevation SVG Preview with CSS Variables */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "0.76rem", fontWeight: "700", letterSpacing: "0.08em", color: "#0d6eaa", textTransform: "uppercase" }}>
                3D Front Elevation Preview ({selectedLayout.title})
              </span>
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                Active: <strong>{activeUpper.type}</strong> + <strong>{activeLower.type}</strong>
              </span>
            </div>

            {/* Live SVG Kitchen Canvas */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                boxSizing: "border-box"
              }}
            >
              <svg viewBox="0 0 500 320" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                  {/* Backsplash Pattern */}
                  <pattern id="subwayPattern" width="24" height="12" patternUnits="userSpaceOnUse">
                    <rect width="24" height="12" fill={activeBacksplash.color} stroke="#cbd5e1" strokeWidth="0.6" />
                  </pattern>
                  <linearGradient id="counterSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
                  </linearGradient>
                  <filter id="cabinetShadow" x="-5%" y="-5%" width="110%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Background Wall */}
                <rect x="20" y="20" width="460" height="280" fill="#f8fafc" />

                {/* Backsplash Area */}
                <rect x="50" y="110" width="400" height="70" fill={activeBacksplash.pattern === "subway" ? "url(#subwayPattern)" : activeBacksplash.color} stroke="#cbd5e1" strokeWidth="0.8" />

                {/* Upper Wall Cabinets */}
                <g filter="url(#cabinetShadow)">
                  {selectedLayoutId === "island" || selectedLayoutId === "u-shaped" || selectedLayoutId === "peninsula" ? (
                    <>
                      <rect x="50" y="40" width="90" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                      <rect x="145" y="40" width="90" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                      {/* Chimney Hood in Middle */}
                      <path d="M 255 40 L 285 40 L 295 90 L 245 90 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      <rect x="240" y="90" width="60" height="10" fill="#475569" rx="1" />
                      <rect x="310" y="40" width="90" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                      <rect x="405" y="40" width="45" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                    </>
                  ) : (
                    <>
                      <rect x="50" y="40" width="115" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                      {/* Chimney */}
                      <path d="M 195 40 L 225 40 L 235 90 L 185 90 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                      <rect x="180" y="90" width="60" height="10" fill="#475569" rx="1" />
                      <rect x="250" y="40" width="95" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                      <rect x="350" y="40" width="100" height="70" fill={activeUpper.color} stroke="#cbd5e1" strokeWidth="1" rx="2" />
                    </>
                  )}
                  {/* Subtle Under-Cabinet Diffused LED Glow */}
                  <line x1="50" y1="110" x2="450" y2="110" stroke="#fef08a" strokeWidth="2.5" opacity="0.75" />
                </g>

                {/* Countertop Slab */}
                <g filter="url(#cabinetShadow)">
                  <rect x="40" y="180" width="420" height="14" fill={activeCountertop.color} stroke="#64748b" strokeWidth="0.8" rx="1" />
                  <rect x="40" y="180" width="420" height="14" fill="url(#counterSheen)" opacity="0.35" />
                </g>

                {/* Built-in Hob & Sink on Countertop */}
                <rect x="190" y="177" width="45" height="3" fill="#1e293b" rx="1" />
                <circle cx="202" cy="178" r="4" fill="#0f172a" />
                <circle cx="222" cy="178" r="4" fill="#0f172a" />
                <rect x="310" y="177" width="50" height="3" fill="#64748b" rx="1" />

                {/* Base Cabinets & Drawers */}
                <g filter="url(#cabinetShadow)">
                  <rect x="50" y="194" width="95" height="90" fill={activeLower.color} stroke="#334155" strokeWidth="1" rx="2" />
                  <rect x="150" y="194" width="95" height="42" fill={activeLower.color} stroke="#334155" strokeWidth="1" rx="2" />
                  <rect x="150" y="240" width="95" height="44" fill={activeLower.color} stroke="#334155" strokeWidth="1" rx="2" />
                  <rect x="250" y="194" width="95" height="90" fill={activeLower.color} stroke="#334155" strokeWidth="1" rx="2" />
                  <rect x="350" y="194" width="100" height="90" fill={activeLower.color} stroke="#334155" strokeWidth="1" rx="2" />

                  {/* Handles */}
                  <line x1="60" y1="210" x2="80" y2="210" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="160" y1="205" x2="235" y2="205" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="160" y1="250" x2="235" y2="250" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="260" y1="210" x2="280" y2="210" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="360" y1="210" x2="380" y2="210" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />

                  {/* Skirting Plinth */}
                  <rect x="50" y="284" width="400" height="12" fill="#334155" />
                </g>

                {/* Island / Peninsula Specific Front Accent if Selected */}
                {selectedLayoutId === "island" && (
                  <g filter="url(#cabinetShadow)">
                    <rect x="140" y="220" width="220" height="74" fill={activeLower.color} stroke="#0f172a" strokeWidth="1.2" rx="3" />
                    <rect x="135" y="214" width="230" height="9" fill={activeCountertop.color} stroke="#475569" strokeWidth="0.8" rx="1" />
                    <line x1="160" y1="240" x2="200" y2="240" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                    <line x1="300" y1="240" x2="340" y2="240" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                    <text x="250" y="260" textAnchor="middle" fill={activeLower.textColor} fontSize="11" fontWeight="600" opacity="0.85">
                      Central Island Station
                    </text>
                  </g>
                )}

                {selectedLayoutId === "peninsula" && (
                  <g filter="url(#cabinetShadow)">
                    <rect x="290" y="215" width="165" height="79" fill={activeLower.color} stroke="#0f172a" strokeWidth="1.2" rx="3" />
                    <rect x="285" y="210" width="175" height="9" fill={activeCountertop.color} stroke="#475569" strokeWidth="0.8" rx="1" />
                    <text x="372" y="255" textAnchor="middle" fill={activeLower.textColor} fontSize="10" fontWeight="600" opacity="0.85">
                      Attached Breakfast Bar
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Customizer Swatches Accordions */}
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* 1. Upper Finish */}
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "8px" }}>
                  1. Upper Cabinets Finish: <span style={{ color: "#0d6eaa" }}>{activeUpper.name}</span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FINISH_OPTIONS.upper.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveUpper(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        background: activeUpper.id === opt.id ? "#f0f7ff" : "#ffffff",
                        border: activeUpper.id === opt.id ? "2px solid #0d6eaa" : "1px solid #dfe7ec",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: opt.color, border: "1px solid #cbd5e1", display: "inline-block" }} />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Lower Finish */}
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "8px" }}>
                  2. Base Cabinets Finish: <span style={{ color: "#0d6eaa" }}>{activeLower.name}</span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FINISH_OPTIONS.lower.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveLower(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        background: activeLower.id === opt.id ? "#f0f7ff" : "#ffffff",
                        border: activeLower.id === opt.id ? "2px solid #0d6eaa" : "1px solid #dfe7ec",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: opt.color, border: "1px solid #cbd5e1", display: "inline-block" }} />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Countertop */}
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "8px" }}>
                  3. Countertop Surface: <span style={{ color: "#0d6eaa" }}>{activeCountertop.name}</span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FINISH_OPTIONS.countertop.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveCountertop(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        background: activeCountertop.id === opt.id ? "#f0f7ff" : "#ffffff",
                        border: activeCountertop.id === opt.id ? "2px solid #0d6eaa" : "1px solid #dfe7ec",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: opt.color, border: "1px solid #cbd5e1", display: "inline-block" }} />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Backsplash */}
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "8px" }}>
                  4. Backsplash Wall Accent: <span style={{ color: "#0d6eaa" }}>{activeBacksplash.name}</span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FINISH_OPTIONS.backsplash.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveBacksplash(opt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        background: activeBacksplash.id === opt.id ? "#f0f7ff" : "#ffffff",
                        border: activeBacksplash.id === opt.id ? "2px solid #0d6eaa" : "1px solid #dfe7ec",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: opt.color, border: "1px solid #cbd5e1", display: "inline-block" }} />
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Top-View Plan & Layout Engineering Specifications */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "0.76rem", fontWeight: "700", letterSpacing: "0.08em", color: "#0d6eaa", textTransform: "uppercase" }}>
                Architectural Top-View Plan
              </span>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.35rem", color: "#1a2a3a", margin: "4px 0 12px" }}>
                {selectedLayout.title}
              </h3>
              <p style={{ fontSize: "0.86rem", color: "#4a5c6a", lineHeight: "1.55", margin: "0 0 16px" }}>
                {selectedLayout.description}
              </p>

              {/* Clean Architectural SVG Top-View Plan */}
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  background: "#f8fafc",
                  border: "1px solid #dfe7ec",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  padding: "10px"
                }}
              >
                <svg viewBox="0 0 280 160" style={{ width: "100%", height: "100%" }}>
                  {/* Outer Wall Boundaries */}
                  <rect x="15" y="15" width="250" height="130" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Top-View Floor Plan Shapes based on selected layout */}
                  {selectedLayoutId === "straight" && (
                    <g>
                      <rect x="25" y="25" width="230" height="35" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      {/* Fridge, Sink, Hob in line */}
                      <rect x="35" y="28" width="30" height="28" fill="#cbd5e1" />
                      <text x="50" y="46" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="110" y="30" width="32" height="24" fill="#93c5fd" />
                      <text x="126" y="46" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="195" y="30" width="35" height="24" fill="#fca5a5" />
                      <text x="212" y="46" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      {/* Linear Arrow */}
                      <path d="M 65 42 L 110 42 M 142 42 L 195 42" stroke="#0d6eaa" strokeWidth="1.5" strokeDasharray="3 2" />
                    </g>
                  )}

                  {selectedLayoutId === "l-shaped" && (
                    <g>
                      <path d="M 25 25 L 255 25 L 255 60 L 60 60 L 60 135 L 25 135 Z" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="30" y="90" width="25" height="35" fill="#cbd5e1" />
                      <text x="42" y="112" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="100" y="28" width="35" height="25" fill="#93c5fd" />
                      <text x="117" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="195" y="28" width="35" height="25" fill="#fca5a5" />
                      <text x="212" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      {/* Work Triangle */}
                      <path d="M 42 100 L 117 40 L 212 40 Z" fill="rgba(13, 110, 170, 0.12)" stroke="#0d6eaa" strokeWidth="1.2" strokeDasharray="3 2" />
                    </g>
                  )}

                  {selectedLayoutId === "u-shaped" && (
                    <g>
                      <path d="M 25 25 L 255 25 L 255 135 L 220 135 L 220 60 L 60 60 L 60 135 L 25 135 Z" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="28" y="90" width="28" height="35" fill="#cbd5e1" />
                      <text x="42" y="112" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="120" y="28" width="40" height="25" fill="#93c5fd" />
                      <text x="140" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="223" y="90" width="28" height="35" fill="#fca5a5" />
                      <text x="237" y="112" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      {/* Work Triangle */}
                      <path d="M 42 100 L 140 40 L 237 100 Z" fill="rgba(13, 110, 170, 0.12)" stroke="#0d6eaa" strokeWidth="1.2" strokeDasharray="3 2" />
                    </g>
                  )}

                  {selectedLayoutId === "galley" && (
                    <g>
                      <rect x="25" y="25" width="230" height="32" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="25" y="103" width="230" height="32" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="40" y="28" width="35" height="25" fill="#cbd5e1" />
                      <text x="57" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="170" y="28" width="40" height="25" fill="#93c5fd" />
                      <text x="190" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="110" y="106" width="40" height="25" fill="#fca5a5" />
                      <text x="130" y="122" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      {/* Work Triangle */}
                      <path d="M 57 40 L 190 40 L 130 118 Z" fill="rgba(13, 110, 170, 0.12)" stroke="#0d6eaa" strokeWidth="1.2" strokeDasharray="3 2" />
                    </g>
                  )}

                  {selectedLayoutId === "peninsula" && (
                    <g>
                      <path d="M 25 25 L 255 25 L 255 60 L 60 60 L 60 135 L 25 135 Z" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="150" y="85" width="105" height="35" fill="#dbeafe" stroke="#0284c7" strokeWidth="1.2" />
                      <text x="202" y="106" fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="600">PENINSULA BAR</text>
                      <rect x="30" y="90" width="25" height="35" fill="#cbd5e1" />
                      <text x="42" y="112" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="100" y="28" width="35" height="25" fill="#93c5fd" />
                      <text x="117" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="195" y="28" width="35" height="25" fill="#fca5a5" />
                      <text x="212" y="44" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      <path d="M 42 100 L 117 40 L 212 40 Z" fill="rgba(13, 110, 170, 0.12)" stroke="#0d6eaa" strokeWidth="1.2" strokeDasharray="3 2" />
                    </g>
                  )}

                  {selectedLayoutId === "island" && (
                    <g>
                      <rect x="25" y="25" width="230" height="30" fill="#e2e8f0" stroke="#0d6eaa" strokeWidth="1.5" />
                      <rect x="90" y="75" width="100" height="50" fill="#dbeafe" stroke="#0284c7" strokeWidth="1.2" rx="2" />
                      <text x="140" y="104" fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="600">CENTRAL ISLAND</text>
                      <rect x="40" y="27" width="35" height="25" fill="#cbd5e1" />
                      <text x="57" y="43" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">REF</text>
                      <rect x="180" y="27" width="40" height="25" fill="#93c5fd" />
                      <text x="200" y="43" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="600">SINK</text>
                      <rect x="120" y="80" width="40" height="20" fill="#fca5a5" />
                      <text x="140" y="93" fontSize="8" textAnchor="middle" fill="#1e293b" fontWeight="600">HOB</text>
                      <path d="M 57 40 L 200 40 L 140 85 Z" fill="rgba(13, 110, 170, 0.12)" stroke="#0d6eaa" strokeWidth="1.2" strokeDasharray="3 2" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Engineering Specs List */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.82rem" }}>
                <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ color: "#1a2a3a", display: "block" }}>Ideal Room:</strong>
                  <span style={{ color: "#4a5c6a" }}>{selectedLayout.idealRoom}</span>
                </div>
                <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ color: "#1a2a3a", display: "block" }}>Work Triangle:</strong>
                  <span style={{ color: "#4a5c6a" }}>{selectedLayout.workTriangle}</span>
                </div>
                <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ color: "#1a2a3a", display: "block" }}>Storage Potential:</strong>
                  <span style={{ color: "#4a5c6a" }}>{selectedLayout.storage}</span>
                </div>
                <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ color: "#1a2a3a", display: "block" }}>Circulation:</strong>
                  <span style={{ color: "#4a5c6a" }}>{selectedLayout.circulation}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <a href="/contact" className="btn-fsq-primary" style={{ width: "100%", boxSizing: "border-box", justifyContent: "center" }}>
                Book Consultation for {selectedLayout.title}
              </a>
            </div>
          </div>
        </div>

        {/* 3. Interactive Layout Comparison Matrix */}
        <div style={{ marginTop: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span className="interior-eyebrow">LAYOUT COMPARISON TOOL</span>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", color: "#1a2a3a", margin: "4px 0 8px" }}>
              Compare Kitchen Configurations
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b" }}>
              Select 2 to 3 layout families to compare workspace continuity, storage volume, and circulation.
            </p>

            {/* Comparison Selector Chips */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "14px" }}>
              {layouts.map((l) => {
                const isSelected = compareIds.includes(l.id);
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => toggleCompare(l.id)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: isSelected ? "600" : "400",
                      background: isSelected ? "#0d6eaa" : "#ffffff",
                      color: isSelected ? "#ffffff" : "#4a5c6a",
                      border: isSelected ? "1px solid #0d6eaa" : "1px solid #cbd5e1",
                      cursor: "pointer"
                    }}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {l.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          <div style={{ overflowX: "auto", background: "#ffffff", borderRadius: "14px", border: "1px solid #dfe7ec", boxShadow: "0 10px 30px rgba(13, 33, 48, 0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "16px 20px", color: "#1a2a3a", fontWeight: "600", width: "22%" }}>Metric</th>
                  {compareIds.map((id) => {
                    const l = layouts.find((item) => item.id === id);
                    return (
                      <th key={id} style={{ padding: "16px 20px", color: "#0d6eaa", fontWeight: "700" }}>
                        {l ? l.title : id}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Best For</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#4a5c6a" }}>
                      {layouts.find((l) => l.id === id)?.bestFor}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Counter Continuity</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#0d6eaa", fontWeight: "600" }}>
                      {layouts.find((l) => l.id === id)?.comparison?.continuity}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Storage Potential</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#0d6eaa", fontWeight: "600" }}>
                      {layouts.find((l) => l.id === id)?.comparison?.storage}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Circulation / Movement</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#4a5c6a" }}>
                      {layouts.find((l) => l.id === id)?.comparison?.movement}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Open-Space Suitability</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#4a5c6a" }}>
                      {layouts.find((l) => l.id === id)?.comparison?.openSpace}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "14px 20px", fontWeight: "600", color: "#1a2a3a" }}>Island / Seating Potential</td>
                  {compareIds.map((id) => (
                    <td key={id} style={{ padding: "14px 20px", color: "#4a5c6a" }}>
                      {layouts.find((l) => l.id === id)?.comparison?.breakfastSeating}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenVisualizer;
