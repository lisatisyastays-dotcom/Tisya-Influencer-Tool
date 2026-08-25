import "./index.css";
import { MyComposition } from "./Composition";
import { GoaVillaReelComposition } from "./goa/GoaVillaReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <GoaVillaReelComposition />
      <MyComposition />
    </>
  );
};
