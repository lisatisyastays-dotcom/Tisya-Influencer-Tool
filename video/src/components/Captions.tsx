import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../edit-config";
import { DISPLAY_FONT, SUPPORT_FONT } from "../fonts";
import type {
  ClimaxCaption as ClimaxCaptionType,
  OutroCaption as OutroCaptionType,
  PopCaption as PopCaptionType,
  TagCaption as TagCaptionType,
  TitleCaption as TitleCaptionType,
} from "../edit-config";

const goldText: React.CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontWeight: 400,
  backgroundImage: `linear-gradient(180deg, ${COLORS.goldSoft} 0%, ${COLORS.goldDeep} 100%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  textShadow: "0px 6px 18px rgba(0,0,0,0.45)",
  letterSpacing: 0.5,
  margin: 0,
  textAlign: "center",
};

/** Soft dark gradient behind lower-third text so it stays legible over bright footage. */
export const BottomScrim: React.FC<{ heightPercent?: number; opacity?: number }> = ({
  heightPercent = 45,
  opacity = 0.75,
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: `${heightPercent}%`,
      background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,${opacity}) 100%)`,
      pointerEvents: "none",
    }}
  />
);

/** The signature orange accent bar under every headline. Animates in with the text above it. */
const Underline: React.FC<{ progress: number; width: number; marginTop?: number }> = ({
  progress,
  width,
  marginTop = 16,
}) => (
  <div
    style={{
      width,
      height: 6,
      borderRadius: 999,
      background: COLORS.orange,
      margin: `${marginTop}px auto 0`,
      transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})`,
      transformOrigin: "center",
      boxShadow: "0px 2px 12px rgba(255,122,41,0.55)",
    }}
  />
);

export const HookCaption: React.FC<{ caption: PopCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 11, mass: 0.6 } });
  const brandOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BottomScrim heightPercent={55} opacity={0.55} />
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: brandOpacity,
        }}
      >
        <span
          style={{
            fontFamily: SUPPORT_FONT,
            fontWeight: 400,
            fontSize: 30,
            letterSpacing: 8,
            color: COLORS.cream,
            textTransform: "uppercase",
            textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {caption.brand}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "16%",
          textAlign: "center",
          transform: `scale(${Math.max(pop, 0)}) translateY(${(1 - Math.max(pop, 0)) * 20}px)`,
          opacity: Math.min(pop, 1),
        }}
      >
        <h1 style={{ ...goldText, fontSize: 138, lineHeight: 1 }}>{caption.text}</h1>
        <Underline progress={pop} width={280} />
      </div>
    </div>
  );
};

export const TitleCaption: React.FC<{ caption: TitleCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [4, 16], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BottomScrim heightPercent={38} opacity={0.6} />
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: "10%",
          textAlign: "center",
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <h2 style={{ ...goldText, fontSize: 68, lineHeight: 1.05 }}>{caption.text}</h2>
        <Underline progress={opacity} width={340} />
      </div>
    </div>
  );
};

export const TagCaption: React.FC<{ caption: TagCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 56,
        transform: `scale(${Math.max(pop, 0)})`,
        opacity: Math.min(pop, 1),
        transformOrigin: "right center",
      }}
    >
      <div
        style={{
          border: `2px solid ${COLORS.gold}`,
          background: "rgba(20,17,10,0.55)",
          borderRadius: 999,
          padding: "10px 26px",
        }}
      >
        <span
          style={{
            fontFamily: SUPPORT_FONT,
            fontWeight: 400,
            fontSize: 28,
            letterSpacing: 3,
            color: COLORS.cream,
            textTransform: "uppercase",
          }}
        >
          {caption.text}
        </span>
      </div>
      <div
        style={{
          width: 60,
          height: 4,
          borderRadius: 999,
          background: COLORS.orange,
          margin: "8px auto 0",
        }}
      />
    </div>
  );
};

export const ClimaxCaption: React.FC<{ caption: ClimaxCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 13, mass: 0.7 } });
  const breathe = 1 + Math.sin(frame / 18) * 0.012;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BottomScrim heightPercent={60} opacity={0.6} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: "18%",
          textAlign: "center",
          transform: `scale(${Math.max(pop, 0) * breathe})`,
          opacity: Math.min(pop, 1),
        }}
      >
        <h1 style={{ ...goldText, fontSize: 104, lineHeight: 1.02 }}>{caption.text}</h1>
        <Underline progress={pop} width={380} />
      </div>
    </div>
  );
};

export const OutroCaption: React.FC<{ caption: OutroCaptionType }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaSpring = spring({ frame: frame - 40, fps, config: { damping: 12, mass: 0.6 } });
  const ctaPulse = 1 + Math.sin(Math.max(frame - 60, 0) / 14) * 0.02;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BottomScrim heightPercent={62} opacity={0.72} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: "12%",
          textAlign: "center",
        }}
      >
        <div style={{ opacity: brandOpacity }}>
          <span
            style={{
              ...goldText,
              display: "inline-block",
              fontSize: 72,
              letterSpacing: 3,
            }}
          >
            {caption.brand}
          </span>
          <Underline progress={brandOpacity} width={200} marginTop={10} />
        </div>
        <div style={{ opacity: taglineOpacity, marginTop: 22 }}>
          <span
            style={{
              fontFamily: SUPPORT_FONT,
              fontWeight: 400,
              fontSize: 34,
              color: COLORS.cream,
              textShadow: "0px 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            {caption.tagline}
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            opacity: Math.min(Math.max(ctaSpring, 0), 1),
            transform: `scale(${Math.max(ctaSpring, 0) * ctaPulse})`,
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: SUPPORT_FONT,
              fontWeight: 400,
              fontSize: 30,
              letterSpacing: 1,
              color: COLORS.ink,
              background: `linear-gradient(180deg, ${COLORS.goldSoft} 0%, ${COLORS.gold} 100%)`,
              borderRadius: 999,
              padding: "18px 44px",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            {caption.cta}
          </span>
        </div>
      </div>
    </div>
  );
};
