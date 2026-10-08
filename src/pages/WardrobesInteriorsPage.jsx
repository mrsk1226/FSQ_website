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
  wardrobeTypes,
  materialCategories
} from "../data/interiors/index.js";

export const WardrobesInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="wardrobes-interiors-page">
      <InteriorHero
        eyebrow="WARDROBE & STORAGE SYSTEMS"
        title="Custom Wardrobes. Space Maximized."
        lede="From ultra-smooth 2-track sliding wardrobes and classic hinged shaker doors to boutique walk-in dressing lounges with full-height loft integration."
        bgImage="/assets/work-headboard.png"
        pills={["Floor-to-Ceiling Lofts", "Anti-Warp Profiles", "Sensor LED Channels", "Velvet Organizers"]}
        primaryBtnText="Explore Wardrobe Types"
        primaryBtnLink="#wardrobe-types"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* Wardrobe Types Grid */}
      <div id="wardrobe-types">
        <InteriorProductGrid
          eyebrow="STORAGE ARCHITECTURE"
          heading="5 Custom Wardrobe Configurations"
          subtitle="Explore configurations tailored for master suites, compact spaces, and luxury walk-in dressing rooms."
          items={wardrobeTypes}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      {/* Walk-in Wardrobe Feature Split */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="LUXURY DRESSING"
            title="Bespoke Walk-In Wardrobes"
            subtitle="Boutique display elegance for garments, footwear, and accessories."
            description="Experience the luxury of a customized dressing room equipped with smoked glass shutters, central watch and jewellery display islands, integrated backlit shoe shelving, and motion-sensor ambient lighting."
            features={[
              "360-degree organized storage for formal wear, sarees, suits, and daily essentials",
              "Velvet-lined pull-out drawers with partitioned trays for rings, ties, and belts",
              "Smoked glass shutters encased in lightweight matte black aluminium frames",
              "Integrated full-length LED touch mirror grooming station"
            ]}
            image="/assets/work-bedroom.png"
            reverse={false}
          />
        </div>
      </section>

      {/* Materials */}
      <InteriorMaterials materialGroups={materialCategories} />

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Looking for Tailored Bedroom Storage?"
        subcopy="Schedule a free wardrobe design consultation and laser measurement survey with our experts."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default WardrobesInteriorsPage;
