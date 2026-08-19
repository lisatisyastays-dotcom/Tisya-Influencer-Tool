import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

// Poppins is used for every piece of text in the reel — headlines, tags,
// and the outro brand card — for one consistent typographic voice.
export const { fontFamily: DISPLAY_FONT } = loadPoppins("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const SUPPORT_FONT = DISPLAY_FONT;
