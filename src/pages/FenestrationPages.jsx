import React from "react";
import { DesignSection, LaminateGrid } from "../components/design-diagrams/index.js";
import { ColourPreviewSection } from "../components/design-diagrams/ColourPreviewSection.jsx";
import { AluminiumColoursSection } from "../components/design-diagrams/AluminiumColoursSection.jsx";
import { upvcCasementDesigns } from "../data/designs/upvcCasement.js";
import { upvcSlidingDesigns } from "../data/designs/upvcSliding.js";
import { upvcTiltTurnDesigns } from "../data/designs/upvcTiltTurn.js";
import { upvcDoorsCasementDesigns } from "../data/designs/upvcDoorsCasement.js";
import { upvcDoorsSlidingDesigns } from "../data/designs/upvcDoorsSliding.js";
import { upvcDoorsFoldDesigns } from "../data/designs/upvcDoorsFold.js";
import { aluminiumCasementDesigns } from "../data/designs/aluminiumCasement.js";
import { aluminiumSlidingDesigns } from "../data/designs/aluminiumSliding.js";
import { InteriorCTA } from "../components/interiors/index.js";

/* ============================================================
   SHARED TECHNICAL PROFILE SELECTION COMPONENT
   ============================================================ */
const TechnicalProfileSelection = ({ isAluminium = false }) => (
  <section style={{ padding: "80px 0", background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.8rem", fontWeight: "300", color: "#333", textTransform: "uppercase" }}>
          TECHNICAL PROFILE SELECTION
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "16px 0 20px" }}>
          <span style={{ width: "60px", height: "2px", background: "#0d6eaa" }} />
          <span style={{ width: "12px", height: "12px", border: "2px solid #0d6eaa", transform: "rotate(45deg)", background: "transparent" }} />
          <span style={{ width: "60px", height: "2px", background: "#0d6eaa" }} />
        </div>
        <p style={{ color: "#666", fontSize: "0.95rem" }}>
          {isAluminium
            ? "High-tensile architectural aluminium alloy profiles engineered for maximum wind-load resistance and slender sightlines."
            : "Precision multi-chambered European uPVC profiles with 1.5mm hot-dip galvanized steel reinforcement."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        {/* Profile Series 1 */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "36px" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {isAluminium ? "PREMIUM SLENDER SYSTEM" : "HEAVY-DUTY ARCHITECTURAL SERIES"}
          </span>
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", color: "#1a2a3a", margin: "8px 0 16px" }}>
            {isAluminium ? "GRAF & LIVIO MINIMAL SERIES" : "INVENTA SERIES (PREMIUM)"}
          </h4>
          <p style={{ fontSize: "0.9rem", color: "#4a5c6a", lineHeight: "1.6", margin: "0 0 20px" }}>
            {isAluminium
              ? "Ultra-slim central interlocks starting at 18mm, integrated thermal breaks, multi-point perimeter security locks, and 25-year powder coating warranty."
              : "Thick multi-chambered 2.5mm wall sections, twin EPDM compression gaskets, 125 GSM galvanized steel core, and sound reduction up to 40 dB."}
          </p>
          <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.86rem", color: "#4a5c6a", lineHeight: "1.8" }}>
            <li>{isAluminium ? "Alloy: 6063-T6 architectural grade" : "Wall Thickness: 2.3 mm – 2.5 mm"}</li>
            <li>{isAluminium ? "Glazing: 24mm to 32mm DGU acoustic glass" : "Steel Reinforcement: 1.5 mm hot-dip galvanized"}</li>
            <li>{isAluminium ? "Wind Resistance: Up to 5500 Pascal test rating" : "Weather Testing: 25,000+ hours SKZ-Germany certified"}</li>
            <li>{isAluminium ? "Surface: Qualicoat Seaside Class II certified" : "Formulation: 100% Lead-Free, RoHS compliant"}</li>
          </ul>
        </div>

        {/* Profile Series 2 */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "36px" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {isAluminium ? "ROBUST STRUCTURAL SYSTEM" : "OPTIMAL RESIDENTIAL SERIES"}
          </span>
          <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", color: "#1a2a3a", margin: "8px 0 16px" }}>
            {isAluminium ? "ROBUS 40 HEAVY SYSTEM" : "OPTIMA SERIES (STANDARD)"}
          </h4>
          <p style={{ fontSize: "0.9rem", color: "#4a5c6a", lineHeight: "1.6", margin: "0 0 20px" }}>
            {isAluminium
              ? "Heavy-duty sash sections built for oversized panoramic glass walls, high-rise balconies, and hurricane-prone coastal wind loads."
              : "Engineered for medium to large residential openings, 1500 Pascal wind load resistance, zero-joint fusion welded corners, and smooth gliding tracks."}
          </p>
          <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.86rem", color: "#4a5c6a", lineHeight: "1.8" }}>
            <li>{isAluminium ? "Max Sash Height: Up to 3.5 meters" : "Tested Wind Load: 1500 Pa @ Height/175"}</li>
            <li>{isAluminium ? "Stainless Steel 316 heavy track rollers" : "Air Infiltration: Zero air gap with EPDM brush seals"}</li>
            <li>{isAluminium ? "Corrosion-proof in high humidity tropical zones" : "Fusion Welded Joints: 25.32 MPa weld strength"}</li>
            <li>{isAluminium ? "Multi-point locking with anti-lift pins" : "Warranty: 20-Year comprehensive manufacturer warranty"}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   1. UPVC WINDOWS - MARKETING OVERVIEW PAGE (/products/upvc)
   ============================================================ */
export const UpvcOverviewPage = ({ onNavigate }) => {
  return (
    <div>
      {/* Marketing Hero */}
      <section style={{ position: "relative", padding: "90px 24px", background: "linear-gradient(180deg, #0d2130, #132f45)", color: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "999px", background: "rgba(13,110,170,0.3)", border: "1px solid #0d6eaa", color: "#8bd1fb", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            GERMAN PRECISION FENESTRATION
          </span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: "600", margin: "0 0 18px", lineHeight: "1.12", letterSpacing: "-0.02em" }}>
            uPVC Windows & Systems
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: "0 auto 32px", maxWidth: "720px" }}>
            Tested for 25,000+ hours in extreme tropical weather. Providing up to 40 dB sound insulation, 30% electricity savings, 100% lead-free formulation, and an assured 20-year warranty.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#/products/window-studio?product=upvc" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=upvc"); }} className="btn-fsq-primary">
              Open 3D Window Studio →
            </a>
            <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary">
              Explore Glass Options
            </a>
            <a href="/products/upvc/casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc/casement"); }} className="btn-fsq-outline" style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}>
              Casement (26 Designs)
            </a>
          </div>
        </div>
      </section>

      {/* 6-Item Feature Strip */}
      <section style={{ background: "#0d2137", color: "#ffffff", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", textAlign: "center" }}>
          {[
            { strong: "40 dB", span: "Sound Insulation" },
            { strong: "30%", span: "Energy Loss Reduced" },
            { strong: "25,000 hrs", span: "Weather Tested (SKZ)" },
            { strong: "100%", span: "Lead-Free Eco Formulation" },
            { strong: "1500 Pa", span: "Wind Load Tested" },
            { strong: "20 Years", span: "Assured Warranty" }
          ].map((stat, idx) => (
            <div key={idx} style={{ borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.12)" : "none", padding: "10px" }}>
              <strong style={{ display: "block", color: "#8bd1fb", fontSize: "1.35rem", fontFamily: "Outfit, sans-serif" }}>{stat.strong}</strong>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{stat.span}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Casement Windows Overview */}
      <section style={{ padding: "80px 0", background: "#f9fcfd" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>01. CASEMENT SYSTEMS</span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.2rem", fontWeight: "400", color: "#1a2a3a", margin: "10px 0 16px" }}>
              uPVC Casement Windows
            </h2>
            <p style={{ color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 20px" }}>
              Side-hung and top-hung sashes with twin EPDM compression gaskets and multi-point perimeter locks. Tested to European EN 12608 standards for maximum soundproofing and rain protection.
            </p>
            <ul style={{ paddingLeft: "18px", margin: "0 0 28px", color: "#4a5c6a", fontSize: "0.9rem", lineHeight: "1.8" }}>
              <li>26 versatile design combinations (Single, Double, Triple, Transoms)</li>
              <li>Dual compression gaskets preventing dust whistling and insect entry</li>
              <li>Heavy-duty friction stays holding open at any angle during strong winds</li>
            </ul>
            <a href="/products/upvc/casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc/casement"); }} className="btn-fsq-primary">
              Open 26 Casement Designs →
            </a>
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 16px 40px rgba(13,33,48,0.1)" }}>
            <img src="/assets/product-upvc.png" alt="uPVC Casement Windows" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* 2. Sliding Windows Overview */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
          <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 16px 40px rgba(13,33,48,0.1)" }}>
            <img src="/assets/product-sliding.png" alt="uPVC Sliding Windows" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>02. SLIDING SYSTEMS</span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.2rem", fontWeight: "400", color: "#1a2a3a", margin: "10px 0 16px" }}>
              uPVC Sliding Windows
            </h2>
            <p style={{ color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 20px" }}>
              2-Track and 3-Track sliding windows equipped with nylon rollers over high-grade stainless steel tracks for effortless finger-touch gliding and built-in mosquito mesh options.
            </p>
            <ul style={{ paddingLeft: "18px", margin: "0 0 28px", color: "#4a5c6a", fontSize: "0.9rem", lineHeight: "1.8" }}>
              <li>2-Panel, 3-Panel, and 4-Panel panoramic glass spans</li>
              <li>Integrated hurricane booster bars for high-rise wind resistance</li>
              <li>Interlocking fin weather seals eliminating monsoon water penetration</li>
            </ul>
            <a href="/products/upvc/sliding" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc/sliding"); }} className="btn-fsq-primary">
              Open 5 Sliding Designs →
            </a>
          </div>
        </div>
      </section>

      {/* 3. Tilt & Turn Overview */}
      <section style={{ padding: "80px 0", background: "#f9fcfd" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>03. DUAL ACTION SYSTEMS</span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.2rem", fontWeight: "400", color: "#1a2a3a", margin: "10px 0 16px" }}>
              Tilt & Turn Windows
            </h2>
            <p style={{ color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 20px" }}>
              Versatile European dual-action design: tilt inward at the top for secure, draft-free ventilation, or turn fully inward for easy glass cleaning from inside the room.
            </p>
            <a href="/products/upvc/tilt-turn" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc/tilt-turn"); }} className="btn-fsq-primary">
              Open Tilt & Turn Designs →
            </a>
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 16px 40px rgba(13,33,48,0.1)" }}>
            <img src="/assets/work-sliding.png" alt="Tilt and Turn Window" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Technical Profile Selection */}
      <TechnicalProfileSelection isAluminium={false} />

      <InteriorCTA headline="Ready for High-Performance uPVC Windows?" onNavigate={onNavigate} />
    </div>
  );
};

/* ============================================================
   2. TECHNICAL DESIGN CATALOGUES (NO MARKETING HERO!)
   ============================================================ */
export const UpvcCasementPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>
          ✨ Want to customize frame colours, acoustic glass & test opening kinematics?
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#/products/window-studio?product=upvc&type=casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=upvc&type=casement"); }} className="btn-fsq-primary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            VIEW IN WINDOW STUDIO →
          </a>
          <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            Glass Guide
          </a>
        </div>
      </div>
    </div>
    <DesignSection
      heading="CASEMENT UPVC WINDOWS DESIGNS"
      subtitle="Hover over the windows to experience how they open and close."
      designs={upvcCasementDesigns}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Customise Your uPVC Windows" onNavigate={onNavigate} />
  </div>
);

export const UpvcSlidingPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>
          ✨ Experience multi-track sliding physics and live laminate finishes.
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#/products/window-studio?product=upvc&type=sliding" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=upvc&type=sliding"); }} className="btn-fsq-primary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            VIEW IN WINDOW STUDIO →
          </a>
          <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            Glass Guide
          </a>
        </div>
      </div>
    </div>
    <DesignSection
      heading="SLIDING UPVC WINDOWS DESIGNS"
      subtitle="Hover over the windows to experience how they slide open."
      designs={upvcSlidingDesigns}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Order Custom Sliding Windows" onNavigate={onNavigate} />
  </div>
);

export const UpvcTiltTurnPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>
          ✨ Test European tilt ventilation and full inward swing kinematics.
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#/products/window-studio?product=upvc&type=tilt-turn" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=upvc&type=tilt-turn"); }} className="btn-fsq-primary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            VIEW IN WINDOW STUDIO →
          </a>
          <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            Glass Guide
          </a>
        </div>
      </div>
    </div>
    <DesignSection
      heading="TILT & TURN UPVC WINDOWS DESIGNS"
      subtitle="Hover over the windows to experience how they tilt inwards."
      designs={upvcTiltTurnDesigns}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Explore European Tilt & Turn Systems" onNavigate={onNavigate} />
  </div>
);

export const UpvcColoursPage = ({ onNavigate }) => (
  <div>
    <ColourPreviewSection isDoor={false} onNavigate={onNavigate} />
    <InteriorCTA headline="Request Physical Laminate Swatches" onNavigate={onNavigate} />
  </div>
);

/* ============================================================
   3. UPVC DOORS - MARKETING OVERVIEW PAGE (/products/upvc-doors)
   ============================================================ */
export const UpvcDoorsOverviewPage = ({ onNavigate }) => {
  return (
    <div>
      <section style={{ position: "relative", padding: "90px 24px", background: "linear-gradient(180deg, #0d2130, #132f45)", color: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "999px", background: "rgba(13,110,170,0.3)", border: "1px solid #0d6eaa", color: "#8bd1fb", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            GRAND ENTRANCES & BALCONY DOORS
          </span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: "600", margin: "0 0 18px", lineHeight: "1.12", letterSpacing: "-0.02em" }}>
            uPVC Door Systems
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: "0 auto 32px", maxWidth: "720px" }}>
            Heavy-duty multi-point locking doors engineered with reinforced steel profiles, low-profile thresholds, and expansive panoramic glass spans.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/products/upvc-doors/casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc-doors/casement"); }} className="btn-fsq-primary">
              View Casement Doors
            </a>
            <a href="/products/upvc-doors/slide-fold" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc-doors/slide-fold"); }} className="btn-fsq-secondary">
              Slide & Fold Accordion Doors
            </a>
          </div>
        </div>
      </section>

      {/* 6-Item Feature Strip */}
      <section style={{ background: "#0d2137", color: "#ffffff", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", textAlign: "center" }}>
          {[
            { strong: "1.2m Width", span: "Max Single Leaf Span" },
            { strong: "Multi-Point", span: "High Security Locking" },
            { strong: "Toughened", span: "Safety Glazing Glass" },
            { strong: "Low Threshold", span: "Wheelchair Accessible" },
            { strong: "100% Opening", span: "Slide & Fold Systems" },
            { strong: "20 Years", span: "Warranty Protection" }
          ].map((stat, idx) => (
            <div key={idx} style={{ borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.12)" : "none", padding: "10px" }}>
              <strong style={{ display: "block", color: "#8bd1fb", fontSize: "1.35rem", fontFamily: "Outfit, sans-serif" }}>{stat.strong}</strong>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{stat.span}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Casement Doors Section */}
      <section style={{ padding: "80px 0", background: "#f9fcfd" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>01. CASEMENT & FRENCH DOORS</span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.2rem", fontWeight: "400", color: "#1a2a3a", margin: "10px 0 16px" }}>
              Grand French Doors & Balcony Entrances
            </h2>
            <p style={{ color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 20px" }}>
              Inside and outside opening casement doors built with reinforced sashes, multi-point locking pins, and optional top arch fixed lites.
            </p>
            <a href="/products/upvc-doors/casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc-doors/casement"); }} className="btn-fsq-primary">
              View Casement Door Designs →
            </a>
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 16px 40px rgba(13,33,48,0.1)" }}>
            <img src="/assets/product-upvc.png" alt="Casement Doors" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Slide & Fold Doors Section */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
          <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 16px 40px rgba(13,33,48,0.1)" }}>
            <img src="/assets/product-sliding.png" alt="Slide & Fold Doors" style={{ width: "100%", height: "380px", objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>02. ACCORDION BI-FOLD DOORS</span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2.2rem", fontWeight: "400", color: "#1a2a3a", margin: "10px 0 16px" }}>
              100% Unobstructed Openings
            </h2>
            <p style={{ color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 20px" }}>
              Multiple door panels slide and concertina-fold neatly against the wall, creating seamless indoor-outdoor living transitions for patios and gardens.
            </p>
            <a href="/products/upvc-doors/slide-fold" onClick={(e) => { e.preventDefault(); onNavigate("/products/upvc-doors/slide-fold"); }} className="btn-fsq-primary">
              View Slide & Fold Designs →
            </a>
          </div>
        </div>
      </section>

      <InteriorCTA headline="Design Your Custom uPVC Doors" onNavigate={onNavigate} />
    </div>
  );
};

export const UpvcDoorsCasementPage = ({ onNavigate }) => (
  <div>
    <DesignSection
      heading="CASEMENT UPVC DOORS DESIGNS"
      subtitle="Hover over the doors to experience how they open and swing."
      designs={upvcDoorsCasementDesigns}
      isDoor={true}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Design Your Grand French Doors" onNavigate={onNavigate} />
  </div>
);

export const UpvcDoorsSlidingPage = ({ onNavigate }) => (
  <div>
    <DesignSection
      heading="SLIDING UPVC DOORS DESIGNS"
      subtitle="Hover over the doors to experience how they slide open and close."
      designs={upvcDoorsSlidingDesigns}
      isDoor={true}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Get a Free Sliding Door Quote" onNavigate={onNavigate} />
  </div>
);

export const UpvcDoorsSlideFoldPage = ({ onNavigate }) => (
  <div>
    <DesignSection
      heading="SLIDE & FOLD UPVC DOORS DESIGNS"
      subtitle="Hover over the doors to experience how they slide, accordion fold, and open completely."
      designs={upvcDoorsFoldDesigns}
      isDoor={true}
    />
    <TechnicalProfileSelection isAluminium={false} />
    <InteriorCTA headline="Transform Patios with Slide & Fold Doors" onNavigate={onNavigate} />
  </div>
);

export const UpvcDoorsColoursPage = ({ onNavigate }) => (
  <div>
    <ColourPreviewSection isDoor={true} onNavigate={onNavigate} />
    <InteriorCTA headline="Request Door Colour Samples" onNavigate={onNavigate} />
  </div>
);

/* ============================================================
   4. ALUMINIUM - MARKETING OVERVIEW PAGE (/products/aluminium)
   ============================================================ */
export const AluminiumOverviewPage = ({ onNavigate }) => {
  return (
    <div>
      <section style={{ position: "relative", padding: "90px 24px", background: "linear-gradient(180deg, #1e293b, #0f172a)", color: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "999px", background: "rgba(100,116,139,0.3)", border: "1px solid #94a3b8", color: "#e2e8f0", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            ARCHITECTURAL ALUMINIUM SYSTEMS
          </span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: "600", margin: "0 0 18px", lineHeight: "1.12", letterSpacing: "-0.02em" }}>
            Slender Sightlines. Heavy Engineering.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: "0 auto 32px", maxWidth: "720px" }}>
            High-tensile 6063-T6 architectural aluminium systems featuring ultra-slim interlocks, thermal breaks, 5500 Pa wind resistance, and 25-year surface coating warranties.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#/products/window-studio?product=aluminium" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=aluminium"); }} className="btn-fsq-primary">
              Open 3D Window Studio
            </a>
            <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary">
              Explore Glass Options
            </a>
            <a href="/products/aluminium/sliding" onClick={(e) => { e.preventDefault(); onNavigate("/products/aluminium/sliding"); }} className="btn-fsq-secondary">
              Explore Aluminium Sliders
            </a>
            <a href="/products/aluminium/casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/aluminium/casement"); }} className="btn-fsq-secondary">
              Explore Aluminium Casement
            </a>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section style={{ background: "#0f172a", color: "#ffffff", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", textAlign: "center" }}>
          {[
            { strong: "6063-T6", span: "Architectural Grade Alloy" },
            { strong: "18 mm", span: "Ultra-Slim Sightlines" },
            { strong: "5500 Pa", span: "Extreme Wind-Load Rating" },
            { strong: "3.5 Meter", span: "Max Single Sash Height" },
            { strong: "Qualicoat II", span: "Seaside Certified Coating" },
            { strong: "25 Years", span: "Surface Finish Warranty" }
          ].map((stat, idx) => (
            <div key={idx} style={{ borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.12)" : "none", padding: "10px" }}>
              <strong style={{ display: "block", color: "#94a3b8", fontSize: "1.35rem", fontFamily: "Outfit, sans-serif" }}>{stat.strong}</strong>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{stat.span}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Lines Overview */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", fontWeight: "300", color: "#333", textTransform: "uppercase" }}>
              ALUMINIUM SYSTEM SERIES
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "16px 0 20px" }}>
              <span style={{ width: "60px", height: "2px", background: "#0d6eaa" }} />
              <span style={{ width: "12px", height: "12px", border: "2px solid #0d6eaa", transform: "rotate(45deg)", background: "transparent" }} />
              <span style={{ width: "60px", height: "2px", background: "#0d6eaa" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
            {[
              { name: "Graf 26 & 32 Series", desc: "Slender residential sliding systems with integrated flyscreens and concealed drainage.", link: "/products/aluminium/sliding" },
              { name: "Livio Minimal Series", desc: "Ultra-slim 18mm interlocks for boundary-free panoramic vistas in penthouses and villas.", link: "/products/aluminium/sliding" },
              { name: "Robus 40 System", desc: "Heavy-duty structural casement and folding systems for oversized architectural facades.", link: "/products/aluminium/casement" }
            ].map((sys, idx) => (
              <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.3rem", color: "#1a2a3a", margin: "0 0 10px" }}>{sys.name}</h3>
                <p style={{ fontSize: "0.88rem", color: "#4a5c6a", lineHeight: "1.6", margin: "0 0 20px" }}>{sys.desc}</p>
                <a href={sys.link} onClick={(e) => { e.preventDefault(); onNavigate(sys.link); }} style={{ color: "#0d6eaa", fontWeight: "600", fontSize: "0.85rem", textDecoration: "none" }}>
                  View Design Models →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Profile Specs */}
      <TechnicalProfileSelection isAluminium={true} />

      <InteriorCTA headline="Request Aluminium Fenestration Quote" onNavigate={onNavigate} />
    </div>
  );
};

export const AluminiumCasementPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>
          ✨ Experience realistic 3D aluminium casement kinematics, powder coat swatches, and architectural glazing.
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#/products/window-studio?product=aluminium&type=casement" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=aluminium&type=casement"); }} className="btn-fsq-primary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            VIEW IN WINDOW STUDIO →
          </a>
          <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            Glass Guide
          </a>
        </div>
      </div>
    </div>
    <DesignSection
      heading="ALUMINIUM CASEMENT DESIGNS"
      subtitle="Hover over the windows to experience how they open with premium brushed-aluminium casings."
      designs={aluminiumCasementDesigns}
    />
    <TechnicalProfileSelection isAluminium={true} />
    <InteriorCTA headline="Request Aluminium Fenestration Quote" onNavigate={onNavigate} />
  </div>
);

export const AluminiumSlidingPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>
          ✨ Experience multi-track sliding physics, brushed anodized finishes, and acoustic DGU glazing.
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#/products/window-studio?product=aluminium&type=sliding" onClick={(e) => { e.preventDefault(); onNavigate("/products/window-studio?product=aluminium&type=sliding"); }} className="btn-fsq-primary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            VIEW IN WINDOW STUDIO →
          </a>
          <a href="/products/glass" onClick={(e) => { e.preventDefault(); onNavigate("/products/glass"); }} className="btn-fsq-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", textDecoration: "none" }}>
            Glass Guide
          </a>
        </div>
      </div>
    </div>
    <DesignSection
      heading="ALUMINIUM SLIDING DESIGNS"
      subtitle="Hover over the windows to experience how they slide open."
      designs={aluminiumSlidingDesigns}
    />
    <TechnicalProfileSelection isAluminium={true} />
    <InteriorCTA headline="Explore Minimalist Aluminium Sliders" onNavigate={onNavigate} />
  </div>
);

export const AluminiumColoursPage = ({ onNavigate }) => (
  <div>
    <AluminiumColoursSection onNavigate={onNavigate} />
    <TechnicalProfileSelection isAluminium={true} />
    <InteriorCTA headline="Request Custom Aluminium Finish Consultation" onNavigate={onNavigate} />
  </div>
);

