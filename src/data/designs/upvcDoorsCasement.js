// Casement uPVC Doors Designs
export const upvcDoorsCasementDesigns = [
  {
    name: "SINGLE LEFT OPEN",
    width: "95px",
    height: "190px",
    panes: [
      { type: "open", hinge: "left" }
    ]
  },
  {
    name: "SINGLE RIGHT OPEN",
    width: "95px",
    height: "190px",
    panes: [
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "DOUBLE FRENCH DOOR",
    width: "165px",
    height: "190px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "FRENCH DOOR WITH SIDE FIXED",
    width: "240px",
    height: "190px",
    panes: [
      { type: "fixed" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "fixed" }
    ]
  },
  {
    name: "FRENCH DOOR WITH TOP ARCH/FIXED",
    width: "165px",
    height: "225px",
    topPanes: [
      { type: "fixed" },
      { type: "fixed" }
    ],
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  }
];
