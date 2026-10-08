// Kitchen Layouts Data in exact order
export const kitchenLayouts = [
  {
    id: "straight",
    title: "Straight Kitchen",
    subtitle: "Compact, minimalist linear layout ideal for studio and space-conscious homes.",
    image: "/assets/work-kitchen.png",
    description: "Arranges all cooking, washing, and refrigeration units along a single wall in a sleek, streamlined profile.",
    idealRoom: "Narrow rectangular rooms, open studio lofts, and linear kitchen corridors.",
    bestFor: "Studio apartments, compact 1BHK/2BHK flats, and secondary pantry kitchens.",
    spaceEfficiency: "Spacious & Compact — keeps the remaining room 100% open.",
    workTriangle: "Linear sequential workflow: Refrigerator → Prep Counter → Sink → Hob.",
    storage: "Vertical loft cabinets, under-counter spice pull-outs, chimney boxing.",
    circulation: "Unrestricted single-wall movement with zero floor bottlenecks.",
    pros: ["Minimal footprint", "Clean contemporary look", "Cost-effective straight cabinetry"],
    constraints: ["Limited counter continuity for simultaneous multi-cook meal prep"],
    features: [
      "Linear workflow: Fridge → Prep → Sink → Cook",
      "High-gloss anti-fingerprint acrylic shutters",
      "Concealed LED under-cabinet task lighting",
      "Compact built-in 2-burner or 3-burner gas hob"
    ],
    comparison: {
      continuity: "Compact",
      storage: "Medium",
      movement: "Spacious",
      openSpace: "High",
      breakfastSeating: "Low"
    }
  },
  {
    id: "l-shaped",
    title: "L-Shaped Kitchen",
    subtitle: "The most versatile and popular layout for open-plan modern living.",
    image: "/assets/work-kitchen.png",
    description: "Utilizes two adjoining walls to create a natural, uninterrupted work triangle between hob, sink, and refrigerator.",
    idealRoom: "Square or medium rectangular rooms opening directly into dining or living areas.",
    bestFor: "Small to medium apartments, villas, and open-concept living/dining plans.",
    spaceEfficiency: "High — leaves corner open for dining or breakfast bar.",
    workTriangle: "Natural ergonomic triangle with short transit steps between prep and cook zones.",
    storage: "LeMans corner pull-outs, tall pantry units, overhead lofts.",
    circulation: "Open central floor space allowing multiple people to assist freely.",
    pros: ["Efficient work triangle", "Open & spacious feel", "Easy dual-cook workflow"],
    constraints: ["Corner cabinet requires specialized pull-out hardware to prevent dead space"],
    features: [
      "Optimal corner carousel / Magic Corner storage",
      "Seamless countertop length with under-mount sink",
      "Overhead glass cabinets with soft-close bi-fold lifts",
      "Integrated microwave and oven tall unit"
    ],
    comparison: {
      continuity: "Balanced",
      storage: "High",
      movement: "Spacious",
      openSpace: "High",
      breakfastSeating: "Medium"
    }
  },
  {
    id: "u-shaped",
    title: "U-Shaped Kitchen",
    subtitle: "Maximum storage capacity and expansive continuous counter space.",
    image: "/assets/interior-kitchen.png",
    description: "Surrounds the cook with three walls of cabinetry, ensuring everything is within arm's reach while providing maximum work surfaces.",
    idealRoom: "Enclosed, medium to large dedicated kitchen spaces.",
    bestFor: "Dedicated large kitchen rooms, joint family homes, and passionate home chefs.",
    spaceEfficiency: "Maximum — occupies three walls with extensive working surface.",
    workTriangle: "Perfect equilateral work triangle with dedicated separate counter runs for sink, hob, and prep.",
    storage: "Dual corner units, multi-tier drawers, rolling appliance garages.",
    circulation: "Enclosed cockpit workflow with protected cooking perimeter.",
    pros: ["Extensive countertop area", "Supreme storage volume", "Clear separation of cooking zones"],
    constraints: ["Requires minimum 8-foot room width to maintain adequate central clearance"],
    features: [
      "Twin corner pull-out systems with anti-slip mats",
      "Centralized cooking hub with high-suction chimney",
      "Dedicated preparation, washing, and cooking zones",
      "Floor-to-ceiling pantry with tandem drawers"
    ],
    comparison: {
      continuity: "Spacious",
      storage: "Maximum",
      movement: "Balanced",
      openSpace: "Medium",
      breakfastSeating: "Medium"
    }
  },
  {
    id: "galley",
    title: "Galley / Parallel Kitchen",
    subtitle: "Professional chef-style efficiency with two parallel counter lines.",
    image: "/assets/work-galley.png",
    description: "Features two parallel countertops facing each other, providing the shortest transit distances for busy cooking workflows.",
    idealRoom: "Long, narrow rooms with doors/windows on opposite ends.",
    bestFor: "Long narrow rooms, apartments, and high-volume daily Indian cooking.",
    spaceEfficiency: "Outstanding — zero corner wastage, pure straight-line ergonomics.",
    workTriangle: "Divided workflow: wet zone (sink) on one counter, hot/dry zone (hob & fridge) on the opposite counter.",
    storage: "Deep tandem drawers, cutlery organizers, vertical pull-out spice racks.",
    circulation: "Straight transit corridor with rapid pivot access between opposing counters.",
    pros: ["Zero corner dead space", "Fastest cooking workflow", "Cost-effective straight cabinetry"],
    constraints: ["Requires minimum 4-foot central walkway clearance to allow drawers on both sides to open"],
    features: [
      "Clear separation of wet (sink) and dry/hot (hob) counters",
      "Deep 30kg capacity tandem box drawers",
      "Overhead lofts on both walls for seasonal utensils",
      "Wide central aisle for free movement"
    ],
    comparison: {
      continuity: "Balanced",
      storage: "High",
      movement: "Balanced",
      openSpace: "Low",
      breakfastSeating: "Low"
    }
  },
  {
    id: "peninsula",
    title: "Peninsula Kitchen",
    subtitle: "Connected island extension creating a built-in breakfast bar and divider.",
    image: "/assets/interior-kitchen.png",
    description: "An L or U-shaped kitchen with an attached counter peninsula extending into the room, serving as an informal dining table or serving counter.",
    idealRoom: "Medium to large open-plan spaces where an island would obstruct circulation.",
    bestFor: "Homes wanting island functionality without needing extra island clearance floor area.",
    spaceEfficiency: "High — combines dining, prep space, and storage in one extension.",
    workTriangle: "Efficient L/U triangle with extended serving counter.",
    storage: "Peninsula under-counter wine racks, crockery drawers, double-sided cabinets.",
    circulation: "Defines kitchen boundaries without erecting visual wall barriers.",
    pros: ["Built-in breakfast counter", "Delineates kitchen from living room", "Extra serving space for entertaining"],
    constraints: ["Peninsula end creates one additional inside corner cabinet"],
    features: [
      "Extended quartz/granite overhang for bar stools",
      "Pendant accent lighting over the peninsula counter",
      "Integrated under-counter pop-up power outlets",
      "Open wine & glassware storage cubbies"
    ],
    comparison: {
      continuity: "Spacious",
      storage: "High",
      movement: "Spacious",
      openSpace: "High",
      breakfastSeating: "High"
    }
  },
  {
    id: "island",
    title: "Island Kitchen",
    subtitle: "The ultimate luxury centerpiece for spacious luxury residences.",
    image: "/assets/work-island.png",
    description: "A free-standing central island counter surrounded by perimeter cabinetry, creating an inspiring hub for cooking, dining, and family conversations.",
    idealRoom: "Large open kitchen rooms with minimum 12x14 feet area.",
    bestFor: "Large independent bungalows, penthouses, and spacious luxury apartments.",
    spaceEfficiency: "Spacious — requires minimum 40-inch circulation clearance on all 4 sides.",
    workTriangle: "Multi-functional zone layout: perimeter storage with central prep / breakfast hub.",
    storage: "Island base deep pots/pans drawers, perimeter tall larder units.",
    circulation: "360-degree free circulation allowing multiple cooks and guests to mingle.",
    pros: ["Iconic luxury look", "Multiple cooks simultaneously", "Central social gathering hub"],
    constraints: ["Requires large floor area and dedicated floor plumbing/electrical conduits"],
    features: [
      "Waterfall marble or quartz island countertop",
      "Optional prep sink or ceiling-mounted island chimney",
      "Concealed under-island trash sorter & recycling bins",
      "Integrated breakfast counter seating 3–4 persons"
    ],
    comparison: {
      continuity: "Maximum",
      storage: "Maximum",
      movement: "Spacious",
      openSpace: "Maximum",
      breakfastSeating: "Maximum"
    }
  }
];

