import { upvcSlidingDesigns } from "./upvcSliding.js";

// Aluminium Sliding Designs
export const aluminiumSlidingDesigns = upvcSlidingDesigns.map(design => ({
  ...design,
  material: "aluminium"
}));
