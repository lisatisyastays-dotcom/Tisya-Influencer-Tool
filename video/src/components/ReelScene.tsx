import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame } from "remotion";

// Alternates zoom-in / zoom-out per clip so a run of clips doesn't feel repetitive.
export const ReelScene: React.FC<{ src: string; zoomOut: boolean }> = ({ src, zoomOut }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = zoomOut
    ? interpolate(frame, [0, durationInFrames], [1.08, 1.0])
    : interpolate(frame, [0, durationInFrames], [1.0, 1.08]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(`reels/${src}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
