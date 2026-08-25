import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./constants";

type Props = {
  readonly text: string;
  readonly position?: "center" | "lower";
};

// Reel-style caption: kicker dot, bold headline, soft bottom scrim for legibility over video.
export const Caption: React.FC<Props> = ({ text, position = "lower" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 200 } });
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
          height: "46%",
          background:
            position === "lower"
              ? "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)"
              : "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: position === "lower" ? 140 : undefined,
          top: position === "center" ? "42%" : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 16,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ width: 44, height: 6, borderRadius: 3, backgroundImage: COLORS.gradient }} />
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#FFFFFF",
            textShadow: "0 4px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.6)",
            letterSpacing: -0.5,
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
};
