import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Alternates zoom-in / zoom-out per clip so a run of clips doesn't feel repetitive.
export const ClipScene: React.FC<{ src: string; label: string; zoomOut: boolean }> = ({
  src,
  label,
  zoomOut,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = zoomOut
    ? interpolate(frame, [0, durationInFrames], [1.1, 1.0])
    : interpolate(frame, [0, durationInFrames], [1.0, 1.1]);

  const labelIn = spring({ frame: frame - 6, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(`clips/${src}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
        />
      </AbsoluteFill>
      {/* Bottom gradient keeps captions legible over bright footage, clear of the platform-UI safe zone. */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingLeft: 64,
          paddingBottom: 260,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            color: "#FFFFFF",
            textShadow: "3px 4px 0px rgba(0,0,0,0.55)",
            opacity: labelIn,
            transform: `translateY(${(1 - labelIn) * 20}px)`,
          }}
        >
          {label}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
