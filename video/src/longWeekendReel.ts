// Long weekend reel playlist.
//
// Drop incoming clips into video/public/reels/ and add one entry per clip
// below, in the order they should appear.
//
// - src: filename inside public/reels/ (staticFile() resolves it)
// - durationInFrames: how long this clip plays at 30fps (e.g. 90 = 3s).

export type ReelClipData = {
  src: string;
  durationInFrames: number;
};

export const HOOK_TEXT = "Got Plans For The Long Weekend?";

export const reelClips: ReelClipData[] = [
  { src: "00-goa-entrance.mp4", durationInFrames: 150 },
  { src: "01-friends-walkway.mp4", durationInFrames: 280 },
];
