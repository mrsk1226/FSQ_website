import React from "react";
import "./design-diagrams.css";

/**
 * LaminateGrid Component
 * Displays wooden and contemporary laminates with slide-up overlay on hover.
 */
export const LaminateGrid = ({ heading, subtitle, items = [] }) => {
  return (
    <section className="design-diagrams-section">
      <div className="design-diagrams-container">
        {heading && <h2 className="design-section-heading">{heading}</h2>}

        <div className="design-section-divider" aria-hidden="true">
          <span className="design-divider-line" />
          <span className="design-divider-diamond" />
          <span className="design-divider-line" />
        </div>

        {subtitle && <p className="design-section-subtitle">{subtitle}</p>}

        <div className="laminate-grid">
          {items.map((item, idx) => (
            <div className="laminate-item" key={`${item.name}-${idx}`}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="laminate-img"
                  onError={(e) => {
                    // Fallback to color background if image is not found
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = "block";
                    }
                  }}
                />
              ) : null}
              <div
                className="laminate-color-block"
                style={{
                  backgroundColor: item.color || "#c9a06e",
                  display: item.image ? "none" : "block"
                }}
              />
              <div className="laminate-overlay">
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaminateGrid;
