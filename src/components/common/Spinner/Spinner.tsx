import { SPINNER } from "@/constants/uiConstants";
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
        <img
          src="/looky_spinner.png"
          alt="looky_spinner"
          width="200px"
          height="200px"
        />
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};

export default Spinner;
