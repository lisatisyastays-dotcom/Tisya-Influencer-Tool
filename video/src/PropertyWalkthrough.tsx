import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill, CalculateMetadataFunction, Composition } from "remotion";
import { ClipScene } from "./components/ClipScene";
import { IntroCard } from "./components/IntroCard";
import { OutroCard } from "./components/OutroCard";
import { clips, OUTRO_CTA, PROPERTY_NAME, PROPERTY_TAGLINE } from "./clips";

const FPS = 30;
const TRANSITION_FRAMES = 15;
const INTRO_FRAMES = 60;
const OUTRO_FRAMES = 75;

type Props = {};

// Total duration grows automatically as clips are appended to clips.ts —
// no need to hand-calculate frame counts when a new batch lands.
const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  const clipsTotal = clips.reduce((sum, clip) => sum + clip.durationInFrames, 0);
  const transitionsTotal = TRANSITION_FRAMES * (clips.length + 1);
  const durationInFrames = INTRO_FRAMES + clipsTotal + OUTRO_FRAMES - transitionsTotal;

  return { durationInFrames: Math.max(durationInFrames, INTRO_FRAMES) };
};

export const PropertyWalkthroughComposition = () => {
  return (
    <Composition
      id="PropertyWalkthrough"
      component={PropertyWalkthrough}
      durationInFrames={INTRO_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const PropertyWalkthrough: React.FC<Props> = () => {
  if (clips.length === 0) {
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
        Waiting for clips — add entries to src/clips.ts and drop the files
        into public/clips/
      </AbsoluteFill>
    );
  }

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
        <IntroCard propertyName={PROPERTY_NAME} tagline={PROPERTY_TAGLINE} />
      </TransitionSeries.Sequence>

      {clips.flatMap((clip, index) => [
        <TransitionSeries.Transition
          key={`transition-${index}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />,
        <TransitionSeries.Sequence key={`clip-${index}`} durationInFrames={clip.durationInFrames}>
          <ClipScene src={clip.src} label={clip.label} zoomOut={index % 2 === 1} />
        </TransitionSeries.Sequence>,
      ])}

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />
      <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
        <OutroCard propertyName={PROPERTY_NAME} cta={OUTRO_CTA} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
