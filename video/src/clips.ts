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
  { src: "01-entrance.mp4", label: "Welcome Home", durationInFrames: 570 },
  { src: "02-chandeliers.mp4", label: "Statement Lighting", durationInFrames: 90 },
  { src: "11-dining-area.mp4", label: "Dining Area", durationInFrames: 90 },
  { src: "03-kitchen.mp4", label: "The Kitchen", durationInFrames: 105 },
  { src: "04-master-bedroom.mp4", label: "Master Bedroom", durationInFrames: 375 },
  { src: "05-master-bedroom-2.mp4", label: "Master Suite", durationInFrames: 90 },
  { src: "06-washroom-master-bedroom.mp4", label: "Master Ensuite", durationInFrames: 90 },
  { src: "07-bedroom-1.mp4", label: "Bedroom Two", durationInFrames: 105 },
  { src: "08-washroom-1.mp4", label: "En-suite", durationInFrames: 150 },
  { src: "09-bedroom-2.mp4", label: "Bedroom Three", durationInFrames: 105 },
  { src: "10-washroom-2.mp4", label: "En-suite", durationInFrames: 90 },
  { src: "12-pool.mp4", label: "The Pool", durationInFrames: 210 },
];
