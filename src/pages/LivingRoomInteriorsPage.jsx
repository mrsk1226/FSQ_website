import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  livingTypes,
  tvUnitTypes
} from "../data/interiors/index.js";

export const LivingRoomInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="living-room-interiors-page">
      <InteriorHero
        eyebrow="LIVING ROOM ARCHITECTURE"
        title="Welcoming Living Spaces. Bespoke Elegance."
        lede="Fluted wall panelling, architectural wooden room dividers, bespoke foyer consoles, curated display niches, and conversational seating arrangements."
        bgImage="/assets/interior-living.png"
        pills={["Fluted Wall Panelling", "Open Partitions", "Curated Display Shelving", "Bespoke Seating Layouts"]}
        primaryBtnText="Explore Living Elements"
        primaryBtnLink="#living-elements"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* Living Elements */}
      <div id="living-elements">
        <InteriorProductGrid
          eyebrow="ROOM ARCHITECTURE"
          heading="Living Room Design Elements"
          subtitle="Discover how tailored panelling, partitions, and display consoles harmonize your central gathering space."
          items={livingTypes}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      {/* Feature Split */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="FLUTED TEXTURES & LIGHT"
            title="Architectural Wall Panelling & Partitions"
            subtitle="Creating visual depth, acoustic warmth, and elegant spatial division."
            description="Our vertical louver screens and CNC cut partitions define entry foyers and dining areas while allowing natural daylight and cross-ventilation to flow freely throughout your floor plan."
            features={[
              "E0 acoustic felt backing for noise reduction and echo absorption",
              "Charcoal and natural woodgrain composite fluted louvers",
              "Concealed LED light channels for warm ambient evening illumination",
              "Open display cubbies for planters, sculptures, and art objects"
            ]}
            image="/assets/homworks-hall.jpg"
            reverse={false}
          />
        </div>
      </section>

      {/* Matching TV Units */}
      <InteriorProductGrid
        eyebrow="MEDIA & CONSOLES"
        heading="Integrated TV & Entertainment Units"
        subtitle="Explore floating consoles with concealed wiring and backlit feature wall media units."
        items={tvUnitTypes}
        columns={2}
        onNavigate={onNavigate}
      />

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready to Redefine Your Living Room?"
        subcopy="Our interior designers will craft 3D layouts, feature wall panels, and bespoke seating for your home."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default LivingRoomInteriorsPage;
