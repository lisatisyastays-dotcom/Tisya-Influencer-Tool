import { staticFile } from "remotion";
import type { WipeDirection } from "@remotion/transitions/wipe";

/**
 * ============================================================================
 * PARTY PROMO REEL — EDIT CONFIG
 * ============================================================================
 * This file is the single source of truth for the whole edit: cut order,
 * trim points, on-screen duration, and camera effect for every shot. There
 * is no text/caption layer in this cut — it's footage-only, closing on a
 * fade to black (see `FadeToBlack` in Composition.tsx). The composition's
 * total duration is *derived* from this list (see `TOTAL_DURATION_IN_FRAMES`
 * at the bottom), so re-timing the edit is just a matter of editing the
 * numbers below — nothing else needs to change.
 *
 * Structure follows a hook -> build-up -> party peak -> outro arc, with each
 * shot held 3-5s so the edit reads as a handful of deliberate, cinematic
 * moments rather than a rapid-fire montage:
 *   HOOK      the most attention-grabbing shot
 *   BUILD-UP  villa + party alternation, energy rising
 *   PEAK      the party's best moments, climax hold
 *   OUTRO     strongest closing shot, fading to black
 *
 * The last scene (OUTRO) has no fixed duration — it automatically fills
 * whatever time is left so the composition always lands on exactly 25s.
 * ============================================================================
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TARGET_DURATION_SECONDS = 25;
// How long the very end of the reel takes to fade to black/silent — shared
// by the video fade (Composition.tsx) and the audio fade (AmbientBed.tsx)
// so picture and sound land together.
export const END_FADE_FRAMES = 20;

// Source clips, both native 720x1280 (9:16) @ 30fps.
export const REEL_1 = staticFile("reel-1.mp4"); // villa / property showcase, 28.67s
export const REEL_2 = staticFile("reel-2.mp4"); // pool party footage, 22.59s
export const REEL_1_DURATION_SEC = 28.673787;
export const REEL_2_DURATION_SEC = 22.588707;

export const COLORS = {
  gold: "#FFD24C",
  goldSoft: "#FFE9A8",
  goldDeep: "#C98A22",
  cream: "#FFF7E8",
  ink: "#14110A",
  // Accent bar under every headline.
  orange: "#FF7A29",
};

// A shared CSS filter applied to every clip so footage shot in different
// light (bright daylight villa tour vs. overcast pool party) reads as one
// consistent, punchy, premium "party ad" grade.
export const GRADE_FILTER =
  "saturate(1.18) contrast(1.08) brightness(1.03) sepia(0.06)";

export type PunchInEffect = { type: "punchIn"; zoomTo?: number };
export type KenBurnsEffect = {
  type: "kenBurns";
  zoomTo?: number;
  panXPercent?: number;
  panYPercent?: number;
};
export type SceneEffect = PunchInEffect | KenBurnsEffect;

export type PopCaption = { kind: "pop"; text: string; brand?: string };
export type TitleCaption = { kind: "title"; text: string };
export type TagCaption = { kind: "tag"; text: string };
export type ClimaxCaption = { kind: "climax"; text: string };
export type OutroCaption = {
  kind: "outro";
  brand: string;
  tagline: string;
  cta: string;
};
export type SceneCaption =
  | PopCaption
  | TitleCaption
  | TagCaption
  | ClimaxCaption
  | OutroCaption;

export type SceneDef = {
  id: string;
  source: "reel1" | "reel2";
  /** In point on the *source* clip, in seconds. */
  trimBeforeSec: number;
  /** How long this shot stays on screen, in frames. */
  durationInFrames: number;
  /** 1 = normal speed. <1 = slow motion. >1 = sped up. */
  playbackRate?: number;
  /** Mute this clip's own audio (used for narrated B-roll and speed-ramped shots). */
  muteVideo?: boolean;
  /** Volume for this clip's own audio when not muted (0-1). */
  videoVolume?: number;
  effect: SceneEffect;
  /** Vertical focal point for object-fit cover, 0 (top) - 100 (bottom). */
  focalY?: number;
  caption?: SceneCaption;
};

export type TransitionDef =
  | { kind: "fade"; durationInFrames: number }
  | { kind: "wipe"; direction: WipeDirection; durationInFrames: number };

type TimelineEntry = { scene: SceneDef; transitionAfter?: TransitionDef };

