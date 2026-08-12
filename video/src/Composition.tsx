import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Video } from "@remotion/media";

const fontFamily =
  "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";

const FPS = 30;
const GREEN = "#0E3B2A";
const ENERGETIC_FILTER = "brightness(1.05) saturate(1.15) contrast(1.06)";

type ClipProps = {
  src: string;
  trimBeforeSec: number;
  durationInFrames: number;
  zoomFrom?: number;
  zoomTo?: number;
  focus?: string;
};

const Clip: React.FC<ClipProps> = ({
  src,
  trimBeforeSec,
  durationInFrames,
  zoomFrom = 1,
  zoomTo = 1.06,
  focus = "50% 50%",
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Video
        src={src}
        muted
        trimBefore={Math.round(trimBeforeSec * FPS)}
        trimAfter={Math.round(trimBeforeSec * FPS) + durationInFrames}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focus,
          scale,
          transformOrigin: focus,
          filter: ENERGETIC_FILTER,
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{
  text: string;
  position: "top" | "middle" | "bottom";
  enterAt?: number;
}> = ({ text, position, enterAt = 0 }) => {
  const frame = useCurrentFrame();
  const local = frame - enterAt;
  const opacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const translateY = interpolate(local, [0, 8], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const rowStyle: React.CSSProperties =
    position === "top"
      ? { justifyContent: "flex-start", paddingTop: 130 }
      : position === "bottom"
        ? { justifyContent: "flex-end", paddingBottom: 150 }
        : { justifyContent: "center" };

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 90,
        paddingRight: 90,
        ...rowStyle,
      }}
    >
      <div
        style={{
          opacity,
          translate: `0 ${translateY}px`,
          fontFamily,
          fontWeight: 800,
          color: "#FFFFFF",
          fontSize: position === "middle" ? 58 : 50,
          lineHeight: 1.18,
          textAlign: "center",
          letterSpacing: "-0.01em",
          padding: "16px 28px",
          borderRadius: 20,
          backgroundColor: "rgba(10,20,15,0.34)",
          textShadow:
            "0 2px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.7)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const TisyaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* 1. 0-45f (0-1.5s): Hook — tight crop, girl mid-sip coffee (Villa Svar) */}
      <Sequence from={0} durationInFrames={45} name="Hook - coffee sip">
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={6.8}
          durationInFrames={45}
          zoomFrom={1.9}
          zoomTo={2.0}
          focus="42% 30%"
        />
      </Sequence>

      {/* 2. 45-120f (1.5-4s): 3 fast cuts, <1s each */}
      <Sequence from={45} durationInFrames={25} name="Quick cut - reading">
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={1.4}
          durationInFrames={25}
          zoomFrom={1.05}
          zoomTo={1.1}
        />
      </Sequence>
      <Sequence from={70} durationInFrames={25} name="Quick cut - action">
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={14.9}
          durationInFrames={25}
          zoomFrom={1.05}
          zoomTo={1.1}
        />
      </Sequence>
      <Sequence from={95} durationInFrames={25} name="Quick cut - Svar property">
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={4.0}
          durationInFrames={25}
          zoomFrom={1}
          zoomTo={1.05}
        />
      </Sequence>

      {/* 3. 120-165f (4-5.5s): HARD CUT — wide sunlit Villa Jaisal living room */}
      <Sequence from={120} durationInFrames={45} name="Hard cut - Jaisal living room">
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={1.85}
          durationInFrames={45}
          zoomFrom={1}
          zoomTo={1.05}
        />
      </Sequence>

      {/* 4. 165-210f (5.5-7s): Villa Jaisal bedroom, pull-back pan */}
      <Sequence from={165} durationInFrames={45} name="Jaisal bedroom pan">
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={8.5}
          durationInFrames={45}
          zoomFrom={1}
          zoomTo={1}
        />
      </Sequence>

      {/* 5. 210-270f (7-9s): CLIMAX — Villa Jaisal pool */}
      <Sequence from={210} durationInFrames={60} name="Climax - Jaisal pool">
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={12.6}
          durationInFrames={60}
          zoomFrom={1}
          zoomTo={1.06}
        />
      </Sequence>

      {/* 6. 270-291f (9-9.7s): Callback cut to the girl, closing the loop */}
      <Sequence from={270} durationInFrames={21} name="Callback - girl reading">
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={18.3}
          durationInFrames={21}
          zoomFrom={1.15}
          zoomTo={1.2}
          focus="45% 40%"
        />
      </Sequence>

      {/* 7. 291-300f (9.7-10s): End card freeze frame, Tisya Stays logo */}
      <Sequence from={291} durationInFrames={9} name="End card">
        <AbsoluteFill style={{ backgroundColor: GREEN }}>
          <Img
            src={staticFile("end-card.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Text overlays */}
      <Sequence from={0} durationInFrames={30} name="Hook text" layout="none">
        <Caption text="POV: you finally took the trip" position="top" />
      </Sequence>

      <Sequence from={210} durationInFrames={30} name="Mid overlay text" layout="none">
        <Caption text="Two villas. One feeling — slow." position="middle" />
      </Sequence>

      <Sequence from={240} durationInFrames={60} name="CTA text" layout="none">
        <Caption text="Book via link in bio" position="bottom" />
      </Sequence>
    </AbsoluteFill>
  );
};
