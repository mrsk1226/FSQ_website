import React, { useState, useRef, useEffect } from "react";

export const Navbar = ({ currentRoute = "/", onNavigate }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Mobile accordion state
  const [mobileSectionOpen, setMobileSectionOpen] = useState({
    products: true,
    interiors: false,
    upvcWindows: false,
    upvcDoors: false,
    aluminium: false
  });

  const productsTimerRef = useRef(null);
  const flyoutTimerRef = useRef(null);
  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY || document.documentElement.scrollTop;
        setIsScrolled(currentY > 50);

        if (currentY > 50 && currentY > lastScrollY.current && !isMobileOpen && !isProductsOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobileOpen, isProductsOpen]);

  const handleProductsEnter = () => {
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    setIsProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimerRef.current = setTimeout(() => {
      setIsProductsOpen(false);
      setActiveFlyout(null);
    }, 200);
  };

  const handleParentEnter = (parentId) => {
    if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    setActiveFlyout(parentId);
  };

  const handleFlyoutEnter = () => {
    if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
  };

  const handleFlyoutLeave = () => {
    flyoutTimerRef.current = setTimeout(() => {
      setActiveFlyout(null);
    }, 150);
  };

  const handleLinkClick = (e, path) => {
    if (e) e.preventDefault();
    setIsProductsOpen(false);
    setActiveFlyout(null);
    setIsMobileOpen(false);
    if (onNavigate) onNavigate(path);
  };

  const toggleMobileAccordion = (key) => {
    setMobileSectionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => {
    if (path === "/" && currentRoute === "/") return true;
    if (path !== "/" && currentRoute.startsWith(path)) return true;
    return false;
  };

  // Flyout Definitions with expanded 15-item 2-column Interiors and exact uPVC/Aluminium trees
  const flyouts = {
    interiors: {
      parentRoute: "/products/interiors",
      parentTitle: "Interiors",
      isTwoColumn: true,
      columns: [
        {
          title: "SPACES",
          items: [
            { label: "Full Home Interiors", path: "/products/interiors/full-home" },
            { label: "Modular Kitchen", path: "/products/interiors/kitchen" },
            { label: "Bedroom", path: "/products/interiors/bedroom" },
            { label: "Kids Bedroom", path: "/products/interiors/kids-room" },
            { label: "Wardrobes", path: "/products/interiors/wardrobes" },
            { label: "Living Room", path: "/products/interiors/living-room" },
            { label: "TV Units", path: "/products/interiors/tv-units" },
            { label: "Dining & Crockery", path: "/products/interiors/dining" }
          ]
        },
        {
          title: "SPECIALIZED",
          items: [
            { label: "Vanity / Dressing", path: "/products/interiors/vanity" },
            { label: "Pooja Room", path: "/products/interiors/pooja-room" },
            { label: "Home Office", path: "/products/interiors/home-office" },
            { label: "Sofas & Seating", path: "/products/interiors/sofas" },
            { label: "Materials & Finishes", path: "/products/interiors/materials" },
            { label: "Our Process", path: "/products/interiors/process" },
            { label: "Interior Gallery", path: "/products/interiors/gallery" }
          ]
        }
      ]
    },
    upvc: {
      parentRoute: "/products/upvc",
      parentTitle: "UPVC Windows",
      isTwoColumn: false,
      items: [
        { label: "Casement Windows", path: "/products/upvc/casement" },
        { label: "Sliding Windows", path: "/products/upvc/sliding" },
        { label: "Tilt & Turn Windows", path: "/products/upvc/tilt-turn" },
        { label: "Colour Options", path: "/products/upvc/colours" },
        { label: "Glass Options", path: "/products/glass" },
        { label: "3D Window Studio", path: "/products/window-studio?product=upvc" }
      ]
    },
    "upvc-doors": {
      parentRoute: "/products/upvc-doors",
      parentTitle: "UPVC Doors",
      isTwoColumn: false,
      items: [
        { label: "Casement uPVC Doors", path: "/products/upvc-doors/casement" },
        { label: "Sliding uPVC Doors", path: "/products/upvc-doors/sliding" },
        { label: "Slide & Fold uPVC Doors", path: "/products/upvc-doors/slide-fold" },
        { label: "Colour Options", path: "/products/upvc-doors/colours" }
      ]
    },
    aluminium: {
      parentRoute: "/products/aluminium",
      parentTitle: "Aluminium",
      isTwoColumn: false,
      items: [
        { label: "Sliding Systems", path: "/products/aluminium/sliding" },
        { label: "Casement Systems", path: "/products/aluminium/casement" },
        { label: "Colour Options", path: "/products/aluminium/colours" },
        { label: "Glass Options", path: "/products/glass" },
        { label: "3D Window Studio", path: "/products/window-studio?product=aluminium" }
      ]
    }
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          background: isScrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(230, 230, 230, 0.98)",
          borderBottom: isScrolled ? "1px solid rgba(13, 33, 48, 0.08)" : "1px solid rgba(13, 33, 48, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isScrolled ? "0 6px 24px rgba(13, 33, 48, 0.08)" : "none",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <div
          className="wrap"
          style={{
            height: "76px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px"
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            aria-label="Four Square Homepage"
            style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <img
              src="/assets/four-square-logo.png"
              alt="Four Square"
              style={{ width: "190px", height: "38px", objectFit: "contain", objectPosition: "left" }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px"
            }}
            className="desktop-nav"
          >
            {/* 1. Home */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              style={{
                position: "relative",
                padding: "24px 0",
                fontSize: "0.88rem",
                fontWeight: "600",
                color: isActive("/") && currentRoute === "/" ? "#0d6eaa" : "#1a2a3a",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
            >
              Home
              {isActive("/") && currentRoute === "/" && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: "16px",
                    width: "100%",
                    height: "2.5px",
                    background: "#0d6eaa",
                    borderRadius: "2px"
                  }}
                />
              )}
            </a>

            {/* 2. Our Products with Flyout Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                type="button"
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
                onClick={(e) => handleLinkClick(e, "/products")}
                style={{
                  position: "relative",
                  padding: "24px 0",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  color: isActive("/products") || isProductsOpen ? "#0d6eaa" : "#1a2a3a",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "color 0.2s ease"
                }}
              >
                Our Products
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: isProductsOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s ease"
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {isActive("/products") && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: "16px",
                      width: "100%",
                      height: "2.5px",
                      background: "#0d6eaa",
                      borderRadius: "2px"
                    }}
                  />
                )}
              </button>

              {/* Main Dropdown Panel (Vertical list with side flyouts) */}
              <div
                className={`products-dropdown-panel ${isProductsOpen ? "is-visible" : ""}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "70px",
                  width: "230px",
                  background: "#ffffff",
                  border: "1px solid #dfe7ec",
                  borderRadius: "12px",
                  boxShadow: "0 18px 45px rgba(13, 33, 48, 0.12)",
                  padding: "8px",
                  zIndex: 1200,
                  transformOrigin: "top center",
                  transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
                  opacity: isProductsOpen ? 1 : 0,
                  visibility: isProductsOpen ? "visible" : "hidden",
                  transform: isProductsOpen ? "translateY(0) scaleY(1)" : "translateY(-8px) scaleY(0.95)",
                  pointerEvents: isProductsOpen ? "auto" : "none"
                }}
              >
                {/* 4 Main Parent Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {/* Parent 1: Interiors */}
                  <div
                    onMouseEnter={() => handleParentEnter("interiors")}
                    style={{ position: "relative" }}
                  >
                    <a
                      href="/products/interiors"
                      onClick={(e) => handleLinkClick(e, "/products/interiors")}
                      className={`nav-parent-item ${activeFlyout === "interiors" || isActive("/products/interiors") ? "is-active" : ""}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "0.88rem",
                        fontWeight: "600",
                        color: activeFlyout === "interiors" || isActive("/products/interiors") ? "#0d6eaa" : "#1a2a3a",
                        background: activeFlyout === "interiors" ? "#f0f7ff" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.18s ease"
                      }}
                    >
                      <span>Interiors</span>
                      <span style={{ fontSize: "1.1rem", color: activeFlyout === "interiors" ? "#0d6eaa" : "#8a9ba8", transform: "translateY(-1px)" }}>›</span>
                    </a>
                  </div>

                  {/* Parent 2: UPVC Windows */}
                  <div
                    onMouseEnter={() => handleParentEnter("upvc")}
                    style={{ position: "relative" }}
                  >
                    <a
                      href="/products/upvc"
                      onClick={(e) => handleLinkClick(e, "/products/upvc")}
                      className={`nav-parent-item ${activeFlyout === "upvc" || (isActive("/products/upvc") && !isActive("/products/upvc-doors")) ? "is-active" : ""}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "0.88rem",
                        fontWeight: "600",
                        color: activeFlyout === "upvc" || (isActive("/products/upvc") && !isActive("/products/upvc-doors")) ? "#0d6eaa" : "#1a2a3a",
                        background: activeFlyout === "upvc" ? "#f0f7ff" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.18s ease"
                      }}
                    >
                      <span>UPVC Windows</span>
                      <span style={{ fontSize: "1.1rem", color: activeFlyout === "upvc" ? "#0d6eaa" : "#8a9ba8", transform: "translateY(-1px)" }}>›</span>
                    </a>
                  </div>

                  {/* Parent 3: UPVC Doors */}
                  <div
                    onMouseEnter={() => handleParentEnter("upvc-doors")}
                    style={{ position: "relative" }}
                  >
                    <a
                      href="/products/upvc-doors"
                      onClick={(e) => handleLinkClick(e, "/products/upvc-doors")}
                      className={`nav-parent-item ${activeFlyout === "upvc-doors" || isActive("/products/upvc-doors") ? "is-active" : ""}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "0.88rem",
                        fontWeight: "600",
                        color: activeFlyout === "upvc-doors" || isActive("/products/upvc-doors") ? "#0d6eaa" : "#1a2a3a",
                        background: activeFlyout === "upvc-doors" ? "#f0f7ff" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.18s ease"
                      }}
                    >
                      <span>UPVC Doors</span>
                      <span style={{ fontSize: "1.1rem", color: activeFlyout === "upvc-doors" ? "#0d6eaa" : "#8a9ba8", transform: "translateY(-1px)" }}>›</span>
                    </a>
                  </div>

                  {/* Parent 4: Aluminium */}
                  <div
                    onMouseEnter={() => handleParentEnter("aluminium")}
                    style={{ position: "relative" }}
                  >
                    <a
                      href="/products/aluminium"
                      onClick={(e) => handleLinkClick(e, "/products/aluminium")}
                      className={`nav-parent-item ${activeFlyout === "aluminium" || isActive("/products/aluminium") ? "is-active" : ""}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "0.88rem",
                        fontWeight: "600",
                        color: activeFlyout === "aluminium" || isActive("/products/aluminium") ? "#0d6eaa" : "#1a2a3a",
                        background: activeFlyout === "aluminium" ? "#f0f7ff" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.18s ease"
                      }}
                    >
                      <span>Aluminium</span>
                      <span style={{ fontSize: "1.1rem", color: activeFlyout === "aluminium" ? "#0d6eaa" : "#8a9ba8", transform: "translateY(-1px)" }}>›</span>
                    </a>
                  </div>
                </div>

                {/* Side Flyout Submenu Panel (Opens to the RIGHT with exact 2px gap) */}
                {activeFlyout && flyouts[activeFlyout] && (
                  <div
                    onMouseEnter={handleFlyoutEnter}
                    onMouseLeave={handleFlyoutLeave}
                    className="side-flyout-panel"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "100%",
                      marginLeft: "2px",
                      width: flyouts[activeFlyout].isTwoColumn ? "410px" : "195px",
                      background: "#ffffff",
                      border: "1px solid #dfe7ec",
                      borderRadius: "14px",
                      boxShadow: "0 18px 45px rgba(13, 33, 48, 0.12)",
                      padding: flyouts[activeFlyout].isTwoColumn ? "12px 14px" : "8px",
                      zIndex: 1300,
                      animation: "flyoutEnter 0.2s ease forwards"
                    }}
                  >
                    {flyouts[activeFlyout].isTwoColumn ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        {flyouts[activeFlyout].columns.map((col, cIdx) => (
                          <div key={cIdx} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: "700", color: "#8a9ba8", letterSpacing: "0.08em", padding: "4px 8px", textTransform: "uppercase" }}>
                              {col.title}
                            </div>
                            {col.items.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.path}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                style={{
                                  display: "block",
                                  padding: "7px 10px",
                                  borderRadius: "6px",
                                  fontSize: "0.84rem",
                                  lineHeight: "1.3",
                                  fontWeight: currentRoute === item.path ? "600" : "500",
                                  color: currentRoute === item.path ? "#0d6eaa" : "#3a4d5e",
                                  background: currentRoute === item.path ? "#f0f7ff" : "transparent",
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                  transition: "all 0.15s ease"
                                }}
                                className="flyout-item-link"
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {flyouts[activeFlyout].items.map((item, idx) => (
                          <a
                            key={idx}
                            href={`#${item.path}`}
                            onClick={(e) => handleLinkClick(e, item.path)}
                            style={{
                              display: "block",
                              padding: "9px 12px",
                              borderRadius: "6px",
                              fontSize: "0.86rem",
                              lineHeight: "1.35",
                              fontWeight: currentRoute === item.path ? "600" : "500",
                              color: currentRoute === item.path ? "#0d6eaa" : "#3a4d5e",
                              background: currentRoute === item.path ? "#f0f7ff" : "transparent",
                              textDecoration: "none",
                              whiteSpace: "normal",
                              transition: "all 0.15s ease"
                            }}
                            className="flyout-item-link"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Downloads */}
            <a
              href="/downloads"
              onClick={(e) => handleLinkClick(e, "/downloads")}
              style={{
                position: "relative",
                padding: "24px 0",
                fontSize: "0.95rem",
                fontWeight: "500",
                color: isActive("/downloads") ? "#0d6eaa" : "#1a2a3a",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              className="nav-top-link"
            >
              Downloads
              <span className="nav-link-underline" style={{ width: isActive("/downloads") ? "100%" : "0%" }} />
            </a>

            {/* 4. Gallery */}
            <a
              href="/gallery"
              onClick={(e) => handleLinkClick(e, "/gallery")}
              style={{
                position: "relative",
                padding: "24px 0",
                fontSize: "0.95rem",
                fontWeight: "500",
                color: isActive("/gallery") ? "#0d6eaa" : "#1a2a3a",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              className="nav-top-link"
            >
              Gallery
              <span className="nav-link-underline" style={{ width: isActive("/gallery") ? "100%" : "0%" }} />
            </a>

            {/* 5. About Us */}
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, "/about")}
              style={{
                position: "relative",
                padding: "24px 0",
                fontSize: "0.95rem",
                fontWeight: "500",
                color: isActive("/about") ? "#0d6eaa" : "#1a2a3a",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              className="nav-top-link"
            >
              About Us
              <span className="nav-link-underline" style={{ width: isActive("/about") ? "100%" : "0%" }} />
            </a>

            {/* 6. Contact */}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, "/contact")}
              style={{
                position: "relative",
                padding: "24px 0",
                fontSize: "0.95rem",
                fontWeight: "500",
                color: isActive("/contact") ? "#0d6eaa" : "#1a2a3a",
                textDecoration: "none",
                transition: "color 0.2s ease"
              }}
              className="nav-top-link"
            >
              Contact
              <span className="nav-link-underline" style={{ width: isActive("/contact") ? "100%" : "0%" }} />
            </a>

            {/* 7. Get Free Quote CTA Button */}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, "/contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 20px",
                border: "1.5px solid #1a2a3a",
                borderRadius: "6px",
                color: "#1a2a3a",
                background: "transparent",
                fontWeight: "600",
                fontSize: "0.88rem",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a2a3a";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a2a3a";
                e.currentTarget.style.transform = "none";
              }}
            >
              Get Free Quote
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            className="mobile-menu-btn"
            style={{
              display: "none",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              border: "1px solid #dfe7ec",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a2a3a",
              background: "transparent",
              cursor: "pointer"
            }}
          >
            {isMobileOpen ? (
              <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>&times;</span>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (<=1024px) */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: "24px",
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          {/* Mobile Header Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0" }}>
            <img src="/assets/four-square-logo.png" alt="Four Square" style={{ width: "170px", height: "auto" }} />
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              style={{ width: "44px", height: "44px", fontSize: "2rem", display: "grid", placeItems: "center", color: "#1a2a3a", background: "none", border: "none", cursor: "pointer" }}
            >
              &times;
            </button>
          </div>

          {/* Mobile Links List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Home */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", borderBottom: "1px solid #f1f5f9", color: currentRoute === "/" ? "#0d6eaa" : "#1a2a3a", textDecoration: "none" }}
            >
              Home
            </a>

            {/* Our Products Accordion */}
            <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "6px" }}>
              <div
                onClick={() => toggleMobileAccordion("products")}
                style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: isActive("/products") ? "#0d6eaa" : "#1a2a3a" }}
              >
                <span>Our Products</span>
                <span style={{ transform: mobileSectionOpen.products ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", fontSize: "0.9rem" }}>▾</span>
              </div>

              {mobileSectionOpen.products && (
                <div style={{ paddingLeft: "14px", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                  {/* All Products Landing Page Link */}
                  <a
                    href="/products"
                    onClick={(e) => handleLinkClick(e, "/products")}
                    style={{ fontSize: "0.9rem", fontWeight: "600", color: currentRoute === "/products" ? "#0d6eaa" : "#0d6eaa", padding: "8px 0", textDecoration: "none" }}
                  >
                    All Products Overview →
                  </a>

                  {/* 1. Interiors Sub-Accordion */}
                  <div style={{ borderLeft: "2px solid #0d6eaa", paddingLeft: "12px", marginTop: "4px" }}>
                    <div
                      onClick={() => toggleMobileAccordion("interiors")}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "6px 0" }}
                    >
                      <strong style={{ fontSize: "0.95rem", color: isActive("/products/interiors") ? "#0d6eaa" : "#1a2a3a" }}>
                        Interiors
                      </strong>
                      <span style={{ transform: mobileSectionOpen.interiors ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", fontSize: "0.8rem", color: "#8a9ba8" }}>▾</span>
                    </div>
                    {mobileSectionOpen.interiors && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "8px", marginTop: "4px" }}>
                        <a href="/products/interiors/full-home" onClick={(e) => handleLinkClick(e, "/products/interiors/full-home")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Full Home Interiors</a>
                        <a href="/products/interiors/kitchen" onClick={(e) => handleLinkClick(e, "/products/interiors/kitchen")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Modular Kitchen</a>
                        <a href="/products/interiors/bedroom" onClick={(e) => handleLinkClick(e, "/products/interiors/bedroom")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Bedroom</a>
                        <a href="/products/interiors/kids-room" onClick={(e) => handleLinkClick(e, "/products/interiors/kids-room")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Kids Bedroom</a>
                        <a href="/products/interiors/wardrobes" onClick={(e) => handleLinkClick(e, "/products/interiors/wardrobes")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Wardrobes</a>
                        <a href="/products/interiors/living-room" onClick={(e) => handleLinkClick(e, "/products/interiors/living-room")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Living Room</a>
                        <a href="/products/interiors/tv-units" onClick={(e) => handleLinkClick(e, "/products/interiors/tv-units")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>TV Units</a>
                        <a href="/products/interiors/dining" onClick={(e) => handleLinkClick(e, "/products/interiors/dining")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Dining &amp; Crockery</a>
                        <a href="/products/interiors/vanity" onClick={(e) => handleLinkClick(e, "/products/interiors/vanity")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Vanity / Dressing</a>
                        <a href="/products/interiors/pooja-room" onClick={(e) => handleLinkClick(e, "/products/interiors/pooja-room")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Pooja Room</a>
                        <a href="/products/interiors/home-office" onClick={(e) => handleLinkClick(e, "/products/interiors/home-office")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Home Office</a>
                        <a href="/products/interiors/sofas" onClick={(e) => handleLinkClick(e, "/products/interiors/sofas")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Sofas &amp; Seating</a>
                        <a href="/products/interiors/materials" onClick={(e) => handleLinkClick(e, "/products/interiors/materials")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Materials &amp; Finishes</a>
                        <a href="/products/interiors/process" onClick={(e) => handleLinkClick(e, "/products/interiors/process")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Our Process</a>
                        <a href="/products/interiors/gallery" onClick={(e) => handleLinkClick(e, "/products/interiors/gallery")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Interior Gallery</a>
                      </div>
                    )}
                  </div>

                  {/* 2. UPVC Windows Sub-Accordion */}
                  <div style={{ borderLeft: "2px solid #0d6eaa", paddingLeft: "12px", marginTop: "6px" }}>
                    <div
                      onClick={() => toggleMobileAccordion("upvcWindows")}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "6px 0" }}
                    >
                      <strong style={{ fontSize: "0.95rem", color: isActive("/products/upvc") && !isActive("/products/upvc-doors") ? "#0d6eaa" : "#1a2a3a" }}>
                        uPVC Windows
                      </strong>
                      <span style={{ transform: mobileSectionOpen.upvcWindows ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", fontSize: "0.8rem", color: "#8a9ba8" }}>▾</span>
                    </div>
                    {mobileSectionOpen.upvcWindows && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "8px", marginTop: "4px" }}>
                        <a href="/products/upvc/casement" onClick={(e) => handleLinkClick(e, "/products/upvc/casement")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Casement</a>
                        <a href="/products/upvc/sliding" onClick={(e) => handleLinkClick(e, "/products/upvc/sliding")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Sliding</a>
                        <a href="/products/upvc/tilt-turn" onClick={(e) => handleLinkClick(e, "/products/upvc/tilt-turn")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Tilt &amp; Turn</a>
                        <a href="/products/upvc/colours" onClick={(e) => handleLinkClick(e, "/products/upvc/colours")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Colour Options</a>
                        <a href="/products/glass" onClick={(e) => handleLinkClick(e, "/products/glass")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Glass Options</a>
                        <a href="#/products/window-studio?product=upvc" onClick={(e) => handleLinkClick(e, "/products/window-studio?product=upvc")} style={{ fontSize: "0.86rem", color: "#0d6eaa", fontWeight: "600", textDecoration: "none" }}>3D Window Studio ✨</a>
                        <a href="/products/upvc" onClick={(e) => handleLinkClick(e, "/products/upvc")} style={{ fontSize: "0.84rem", color: "#0d6eaa", fontWeight: "600", textDecoration: "none" }}>uPVC Windows Overview →</a>
                      </div>
                    )}
                  </div>

                  {/* 3. UPVC Doors Sub-Accordion */}
                  <div style={{ borderLeft: "2px solid #0d6eaa", paddingLeft: "12px", marginTop: "6px" }}>
                    <div
                      onClick={() => toggleMobileAccordion("upvcDoors")}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "6px 0" }}
                    >
                      <strong style={{ fontSize: "0.95rem", color: isActive("/products/upvc-doors") ? "#0d6eaa" : "#1a2a3a" }}>
                        uPVC Doors
                      </strong>
                      <span style={{ transform: mobileSectionOpen.upvcDoors ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", fontSize: "0.8rem", color: "#8a9ba8" }}>▾</span>
                    </div>
                    {mobileSectionOpen.upvcDoors && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "8px", marginTop: "4px" }}>
                        <a href="/products/upvc-doors/casement" onClick={(e) => handleLinkClick(e, "/products/upvc-doors/casement")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Casement uPVC Doors</a>
                        <a href="/products/upvc-doors/sliding" onClick={(e) => handleLinkClick(e, "/products/upvc-doors/sliding")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Sliding uPVC Doors</a>
                        <a href="/products/upvc-doors/slide-fold" onClick={(e) => handleLinkClick(e, "/products/upvc-doors/slide-fold")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Slide &amp; Fold uPVC Doors</a>
                        <a href="/products/upvc-doors/colours" onClick={(e) => handleLinkClick(e, "/products/upvc-doors/colours")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Colour Options</a>
                        <a href="/products/upvc-doors" onClick={(e) => handleLinkClick(e, "/products/upvc-doors")} style={{ fontSize: "0.84rem", color: "#0d6eaa", fontWeight: "600", textDecoration: "none" }}>uPVC Doors Overview →</a>
                      </div>
                    )}
                  </div>

                  {/* 4. Aluminium Sub-Accordion */}
                  <div style={{ borderLeft: "2px solid #0d6eaa", paddingLeft: "12px", marginTop: "6px" }}>
                    <div
                      onClick={() => toggleMobileAccordion("aluminium")}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "6px 0" }}
                    >
                      <strong style={{ fontSize: "0.95rem", color: isActive("/products/aluminium") ? "#0d6eaa" : "#1a2a3a" }}>
                        Aluminium
                      </strong>
                      <span style={{ transform: mobileSectionOpen.aluminium ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease", fontSize: "0.8rem", color: "#8a9ba8" }}>▾</span>
                    </div>
                    {mobileSectionOpen.aluminium && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "8px", marginTop: "4px" }}>
                        <a href="/products/aluminium/sliding" onClick={(e) => handleLinkClick(e, "/products/aluminium/sliding")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Sliding Systems</a>
                        <a href="/products/aluminium/casement" onClick={(e) => handleLinkClick(e, "/products/aluminium/casement")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Casement Systems</a>
                        <a href="/products/aluminium/colours" onClick={(e) => handleLinkClick(e, "/products/aluminium/colours")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Colour Options</a>
                        <a href="/products/glass" onClick={(e) => handleLinkClick(e, "/products/glass")} style={{ fontSize: "0.86rem", color: "#4a5c6a", textDecoration: "none" }}>Glass Options</a>
                        <a href="#/products/window-studio?product=aluminium" onClick={(e) => handleLinkClick(e, "/products/window-studio?product=aluminium")} style={{ fontSize: "0.86rem", color: "#0d6eaa", fontWeight: "600", textDecoration: "none" }}>3D Window Studio ✨</a>
                        <a href="/products/aluminium" onClick={(e) => handleLinkClick(e, "/products/aluminium")} style={{ fontSize: "0.84rem", color: "#0d6eaa", fontWeight: "600", textDecoration: "none" }}>Aluminium Overview →</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Downloads */}
            <a
              href="/downloads"
              onClick={(e) => handleLinkClick(e, "/downloads")}
              style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", borderBottom: "1px solid #f1f5f9", color: currentRoute === "/downloads" ? "#0d6eaa" : "#1a2a3a", textDecoration: "none" }}
            >
              Downloads
            </a>

            {/* Gallery */}
            <a
              href="/gallery"
              onClick={(e) => handleLinkClick(e, "/gallery")}
              style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", borderBottom: "1px solid #f1f5f9", color: currentRoute === "/gallery" ? "#0d6eaa" : "#1a2a3a", textDecoration: "none" }}
            >
              Gallery
            </a>

            {/* About Us */}
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, "/about")}
              style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", borderBottom: "1px solid #f1f5f9", color: currentRoute === "/about" ? "#0d6eaa" : "#1a2a3a", textDecoration: "none" }}
            >
              About Us
            </a>

            {/* Contact */}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, "/contact")}
              style={{ fontSize: "1.1rem", fontWeight: "600", padding: "12px 0", borderBottom: "1px solid #f1f5f9", color: currentRoute === "/contact" ? "#0d6eaa" : "#1a2a3a", textDecoration: "none" }}
            >
              Contact
            </a>

            {/* Free Quote Button */}
            <div style={{ marginTop: "24px" }}>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, "/contact")}
                className="btn-fsq-primary"
                style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for hover effects and animations */}
      <style>{`
        @keyframes flyoutEnter {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .nav-top-link {
          position: relative;
        }
        .nav-link-underline {
          position: absolute;
          left: 0;
          bottom: 16px;
          height: 2px;
          background: #0d6eaa;
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-top-link:hover .nav-link-underline {
          width: 100% !important;
        }
        .nav-parent-item:hover {
          background: #f0f7ff !important;
          color: #0d6eaa !important;
        }
        .nav-parent-item:hover span:last-child {
          color: #0d6eaa !important;
          transform: translateX(2px) translateY(-1px) !important;
        }
        .flyout-item-link:hover {
          background: #f0f7ff !important;
          color: #0d6eaa !important;
          transform: translateX(3px);
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
