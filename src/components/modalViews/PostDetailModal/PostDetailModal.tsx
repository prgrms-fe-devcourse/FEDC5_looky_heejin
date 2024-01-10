import { _GET, _POST } from "@/api";
import { Avatar, ToolTip } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import { CHAT_ICON, HEART_ICON, SEND_ICON } from "@/constants/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import {
  AvatarWrapper,
  CaptionWrapper,
  CommentChatWrapper,
  ContentDetail,
  ContentWrapper,
  FollowButton,
  HeartInImage,
  HeartWrapper,
  IconsWrapper,
  ImageWrapper,
  InputWrapper,
  LikeCountSpan,
  PostDetailWrapper,
  ReplyButton,
  StyledImg,
  StyledInput,
  StyledSpan,
  Tag,
  UserInfoWrapper,
  UserNameSpan,
  UserNameWrapper,
} from "./PostDetailModal.styles";
import {
  ICreateComment,
  IDeleteComment,
  ICreateLike,
  IDeleteLike,
  INotification,
  IFollow,
  IUnfollow,
} from "@/types";
import { _CREATE_COMMENT, _DELETE_COMMENT } from "@/api/queries/comment";
import { _NOTIFY } from "@/api/queries/notify";
import { useMe } from "@/hooks/useMe";
import { useUI } from "@/components/common/uiContext";
import { _CREATE_LIKE, _DELETE_LIKE } from "@/api/queries/like";
import type { ITag } from "@/types/post";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/follow";
import { ME } from "@/constants/queryKey";
import Comments from "./Comments";

interface ModalProps {
  postId: string;
}

interface IPostDetailModalProps {
  props: ModalProps;
}

const PostDetail = ({ props }: IPostDetailModalProps) => {
  const { postId } = props as ModalProps;
  const { closeModal } = useUI();
  const { register, handleSubmit, setValue } = useForm<{ comment: string }>({
    mode: "onSubmit",
  });

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [myLikeId, setMyLikeId] = useState("");
  const [isILiked, setIsILiked] = useState<boolean>(false);
  const [isIFollowed, setIsIFollowed] = useState(false);
  const [followId, setFollowId] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [isContentDetail, setIsContentDetail] = useState<boolean>(false);
  const [isShowHeart, setIsShowHeart] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);

  const theme = useTheme();
  // const postId = "659c00da1d725b33c1ed7a1e";
  const { id: myId } = useMe();

  const navigate = useNavigate();

  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  console.log("myData : ", myData);
  // fetch data --------------------------------------------
  const initMutation = useMutation({
    mutationFn: async (endPoint: string) => await _GET(endPoint),
    onSuccess(data) {
      myData?.data.following.map((followingData: any) => {
        if (followingData.user === data?.data.author._id) {
          setIsIFollowed(true);
          setFollowId(followingData._id);
        }
      });
      setUserId(data?.data.author._id);
      setUserName(data?.data.author.fullName);
      setImageUrl(data?.data.image);
      const parsedJson = JSON.parse(data?.data.title);
      setTitle(parsedJson.title);
      setContent(parsedJson.content);
      setTags(parsedJson.tags);
      setLikes(data?.data.likes);
      setLikeCount(data?.data.likes.length);
      setIsILiked(data?.data.likes.some(({ user }: any) => user === myId));
      data?.data.likes.map((value: any) => {
        value.user === myId
          ? setMyLikeId(value._id)
          : console.log(`나 여기 없음!`);
      });
      setComments(data?.data.comments);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });

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
      const temp = [...comments, data];
      const newNotification: INotification = {
        notificationType: "COMMENT",
        notificationTypeId: data._id,
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

  const deleteCommentMutation = useMutation({
    mutationFn: async (formData: IDeleteComment) =>
      await _DELETE_COMMENT(formData),
    onSuccess(data) {
      console.log("API : 댓글 삭제 성공", data);
      const newComments = comments.filter(({ _id }: any) => _id !== data._id);
      setComments(newComments);
    },
    onError(error) {
      console.error("댓글 삭제 API 에러", error);
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
      setIsIFollowed(true);
      setFollowId(data._id);
    },
    onError(error) {
      console.error("error: 팔로우 실패 ", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnfollow) => await _UNFOLLOW(formData),
    onSuccess(data) {
      console.log("API: 언팔로우 성공", data);
      setIsIFollowed(false);
      setFollowId("");
    },
    onError(error) {
      console.error("error: 언팔로우 실패 ", error);
    },
  });

  useEffect(() => {
    initMutation.mutate(`/posts/${postId}`);
  }, []);

  const handleFollow = () => {
    if (!isIFollowed) {
      myId !== null && followMutation.mutate({ userId });
    } else {
      console.log("팔로잉 중", followId);
      unfollowMutation.mutate({ id: followId });
    }
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
      // TODO: 디바운스

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

  return (
    <PostDetailWrapper>
      <UserInfoWrapper>
        <AvatarWrapper>
          <Avatar size="S" />
        </AvatarWrapper>
        <UserNameWrapper>
          <UserNameSpan>{userName}</UserNameSpan>
        </UserNameWrapper>
        <FollowButton
          variant={isIFollowed ? "flat" : "symbol"}
          onClick={handleFollow}
        >
          {isIFollowed ? "팔로잉" : "팔로우"}
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

        <Comments
          myId={myId}
          comments={comments}
          setComments={setComments}
          isShowComments={isShowComments}
          setIsShowComments={setIsShowComments}
        ></Comments>

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
