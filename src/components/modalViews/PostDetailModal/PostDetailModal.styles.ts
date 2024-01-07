import { Button, Input } from "@/components/common";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import styled, { keyframes } from "styled-components";

// 전체 -----------------------------------------
export const PostDetailWrapper = styled.div`
  border: 1px solid white;
  width: ${APP_MAX_WIDTH}px;
  height: 100vh;
  overflow-y: auto;
`;

// (상) UserInfo --------------------------------------------
export const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* height: 7rem; */
  /* border: 1px solid red; */
`;
export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
  /* padding-top: 0.5rem; */
  /* border: 1px solid white; */
`;

export const UserNameWrapper = styled.div`
  display: flex;
  height: 3.75rem;
  justify-content: center;
`;

export const UserNameSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export const FollowButton = styled(Button)`
  display: flex;
  width: 4.3rem;
  height: 2rem;
  position: absolute;
  right: 1.5rem;
  font-size: 0.8rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.gray_500};
  align-items: center;
  justify-content: center;
`;

// (중) Image ----------------------------------------
export const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 133%;
  position: relative;
`;

export const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  padding: 0 1rem;
  /* border: 1px solid white; */
`;

export const StyledSpan = styled.span`
  overflow: hidden;
  /* text-overflow: ellipsis; */
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* -webkit-box-orient: vertical; */
  line-height: 1.2rem;
  font-size: 0.9rem;
  padding-left: 0.2rem;
  margin-right: 0.3rem;
`;

export const IconsWrapper = styled.div`
  /* position: absolute; */
  /* top: 0.7rem; */
  /* right: 1rem; */
  width: 100%;
  height: 2.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > * {
    cursor: pointer;
  }

  /* border: 1px solid blue; */
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
  margin: auto auto;
  font-size: 0.9rem;

  padding-left: 0.3rem;

  /* border: 1px solid blue; */
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
  /* padding-right: 1rem; */
`;

// 댓글 --------------------------------------------
export const CommentWrapper = styled.div`
  font-size: 0.8rem;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-top: 1rem;
  border-top: 1px solid red;
`;

export const UserNameInComment = styled.span`
  font-weight: 600;
  /* color: red; */
`;

// 댓글입력창 --------------------------------------------
export const InputWrapper = styled.div`
  position: relative;
  /* border: 1px solid red; */
  height: 2.8rem;
`;

export const StyledInput = styled(Input)`
  border-radius: 2rem;
  height: 2rem;
  font-size: 0.85rem;
  width: 98%;
  margin: auto auto;
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
