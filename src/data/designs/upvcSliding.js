// uPVC Sliding Windows Designs
export const upvcSlidingDesigns = [
  {
    name: "2-Track 2-Panel",
    width: "140px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" }
    ]
  },
  {
    name: "2-Track 3-Panel",
    width: "200px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" },
      { type: "fixed" }
    ]
  },
  {
    name: "2-Track 4-Panel",
    width: "240px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "right" },
      { type: "slide", direction: "right", handlePos: "left" },
      { type: "fixed" }
    ]
  },
  {
    name: "3-Track 3-Panel",
    width: "200px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" },
      { type: "slide", direction: "left", handlePos: "left" }
    ]
  },
  {
    name: "Sliding with Top Fixed",
    width: "140px",
    height: "155px",
    topPanes: [
      { type: "fixed" },
      { type: "fixed" }
    ],
    panes: [
      { type: "fixed" },
      { type: "slide", direction: "left", handlePos: "left" }
    ]
  }
];
