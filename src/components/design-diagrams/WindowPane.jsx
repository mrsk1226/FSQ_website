import React from "react";

/**
 * WindowPane Component
 * Renders an individual fixed or operable window sash with appropriate 3D transforms & handle.
 */
export const WindowPane = ({ pane, isDoor = false }) => {
  if (!pane || pane.type === "fixed") {
    return <div className="window-fixed" />;
  }

  let sashClass = "";
  let handleClass = "handle-pos-right";

  if (pane.type === "open") {
    if (pane.hinge === "left") {
      sashClass = "sash-hinge-left";
      handleClass = "handle-pos-right";
    } else if (pane.hinge === "right") {
      sashClass = "sash-hinge-right";
      handleClass = "handle-pos-left";
    } else if (pane.hinge === "top") {
      sashClass = "sash-hinge-top";
      handleClass = "handle-pos-bottom";
    } else if (pane.hinge === "bottom") {
      sashClass = "sash-hinge-bottom";
      handleClass = "handle-pos-bottom";
    }
  } else if (pane.type === "slide") {
    if (pane.direction === "left") {
      sashClass = "sash-slide-left";
      handleClass = pane.handlePos ? `handle-pos-${pane.handlePos}` : "handle-pos-left";
    } else {
      sashClass = "sash-slide-right";
      handleClass = pane.handlePos ? `handle-pos-${pane.handlePos}` : "handle-pos-right";
    }
  } else if (pane.type === "tilt") {
    if (pane.subType === "tilt-right" || pane.hinge === "right") {
      sashClass = "sash-tilt-right";
      handleClass = "handle-pos-left";
    } else {
      sashClass = "sash-tilt-left";
      handleClass = "handle-pos-right";
    }
  }

  return (
    <div className={`window-sash ${sashClass}`}>
      {pane.type === "slide" ? (
        <span className={`sliding-touch-lock ${handleClass}`} />
      ) : (
        <span className={`window-handle ${handleClass}`} />
      )}
    </div>
  );
};

export default WindowPane;
