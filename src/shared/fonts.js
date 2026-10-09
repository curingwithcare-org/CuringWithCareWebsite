import { Fraunces, Figtree } from "next/font/google";

// Display face: Fraunces, a soft serif with optical sizing. Warm and a little
// editorial, so headlines feel like a real organization rather than a template,
// and it sits well next to the serif "CARE" in the logo.
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  // Not preloaded: headings can swap in a beat later so the hero photo gets
  // the bandwidth first on slow connections. The fallback is size-adjusted.
  preload: false,
  variable: "--font-fraunces",
});

// Text face: Figtree, a clean geometric sans that stays readable at small
// sizes and in long paragraphs.
export const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const fontClassName = `${fraunces.variable} ${figtree.variable}`;
