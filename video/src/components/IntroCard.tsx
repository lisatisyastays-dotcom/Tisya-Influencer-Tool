import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const IntroCard: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame, fps, config: { damping: 200 } });

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
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 24}px)`,
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
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
