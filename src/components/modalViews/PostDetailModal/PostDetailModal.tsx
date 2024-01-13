import { _DELETE, _GET, _POST } from "@/api";
import { Avatar, ToolTip } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import {
  CHAT_ICON,
  CLOSE_ICON,
  HEART_ICON,
  SEND_ICON,
  TRASH_ICON,
} from "@/constants/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import {
  AvatarWrapper,
  CaptionWrapper,
  CloseIconWrapper,
  CommentChatWrapper,
  ContentDetail,
  ContentWrapper,
  FollowButton,
  HeartIconWrapper,
  HeartInImage,
  HeartWrapper,
  IconWrapper,
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
  TrashIconWrapper,
  UserInfo,
  UserInfoWrapper,
  UserNameSpan,
  UserNameWrapper,
} from "./PostDetailModal.styles";
import {
  ICreateComment,
  ICreateLike,
  IDeleteLike,
  INotification,
  IFollow,
  IUnfollow,
  IDeletePost,
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
import useEventQuery from "@/hooks/useEventQuery";

interface ModalProps {
  postId: string;
}

interface IPostDetailModalProps {
  props: ModalProps;
}

interface Comment {
  comment: string;
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
  const [heartAnimation, setHeartAnimation] = useState({
    isShow: false,
    key: 0,
  });

  const [isShowComments, setIsShowComments] = useState<boolean>(false);

  const theme = useTheme();
  // const postId = "659c00da1d725b33c1ed7a1e";
  const { id: myId } = useMe();

  const navigate = useNavigate();

  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  // init fetch--------------------------------------------
  const { isLoading, refetch } = useEventQuery({
    key: `postId-${postId}`,
    endPoint: `/posts/${postId}`,
  });
  const getPostData = async () => {
    const data = (await refetch()).data;
    if (myId) {
      myData?.data.following.map((followingData: any) => {
        if (followingData.user === data?.data.author._id) {
          setIsIFollowed(true);
          setFollowId(followingData._id);
        }
      });
    }
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
    data?.data.likes.map((likeData: any) => {
      if (likeData.user === myId) {
        setMyLikeId(likeData._id);
      }
    });
    setComments(data?.data.comments);
  };
  // --------------------------------------------------------------------------

  console.log("좋아요 개수 :", likeCount);
  console.log("내가 좋아요 했나? :", isILiked);
  console.log("좋아요 데이터들: ", likes);
  // console.log("나:", myId);
  // console.log("좋아요ID:", myLikeId);
  const notificationMutation = useMutation({
    mutationFn: async (formData: INotification) => await _NOTIFY(formData),
    onSuccess(data) {
      // console.log("알림 api 성공", data);
    },
    onError(error) {
      console.error("알림 api 통신 에러", error);
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async (formData: ICreateComment) =>
      await _CREATE_COMMENT(formData),
    onSuccess(data) {
      if (myId) {
        const temp = [...comments, data];
        const newNotification: INotification = {
          notificationType: "COMMENT",
          notificationTypeId: data._id,
          userId,
          postId: data.post,
        };

        notificationMutation.mutate(newNotification);
        setComments(temp);
      }
    },
    onError(error) {
      console.log("댓글 APi 통신 에러", error);
    },
  });

  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onMutate() {
      setIsILiked(true);
      setLikeCount(likeCount + 1);
    },
    onSuccess(data) {
      if (myId) {
        const newNotification: INotification = {
          notificationType: "LIKE",
          notificationTypeId: data._id,
          userId,
          postId: data.post,
        };
        notificationMutation.mutate(newNotification);
      }
      setMyLikeId(data._id);
    },
    onError() {
      setIsILiked(false);
      setLikeCount(likeCount - 1);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: async (formData: IDeleteLike) => await _DELETE_LIKE(formData),
    onMutate() {
      setIsILiked(false);
      setLikeCount(likeCount - 1);
    },
    onError() {
      setIsILiked(true);
      setLikeCount(likeCount + 1);
    },
  });

  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => await _FOLLOW(formData),
    onSuccess(data) {
      if (myId) {
        const newNotification: INotification = {
          notificationType: "FOLLOW",
          notificationTypeId: data._id,
          userId,
          postId: null,
        };
        notificationMutation.mutate(newNotification);
      }
      setIsIFollowed(true);
      setFollowId(data._id);
    },
    onError(error) {
      console.error("error: 팔로우 실패", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnfollow) => await _UNFOLLOW(formData),
    onSuccess() {
      setIsIFollowed(false);
      setFollowId("");
    },
    onError(error) {
      console.error("error: 언팔로우 실패 ", error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (formData: IDeletePost) =>
      await _DELETE("/posts/delete", formData),
    onSuccess() {
      console.log("API : 포스트 삭제 성공");
    },
    onError(error) {
      console.error("error: 포스트 삭제 실패", error);
    },
  });

  useEffect(() => {
    getPostData();
  }, []);

  const handleProfile = () => {
    closeModal();
    navigate(`/profile/${userId}`);
  };

  const handleDelete = () => {
    if (confirm("포스트를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.")) {
      deletePostMutation.mutate({ id: postId });
      closeModal();
      // TODO : 포스트 삭제 api통신 후 홈 화면이 리렌더링될 수 있도록 해야함
    }
  };

  const handleClose = () => {
    closeModal();
  };
  const handleFollow = () => {
    if (!isIFollowed) {
      myId !== null && followMutation.mutate({ userId });
    } else {
      unfollowMutation.mutate({ id: followId });
    }
  };
  const handleContentDetail = () => {
    setIsContentDetail(true);
    console.log(isContentDetail);
  };
  console.log("내 아이디 있나?", myId);

  const handleLike = () => {
    if (!myId) {
      if (confirm(`로그인이 필요합니다. 로그인 페이지로 이동할까요?`)) {
        closeModal();
        navigate("/login");
      }
      return;
    }
    if (isILiked === true) {
      deleteLikeMutation.mutate({ id: myLikeId });
    }
    if (isILiked === false) {
      setHeartAnimation(previousState => ({
        isShow: true,
        key: previousState.key + 1,
      }));
      createLikeMutation.mutate({ postId: postId });
    }
  };

  const handleChat = () => {
    if (!myId) {
      if (confirm(`로그인이 필요합니다. 로그인 페이지로 이동할까요?`)) {
        closeModal();
        navigate("/login");
      }
    }
    closeModal();
    navigate(`/chat/${userId}`);
  };

  const toggleShowComments = () => {
    setIsShowComments(!isShowComments);
  };

  const onValid: SubmitHandler<Comment> = ({ comment }) => {
    const newComment: ICreateComment = { comment, postId };
    createCommentMutation.mutate(newComment);
    setValue("comment", "");
    setIsShowComments(true);
  };

  const onInvalid = (error: any) => {
    console.log(error);
  };

  const tagClickHandler = (id: string, x?: number, y?: number) => {
    tags.map(val => {
      if (val.id === id) {
        console.log(`나 존재함!`, val, x, y);
      }
    });
  };

  if (isLoading) return <div>루키 svg</div>;
  return (
    <PostDetailWrapper>
      <UserInfoWrapper>
        <UserInfo>
          <AvatarWrapper onClick={handleProfile}>
            <Avatar size="S" />
          </AvatarWrapper>
          <UserNameWrapper onClick={handleProfile}>
            <UserNameSpan>{userName}</UserNameSpan>
          </UserNameWrapper>
        </UserInfo>
        {userId === myId ? (
          <TrashIconWrapper>
            <Icon name={TRASH_ICON} size="1.8rem" onClick={handleDelete} />
          </TrashIconWrapper>
        ) : (
          <FollowButton
            variant={isIFollowed ? "flat" : "symbol"}
            onClick={handleFollow}
          >
            {isIFollowed ? "팔로잉" : "팔로우"}
          </FollowButton>
        )}

        <CloseIconWrapper>
          <Icon
            name={CLOSE_ICON}
            size="1.8rem"
            weight={250}
            onClick={handleClose}
          />
        </CloseIconWrapper>
      </UserInfoWrapper>
      <ImageWrapper>
        {heartAnimation.isShow && (
          <HeartInImage key={heartAnimation.key}>
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
        <StyledImg src={imageUrl ? imageUrl : "/image_alt.png"} />
      </ImageWrapper>
      <CaptionWrapper>
        <IconsWrapper>
          {/* 추후 refactor 포인트 : className으로 바꾸기  */}
          <HeartWrapper>
            <HeartIconWrapper>
              <Icon
                name={HEART_ICON}
                onClick={handleLike}
                fill={isILiked ? true : false}
                color={isILiked ? theme.symbol_color : ""}
                size="2.3rem"
              ></Icon>
            </HeartIconWrapper>

            <LikeCountSpan>
              {isILiked
                ? likeCount !== 1
                  ? `회원님 외 ${likeCount - 1}명이 좋아합니다`
                  : "회원님이 이 게시글을 좋아합니다"
                : likeCount !== 0
                  ? `${likeCount}명이 좋아합니다`
                  : `좋아요를 눌러보세요`}
              {/* {`${likeCount}명이 좋아합니다`} */}
            </LikeCountSpan>
          </HeartWrapper>
          <CommentChatWrapper>
            <IconWrapper>
              <Icon name={CHAT_ICON} size="2rem" onClick={toggleShowComments} />
            </IconWrapper>
            {userId !== myId ? (
              <IconWrapper>
                <Icon name={SEND_ICON} size="2.3rem" onClick={handleChat} />
              </IconWrapper>
            ) : null}
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
