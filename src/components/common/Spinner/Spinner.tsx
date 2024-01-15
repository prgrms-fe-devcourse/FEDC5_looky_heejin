import { SPINNER } from "@/constants/uiConstants";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg)}
`;

// 스피너 ---------------------------------------
const SpinnerWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  animation: ${spin} 8s linear infinite;
  z-index: ${SPINNER};
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <img src="/looky_spinner.png" alt="looky_spinner" />
    </SpinnerWrapper>
  );
};

export default Spinner;
