import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { useEffect, useState } from "react";
import { Video } from "@remotion/media";

const FPS = 30;
const OVERLAP = 12;
const GREEN = "#0E3B2A";

// A slightly desaturated, gently contrasted filmic grade — no punchy
// saturation, no hard vignette, just a quiet, premium neutrality.
const LUXURY_GRADE = "contrast(1.05) saturate(0.9) brightness(1.015)";

const useBrandFonts = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handle = delayRender("Loading brand fonts");
    const faces = [
      new FontFace(
        "Montserrat",
        `url(${staticFile("fonts/montserrat-latin-300-normal.woff2")}) format("woff2")`,
        { weight: "300", style: "normal" },
      ),
      new FontFace(
        "Montserrat",
        `url(${staticFile("fonts/montserrat-latin-500-normal.woff2")}) format("woff2")`,
        { weight: "500", style: "normal" },
      ),
    ];

    Promise.all(faces.map((f) => f.load()))
      .then((loaded) => {
        loaded.forEach((f) => document.fonts.add(f));
        setReady(true);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, []);

  return ready;
};

type BeatProps = {
  start: number;
  duration: number;
  fadeIn: boolean;
  fadeOut: boolean;
  children: React.ReactNode;
};

const Beat: React.FC<BeatProps> = ({
  start,
  duration,
  fadeIn,
  fadeOut,
  children,
}) => {
  return (
    <Sequence from={start} durationInFrames={duration}>
      <BeatOpacity duration={duration} fadeIn={fadeIn} fadeOut={fadeOut}>
        {children}
      </BeatOpacity>
    </Sequence>
  );
};

