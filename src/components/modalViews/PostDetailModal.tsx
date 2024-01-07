import { _GET } from "@/api";
import { Avatar, Button, Image, Input } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import { CHAT_ICON, HEART_ICON, SEND_ICON } from "@/constants/icons";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, useTheme } from "styled-components";

const PostDetailWrapper = styled.div`
  border: 1px solid white;
  width: ${APP_MAX_WIDTH}px;
  height: 100vh;
  overflow-y: auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 133%;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const CaptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const UserInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* height: 7rem; */
  /* border: 1px solid red; */
`;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
  /* padding-top: 0.5rem; */
  /* border: 1px solid white; */
`;

const UserNameWrapper = styled.div`
  display: flex;
  height: 3.75rem;
  justify-content: center;
`;

const UserNameSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const FollowButton = styled(Button)`
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

const ContentWrapper = styled.div`
  padding: 0 1rem;
  /* border: 1px solid white; */
`;

const StyledSpan = styled.span`
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

const IconsWrapper = styled.div`
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

const HeartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.8rem;
  & :first-child {
    margin-top: 0.2rem;
  }
`;

const LikeCountSpan = styled.span`
  margin: auto auto;
  font-size: 0.9rem;

  padding-left: 0.3rem;

  /* border: 1px solid blue; */
`;

const CommentChatWrapper = styled.div`
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

const CommentWrapper = styled.div`
  font-size: 0.8rem;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-top: 1rem;
  border-top: 1px solid red;
`;

const UserNameInComment = styled.span`
  font-weight: 600;
  /* color: red; */
`;

const InputWrapper = styled.div`
  position: relative;
  /* border: 1px solid red; */
  height: 2.8rem;
`;

const StyledInput = styled(Input)`
  border-radius: 2rem;
  height: 2rem;
  font-size: 0.85rem;
  width: 98%;
  margin: auto auto;
`;

const ReplyButton = styled.span`
  position: absolute;
  top: 0.9rem;
  right: 1.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.gray_300};
  cursor: pointer;
`;

const ContentDetail = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.gray_500};
`;

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

const HeartInImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  animation: ${heartAnimation} 0.9s ease-out forwards;
`;

