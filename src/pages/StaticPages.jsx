import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   1. ABOUT US PAGE (16 Verified Sections)
   ============================================================ */
export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="about-page-root">
      {/* 1. About Hero */}
      <section
        style={{
          padding: "110px 0 85px",
          background: "radial-gradient(ellipse at 50% 20%, rgba(13,110,170,0.22), transparent 65%), linear-gradient(145deg, #0d2130 0%, #0f2e44 55%, #081722 100%)",
          color: "#ffffff",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div className="wrap" style={{ maxWidth: "960px", margin: "0 auto" }}>
          <span className="badge badge-light" style={{ marginBottom: "18px" }}>About Four Square</span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: "600", lineHeight: "1.12", margin: "0 0 18px", color: "#ffffff", letterSpacing: "-0.02em" }}>
            Building Spaces. <span style={{ color: "#168bd2" }}>Building Trust.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.75", color: "rgba(255, 255, 255, 0.88)", margin: "0 auto 32px", maxWidth: "760px" }}>
            Four Square builds the spaces people live and work in — from windows and doors that frame the view to complete interiors that bring a home to life.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", fontSize: "0.82rem", color: "#ffffff" }}>
              ⭐ In-House Manufacturing
            </div>
            <div style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", fontSize: "0.82rem", color: "#ffffff" }}>
              📍 Rooted in Erode
            </div>
            <div style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", fontSize: "0.82rem", color: "#ffffff" }}>
              🗺️ 10+ Districts in Tamil Nadu
            </div>
            <div style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", fontSize: "0.82rem", color: "#ffffff" }}>
              🏢 Flagship Experience Centre
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company at a Glance */}
      <section style={{ padding: "60px 0", background: "#ffffff" }}>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              padding: "36px",
              background: "rgba(255, 255, 255, 0.75)",
              border: "1px solid #dfe7ec",
              borderRadius: "18px",
              boxShadow: "0 18px 50px rgba(13,33,48,0.08)",
              textAlign: "center"
            }}
            className="glance-grid-wrap"
          >
            <div>
              <strong style={{ display: "block", fontSize: "2.4rem", color: "#0d6eaa", fontFamily: "'Outfit', sans-serif" }}>20-Yr</strong>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a2a3a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Product Warranty
              </span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "2.4rem", color: "#0d6eaa", fontFamily: "'Outfit', sans-serif" }}>10+</strong>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a2a3a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Districts Served
              </span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "2.4rem", color: "#0d6eaa", fontFamily: "'Outfit', sans-serif" }}>1</strong>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a2a3a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Flagship Experience Centre (Erode)
              </span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "2.4rem", color: "#0d6eaa", fontFamily: "'Outfit', sans-serif" }}>3</strong>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#1a2a3a", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Core Verticals
              </span>
              <small style={{ display: "block", color: "#7a8b99", fontSize: "0.72rem", marginTop: "2px" }}>uPVC · Aluminium · Interiors</small>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Story */}
      <section style={{ padding: "90px 0", background: "#faf8f5" }}>
        <div className="wrap about-story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <span className="badge" style={{ marginBottom: "16px" }}>Our Story</span>
            <h2 className="section-title" style={{ margin: "0 0 18px" }}>
              From Fenestration Specialist to <span className="text-gradient">Integrated Design &amp; Build Partner</span>
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.75", color: "#4a5c6a", marginBottom: "16px" }}>
              From our beginnings as a specialized uPVC fenestration fabricator, Four Square has grown into a multi-disciplinary design and build partner, trusted across 10+ districts in Tamil Nadu.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.75", color: "#4a5c6a", marginBottom: "24px" }}>
              Rooted in Erode and driven by values of craftsmanship, structural integrity, and lifelong client relationships, we approach every architectural project as a dedicated partnership.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700", fontSize: "1.1rem" }}>✓</span>
                <div>
                  <strong style={{ color: "#1a2a3a", fontSize: "0.9rem" }}>Craftsmanship-Led:</strong>
                  <span style={{ color: "#4a5c6a", fontSize: "0.85rem", marginLeft: "6px" }}>Precision fabrication and architectural detailing in every system</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700", fontSize: "1.1rem" }}>✓</span>
                <div>
                  <strong style={{ color: "#1a2a3a", fontSize: "0.9rem" }}>Long-Term Relationships:</strong>
                  <span style={{ color: "#4a5c6a", fontSize: "0.85rem", marginLeft: "6px" }}>Dedicated end-to-end partnership from first sketch to post-handover</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/assets/story-interiors.png"
              alt="Four Square Living Spaces"
              style={{ width: "100%", height: "460px", objectFit: "cover", borderRadius: "18px", boxShadow: "0 20px 50px rgba(13,33,48,0.12)" }}
            />
          </div>
        </div>
      </section>

      {/* 4. Evolution Timeline */}
      <section style={{ padding: "90px 0", background: "#ffffff" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: "48px" }}>
            <span className="badge">Our Evolution</span>
            <h2 className="section-title">A Journey of <span className="text-gradient">Continuous Growth</span></h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }} className="evolution-grid-wrap">
            {[
              { num: "01", title: "THE FOUNDATION", desc: "Focused UPVC fenestration expertise with German-standard profile fabrication and precision engineering." },
              { num: "02", title: "PRECISION FABRICATION", desc: "Expanded in-house manufacturing capacity, precision cutting, fusion-welded corner joints and strict QC." },
              { num: "03", title: "ALUMINIUM SYSTEMS", desc: "Broadened portfolio with contemporary, ultra-slim architectural aluminium sliding and casement systems." },
              { num: "04", title: "MODULAR INTERIORS", desc: "Extended capability into turnkey modular kitchens, wardrobes, and coordinated home interiors." },
              { num: "05", title: "REGIONAL EXPANSION", desc: "Serving homes, villas, commercial projects, and institutions across 10+ districts in Tamil Nadu." },
              { num: "06", title: "TODAY & BEYOND", desc: "An integrated windows, doors, and interiors powerhouse with a flagship experience centre in Erode." }
            ].map((st, sidx) => (
              <div
                key={sidx}
                style={{
                  padding: "32px",
                  background: "#faf8f5",
                  border: "1px solid #dfe7ec",
                  borderRadius: "14px",
                  boxShadow: "0 8px 24px rgba(13,33,48,0.04)"
                }}
              >
                <span style={{ display: "inline-block", padding: "4px 10px", background: "#0d6eaa", color: "#ffffff", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "700", marginBottom: "12px" }}>
                  STAGE {st.num}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1a2a3a", margin: "0 0 8px" }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#4a5c6a", lineHeight: "1.65", margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Promise */}
      <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #0d2130, #132f45)", color: "#ffffff", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span className="badge badge-light" style={{ marginBottom: "16px" }}>Our Promise</span>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: "600", margin: "0 0 16px", color: "#ffffff" }}>
            Our Name. <span style={{ color: "#168bd2" }}>Our Responsibility.</span>
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.75", color: "rgba(255,255,255,0.85)", margin: "0 0 28px" }}>
            Every window, door, and interior we deliver carries our name — and we treat that as a responsibility, not a formality. We're here to build spaces that serve you well for years to come.
          </p>
          <div style={{ fontSize: "1.2rem", fontWeight: "700", letterSpacing: "0.08em", color: "#8bd1fb" }}>
            WINDOWS. DOORS. INTERIORS. <span style={{ color: "#ffffff" }}>BUILT RIGHT.</span>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section style={{ padding: "80px 0", background: "#ffffff", textAlign: "center" }}>
        <div className="wrap">
          <h2 className="section-title">Ready to build something beautiful?</h2>
          <p className="section-copy" style={{ margin: "0 auto 28px" }}>
            Visit our flagship experience centre in Erode or request a personalized consultation.
          </p>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("/contact")}
            className="btn btn-primary"
          >
            Contact Our Team →
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .glance-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
          .about-story-grid { grid-template-columns: 1fr !important; }
          .evolution-grid-wrap { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 576px) {
          .glance-grid-wrap { grid-template-columns: 1fr !important; }
          .evolution-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ============================================================
   2. DOWNLOADS LIBRARY PAGE (14 Official Laboratory Documents)
   ============================================================ */
export const DownloadsPage = ({ onNavigate }) => {
  const groups = [
    {
      category: "Product Brochures",
      files: [
        { name: "uPVC Windows Comprehensive Brochure", file: "upvc-windows-brochure.pdf", size: "9.2 MB" }
      ]
    },
    {
      category: "Laboratory Test Reports & Certifications",
      files: [
        { name: "Test Results & Certifications (Combined Dossier)", file: "test-results-certifications.pdf", size: "4.1 MB" },
        { name: "Test Results Official Summary", file: "test-results-summary.pdf", size: "1.1 MB" },
        { name: "Accelerated Weathering Test (25,000 hrs Xenon)", file: "accelerated-weathering-test.pdf", size: "1.9 MB" },
        { name: "BSI-UK Comprehensive Test Report", file: "bsi-uk-test-report.pdf", size: "10.9 MB" },
        { name: "CIPET India Polymer Technology Test Report", file: "cipet-test-report.pdf", size: "16.8 MB" },
        { name: "Charpy Impact Strength Test Report", file: "charpy-impact-test.pdf", size: "1.7 MB" },
        { name: "Flexural Modulus of Elasticity Test", file: "flexural-modulus-test.pdf", size: "415 KB" },
        { name: "SGS RoHS Lead-Free Environmental Report", file: "sgs-rohs-test-report.pdf", size: "8.7 MB" },
        { name: "SKZ-Germany Performance Certification", file: "skz-germany-certification.pdf", size: "13.3 MB" },
        { name: "Tensile Impact Strength Test", file: "tensile-impact-test.pdf", size: "504 KB" },
        { name: "Vicat Softening Temperature Report", file: "vicat-softening-test.pdf", size: "472 KB" },
        { name: "Corner Weld Joint Strength Test Result", file: "weld-strength-test.pdf", size: "503 KB" },
        { name: "ISO 9001:2015 Quality Management Certificate", file: "iso-9001-2015-certificate.pdf", size: "545 KB" }
      ]
    }
  ];

  return (
    <div className="downloads-page-root">
      <section
        style={{
          padding: "85px 0 65px",
          background: "linear-gradient(180deg, #0d2130, #132f45)",
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <div className="wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="badge badge-light" style={{ marginBottom: "14px" }}>Technical Resources</span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "600", lineHeight: "1.12", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Downloads Library
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: 0 }}>
            Download official uPVC brochures, accredited test certificates, weathering reports, and engineering data sheets directly.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="wrap">
          {groups.map((grp, gidx) => (
            <div key={gidx} style={{ marginBottom: "54px" }}>
              <div style={{ padding: "12px 20px", background: "#0d2137", color: "#ffffff", borderRadius: "8px", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", margin: 0, fontWeight: "600" }}>
                  {grp.category}
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px" }} className="downloads-grid-wrap">
                {grp.files.map((doc, didx) => (
                  <div
                    key={didx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "18px",
                      padding: "24px",
                      background: "#faf8f5",
                      border: "1px solid #dfe7ec",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(13,33,48,0.04)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <span
                        style={{
                          width: "48px",
                          height: "56px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg, #0d6eaa, #2196f3)",
                          color: "#ffffff",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: "700",
                          fontSize: "0.75rem",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0
                        }}
                      >
                        PDF
                      </span>
                      <div>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1a2a3a", margin: "0 0 4px" }}>
                          {doc.name}
                        </h3>
                        <span style={{ fontSize: "0.74rem", color: "#7a8b99" }}>
                          Portable Document Format · {doc.size}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/assets/${doc.file}`}
                      download
                      className="btn btn-outline"
                      style={{ padding: "8px 16px", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                    >
                      Download ▾
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .downloads-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ============================================================
   3. MULTI-CATEGORY GALLERY PAGE (24 Verified Images + Lightbox)
   ============================================================ */
export const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeLightbox, setActiveLightbox] = useState(null);

  const galleryItems = [
    { img: "work-upvc.png", category: "UPVC", title: "Casement uPVC Window Installation" },
    { img: "work-aluminium.png", category: "ALUMINIUM", title: "Slim Architectural Aluminium Frames" },
    { img: "work-sliding.png", category: "UPVC DOORS", title: "Heavy Duty Sliding Glass Doors" },
    { img: "work-bedroom.png", category: "BEDROOM", title: "Master Bedroom Wardrobes & Headboard" },
    { img: "work-kitchen.png", category: "KITCHEN", title: "Contemporary Island Modular Kitchen" },
    { img: "work-living.png", category: "LIVING", title: "Luxury Living Room TV Unit & Partition" },
    { img: "work-headboard.png", category: "BEDROOM", title: "Bespoke Acoustic Padded Headboard" },
    { img: "work-galley.png", category: "KITCHEN", title: "Parallel Galley Kitchen Layout" },
    { img: "work-wood.png", category: "UPVC", title: "Golden Oak Woodgrain uPVC Windows" },
    { img: "work-island.png", category: "KITCHEN", title: "Breakfast Island Counter with Quartz Top" },
    { img: "work-grey.png", category: "ALUMINIUM", title: "Anthracite Grey Aluminium Windows" },
    { img: "story-interiors.png", category: "INTERIORS", title: "Complete Villa Interior Styling" },
    { img: "interior-living.png", category: "LIVING", title: "Open Plan Living & Dining Concept" },
    { img: "interior-kitchen.png", category: "KITCHEN", title: "L-Shaped Modular Kitchen with Lofts" },
    { img: "interior-bedroom.png", category: "BEDROOM", title: "Minimalist Modern Bedroom Wardrobe" },
    { img: "product-upvc.png", category: "UPVC", title: "Multi-Chambered uPVC Profile Structure" },
    { img: "product-sliding.png", category: "UPVC DOORS", title: "3-Track Sliding Door System" },
    { img: "product-aluminium.png", category: "ALUMINIUM", title: "High-Rise Certified Aluminium Slider" },
    { img: "homworks-living.jpg", category: "LIVING", title: "Fluted Wall Panel with Floating TV Console" },
    { img: "homworks-bedroom.jpg", category: "BEDROOM", title: "Floor-to-Ceiling Wardrobes & Dresser" },
    { img: "homworks-hall.jpg", category: "INTERIORS", title: "Foyer Console with Backlit Mirror" },
    { img: "upvc-detail-09.jpg", category: "UPVC", title: "Precision 45-Degree Fusion Welded Corner" },
    { img: "upvc-detail-10.jpg", category: "UPVC", title: "Heavy Duty Multi-Point Security Hardware" },
    { img: "upvc-detail-12.jpg", category: "UPVC", title: "Twin EPDM Perimeter Sealing Gaskets" }
  ];

  const categories = ["ALL", "UPVC", "UPVC DOORS", "ALUMINIUM", "INTERIORS", "KITCHEN", "BEDROOM", "LIVING"];

  const filteredItems = selectedCategory === "ALL"
    ? galleryItems
    : galleryItems.filter(i => i.category === selectedCategory);

  const handleNext = () => {
    if (!activeLightbox) return;
    const curIdx = filteredItems.findIndex(i => i.img === activeLightbox.img);
    const nxtIdx = (curIdx + 1) % filteredItems.length;
    setActiveLightbox(filteredItems[nxtIdx]);
  };

  const handlePrev = () => {
    if (!activeLightbox) return;
    const curIdx = filteredItems.findIndex(i => i.img === activeLightbox.img);
    const prvIdx = (curIdx - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightbox(filteredItems[prvIdx]);
  };

  return (
    <div className="gallery-page-root">
      <section
        style={{
          padding: "85px 0 65px",
          background: "linear-gradient(180deg, #0d2130, #132f45)",
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <div className="wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="badge badge-light" style={{ marginBottom: "14px" }}>Project Portfolio</span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "600", lineHeight: "1.12", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Complete Work Gallery
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: 0 }}>
            Explore verified installations across all four divisions — uPVC windows, doors, aluminium architectural systems, and complete bespoke interiors.
          </p>
        </div>
      </section>

      <section style={{ padding: "70px 0", background: "#ffffff" }}>
        <div className="wrap">
          {/* Category Filter Pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "42px" }}>
            {categories.map((cat, cidx) => (
              <button
                key={cidx}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: selectedCategory === cat ? "2px solid #0d6eaa" : "1px solid #dfe7ec",
                  background: selectedCategory === cat ? "#0d6eaa" : "#faf8f5",
                  color: selectedCategory === cat ? "#ffffff" : "#4a5c6a",
                  transition: "all 0.2s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "22px" }} className="gallery-grid-wrap">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                  key={item.title + item.img}
                  onClick={() => setActiveLightbox(item)}
                  style={{
                    position: "relative",
                    height: "320px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#dce5ea",
                    boxShadow: "0 8px 24px rgba(13,33,48,0.06)"
                  }}
                  className="gallery-card-box"
                >
                  <img
                    src={`/assets/${item.img}`}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "auto 0 0",
                      padding: "20px",
                      background: "linear-gradient(transparent, rgba(13,33,48,0.92))",
                      color: "#ffffff"
                    }}
                  >
                    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "99px", background: "linear-gradient(135deg, #0d6eaa, #2196f3)", fontSize: "0.68rem", fontWeight: "700", marginBottom: "6px" }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", margin: 0, color: "#ffffff" }}>
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close-btn" onClick={() => setActiveLightbox(null)}>&times;</button>
              <button className="lightbox-nav-btn lightbox-prev" onClick={handlePrev}>&#8249;</button>
              <button className="lightbox-nav-btn lightbox-next" onClick={handleNext}>&#8250;</button>
              <img src={`/assets/${activeLightbox.img}`} alt={activeLightbox.title} />
              <div className="lightbox-caption">
                <span className="badge-light" style={{ display: "inline-block", padding: "4px 12px", borderRadius: "99px", fontSize: "0.72rem", marginBottom: "6px" }}>
                  {activeLightbox.category}
                </span>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>{activeLightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-card-box:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 992px) {
          .gallery-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 576px) {
          .gallery-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ============================================================
   4. CONTACT US PAGE (Erode Real Info + Estimate Form)
   ============================================================ */
export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Erode",
    service: "uPVC Windows & Doors",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-root">
      <section
        style={{
          padding: "85px 0 65px",
          background: "linear-gradient(180deg, #0d2130, #132f45)",
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <div className="wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <span className="badge badge-light" style={{ marginBottom: "14px" }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: "600", lineHeight: "1.12", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Contact Four Square
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.65", margin: 0 }}>
            Visit our flagship experience centre in Erode or request a complimentary on-site measurement and estimate.
          </p>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: "#faf8f5" }}>
        <div className="wrap contact-grid-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "50px", alignItems: "start" }}>
          {/* Left: Experience Centre Locations */}
          <div>
            <span className="badge" style={{ marginBottom: "14px" }}>Showroom</span>
            <h2 className="section-title" style={{ margin: "0 0 24px" }}>Our Experience Centre</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Erode Location */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #dfe7ec", boxShadow: "0 8px 24px rgba(13,33,48,0.04)" }}>
                <h3 style={{ color: "#0d6eaa", fontSize: "1.2rem", fontWeight: "600", margin: "0 0 8px" }}>
                  Erode Flagship Experience Centre
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#4a5c6a", lineHeight: "1.6", margin: "0 0 12px" }}>
                  Perundurai Road, Erode, Tamil Nadu
                </p>
                <div style={{ fontSize: "0.92rem", fontWeight: "600", color: "#1a2a3a" }}>
                  📞 Phone: <a href="tel:+919842733123" style={{ color: "#0d6eaa" }}>98427 33123</a>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#7a8b99", marginTop: "4px" }}>
                  Working Hours: Mon–Sat 10:00 AM – 7:00 PM
                </div>
              </div>

              {/* Direct Email */}
              <div style={{ background: "#0d2137", color: "#ffffff", padding: "24px 28px", borderRadius: "14px" }}>
                <strong style={{ color: "#8bd1fb", fontSize: "0.92rem" }}>Direct Email Communication:</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.88rem" }}>
                  <a href="mailto:info@foursquares.co.in" style={{ color: "#ffffff", fontWeight: "600" }}>
                    info@foursquares.co.in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Consultation Form */}
          <div style={{ background: "#ffffff", padding: "40px", borderRadius: "18px", border: "1px solid #dfe7ec", boxShadow: "0 18px 50px rgba(13,33,48,0.08)" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#1a2a3a", margin: "0 0 6px" }}>
              Request a Free Consultation
            </h3>
            <p style={{ fontSize: "0.86rem", color: "#7a8b99", margin: "0 0 24px" }}>
              Fill in your contact details and our team will get in touch within 24 hours.
            </p>

            {submitted ? (
              <div style={{ padding: "32px", background: "#edf9f0", border: "1px solid #a3e635", borderRadius: "12px", textAlign: "center", color: "#15803d" }}>
                <h4 style={{ fontSize: "1.2rem", margin: "0 0 8px" }}>Thank You!</h4>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  Your request has been received. Our project consultant will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "6px" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "6px" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98427 33123"
                      value={formValues.phone}
                      onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "6px" }}>
                      City / Location
                    </label>
                    <select
                      value={formValues.city}
                      onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
                    >
                      <option value="Erode">Erode</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Salem">Salem</option>
                      <option value="Karur">Karur</option>
                      <option value="Other">Other Tamil Nadu District</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "6px" }}>
                    Service Interested In
                  </label>
                  <select
                    value={formValues.service}
                    onChange={(e) => setFormValues({ ...formValues, service: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
                  >
                    <option value="uPVC Windows & Doors">uPVC Windows &amp; Doors</option>
                    <option value="Aluminium Systems">Aluminium Architectural Systems</option>
                    <option value="Full Home Interiors">Full Home Interiors</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="All Integrated Services">All Integrated Services</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "#1a2a3a", marginBottom: "6px" }}>
                    Project Notes / Dimensions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your home, villa, or commercial floor plan..."
                    value={formValues.notes}
                    onChange={(e) => setFormValues({ ...formValues, notes: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "14px", marginTop: "8px", justifyContent: "center" }}
                >
                  Submit Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