// ----------------------------------------------------------------------------
// HOOK + BUILD-UP + PEAK — every scene except the closing outro card.
// Reordering, trimming, or re-timing the edit happens here.
// ----------------------------------------------------------------------------
// Each shot below plays back in gentle slow motion (playbackRate under 1)
// so a 3-5s hold never runs out of coherent source material and jump-cuts
// into unrelated footage. Rates differ per clip because dj/climax have less
// clean runway in the source before the next scene's own footage starts, so
// they're slowed more to stay inside their own window.
const TIMELINE: TimelineEntry[] = [
  // ---------------------------------------------------------------- HOOK ---
  // The dive into the group's arms-up cheer, in slow motion — the single
  // most attention-grabbing moment in either reel.
  {
    scene: {
      id: "hook",
      source: "reel2",
      trimBeforeSec: 8.3,
      durationInFrames: 120, // 4.0s
      playbackRate: 0.6,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.1 },
    },
    transitionAfter: { kind: "wipe", direction: "from-bottom", durationInFrames: 24 },
  },

  // ------------------------------------------------------------ BUILD-UP ---
  // The villa's living room flowing into the dining room — establishes the
  // premium stay before cutting back to the party.
  {
    scene: {
      id: "villa",
      source: "reel1",
      trimBeforeSec: 8.0,
      durationInFrames: 120, // 4.0s
      playbackRate: 0.6,
      muteVideo: true,
      effect: { type: "kenBurns", zoomTo: 1.06, panXPercent: 1.5 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 20 },
  },
  {
    scene: {
      id: "cheers",
      source: "reel2",
      trimBeforeSec: 12.2,
      durationInFrames: 120, // 4.0s
      playbackRate: 0.5,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.1 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 20 },
  },

  // ----------------------------------------------------------------- PEAK ---
  {
    scene: {
      id: "dj",
      source: "reel2",
      trimBeforeSec: 15.3,
      durationInFrames: 135, // 4.5s
      playbackRate: 0.35,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.08 },
    },
    transitionAfter: { kind: "wipe", direction: "from-top", durationInFrames: 24 },
  },

  // -------------------------------------------------------------- CLIMAX ---
  // Kid's cannonball flowing into the wide pool shot and the balcony wave,
  // all in slow motion — the visual climax.
  {
    scene: {
      id: "climax",
      source: "reel2",
      trimBeforeSec: 17.6,
      durationInFrames: 150, // 5.0s
      playbackRate: 0.3,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.1 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 24 },
  },
];

// ----------------------------------------------------------------------------
// OUTRO — closes on the villa in gentle slow motion, then fades to black
// (see FadeToBlack in Composition.tsx). Duration auto-fills whatever time
// remains so the whole composition always totals TARGET_DURATION_SECONDS.
// ----------------------------------------------------------------------------
const OUTRO_MIN_FRAMES = 60;
// Kept low so a long text-hold outro never plays past the end of reel-1's
// source footage (trimBeforeSec + durationInFrames * rate must stay within
// REEL_1_DURATION_SEC).
const OUTRO_PLAYBACK_RATE = 0.35;

const fixedScenesFrames = TIMELINE.reduce((sum, t) => sum + t.scene.durationInFrames, 0);
const fixedTransitionsFrames = TIMELINE.reduce(
  (sum, t) => sum + (t.transitionAfter?.durationInFrames ?? 0),
  0,
);

const outroDurationInFrames = Math.round(
  FPS * TARGET_DURATION_SECONDS - (fixedScenesFrames - fixedTransitionsFrames),
);

if (outroDurationInFrames < OUTRO_MIN_FRAMES) {
  console.warn(
    `[edit-config] Outro only has ${outroDurationInFrames}f left — trim earlier scenes to give it more room.`,
  );
}

const OUTRO_SCENE: SceneDef = {
  id: "outro",
  source: "reel1",
  trimBeforeSec: 24.5,
  durationInFrames: Math.max(outroDurationInFrames, OUTRO_MIN_FRAMES),
  playbackRate: OUTRO_PLAYBACK_RATE,
  muteVideo: true,
  effect: { type: "kenBurns", zoomTo: 1.06, panYPercent: -1 },
};

export const SCENES: SceneDef[] = [...TIMELINE.map((t) => t.scene), OUTRO_SCENE];
// One transition per gap between scenes (SCENES.length - 1 total); the last
// TIMELINE entry's transition is the one leading into the OUTRO scene.
export const TRANSITIONS: TransitionDef[] = TIMELINE.map((t) => t.transitionAfter).filter(
  (t): t is TransitionDef => Boolean(t),
);

export const TOTAL_DURATION_IN_FRAMES =
  SCENES.reduce((sum, s) => sum + s.durationInFrames, 0) -
  TRANSITIONS.reduce((sum, t) => sum + t.durationInFrames, 0);
