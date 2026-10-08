import React from "react";
import WindowDiagram from "./WindowDiagram.jsx";
import DoorDiagram from "./DoorDiagram.jsx";
import "./design-diagrams.css";

/**
 * DesignSection Component
 * Exact FSQ section shell with Poppins light uppercase heading, blue diamond divider,
 * subtitle instruction, and centered flex-wrap row layout system.
 */
export const DesignSection = ({
  heading,
  subtitle,
  designs = [],
  groups,
  isDoor = false
}) => {
  // If groups are specified, use them directly; otherwise partition into natural rows
  let designGroups = groups;
  if (!designGroups) {
    if (designs.length > 10) {
      designGroups = [];
      const row1 = designs.slice(0, 7);
      const row2 = designs.slice(7, 13);
      const row3 = designs.slice(13, 19);
      const row4 = designs.slice(19);
      if (row1.length) designGroups.push(row1);
      if (row2.length) designGroups.push(row2);
      if (row3.length) designGroups.push(row3);
      if (row4.length) designGroups.push(row4);
    } else {
      designGroups = [designs];
    }
  }

  const DiagramComponent = isDoor ? DoorDiagram : WindowDiagram;

  return (
    <section className="design-diagrams-section">
      <div className="design-diagrams-container">
        {heading && <h2 className="design-section-heading">{heading}</h2>}

        <div className="design-section-divider" aria-hidden="true">
          <span className="design-divider-line" />
          <span className="design-divider-diamond" />
          <span className="design-divider-line" />
        </div>

        {subtitle && <p className="design-section-subtitle">{subtitle}</p>}

        <div className="design-groups-container">
          {designGroups.map((group, gIdx) => (
            <div className="design-row" key={`group-${gIdx}`}>
              {group.map((design, dIdx) => (
                <DiagramComponent
                  key={`${design.name}-${dIdx}`}
                  design={design}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
