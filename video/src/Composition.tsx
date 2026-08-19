import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
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
import { AmbientBed } from "./components/AmbientBed";
import { FadeToBlack } from "./components/FadeToBlack";

export const PartyPromoReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const transition = TRANSITIONS[i];
          return (
            <React.Fragment key={scene.id}>
              <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
                <Scene scene={scene} />
              </TransitionSeries.Sequence>
              {transition?.kind === "fade" ? (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: transition.durationInFrames })}
                />
              ) : null}
              {transition?.kind === "wipe" ? (
                <TransitionSeries.Transition
                  presentation={wipe({ direction: transition.direction })}
                  timing={linearTiming({ durationInFrames: transition.durationInFrames })}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
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
