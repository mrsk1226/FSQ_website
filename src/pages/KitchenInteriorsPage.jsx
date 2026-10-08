import React from "react";
import {
  InteriorHero,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorStyleExplorer,
  KitchenVisualizer,
  InteriorProcess,
  InteriorWhyUs,
  InteriorMaterials,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  kitchenLayouts,
  kitchenStyles,
  materialCategories,
  processSteps,
  whyChooseUs
} from "../data/interiors/index.js";

export const KitchenInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="kitchen-interiors-page">
      <InteriorHero
        eyebrow="MODULAR KITCHEN SOLUTIONS"
        title="Functional Kitchens. Built for Everyday Cooking."
        lede="Moisture-resistant cabinetry, soft-close hardware, durable work surfaces, and intelligent space-saving corner storage."
        bgImage="/assets/interior-kitchen.png"
        pills={["Moisture-Resistant Boards", "Work Triangle Design", "Soft-Close Hardware", "Space Optimization"]}
        primaryBtnText="Explore Kitchen Layouts"
        primaryBtnLink="#kitchen-visualizer"
        secondaryBtnText="Book Kitchen Survey"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* Interactive Kitchen Visualizer & Layout Explorer */}
      <div id="kitchen-visualizer">
        <KitchenVisualizer layouts={kitchenLayouts} onNavigate={onNavigate} />
      </div>

      {/* 6 Kitchen Layouts Overview Grid */}
      <div id="kitchen-layouts">
        <InteriorProductGrid
          eyebrow="ERGONOMIC CONFIGURATIONS"
          heading="6 Modular Kitchen Layouts"
          subtitle="Choose the layout best suited to your room dimensions, cooking habits, and family size."
          items={kitchenLayouts}
          columns={3}
          onNavigate={onNavigate}
        />
      </div>

      {/* Work Triangle Feature Split */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="ERGONOMIC SCIENCE"
            title="The Golden Work Triangle Principle"
            subtitle="Minimizing walking effort between Sink, Hob, and Refrigerator."
            description="Our kitchen designers carefully calculate the distance between your washing, cooking, and food storage zones. By keeping the total triangle perimeter between 12 and 26 feet, daily meal preparation becomes fast, effortless, and fatigue-free."
            features={[
              "Prep zone positioned adjacent to sink with anti-microbial cutting surfaces",
              "Spices, oils, and cookware stored directly below the cooking hob",
              "Refrigerator placed at the entry perimeter for easy snack access without obstructing the cook",
              "Bi-fold overhead cabinets providing full headroom and zero head bumps"
            ]}
            image="/assets/work-galley.png"
            reverse={false}
          />
        </div>
      </section>

      {/* 6 Kitchen Design Styles */}
      <InteriorStyleExplorer
        heading="Kitchen Design Aesthetics"
        subtitle="Explore how high-gloss acrylics, classic Shaker mouldings, and warm teak woodgrains transform your kitchen atmosphere."
        styles={kitchenStyles}
      />

      {/* Materials */}
      <InteriorMaterials materialGroups={materialCategories} />

      {/* Why Choose Us */}
      <InteriorWhyUs whyData={whyChooseUs} />

      {/* Process */}
      <InteriorProcess steps={processSteps} />

      {/* Consultation */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* Final CTA */}
      <InteriorCTA
        headline="Ready to Design Your Dream Modular Kitchen?"
        subcopy="Visit our live working kitchen in Erode or request a complimentary on-site measurement survey."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default KitchenInteriorsPage;
