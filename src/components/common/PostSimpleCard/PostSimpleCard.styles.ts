import { Row } from "@/styles/GlobalStyle";
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

export const CardInfoContainer = styled.div`
  position: relative;
  min-height: auto;
`;

export const CardImageContainer = styled.div`
  min-height: 200px;
  min-width: 200px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const IconContainer = styled.div<{
  $icon: "send" | "comment" | "sell" | "favorite";
}>`
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  ${({ $icon }) => {
    switch ($icon) {
      case "send":
        return css`
          top: 5%;
          right: 1%;
        `;
      case "comment":
        return css`
          top: 7%;
          right: 14%;
          @media screen and (max-width: 500px) {
            right: 10%;
          }
        `;
      case "sell":
        return css`
          scale: 1.1;
          top: -40%;
          right: 2%;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
        `;
      case "favorite":
        return css`
          scale: 1.1;
          top: -80%;
          right: 2%;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
        `;
    }
  }};
`;

export const ProfileContainer = styled(Row)`
  width: auto;
  align-items: center;
  margin: 5px;
`;