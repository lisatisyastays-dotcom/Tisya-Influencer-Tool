import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  FPS,
  HEIGHT,
  SCENES,
  TOTAL_DURATION_IN_FRAMES,
  TRANSITIONS,
  WIDTH,
} from "./edit-config";
import { Scene } from "./components/Scene";
import { Vignette } from "./components/Vignette";
import { FilmTone } from "./components/FilmTone";
import { SharpenDefs } from "./components/SharpenDefs";
import { AmbientBed } from "./components/AmbientBed";
import { FadeToBlack } from "./components/FadeToBlack";

export const PartyPromoReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <SharpenDefs />
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const transition = TRANSITIONS[i];
          return (
            <React.Fragment key={scene.id}>
              <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
                <Scene scene={scene} />
              </TransitionSeries.Sequence>
              {transition ? (
                <TransitionSeries.Transition
                  presentation={fade()}
                  // A damped spring (no overshoot) glides into the dissolve
                  // instead of blending at a constant linear rate — that
                  // ease is what makes the cut feel smooth and deliberate
                  // rather than mechanical.
                  timing={springTiming({
                    durationInFrames: transition.durationInFrames,
                    config: { damping: 200 },
                  })}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <FilmTone />
      <Vignette />
      <AmbientBed />
      <FadeToBlack totalFrames={TOTAL_DURATION_IN_FRAMES} />
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="PartyPromoReel"
      component={PartyPromoReel}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
