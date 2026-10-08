import React from "react";
import "./interiors.css";

export const InteriorHero = ({
  eyebrow = "FOUR SQUARE INTERIORS",
  title = "Complete Interiors. Designed Around You.",
  lede = "Personalized, functional, and beautifully executed residential spaces engineered with durable materials and precision craftsmanship.",
  bgImage = "/assets/hero-bedroom.jpg",
  pills = ["Modular Kitchen", "Wardrobes", "Living Room", "Bedroom", "Complete Home"],
  primaryBtnText = "Explore Interiors",
  primaryBtnLink = "#categories",
  secondaryBtnText = "Book Free Consultation",
  secondaryBtnLink = "/contact",
  onNavigate
}) => {
  const handleNav = (e, link) => {
    if (onNavigate && link.startsWith("/")) {
      e.preventDefault();
      onNavigate(link);
    } else if (link.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="interior-hero"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="interior-hero-overlay" />
      <div className="interior-hero-content">
        {eyebrow && <span className="interior-eyebrow on-dark">{eyebrow}</span>}
        <h1 className="interior-hero-h1">{title}</h1>
        {lede && <p className="interior-hero-lede">{lede}</p>}

        {pills && pills.length > 0 && (
          <div className="interior-hero-pills">
            {pills.map((pill, idx) => (
              <span key={idx} className="interior-hero-pill">
                {pill}
              </span>
            ))}
          </div>
        )}

        <div className="interior-hero-actions">
          {primaryBtnText && (
            <a
              href={primaryBtnLink}
              className="btn-fsq-primary"
              onClick={(e) => handleNav(e, primaryBtnLink)}
            >
              {primaryBtnText}
            </a>
          )}
          {secondaryBtnText && (
            <a
              href={secondaryBtnLink}
              className="btn-fsq-secondary"
              onClick={(e) => handleNav(e, secondaryBtnLink)}
            >
              {secondaryBtnText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteriorHero;
