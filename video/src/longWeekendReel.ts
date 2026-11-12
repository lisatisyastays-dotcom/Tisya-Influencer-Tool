// Long weekend reel playlist.
//
// Drop incoming clips into video/public/reels/ and add one entry per clip
// below, in the order they should appear.
//
// - src: filename inside public/reels/ (staticFile() resolves it)
// - durationInFrames: how long this clip plays at 30fps (e.g. 90 = 3s).

import type { VoiceoverConfig } from "./components/Voiceover";

export type ReelClipData = {
  src: string;
  durationInFrames: number;
};

// Voiceover: drop the audio file into video/public/voiceover/ and set src.
export const VOICEOVER: VoiceoverConfig = {
  src: null, // e.g. "long-weekend.mp3"
  startFrame: 15,
  volume: 1,
  clipVolumeUnderVoice: 0.15,
};

export const HOOK_TEXT = "Got Plans For The Long Weekend?";

export const reelClips: ReelClipData[] = [
  { src: "00-goa-entrance.mp4", durationInFrames: 150 },
  { src: "01-friends-walkway.mp4", durationInFrames: 280 },
  { src: "02-clip-4.mp4", durationInFrames: 110 },
  { src: "03-clip-5.mp4", durationInFrames: 108 },
  { src: "04-clip-6.mp4", durationInFrames: 152 },
  { src: "05-clip-7.mp4", durationInFrames: 90 },
  { src: "06-clip-10.mp4", durationInFrames: 124 },
  { src: "07-clip-3.mp4", durationInFrames: 87 },
  { src: "08-clip-9.mp4", durationInFrames: 110 },
];
