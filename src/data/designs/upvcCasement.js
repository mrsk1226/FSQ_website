// uPVC Casement Windows (26 exact designs)
export const upvcCasementDesigns = [
  // Group 1: 3-Pane Side Hung, Fixed, Single Right, Single Left, Double Side Hung, Fixed & Right, Twin Left
  {
    name: "3-Pane Side Hung",
    width: "180px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Fixed",
    width: "65px",
    height: "125px",
    panes: [
      { type: "fixed" }
    ]
  },
  {
    name: "Single Right",
    width: "65px",
    height: "125px",
    panes: [
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Single Left",
    width: "65px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" }
    ]
  },
  {
    name: "Double Side Hung",
    width: "120px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Fixed & Right",
    width: "120px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Twin Left",
    width: "120px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "left" }
    ]
  },

  // Group 2: Double French, Left & Fixed, Triple Open, Triple with Top Fixed, Left, Fixed, Right, Triple Left
  {
    name: "Double French",
    width: "120px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Left & Fixed",
    width: "120px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" }
    ]
  },
  {
    name: "Triple Open",
    width: "180px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Triple with Top Fixed",
    width: "180px",
    height: "145px",
    topPanes: [
      { type: "fixed" },
      { type: "fixed" },
      { type: "fixed" }
    ],
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Left, Fixed, Right",
    width: "180px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Triple Left",
    width: "180px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "left" }
    ]
  },

  // Group 3: Triple Alternate, Large 3-Pane, Top Hung & Fixed, 4-Pane Center Open, 5-Pane Wide, 6-Pane Extrawide
  {
    name: "Triple Alternate",
    width: "180px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "open", hinge: "left" }
    ]
  },
  {
    name: "Large 3-Pane",
    width: "200px",
    height: "135px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Top Hung & Fixed",
    width: "85px",
    height: "145px",
    topPanes: [
      { type: "open", hinge: "top" }
    ],
    panes: [
      { type: "fixed" }
    ]
  },
  {
    name: "4-Pane Center Open",
    width: "240px",
    height: "125px",
    panes: [
      { type: "fixed" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "fixed" }
    ]
  },
  {
    name: "5-Pane Wide",
    width: "290px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "6-Pane Extrawide",
    width: "340px",
    height: "125px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },

  // Group 4: Door & Fixed, 4-Pane Top Fixed, 3-Pane Bottom Fixed, 2-Pane Bottom Fixed, Top Hung Combinations, Triple Combination, Single Bottom Fixed
  {
    name: "Door & Fixed",
    width: "135px",
    height: "165px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" }
    ]
  },
  {
    name: "4-Pane Top Fixed",
    width: "240px",
    height: "145px",
    topPanes: [
      { type: "fixed" },
      { type: "fixed" },
      { type: "fixed" },
      { type: "fixed" }
    ],
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" },
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "3-Pane Bottom Fixed",
    width: "180px",
    height: "145px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ],
    bottomPanes: [
      { type: "fixed" },
      { type: "fixed" },
      { type: "fixed" }
    ]
  },
  {
    name: "2-Pane Bottom Fixed",
    width: "120px",
    height: "145px",
    panes: [
      { type: "open", hinge: "left" },
      { type: "open", hinge: "right" }
    ],
    bottomPanes: [
      { type: "fixed" },
      { type: "fixed" }
    ]
  },
  {
    name: "Top Hung Combinations",
    width: "130px",
    height: "145px",
    topPanes: [
      { type: "open", hinge: "top" },
      { type: "open", hinge: "top" }
    ],
    panes: [
      { type: "fixed" },
      { type: "fixed" }
    ]
  },
  {
    name: "Triple Combination",
    width: "180px",
    height: "145px",
    topPanes: [
      { type: "open", hinge: "top" },
      { type: "open", hinge: "top" },
      { type: "open", hinge: "top" }
    ],
    panes: [
      { type: "open", hinge: "left" },
      { type: "fixed" },
      { type: "open", hinge: "right" }
    ]
  },
  {
    name: "Single Bottom Fixed",
    width: "65px",
    height: "145px",
    panes: [
      { type: "open", hinge: "right" }
    ],
    bottomPanes: [
      { type: "fixed" }
    ]
  }
];
