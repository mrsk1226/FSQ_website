import { upvcCasementDesigns } from "./upvcCasement.js";
import { upvcSlidingDesigns } from "./upvcSliding.js";
import { upvcTiltTurnDesigns } from "./upvcTiltTurn.js";
import { aluminiumCasementDesigns } from "./aluminiumCasement.js";
import { aluminiumSlidingDesigns } from "./aluminiumSliding.js";
import { prominanceFinishes } from "./prominanceFinishes.js";
import { aluminiumShades } from "./aluminiumColours.js";

// Master Window Systems Registry for Four Square Fenestration
// All models carry sourceStatus: "verified-fsq"

export const windowSystems = [
  {
    id: "upvc-casement",
    name: "uPVC Casement Windows",
    shortName: "Casement",
    material: "upvc",
    mechanismType: "casement",
    badge: "26 Designs Available",
    tagline: "German-engineered compression sealing with side-hung & top-hung sashes.",
    designs: upvcCasementDesigns,
    defaultDesignIndex: 0,
    sourceStatus: "verified-fsq"
  },
  {
    id: "upvc-sliding",
    name: "uPVC Sliding Windows",
    shortName: "Sliding",
    material: "upvc",
    mechanismType: "sliding",
    badge: "2-Track & 3-Track",
    tagline: "Smooth finger-touch glide on stainless steel tracks with integrated hurricane booster bars.",
    designs: upvcSlidingDesigns,
    defaultDesignIndex: 0,
    sourceStatus: "verified-fsq"
  },
  {
    id: "upvc-tilt-turn",
    name: "uPVC Tilt & Turn Windows",
    shortName: "Tilt & Turn",
    material: "upvc",
    mechanismType: "tilt-turn",
    badge: "Dual European Action",
    tagline: "Inward tilt for draft-free top ventilation, or full inward swing for effortless cleaning.",
    designs: upvcTiltTurnDesigns,
    defaultDesignIndex: 0,
    sourceStatus: "verified-fsq"
  },
  {
    id: "aluminium-casement",
    name: "Aluminium Casement Systems",
    shortName: "Alu Casement",
    material: "aluminium",
    mechanismType: "casement",
    badge: "6063-T6 Architectural",
    tagline: "Ultra-slim architectural profiles with 5500 Pa wind resistance and precision dual-cleat corners.",
    designs: aluminiumCasementDesigns,
    defaultDesignIndex: 0,
    sourceStatus: "verified-fsq"
  },
  {
    id: "aluminium-sliding",
    name: "Aluminium Sliding Systems",
    shortName: "Alu Sliding",
    material: "aluminium",
    mechanismType: "sliding",
    badge: "Graf Concealed Tracks",
    tagline: "Minimal sightlines with heavy roller engineering supporting grand panoramic glass spans.",
    designs: aluminiumSlidingDesigns,
    defaultDesignIndex: 0,
    sourceStatus: "verified-fsq"
  }
];

// Verified Prominance uPVC Finishes with 3D Depth Highlights & Procedural Grain
export const upvcFinishes = prominanceFinishes.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.categoryLabel,
  type: item.isWhite ? "white" : item.family === "Woodgrain Laminate" ? "wood" : "solid",
  family: item.family,
  baseColor: item.baseColor,
  highlightColor: item.highlightColor,
  shadowColor: item.shadowColor,
  grainDark: item.grainDark,
  grainLight: item.grainLight,
  visualCharacter: item.visualCharacter,
  bestPairing: item.bestPairing,
  lightingCharacter: item.lightingCharacter,
  maintenanceAppearance: item.maintenanceAppearance,
  sourceStatus: "verified-fsq"
}));

// Verified Uniframe Aluminium Finishes
export const aluminiumFinishes = aluminiumShades.map((item, idx) => ({
  id: `alu-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
  name: item.name,
  category: item.category === "wood" ? "Wood Lamination" : "Architectural Satin",
  type: item.category,
  baseColor: item.bg,
  highlightColor: item.sash || lightenColor(item.bg, 16),
  shadowColor: item.border || darkenColor(item.bg, 20),
  tag: item.tag,
  sourceStatus: "verified-fsq"
}));

// Utility colour shade calculators
function lightenColor(col, pct) {
  if (!col || !col.startsWith("#")) return col;
  const num = parseInt(col.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * (pct / 100)));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * (pct / 100)));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * (pct / 100)));
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(col, pct) {
  if (!col || !col.startsWith("#")) return col;
  const num = parseInt(col.slice(1), 16);
  const factor = 1 - pct / 100;
  const r = Math.max(0, Math.floor((num >> 16) * factor));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * factor));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * factor));
  return `rgb(${r}, ${g}, ${b})`;
}
