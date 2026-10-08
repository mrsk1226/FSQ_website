import React, { useState } from "react";
import "./interiors.css";

export const InteriorMaterials = ({ materialGroups = [] }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  return (
    <section className="interior-section bg-warm">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">MATERIALS & FINISHES</span>
          <h2 className="interior-title">Engineered Materials. Enduring Finishes.</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            We use verified BWP Grade Plywood (IS 710 / IS 1734 compliant with 100% hardwood core), contemporary matte and acrylic finishes, durable quartz countertops, and precision hardware. Click any material below to inspect full specifications.
          </p>
        </div>

        {materialGroups.map((group, gIdx) => (
          <div key={gIdx} style={{ marginBottom: "50px" }}>
            <div style={{ marginBottom: "20px", borderBottom: "2px solid #0d6eaa", paddingBottom: "10px" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem", color: "#1a2a3a", margin: 0 }}>
                {group.category}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#666", margin: "4px 0 0" }}>{group.subtitle}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "22px" }}>
              {group.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="category-card span-third"
                  style={{
                    minHeight: "auto",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                    border: selectedMaterial?.name === item.name ? "2px solid #0d6eaa" : "1px solid #ebdcd0"
                  }}
                  onClick={() => setSelectedMaterial(item)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedMaterial(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${item.name}`}
                >
                  <div style={{ position: "relative", height: "180px", overflow: "hidden", backgroundColor: item.color || "#c9a06e" }}>
                    {item.badge && (
                      <span className="category-card-badge">{item.badge}</span>
                    )}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                  <div className="category-card-body" style={{ padding: "20px" }}>
                    <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.1rem", margin: "0 0 8px", color: "#1a2a3a" }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#4a5c6a", margin: "0 0 12px", lineHeight: "1.5" }}>
                      {item.description}
                    </p>
                    {item.bestFor && (
                      <div style={{ fontSize: "0.78rem", color: "#0d6eaa", fontWeight: "600", marginBottom: "8px" }}>
                        Best For: <span style={{ color: "#4a5c6a", fontWeight: "400" }}>{item.bestFor}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>
                      <span style={{ fontSize: "0.78rem", color: "#0d6eaa", fontWeight: "600" }}>View Properties</span>
                      <span style={{ color: "#0d6eaa" }}>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Selected Material Detail Modal / Card */}
        {selectedMaterial && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(13, 33, 48, 0.75)",
              backdropFilter: "blur(6px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={() => setSelectedMaterial(null)}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                maxWidth: "600px",
                width: "100%",
                padding: "36px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMaterial(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "#f0f4f8",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a2a3a"
                }}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                {selectedMaterial.badge && (
                  <span className="interior-eyebrow" style={{ margin: 0 }}>
                    {selectedMaterial.badge}
                  </span>
                )}
                <span style={{ fontSize: "0.82rem", color: "#0d6eaa", fontWeight: "600" }}>
                  Verified Material
                </span>
              </div>

              <h3 style={{ fontFamily: "Outfit, Poppins, sans-serif", fontSize: "1.8rem", color: "#1a2a3a", margin: "0 0 12px" }}>
                {selectedMaterial.name}
              </h3>

              <p style={{ fontSize: "0.95rem", color: "#4a5c6a", lineHeight: "1.6", margin: "0 0 20px" }}>
                {selectedMaterial.description}
              </p>

              {selectedMaterial.bestFor && (
                <div style={{ background: "#f8f9fa", padding: "14px 18px", borderRadius: "10px", marginBottom: "20px", borderLeft: "4px solid #0d6eaa" }}>
                  <strong style={{ color: "#1a2a3a", fontSize: "0.88rem" }}>Recommended Applications:</strong>
                  <p style={{ margin: "4px 0 0", color: "#4a5c6a", fontSize: "0.88rem" }}>{selectedMaterial.bestFor}</p>
                </div>
              )}

              {selectedMaterial.properties && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "0.95rem", color: "#1a2a3a", marginBottom: "10px", fontWeight: "600" }}>
                    Key Performance Attributes:
                  </h4>
                  <ul style={{ paddingLeft: "20px", margin: 0, color: "#4a5c6a", fontSize: "0.88rem", lineHeight: "1.8" }}>
                    {selectedMaterial.properties.map((prop, pIdx) => (
                      <li key={pIdx}>{prop}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #eef2f5" }}>
                <a
                  href="/contact"
                  className="btn-fsq-primary"
                  style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
                  onClick={() => setSelectedMaterial(null)}
                >
                  Request Swatch Sample
                </a>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="btn-fsq-outline"
                  style={{ flex: 1 }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const InteriorConsultation = ({ onNavigate }) => {
  const options = [
    {
      title: "Showroom Experience",
      subtitle: "Touch real materials & explore full-scale modular kitchens in Erode.",
      desc: "Walk through complete kitchen layouts, test soft-close drawers, feel veneer textures, and discuss your floor plans with our senior designers.",
      badge: "In-Person Experience",
      action: "Visit Showroom"
    },
    {
      title: "Virtual Video Design Session",
      subtitle: "Consult with our design architects from the comfort of your home.",
      desc: "Share your floor plan PDF or builder drawings over a video call. Review 3D concepts, layout advice, and estimated pricing live on screen.",
      badge: "Virtual Consultation",
      action: "Book Online Session"
    },
    {
      title: "On-Site Expert Measurement",
      subtitle: "Precision measurement survey at your construction / apartment site.",
      desc: "Our technical team inspects site electrical points, plumbing lines, wall levels, and verifies all dimensions before design drafting.",
      badge: "Site Visit",
      action: "Request Site Survey"
    }
  ];

  return (
    <section className="interior-section bg-linen">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">CONSULTATION OPTIONS</span>
          <h2 className="interior-title">Plan Your Interiors with Our Experts</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            Choose how you wish to connect with our interior design team. We offer showroom walkthroughs, online video consultations, and on-site measurement surveys.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "26px" }}>
          {options.map((opt, idx) => (
            <div key={idx} className="category-card span-third" style={{ minHeight: "auto" }}>
              <div className="category-card-body" style={{ padding: "32px 26px", height: "100%", justifyContent: "space-between" }}>
                <div>
                  <span className="interior-eyebrow" style={{ marginBottom: "12px" }}>{opt.badge}</span>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem", margin: "0 0 10px", color: "#1a2a3a" }}>
                    {opt.title}
                  </h3>
                  <h4 style={{ color: "#0d6eaa", fontSize: "0.88rem", fontWeight: "600", margin: "0 0 12px" }}>
                    {opt.subtitle}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "#4a5c6a", lineHeight: "1.55", margin: 0 }}>
                    {opt.desc}
                  </p>
                </div>
                <div style={{ marginTop: "24px" }}>
                  <a
                    href="/contact"
                    className="btn-fsq-primary"
                    style={{ width: "100%", boxSizing: "border-box" }}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate("/contact");
                      }
                    }}
                  >
                    {opt.action}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InteriorWarranty = ({ config }) => {
  const { heading, subtitle, points = [] } = config || {};

  return (
    <section className="interior-section bg-dark">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow on-dark">RELIABILITY & CARE</span>
          <h2 className="interior-title">{heading || "Built to Stay Beautiful"}</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" style={{ background: "#8bd1fb" }} />
            <span className="interior-divider-diamond" style={{ borderColor: "#8bd1fb" }} />
            <span className="interior-divider-line" style={{ background: "#8bd1fb" }} />
          </div>
          <p className="interior-subtitle">{subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {points.map((pt, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                padding: "28px 24px"
              }}
            >
              <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.15rem", color: "#8bd1fb", margin: "0 0 10px" }}>
                {pt.title}
              </h4>
              <p style={{ fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: "1.6", margin: 0 }}>
                {pt.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorMaterials;
