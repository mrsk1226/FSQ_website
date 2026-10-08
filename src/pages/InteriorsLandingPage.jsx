import React from "react";
import {
  InteriorHero,
  InteriorCategoryGrid,
  InteriorStyleExplorer,
  InteriorFeatureSplit,
  InteriorProductGrid,
  InteriorProcess,
  InteriorWhyUs,
  InteriorConsultation,
  InteriorWarranty,
  InteriorMaterials,
  InteriorGallery,
  InteriorFAQ,
  InteriorCTA
} from "../components/interiors/index.js";
import {
  interiorCategories,
  kitchenLayouts,
  kitchenStyles,
  bedroomTypes,
  wardrobeTypes,
  livingTypes,
  kidsRoomTypes,
  poojaTypes,
  materialCategories,
  processSteps,
  interiorStyles,
  whyChooseUs,
  warrantyConfig,
  interiorFAQs,
  galleryFilters,
  galleryItems
} from "../data/interiors/index.js";

export const InteriorsLandingPage = ({ onNavigate }) => {
  return (
    <div className="interiors-landing-page">
      {/* 1. Hero */}
      <InteriorHero
        eyebrow="FOUR SQUARE INTERIORS"
        title="Complete Interiors. Designed Around You."
        lede="Transforming residential spaces across Tamil Nadu with precision modular engineering, genuine Boiling Water Proof BWP materials, and bespoke architectural craftsmanship."
        bgImage="/assets/hero-bedroom.jpg"
        pills={["Modular Kitchen", "Wardrobes", "Living Room", "Bedroom", "Complete Home"]}
        primaryBtnText="Explore All Spaces"
        primaryBtnLink="#categories"
        secondaryBtnText="Book Consultation"
        secondaryBtnLink="/contact"
        onNavigate={onNavigate}
      />

      {/* 2. Category Explorer */}
      <InteriorCategoryGrid
        categories={interiorCategories}
        onNavigate={onNavigate}
      />

      {/* 3. Full Home Introduction Split Section */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="FULL HOME INTERIORS"
            title="End-to-End Home Transformations"
            subtitle="From initial 3D design to clean on-site assembly, experience total peace of mind."
            description="Whether you're moving into a new apartment or renovating an independent bungalow, our complete home interior solutions bring harmonious aesthetics, smart functionality, and durable cabinetry to every room."
            features={[
              "Single-point turnkey accountability across all rooms",
              "3D design visualisations before manufacturing",
              "Moisture-resistant and durable core boards",
              "Precision automated factory cutting and edge banding",
              "On-time delivery with transparent milestone updates"
            ]}
            image="/assets/story-interiors.png"
            reverse={false}
            ctaText="Discover Full Home Scope"
            ctaLink="/products/interiors/full-home"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 4. Find Your Interior Style */}
      <InteriorStyleExplorer
        heading="Find Your Interior Style"
        subtitle="Explore how diverse palettes and architectural textures define your home's unique personality."
        styles={interiorStyles}
      />

      {/* 5. Featured Modular Kitchen */}
      <section className="interior-section bg-warm">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="MODULAR KITCHEN"
            title="Precision Kitchens Built for Everyday Cooking"
            subtitle="Durable moisture-resistant construction with functional work triangles."
            description="Our modular kitchens combine moisture-resistant core boards, durable finishes, smooth soft-close hardware, and thoughtful cabinet organization."
            features={[
              "Work triangle principle: Sink, Hob & Refrigerator arranged for effortless workflow",
              "Corner pull-out units for efficient space utilization",
              "Deep spice and utensil drawer organizers",
              "Durable countertops resistant to everyday cooking spills"
            ]}
            image="/assets/work-kitchen.png"
            reverse={true}
            ctaText="Explore Kitchen Layouts"
            ctaLink="/products/interiors/kitchen"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 6. Bedroom + Wardrobe Showcase */}
      <section className="interior-section bg-white">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="BEDROOM & WARDROBES"
            title="Restful Bedrooms. Floor-to-Ceiling Storage."
            subtitle="Decorative headboard walls and seamless floor-to-ceiling wardrobe suites."
            description="Maximize floor space and restful comfort with custom hydraulic storage beds, woodgrain paneling, sliding wardrobes, and integrated dressing vanity stations."
            features={[
              "Durable sliding door mechanisms with soft-close dampers",
              "Continuous ceiling lofts eliminating dust-gathering gaps",
              "Organized accessory drawers and integrated lighting options",
              "Ambient lighting and bedside charging provisions"
            ]}
            image="/assets/interior-bedroom.png"
            reverse={false}
            ctaText="Explore Bedroom & Wardrobe Designs"
            ctaLink="/products/interiors/bedroom"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 7. Living + TV + Dining Showcase */}
      <section className="interior-section bg-warm">
        <div className="interior-container">
          <InteriorFeatureSplit
            eyebrow="LIVING & ENTERTAINMENT"
            title="Sophisticated Living & Dining Spaces"
            subtitle="Floating media consoles, backlit feature walls, and convivial dining spaces."
            description="Create welcoming spaces for family and guests with wall-mounted TV units featuring concealed wire routing, architectural wooden louvers, and bespoke crockery consoles."
            features={[
              "Floating consoles with concealed cable management channels",
              "Backlit wall panelling and decorative feature textures",
              "Architectural room partitions with display niches",
              "Smoked glass crockery cabinets with internal spotlighting"
            ]}
            image="/assets/interior-living.png"
            reverse={true}
            ctaText="Explore Living Room Designs"
            ctaLink="/products/interiors/living-room"
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* 8. Special Spaces Highlights */}
      <InteriorProductGrid
        eyebrow="SPECIALIZED SPACES"
        heading="Bespoke Shrines, Study & Kids Spaces"
        subtitle="Thoughtfully engineered solutions for sacred pooja corners, productive home offices, and safe kids rooms."
        items={[
          {
            title: "Pooja Mandir Units",
            subtitle: "Sacred Shrines with CNC Jali & Brass Bells",
            description: "Teak wood frames, precision CNC jali panels, warm ambient lighting, and dedicated diya pull-outs.",
            image: "/assets/work-wood.png",
            bestFor: "Living room pooja nooks and dedicated mandir rooms."
          },
          {
            title: "Kids & Teen Rooms",
            subtitle: "Playful, Adaptive & Child-Safe Storage",
            description: "Soft rounded edges, non-toxic finishes, modular study tables, and multi-level storage bunk beds.",
            image: "/assets/homworks-bedroom.jpg",
            bestFor: "Growing children and focused study environments."
          },
          {
            title: "Home Office & Study",
            subtitle: "Distraction-Free Remote Workstations",
            description: "Ergonomic desk heights, cable raceways, acoustic wall panelling, and overhead book storage.",
            image: "/assets/work-grey.png",
            bestFor: "Remote professionals, writers, and students."
          }
        ]}
        columns={3}
        onNavigate={onNavigate}
      />

      {/* 9. Materials & Finishes */}
      <InteriorMaterials materialGroups={materialCategories} />

      {/* 10. Why Choose Us */}
      <InteriorWhyUs whyData={whyChooseUs} />

      {/* 11. How It Works (8 Steps) */}
      <InteriorProcess steps={processSteps} />

      {/* 12. Warranty & After-Sales */}
      <InteriorWarranty config={warrantyConfig} />

      {/* 13. Consultation Options */}
      <InteriorConsultation onNavigate={onNavigate} />

      {/* 14. Interior Gallery */}
      <InteriorGallery
        heading="Explore Real Interior Transformations"
        subtitle="Filter by space to see how our modular craftsmanship elevates kitchens, bedrooms, and living spaces."
        filters={galleryFilters}
        items={galleryItems}
      />

      {/* 15. FAQ */}
      <InteriorFAQ faqs={interiorFAQs} />

      {/* 16. Final CTA */}
      <InteriorCTA onNavigate={onNavigate} />
    </div>
  );
};

export default InteriorsLandingPage;