// Kitchen Design Styles
export const kitchenStyles = [
  {
    name: "Minimalistic",
    description: "Clean handle-less profiles, monochromatic tones, and zero visual clutter.",
    palette: ["#ffffff", "#e0e0e0", "#2c3e50"],
    materials: "Gola-profile J-pull shutters, matte lacquered glass, seamless quartz.",
    image: "/assets/work-grey.png"
  },
  {
    name: "Modern",
    description: "High-contrast palettes, glossy acrylics, and state-of-the-art built-in appliances.",
    palette: ["#1a2a3a", "#0d6eaa", "#f5f6fa"],
    materials: "Acrylic shutters, metallic trim, durable worktops.",
    image: "/assets/interior-kitchen.png"
  },
  {
    name: "English Classic",
    description: "Timeless Shaker-style framed shutters, classic handles, and subtle muted pastels.",
    palette: ["#dcdde1", "#718093", "#f8f9fa"],
    materials: "Membrane coated shaker profiles, classic hardware, tile backsplash.",
    image: "/assets/work-wood.png"
  },
  {
    name: "Indian Classic",
    description: "Warm teak & walnut finishes, durable countertops, and dedicated spice drawers.",
    palette: ["#c9a06e", "#89553b", "#f5f0eb"],
    materials: "Moisture-resistant core, woodgrain laminates, reinforced drawer runners.",
    image: "/assets/work-kitchen.png"
  },
  {
    name: "Contemporary",
    description: "Warm neutral tones with fluted timber accents and ambient under-shelf lighting.",
    palette: ["#95a5a6", "#7f8c8d", "#f7f1e3"],
    materials: "Fluted laminate shutters, tinted glass cabinets, integrated LED strips.",
    image: "/assets/work-galley.png"
  },
  {
    name: "Indian Traditional",
    description: "Rich natural wood-finish accents, classic handles, and traditional tile backsplashes.",
    palette: ["#6d432f", "#d63031", "#faf0e6"],
    materials: "Moisture-resistant core, decorative wood bead moulding, durable finish.",
    image: "/assets/work-wood.png"
  }
];
