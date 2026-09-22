import "./index.css";
import { MyComposition } from "./Composition";
import { LongWeekendReelComposition } from "./LongWeekendReel";
import { PropertyWalkthroughComposition } from "./PropertyWalkthrough";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <PropertyWalkthroughComposition />
      <LongWeekendReelComposition />
      <MyComposition />
    </>
  );
};
