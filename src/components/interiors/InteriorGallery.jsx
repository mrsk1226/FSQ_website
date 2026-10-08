import React, { useState } from "react";
import "./interiors.css";

export const InteriorLightbox = ({ item, onClose, onPrev, onNext }) => {
  if (!item) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-btn-close" onClick={onClose} aria-label="Close Lightbox">
          &times;
        </button>

        {onPrev && (
          <button className="lightbox-btn-nav lightbox-btn-prev" onClick={onPrev} aria-label="Previous Image">
            &#8249;
          </button>
        )}

        <div className="lightbox-img-wrapper">
          <img src={item.image} alt={item.title} />
        </div>

        {onNext && (
          <button className="lightbox-btn-nav lightbox-btn-next" onClick={onNext} aria-label="Next Image">
            &#8250;
          </button>
        )}

        <div className="lightbox-caption">
          <span className="interior-eyebrow on-dark" style={{ marginBottom: "6px" }}>{item.category}</span>
          <h4>{item.title}</h4>
          {item.subtitle && <p>{item.subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export const InteriorGallery = ({
  heading = "Interior Inspiration Gallery",
  subtitle = "Explore our recent modular kitchen installations, master bedroom suites, wardrobe transformations, and living spaces.",
  filters = [],
  items = []
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const filteredItems = activeFilter === "ALL"
    ? items
    : items.filter(it => it.category === activeFilter);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = () => {
    setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setActiveLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="interior-section bg-white">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">PORTFOLIO & INSPIRATION</span>
          <h2 className="interior-title">{heading}</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">{subtitle}</p>
        </div>

        {filters && filters.length > 0 && (
          <div className="gallery-filter-tabs">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`gallery-filter-tab ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(f.id);
                  setActiveLightboxIndex(null);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="interior-gallery-masonry">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`gallery-item-card ${item.aspect || "landscape"}`}
              onClick={() => setActiveLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-item-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-category">{item.category}</span>
                <h4 className="gallery-item-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {activeItem && (
          <InteriorLightbox
            item={activeItem}
            onClose={() => setActiveLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </section>
  );
};

export const InteriorFAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="interior-section bg-warm">
      <div className="interior-container">
        <div className="interior-section-header">
          <span className="interior-eyebrow">COMMONLY ASKED QUESTIONS</span>
          <h2 className="interior-title">Frequently Asked Questions</h2>
          <div className="interior-divider" aria-hidden="true">
            <span className="interior-divider-line" />
            <span className="interior-divider-diamond" />
            <span className="interior-divider-line" />
          </div>
          <p className="interior-subtitle">
            Everything you need to know about our interior design workflow, materials, pricing transparency, and after-sales support.
          </p>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">⌄</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const InteriorCTA = ({
  headline = "Ready to Transform Your Home?",
  subcopy = "Talk to our interior design team and start planning a space built around your lifestyle.",
  primaryText = "Book Free Consultation",
  primaryLink = "/contact",
  secondaryText = "Explore Interior Gallery",
  secondaryLink = "/products/interiors/gallery",
  onNavigate
}) => {
  const handleNav = (e, link) => {
    if (onNavigate && link) {
      e.preventDefault();
      onNavigate(link);
    }
  };

  return (
    <section
      style={{
        padding: "85px 24px",
        background: "linear-gradient(135deg, #0d2137, #1a3a50)",
        color: "#ffffff",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
            fontWeight: "500",
            margin: "0 0 16px",
            lineHeight: "1.15"
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#c7d9e4",
            maxWidth: "680px",
            margin: "0 auto 36px",
            lineHeight: "1.6"
          }}
        >
          {subcopy}
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={primaryLink}
            className="btn-fsq-primary"
            style={{ background: "#ffffff", color: "#173249" }}
            onClick={(e) => handleNav(e, primaryLink)}
          >
            {primaryText}
          </a>
          <a
            href={secondaryLink}
            className="btn-fsq-outline"
            style={{ borderColor: "#ffffff", color: "#ffffff" }}
            onClick={(e) => handleNav(e, secondaryLink)}
          >
            {secondaryText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InteriorGallery;
