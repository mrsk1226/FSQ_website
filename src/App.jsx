import React, { useState, useEffect } from "react";
import { UtilityBar, Navbar, Footer } from "./components/common/index.js";
import {
  HomePage,
  ProductsLandingPage,
  InteriorsLandingPage,
  FullHomeInteriorsPage,
  KitchenInteriorsPage,
  BedroomInteriorsPage,
  KidsRoomInteriorsPage,
  WardrobesInteriorsPage,
  LivingRoomInteriorsPage,
  TVUnitsInteriorsPage,
  DiningInteriorsPage,
  VanityInteriorsPage,
  PoojaRoomInteriorsPage,
  HomeOfficeInteriorsPage,
  SofasInteriorsPage,
  MaterialsInteriorsPage,
  ProcessInteriorsPage,
  GalleryInteriorsPage,
  UpvcOverviewPage,
  UpvcCasementPage,
  UpvcSlidingPage,
  UpvcTiltTurnPage,
  UpvcColoursPage,
  UpvcDoorsOverviewPage,
  UpvcDoorsCasementPage,
  UpvcDoorsSlidingPage,
  UpvcDoorsSlideFoldPage,
  UpvcDoorsColoursPage,
  AluminiumOverviewPage,
  AluminiumCasementPage,
  AluminiumSlidingPage,
  AluminiumColoursPage,
  GlassPage,
  ConfiguratorPage,
  AboutPage,
  ContactPage,
  DownloadsPage,
  GalleryPage
} from "./pages/index.js";
import "./components/design-diagrams/design-diagrams.css";
import "./components/interiors/interiors.css";

export function App() {
  // Determine current route from hash or pathname
  const getInitialRoute = () => {
    if (typeof window !== "undefined") {
      const cleanHash = window.location.hash.replace(/^#\/?/, "/");
      if (cleanHash && cleanHash.startsWith("/") && cleanHash !== "/") return cleanHash;
      // Handle legacy or direct query string on root targeting studio
      if (window.location.search && (window.location.search.includes("product=") || window.location.search.includes("type=") || window.location.search.includes("glass=") || window.location.search.includes("finish="))) {
        return `/products/window-studio${window.location.search}`;
      }
      const path = window.location.pathname;
      if (path && path !== "/" && path !== "/index.html") return path;
    }
    return "/";
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  useEffect(() => {
    const handlePopState = () => {
      const cleanHash = window.location.hash.replace(/^#\/?/, "/");
      if (cleanHash && cleanHash.startsWith("/") && cleanHash !== "/") {
        setCurrentRoute(cleanHash);
      } else if (window.location.search && (window.location.search.includes("product=") || window.location.search.includes("type=") || window.location.search.includes("glass=") || window.location.search.includes("finish="))) {
        setCurrentRoute(`/products/window-studio${window.location.search}`);
      } else {
        const path = window.location.pathname;
        setCurrentRoute(path && path !== "/index.html" ? path : "/");
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.location.hash = `#${route}`;
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    const baseRoute = currentRoute.split("?")[0];
    switch (baseRoute) {
      // Products Landing Page
      case "/products":
        return <ProductsLandingPage onNavigate={navigateTo} />;

      // Interiors Routes
      case "/products/interiors":
        return <InteriorsLandingPage onNavigate={navigateTo} />;
      case "/products/interiors/full-home":
        return <FullHomeInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/kitchen":
        return <KitchenInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/bedroom":
        return <BedroomInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/kids-room":
        return <KidsRoomInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/wardrobes":
        return <WardrobesInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/living-room":
        return <LivingRoomInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/tv-units":
        return <TVUnitsInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/dining":
        return <DiningInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/vanity":
        return <VanityInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/pooja-room":
        return <PoojaRoomInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/home-office":
        return <HomeOfficeInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/sofas":
        return <SofasInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/materials":
        return <MaterialsInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/process":
        return <ProcessInteriorsPage onNavigate={navigateTo} />;
      case "/products/interiors/gallery":
        return <GalleryInteriorsPage onNavigate={navigateTo} />;

      // UPVC Window Routes
      case "/products/upvc":
        return <UpvcOverviewPage onNavigate={navigateTo} />;
      case "/products/upvc/casement":
        return <UpvcCasementPage onNavigate={navigateTo} />;
      case "/products/upvc/sliding":
        return <UpvcSlidingPage onNavigate={navigateTo} />;
      case "/products/upvc/tilt-turn":
        return <UpvcTiltTurnPage onNavigate={navigateTo} />;
      case "/products/upvc/colours":
        return <UpvcColoursPage onNavigate={navigateTo} />;

      // UPVC Door Routes
      case "/products/upvc-doors":
        return <UpvcDoorsOverviewPage onNavigate={navigateTo} />;
      case "/products/upvc-doors/casement":
        return <UpvcDoorsCasementPage onNavigate={navigateTo} />;
      case "/products/upvc-doors/sliding":
        return <UpvcDoorsSlidingPage onNavigate={navigateTo} />;
      case "/products/upvc-doors/slide-fold":
        return <UpvcDoorsSlideFoldPage onNavigate={navigateTo} />;
      case "/products/upvc-doors/colours":
        return <UpvcDoorsColoursPage onNavigate={navigateTo} />;

      // Aluminium Routes
      case "/products/aluminium":
        return <AluminiumOverviewPage onNavigate={navigateTo} />;
      case "/products/aluminium/casement":
        return <AluminiumCasementPage onNavigate={navigateTo} />;
      case "/products/aluminium/sliding":
        return <AluminiumSlidingPage onNavigate={navigateTo} />;
      case "/products/aluminium/colours":
        return <AluminiumColoursPage onNavigate={navigateTo} />;

      // Interactive 3D Studio & Architectural Glass Routes
      case "/products/glass":
        return <GlassPage onNavigate={navigateTo} />;
      case "/products/configurator":
      case "/products/window-studio":
      case "/products/upvc/configurator":
      case "/products/aluminium/configurator":
        return <ConfiguratorPage onNavigate={navigateTo} currentRoute={currentRoute} />;

      // Static & Resource Pages
      case "/about":
        return <AboutPage onNavigate={navigateTo} />;
      case "/contact":
        return <ContactPage onNavigate={navigateTo} />;
      case "/gallery":
        return <GalleryPage onNavigate={navigateTo} />;
      case "/downloads":
        return <DownloadsPage onNavigate={navigateTo} />;

      // Default Home Page
      case "/":
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="fsq-app" style={{ fontFamily: "Poppins, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f9fcfd" }}>
      {/* Top Utility Contact Bar */}
      <UtilityBar />

      {/* Global Navigation Bar with exact dropdown + Interiors flyout */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Page Body — instant destination rendering */}
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
