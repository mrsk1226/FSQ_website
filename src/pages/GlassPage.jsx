import React from "react";
import GlassOptionsExplorer from "../components/design-diagrams/GlassOptionsExplorer.jsx";

/**
 * GlassPage Component (/products/glass)
 * Dedicated architectural glazing intelligence, interactive visualizer, and comparison guide.
 */
export const GlassPage = ({ onNavigate }) => {
  return (
    <div className="glass-page-root">
      {/* 1. Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "95px 24px 80px",
          background: "linear-gradient(180deg, #0d2130 0%, #132f45 60%, #0d2130 100%)",
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(13, 110, 170, 0.3)",
              border: "1px solid #0d6eaa",
              color: "#8bd1fb",
              fontSize: "0.75rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}
          >
            PRECISION GLAZING SCIENCE
          </span>
          <h1
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: "600",
              margin: "0 0 18px",
              lineHeight: "1.12",
              letterSpacing: "-0.02em"
            }}
          >
            Architectural Glass Solutions
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: "1.65",
              margin: "0 auto 32px",
              maxWidth: "760px"
            }}
          >
            High-performance glazing systems engineered in compliance with international standards. Delivering up to 40 dB acoustic isolation, 30% air-conditioning savings, and advanced solar heat rejection.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#/products/window-studio"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("/products/window-studio");
              }}
              className="btn-fsq-primary"
              style={{ textDecoration: "none" }}
            >
              Open 3D Window Studio →
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate("/contact");
              }}
              className="btn-fsq-secondary"
              style={{ textDecoration: "none" }}
            >
              Consult Glass Specialist in Erode
            </a>
          </div>
        </div>
      </section>

      {/* 2. 6-Item Credential Band */}
      <section
        style={{
          background: "#0d2137",
          color: "#ffffff",
          padding: "20px 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "16px",
            textAlign: "center"
          }}
          className="glass-stat-strip"
        >
          {[
            { strong: "Up to 40 dB", span: "Acoustic Attenuation" },
            { strong: "30% Lower", span: "AC Energy Loss" },
            { strong: "5× Stronger", span: "Toughened Safety" },
            { strong: ">99% Block", span: "Harmful UV Rejection" },
            { strong: "Zero Mist", span: "Dual-Seal DGU Spacers" },
            { strong: "Certified", span: "Saint-Gobain & Guardian" }
          ].map((st, idx) => (
            <div
              key={idx}
              style={{
                borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.12)" : "none",
                padding: "8px"
              }}
            >
              <strong style={{ display: "block", color: "#8bd1fb", fontSize: "1.25rem", fontFamily: "Outfit, sans-serif" }}>
                {st.strong}
              </strong>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)" }}>{st.span}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Embedded Interactive Glass Explorer & Qualitative Matrix */}
      <GlassOptionsExplorer onNavigate={onNavigate} />

      {/* 4. Educational Guide & Glazing Architecture */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              GLAZING ARCHITECTURE FAQ
            </span>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", color: "#1a2a3a", margin: "10px 0" }}>
              Choosing the Right Glass for Every Room
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div style={{ background: "#f8fafc", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", color: "#0d6eaa", margin: "0 0 10px" }}>
                Single Glazing (SGU) vs Double Glazing (DGU)
              </h3>
              <p style={{ color: "#4a5c6a", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                Single glazed units (4mm to 8mm) are cost-effective for internal partitions and low-heat North/East windows. Double Glazed Units (DGU) sandwich a dehydrated air or argon gas pocket between two panes, stopping up to 30% of conduction heat transfer and making indoor air conditioning dramatically more efficient.
              </p>
            </div>

            <div style={{ background: "#f8fafc", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", color: "#0d6eaa", margin: "0 0 10px" }}>
                When is Toughened Glass Mandatory?
              </h3>
              <p style={{ color: "#4a5c6a", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                Indian building codes and European fenestration safety standards mandate toughened safety glass for any glazed opening within 800mm of the finished floor level (cill level), all sliding patio doors, French balcony doors, and bathroom shower screens to prevent catastrophic injury.
              </p>
            </div>

            <div style={{ background: "#f8fafc", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", color: "#0d6eaa", margin: "0 0 10px" }}>
                How Does Acoustic Laminated Glass Block Sound?
              </h3>
              <p style={{ color: "#4a5c6a", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                Glass naturally resonates with street traffic and horn frequencies. Acoustic PVB (Polyvinyl Butyral) interlayers decouple the two glass sheets, absorbing acoustic vibration waves and reducing exterior noise perception by up to 75% (38 dB to 40 dB attenuation).
              </p>
            </div>

            <div style={{ background: "#f8fafc", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", color: "#0d6eaa", margin: "0 0 10px" }}>
                How Does Low-E Coating Prevent Solar Heat Gain?
              </h3>
              <p style={{ color: "#4a5c6a", fontSize: "0.92rem", lineHeight: "1.65", margin: 0 }}>
                Low-E (Low Emissivity) coatings use microscopically thin transparent silver layers that let visible sunlight pass through while reflecting the invisible infrared heat spectrum back outside, preventing the room from turning into a greenhouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Consultation Banner */}
      <section style={{ padding: "70px 0", background: "linear-gradient(135deg, #0d2130, #132f45)", color: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", margin: "0 0 16px" }}>
            Need Glass Calculation for Your Architecture?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", lineHeight: "1.65", margin: "0 0 28px" }}>
            Visit our Flagship Experience Centre on Perundurai Road, Erode to inspect physical glass samples, light transmission mock-ups, and acoustic demo units.
          </p>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate("/contact");
            }}
            className="btn-fsq-primary"
            style={{ textDecoration: "none", padding: "14px 32px" }}
          >
            Book Free Technical Consultation →
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .glass-stat-strip {
            grid-template-columns: repeat(3, 1fr) !important;
            row-gap: 16px;
          }
        }
        @media (max-width: 576px) {
          .glass-stat-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GlassPage;
