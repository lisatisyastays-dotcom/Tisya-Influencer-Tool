import "./index.css";
import { Composition } from "remotion";
import { TisyaReel } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TisyaReel"
        component={TisyaReel}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
