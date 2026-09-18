import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const OutroCard: React.FC<{ propertyName: string; cta: string }> = ({
  propertyName,
  cta,
}) => {
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
          textAlign: "center",
          opacity: in_,
          transform: `translateY(${(1 - in_) * 24}px)`,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
            color: "#FFFFFF",
            textShadow: "5px 7px 0px rgba(0,0,0,0.55)",
          }}
        >
          {propertyName}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            backgroundImage: "linear-gradient(180deg, #FFC169 0%, #E8720C 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
