import { upvcCasementDesigns } from "./upvcCasement.js";

// Aluminium Casement Designs (same 26 geometries with aluminium material)
export const aluminiumCasementDesigns = upvcCasementDesigns.map(design => ({
  ...design,
  material: "aluminium"
}));
