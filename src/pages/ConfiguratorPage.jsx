import React from "react";
import WindowExperienceConfigurator from "../components/design-diagrams/WindowExperienceConfigurator.jsx";

/**
 * ConfiguratorPage Component (/products/configurator)
 * Dedicated interactive window customization studio page.
 */
export const ConfiguratorPage = ({ onNavigate, currentRoute }) => {
  return (
    <div className="configurator-page-root">
      <WindowExperienceConfigurator onNavigate={onNavigate} currentRoute={currentRoute} />
    </div>
  );
};

export default ConfiguratorPage;
