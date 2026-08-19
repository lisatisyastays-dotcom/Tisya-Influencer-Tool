import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { END_FADE_FRAMES } from "../edit-config";

/** Fades the whole reel to black over the last END_FADE_FRAMES — the outro's closing beat, timed to land with AmbientBed's audio fade-out. */
export const FadeToBlack: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [totalFrames - END_FADE_FRAMES, totalFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return <AbsoluteFill style={{ backgroundColor: "#000", opacity, pointerEvents: "none" }} />;
};
