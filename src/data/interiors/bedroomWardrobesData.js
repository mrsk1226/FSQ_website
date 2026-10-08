// Bedroom Types Data
export const bedroomTypes = [
  {
    id: "master-bedroom",
    title: "Master Bedroom Suite",
    subtitle: "A private luxurious retreat crafted with bespoke acoustics, warm lighting, and integrated dressing.",
    image: "/assets/interior-bedroom.png",
    description: "Designed as a complete sanctuary featuring a plush upholstered or fluted wood bed backdrop, full-height wardrobe suite, matching dressing vanity, and intelligent bedside charging hubs.",
    keyElements: [
      "Full-wall headboard with fluted panel & accent lighting",
      "Hydraulic lift-up king bed with immense under-mattress storage",
      "Floor-to-ceiling sliding wardrobe with tinted glass & mirror panel",
      "Integrated floating vanity with illuminated mirror"
    ],
    lighting: "Warm 3000K recessed cove lighting, reading spotlights, wardrobe interior sensor LEDs",
    palette: "Champagne, warm beige, walnut timber, and muted brushed brass"
  },
  {
    id: "guest-bedroom",
    title: "Guest Bedroom",
    subtitle: "Welcoming, low-maintenance elegance with versatile luggage and wardrobe storage.",
    image: "/assets/homworks-bedroom.jpg",
    description: "Optimized for hospitality with comfortable queen bedding, dedicated luggage drop counter, clutter-free 3-door wardrobe, and universal plug stations.",
    keyElements: [
      "Padded linen headboard with easy-to-clean stain-resistant fabric",
      "3-Door hinged wardrobe with full-length mirror insert",
      "Floating bedside ledges with concealed cable routing",
      "Dedicated luggage bench with under-drawer storage"
    ],
    lighting: "Ambient ceiling coves, soft bedside pendant drops",
    palette: "Soft greys, off-white, light oak, and subtle pastel accents"
  },
  {
    id: "bedroom-wardrobe",
    title: "Bedroom + Wardrobe Suite",
    subtitle: "Seamless spatial integration between sleeping and dressing zones.",
    image: "/assets/work-headboard.png",
    description: "Connects the wardrobe wall directly into the bed paneling and side consoles, eliminating awkward gaps and creating a cohesive architectural flow.",
    keyElements: [
      "Continuous wall panelling wrapping from headboard into wardrobe frame",
      "Anti-warp aluminium profile wardrobe shutters",
      "Concealed dressing zone behind sliding wardrobe door",
      "Overhead loft storage spanning the entire wall perimeter"
    ],
    lighting: "Linear magnetic track lights, indirect headboard backlight",
    palette: "Warm grey, smoked oak, champagne gold profiles"
  },
  {
    id: "compact-bedroom",
    title: "Compact Bedroom (Space Saver)",
    subtitle: "Smart vertical storage solutions making compact spaces feel open and organized.",
    image: "/assets/work-bedroom.png",
    description: "Maximizes every square inch through wall-hung side tables, slim-profile sliding wardrobes, hydraulic bed mechanisms, and light-reflective finishes.",
    keyElements: [
      "Slim-depth 2-track sliding wardrobe with full mirror shutter to visually double space",
      "Under-bed hydraulic box storage for bulky extra blankets and bags",
      "Wall-mounted floating work-cum-dressing desk",
      "Headboard with built-in hidden drop-down storage cubbies"
    ],
    lighting: "High-lumen slim downlights, vertical mirror strip lights",
    palette: "Crisp white, ivory, light birch wood, and mirror reflections"
  },
  {
    id: "premium-suite",
    title: "Presidential Luxury Suite",
    subtitle: "Grand proportions, bespoke Italian veneer panelling, and a walk-in dressing lounge.",
    image: "/assets/hero-bedroom.jpg",
    description: "Exquisite craftsmanship featuring natural wood veneers, motorized blinds, a separate walk-in wardrobe room with glass display island, and lounge seating.",
    keyElements: [
      "Bookmatched natural veneer wall with brass inlay dividers",
      "Dedicated walk-in wardrobe with glass display island for watches and jewellery",
      "En-suite mini lounge with accent armchairs and coffee table",
      "Motorized curtains and smart-home ambient lighting integration"
    ],
    lighting: "Layered luxury lighting with dimmable crystal or brass chandelier",
    palette: "Rich teak, dark charcoal, champagne gold, and Italian marble"
  }
];

