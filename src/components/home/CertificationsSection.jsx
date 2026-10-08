import React from "react";

export const CertificationsSection = ({ onNavigate }) => {
  const seals = [
    {
      mark: "SKZ",
      org: "SKZ-Germany",
      title: "Weathering & Material Durability",
      tests: ["25,000+ Hrs Extreme Xenon Weathering", "Charpy Impact Strength Test", "Vicat Softening Temperature", "Flexural Modulus of Elasticity"]
    },
    {
      mark: "BSI",
      org: "BSI-UK",
      title: "Structural & Air Tightness",
      tests: ["Air Permeability Class 4", "Water Tightness Class 9A", "Wind-Load 1500–5500 Pa", "Corner Weld Joint 25.32 MPa"]
    },
    {
      mark: "SGS",
      org: "SGS RoHS",
      title: "100% Lead-Free & Eco Compliance",
      tests: ["Zero Heavy Metals (Pb, Cd, Hg)", "Non-Hazardous Ecofriendly formulation", "Food-Grade Polymer Purity", "100% Recyclable Lifecycle"]
    },
    {
      mark: "CIPET",
      org: "CIPET India",
      title: "National Plastics Technology",
      tests: ["Tensile Impact Resistance", "Density & Specific Gravity", "Heat Reversion Standard", "Dimensional Stability"]
    },
    {
      mark: "ISO",
      org: "ISO 9001:2015",
      title: "Quality Management Certified",
      tests: ["Standardized Manufacturing", "Traceable Raw Material Batching", "Stringent Multi-Point Factory QC", "Consistent Installation QA"]
    },
    {
      mark: "ALU",
      org: "Qualicoat Seaside",
      title: "25-Yr Surface Protection",
      tests: ["6063-T6 Virgin Alloy Purity", "Electrostatic Powder Coating", "Durasol Marine Coating", "5,500 Pa High-Rise Certified"]
    }
  ];

  return (
    <section style={{ padding: "95px 0", background: "#ffffff" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "48px", alignItems: "end", marginBottom: "48px" }} className="cert-head-grid">
          <div>
            <span className="badge">Accreditations &amp; Testing</span>
            <h2 className="section-title" style={{ margin: "14px 0 0" }}>
              Independently Tested. <br />
              <span className="text-gradient">Globally Certified.</span>
            </h2>
          </div>
          <p className="section-copy" style={{ margin: 0 }}>
            Every Four Square profile is backed by accredited laboratory test reports from SKZ-Germany, BSI-UK, SGS, and CIPET, guaranteeing decades of unwavering structural integrity and weather resistance.
          </p>
        </div>

        {/* 6 Certification Seals Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }} className="cert-seals-grid">
          {seals.map((s, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                padding: "32px 28px",
                background: "#ffffff",
                border: "1px solid #d8e5ec",
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(13, 55, 79, 0.06)",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}
              className="cert-seal-card"
            >
              {/* Badge Stamp Mark */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  border: "3px double #0d6eaa",
                  color: "#0d6eaa",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  marginBottom: "16px",
                  background: "rgba(13, 110, 170, 0.05)"
                }}
              >
                {s.mark}
              </div>

              <span style={{ fontSize: "0.72rem", fontWeight: "700", color: "#0d6eaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.org}
              </span>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.15rem", color: "#172737", margin: "6px 0 14px", fontWeight: "600" }}>
                {s.title}
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px" }}>
                {s.tests.map((t, tidx) => (
                  <div
                    key={tidx}
                    style={{
                      fontSize: "0.74rem",
                      color: "#4d6574",
                      padding: "6px 10px",
                      background: "#edf5f9",
                      borderRadius: "6px",
                      lineHeight: "1.4"
                    }}
                  >
                    ✓ {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Link to Downloads */}
        <div
          style={{
            marginTop: "36px",
            padding: "22px 28px",
            background: "#0d2137",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            borderRadius: "12px"
          }}
        >
          <div>
            <strong style={{ color: "#8bd1fb", fontSize: "0.95rem" }}>Need the complete technical test dossiers?</strong>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", margin: "4px 0 0" }}>
              Download all 14 official laboratory certificates, weathering results, and warranty documentation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("/downloads")}
            className="btn btn-outline"
            style={{ borderColor: "#8bd1fb", color: "#ffffff", padding: "10px 20px", fontSize: "0.84rem" }}
          >
            Access Downloads Library →
          </button>
        </div>
      </div>

      <style>{`
        .cert-seal-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(13, 55, 79, 0.12);
        }
        @media (max-width: 992px) {
          .cert-head-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .cert-seals-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 576px) {
          .cert-seals-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
