import React from "react";

export const UtilityBar = () => {
  return (
    <aside className="utility-bar" aria-label="Quick contact and branch info" style={{
      background: "#0d2130",
      color: "rgba(216, 231, 240, 0.88)",
      fontSize: "0.74rem",
      fontFamily: "'Inter', sans-serif",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      position: "relative",
      zIndex: 1100
    }}>
      <div className="wrap" style={{
        minHeight: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        padding: "6px 0"
      }}>
        {/* Contact Numbers & Hours */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a8fd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <strong>Erode:</strong> <a href="tel:+919842733123" style={{ color: "#ffffff", fontWeight: "600" }}>98427 33123</a>
          </span>

          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(216, 231, 240, 0.75)", whiteSpace: "nowrap" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Mon–Sat: 10:00 AM–7:00 PM
          </span>
        </div>

        {/* Verified Email & Locations */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
          <a href="mailto:info@foursquares.co.in" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#8bd1fb", fontWeight: "500", textDecoration: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            info@foursquares.co.in
          </a>
          <span style={{ opacity: 0.6 }}>Flagship Experience Centre: Erode</span>
        </div>
      </div>
    </aside>
  );
};

export default UtilityBar;