// Wardrobes Data
export const wardrobeTypes = [
  {
    id: "sliding-wardrobe",
    title: "Sliding Door Wardrobe",
    subtitle: "Smooth gliding shutters that save precious floor space in modern bedrooms.",
    image: "/assets/work-headboard.png",
    description: "Features premium top-hung or bottom-roller sliding mechanisms with soft-close dampers, allowing effortless access without obstructing walkway space.",
    bestFor: "Master bedrooms and rooms with tighter circulation clearance.",
    storageAdvantage: "Continuous unbroken spans up to 10 feet wide with floor-to-ceiling utilization.",
    finishes: "Lacquered glass, mirror, textured laminates, acrylic, and fluted panels."
  },
  {
    id: "hinged-wardrobe",
    title: "Hinged Door Wardrobe (Classic Swing)",
    subtitle: "Full-width visibility allowing every compartment to open simultaneously.",
    image: "/assets/work-wood.png",
    description: "Traditional swing doors built with 110° or 165° wide-opening soft-close hinges, enabling inner-door organizers, tie racks, and full interior visibility.",
    bestFor: "Spacious bedrooms and walk-in dressing corridors.",
    storageAdvantage: "Inner-door mounted hooks, belt holders, full-length mirror backing.",
    finishes: "PU matte paint, Shaker-style membrane, natural veneer, fabric inserts."
  },
  {
    id: "l-shaped-wardrobe",
    title: "L-Shaped Corner Wardrobe",
    subtitle: "Transforms challenging 90-degree bedroom corners into expansive storage.",
    image: "/assets/interior-bedroom.png",
    description: "Utilizes specialized corner hinges and folding bi-fold doors to eliminate corner dead space, providing deep hanging rails for suits, sarees, and gowns.",
    bestFor: "Utilizing bedroom corners efficiently and maximizing small wall runs.",
    storageAdvantage: "Continuous diagonal or double-door corner hanging rails for long garments.",
    finishes: "Dual-tone laminate combinations, frosted glass with aluminium framing."
  },
  {
    id: "walk-in-wardrobe",
    title: "Walk-In Wardrobe & Dressing Lounge",
    subtitle: "The pinnacle of personal organization, luxury, and boutique display.",
    image: "/assets/work-bedroom.png",
    description: "A dedicated room or partitioned alcove equipped with open shelving, glass-fronted drawers, sensor LED profiles, and a central jewellery accessory island.",
    bestFor: "Master suites, penthouse luxury bedrooms, and dedicated dressing rooms.",
    storageAdvantage: "Categorized zones for shoes, bags, formal wear, jewellery, and seasonal apparel.",
    finishes: "Smoked glass shutters, warm walnut frames, velvet-lined drawers, brass trim."
  },
  {
    id: "loft-storage",
    title: "Floor-to-Ceiling Loft System",
    subtitle: "Zero-wastage overhead storage for suitcases, travel gear, and seasonal items.",
    image: "/assets/work-grey.png",
    description: "Seamlessly integrates with the wardrobe below to reach the exact ceiling height, completely eliminating dusty top gaps and maximizing home volume.",
    bestFor: "All bedrooms aiming for clean architectural lines and maximum storage.",
    storageAdvantage: "Houses oversized travel suitcases, winter quilts, and festive boxes.",
    finishes: "Matches base wardrobe or uses flush push-to-open seamless ceiling panels."
  }
];
