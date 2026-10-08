import React from "react";
import { motion } from "framer-motion";
import { MarqueeSection } from "../components/home/MarqueeSection.jsx";
import { StatsBand } from "../components/home/StatsBand.jsx";
import { GreenTreeSection } from "../components/home/GreenTreeSection.jsx";
import { CertificationsSection } from "../components/home/CertificationsSection.jsx";
import { TestimonialsSection } from "../components/home/TestimonialsSection.jsx";

export const HomePage = ({ onNavigate }) => {
  return (
    <div className="homepage-root">
      {/* ============================================================
          3. HERO SECTION (Masked Line Reveal & Staggered Cascade)
          ============================================================ */}
      <section
        style={{
          minHeight: "calc(100vh - 114px)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          color: "#ffffff",
          background: "#0d2130"
        }}
      >
        {/* Hero Background Image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/hero-bedroom.jpg')",
            backgroundPosition: "center 40%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Soft Linear Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(13,33,48,0.35) 0%, rgba(13,33,48,0.45) 50%, rgba(13,33,48,0.65) 100%)",
            zIndex: 1
          }}
        />

        {/* Hero Inner Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(960px, calc(100% - 40px))",
            padding: "80px 0",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Main Headline with Masked Line Reveals */}
          <h1
            style={{
              fontFamily: "'Outfit', 'Poppins', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              fontWeight: "700",
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              margin: "0 0 16px",
              textAlign: "center",
              textShadow: "0 2px 14px rgba(0,0,0,0.35)"
            }}
          >
            <span style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                style={{ display: "inline-block" }}
              >
                Transform Your Space with
              </motion.span>
            </span>
            <br />
            <span style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
                style={{ display: "inline-block", color: "#168bd2" }}
              >
                'Quality Products.'
              </motion.span>
            </span>
          </h1>

          {/* Sub-Headline: Plain Paragraph without entrance animation */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.95)",
              margin: "0 0 28px",
              textShadow: "0 1px 8px rgba(0,0,0,0.35)"
            }}
          >
            Let's build something beautiful.
          </p>

          {/* 3 Pills: uPVC, Aluminium, Interiors (x: -30 -> 0 cascade) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginBottom: "36px"
            }}
          >
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -3, background: "#0d6eaa", color: "#ffffff" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "#ffffff",
                color: "#1a2a3a",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="12" y1="3" x2="12" y2="21"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
              </svg>
              <span>uPVC</span>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -3, background: "#0d6eaa", color: "#ffffff" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "#ffffff",
                color: "#1a2a3a",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="1.5"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
              </svg>
              <span>Aluminium</span>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.9 }}
              whileHover={{ scale: 1.05, y: -3, background: "#0d6eaa", color: "#ffffff" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "#ffffff",
                color: "#1a2a3a",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "600",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Interiors</span>
            </motion.div>
          </div>

          {/* Primary Action Buttons (initial y: 60, animate y: 0, delay: 0.9s) */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.9 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
          >
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("/contact")}
              className="btn btn-primary"
              style={{ padding: "14px 30px", fontSize: "0.95rem" }}
            >
              Get Free Consultation
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("/products/upvc/casement")}
              className="btn"
              style={{ background: "#ffffff", color: "#1a2a3a", padding: "14px 30px", fontSize: "0.95rem" }}
            >
              Explore Products
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          4. VISION & MISSION
          ============================================================ */}
      <section style={{ padding: "100px 0", background: "#faf8f5" }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: "42px" }}>
            <span className="badge">Our Purpose</span>
            <h2 className="section-title">
              Built around <span className="text-gradient">better living.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }} className="purpose-grid-wrap">
            {/* Vision Card */}
            <article
              style={{
                padding: "44px",
                minHeight: "260px",
                borderRadius: "14px",
                background: "linear-gradient(145deg, #1a2a3a, #0d2137)",
                color: "#ffffff",
                boxShadow: "0 20px 50px rgba(13, 33, 48, 0.25)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0d6eaa, #2196f3)",
                  color: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "20px"
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", color: "#ffffff", margin: "0 0 14px", fontWeight: "600" }}>
                Our Vision
              </h3>
              <p style={{ margin: 0, lineHeight: "1.75", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.85)" }}>
                To be India’s most trusted brand for premium windows and interior solutions — setting new standards in quality, design and sustainability for every living space.
              </p>
            </article>

            {/* Mission Card */}
            <article
              style={{
                padding: "44px",
                minHeight: "260px",
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid #dfe7ec",
                boxShadow: "0 12px 36px rgba(13, 33, 48, 0.08)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "4px", background: "linear-gradient(135deg, #0d6eaa, #2196f3)" }} />
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0d6eaa, #2196f3)",
                  color: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "20px"
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", color: "#1a2a3a", margin: "0 0 14px", fontWeight: "600" }}>
                Our Mission
              </h3>
              <p style={{ margin: 0, lineHeight: "1.75", fontSize: "0.95rem", color: "#4a5c6a" }}>
                To deliver world-class aluminium and UPVC window systems combined with stunning interior solutions, using precise engineering and sustainable practices — making premium living accessible.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. OUR WORK MARQUEE
          ============================================================ */}
      <MarqueeSection />

      {/* ============================================================
          6. STATS BAND
          ============================================================ */}
      <StatsBand />

      {/* ============================================================
          7. INTERIORS STORY (Clip Reveal Image + Directional FadeIn Copy)
          ============================================================ */}
      <section style={{ padding: "105px 0", background: "#ffffff", overflow: "hidden" }}>
        <div className="wrap story-grid-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center" }}>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src="/assets/story-interiors.png"
              alt="Complete Interior Solutions"
              loading="lazy"
              style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 24px 60px rgba(13,33,48,0.14)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="badge" style={{ marginBottom: "16px" }}>
              INTERIORS
            </span>
            <h2 className="section-title" style={{ margin: "0 0 18px" }}>
              Complete Interior Solutions
            </h2>
            <p className="section-copy" style={{ marginBottom: "22px" }}>
              Transform your living spaces with modular kitchens, bedroom furniture and living-room solutions. Every detail is custom-designed around your home, routine and taste.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> Custom modular kitchens
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> Luxury wardrobes &amp; storage
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> Curated material finishes &amp; hardware
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> End-to-end design &amp; installation
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("/products/interiors/full-home")}
              className="btn btn-outline"
            >
              Explore Range →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8. UPVC WINDOWS STORY (Reversed Layout with Motion)
          ============================================================ */}
      <section style={{ padding: "105px 0", background: "#faf8f5", overflow: "hidden" }}>
        <div className="wrap story-grid-wrap reverse-story" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center" }}>
          <motion.div
            className="story-content-order"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="badge" style={{ marginBottom: "16px" }}>
              UPVC WINDOWS
            </span>
            <h2 className="section-title" style={{ margin: "0 0 18px" }}>
              Premium UPVC Windows
            </h2>
            <p className="section-copy" style={{ marginBottom: "22px" }}>
              Energy-efficient, low-maintenance premium UPVC windows with multi-chamber profiles for thermal insulation, noise reduction and lasting weather resistance.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> Up to 40 dB noise reduction
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 20-year product warranty
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 100% Lead-free European formulation
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> Multi-point security locking
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("/products/upvc/casement")}
              className="btn btn-outline"
            >
              Explore Range →
            </button>
          </motion.div>
          <motion.div
            className="story-media-order"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src="/assets/work-upvc.png"
              alt="Premium uPVC Windows"
              loading="lazy"
              style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 24px 60px rgba(13,33,48,0.14)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9. ALUMINIUM SYSTEMS STORY
          ============================================================ */}
      <section style={{ padding: "105px 0", background: "#ffffff", overflow: "hidden" }}>
        <div className="wrap story-grid-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "center" }}>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src="/assets/work-aluminium.png"
              alt="Aluminium Windows and Doors"
              loading="lazy"
              style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 24px 60px rgba(13,33,48,0.14)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="badge" style={{ marginBottom: "16px" }}>
              ALUMINIUM SYSTEMS
            </span>
            <h2 className="section-title" style={{ margin: "0 0 18px" }}>
              Aluminium Windows &amp; Doors
            </h2>
            <p className="section-copy" style={{ marginBottom: "22px" }}>
              Ultra-slim aluminium profiles give contemporary architectural spaces maximum glass area, razor-sharp sightlines, and reliable cyclone-tested strength.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 25-year surface protection warranty
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 5,500 Pa high-rise wind-load tested
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 100+ architectural colours &amp; anodized shades
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#1a2a3a", fontWeight: "500" }}>
                <span style={{ color: "#0d6eaa", fontWeight: "700" }}>✓</span> 100% Virgin 6063-T6 alloy
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("/products/aluminium/sliding")}
              className="btn btn-outline"
            >
              Explore Range →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          10. SUSTAINABILITY / GREEN TREE
          ============================================================ */}
      <GreenTreeSection />

      {/* ============================================================
          11. WHY FOUR SQUARE (4 CARDS with Stagger & Hover Lift)
          ============================================================ */}
      <section style={{ padding: "100px 0", background: "#faf8f5" }} className="why-choose-section">
        <div style={{ width: "min(1200px, calc(100% - 48px))", margin: "0 auto" }} className="why-section-inner">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 44px" }} className="why-heading-block">
            <span className="badge" style={{ marginBottom: "14px" }}>Why Choose Us</span>
            <h2 className="section-title" style={{ margin: "14px 0 0", textAlign: "center" }}>
              Engineering Precision. <span className="text-gradient">Local Dedication.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "24px", width: "100%", margin: "0 auto" }} className="why-grid-wrap">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: "Certified Quality",
                desc: "Rigorous testing by SKZ-Germany, BSI-UK, and CIPET India ensures high thermal insulation and cyclone resistance."
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                ),
                title: "In-house Manufacturing",
                desc: "High-precision fabrication, fusion-welded corner joints, and rigorous quality inspection ensure sub-millimeter fit."
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "End-to-end Service",
                desc: "Full turnkey delivery from laser site survey, 3D architectural mockups, to skilled on-site installation by our own team."
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ),
                title: "Warranty Support",
                desc: "Assured 20-year profile warranty and dedicated after-sales service response from experience centre in Erode."
              }
            ].map((card, cidx) => (
              <motion.div
                key={cidx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: cidx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: "#ffffff",
                  padding: "34px 28px",
                  border: "1px solid #dfe7ec",
                  borderRadius: "14px",
                  boxShadow: "0 8px 24px rgba(13,33,48,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxSizing: "border-box"
                }}
                className="why-card-box"
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #0d6eaa, #2196f3)", color: "#ffffff", display: "grid", placeItems: "center", marginBottom: "18px", flexShrink: 0 }}>
                  {card.icon}
                </div>
                <h3 style={{ color: "#1a2a3a", fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#4a5c6a", lineHeight: "1.7", margin: 0 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          12. CERTIFICATIONS
          ============================================================ */}
      <CertificationsSection onNavigate={onNavigate} />

      {/* ============================================================
          13. TESTIMONIALS
          ============================================================ */}
      <TestimonialsSection />

      {/* ============================================================
          14. CTA BAND
          ============================================================ */}
      <section
        style={{
          padding: "80px 0",
          background: "linear-gradient(135deg, #0d6eaa, #2196f3)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="wrap cta-band-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "30px", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: "600", margin: "0 0 8px", color: "#ffffff" }}>
              Book your free consultation
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
              Share your floor plan, measurements or vision — our engineering team will guide you through the ideal solution.
            </p>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="tel:+919842733123"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "#ffffff",
                color: "#0d6eaa",
                fontWeight: "700",
                fontSize: "0.92rem",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
            >
              📞 Erode: 98427 33123
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .why-choose-section {
          width: 100%;
          overflow: hidden;
        }
        .why-section-inner {
          width: min(1200px, calc(100% - 48px));
          margin-inline: auto;
        }
        .why-heading-block {
          text-align: center;
          margin-inline: auto;
        }
        .why-grid-wrap {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin-inline: auto;
        }
        .why-card-box {
          will-change: transform, box-shadow;
        }
        .why-card-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(13, 33, 48, 0.12);
        }
        @media (max-width: 992px) {
          .story-grid-wrap { grid-template-columns: 1fr !important; gap: 40px !important; }
          .why-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .purpose-grid-wrap { grid-template-columns: 1fr !important; }
          .reverse-story .story-media-order { order: 1; }
          .reverse-story .story-content-order { order: 2; }
        }
        @media (max-width: 576px) {
          .why-section-inner { width: calc(100% - 32px) !important; }
          .why-grid-wrap { grid-template-columns: 1fr !important; gap: 16px !important; }
          .cta-band-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
