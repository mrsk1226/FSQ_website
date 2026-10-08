import React from "react";
import {
  InteriorHero,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  diningTypes
} from "../data/interiors/index.js";

export const DiningInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="dining-interiors-page">
      <InteriorHero
        eyebrow="DINING & CROCKERY ARCHITECTURE"
        title="Convivial Dining Spaces. Fine Crockery Displays."
        lede="Sculptural 6 and 8-seater solid wood tables, quartz breakfast counters, and backlit smoked glass crockery and bar consoles."
        bgImage="/assets/work-wood.png"
        pills={["Solid Wood Dining Sets", "Backlit Crockery Consoles", "Smoked Glass Shutters", "Breakfast Counters"]}
        primaryBtnText="Explore Dining Units"
        primaryBtnLink="#dining-units"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="dining-units">
        <InteriorProductGrid
          eyebrow="DINING ARCHITECTURE"
          heading="Dining & Crockery Concepts"
          subtitle="Discover how customized dining tables, breakfast counters, and glassware consoles enhance dinner hosting."
          items={diningTypes}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Looking to Upgrade Your Dining Room?"
        subcopy="Our designers will create 3D renders of custom dining tables, crockery units, and breakfast bars for your space."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default DiningInteriorsPage;
