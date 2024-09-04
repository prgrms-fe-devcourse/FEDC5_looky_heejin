import { SPINNER } from "@/constants/uiConstants";
import { Image } from "@/components/common";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

const SpinnerContainer = styled.div`
  display: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  animation: ${spin} 8s linear infinite;
  z-index: ${SPINNER};
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <Image
          src="/looky_spinner.png"
          alt="looky_spinner"
          width={120}
          height={120}
        />
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};

export default Spinner;
