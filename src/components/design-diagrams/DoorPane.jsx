import React from "react";

/**
 * DoorPane Component
 * Renders an individual door leaf/pane with door dimensions, 3D hover transforms & door handles.
 */
export const DoorPane = ({ pane }) => {
  if (!pane || pane.type === "fixed") {
    return <div className="door-fixed" />;
  }

  let sashClass = "";
  let handleClass = "handle-pos-right";
  let hasHandle = true;

  if (pane.type === "open") {
    if (pane.hinge === "left") {
      sashClass = "door-sash-hinge-left";
      handleClass = "handle-pos-right";
    } else {
      sashClass = "door-sash-hinge-right";
      handleClass = "handle-pos-left";
    }
  } else if (pane.type === "slide") {
    if (pane.direction === "left") {
      sashClass = "door-sash-slide-left";
      handleClass = pane.handlePos ? `handle-pos-${pane.handlePos}` : "handle-pos-left";
    } else {
      sashClass = "door-sash-slide-right";
      handleClass = pane.handlePos ? `handle-pos-${pane.handlePos}` : "handle-pos-right";
    }
  } else if (pane.type === "fold") {
    const idx = pane.foldIndex || 1;
    sashClass = `door-sash-fold door-sash-fold-${idx}`;
    handleClass = idx % 2 === 1 ? "handle-pos-right" : "handle-pos-left";
    hasHandle = idx === (pane.leadIndex || 1);
  }

  return (
    <div className={`door-sash ${sashClass}`}>
      {hasHandle && <span className={`door-handle ${handleClass}`} />}
    </div>
  );
};

export default DoorPane;
