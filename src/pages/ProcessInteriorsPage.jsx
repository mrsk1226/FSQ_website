import React from "react";
import {
  InteriorHero,
  InteriorProcess,
  InteriorWhyUs,
  InteriorWarranty,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  processSteps,
  whyChooseUs,
  warrantyConfig
} from "../data/interiors/index.js";

export const ProcessInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="process-interiors-page">
      <InteriorHero
        eyebrow="HOW WE WORK"
        title="Our 5-Step Interior Journey"
        lede="From initial consultation to detailed space planning, 3D design, precision factory production, and clean on-site installation."
        bgImage="/assets/work-wood.png"
        pills={["Transparent Milestones", "3D Visualization", "Zero Hidden Costs", "100+ Quality Checks"]}
        primaryBtnText="Explore the 5 Steps"
        primaryBtnLink="#process-steps"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="process-steps">
        <InteriorProcess steps={processSteps} />
      </div>

      <InteriorWhyUs whyData={whyChooseUs} />

      <InteriorWarranty config={warrantyConfig} />

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Ready to Begin Step 01 with Four Square?"
        subcopy="Reach out today to connect with our interior design architects and schedule an on-site consultation."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default ProcessInteriorsPage;
