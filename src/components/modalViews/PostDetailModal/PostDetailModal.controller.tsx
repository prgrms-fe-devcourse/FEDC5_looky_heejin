import useEventQuery from "@/hooks/useEventQuery";
import PostDetailModalView from "./PostDetailModal.view";
import { useMe } from "@/hooks/useMe";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useCommentMutation,
  useFollowMutation,
  useLikeMutation,
  usePostMutation,
} from "./PostDetailModal.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUI } from "@/components/common/uiContext";
import { notify } from "@/utils/toast";
import { ICreateComment } from "@/types";
import { ME } from "@/constants/queryKey";
import { ITag } from "@/types/post";
import { Spinner } from "@/components/common/Spinner";

interface ModalProps {
  postId: string;
  likeDataBinding: (data: any) => void;
}

interface IPostDetailModalProps {
  props: ModalProps;
}

const PostDetailModalController = ({ props }: IPostDetailModalProps) => {
  const { postId, likeDataBinding } = props as ModalProps;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { closeModal } = useUI();
  const { register, handleSubmit, setValue } = useForm<{ comment: string }>({
    mode: "onSubmit",
  });

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

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

  const { refetch: myDataRefetch } = useEventQuery({
    key: ME,
    endPoint: "/auth-user",
  });

  // init fetch--------------------------------------------
  const { isLoading, refetch } = useEventQuery({
    key: `postId-${postId}`,
    endPoint: `/posts/${postId}`,
  });
  const getPostData = async () => {
    const data = (await refetch()).data;
    const myData = (await myDataRefetch()).data;
    if (myId) {
      const followingData = myData?.data.following.find(
        (followingData: any) => followingData.user === data?.data.author._id
      );
      if (followingData) {
        setIsIFollowed(true);
        setFollowId(followingData._id);
      }
    }
    setUserId(data?.data.author._id);
    setUserName(data?.data.author.fullName);
    if (data?.data.author.hasOwnProperty("image")) {
      setProfileImage(data?.data.author.image);
    }
    setImageUrl(data?.data.image);
    const parsedJson = JSON.parse(data?.data.title);
    setTitle(parsedJson.title);
    setContent(parsedJson.content);
    setTags(parsedJson.tags);
    // setLikes(data?.data.likes);
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

  useEffect(() => {
    getPostData();
  }, []);

  const { createLikeMutation, deleteLikeMutation } = useLikeMutation({
    myId,
    userId,
    notify,
    setIsILiked,
    likeCount,
    setLikeCount,
    setMyLikeId,
    likeDataBinding,
  });
  const { followMutation, unfollowMutation } = useFollowMutation({
    myId,
    userId,
    notify,
    setIsIFollowed,
    setFollowId,
  });
  const { createCommentMutation } = useCommentMutation({
    myId,
    userId,
    notify,
    comments,
    setComments,
  });
  const { deletePostMutation } = usePostMutation({
    notify,
  });

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
    if (!myId) {
      if (confirm(`로그인이 필요합니다. 로그인 페이지로 이동할까요?`)) {
        closeModal();
        navigate("/login");
      }
      return;
    }
    if (!isIFollowed) {
      myId !== null && followMutation.mutate({ userId });
    } else {
      unfollowMutation.mutate({ id: followId });
    }
  };
  const handleContentDetail = () => {
    setIsContentDetail(true);
  };

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

  const onValid: SubmitHandler<Comment> = ({ comment }: any) => {
    if (comment.trim().length === 0) return;
    const newComment: ICreateComment = { comment, postId };
    createCommentMutation.mutate(newComment);
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
      }
    }, 200);
    setValue("comment", "");
    setIsShowComments(true);
  };

  const onInvalid = (error: any) => {
    console.error(error);
  };

  const tagClickHandler = (link?: string) => {
    if (link?.includes("https://")) {
      window.open(link, "_blank", "noopener, noreferrer");
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <PostDetailModalView
      modalRef={modalRef}
      handleProfile={handleProfile}
      profileImage={profileImage}
      userName={userName}
      userId={userId}
      myId={myId}
      handleDelete={handleDelete}
      isIFollowed={isIFollowed}
      handleFollow={handleFollow}
      handleClose={handleClose}
      heartAnimation={heartAnimation}
      tagClickHandler={tagClickHandler}
      imageUrl={imageUrl}
      isContentDetail={isContentDetail}
      content={content}
      title={title}
      handleContentDetail={handleContentDetail}
      handleLike={handleLike}
      isILiked={isILiked}
      likeCount={likeCount}
      toggleShowComments={toggleShowComments}
      handleChat={handleChat}
      register={register}
      handleSubmit={handleSubmit}
      theme={theme}
      tags={tags}
      onValid={onValid}
      onInvalid={onInvalid}
      comments={comments}
      setComments={setComments}
      isShowComments={isShowComments}
      setIsShowComments={setIsShowComments}
    />
  );
};

export default PostDetailModalController;
