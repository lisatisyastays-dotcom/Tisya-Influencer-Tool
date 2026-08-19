import React from "react";

/** Subtle teal-shadow / warm-highlight split tone for a cinematic color-graded look — static on top of every scene, applied once. */
export const FilmTone: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      mixBlendMode: "overlay",
      background:
        "linear-gradient(135deg, rgba(0,70,85,0.16) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(255,140,50,0.14) 100%)",
    }}
  />
);
