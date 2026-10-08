import React, { useState } from "react";
import DoorPane from "./DoorPane.jsx";

/**
 * DoorDiagram Component
 * Renders door models with heavier 8px frame profile, taller dimensions, and 3D hover interactions.
 */
export const DoorDiagram = ({ design }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    name,
    width = "180px",
    height = "190px",
    panes = [],
    topPanes,
    bottomPanes,
    material
  } = design;

  const isAluminium = material === "aluminium";

  const renderRow = (rowPanes, keyPrefix = "door-pane") => (
    <div className="door-row">
      {rowPanes.map((pane, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <DoorPane pane={pane} />
          {idx < rowPanes.length - 1 && <div className="door-divider-vertical" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="animated-door-wrapper">
      <div
        className={`door-model ${isOpen ? "is-open" : ""}`}
        style={{ width, height }}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-label={`Door design: ${name}`}
      >
        <div className={`door-frame ${isAluminium ? "frame-material-aluminium" : ""}`}>
          {topPanes && (
            <>
              {renderRow(topPanes, "top")}
              <div className="door-divider-horizontal" />
            </>
          )}

          {renderRow(panes, "main")}

          {bottomPanes && (
            <>
              <div className="door-divider-horizontal" />
              {renderRow(bottomPanes, "bottom")}
            </>
          )}
        </div>
      </div>
      <div className="diagram-label" style={{ maxWidth: width }}>
        {name}
      </div>
    </div>
  );
};

export default DoorDiagram;
