// Sliding uPVC Doors Designs
export const upvcDoorsSlidingDesigns = [
  {
    name: "2-TRACK 2-PANEL (LEFT SLIDE)",
    width: "175px",
    height: "190px",
    panes: [
      { type: "slide", direction: "right", handlePos: "right" },
      { type: "fixed" }
    ]
  },
  {
    name: "2-TRACK 2-PANEL (RIGHT SLIDE)",
    width: "175px",
    height: "190px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" }
    ]
  },
  {
    name: "3-PANEL SLIDING (CENTER SLIDE)",
    width: "245px",
    height: "190px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" },
      { type: "fixed" }
    ]
  },
  {
    name: "2-TRACK 4-PANEL (CENTER OPENING)",
    width: "300px",
    height: "190px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "right" },
      { type: "slide", direction: "right", handlePos: "left" },
      { type: "fixed" }
    ]
  }
];
