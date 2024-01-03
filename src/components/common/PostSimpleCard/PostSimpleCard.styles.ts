import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $basis: "half" | "full" }>`
  flex-direction: column;
  ${({ $basis }) => {
    if ($basis === "half") {
      return css`
        max-height: 70%;
        flex-basis: calc(50% - 11px);
      `;
    } else {
      return css`
        max-height: 70%;
        flex-basis: calc(100% - 11px);
      `;
    }
  }};

  @media screen and (max-width: 500px) {
    max-height: 70%;
    flex-basis: calc(100% - 11px);
  }
  box-sizing: border-box;
  margin: 0px 5.5px 12px;
  border: 1px solid royalblue;
`;

export const CardImageContainer = styled.div`
  position: relative;
  min-height: auto;
`;
