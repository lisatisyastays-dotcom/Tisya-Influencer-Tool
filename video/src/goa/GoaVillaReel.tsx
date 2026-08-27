import { AbsoluteFill, Composition, Series } from "remotion";
import { ClipScene } from "./ClipScene";
import { PlaceholderScene } from "./PlaceholderScene";
import { HeroScene } from "./HeroScene";
import { FPS, HEIGHT, TRANSITION_FRAMES, WIDTH } from "./constants";

// The 8-scene Goa villa shot list. Each entry is one beat of the reel;
// `durationInFrames` is how long it's on screen (at 30fps) including the
// crossfade into the next scene.
//
// Scene 6 (Sunset) doesn't have footage yet — it renders as a placeholder
// card. When that clip arrives:
//   1. Drop the file into video/public/goa/
//   2. Swap the <PlaceholderScene> below for a <ClipScene src="goa/<file>.mp4" .../>
const scenes: { key: string; durationInFrames: number; render: (fadeOut: boolean) => React.ReactNode }[] = [
  {
    key: "arrival",
    durationInFrames: 100,
    render: (fadeOut) => (
      <ClipScene
        src="goa/goa-arrival.mp4"
        durationInFrames={100}
        caption="POV: You escaped to Goa 🌴"
        fadeOut={fadeOut}
      />
    ),
  },
  {
    key: "villa-reveal",
    durationInFrames: 130,
    render: (fadeOut) => (
      <ClipScene
        src="goa/goa-villa-exterior.mp4"
        durationInFrames={130}
        caption="And found the perfect stay…"
        fadeOut={fadeOut}
      />
    ),
  },
  {
    key: "villa-interior",
    durationInFrames: 95,
    render: (fadeOut) => (
      <ClipScene
        src="goa/goa-villa-interior.mp4"
        durationInFrames={95}
        caption="Every corner made for slow living"
        fadeOut={fadeOut}
      />
    ),
  },
  {
    key: "pool-moment",
    durationInFrames: 100,
    render: (fadeOut) => (
      <ClipScene
        src="goa/goa-pool.mp4"
        durationInFrames={100}
        caption="Evenings made for the pool"
        fadeOut={fadeOut}
      />
    ),
  },
  {
    key: "goa-experience",
    durationInFrames: 65 + 80,
    render: (fadeOut) => (
      <Series>
        <Series.Sequence durationInFrames={65}>
          <ClipScene
            src="goa/goa-cafe-1.mp4"
            durationInFrames={65}
            caption="Slow mornings…"
            fadeOut={false}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={80}>
          <ClipScene
            src="goa/goa-cafe-2.mp4"
            durationInFrames={80}
            trimBefore={10}
            caption="…and good coffee"
            fadeOut={fadeOut}
          />
        </Series.Sequence>
      </Series>
    ),
  },
  {
    key: "sunset",
    durationInFrames: 85,
    // Needs: beach sunset, people walking/relaxing.
    // Once the clip lands, swap in <ClipScene caption="Golden hour, every evening" ... />
    render: (fadeOut) => <PlaceholderScene durationInFrames={85} label="Sunset" fadeOut={fadeOut} />,
  },
  {
    key: "back-at-villa",
    durationInFrames: 115,
    render: (fadeOut) => (
      <ClipScene
        src="goa/goa-villa-dinner.mp4"
        durationInFrames={115}
        trimBefore={90}
        caption="Back at the villa, toasting the day"
        fadeOut={fadeOut}
      />
    ),
  },
  {
    key: "hero-ending",
    durationInFrames: 110,
    render: () => (
      <HeroScene
        src="goa/goa-hero-poolside.jpg"
        durationInFrames={110}
        caption="Your Goa escape starts here."
      />
    ),
  },
];

const totalDurationInFrames =
  scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0) -
  TRANSITION_FRAMES * (scenes.length - 1);

export const GoaVillaReelComposition = () => {
  return (
    <Composition
      id="GoaVillaReel"
      component={GoaVillaReel}
      durationInFrames={totalDurationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

export const GoaVillaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence
            key={scene.key}
            durationInFrames={scene.durationInFrames}
            offset={index === 0 ? 0 : -TRANSITION_FRAMES}
            layout="none"
          >
            {scene.render(index < scenes.length - 1)}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
