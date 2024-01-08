import { _GET, _POST } from "@/api";
import { Avatar, ToolTip } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import { CHAT_ICON, HEART_ICON, SEND_ICON } from "@/constants/icons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import {
  AvatarWrapper,
  CaptionWrapper,
  CommentChatWrapper,
  CommentContent,
  CommentWrapper,
  ContentDetail,
  ContentWrapper,
  FollowButton,
  HeartInImage,
  HeartWrapper,
  IconsWrapper,
  ImageWrapper,
  InputWrapper,
  LikeCountSpan,
  MoreComments,
  NoComments,
  PostDetailWrapper,
  ReplyButton,
  StyledImg,
  StyledInput,
  StyledLi,
  StyledSpan,
  Tag,
  UserInfoWrapper,
  UserNameInComment,
  UserNameSpan,
  UserNameWrapper,
} from "./PostDetailModal.styles";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  ICreateComment,
  IDeleteComment,
  ICreateLike,
  IDeleteLike,
  INotification,
  IFollow,
  IUnfollow,
} from "@/types";
import { _CREATE_COMMENT } from "@/api/queries/comment";
import { _NOTIFY } from "@/api/queries/notify";
import { useMe } from "@/hooks/useMe";
import { useUI } from "@/components/common/uiContext";
import { _CREATE_LIKE, _DELETE_LIKE } from "@/api/queries/like";
import type { ITag } from "@/types/post";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/follow";