const BeatOpacity: React.FC<{
  duration: number;
  fadeIn: boolean;
  fadeOut: boolean;
  children: React.ReactNode;
}> = ({ duration, fadeIn, fadeOut, children }) => {
  const frame = useCurrentFrame();
  const inOpacity = fadeIn
    ? interpolate(frame, [0, OVERLAP], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    : 1;
  const outOpacity = fadeOut
    ? interpolate(frame, [duration - OVERLAP, duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    : 1;

  return (
    <AbsoluteFill style={{ opacity: Math.min(inOpacity, outOpacity) }}>
      {children}
    </AbsoluteFill>
  );
};

type ClipProps = {
  src: string;
  trimBeforeSec: number;
  duration: number;
  zoomFrom?: number;
  zoomTo?: number;
  focus?: string;
};

const Clip: React.FC<ClipProps> = ({
  src,
  trimBeforeSec,
  duration,
  zoomFrom = 1,
  zoomTo = 1.035,
  focus = "50% 50%",
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [zoomFrom, zoomTo], {
    easing: Easing.out(Easing.ease),
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Video
        src={src}
        muted
        trimBefore={Math.round(trimBeforeSec * FPS)}
        trimAfter={Math.round(trimBeforeSec * FPS) + duration}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focus,
          scale,
          transformOrigin: focus,
          filter: LUXURY_GRADE,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.16) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{
  text: string;
  startFrame: number;
  endFrame: number;
  fade?: number;
}> = ({ text, startFrame, endFrame, fade = 14 }) => {
  const frame = useCurrentFrame();
  const span = endFrame - startFrame;
  const localFade = Math.min(fade, Math.floor(span / 2));

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + localFade, endFrame - localFade, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rise = interpolate(frame, [startFrame, startFrame + localFade], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  if (opacity <= 0) return null;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 300,
        paddingLeft: 110,
        paddingRight: 110,
      }}
    >
      <AbsoluteFill
        style={{
          top: "auto",
          height: "38%",
          background:
            "linear-gradient(to top, rgba(6,10,8,0.42) 0%, rgba(6,10,8,0) 100%)",
          opacity,
        }}
      />
      <div
        style={{
          position: "relative",
          opacity,
          translate: `0 ${rise}px`,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 300,
          color: "#FBFAF7",
          fontSize: 50,
          lineHeight: 1.35,
          textAlign: "center",
          letterSpacing: "0.04em",
          maxWidth: 820,
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Beat timeline (30fps). Each beat overlaps the next by OVERLAP frames,
// crossfading — no hard cuts, no flashy wipes.
const B1_START = 0;
const B1_DUR = 74; // Svar — grand living room
const B2_START = B1_START + B1_DUR - OVERLAP; // 62
const B2_DUR = 72; // Svar — quiet portrait
const B3_START = B2_START + B2_DUR - OVERLAP; // 122
const B3_DUR = 44; // Jaisal — wide living room, architectural
const B4_START = B3_START + B3_DUR - OVERLAP; // 154
const B4_DUR = 69; // Svar — lounge under pendant light
const B5_START = B4_START + B4_DUR - OVERLAP; // 211
const B5_DUR = 76; // Svar — poolside repose
const B6_START = B5_START + B5_DUR - OVERLAP; // 275
const B6_DUR = 72; // Jaisal — pool, wide
const B7_START = B6_START + B6_DUR - OVERLAP; // 335
const B7_DUR = 45; // End card

export const TOTAL_DURATION = B7_START + B7_DUR; // 351 frames / 11.7s

export const TisyaReel: React.FC = () => {
  const fontsReady = useBrandFonts();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Beat start={B1_START} duration={B1_DUR} fadeIn={false} fadeOut>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={4.0}
          duration={B1_DUR}
          zoomFrom={1}
          zoomTo={1.035}
        />
      </Beat>

      <Beat start={B2_START} duration={B2_DUR} fadeIn fadeOut>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={20.95}
          duration={B2_DUR}
          zoomFrom={1.05}
          zoomTo={1.09}
          focus="50% 38%"
        />
      </Beat>

      <Beat start={B3_START} duration={B3_DUR} fadeIn fadeOut>
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={1.8}
          duration={B3_DUR}
          zoomFrom={1}
          zoomTo={1.03}
        />
      </Beat>

      <Beat start={B4_START} duration={B4_DUR} fadeIn fadeOut>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={12.5}
          duration={B4_DUR}
          zoomFrom={1.02}
          zoomTo={1.06}
          focus="50% 42%"
        />
      </Beat>

      <Beat start={B5_START} duration={B5_DUR} fadeIn fadeOut>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={26.3}
          duration={B5_DUR}
          zoomFrom={1.03}
          zoomTo={1.07}
          focus="58% 45%"
        />
      </Beat>

      <Beat start={B6_START} duration={B6_DUR} fadeIn fadeOut>
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={12.7}
          duration={B6_DUR}
          zoomFrom={1}
          zoomTo={1.045}
        />
      </Beat>

      <Beat start={B7_START} duration={B7_DUR} fadeIn={false} fadeOut={false}>
        <AbsoluteFill style={{ backgroundColor: GREEN }}>
          <Img
            src={staticFile("end-card.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Beat>

      {fontsReady && (
        <>
          <Caption
            text="Explore refined living spaces."
            startFrame={B1_START + 8}
            endFrame={B1_START + B1_DUR - 6}
          />
          <Caption
            text="Experience quiet luxury here."
            startFrame={B2_START + OVERLAP + 4}
            endFrame={B2_START + B2_DUR - 6}
          />
          <Caption
            text="Crafted for fine living."
            startFrame={B3_START + OVERLAP - 2}
            endFrame={B3_START + B3_DUR - 2}
            fade={10}
          />
          <Caption
            text="Luxury in every detail."
            startFrame={B4_START + OVERLAP - 2}
            endFrame={B4_START + B4_DUR - 2}
            fade={10}
          />
          <Caption
            text="Unfold your private sanctuary."
            startFrame={B6_START + OVERLAP + 4}
            endFrame={B6_START + B6_DUR - 4}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
