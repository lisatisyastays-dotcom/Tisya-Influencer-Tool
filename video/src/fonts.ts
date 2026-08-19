import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

// Poppins Regular is used for every piece of text in the reel — headlines,
// tags, and the outro brand card — for one consistent, light typographic
// voice matching the previous reel edits.
export const { fontFamily: DISPLAY_FONT } = loadPoppins("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const SUPPORT_FONT = DISPLAY_FONT;