const PostDetail = () => {
  const { closeModal } = useUI();
  const { register, handleSubmit, setValue } = useForm<{ comment: string }>({
    mode: "onSubmit",
  });
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [myLikeId, setMyLikeId] = useState("");
  const [isILiked, setIsILiked] = useState<boolean>(false);
  const [isIFollowed, setIsIFollowed] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComments, setNewComments] = useState<string[]>([]);
  const [isContentDetail, setIsContentDetail] = useState<boolean>(false);

  const [isShowHeart, setIsShowHeart] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);

  const theme = useTheme();
  const postId = "659c00da1d725b33c1ed7a1e";
  const { id: myId } = useMe();
  console.log("내 아이디", myId);
  // console.log(comments);
  console.log(likes);

  const navigate = useNavigate();
  // fetch data --------------------------------------------
  const initMutation = useMutation({
    mutationFn: async (endPoint: string) => await _GET(endPoint),
    onSuccess(data) {
      console.log("유저의 아이디:", data?.data.author._id); // 포스트를 쓴 사람의 아이디
      // console.log("fullName:", data?.data.author.fullName);
      // console.log("포스트 내용:", JSON.parse(data?.data.title).content);
      // console.log("좋아요 누른 사람들:", data?.data.likes);
      // console.log("comments:", data?.data.comments);
      console.log(data);
      console.log("팔로워:", data?.data.author.followers);
      console.log("팔로잉", data?.data.author.following);

      setUserId(data?.data.author._id);
      setUserName(data?.data.author.fullName);
      setImageUrl(data?.data.image);
      const parsedJson = JSON.parse(data?.data.title);
      setTitle(parsedJson.title);
      setContent(parsedJson.content);
      setTags(parsedJson.tags);
      console.log(parsedJson);
      // setContent(data?.data.title);
      setLikes(data?.data.likes);
      setLikeCount(data?.data.likes.length);
      setIsILiked(data?.data.likes.some(({ user }: any) => user === myId));
      data?.data.likes.map((value: any) => {
        value.user === myId
          ? setMyLikeId(value._id)
          : console.log(`나 여기 없음!`);
      });
      // setIsIFollowed(data?.data.followers.some(followId => ))
      // setMyLikeId(data?.data.likes.map(value => {console.log(value)})
      setComments(data?.data.comments);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });
  // console.log(comments);

  // const [token, _] = useLocalStorage("token");

  const notificationMutation = useMutation({
    mutationFn: async (formData: INotification) => await _NOTIFY(formData),
    onSuccess(data) {
      console.log("알림 api 성공", data);
    },
    onError(error) {
      console.error("알림 api 통신 에러", error);
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async (formData: ICreateComment) =>
      await _CREATE_COMMENT(formData),
    onSuccess(data) {
      console.log("댓글 데이터", data);
      const temp = [...comments, data];
      console.log(temp);
      const newNotification: INotification = {
        notificationType: "COMMENT",
        notificationTypeId: data._id,
        // 나야 상대방이야..?
        userId,
        postId: data.post,
      };

      notificationMutation.mutate(newNotification);
      setComments(temp);
    },
    onError(error) {
      console.log("댓글 APi 통신 에러", error);
    },
  });

  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onSuccess(data) {
      console.log("API: 좋아요 생성 성공 ", data);
      if (myId) {
        const newNotification: INotification = {
          notificationType: "LIKE",
          notificationTypeId: data._id,
          // 나야 상대방이야 ..?
          userId: myId,
          postId: data.post,
        };
        console.log(newNotification);
      }
      setMyLikeId(data._id);
      setLikeCount(likeCount + 1);
    },
    onError(error) {
      console.error("error: 좋아요 생성 실패 ", error);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: async (formData: IDeleteLike) => await _DELETE_LIKE(formData),
    onSuccess(data) {
      console.log("API: 좋아요 삭제 성공 ", data);
      if (likeCount > 0) setLikeCount(likeCount - 1);
    },
    onError(error) {
      console.error("error: 좋아요 삭제 실패 ", error);
    },
  });

  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => await _FOLLOW(formData),
    onSuccess(data) {
      console.log("API: 팔로우 성공", data);
    },
    onError(error) {
      console.error("error: 팔로우 실패 ", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnfollow) => await _UNFOLLOW(formData),
    onSuccess(data) {
      console.log("API: 언팔로우 성공", data);
    },
    onError(error) {
      console.error("error: 언팔로우 실패 ", error);
    },
  });

  useEffect(() => {
    initMutation.mutate(`/posts/${postId}`);
  }, []);
  // ---------------------------------------------------------

  // --------------------------------------
  const handleFollow = () => {
    myId !== null && followMutation.mutate({ userId });
  };
  const handleContentDetail = () => {
    setIsContentDetail(true);
    console.log(isContentDetail);
  };

  const handleLike = () => {
    setIsILiked(isILiked => !isILiked);
    if (!isShowHeart) {
      if (!isILiked) {
        createLikeMutation.mutate({ postId: postId });
      } else {
        if (myLikeId) deleteLikeMutation.mutate({ id: myLikeId });
      }

      setIsShowHeart(true);
      // TODO:  좋아요 api 통신해야함 낙관적 업데이트?
      // setLikeCount(likeCount => {
      //   if (!isILiked) return likeCount + 1;
      //   return likeCount - 1;
      // });

      setTimeout(() => {
        setIsShowHeart(false);
      }, 900);
    }
  };

  const handleChat = () => {
    // if (userId) {
    //   해당 포스트의 작성자(id)가 현재 로그인한 나라면 자기 자신과는 채팅할 수 없다는 로직. 혹은 렌더링 시 채팅버튼 아예 안보여줘야함
    // }
    closeModal();
    navigate(`/chat/${userId}`);

    // history.replaceState(null, null, `/chat/${userId}`);
  };

  const handleShowComments = () => {
    setIsShowComments(true);
  };

  const toggleShowComments = () => {
    setIsShowComments(!isShowComments);
  };

  interface Comment {
    comment: string;
  }

  const onValid: SubmitHandler<Comment> = ({ comment }) => {
    console.log(comment);
    // setNewComments([...newComments, comment.comment]);
    const newComment: ICreateComment = { comment, postId };
    createCommentMutation.mutate(newComment);
    setValue("comment", "");
    setIsShowComments(true);
    console.log(comment);
  };

  const onInvalid = (error: any) => {
    console.log(error);
  };

  const tagClickHandler = (id: string, x?: number, y?: number) => {
    tags.map(val => {
      if (val.id === id) {
        console.log(`나 존재함!`, val);
      }
    });
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
        {tags.map(({ x, y, id, brand, product, link }) => (
          <ToolTip
            $direction="top"
            $options="hover"
            $tooltip={brand + " " + product + " " + link}
            key={id}
            $x={x}
            $y={y}
          >
            <Tag x={x} y={y} onClick={() => tagClickHandler(id, x, y)} />
          </ToolTip>
        ))}
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
                ? likeCount !== 1
                  ? `회원님 외 ${likeCount - 1}명이 좋아합니다.`
                  : "회원님이 이 게시글을 좋아합니다."
                : likeCount !== 0
                  ? `${likeCount}명이 좋아합니다.`
                  : `좋아요를 눌러주세요.`}
            </LikeCountSpan>
          </HeartWrapper>
          <CommentChatWrapper>
            <Icon name={CHAT_ICON} size="2rem" onClick={toggleShowComments} />
            <Icon name={SEND_ICON} size="2.3rem" onClick={handleChat} />
          </CommentChatWrapper>
        </IconsWrapper>
        <ContentWrapper>
          {isContentDetail ? (
            <StyledSpan>
              <UserNameSpan>{title}&nbsp;&nbsp;</UserNameSpan>
              {content}
            </StyledSpan>
          ) : (
            <StyledSpan>
              <UserNameSpan>{title}&nbsp;&nbsp;</UserNameSpan>
              <br />
              {content.length > 40 ? (
                <ContentDetail onClick={handleContentDetail}>
                  ...더 보기
                </ContentDetail>
              ) : (
                <span>{content.slice(0, 40)}</span>
              )}
            </StyledSpan>
          )}
        </ContentWrapper>

        <CommentWrapper>
          {isShowComments ? (
            <ul>
              {comments.map((comment: any) => (
                <StyledLi key={comment._id}>
                  <UserNameInComment>
                    {comment.author.fullName}{" "}
                  </UserNameInComment>
                  <CommentContent>{comment.comment}</CommentContent>
                </StyledLi>
              ))}

              {/* 새 댓글의 경우 api호출하지 않고 배열 리스트에 먼저 담아두려고 했음 */}
              {/* {newComments.length > 0 && (
                <li key={Date.now()}>
                  <UserNameInComment>
                    {userName} {newComments[newComments.length - 1]}
                  </UserNameInComment>
                </li>
              )} */}
            </ul>
          ) : comments.length === 0 ? (
            <NoComments>댓글이 없습니다.</NoComments>
          ) : (
            <MoreComments onClick={handleShowComments}>
              댓글 {comments.length + newComments.length}개 보기
            </MoreComments>
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
