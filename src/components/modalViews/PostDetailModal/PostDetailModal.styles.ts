import { Button, Input } from "@/components/common";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

// 전체 -----------------------------------------
export const PostDetailWrapper = styled.div`
  width: ${APP_MAX_WIDTH}px;
  height: 95vh;
  background-color: ${({ theme }) => `${theme.background_color}`};
  border: ${({ theme }) => `0.5px solid ${theme.container_color}`};
  border-radius: 0.5rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

// (상) UserInfo --------------------------------------------
export const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 3.75rem;
`;

export const UserNameSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const FollowButton = styled(Button)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 1.5rem;
  width: 4.3rem;
  height: 1rem;
  font-size: 0.7rem;
  line-height: 0.5rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.gray_500};
`;

// (중) Image ----------------------------------------
export const ImageWrapper = styled.div`
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
export const CaptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  /* padding: 0 1rem; */
`;

export const StyledSpan = styled.span`
  display: -webkit-box;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-line-clamp: 5;
  font-size: 0.9rem;
  line-height: 1.2rem;
  padding: 0.5rem;
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2.8rem;
  & > * {
    cursor: pointer;
  }
`;

export const HeartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.8rem;
  & :first-child {
    margin-top: 0.2rem;
  }
`;

export const LikeCountSpan = styled.span`
  font-size: 0.9rem;
  margin: auto auto;
  padding-left: 0.3rem;
`;

export const CommentChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // TODO : 리팩토링 - 공통으로 빼기
  margin-right: 0.8rem;
  & :first-child {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
  }
`;

// 댓글 --------------------------------------------
export const CommentWrapper = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.container_color};
  box-sizing: border-box;
`;

export const UserNameInComment = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

export const StyledLi = styled.li`
  margin: 3px 0;
  padding: 0 3px;
  box-sizing: border-box;
`;

export const CommentContent = styled.span`
  margin: 0 1px;
  line-height: 1.2rem;
`;

export const MoreComments = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.gray_500};
`;

export const NoComments = styled.span`
  color: ${({ theme }) => theme.gray_500};
`;

// 댓글입력창 --------------------------------------------
export const InputWrapper = styled.div`
  position: relative;
  height: 2.8rem;
`;

export const StyledInput = styled(Input)`
  width: 97%;
  height: 2rem;
  font-size: 0.85rem;
  margin: auto auto;
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
