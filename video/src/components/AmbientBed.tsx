import React from "react";
import { Audio, staticFile, interpolate } from "remotion";
import { TOTAL_DURATION_IN_FRAMES } from "../edit-config";

/**
 * Continuous low-volume ambience so there's never a dead-silent gap under the
 * muted/narrated B-roll shots (villa walkthrough, slow-mo climax, outro).
 * Sourced from reel-2's own crowd/splash/party ambience (extracted to
 * `public/ambient-bed.webm` — Opus audio, see README for the ffmpeg command)
 * and looped quietly under the whole edit, with a fade in/out so it never
 * cuts abruptly.
 *
 * Drop-in replacement: if you have a licensed music track, set MUSIC_TRACK_SRC
 * below (e.g. staticFile("party-track.mp3")) — it will be used instead, at a
 * higher bed volume since it's meant to carry the edit rather than just fill gaps.
 */
const MUSIC_TRACK_SRC: string | null = null;
const AMBIENT_BED_SRC = staticFile("ambient-bed.webm");

const AMBIENT_BED_VOLUME = 0.22;
const MUSIC_TRACK_VOLUME = 0.55;
const FADE_FRAMES = 20;

export const AmbientBed: React.FC = () => {
  const src = MUSIC_TRACK_SRC ?? AMBIENT_BED_SRC;
  const peakVolume = MUSIC_TRACK_SRC ? MUSIC_TRACK_VOLUME : AMBIENT_BED_VOLUME;

  return (
    <Audio
      src={src}
      loop
      volume={(frame: number) =>
        interpolate(
          frame,
          [0, FADE_FRAMES, TOTAL_DURATION_IN_FRAMES - FADE_FRAMES, TOTAL_DURATION_IN_FRAMES],
          [0, peakVolume, peakVolume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
    />
  );
};
