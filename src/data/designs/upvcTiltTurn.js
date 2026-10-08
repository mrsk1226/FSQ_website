// uPVC Tilt & Turn Windows Designs
export const upvcTiltTurnDesigns = [
  {
    name: "Single Tilt & Turn",
    width: "75px",
    height: "125px",
    panes: [
      { type: "tilt", hinge: "bottom", subType: "tilt-left" }
    ]
  },
  {
    name: "Double Tilt & Turn",
    width: "135px",
    height: "125px",
    panes: [
      { type: "tilt", hinge: "bottom", subType: "tilt-left" },
      { type: "tilt", hinge: "right", subType: "tilt-right" }
    ]
  },
  {
    name: "Tilt & Turn + Fixed",
    width: "135px",
    height: "125px",
    panes: [
      { type: "tilt", hinge: "bottom", subType: "tilt-left" },
      { type: "fixed" }
    ]
  },
  {
    name: "Tilt & Turn with Bottom Fixed",
    width: "75px",
    height: "155px",
    panes: [
      { type: "tilt", hinge: "bottom", subType: "tilt-left" }
    ],
    bottomPanes: [
      { type: "fixed" }
    ]
  },
  {
    name: "Tilt & Turn with Top Fixed",
    width: "75px",
    height: "155px",
    topPanes: [
      { type: "fixed" }
    ],
    panes: [
      { type: "tilt", hinge: "bottom", subType: "tilt-left" }
    ]
  }
];
