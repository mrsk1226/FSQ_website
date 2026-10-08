import React from "react";
import { InteriorCTA } from "../components/interiors/index.js";

export const ProductsLandingPage = ({ onNavigate }) => {
  const categories = [
    {
      id: "interiors",
      eyebrow: "DIVISION 01",
      title: "Complete Home Interiors",
      desc: "Turnkey residential interior architecture covering modular kitchens, bespoke wardrobes, living feature walls, and bedroom suites with automated factory precision.",
      image: "/assets/story-interiors.png",
      link: "/products/interiors",
      badges: ["Modular Kitchen", "Full Home", "Living Room", "Bedrooms"],
      stats: "100% BWP Moisture-Resistant · Factory Precision",
      sublinks: [
        { label: "Full Home Interiors", path: "/products/interiors/full-home" },
        { label: "Modular Kitchen", path: "/products/interiors/kitchen" },
        { label: "Living Room", path: "/products/interiors/living-room" },
        { label: "Bedroom", path: "/products/interiors/bedroom" }
      ]
    },
    {
      id: "upvc-windows",
      eyebrow: "DIVISION 02",
      title: "uPVC Windows",
      desc: "Precision German-engineered multi-chambered window profiles offering up to 40 dB acoustic insulation, 25,000+ hours weather endurance, and 20-year profile warranties.",
      image: "/assets/product-upvc.png",
      link: "/products/upvc",
      badges: ["26 Casement Designs", "Multi-Track Sliding", "Tilt & Turn", "20+ Laminates"],
      stats: "40 dB Acoustic Insulation · SKZ Germany Certified",
      sublinks: [
        { label: "Casement Windows (26 Designs)", path: "/products/upvc/casement" },
        { label: "Sliding Windows", path: "/products/upvc/sliding" },
        { label: "Tilt & Turn Windows", path: "/products/upvc/tilt-turn" },
        { label: "Colour Options", path: "/products/upvc/colours" }
      ]
    },
    {
      id: "upvc-doors",
      eyebrow: "DIVISION 03",
      title: "uPVC Doors",
      desc: "Heavy-duty entrance, French balcony, panoramic sliding, and concertina slide-and-fold doors with steel-reinforced sashes and low-profile barrier-free thresholds.",
      image: "/assets/product-sliding.png",
      link: "/products/upvc-doors",
      badges: ["Casement Doors", "Panoramic Sliding", "Slide & Fold", "French Doors"],
      stats: "Multi-Point Security Locking · 100% Clear Openings",
      sublinks: [
        { label: "Casement uPVC Doors", path: "/products/upvc-doors/casement" },
        { label: "Sliding uPVC Doors", path: "/products/upvc-doors/sliding" },
        { label: "Slide & Fold Doors", path: "/products/upvc-doors/slide-fold" },
        { label: "Door Colours", path: "/products/upvc-doors/colours" }
      ]
    },
    {
      id: "aluminium",
      eyebrow: "DIVISION 04",
      title: "Architectural Aluminium Systems",
      desc: "Slender 6063-T6 architectural aluminium systems (Graf, Livio Minimal, Robus) featuring ultra-slim 18mm interlocks, 5500 Pa wind resistance, and 25-year surface coating warranties.",
      image: "/assets/product-aluminium.png",
      link: "/products/aluminium",
      badges: ["Livio 18mm Minimal", "Graf 26 / 32 / 45", "Robus 40", "15+ Finishes"],
      stats: "5500 Pa Wind Rating · Qualicoat II Seaside Certified",
      sublinks: [
        { label: "Sliding Systems", path: "/products/aluminium/sliding" },
        { label: "Casement Systems", path: "/products/aluminium/casement" },
        { label: "Aluminium Colours", path: "/products/aluminium/colours" }
      ]
    }
  ];

  return (
    <div className="products-landing-page" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* 1. Hero */}
      <section
        style={{
          padding: "90px 24px",
          background: "linear-gradient(180deg, #0d2130 0%, #132f45 100%)",
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: "999px",
              background: "rgba(13, 110, 170, 0.3)",
              border: "1px solid #0d6eaa",
              color: "#8bd1fb",
              fontSize: "0.76rem",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "18px"
            }}
          >
            Four Square Architectural Portfolio
          </span>
          <h1
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: "600",
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              margin: "0 0 18px",
              color: "#ffffff"
            }}
          >
            Engineered Fenestration &amp; <span style={{ color: "#1a8fd1" }}>Complete Interiors</span>
          </h1>
          <p
            style={{
              fontSize: "1.08rem",
              color: "rgba(255, 255, 255, 0.88)",
              lineHeight: "1.7",
              margin: "0 auto 32px",
              maxWidth: "760px"
            }}
          >
            Explore our integrated product verticals: complete residential interiors, precision German-engineered uPVC windows and doors, and slim architectural aluminium systems.
          </p>
        </div>
      </section>

      {/* 2. Key Specs Strip */}
      <section style={{ background: "#0d2137", color: "#ffffff", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
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
          className="products-stats-grid"
        >
          {[
            { strong: "20-Yr", span: "Product Warranty" },
            { strong: "25,000 hrs", span: "SKZ Weather Tested" },
            { strong: "5500 Pa", span: "Wind Load Rating" },
            { strong: "100%", span: "Lead-Free & Eco" },
            { strong: "100+", span: "Colours & Finishes" },
            { strong: "1", span: "Flagship Showroom (Erode)" }
          ].map((item, idx) => (
            <div key={idx} style={{ borderRight: idx < 5 ? "1px solid rgba(255,255,255,0.12)" : "none", padding: "10px" }} className="prod-stat-box">
              <strong style={{ display: "block", color: "#8bd1fb", fontSize: "1.35rem", fontFamily: "'Outfit', sans-serif" }}>
                {item.strong}
              </strong>
              <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {item.span}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Four Core Category Showcase Cards */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#0d6eaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              SELECT PRODUCT VERTICAL
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: "600", color: "#1a2a3a", margin: "8px 0 14px" }}>
              Explore Our Product Divisions
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", margin: "0 auto" }}>
              <span style={{ width: "50px", height: "2px", background: "#0d6eaa" }} />
              <span style={{ width: "10px", height: "10px", border: "2px solid #0d6eaa", transform: "rotate(45deg)" }} />
              <span style={{ width: "50px", height: "2px", background: "#0d6eaa" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }} className="products-cat-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #dfe7ec",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(13,33,48,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                className="prod-cat-card"
              >
                <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "rgba(13, 33, 48, 0.85)",
                      color: "#8bd1fb",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      letterSpacing: "0.08em"
                    }}
                  >
                    {cat.eyebrow}
                  </div>
                </div>

                <div style={{ padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.45rem", fontWeight: "600", color: "#1a2a3a", margin: "0 0 10px" }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#4a5c6a", lineHeight: "1.65", margin: "0 0 18px" }}>
                    {cat.desc}
                  </p>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                    {cat.badges.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        style={{
                          fontSize: "0.76rem",
                          fontWeight: "600",
                          color: "#0d6eaa",
                          background: "rgba(13, 110, 170, 0.08)",
                          padding: "4px 10px",
                          borderRadius: "4px"
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px", marginTop: "auto" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "10px" }}>
                      Sub-categories &amp; Designs:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                      {cat.sublinks.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.path}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(sub.path);
                          }}
                          style={{
                            fontSize: "0.82rem",
                            color: "#4a5c6a",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            transition: "color 0.2s"
                          }}
                          className="sub-cat-link"
                        >
                          <span style={{ color: "#0d6eaa" }}>›</span> {sub.label}
                        </a>
                      ))}
                    </div>

                    <a
                      href={cat.link}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(cat.link);
                      }}
                      className="btn-fsq-primary"
                      style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}
                    >
                      Explore {cat.title} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Consultation CTA */}
      <InteriorCTA
        headline="Need Expert Assistance Choosing the Ideal Product?"
        subcopy="Share your floor plan or architectural drawings — our senior engineers in Erode will provide a detailed recommendation and quotation."
        onNavigate={onNavigate}
      />

      <style>{`
        .prod-cat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(13, 33, 48, 0.12) !important;
        }
        .sub-cat-link:hover {
          color: #0d6eaa !important;
          font-weight: 600;
        }
        @media (max-width: 992px) {
          .products-cat-grid { grid-template-columns: 1fr !important; }
          .products-stats-grid { grid-template-columns: repeat(3, 1fr) !important; row-gap: 20px; }
          .prod-stat-box:nth-child(3n) { border-right: none !important; }
        }
        @media (max-width: 576px) {
          .products-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .prod-stat-box:nth-child(2n) { border-right: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductsLandingPage;
