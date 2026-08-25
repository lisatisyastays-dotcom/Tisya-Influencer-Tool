import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TRANSITION_FRAMES } from "./constants";

type Props = {
  readonly durationInFrames: number;
  readonly label: string;
  readonly fadeOut?: boolean;
};

// Stand-in for a scene whose footage hasn't been uploaded yet. Swap for a
// <ClipScene> once the clip arrives — see the comment next to its entry in
// GoaVillaReel.tsx.
export const PlaceholderScene: React.FC<Props> = ({ durationInFrames, label, fadeOut = true }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    fadeOut
      ? [0, TRANSITION_FRAMES, durationInFrames - TRANSITION_FRAMES, durationInFrames]
      : [0, TRANSITION_FRAMES],
    fadeOut ? [0, 1, 1, 0] : [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: COLORS.bg, justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(232,176,75,0.18) 0%, rgba(24,23,16,0) 60%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `2px solid ${COLORS.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          🎬
        </div>
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.goldSoft,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 24,
            color: "rgba(247,235,207,0.55)",
            letterSpacing: 0.5,
          }}
        >
          clip coming in the next upload
        </div>
      </div>
    </AbsoluteFill>
  );
};
