import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Caption } from "./Caption";
import { TRANSITION_FRAMES } from "./constants";

type Props = {
  readonly src: string;
  readonly durationInFrames: number;
  readonly trimBefore?: number;
  readonly caption?: string;
  readonly captionPosition?: "center" | "lower";
  readonly fadeOut?: boolean;
};

// One video clip filling the vertical frame (object-fit: cover), crossfading
// in/out at its edges so it blends with the scenes before/after it.
export const ClipScene: React.FC<Props> = ({
  src,
  durationInFrames,
  trimBefore = 0,
  caption,
  captionPosition,
  fadeOut = true,
}) => {
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
    <AbsoluteFill style={{ opacity, backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile(src)}
        trimBefore={trimBefore}
        trimAfter={trimBefore + durationInFrames}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {caption ? <Caption text={caption} position={captionPosition} /> : null}
    </AbsoluteFill>
  );
};
