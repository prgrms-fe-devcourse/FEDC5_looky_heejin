import PostDetailModalView from "./PostDetailModal.view";
import { useMe } from "@/hooks/useMe";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useCommentMutation,
  useFollowMutation,
  useInitData,
  useLikeMutation,
  usePostMutation,
} from "./PostDetailModal.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUI } from "@/components/common/uiContext";
import { notify } from "@/utils/toast";
import { ICreateComment } from "@/types";
import { ME } from "@/constants/queryKey";
import { Spinner } from "@/components/common";

interface ModalProps {
  postId: string;
  likeDataBinding: (data: any) => void;
}

interface IPostDetailModalProps {
  props: ModalProps;
}

const PostDetailModalController = ({ props }: IPostDetailModalProps) => {
  const { postId, likeDataBinding } = props as ModalProps;
  const { closeModal } = useUI();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: myId } = useMe();

  const { register, handleSubmit, setValue } = useForm<{ comment: string }>({
    mode: "onSubmit",
  });

  const [profileImage, setProfileImage] = useState("");

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const [likeInfo, setLikeInfo] = useState({
    count: 0,
    myLikeId: "",
    isILiked: false,
  });
  const [followInfo, setFollowInfo] = useState({
    followId: "",
    isIFollowed: false,
  });

  const [comments, setComments] = useState<string[]>([]);
  const [isContentDetail, setIsContentDetail] = useState<boolean>(false);
  const [isShowComments, setIsShowComments] = useState<boolean>(false);
  const [heartAnimation, setHeartAnimation] = useState({
    isShow: false,
    key: 0,
  });

  const { data: myData } = useInitData(ME, "/auth-user");
  const { data: postData, isLoading } = useInitData(
    `postId-${postId}`,
    `/posts/${postId}`
  );
  const userId = postData?.data.author._id;
  const userName = postData?.data.author.fullName;
  const imageUrl = postData?.data.image;

  useEffect(() => {
    if (postData) {
      if (myId) {
        const followingData = myData?.data.following.find(
          (followingData: any) =>
            followingData.user === postData?.data.author._id
        );
        if (followingData) {
          setFollowInfo({ isIFollowed: true, followId: followingData._id });
        }
      }

      if (postData?.data.author.hasOwnProperty("image")) {
        setProfileImage(postData?.data.author.image);
      }

      const parsedJson = JSON.parse(postData?.data.title);

      setPostInfo({
        title: parsedJson.title,
        content: parsedJson.content,
        tags: parsedJson.tags,
      });

      setLikeInfo({
        ...likeInfo,
        count: postData?.data.likes.length,
        isILiked: postData?.data.likes.some(({ user }: any) => user === myId),
      });

      postData?.data.likes.map((likeData: any) => {
        if (likeData.user === myId) {
          setLikeInfo(prevState => ({ ...prevState, myLikeId: likeData._id }));
        }
      });
      setComments(postData?.data.comments);
    }
  }, [postData]);

  const { createLikeMutation, deleteLikeMutation } = useLikeMutation({
    myId,
    userId,
    notify,
    setLikeInfo,
    likeDataBinding,
  });
  const { followMutation, unfollowMutation } = useFollowMutation({
    myId,
    userId,
    notify,
    setFollowInfo,
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
    if (!followInfo.isIFollowed) {
      myId !== null && followMutation.mutate({ userId });
    } else {
      unfollowMutation.mutate({ id: followInfo.followId });
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
    if (likeInfo.isILiked === true) {
      deleteLikeMutation.mutate({ id: likeInfo.myLikeId });
    }
    if (likeInfo.isILiked === false) {
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
      isIFollowed={followInfo.isIFollowed}
      handleFollow={handleFollow}
      handleClose={handleClose}
      heartAnimation={heartAnimation}
      tagClickHandler={tagClickHandler}
      imageUrl={imageUrl}
      isContentDetail={isContentDetail}
      content={postInfo.content}
      title={postInfo.title}
      handleContentDetail={handleContentDetail}
      handleLike={handleLike}
      isILiked={likeInfo.isILiked}
      likeCount={likeInfo.count}
      toggleShowComments={toggleShowComments}
      handleChat={handleChat}
      register={register}
      handleSubmit={handleSubmit}
      theme={theme}
      tags={postInfo.tags}
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
