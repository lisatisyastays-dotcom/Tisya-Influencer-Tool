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
const GREEN = "#0E3B2A";
const ORANGE = "#F76902"; // sampled from the brand sparkle mark

// A slightly desaturated, gently contrasted filmic grade — no punchy
// saturation, no hard vignette, just a quiet, premium neutrality.
const LUXURY_GRADE = "contrast(1.05) saturate(0.9) brightness(1.015)";

const useBrandFonts = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handle = delayRender("Loading brand fonts");
    const faces = [
      new FontFace(
        "Poppins",
        `url(${staticFile("fonts/poppins-latin-300-normal.woff2")}) format("woff2")`,
        { weight: "300", style: "normal" },
      ),
      new FontFace(
        "Poppins",
        `url(${staticFile("fonts/poppins-latin-500-normal.woff2")}) format("woff2")`,
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
  fadeInFrames: number;
  fadeOutFrames: number;
  children: React.ReactNode;
};

// Each beat's fade-in/out length is explicit (rather than one global
// crossfade length) so a short beat's two fades never together exceed
// its own duration — otherwise it would never reach full opacity and
// would sit permanently triple-blended between both neighbours.
const Beat: React.FC<BeatProps> = ({
  start,
  duration,
  fadeInFrames,
  fadeOutFrames,
  children,
}) => {
  return (
    <Sequence from={start} durationInFrames={duration}>
      <BeatOpacity
        duration={duration}
        fadeInFrames={fadeInFrames}
        fadeOutFrames={fadeOutFrames}
      >
        {children}
      </BeatOpacity>
    </Sequence>
  );
};

const BeatOpacity: React.FC<{
  duration: number;
  fadeInFrames: number;
  fadeOutFrames: number;
  children: React.ReactNode;
}> = ({ duration, fadeInFrames, fadeOutFrames, children }) => {
  const frame = useCurrentFrame();
  const inOpacity = fadeInFrames
    ? interpolate(frame, [0, fadeInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      })
    : 1;
  const outOpacity = fadeOutFrames
    ? interpolate(frame, [duration - fadeOutFrames, duration], [1, 0], {
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
}> = ({ text, startFrame, endFrame, fade = 32 }) => {
  const frame = useCurrentFrame();
  const span = endFrame - startFrame;
  const localFade = Math.max(1, Math.min(fade, Math.ceil(span / 2) - 1));

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + localFade, endFrame - localFade, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rise = interpolate(frame, [startFrame, startFrame + localFade], [16, 0], {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity,
          translate: `0 ${rise}px`,
        }}
      >
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
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
        <div
          style={{
            width: 64,
            height: 3,
            marginTop: 18,
            backgroundColor: ORANGE,
            boxShadow: "0 0 10px rgba(247,105,2,0.55)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Beat timeline (30fps). Transition lengths are picked per-pair: long,
// slow dissolves (20-28) between the hero shots, short ones (8-16)
// either side of the brief accent beats so every beat (and its
// neighbours) still reaches full opacity instead of sitting
// permanently triple-blended.
const OL_12 = 28;
const OL_2_2B = 24;
const OL_2B_3 = 16;
const OL_3_3A = 8;
const OL_3A_3B = 8;
const OL_3B_4 = 10;
const OL_45 = 20;
const OL_56 = 28;
const OL_67 = 24;

const B1_START = 0;
const B1_DUR = 88; // Svar — grand living room
const B2_START = B1_START + B1_DUR - OL_12; // 60
const B2_DUR = 84; // Svar — quiet portrait
const B2B_START = B2_START + B2_DUR - OL_2_2B; // 120
const B2B_DUR = 66; // Svar — reading, lying on the bed
const B3_START = B2B_START + B2B_DUR - OL_2B_3; // 170
const B3_DUR = 51; // Jaisal — wide living room, architectural
const B3A_START = B3_START + B3_DUR - OL_3_3A; // 213
const B3A_DUR = 21; // Jaisal — the bedroom, a glimpse
const B3B_START = B3A_START + B3A_DUR - OL_3A_3B; // 226
const B3B_DUR = 39; // Svar — the lounge, empty, before she's revealed in it
const B4_START = B3B_START + B3B_DUR - OL_3B_4; // 255
const B4_DUR = 54; // Svar — lounge under pendant light, now with her in it
const B5_START = B4_START + B4_DUR - OL_45; // 289
const B5_DUR = 90; // Svar — poolside repose
const B6_START = B5_START + B5_DUR - OL_56; // 351
const B6_DUR = 72; // Jaisal — pool, wide
const B7_START = B6_START + B6_DUR - OL_67; // 399
const B7_DUR = 120; // End card — a slow, held close

export const TOTAL_DURATION = B7_START + B7_DUR; // 519 frames / 17.3s

export const TisyaReel: React.FC = () => {
  const fontsReady = useBrandFonts();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Beat start={B1_START} duration={B1_DUR} fadeInFrames={0} fadeOutFrames={OL_12}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={4.0}
          duration={B1_DUR}
          zoomFrom={1}
          zoomTo={1.03}
        />
      </Beat>

      <Beat start={B2_START} duration={B2_DUR} fadeInFrames={OL_12} fadeOutFrames={OL_2_2B}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={20.95}
          duration={B2_DUR}
          zoomFrom={1.04}
          zoomTo={1.07}
          focus="50% 38%"
        />
      </Beat>

      <Beat start={B2B_START} duration={B2B_DUR} fadeInFrames={OL_2_2B} fadeOutFrames={OL_2B_3}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={18.3}
          duration={B2B_DUR}
          zoomFrom={1.02}
          zoomTo={1.05}
          focus="55% 45%"
        />
      </Beat>

      <Beat start={B3_START} duration={B3_DUR} fadeInFrames={OL_2B_3} fadeOutFrames={OL_3_3A}>
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={1.8}
          duration={B3_DUR}
          zoomFrom={1}
          zoomTo={1.025}
        />
      </Beat>

      <Beat start={B3A_START} duration={B3A_DUR} fadeInFrames={OL_3_3A} fadeOutFrames={OL_3A_3B}>
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={7.3}
          duration={B3A_DUR}
          zoomFrom={1}
          zoomTo={1.015}
        />
      </Beat>

      <Beat start={B3B_START} duration={B3B_DUR} fadeInFrames={OL_3A_3B} fadeOutFrames={OL_3B_4}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={11.0}
          duration={B3B_DUR}
          zoomFrom={1}
          zoomTo={1.02}
        />
      </Beat>

      <Beat start={B4_START} duration={B4_DUR} fadeInFrames={OL_3B_4} fadeOutFrames={OL_45}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={12.5}
          duration={B4_DUR}
          zoomFrom={1.02}
          zoomTo={1.04}
          focus="50% 42%"
        />
      </Beat>

      <Beat start={B5_START} duration={B5_DUR} fadeInFrames={OL_45} fadeOutFrames={OL_56}>
        <Clip
          src={staticFile("villa-svar.mp4")}
          trimBeforeSec={26.3}
          duration={B5_DUR}
          zoomFrom={1.02}
          zoomTo={1.05}
          focus="58% 45%"
        />
      </Beat>

      <Beat start={B6_START} duration={B6_DUR} fadeInFrames={OL_56} fadeOutFrames={OL_67}>
        <Clip
          src={staticFile("villa-jaisal.mp4")}
          trimBeforeSec={12.7}
          duration={B6_DUR}
          zoomFrom={1}
          zoomTo={1.03}
        />
      </Beat>

      <Beat start={B7_START} duration={B7_DUR} fadeInFrames={OL_67} fadeOutFrames={0}>
        <AbsoluteFill style={{ backgroundColor: GREEN }}>
          <Img
            src={staticFile("end-card.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Beat>

      {/* Captions never overlap each other, and the last one clears
          well before the end card starts fading in at B7_START. */}
      {fontsReady && (
        <>
          <Caption text="Explore refined living spaces." startFrame={14} endFrame={62} fade={20} />
          <Caption text="Experience quiet luxury here." startFrame={84} endFrame={128} fade={20} />
          <Caption text="Crafted for fine living." startFrame={178} endFrame={214} fade={17} />
          <Caption text="Luxury in every detail." startFrame={269} endFrame={305} fade={17} />
          <Caption
            text="Unfold your private sanctuary."
            startFrame={352}
            endFrame={390}
            fade={16}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
