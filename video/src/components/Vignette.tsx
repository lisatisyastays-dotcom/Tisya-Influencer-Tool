import React from "react";

/** Subtle static edge-darkening so the frame reads as one graded, premium ad — not per-scene, applied once on top of everything. */
export const Vignette: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
    }}
  />
);
