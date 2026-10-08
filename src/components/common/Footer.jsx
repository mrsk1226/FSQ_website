import React from "react";

export const Footer = ({ onNavigate }) => {
  const handleLink = (e, path) => {
    if (e && path.startsWith("/")) {
      e.preventDefault();
      if (onNavigate) onNavigate(path);
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0d1a25, #070f15)",
        color: "rgba(255, 255, 255, 0.65)",
        padding: "70px 0 28px",
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 0.9fr 1.1fr",
            gap: "40px",
            marginBottom: "48px"
          }}
          className="footer-grid-layout"
        >
          {/* Column 1: Brand & Socials */}
          <div>
            <img
              src="/assets/four-square-logo.png"
              alt="Four Square"
              style={{ width: "190px", filter: "brightness(0) invert(1)", marginBottom: "16px" }}
            />
            <p style={{ fontSize: "0.85rem", lineHeight: "1.7", color: "rgba(255, 255, 255, 0.7)", maxWidth: "300px" }}>
              Premium uPVC and aluminium windows, architectural doors, and bespoke complete interiors — designed, manufactured, and installed by one trusted local team.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "22px" }} aria-label="Social links">
              {/* Facebook */}
              <a
                href="https://foursquares.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.25s ease"
                }}
                className="social-btn fb-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://foursquares.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.25s ease"
                }}
                className="social-btn ig-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://foursquares.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.25s ease"
                }}
                className="social-btn in-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://foursquares.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "#ffffff",
                  transition: "all 0.25s ease"
                }}
                className="social-btn yt-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="#0d1a25"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "600", position: "relative", marginBottom: "20px", paddingBottom: "10px" }}>
              Quick Links
              <span style={{ position: "absolute", left: 0, bottom: 0, width: "36px", height: "2px", background: "#0d6eaa" }} />
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="/" onClick={(e) => handleLink(e, "/")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.2s, transform 0.2s" }} className="footer-link">
                Home
              </a>
              <a href="/gallery" onClick={(e) => handleLink(e, "/gallery")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Our Work / Gallery
              </a>
              <a href="/about" onClick={(e) => handleLink(e, "/about")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                About Us
              </a>
              <a href="/downloads" onClick={(e) => handleLink(e, "/downloads")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Downloads Library
              </a>
              <a href="/contact" onClick={(e) => handleLink(e, "/contact")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Contact Us
              </a>
            </div>
          </div>

          {/* Column 3: Our Products */}
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "600", position: "relative", marginBottom: "20px", paddingBottom: "10px" }}>
              Our Products
              <span style={{ position: "absolute", left: 0, bottom: 0, width: "36px", height: "2px", background: "#0d6eaa" }} />
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="/products/interiors" onClick={(e) => handleLink(e, "/products/interiors")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Complete Interiors
              </a>
              <a href="/products/upvc/casement" onClick={(e) => handleLink(e, "/products/upvc/casement")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                uPVC Windows
              </a>
              <a href="/products/upvc-doors/casement" onClick={(e) => handleLink(e, "/products/upvc-doors/casement")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                uPVC Doors
              </a>
              <a href="/products/aluminium/sliding" onClick={(e) => handleLink(e, "/products/aluminium/sliding")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Aluminium Systems
              </a>
              <a href="/products/upvc/colours" onClick={(e) => handleLink(e, "/products/upvc/colours")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                uPVC Finishes
              </a>
              <a href="/products/aluminium/colours" onClick={(e) => handleLink(e, "/products/aluminium/colours")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }} className="footer-link">
                Aluminium Finishes
              </a>
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: "600", position: "relative", marginBottom: "20px", paddingBottom: "10px" }}>
              Contact Us
              <span style={{ position: "absolute", left: 0, bottom: 0, width: "36px", height: "2px", background: "#0d6eaa" }} />
            </h3>
            <div style={{ fontSize: "0.82rem", lineHeight: "1.6", color: "rgba(255,255,255,0.7)" }}>
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>Erode Experience Centre:</strong>
                Perundurai Road, Erode, Tamil Nadu<br />
                <a href="tel:+919842733123" style={{ color: "#8bd1fb", textDecoration: "none", fontWeight: "600", display: "inline-block", marginTop: "4px" }}>
                  📞 98427 33123
                </a>
              </div>

              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <a href="mailto:info@foursquares.co.in" style={{ color: "#8bd1fb", textDecoration: "none", display: "block" }}>
                  ✉️ info@foursquares.co.in
                </a>
                <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                  Mon–Sat: 10:00 AM – 7:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.75rem",
            color: "rgba(255, 255, 255, 0.5)"
          }}
        >
          <span>&copy; 2026 Four Square. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="https://foursquares.co.in/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
              Privacy Policy
            </a>
            <a href="https://foursquares.co.in/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid-layout { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 576px) {
          .footer-grid-layout { grid-template-columns: 1fr !important; }
        }
        .footer-link:hover {
          color: #2196f3 !important;
          transform: translateX(4px);
        }
        .social-btn:hover {
          transform: translateY(-2px);
        }
        .fb-btn:hover { background: #1877f2 !important; border-color: #1877f2 !important; }
        .ig-btn:hover { background: linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7) !important; border-color: transparent !important; }
        .in-btn:hover { background: #0a66c2 !important; border-color: #0a66c2 !important; }
        .yt-btn:hover { background: #ff0000 !important; border-color: #ff0000 !important; }
      `}</style>
    </footer>
  );
};

export default Footer;
