import React, { useState, useEffect } from "react";
import { windowSystems, upvcFinishes, aluminiumFinishes } from "../../data/designs/windowSystems.js";
import { glassOptions } from "../../data/designs/glassData.js";
import StudioWindowAdapter from "./StudioWindowAdapter.jsx";

/**
 * WindowExperienceConfigurator Component
 * FSQ Interactive Window Studio
 * 
 * Architecture:
 * - Single Source of Truth for Mechanism: WindowDiagram / design-diagrams.css
 * - Visual Skin Layer: Live CSS variables for profile finish, grain, glass, and hardware
 * - Single Large Live Window display with clean dropdown controls & vertical finish palette
 */
export const WindowExperienceConfigurator = ({
  initialSystemId = "upvc-casement",
  initialDesignIndex = 2, // Default: Single Right
  onNavigate,
  currentRoute
}) => {
  // Parse query params safely from currentRoute or window.location
  const parseParams = (customRoute) => {
    if (typeof window === "undefined") return {};
    let search = "";
    if (customRoute && customRoute.includes("?")) {
      search = customRoute.split("?")[1];
    } else if (window.location.hash.includes("?")) {
      search = window.location.hash.slice(window.location.hash.indexOf("?") + 1);
    } else if (window.location.search) {
      search = window.location.search.replace(/^\?/, "");
    }
    const params = new URLSearchParams(search);
    return {
      product: params.get("product"),
      type: params.get("type"),
      design: params.get("design"),
      finish: params.get("finish"),
      glass: params.get("glass")
    };
  };

  const initialParams = parseParams(currentRoute);

  // 1. Product State: "upvc" | "aluminium" (Default: upvc)
  const [product, setProduct] = useState(() => {
    if (initialParams.product === "aluminium") return "aluminium";
    return "upvc";
  });

  // 2. Window Type State: "casement" | "sliding" | "tilt-turn" (Default: casement)
  const [windowType, setWindowType] = useState(() => {
    if (initialParams.type === "sliding") return "sliding";
    if (initialParams.type === "tilt-turn" && initialParams.product !== "aluminium") return "tilt-turn";
    return "casement";
  });

  // Resolve current system from product & windowType
  const resolveSystemId = (prod, type) => {
    if (prod === "aluminium") {
      return type === "sliding" ? "aluminium-sliding" : "aluminium-casement";
    }
    if (type === "sliding") return "upvc-sliding";
    if (type === "tilt-turn") return "upvc-tilt-turn";
    return "upvc-casement";
  };

  const activeSystemId = resolveSystemId(product, windowType);
  const currentSystem = windowSystems.find((s) => s.id === activeSystemId) || windowSystems[0];
  const currentDesigns = currentSystem?.designs || [];

  // 3. Window Design Index State (Default: Single Right - index 2 in uPVC Casement)
  const [selectedDesignIdx, setSelectedDesignIdx] = useState(() => {
    if (initialParams.design !== null && initialParams.design !== undefined) {
      const idx = parseInt(initialParams.design, 10);
      if (!isNaN(idx) && idx >= 0 && idx < currentDesigns.length) return idx;
      const namedIdx = currentDesigns.findIndex(
        (d) => d.name.toLowerCase().replace(/\s+/g, "-") === initialParams.design.toLowerCase()
      );
      if (namedIdx !== -1) return namedIdx;
    }
    // Default to Single Right (index 2 in casement) or 0
    return activeSystemId === "upvc-casement" && currentDesigns.length > 2 ? 2 : 0;
  });

  const selectedDesign = currentDesigns[selectedDesignIdx] || currentDesigns[0] || null;

  // Available Finishes based on Product
  const isAluminium = product === "aluminium";
  const availableFinishes = isAluminium ? aluminiumFinishes : upvcFinishes;

  // 4. Selected Finish State (Default: White Base for uPVC, Frost/Slate for Aluminium)
  const [selectedFinish, setSelectedFinish] = useState(() => {
    if (initialParams.finish) {
      const match = availableFinishes.find(
        (f) => f.id === initialParams.finish || f.id.replace(/^alu-/, "") === initialParams.finish
      );
      if (match) return match;
    }
    if (isAluminium) return aluminiumFinishes[0];
    // Default White for uPVC
    const whiteMatch = upvcFinishes.find((f) => f.isWhite || f.id === "white-base" || f.id === "white");
    return whiteMatch || upvcFinishes[0];
  });

  // 5. Selected Glass State (Default: Clear Float Glass)
  const [selectedGlass, setSelectedGlass] = useState(() => {
    if (initialParams.glass) {
      const match = glassOptions.find((g) => g.id === initialParams.glass);
      if (match) return match;
    }
    const clearMatch = glassOptions.find((g) => g.id === "clear");
    return clearMatch || glassOptions[0]; // Clear Float Glass
  });

  // 6. Mechanism Motion State: "closed" | "preview" | "open" | "tilt" | "turn" (Default: closed)
  const [mechanismState, setMechanismState] = useState("closed");

  // 7. View Angle Mode: "front" | "angle" (Default: front)
  const [viewMode, setViewMode] = useState("front");

  // Quotation Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Erode",
    notes: ""
  });

  // Synchronize state when route changes externally (e.g. Back/Forward or Navbar clicks)
  useEffect(() => {
    if (!currentRoute) return;
    const qParams = parseParams(currentRoute);
    if (!qParams.product && !qParams.type && !qParams.design && !qParams.finish && !qParams.glass) {
      return;
    }

    let nextProduct = product;
    if (qParams.product && (qParams.product === "aluminium" || qParams.product === "upvc")) {
      nextProduct = qParams.product;
      setProduct(nextProduct);
    }

    let nextType = windowType;
    if (qParams.type && (qParams.type === "casement" || qParams.type === "sliding" || (qParams.type === "tilt-turn" && nextProduct !== "aluminium"))) {
      nextType = qParams.type;
      setWindowType(nextType);
    }

    const nextSysId = resolveSystemId(nextProduct, nextType);
    const nextSys = windowSystems.find((s) => s.id === nextSysId) || windowSystems[0];
    const nextDesigns = nextSys?.designs || [];

    if (qParams.design !== null && qParams.design !== undefined) {
      const idx = parseInt(qParams.design, 10);
      if (!isNaN(idx) && idx >= 0 && idx < nextDesigns.length) {
        setSelectedDesignIdx(idx);
      } else {
        const namedIdx = nextDesigns.findIndex(
          (d) => d.name.toLowerCase().replace(/\s+/g, "-") === qParams.design.toLowerCase()
        );
        if (namedIdx !== -1) setSelectedDesignIdx(namedIdx);
      }
    }

    if (qParams.finish) {
      const finishes = nextProduct === "aluminium" ? aluminiumFinishes : upvcFinishes;
      const matchFin = finishes.find((f) => f.id === qParams.finish || f.id.replace(/^alu-/, "") === qParams.finish);
      if (matchFin) setSelectedFinish(matchFin);
    }

    if (qParams.glass) {
      const matchG = glassOptions.find((g) => g.id === qParams.glass);
      if (matchG) setSelectedGlass(matchG);
    }
  }, [currentRoute]);

  // Handle Product Change
  const handleProductChange = (newProduct) => {
    setProduct(newProduct);
    let nextType = windowType;
    if (newProduct === "aluminium" && windowType === "tilt-turn") {
      nextType = "casement";
      setWindowType("casement");
    }
    setSelectedDesignIdx(0);
    setMechanismState("closed");

    // Update finish palette while preserving compatible glass
    if (newProduct === "aluminium") {
      setSelectedFinish(aluminiumFinishes[0]);
    } else {
      const whiteMatch = upvcFinishes.find((f) => f.isWhite || f.id === "white-base" || f.id === "white");
      setSelectedFinish(whiteMatch || upvcFinishes[0]);
    }
  };

  // Handle Window Type Change
  const handleTypeChange = (newType) => {
    setWindowType(newType);
    setSelectedDesignIdx(0);
    setMechanismState("closed");
  };

  // Handle Design Change
  const handleDesignChange = (newIdx) => {
    setSelectedDesignIdx(newIdx);
    setMechanismState("closed");
  };

  // Handle Finish Change (Only visual coating changes, NO remount or geometry rebuild)
  const handleFinishChange = (finish) => {
    setSelectedFinish(finish);
  };

  // Handle Quotation Submit
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  // Synchronize URL query parameters with HashRouter — NEVER wipes the hash
  useEffect(() => {
    if (typeof window === "undefined" || !window.history?.replaceState) return;
    const params = new URLSearchParams();
    params.set("product", product);
    params.set("type", windowType);
    params.set("design", selectedDesignIdx.toString());
    if (selectedFinish?.id) params.set("finish", selectedFinish.id);
    if (selectedGlass?.id) params.set("glass", selectedGlass.id);

    const currentHash = window.location.hash || "";
    const baseHash = currentHash.split("?")[0];
    const targetBase = baseHash.startsWith("#/products/") ? baseHash : "#/products/window-studio";
    const newHash = `${targetBase}?${params.toString()}`;
    const newUrl = `${window.location.pathname}${newHash}`;

    if (window.location.hash !== newHash || window.location.search) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [product, windowType, selectedDesignIdx, selectedFinish?.id, selectedGlass?.id]);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0 80px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>

        {/* ============================================================
           HEADER: Clean Architectural Studio Identity
           ============================================================ */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#0d6eaa",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "#e0f2fe",
              padding: "4px 14px",
              borderRadius: "20px",
              marginBottom: "12px"
            }}
          >
            FSQ LIVE ARCHITECTURAL STUDIO
          </span>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
              fontWeight: "400",
              color: "#0f172a",
              margin: "0 0 10px",
              textTransform: "uppercase",
              letterSpacing: "0.04em"
            }}
          >
            INTERACTIVE WINDOW STUDIO
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.88rem, 1.3vw, 1.02rem)",
              color: "#64748b",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            Choose a window design, explore finishes and glass options, and see how the system operates.
          </p>
        </div>

        {/* ============================================================
           STUDIO CONTROLS BAR: Dropdowns (Product, Type, Design, Glass)
           ============================================================ */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "18px 24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            marginBottom: "28px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "16px",
              alignItems: "center"
            }}
          >
            {/* 1. PRODUCT SELECTOR */}
            <div>
              <label
                htmlFor="fsq-studio-product"
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  color: "#0d6eaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                1. PRODUCT
              </label>
              <select
                id="fsq-studio-product"
                value={product}
                onChange={(e) => handleProductChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  background: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="upvc">Prominance uPVC</option>
                <option value="aluminium">Uniframe Aluminium</option>
              </select>
            </div>

            {/* 2. WINDOW TYPE SELECTOR */}
            <div>
              <label
                htmlFor="fsq-studio-type"
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  color: "#0d6eaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                2. WINDOW TYPE
              </label>
              <select
                id="fsq-studio-type"
                value={windowType}
                onChange={(e) => handleTypeChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  background: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                <option value="casement">Casement</option>
                <option value="sliding">Sliding</option>
                {!isAluminium && <option value="tilt-turn">Tilt &amp; Turn</option>}
              </select>
            </div>

            {/* 3. WINDOW DESIGN SELECTOR */}
            <div>
              <label
                htmlFor="fsq-studio-design"
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  color: "#0d6eaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                3. WINDOW DESIGN ({currentDesigns.length})
              </label>
              <select
                id="fsq-studio-design"
                value={selectedDesignIdx}
                onChange={(e) => handleDesignChange(parseInt(e.target.value, 10))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  background: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                {currentDesigns.map((des, idx) => (
                  <option key={idx} value={idx}>
                    {des.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. ARCHITECTURAL GLASS SELECTOR */}
            <div>
              <label
                htmlFor="fsq-studio-glass"
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  color: "#0d6eaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px"
                }}
              >
                4. GLASS TYPE
              </label>
              <select
                id="fsq-studio-glass"
                value={selectedGlass.id}
                onChange={(e) => {
                  const match = glassOptions.find((g) => g.id === e.target.value);
                  if (match) setSelectedGlass(match);
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #cbd5e1",
                  background: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  cursor: "pointer",
                  outline: "none"
                }}
              >
                {glassOptions.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ============================================================
           MAIN STUDIO WORKSPACE: Large Live Window + Vertical Palette
           ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "28px",
            alignItems: "start"
          }}
          className="studio-workspace-grid"
        >

          {/* LEFT / CENTER: The Single Large Live Window */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              padding: "32px 24px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              minHeight: "580px"
            }}
          >
            {/* View Mode Toggle (Front / 3D Angle) */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                display: "flex",
                gap: "4px",
                background: "#f1f5f9",
                padding: "3px",
                borderRadius: "8px",
                zIndex: 10
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode("front")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: viewMode === "front" ? "#0d6eaa" : "transparent",
                  color: viewMode === "front" ? "#ffffff" : "#475569",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                FRONT VIEW
              </button>
              <button
                type="button"
                onClick={() => setViewMode("angle")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: viewMode === "angle" ? "#0d6eaa" : "transparent",
                  color: viewMode === "angle" ? "#ffffff" : "#475569",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                3D ANGLE
              </button>
            </div>

            {/* Window Stage Container */}
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 10px 20px"
              }}
            >
              {/* THE SINGLE LARGE LIVE WINDOW */}
              {selectedDesign ? (
                <StudioWindowAdapter
                  product={product}
                  windowType={currentSystem?.mechanismType || "casement"}
                  design={selectedDesign}
                  finish={selectedFinish}
                  glass={selectedGlass}
                  state={mechanismState}
                  onStateChange={(nextState) => setMechanismState(nextState)}
                  viewMode={viewMode}
                />
              ) : (
                <div style={{ padding: "40px 20px", textAlign: "center", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", color: "#991b1b" }}>
                  <p style={{ margin: 0, fontWeight: "500", fontSize: "0.95rem" }}>
                    Selected configuration is unavailable. Showing the default window.
                  </p>
                </div>
              )}

              {/* Window Label & Direct Interaction Hint */}
              <div style={{ marginTop: "26px", textAlign: "center" }}>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    margin: "0 0 4px",
                    color: "#0f172a"
                  }}
                >
                  {selectedDesign?.name || "Window Design"}
                </h3>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
                  Tap or click window sash to operate, or use controls below
                </p>
              </div>
            </div>

            {/* OPENING CONTROLS (Bottom Center) */}
            <div
              style={{
                width: "100%",
                paddingTop: "20px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}
              >
                OPENING CONTROLS
              </span>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                {currentSystem.mechanismType === "tilt-turn" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMechanismState("tilt")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "tilt" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "tilt" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "tilt" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Tilt Ventilation (15°)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMechanismState("turn")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "turn" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "turn" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "turn" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Turn Inward (75°)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMechanismState("closed")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "closed" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "closed" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "closed" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Close &amp; Lock
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setMechanismState("preview")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "preview" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "preview" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "preview" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setMechanismState("open")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "open" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "open" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "open" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => setMechanismState("closed")}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "8px",
                        border: "1.5px solid",
                        borderColor: mechanismState === "closed" ? "#0d6eaa" : "#cbd5e1",
                        background: mechanismState === "closed" ? "#0d6eaa" : "#ffffff",
                        color: mechanismState === "closed" ? "#ffffff" : "#1e293b",
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>

              {/* Active Configuration Info Strip & Quote Trigger */}
              <div
                style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "12px 16px",
                  background: "#f8fafc",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  boxSizing: "border-box"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "#334155" }}>
                  <strong>{isAluminium ? "Uniframe Aluminium" : "Prominance uPVC"}</strong> · {selectedDesign.name} ·{" "}
                  <span style={{ color: "#0d6eaa", fontWeight: "700" }}>{selectedFinish.name}</span> · {selectedGlass.shortName || selectedGlass.name}
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-fsq-primary"
                  style={{ padding: "8px 18px", fontSize: "0.82rem" }}
                >
                  Request Consultation →
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT EDGE: Vertical Colour Finish Palette */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              maxHeight: "720px"
            }}
          >
            <div style={{ marginBottom: "14px" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#0d6eaa",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "block"
                }}
              >
                COLOUR FINISH PALETTE
              </span>
              <h4 style={{ margin: "4px 0 2px", fontSize: "0.95rem", color: "#0f172a", fontFamily: "Poppins, sans-serif" }}>
                {isAluminium ? "Uniframe Shades" : "Prominance Laminates"} ({availableFinishes.length})
              </h4>
              <span style={{ fontSize: "0.74rem", color: "#64748b" }}>
                Select to update frame coating live
              </span>
            </div>

            {/* Scrollable Finish Swatch List */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                paddingRight: "4px"
              }}
            >
              {availableFinishes.map((fin) => {
                const isSelected = selectedFinish.id === fin.id;
                const isWhiteFin = fin.isWhite || fin.id === "white" || fin.id === "white-base";
                const isWoodFin = fin.type === "wood" || fin.family === "Woodgrain Laminate";

                // Swatch visual styling
                let swatchStyle = {
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  flexShrink: 0,
                  border: "1px solid rgba(0,0,0,0.15)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4)"
                };

                if (isWhiteFin) {
                  swatchStyle.background = "linear-gradient(135deg, #ffffff 0%, #f6f7f5 50%, #ecefed 100%)";
                  swatchStyle.border = "1.5px solid #cbd5e1";
                } else if (isWoodFin) {
                  swatchStyle.backgroundColor = fin.baseColor || "#b27a3c";
                  swatchStyle.backgroundImage = `repeating-linear-gradient(45deg, ${fin.baseColor || "#b27a3c"} 0px, ${fin.grainDark || "#784b1a"} 2px, ${fin.baseColor || "#b27a3c"} 4px, ${fin.grainLight || "#c98e4b"} 6px)`;
                } else {
                  swatchStyle.background = fin.baseColor || "#525960";
                }

                return (
                  <button
                    key={fin.id}
                    type="button"
                    onClick={() => handleFinishChange(fin)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid #0d6eaa" : "1px solid #f1f5f9",
                      background: isSelected ? "#f0f9ff" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={swatchStyle} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "0.8rem",
                          color: isSelected ? "#0d6eaa" : "#1e293b",
                          lineHeight: "1.2",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {fin.name}
                      </strong>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "#64748b",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {fin.family || fin.category}
                      </span>
                    </div>

                    {isSelected && (
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "#0d6eaa",
                          color: "#ffffff",
                          fontSize: "0.68rem",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: "700",
                          flexShrink: 0
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================
         QUOTATION REQUEST MODAL
         ============================================================ */}
      {isQuoteModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsQuoteModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "1.4rem",
                color: "#64748b",
                cursor: "pointer"
              }}
            >
              &times;
            </button>

            {quoteSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#ecfdf5",
                    color: "#10b981",
                    fontSize: "1.8rem",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 16px"
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", margin: "0 0 8px", color: "#0f172a" }}>
                  Configuration Received!
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>
                  Thank you, <strong>{contactForm.name}</strong>. Our fenestration engineering team in Erode will review your selected{" "}
                  <strong>{selectedDesign.name}</strong> ({selectedFinish.name}) and contact you at{" "}
                  <strong>{contactForm.phone}</strong> with a detailed bill of materials.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsQuoteModalOpen(false);
                    setQuoteSubmitted(false);
                  }}
                  className="btn-fsq-primary"
                  style={{ marginTop: "16px" }}
                >
                  Return to Studio
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#0d6eaa",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}
                >
                  ENGINEERING ESTIMATE
                </span>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", margin: "4px 0 12px", color: "#0f172a" }}>
                  Request Configuration Quote
                </h3>

                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.78rem",
                    marginBottom: "18px"
                  }}
                >
                  <div>
                    <strong>System:</strong> {isAluminium ? "Uniframe Aluminium" : "Prominance uPVC"} · {selectedDesign.name}
                  </div>
                  <div>
                    <strong>Finish:</strong> {selectedFinish.name} · <strong>Glass:</strong> {selectedGlass.name}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Anand Kumar"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 98427 xxxxx"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.85rem",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                        Project Location
                      </label>
                      <input
                        type="text"
                        value={contactForm.city}
                        onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                        placeholder="Erode / Coimbatore"
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.85rem",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                      Approximate Dimensions or Notes
                    </label>
                    <textarea
                      rows={2}
                      value={contactForm.notes}
                      onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                      placeholder="e.g. 5ft x 4ft opening, bedroom facade"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-fsq-primary"
                    style={{ width: "100%", padding: "12px", fontSize: "0.9rem", marginTop: "6px" }}
                  >
                    Submit Quotation Request →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Responsive Grid Override Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .studio-workspace-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};

export default WindowExperienceConfigurator;
