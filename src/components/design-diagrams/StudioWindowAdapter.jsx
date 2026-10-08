import React from "react";
import WindowDiagram from "./WindowDiagram.jsx";
import "./design-diagrams.css";

/**
 * StudioWindowAdapter Component
 * Connects the interactive studio configuration layer to the existing
 * technical WindowDiagram geometry renderer.
 * 
 * Single Source of Truth:
 * Mechanism Layer: WindowDiagram & design-diagrams.css (exact kinematics)
 * Appearance Layer: CSS Variables (--frame-base, --glass-tint, shaders)
 */
export const StudioWindowAdapter = ({
  product = "upvc",
  windowType = "casement",
  design,
  finish,
  glass,
  state = "closed",
  onStateChange,
  viewMode = "front" // "front" | "angle"
}) => {
  if (!design) return null;

  const rawW = parseInt(design.width || "180", 10);
  const rawH = parseInt(design.height || "125", 10);
  const aspect = rawW / rawH;

  // Proportional sizing for the Studio showcase display
  const targetHeight = 350;
  const computedWidth = Math.round(targetHeight * aspect);
  const finalWidth = Math.min(Math.max(computedWidth, 220), 620);
  const finalHeight = Math.round(finalWidth / aspect);

  // Material & Finish Classification
  const isAluminium = product === "aluminium" || design.material === "aluminium";
  const isWhite = !isAluminium && (finish?.isWhite || finish?.id === "white" || finish?.id === "white-base");
  const isWoodgrain = !isAluminium && !isWhite && (finish?.family === "Woodgrain Laminate" || finish?.type === "wood");

  // CSS Skin Variable Values
  const frameBase = isWhite ? "#f5f6f4" : finish?.baseColor || (isAluminium ? "#525960" : "#f6f7f5");
  const frameHighlight = isWhite ? "#ffffff" : finish?.highlightColor || "#ffffff";
  const frameShadow = isWhite ? "#cfd5d2" : finish?.shadowColor || "#d5dad8";
  const frameMid = isWhite ? "#e8ece9" : finish?.midColor || "#e8ece9";
  const frameRecess = isWhite ? "#bec5c2" : finish?.recessColor || "#bec5c2";
  const frameGrainDark = finish?.grainDark || "#784b1a";
  const frameGrainLight = finish?.grainLight || "#c98e4b";
  const glassTint = glass?.visualTint || "rgba(225, 245, 255, 0.45)";

  const finishClass = isAluminium
    ? "material-aluminium"
    : isWhite
    ? "finish-white"
    : isWoodgrain
    ? "finish-wood"
    : "finish-solid";

  const handleToggle = () => {
    if (!onStateChange) return;
    const isTiltTurn = design.panes?.some((p) => p.type === "tilt");

    if (isTiltTurn) {
      if (state === "closed" || state === "preview") onStateChange("tilt");
      else if (state === "tilt") onStateChange("turn");
      else onStateChange("closed");
    } else {
      if (state === "closed" || state === "preview") onStateChange("open");
      else onStateChange("closed");
    }
  };

  return (
    <div
      className={`studio-window-stage view-${viewMode} ${finishClass}`}
      style={{
        "--frame-base": frameBase,
        "--frame-highlight": frameHighlight,
        "--frame-shadow": frameShadow,
        "--frame-mid": frameMid,
        "--frame-recess": frameRecess,
        "--frame-grain-dark": frameGrainDark,
        "--frame-grain-light": frameGrainLight,
        "--glass-tint": glassTint,
        "--gasket-color": "#1e252b"
      }}
    >
      <WindowDiagram
        design={design}
        state={state}
        onToggle={handleToggle}
        overrideWidth={`${finalWidth}px`}
        overrideHeight={`${finalHeight}px`}
        hideLabel={true}
      />
    </div>
  );
};

export default StudioWindowAdapter;
