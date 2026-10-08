import React from "react";
import {
  InteriorHero,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  sofaTypes
} from "../data/interiors/index.js";

export const SofasInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="sofas-interiors-page">
      <InteriorHero
        eyebrow="BESPOKE SEATING & SOFAS"
        title="Your Sofa. Your Way."
        lede="Handcrafted seating built over kiln-dried solid hardwood internal frames, high-density 40D resilience foam, and premium stain-resistant fabrics."
        bgImage="/assets/interior-living.png"
        pills={["Kiln-Dried Hardwood", "40D High-Resilience Foam", "Stain-Resistant Fabrics", "Custom Proportions"]}
        primaryBtnText="Explore Sofa Styles"
        primaryBtnLink="#sofa-styles"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="sofa-styles">
        <InteriorProductGrid
          eyebrow="SEATING ARCHITECTURE"
          heading="Custom Sofa & Lounger Suites"
          subtitle="Explore sectional L-shaped loungers and bespoke modular sofa suites tailored to your living room palette."
          items={sofaTypes}
          columns={2}
          onNavigate={onNavigate}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Looking for Custom-Crafted Sofas for Your Living Room?"
        subcopy="Choose from 100+ stain-resistant fabrics and customize lengths, depths, and cushioning firmness."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default SofasInteriorsPage;
