import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

// Anton: bold condensed display font used for every headline/CTA in the reel.
// Montserrat: small supporting text (brand wordmark, tags).
// Loading both once here keeps typography consistent across the whole edit.
export const { fontFamily: DISPLAY_FONT } = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const { fontFamily: SUPPORT_FONT } = loadMontserrat("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin"],
});
