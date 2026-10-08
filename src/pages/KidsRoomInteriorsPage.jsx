import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  kidsRoomTypes
} from "../data/interiors/index.js";

export const KidsRoomInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="kids-room-interiors-page">
      <InteriorHero
        eyebrow="WORLD OF KIDS & TEENS"
        title="Inspiring Kids Rooms. Safe & Adaptive."
        lede="Designed to spark imagination, support focused learning, and grow with your child through child-safe rounded finishes and modular multi-level storage."
        bgImage="/assets/homworks-bedroom.jpg"
        pills={["Child-Safe Soft Edges", "Non-Toxic Coatings", "Ergonomic Study Desks", "Modular Multi-Level Bunks"]}
        primaryBtnText="Explore Kids Designs"
        primaryBtnLink="#kids-types"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* Kids Room Types Grid */}
      <div id="kids-types">
        <InteriorProductGrid
          eyebrow="PLAY, STUDY & REST"
          heading="Custom Kids Room Concepts"
          subtitle="Explore adaptive bedroom, study, and play configurations built with safety-tested materials."
          items={kidsRoomTypes}
          columns={2}
          onNavigate={onNavigate}
        />
      </div>

      {/* Safety & Ergonomics Split */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="DESIGNED FOR SAFETY"
            title="Child-Friendly Architecture"
            subtitle="Engineered with soft-close dampers, rounded corners, and durable anti-stain laminates."
            description="Children need environments that nurture curiosity while safeguarding against accidents. Our kids furniture incorporates 2mm soft PVC edge banding, non-pinching drawer slides, scratch-resistant finishes, and adjustable study desk ergonomics."
            features={[
              "All sharp corners eliminated with 3D rounded edge profiles",
              "Zero-VOC eco-certified adhesives and non-toxic surface lacquers",
              "Heavy-duty fall-protection safety guardrails on all bunk beds",
              "Spacious pull-out toy bins and open book organizers encouraging tidy habits"
            ]}
            image="/assets/work-grey.png"
            reverse={false}
          />
        </div>
      </section>

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready to Create an Inspiring Space for Your Child?"
        subcopy="Our designers will help you choose themes, color palettes, and adaptive furniture layouts."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default KidsRoomInteriorsPage;
