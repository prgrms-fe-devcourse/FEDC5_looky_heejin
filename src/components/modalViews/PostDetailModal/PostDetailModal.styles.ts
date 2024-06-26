import { Button, Input } from "@/components/common";
import {
  APP_MAX_WIDTH,
  MODAL_LAYOUT,
  SCREEN_SIZE_SM,
} from "@/constants/uiConstants";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const zoomin = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
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

// 전체 -----------------------------------------
export const PostDetailWrapper = styled.section`
  width: 100%;
  height: 100%;

  @media (min-width: ${SCREEN_SIZE_SM}px) {
    width: ${APP_MAX_WIDTH}px;
    height: 95vh;
  }

  background-color: ${({ theme }) => `${theme.background_color}`};
  border: ${({ theme }) => `0.5px solid ${theme.container_color}`};
  border-radius: 0.5rem;
  overflow-y: auto;
  z-index: ${MODAL_LAYOUT};
  margin-right: 0.4rem;
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

// (상) UserInfo --------------------------------------------
export const UserInfoWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserInfo = styled.section<{
  tabIndex?: number;
}>`
  display: flex;
  flex-direction: row;
`;

export const AvatarWrapper = styled.div`
  margin: auto auto;
  padding-left: 1rem;
  & :hover {
    cursor: pointer;
  }
`;

export const UserNameWrapper = styled.div`
  height: 3.75rem;
  padding-left: 0.9rem;
  & :hover {
    cursor: pointer;
  }
`;

export const UserNameSpan = styled.span`
  margin: auto auto;
  font-weight: 600;
`;

export const FollowButton = styled(Button)<{
  variant: string;
  onClick: () => void;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.3rem;
  height: 1rem;
  font-size: 0.7rem;
  line-height: 0.5rem;
  margin-left: 1rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.gray_500};
`;

export const CloseIconWrapper = styled.div<{
  tabIndex: number;
}>`
  position: absolute;
  right: 1rem;
  & :hover {
    cursor: pointer;
  }
`;

export const TrashIconWrapper = styled.div`
  margin-left: 0.3rem;

  &:hover {
    cursor: pointer;
    animation: ${zoomin} 0.4s ease-in-out forwards;
  }
`;

// (중) Image ----------------------------------------
export const ImageWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding-top: 160%;
`;

export const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 10 / 16;
  object-fit: cover;
  border-radius: 0.5rem;
`;

// (하) UserInfo, Image 제외한 Content, Comments 등..
export const CaptionWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.article`
  /* padding: 0 1rem; */
`;

export const StyledSpan = styled.span`
  display: -webkit-box;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-line-clamp: 5;
  font-size: 0.9rem;
  line-height: 1.4rem;
  padding: 0 1rem 0.5rem 1rem;
`;

export const IconsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.8rem;
  /* border: 1px solid white; */
`;

export const HeartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.6rem;
`;

export const HeartIconWrapper = styled.div<{
  tabIndex?: number;
}>`
  & :first-child {
    margin-top: 0.2rem;
  }
  &:hover {
    cursor: pointer;
    animation: ${heartbeat} 0.7s ease-in-out infinite;
  }
`;

export const LikeCountSpan = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  margin: auto auto;
  padding-left: 0.3rem;
`;

export const CommentChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.5rem;
  & :first-child {
    margin-top: 0.25rem;
    margin-right: 0.2rem;
  }
`;

export const TitleSpan = styled.span`
  position: relative;
  display: inline-block;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4rem;
  margin-bottom: 0.5rem;
  padding: 0 0.15rem;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1.4rem;
    border-radius: 5px;
    bottom: 0;
    left: 0;
    opacity: 0.15;
    background-color: ${({ theme }) => theme.symbol_color};
    transition: width 1s;
  }
  &:hover::after {
    width: 100%;
  }
`;

// 댓글 --------------------------------------------
export const CommentAvatarBox = styled.div`
  position: absolute;
  top: 0;
`;
export const CommentWrapper = styled.section`
  font-size: 0.9rem;
  padding: 0.5rem 0.5rem 0.2rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.container_color};
  box-sizing: border-box;
`;

export const CommentAvatarWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const UserNameInComment = styled.span`
  font-weight: bold;

  cursor: pointer;
`;

export const CommentDate = styled.span`
  color: ${({ theme }) => theme.gray_300};
  margin-left: 0.4rem;
`;

export const DeleteCommentIconWrapper = styled.div``;

export const StyledLi = styled.li`
  display: flex;
  align-items: center;
  margin: 3px 0;
  padding: 0 3px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  /* border: 1px solid white; */
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const IconWrapper = styled.section`
  & > * {
    margin-bottom: 0.3rem;
  }
  &:hover {
    cursor: pointer;
    animation: ${zoomin} 0.4s ease-in-out forwards;
  }
`;

export const CommentContentBox = styled.div`
  padding-left: 40px;
  margin-top: 4px;
`;

export const CommentUserInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  margin-bottom: 0.2rem;
`;

export const CommentContent = styled.span`
  margin: 0 8px;
  line-height: 1.2rem;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const MoreComments = styled.span`
  cursor: pointer;
  margin-left: 0.6rem;
  color: ${({ theme }) => theme.gray_500};
`;

export const NoComments = styled.span`
  margin-left: 0.6rem;
  color: ${({ theme }) => theme.gray_500};
`;

// 댓글입력창 --------------------------------------------
export const InputWrapper = styled.div`
  position: relative;
  height: 2.8rem;
`;

export const StyledInput = styled(Input)`
  width: 98%;
  height: 2rem;
  font-size: 0.85rem;
  margin: auto auto;
  padding-right: 3rem;
  border-radius: 1rem;
`;

export const ReplyButton = styled.span`
  position: absolute;
  top: 0.9rem;
  right: 1.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.gray_300};
  cursor: pointer;
`;

export const ContentDetail = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.gray_500};
`;

// 애니메이션
const heartAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(4) rotate(-15deg);
  }
  10% {
    opacity: 0.8;
    transform: scale(3) rotate(15deg);
  }
  20% {
    opacity: 0.8;
    transform: scale(3) rotate(-10deg);
  }
  30% {
    opacity: 0.8;
    transform: scale(2) rotate(10deg);
  }
  50% {
    opacity: 0.8;
    transform: scale(1) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: scale(12) rotate(0deg);
  }
`;

export const HeartInImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  animation: ${heartAnimation} 0.9s ease-out forwards;
`;

export const Tag = styled.i<any>`
  z-index: 50;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  background: linear-gradient(
    45deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  transform: translateX(-50%) translateY(-50%);

  ${tw`absolute w-3 h-3 rounded-full`};
`;
