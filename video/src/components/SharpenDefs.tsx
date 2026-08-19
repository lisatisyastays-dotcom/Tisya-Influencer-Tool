import React from "react";

export const SHARPEN_FILTER_ID = "video-sharpen";

/**
 * Defines the SVG unsharp-mask filter referenced by GRADE_FILTER
 * (`url(#video-sharpen)`) for real clarity/detail enhancement — not just a
 * CSS contrast bump. Must be mounted once, before any video that uses it.
 */
export const SharpenDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
    <defs>
      <filter id={SHARPEN_FILTER_ID} x="-10%" y="-10%" width="120%" height="120%">
        <feConvolveMatrix
          order="3 3"
          kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0"
          divisor={1}
          bias={0}
          edgeMode="duplicate"
          preserveAlpha="true"
        />
      </filter>
    </defs>
  </svg>
);
