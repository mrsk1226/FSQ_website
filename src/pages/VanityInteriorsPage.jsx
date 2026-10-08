import React from "react";
import {
  InteriorHero,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  vanityTypes
} from "../data/interiors/index.js";

export const VanityInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="vanity-interiors-page">
      <InteriorHero
        eyebrow="GROOMING & DRESSING STATIONS"
        title="Vanity Dressing Units. Integrated Lighting."
        lede="Illuminated mirrors, lined cosmetic and jewellery drawers, and seamless wardrobe-integrated dressing suites."
        bgImage="/assets/interior-bedroom.png"
        pills={["Integrated Mirror Lighting", "Lined Jewellery Drawers", "Wardrobe-Integrated Units", "Moisture-Resistant Boards"]}
        primaryBtnText="Explore Vanity Units"
        primaryBtnLink="#vanity-units"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="vanity-units">
        <InteriorProductGrid
          eyebrow="DRESSING DESIGNS"
          heading="Custom Vanity & Grooming Units"
          subtitle="Explore dedicated floating vanities and wardrobe-integrated grooming consoles."
          items={vanityTypes}
          columns={2}
          onNavigate={onNavigate}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Ready to Add an Elegant Vanity Station to Your Bedroom?"
        subcopy="Consult with our interior architects for custom dimensions, lighting mirrors, and jewellery drawer layouts."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default VanityInteriorsPage;
