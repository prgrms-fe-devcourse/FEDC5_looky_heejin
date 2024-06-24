import {
  NAV_HEIGHT,
  POSTER_SIMPLE_CARD_HEIGHT,
  POSTER_SIMPLE_CARD_WIDTH,
} from "@/constants/uiConstants";
import { Col, Row } from "@/styles/GlobalStyle";
import { css, styled } from "styled-components";

export const Profile = styled.section<{ $isMe: string; $coverImage: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: calc(100vh - ${NAV_HEIGHT * 2}rem - 10px);
  height: calc(100vh - ${NAV_HEIGHT * 2}rem - 10px);
  width: 100%;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  padding: 1rem;
  margin-top: 10px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${props => props.$coverImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${props =>
    props.$isMe === "true" &&
    css`
      cursor: pointer;
    `}
`;

export const ButtonsWrap = styled(Row)`
  &.me {
    justify-content: flex-end;
    &:after {
      content: "";
    }
  }
  &.others {
  }
`;

export const AvatarWrap = styled.div<{ $isMe: string }>`
  border-radius: 50%;
  ${props =>
    props.$isMe === "true" &&
    css`
      cursor: pointer;
    `}
`;

export const InfoWrap = styled(Col)`
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-bottom: 1rem;
`;

export const Posts = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 576px;
  padding-top: 2rem;
`;

export const PostsList = styled(Row)`
  width: 520px;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

export const PostCard = styled.div`
  padding-right: calc((520px - (${POSTER_SIMPLE_CARD_WIDTH} + 10) * 3px) / 2);
  padding-bottom: 1rem;

  &:nth-child(3n) {
    padding-right: 0;
  }
`;

export const ImageWrap = styled.div`
  position: relative;
  width: ${POSTER_SIMPLE_CARD_WIDTH + 10}px;
  height: ${POSTER_SIMPLE_CARD_HEIGHT + 10}px;
`;

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
  padding-bottom: 3rem;
`;

export const EmptyPost = styled.div`
  flex-grow: 1;
  justify-content: center;
`;

export const CoverChange = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
