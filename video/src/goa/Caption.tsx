import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, TRANSITION_FRAMES } from "./constants";

type Props = {
  readonly text: string;
  readonly position?: "center" | "lower";
};

// Reel-style caption: kicker dot, bold headline, soft bottom scrim for legibility over video.
export const Caption: React.FC<Props> = ({ text, position = "lower" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hold off until the incoming clip's crossfade has finished, so this
  // caption doesn't animate in on top of the outgoing scene's still-fading text.
  const progress = spring({ frame: Math.max(0, frame - TRANSITION_FRAMES), fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [24, 0]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: position === "lower" ? 0 : undefined,
          top: position === "center" ? 0 : undefined,
          height: "32%",
          background:
            position === "lower"
              ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)"
              : "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: position === "lower" ? 320 : undefined,
          top: position === "center" ? "42%" : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 14,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ width: 36, height: 5, borderRadius: 2.5, backgroundImage: COLORS.gradient }} />
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.22,
            color: "#FFFFFF",
            textShadow: "0 2px 14px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.6)",
            letterSpacing: -0.2,
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
};
