import { staticFile } from "remotion";
import type { WipeDirection } from "@remotion/transitions/wipe";

/**
 * ============================================================================
 * PARTY PROMO REEL — EDIT CONFIG
 * ============================================================================
 * This file is the single source of truth for the whole edit: cut order,
 * trim points, on-screen duration, camera effect, and text for every shot.
 * The composition's total duration is *derived* from this list (see
 * `TOTAL_DURATION_IN_FRAMES` at the bottom), so re-timing the edit is just a
 * matter of editing the numbers below — nothing else needs to change.
 *
 * Structure follows a hook -> build-up -> party peak -> outro arc:
 *   HOOK      (~0-3s)   grab attention immediately
 *   BUILD-UP  (~3-10s)  alternate both reels, energy rising
 *   PEAK      (~10-20s) fastest cuts, most exciting footage, climax hold
 *   OUTRO     (~20-25s) strongest closing shot + brand / CTA card
 *
 * The last scene (OUTRO) has no fixed duration — it automatically fills
 * whatever time is left so the composition always lands on exactly 25s.
 * ============================================================================
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TARGET_DURATION_SECONDS = 25;

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
const TIMELINE: TimelineEntry[] = [
  // ---------------------------------------------------------------- HOOK ---
  {
    scene: {
      id: "hook-a",
      source: "reel2",
      trimBeforeSec: 8.75,
      durationInFrames: 50,
      effect: { type: "punchIn", zoomTo: 1.16 },
      caption: { kind: "pop", text: "LET'S PARTY", brand: "TISYA STAYS" },
    },
    transitionAfter: { kind: "wipe", direction: "from-bottom", durationInFrames: 10 },
  },
  {
    scene: {
      id: "hook-b",
      source: "reel1",
      trimBeforeSec: 26.3,
      durationInFrames: 44,
      effect: { type: "kenBurns", zoomTo: 1.05, panXPercent: -1.5 },
      muteVideo: true,
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },

  // ------------------------------------------------------------ BUILD-UP ---
  {
    scene: {
      id: "build-a",
      source: "reel2",
      trimBeforeSec: 6.5,
      durationInFrames: 16,
      effect: { type: "punchIn", zoomTo: 1.14 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },
  {
    scene: {
      id: "build-b",
      source: "reel1",
      trimBeforeSec: 22.2,
      durationInFrames: 34,
      effect: { type: "kenBurns", zoomTo: 1.06, panYPercent: 1.5 },
      muteVideo: true,
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },
  {
    scene: {
      id: "build-c",
      source: "reel2",
      trimBeforeSec: 5.0,
      durationInFrames: 36,
      effect: { type: "punchIn", zoomTo: 1.14 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },
  {
    scene: {
      id: "build-d",
      source: "reel1",
      trimBeforeSec: 8.0,
      durationInFrames: 48,
      effect: { type: "kenBurns", zoomTo: 1.05, panXPercent: 1.5 },
      muteVideo: true,
      caption: { kind: "title", text: "STAY. SIP. CELEBRATE." },
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },
  {
    scene: {
      id: "build-e",
      source: "reel2",
      trimBeforeSec: 13.1,
      durationInFrames: 34,
      effect: { type: "punchIn", zoomTo: 1.14 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 6 },
  },
  {
    scene: {
      id: "build-f",
      source: "reel1",
      trimBeforeSec: 9.0,
      durationInFrames: 38,
      effect: { type: "kenBurns", zoomTo: 1.06, panYPercent: -1.5 },
      muteVideo: true,
    },
    transitionAfter: { kind: "wipe", direction: "from-right", durationInFrames: 10 },
  },

  // ----------------------------------------------------------------- PEAK ---
  {
    scene: {
      id: "peak-a",
      source: "reel2",
      trimBeforeSec: 7.8,
      durationInFrames: 22,
      playbackRate: 1.15,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.12 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-b",
      source: "reel2",
      trimBeforeSec: 16.6,
      durationInFrames: 22,
      effect: { type: "punchIn", zoomTo: 1.13 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-c",
      source: "reel2",
      trimBeforeSec: 15.3,
      durationInFrames: 24,
      effect: { type: "punchIn", zoomTo: 1.12 },
      caption: { kind: "tag", text: "LIVE DJ" },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-d",
      source: "reel1",
      trimBeforeSec: 12.7,
      durationInFrames: 16,
      effect: { type: "kenBurns", zoomTo: 1.07 },
      muteVideo: true,
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-e",
      source: "reel2",
      trimBeforeSec: 19.0,
      durationInFrames: 20,
      effect: { type: "punchIn", zoomTo: 1.13 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-f",
      source: "reel2",
      trimBeforeSec: 11.5,
      durationInFrames: 22,
      effect: { type: "punchIn", zoomTo: 1.12 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-g",
      source: "reel2",
      trimBeforeSec: 20.05,
      durationInFrames: 16,
      effect: { type: "kenBurns", zoomTo: 1.08 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-h",
      source: "reel2",
      trimBeforeSec: 10.6,
      durationInFrames: 22,
      effect: { type: "punchIn", zoomTo: 1.13 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-i",
      source: "reel2",
      trimBeforeSec: 17.6,
      durationInFrames: 24,
      effect: { type: "punchIn", zoomTo: 1.12 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-j",
      source: "reel2",
      trimBeforeSec: 4.0,
      durationInFrames: 22,
      effect: { type: "punchIn", zoomTo: 1.12 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-k",
      source: "reel2",
      trimBeforeSec: 16.0,
      durationInFrames: 16,
      effect: { type: "punchIn", zoomTo: 1.1 },
    },
    transitionAfter: { kind: "fade", durationInFrames: 5 },
  },
  {
    scene: {
      id: "peak-l",
      source: "reel2",
      trimBeforeSec: 18.4,
      durationInFrames: 20,
      effect: { type: "kenBurns", zoomTo: 1.07 },
    },
    transitionAfter: { kind: "wipe", direction: "from-top", durationInFrames: 10 },
  },

  // -------------------------------------------------------------- CLIMAX ---
  // Slow-motion payoff on the party's biggest energy shot — the visual climax.
  {
    scene: {
      id: "climax",
      source: "reel2",
      trimBeforeSec: 7.6,
      durationInFrames: 120,
      playbackRate: 0.5,
      muteVideo: true,
      effect: { type: "punchIn", zoomTo: 1.08 },
      caption: { kind: "climax", text: "PARTY LIKE NEVER BEFORE" },
    },
    transitionAfter: { kind: "fade", durationInFrames: 14 },
  },
];

// ----------------------------------------------------------------------------
// OUTRO — closes on the villa at golden hour in gentle slow motion, holding
// for the brand + CTA card. Duration auto-fills whatever time remains so the
// whole composition always totals exactly TARGET_DURATION_SECONDS.
// ----------------------------------------------------------------------------
const OUTRO_MIN_FRAMES = 60;
// Kept low so a long text-hold outro never plays past the end of reel-1's
// source footage (trimBeforeSec + durationInFrames * rate must stay within
// REEL_1_DURATION_SEC).
const OUTRO_PLAYBACK_RATE = 0.5;

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
  caption: {
    kind: "outro",
    brand: "TISYA STAYS",
    tagline: "Your Next Celebration Starts Here",
    cta: "BOOK NOW — LINK IN BIO",
  },
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
