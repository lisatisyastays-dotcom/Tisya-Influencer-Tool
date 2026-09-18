import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const IntroCard: React.FC<{ propertyName: string; tagline: string }> = ({
  propertyName,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nameIn = spring({ frame, fps, config: { damping: 200 } });
  const taglineIn = spring({ frame: frame - 8, fps, config: { damping: 200 } });

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
          opacity: nameIn,
          transform: `translateY(${(1 - nameIn) * 24}px)`,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
            color: "#FFFFFF",
            lineHeight: 1.05,
            textShadow: "5px 7px 0px rgba(0,0,0,0.55)",
          }}
        >
          {propertyName}
        </div>
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 32,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 2,
          textTransform: "uppercase",
          backgroundImage: "linear-gradient(180deg, #FFC169 0%, #E8720C 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          opacity: taglineIn,
          transform: `translateY(${(1 - taglineIn) * 16}px)`,
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};
