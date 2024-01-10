import {
  NAV_HEIGHT,
  POSTER_SIMPLE_CARD_HEIGHT,
  POSTER_SIMPLE_CARD_WIDTH,
} from "@/constants/uiConstants";
import { Col, Row } from "@/styles/GlobalStyle";
import { css, styled } from "styled-components";

// ProfileView
export const Profile = styled(Col)<{ $isMe: string; $coverImage: string }>`
  height: calc(100vh - ${NAV_HEIGHT * 2}rem);
  padding: 1rem;
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

// PostsView
export const Posts = styled(Col)`
  justify-content: flex-start;
  align-items: center;
  min-height: 576px;
  padding: 2rem 2rem 1rem;
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
