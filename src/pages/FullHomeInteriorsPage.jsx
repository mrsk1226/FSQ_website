import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorProcess,
  InteriorWhyUs,
  InteriorWarranty,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  interiorCategories,
  processSteps,
  whyChooseUs,
  warrantyConfig
} from "../data/interiors/index.js";

export const FullHomeInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="full-home-interiors-page">
      <InteriorHero
        eyebrow="TURNKEY RESIDENTIAL INTERIORS"
        title="Full Home Interiors. Seamless & Turnkey."
        lede="Complete room-by-room interior execution covering Kitchen, Bedrooms, Wardrobes, Living, Pooja, and Dining spaces under single-point accountability."
        bgImage="/assets/story-interiors.png"
        pills={["Moisture-Resistant Boards", "Quality Hardware", "3D Visualisation", "Factory Precision"]}
        primaryBtnText="Book Design Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Room Scope"
        secondaryBtnLink="#room-scope"
        onNavigate={onNavigate}
      />

      {/* Complete Home Overview */}
      <section id="room-scope" className="interior-section bg-warm">
        <div className="interior-container">
          <div className="interior-section-header">
            <span className="interior-eyebrow">COMPLETE SCOPE</span>
            <h2 className="interior-title">Room-by-Room Interior Architecture</h2>
            <div className="interior-divider" aria-hidden="true">
              <span className="interior-divider-line" />
              <span className="interior-divider-diamond" />
              <span className="interior-divider-line" />
            </div>
            <p className="interior-subtitle">
              We design, manufacture, and assemble every element required for a fully finished, move-in-ready home.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "26px" }}>
            {interiorCategories.map((cat, idx) => (
              <div key={idx} className="category-card span-third" style={{ minHeight: "auto" }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div className="category-card-body" style={{ padding: "22px" }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", margin: "0 0 8px", color: "#1a2a3a" }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: "0.86rem", color: "#4a5c6a", margin: "0 0 14px", lineHeight: "1.5" }}>
                    {cat.description}
                  </p>
                  {cat.highlights && (
                    <ul style={{ paddingLeft: "18px", margin: "0 0 16px", fontSize: "0.8rem", color: "#666" }}>
                      {cat.highlights.map((h, hIdx) => (
                        <li key={hIdx} style={{ margin: "3px 0" }}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={cat.route}
                    className="category-card-link"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(cat.route);
                      }
                    }}
                  >
                    <span>View {cat.shortTitle} Details</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Manufacturing Focus */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="FACTORY PRECISION"
            title="Manufactured in Our Automated Facility"
            subtitle="Minimal on-site disturbance, precise cutting, and seamless assembly."
            description="All carcass boxes and shutters are precision-cut and sealed in our automated facility before arriving at your site. On-site work is strictly limited to clean, quiet assembly."
            features={[
              "Multi-point quality inspections before packaging",
              "Pre-drilled system holes for perfectly aligned shelf pins",
              "Clean on-site assembly by trained Four Square technicians",
              "Laser-level alignment ensuring perfect drawer and door gaps"
            ]}
            image="/assets/work-wood.png"
            reverse={false}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <InteriorWhyUs whyData={whyChooseUs} />

      {/* Process */}
      <InteriorProcess steps={processSteps} />

      {/* Warranty */}
      <InteriorWarranty config={warrantyConfig} />

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready to Plan Your Full Home Interiors?"
        subcopy="Meet our senior interior architects in Erode to review floor plans and discuss customized pricing."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default FullHomeInteriorsPage;
