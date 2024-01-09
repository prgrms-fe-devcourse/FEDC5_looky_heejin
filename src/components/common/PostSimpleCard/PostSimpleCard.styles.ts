import { Row } from "@/styles/GlobalStyle";
import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $basis: "half" | "full" }>`
  /* 기본 */
  font-size: 1rem;
  flex-direction: column;
  box-sizing: border-box;
  ${({ $basis }) => {
    if ($basis === "half") {
      return css`
        max-height: 70%;
        max-width: calc(50% - 11px);
        flex-basis: calc(50% - 11px);
      `;
    } else {
      return css`
        max-height: 70%;
        max-width: calc(100% - 11px);
        flex-basis: calc(100% - 11px);
      `;
    }
  }};

  @media screen and (max-width: 500px) {
    max-height: 70%;
    max-width: calc(100% - 11px);
    flex-basis: calc(100% - 11px);
  }
  box-sizing: border-box;
  margin: 0px 5.5px 12px;
  /* 추후 삭제 예정 */
  border: 1px solid royalblue;
  /* border-radius: 0.375rem; */
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CardImageContainer = styled.div`
  min-height: 200px;
  min-width: 200px;
  border-radius: 0.375rem;
`;

export const CardImage = styled.img`
  /* width: 100%;
  height: 100%;
  object-fit: cover; */
  cursor: pointer;
  width: 100%;
  /* height: 480px; */
  aspect-ratio: 10 / 16;
  /* object-fit: contain; */
  object-fit: cover;
  border-radius: 0.375rem;
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
          top: 5px;
          right: 2px;
        `;
      case "comment":
        return css`
          top: 8px;
          right: 35px;
        `;
      case "sell":
        return css`
          scale: 1.2;
          bottom: calc(100% + 10px);
          right: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
        `;
      case "favorite":
        return css`
          scale: 1.2;
          top: 10px;
          /* bottom: calc(100%); */
          right: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
        `;
    }
  }};
`;

export const TextContainer = styled.div<{ $why?: boolean }>`
  width: calc(100% - 11px);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
  box-sizing: border-box;
  ${props => {
    if (props.$why) {
      return css`
        font-weight: bold;
      `;
    }
  }}
`;

export const ProfileContainer = styled(Row)`
  width: auto;
  align-items: center;
  margin: 5px;
`;
