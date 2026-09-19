import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const OutroCard: React.FC<{ cta: string }> = ({ cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const in_ = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#181710",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          backgroundImage: "linear-gradient(180deg, #FFC169 0%, #E8720C 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          opacity: in_,
          transform: `translateY(${(1 - in_) * 24}px)`,
        }}
      >
        {cta}
      </div>
    </AbsoluteFill>
  );
};
