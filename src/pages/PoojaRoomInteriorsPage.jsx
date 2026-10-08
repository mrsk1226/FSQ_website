import React from "react";
import {
  InteriorHero,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  poojaTypes
} from "../data/interiors/index.js";

export const PoojaRoomInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="pooja-room-interiors-page">
      <InteriorHero
        eyebrow="SACRED SHRINES & MANDIRS"
        title="Pooja Mandir Units. Sacred & Serene."
        lede="Blending sacred Vastu principles with modern precision craft, featuring intricate CNC jali backdrops, warm ambient lighting, solid teak pillars, and pull-out diya trays."
        bgImage="/assets/work-wood.png"
        pills={["Precision CNC Jali Work", "Solid Teak Details", "Backlit Sacred Motifs", "Diya & Incense Drawers"]}
        primaryBtnText="Explore Pooja Mandirs"
        primaryBtnLink="#pooja-units"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="pooja-units">
        <InteriorProductGrid
          eyebrow="MANDIR ARCHITECTURE"
          heading="Custom Pooja Room & Mandir Designs"
          subtitle="Explore traditional wooden temples, modern backlit Corian shrines, and space-saving wall-mounted units."
          items={poojaTypes}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Plan a Peaceful, Sacred Pooja Mandir for Your Home"
        subcopy="Our team will customize CNC jali patterns, brass bells, and diya drawer dimensions to your space."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default PoojaRoomInteriorsPage;
