import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Caption } from "./Caption";
import { TRANSITION_FRAMES } from "./constants";

type Props = {
  readonly src: string;
  readonly durationInFrames: number;
  readonly caption: string;
};

// Closing card: a still frame with a slow Ken Burns zoom under the CTA text.
// Fades in from the previous scene but holds at full opacity through the end.
export const HeroScene: React.FC<Props> = ({ src, durationInFrames, caption }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: "#000" }}>
      <Img
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
      />
      <Caption text={caption} position="center" />
    </AbsoluteFill>
  );
};
