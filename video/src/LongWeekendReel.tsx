import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, CalculateMetadataFunction, Composition, Sequence } from "remotion";
import { HookText } from "./components/HookText";
import { ReelScene } from "./components/ReelScene";
import { HOOK_TEXT, reelClips } from "./longWeekendReel";

const FPS = 30;
const TRANSITION_FRAMES = 15;
const HOOK_DURATION_FRAMES = 90;

type Props = {};

// Total duration grows automatically as clips are appended to longWeekendReel.ts.
const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  const clipsTotal = reelClips.reduce((sum, clip) => sum + clip.durationInFrames, 0);
  const transitionsTotal = TRANSITION_FRAMES * Math.max(reelClips.length - 1, 0);
  const durationInFrames = Math.max(clipsTotal - transitionsTotal, HOOK_DURATION_FRAMES);

  return { durationInFrames };
};

export const LongWeekendReelComposition = () => {
  return (
    <Composition
      id="LongWeekendReel"
      component={LongWeekendReel}
      durationInFrames={HOOK_DURATION_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const LongWeekendReel: React.FC<Props> = () => {
  if (reelClips.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#181710",
          color: "#FFC169",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: 100,
        }}
      >
        Waiting for clips — add entries to src/longWeekendReel.ts and drop the
        files into public/reels/
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {reelClips.flatMap((clip, index) => {
          const scene = (
            <TransitionSeries.Sequence key={`clip-${index}`} durationInFrames={clip.durationInFrames}>
              <ReelScene src={clip.src} zoomOut={index % 2 === 1} />
            </TransitionSeries.Sequence>
          );

          if (index === 0) return [scene];

          return [
            <TransitionSeries.Transition
              key={`transition-${index}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />,
            scene,
          ];
        })}
      </TransitionSeries>

      <Sequence durationInFrames={HOOK_DURATION_FRAMES}>
        <HookText text={HOOK_TEXT} durationInFrames={HOOK_DURATION_FRAMES} />
      </Sequence>
    </AbsoluteFill>
  );
};
