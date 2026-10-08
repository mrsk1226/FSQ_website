import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorMaterials,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  bedroomTypes,
  wardrobeTypes,
  materialCategories
} from "../data/interiors/index.js";

export const BedroomInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="bedroom-interiors-page">
      <InteriorHero
        eyebrow="BEDROOM INTERIOR ARCHITECTURE"
        title="Restful Bedrooms. Calming Sanctuaries."
        lede="Bespoke headboard wall panelling, hydraulic lift storage beds, warm cove lighting, and seamless wardrobe-dressing integration."
        bgImage="/assets/interior-bedroom.png"
        pills={["Acoustic Bed Backdrops", "Hydraulic Bed Storage", "Sensor Wardrobe LEDs", "Floating Vanity Units"]}
        primaryBtnText="Explore Bedroom Suites"
        primaryBtnLink="#bedroom-suites"
        secondaryBtnText="Book Design Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* Bedroom Suites */}
      <div id="bedroom-suites">
        <InteriorProductGrid
          eyebrow="SUITE CONFIGURATIONS"
          heading="5 Bedroom Suite Configurations"
          subtitle="From expansive master suites with walk-in dressing to space-saving compact guest rooms."
          items={bedroomTypes}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      {/* Wardrobe Integration Feature Split */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="SEAMLESS STORAGE"
            title="Integrated Wardrobe & Dressing Suites"
            subtitle="Eliminating messy bedroom clutter with floor-to-ceiling precision storage."
            description="Our bedroom suites integrate sliding or hinged wardrobes directly into the bed backdrop panelling, creating continuous architectural lines while maximizing vertical loft storage for blankets, suitcases, and seasonal items."
            features={[
              "Anti-warp aluminium profile shutters tested for smooth daily gliding",
              "Soft-close drawers with customized jewellery, watch, and tie organizers",
              "Concealed LED strip profiles with automatic infrared door sensors",
              "Full-length mirror panels and integrated dressing tables"
            ]}
            image="/assets/work-headboard.png"
            reverse={false}
            ctaText="Explore Wardrobe Designs"
            ctaLink="/products/interiors/wardrobes"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* Wardrobes Quick Showcase */}
      <InteriorProductGrid
        eyebrow="WARDROBE STYLES"
        heading="Matching Wardrobe Systems"
        subtitle="Explore wardrobe configurations engineered to complement your bedroom suite."
        items={wardrobeTypes}
        columns={3}
        onNavigate={onNavigate}
      />

      {/* Materials */}
      <InteriorMaterials materialGroups={materialCategories} />

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready to Create Your Perfect Bedroom Retreat?"
        subcopy="Consult with our bedroom interior architects to plan custom headboards, storage beds, and wardrobes."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default BedroomInteriorsPage;
