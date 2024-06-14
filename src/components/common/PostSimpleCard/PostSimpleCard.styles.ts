import { Row } from "@/styles/GlobalStyle";
import styled, { css, keyframes } from "styled-components";

export const CardContainer = styled.article<{ $basis: "half" | "full" }>`
  /* 기본 */
  font-size: 1rem;
  flex-direction: column;
  box-sizing: border-box;
  ${({ $basis }) => {
    if ($basis === "half") {
      return css`
        /* max-height: 70%; */
        max-width: calc(50% - 11px);
        flex-basis: calc(50% - 11px);
      `;
    } else {
      return css`
        /* max-height: 70%; */
        max-width: calc(100% - 11px);
        flex-basis: calc(100% - 11px);
      `;
    }
  }};

  @media screen and (max-width: 500px) {
    /* max-height: 70%; */
    max-width: calc(100% - 11px);
    flex-basis: calc(100% - 11px);
  }

  box-sizing: border-box;
  margin: 0px 5.5px 12px;
  /* 추후 삭제 예정 */
  border: 1px solid ${props => props.theme.card_container_color};
  border-radius: 0.375rem;

  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
    border-color: ${props => props.theme.symbol_color};
  }
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
  cursor: pointer;
  width: 100%;
  aspect-ratio: 10 / 16;
  object-fit: cover;
  border-radius: 0.375rem;
`;

export const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
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
          color: ${props => props.theme.symbol_color};
          scale: 1.2;
          top: 10px;
          /* bottom: calc(100%); */
          right: 10px;
          border-radius: 50%;
          background-color: ${props => props.theme.background_color};
          /* background-color: rgba(0, 0, 0, 0.3); */
        `;
    }
  }};
`;

export const NewDiv = styled.div`
  &:hover {
    animation: ${heartbeat} 0.7s ease-in-out infinite;
  }
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

export const skeletonImageLoading = keyframes`
  from {
    opacity: 0.7;
  }
  to {
    opacity: 0.3;
  }
`;

export const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 10 / 16;
  border-radius: 0.375rem;
  background-color: #aaa;
  animation: ${skeletonImageLoading} 1s infinite alternate;
`;

export const SkeletonFail = styled.div`
  width: 100%;
  display: flex;
  aspect-ratio: 10 / 16;
  border-radius: 0.375rem;
  background-color: #aaa;
  align-items: center;
  justify-content: center;
`;
