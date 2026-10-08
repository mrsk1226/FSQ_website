import React from "react";
import "./interiors.css";

export const InteriorCategoryCard = ({ category, spanClass = "span-third", onNavigate }) => {
  const { title, subtitle, image, route, badge, stats, fallbackColor } = category;

  const handleClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
    }
  };

  return (
    <a
      href={route}
      className={`category-card ${spanClass}`}
      onClick={handleClick}
      aria-label={`Explore ${title}`}
    >
      <div className="category-card-media" style={{ backgroundColor: fallbackColor || "#202b36" }}>
        {badge && <span className="category-card-badge">{badge}</span>}
        <img
          src={image}
          alt={title}
          className="category-card-img"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="category-card-body">
        <div>
          <h3 className="category-card-title">
            {title}
            {stats && <small style={{ fontSize: "0.72rem", color: "#0d6eaa", fontWeight: "600" }}>{stats}</small>}
          </h3>
          <p className="category-card-desc">{subtitle}</p>
        </div>
        <div className="category-card-link">
          <span>Explore Space</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
};

export const InteriorCategoryGrid = ({ categories = [], onNavigate }) => {
  // Editorial assignment of spans:
  // 1. Kitchen (Large span-8)
  // 2. Bedroom (Medium span-4)
  // 3. Living Room (Medium span-4)
  // 4. Wardrobes (Large span-8)
  // 5. TV Units, Dining, Kids Room (span-4 each)
  // 6. Vanity, Pooja, Home Office, Sofas (span-3 each)
  const getSpanClass = (index) => {
    if (index === 0) return "span-large"; // Kitchen
    if (index === 1) return "span-medium"; // Bedroom
    if (index === 2) return "span-medium"; // Living
    if (index === 3) return "span-large"; // Wardrobes
    if (index >= 4 && index <= 6) return "span-third"; // TV, Dining, Kids
    return "span-quarter"; // Vanity, Pooja, Office, Sofas
  };

  return (
    <section id="categories" className="interior-section bg-warm">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">ROOM BY ROOM</span>
          <h2 className="interior-title">Explore Interior Spaces</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            From smart space-saving modular kitchens to serene master bedrooms and sacred pooja mandirs, discover custom-crafted designs for every square foot.
          </p>
        </div>

        <div className="interior-category-grid">
          {categories.map((category, idx) => (
            <InteriorCategoryCard
              key={category.id || idx}
              category={category}
              spanClass={getSpanClass(idx)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorCategoryGrid;
