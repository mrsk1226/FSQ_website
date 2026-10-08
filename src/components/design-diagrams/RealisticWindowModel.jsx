import React from "react";
import StudioWindowAdapter from "./StudioWindowAdapter.jsx";

/**
 * RealisticWindowModel Component (Legacy Facade)
 * Forwards calls directly to StudioWindowAdapter to ensure a single
 * source of truth for all window geometry and opening mechanisms.
 */
export const RealisticWindowModel = ({
  design,
  finish,
  glass,
  activeState = "closed",
  onStateChange,
  isAluminium = false,
  viewMode = "front"
}) => {
  return (
    <StudioWindowAdapter
      product={isAluminium ? "aluminium" : "upvc"}
      design={design}
      finish={finish}
      glass={glass}
      state={activeState || "closed"}
      onStateChange={onStateChange}
      viewMode={viewMode}
    />
  );
};

export default RealisticWindowModel;
