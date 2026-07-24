import { AbsoluteFill, Composition, spring, useCurrentFrame, useVideoConfig } from "remotion";

const BG = "#181710";
const GRADIENT = "linear-gradient(180deg, #FFC169 0%, #E8720C 100%)";
const SHADOW = "5px 7px 0px rgba(0,0,0,0.55)";

export const MyComposition = () => {
  return (
    <Composition
      id="PropertyStat"
      component={PropertyStat}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

export const PropertyStat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          textAlign: "center",
          opacity: progress,
          transform: `translateY(${(1 - progress) * 30}px)`,
        }}
      >
        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            fontFamily: "Arial, sans-serif",
            backgroundImage: GRADIENT,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: SHADOW,
            lineHeight: 1,
          }}
        >
          133
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            letterSpacing: 4,
            backgroundImage: GRADIENT,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: SHADOW,
            marginTop: 8,
          }}
        >
          SQ. M
        </div>
      </div>
    </AbsoluteFill>
  );
};
import { CalculateMetadataFunction, Composition } from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = () => {
  return null;
};
