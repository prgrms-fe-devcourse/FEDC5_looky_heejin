import React from "react";
import { SplashContainer, SplashText } from "./SplashPage.style";

interface ISplashProps {
  isVisible: boolean;
}

const SplashPage: React.FC<ISplashProps> = ({ isVisible }) => {
  return isVisible ? (
    <SplashContainer>
      <SplashText>looky</SplashText>
    </SplashContainer>
  ) : null;
};

export default SplashPage;
