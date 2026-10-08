import React from "react";
import {
  InteriorHero,
  InteriorMaterials,
  InteriorWhyUs,
  InteriorConsultation,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  materialCategories,
  whyChooseUs
} from "../data/interiors/index.js";

export const MaterialsInteriorsPage = ({ onNavigate }) => {
  return (
    <div className="materials-interiors-page">
      <InteriorHero
        eyebrow="MATERIALS & FINISHES LIBRARY"
        title="Engineered Materials. Enduring Quality."
        lede="Explore moisture-resistant boards, contemporary matte and high-gloss finishes, woodgrain textures, and soft-close hardware."
        bgImage="/assets/upvc-detail-10.jpg"
        pills={["Moisture-Resistant Boards", "Contemporary Matte", "High-Gloss Acrylic", "Soft-Close Hardware"]}
        primaryBtnText="Explore Material Library"
        primaryBtnLink="#material-groups"
        secondaryBtnText="Request Physical Swatches"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      <div id="material-groups">
        <InteriorMaterials materialGroups={materialCategories} />
      </div>

      <InteriorWhyUs whyData={whyChooseUs} />

      <InteriorConsultation onNavigate={onNavigate} />

      <InteriorCTA
        headline="Experience Real Materials in Person"
        subcopy="Visit our flagship experience centre in Erode to touch core board samples, feel textured laminates, and test soft-close drawer runners."
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default MaterialsInteriorsPage;
