import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, useCurrentFrame } from "remotion";
import {
  FPS,
  GRADE_FILTER,
  REEL_1,
  REEL_2,
  type SceneDef,
} from "../edit-config";
import {
  ClimaxCaption,
  HookCaption,
  OutroCaption,
  TagCaption,
  TitleCaption,
} from "./Captions";

const SOURCES: Record<SceneDef["source"], string> = {
  reel1: REEL_1,
  reel2: REEL_2,
};

const useSceneTransform = (scene: SceneDef, frame: number) => {
  const d = scene.durationInFrames;

  if (scene.effect.type === "punchIn") {
    const zoomTo = scene.effect.zoomTo ?? 1.12;
    const scale = interpolate(frame, [0, d], [1, zoomTo], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return `scale(${scale})`;
  }

  const zoomTo = scene.effect.zoomTo ?? 1.06;
  const scale = interpolate(frame, [0, d], [1, zoomTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const panX = interpolate(frame, [0, d], [0, scene.effect.panXPercent ?? 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panY = interpolate(frame, [0, d], [0, scene.effect.panYPercent ?? 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return `scale(${scale}) translate(${panX}%, ${panY}%)`;
};

const SceneCaptionLayer: React.FC<{ scene: SceneDef }> = ({ scene }) => {
  if (!scene.caption) return null;
  switch (scene.caption.kind) {
    case "pop":
      return <HookCaption caption={scene.caption} />;
    case "title":
      return <TitleCaption caption={scene.caption} />;
    case "tag":
      return <TagCaption caption={scene.caption} />;
    case "climax":
      return <ClimaxCaption caption={scene.caption} />;
    case "outro":
      return <OutroCaption caption={scene.caption} />;
    default:
      return null;
  }
};

export const Scene: React.FC<{ scene: SceneDef }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const transform = useSceneTransform(scene, frame);
  const trimBeforeFrames = Math.round(scene.trimBeforeSec * FPS);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform, transformOrigin: "center" }}>
        <OffthreadVideo
          src={SOURCES[scene.source]}
          trimBefore={trimBeforeFrames}
          playbackRate={scene.playbackRate ?? 1}
          muted={scene.muteVideo}
          volume={scene.muteVideo ? 0 : scene.videoVolume ?? 0.9}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `center ${scene.focalY ?? 50}%`,
            filter: GRADE_FILTER,
          }}
        />
      </div>
      <SceneCaptionLayer scene={scene} />
    </AbsoluteFill>
  );
};
