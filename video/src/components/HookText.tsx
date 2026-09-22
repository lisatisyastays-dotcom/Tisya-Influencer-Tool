import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HookText: React.FC<{ text: string; durationInFrames: number }> = ({
  text,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const in_ = spring({ frame, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = in_ * out;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Top gradient keeps bold text legible over bright/busy footage. */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 140,
          paddingLeft: 56,
          paddingRight: 56,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: "0px 4px 16px rgba(0,0,0,0.65)",
            transform: `translateY(${(1 - in_) * -24}px)`,
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
