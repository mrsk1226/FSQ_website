import React from "react";
import "./interiors.css";

export const InteriorProductGrid = ({
  eyebrow = "DESIGNS & CONFIGURATIONS",
  heading,
  subtitle,
  items = [],
  columns = 3,
  onNavigate
}) => {
  return (
    <section className="interior-section bg-warm">
      <div className="interior-container">
        <div className="interior-section-header">
          {eyebrow && <span className="interior-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="interior-title">{heading}</h2>}
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          {subtitle && <p className="interior-subtitle">{subtitle}</p>}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "28px"
          }}
        >
          {items.map((item, idx) => (
            <div key={item.id || idx} className="category-card span-third" style={{ minHeight: "auto" }}>
              <div className="category-card-media" style={{ minHeight: "220px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="category-card-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="category-card-body">
                <div>
                  <h3 className="category-card-title">{item.title}</h3>
                  {item.subtitle && (
                    <h4 style={{ color: "#0d6eaa", fontSize: "0.85rem", fontWeight: "600", margin: "0 0 8px" }}>
                      {item.subtitle}
                    </h4>
                  )}
                  <p className="category-card-desc">{item.description}</p>

                  {item.bestFor && (
                    <div style={{ margin: "10px 0", fontSize: "0.82rem", color: "#1a2a3a" }}>
                      <strong>Best For:</strong> <span style={{ color: "#4a5c6a" }}>{item.bestFor}</span>
                    </div>
                  )}

                  {item.storage && (
                    <div style={{ margin: "6px 0", fontSize: "0.82rem", color: "#1a2a3a" }}>
                      <strong>Storage:</strong> <span style={{ color: "#4a5c6a" }}>{item.storage}</span>
                    </div>
                  )}

                  {item.keyElements && (
                    <ul style={{ paddingLeft: "18px", margin: "12px 0 0", fontSize: "0.82rem", color: "#4a5c6a" }}>
                      {item.keyElements.slice(0, 3).map((el, eIdx) => (
                        <li key={eIdx} style={{ margin: "4px 0" }}>{el}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div style={{ marginTop: "18px" }}>
                  <a
                    href="/contact"
                    className="btn-fsq-outline"
                    style={{ width: "100%", padding: "10px 14px", fontSize: "0.84rem" }}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate("/contact");
                      }
                    }}
                  >
                    Customise This Design
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

export const InteriorProcess = ({ steps = [] }) => {
  return (
    <section className="interior-section bg-linen">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">VERIFIED 5-STEP JOURNEY</span>
          <h2 className="interior-title">Our 5-Step Interior Journey</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            A transparent milestone journey (5% booking / 45% production / 50% installation) ensuring 100+ quality checks, on-time delivery, and precision factory finish.
          </p>
        </div>

        <div className="process-timeline-grid">
          {steps.map((stepItem, idx) => (
            <div key={idx} className="process-step-card">
              <div className="process-step-number">{stepItem.step}</div>
              <h3 className="process-step-title">{stepItem.title}</h3>
              <p className="process-step-desc">{stepItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InteriorWhyUs = ({ whyData }) => {
  const { heading, subtitle, primaryCards = [], secondaryStrip = [] } = whyData || {};

  return (
    <section className="interior-section bg-white">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">FOUR SQUARE ADVANTAGE</span>
          <h2 className="interior-title">{heading || "Why Choose Four Square Interiors"}</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">{subtitle}</p>
        </div>

        <div className="why-us-grid">
          {primaryCards.map((card, idx) => (
            <div key={idx} className="why-us-card">
              <div className="why-us-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {secondaryStrip.length > 0 && (
          <div className="why-us-strip">
            {secondaryStrip.map((item, idx) => (
              <div key={idx} className="why-us-strip-item">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InteriorProductGrid;
