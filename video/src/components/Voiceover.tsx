import { Audio, Sequence, staticFile } from "remotion";

export type VoiceoverConfig = {
  // Filename inside public/voiceover/ (e.g. "long-weekend.mp3"). null = no voiceover.
  src: string | null;
  // Frame (at 30fps) where the voice starts. 15 = half a second in.
  startFrame: number;
  // Voice volume, 0-1.
  volume: number;
  // Volume of the clips' original audio while a voiceover is playing, 0-1.
  clipVolumeUnderVoice: number;
};

// Renders nothing until a voiceover file is configured, so the reel keeps
// rendering exactly as before.
export const Voiceover: React.FC<{ config: VoiceoverConfig }> = ({
  config,
}) => {
  if (!config.src) return null;
  return (
    <Sequence from={config.startFrame} layout="none">
      <Audio
        src={staticFile(`voiceover/${config.src}`)}
        volume={config.volume}
      />
    </Sequence>
  );
};
