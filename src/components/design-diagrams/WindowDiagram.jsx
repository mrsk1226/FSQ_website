import React, { useState } from "react";
import WindowPane from "./WindowPane.jsx";

/**
 * WindowDiagram Component
 * Data-driven window geometry renderer with CSS 3D perspective and natural-width sizing.
 */
export const WindowDiagram = ({
  design,
  state = null, // "closed" | "preview" | "open" | "tilt" | "turn"
  isOpen: controlledIsOpen,
  onToggle,
  overrideWidth,
  overrideHeight,
  className = "",
  style = {},
  hideLabel = false
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  if (!design) return null;

  const {
    name,
    width = "180px",
    height = "125px",
    panes = [],
    topPanes,
    bottomPanes,
    material
  } = design;

  const isAluminium = material === "aluminium";
  const isControlled = state !== null || controlledIsOpen !== undefined;
  const effectiveIsOpen = isControlled ? (state === "open" || controlledIsOpen === true) : localIsOpen;

  let stateClass = "";
  if (state) {
    stateClass = `is-${state}`;
  } else if (effectiveIsOpen) {
    stateClass = "is-open";
  }

  const finalWidth = overrideWidth || width;
  const finalHeight = overrideHeight || height;

  const handleClick = (e) => {
    if (onToggle) {
      onToggle(e);
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  const renderRow = (rowPanes, keyPrefix = "pane") => (
    <div className="window-row">
      {rowPanes.map((pane, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <WindowPane pane={pane} />
          {idx < rowPanes.length - 1 && <div className="window-divider-vertical" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`animated-window-wrapper ${className}`} style={style}>
      <div
        className={`window-model ${stateClass}`}
        style={{ width: finalWidth, height: finalHeight }}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label={`Window design: ${name}`}
      >
        <div className={`window-frame ${isAluminium ? "frame-material-aluminium" : ""}`}>
          {topPanes && (
            <>
              {renderRow(topPanes, "top")}
              <div className="window-divider-horizontal" />
            </>
          )}

          {renderRow(panes, "main")}

          {bottomPanes && (
            <>
              <div className="window-divider-horizontal" />
              {renderRow(bottomPanes, "bottom")}
            </>
          )}
        </div>
      </div>
      {!hideLabel && (
        <div className="diagram-label" style={{ maxWidth: finalWidth }}>
          {name}
        </div>
      )}
    </div>
  );
};

export default WindowDiagram;
