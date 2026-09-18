import "./index.css";
import { MyComposition } from "./Composition";
import { PropertyWalkthroughComposition } from "./PropertyWalkthrough";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <PropertyWalkthroughComposition />
      <MyComposition />
    </>
  );
};
