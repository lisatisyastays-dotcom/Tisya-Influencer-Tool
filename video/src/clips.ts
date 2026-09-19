// Walkthrough clip playlist.
//
// Drop incoming clips into video/public/clips/ and add one entry per clip
// below, in the order they should appear. Clips arrive in batches of 5 —
// just append new entries to the end of this array each time a batch lands.
//
// - src: filename inside public/clips/ (staticFile() resolves it)
// - label: short on-screen caption for the room/feature shown in this clip
//   (keep it to 2-3 words — it renders large in the safe zone)
// - durationInFrames: how long this clip plays at 30fps (e.g. 90 = 3s).
//   Trim to the best-looking section of a longer source clip by setting
//   this shorter than the clip's real length.

export type ClipData = {
  src: string;
  label: string;
  durationInFrames: number;
};

export const INTRO_TITLE = "Take the Tour";
export const OUTRO_CTA = "Book your stay — link in bio";

export const clips: ClipData[] = [
  // Example of what an entry looks like once a clip is added:
  // { src: "01-exterior.mp4", label: "Welcome Home", durationInFrames: 90 },
];
