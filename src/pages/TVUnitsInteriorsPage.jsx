import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  tvUnitTypes
} from "../data/interiors/index.js";

export const TVUnitsInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="tv-units-interiors-page">
      <InteriorHero
        eyebrow="ENTERTAINMENT & MEDIA CONSOLES"
        title="Custom TV Units. Concealed Cable Management."
        lede="From sleek floating consoles with hidden cable raceways to full-height backlit feature walls and versatile room divider units."
        bgImage="/assets/work-living.png"
        pills={["Concealed Cable Management", "Floating & Floor Standing", "Soundbar Integration", "Backlit Feature Walls"]}
        primaryBtnText="Explore TV Unit Styles"
        primaryBtnLink="#tv-styles"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* TV Unit Grid */}
      <div id="tv-styles">
        <InteriorProductGrid
          eyebrow="MEDIA ARCHITECTURE"
          heading="Custom TV Unit Configurations"
          subtitle="Explore distinct configurations designed for optimal viewing heights, sound acoustics, and clean wire management."
          items={tvUnitTypes}
          columns={2}
          onNavigate={onNavigate}
        />
      </div>

      {/* Feature Split on Wire Management */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="ENGINEERED CLEANLINESS"
            title="Concealed Wiring & Thermal Ventilation"
            subtitle="Say goodbye to tangled HDMI cords, set-top boxes, and dusty adapter bricks."
            description="Every Four Square TV console includes pre-engineered internal cable management channels, rear ventilation grilles for heat dissipation from gaming consoles/receivers, and push-to-open acoustic fabric drawers."
            features={[
              "Heavy-duty internal PVC raceways routing power and optical cables directly inside walls",
              "Acoustically transparent shutter options for hidden soundbars and subwoofers",
              "Integrated ambient backlight strips reducing eye strain during night-time viewing",
              "Soft-close drop-down drawers for gaming controllers, discs, and streaming remotes"
            ]}
            image="/assets/interior-living.png"
            reverse={false}
          />
        </div>
      </section>

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready for a Stunning Media Wall in Your Living Room?"
        subcopy="Consult with our team to design floating consoles and feature walls matched to your TV dimensions."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default TVUnitsInteriorsPage;