const PostDetail = () => {
  const { register, handleSubmit, setValue } = useForm({ mode: "onSubmit" });
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>(
    "국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및 단체행동권을 가진다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될"
  );
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isILiked, setIsILiked] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<string[]>([]);

  const [isContentDetail, setIsContentDetail] = useState<boolean>(false);

  const [isShowHeart, setIsShowHeart] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);

  const theme = useTheme();
  // const navigate = useNavigate();
  const contentLength = content.length;

  // fetch data --------------------------------------------
  const mutation = useMutation({
    mutationFn: async (params: string) => await _GET(params),
    onSuccess(data) {
      // console.log("유저의 아이디:", data?.data.author._id);
      // console.log("fullName:", data?.data.author.fullName);
      // console.log("포스트 내용:", JSON.parse(data?.data.title).content);
      // console.log("좋아요 누른 사람들:", data?.data.likes);
      console.log("comments:", data?.data.comments);
      console.log(data);
      console.log(data?.data.image);
      setUserId(data?.data.author._id);
      setUserName(data?.data.author.fullName);
      setImageUrl(data?.data.image);
      // setContent(JSON.parse(data?.data.title).content);
      setLikes(data?.data.likes);
      setLikeCount(likes.length);
      setIsILiked(
        data?.data.author._id ===
          likes.some(({ _id }) => _id === data?.data.author._id)
      );
      setComments(data?.data.comments);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });

  useEffect(() => {
    mutation.mutate("/posts/65961633fc83a20c6e9c6a10");
  }, []);
  // ---------------------------------------------------------

  const handleContentDetail = () => {
    setIsContentDetail(true);
    console.log(isContentDetail);
  };

  const handleLike = () => {
    if (!isShowHeart) {
      setIsILiked(isILiked => !isILiked);
      setIsShowHeart(true);
      // TODO:  좋아요 api 통신해야함 낙관적 업데이트?
      setLikeCount(likeCount => {
        if (!isILiked) return likeCount + 1;
        return likeCount - 1;
      });

      setTimeout(() => {
        setIsShowHeart(false);
      }, 900);
    }
  };

  const handleChat = () => {
    // if (userId) {
    //   해당 포스트의 작성자(id)가 현재 로그인한 나라면 자기 자신과는 채팅할 수 없다는 로직. 혹은 렌더링 시 채팅버튼 아예 안보여줘야함
    // }
    // navigate(`/chat/${userId}`);
  };

  const handleShowComments = () => {
    setIsShowComments(true);
  };

  const onValid = comment => {
    setNewComments([...newComments, comment.comment]);
    setValue("comment", "");
    console.log(comment);
  };

  const onInvalid = error => {
    console.log(error);
  };

  // console.log(likes);
  return (
    <PostDetailWrapper>
      <UserInfoWrapper>
        <AvatarWrapper>
          <Avatar size="S" />
        </AvatarWrapper>
        <UserNameWrapper>
          <UserNameSpan>{userName}</UserNameSpan>
        </UserNameWrapper>
        <FollowButton variant="flat" rippleColor={theme.gray_300}>
          팔로우
        </FollowButton>
      </UserInfoWrapper>
      <ImageWrapper>
        {isShowHeart && isILiked && (
          <HeartInImage>
            <Icon
              name={HEART_ICON}
              fill={true}
              color={theme.symbol_color}
            ></Icon>
          </HeartInImage>
        )}

        <StyledImg src={imageUrl} />
      </ImageWrapper>
      <CaptionWrapper>
        <IconsWrapper>
          {/* 추후 refactor 포인트 : className으로 바꾸기  */}
          <HeartWrapper>
            <Icon
              name={HEART_ICON}
              onClick={handleLike}
              fill={isILiked ? true : false}
              color={isILiked ? theme.symbol_color : ""}
              size="2.3rem"
            ></Icon>
            <LikeCountSpan>
              {isILiked
                ? `회원님 외 ${likeCount}명이 좋아합니다.`
                : `${likeCount}명이 좋아합니다.`}
            </LikeCountSpan>
          </HeartWrapper>
          <CommentChatWrapper>
            <Icon name={CHAT_ICON} size="2rem" onClick={handleChat} />
            <Icon name={SEND_ICON} size="2.3rem" />
          </CommentChatWrapper>
        </IconsWrapper>
        <ContentWrapper>
          {isContentDetail ? (
            <StyledSpan>
              <UserNameSpan>{userName}&nbsp;&nbsp;</UserNameSpan>
              {content}
            </StyledSpan>
          ) : (
            <StyledSpan>
              <UserNameSpan>{userName}&nbsp;&nbsp;</UserNameSpan>
              {content.slice(0, 40)}&nbsp;&nbsp;
              <ContentDetail onClick={handleContentDetail}>
                ...더 보기
              </ContentDetail>
            </StyledSpan>
          )}
        </ContentWrapper>

        <CommentWrapper>
          {isShowComments ? (
            <ul>
              {comments.map(comment => (
                <li key={comment._id}>
                  <UserNameInComment>
                    {comment.author.fullName}{" "}
                  </UserNameInComment>
                  {comment.comment}
                </li>
              ))}
              {newComments.map(comment => (
                <li key={Date.now()}>
                  <UserNameInComment>
                    {userName} {comment}
                  </UserNameInComment>
                </li>
              ))}
            </ul>
          ) : (
            <span onClick={handleShowComments}>
              댓글 {comments.length + newComments.length}개 보기
            </span>
          )}
        </CommentWrapper>

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <InputWrapper>
            <StyledInput
              kind="text"
              required={true}
              placeholder="댓글을 입력하세요"
              register={register("comment", {
                required: "댓글을 입력해주세요",
              })}
            />
            <ReplyButton onClick={handleSubmit(onValid, onInvalid)}>
              게시
            </ReplyButton>
          </InputWrapper>
        </form>
      </CaptionWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetail;
