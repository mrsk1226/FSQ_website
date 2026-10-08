import React from "react";
import {
  InteriorHero,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  officeTypes
} from "../data/interiors/index.js";

export const HomeOfficeInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="home-office-interiors-page">
      <InteriorHero
        eyebrow="PRODUCTIVE HOME WORKSPACES"
        title="Home Office & Study. Distraction-Free."
        lede="Ergonomic desk heights, built-in wire grommets, dual-monitor mounts, overhead document libraries, and acoustic sound-absorbing wall panelling."
        bgImage="/assets/work-grey.png"
        pills={["Built-In Wire Raceways", "Overhead Library Racks", "Acoustic Wall Panels", "Ergonomic Desk Heights"]}
        primaryBtnText="Explore Workstations"
        primaryBtnLink="#office-units"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="office-units">
        <InteriorProductGrid
          eyebrow="WORKSPACES"
          heading="Custom Home Office & Study Desks"
          subtitle="Explore executive multi-monitor workstations and floating study desks."
          items={officeTypes}
          columns={2}
          onNavigate={onNavigate}
        />
      </div>

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Ready for a Productive, Ergonomic Home Office?"
        subcopy="Consult with our interior designers to build a tailored workspace matching your technology and study requirements."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default HomeOfficeInteriorsPage;
