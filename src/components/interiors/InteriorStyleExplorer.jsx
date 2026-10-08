import React from "react";
import "./interiors.css";

export const InteriorStyleExplorer = ({
  heading = "Find Your Interior Style",
  subtitle = "Whether you lean toward clean Scandinavian minimalism or rich heritage teak tones, our design team translates your taste into cohesive reality.",
  styles = []
}) => {
  return (
    <section className="interior-section bg-white">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">DESIGN AESTHETICS</span>
          <h2 className="interior-title">{heading}</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">{subtitle}</p>
        </div>

        <div className="style-explorer-grid">
          {styles.map((style, idx) => (
            <div key={style.id || idx} className="style-card">
              <div className="style-card-media">
                <img
                  src={style.image}
                  alt={style.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="style-card-body">
                <h3 className="style-card-title">{style.name}</h3>
                <p className="style-card-desc">{style.description}</p>
                {style.tags && (
                  <div className="style-card-tags">
                    {style.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="style-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InteriorFeatureSplit = ({
  eyebrow,
  title,
  subtitle,
  description,
  features = [],
  image,
  reverse = false,
  ctaText,
  ctaLink,
  onNavigate
}) => {
  const handleCta = (e) => {
    if (onNavigate && ctaLink) {
      e.preventDefault();
      onNavigate(ctaLink);
    }
  };

  return (
    <div className={`feature-split-row ${reverse ? "reverse" : ""}`}>
      <div className="feature-split-media">
        <img
          src={image}
          alt={title}
          className="feature-split-img"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="feature-split-content">
        {eyebrow && <span className="interior-eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        {subtitle && <h4 style={{ color: "#0d6eaa", fontWeight: "600", fontSize: "1.1rem", margin: "0 0 16px" }}>{subtitle}</h4>}
        {description && <p>{description}</p>}

        {features.length > 0 && (
          <ul className="feature-split-list">
            {features.map((item, idx) => (
              <li key={idx}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {ctaText && (
          <a
            href={ctaLink || "/contact"}
            className="btn-fsq-primary"
            onClick={handleCta}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};

export default InteriorStyleExplorer;
