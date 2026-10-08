import React from "react";
import {
  InteriorHero,
  InteriorGallery,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  galleryFilters,
  galleryItems
} from "../data/interiors/index.js";

export const GalleryInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="gallery-interiors-page">
      <InteriorHero
        eyebrow="INSPIRATION & PORTFOLIO"
        title="Interior Gallery. Real Transformations."
        lede="Browse completed modular kitchens, master bedroom suites, custom wardrobes, and contemporary living spaces."
        bgImage="/assets/interior-living.png"
        pills={["12 Interior Categories", "Filter by Space", "Full-Screen Lightbox", "Real Installations"]}
        primaryBtnText="Explore Gallery"
        primaryBtnLink="#gallery-grid"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="gallery-grid">
        <InteriorGallery
          heading="Portfolio Across All Spaces"
          subtitle="Click on any image to open the high-resolution lightbox and view space details."
          filters={galleryFilters}
          items={galleryItems}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Inspired by What You See?"
        subcopy="Bring your floor plan to our design team and let us bring these ideas to life in your home."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default GalleryInteriorsPage;
