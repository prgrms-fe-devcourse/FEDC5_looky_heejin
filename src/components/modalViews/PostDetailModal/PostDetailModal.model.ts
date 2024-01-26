import { _DELETE } from "@/api";
import { _CREATE_COMMENT, _DELETE_COMMENT } from "@/api/queries/comment";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/follow";
import { _CREATE_LIKE, _DELETE_LIKE } from "@/api/queries/like";
import { _NOTIFY } from "@/api/queries/notify";
import { IToastProps } from "@/utils/toast";
import {
  ICreateComment,
  ICreateLike,
  IDeleteComment,
  IDeleteLike,
  IDeletePost,
  IFollow,
  INotification,
  IUnfollow,
} from "@/types";
import { useMutation } from "@tanstack/react-query";

interface ILikeInfo {
  count: number;
  myLikeId: string;
  isILiked: boolean;
}

interface IFollowInfo {
  isIFollowed: boolean;
  followId: string;
}

interface ILikeMuationProps {
  myId: string | null;
  userId: string;
  notify: ({ type, text }: IToastProps) => void;
  setLikeInfo: React.Dispatch<React.SetStateAction<ILikeInfo>>;
  likeDataBinding: (data: any) => void;
}

interface ICommentMutationProps {
  myId: string | null;
  comments: string[];
  userId: string;
  notify: ({ type, text }: IToastProps) => void;
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}

interface IFollowMutationProps {
  // setIsIFollowed: React.Dispatch<React.SetStateAction<boolean>>;
  myId: string | null;
  userId: string;
  notify: ({ type, text }: IToastProps) => void;
  setFollowInfo: React.Dispatch<React.SetStateAction<IFollowInfo>>;
  // setFollowId: React.Dispatch<React.SetStateAction<string>>;
}
export const useNotifyMutation = () => {
  const notificationMutation = useMutation({
    mutationFn: async (formData: INotification) => await _NOTIFY(formData),
    onError(error) {
      console.error("알림 api 통신 에러", error);
    },
  });

  return notificationMutation;
};

export const useLikeMutation = ({
  myId,
  userId,
  notify,
  setLikeInfo,
  likeDataBinding,
}: ILikeMuationProps) => {
  const notificationMutation = useNotifyMutation();
  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onMutate() {
      setLikeInfo(prevState => ({
        ...prevState,
        isILiked: true,
        count: prevState.count + 1,
      }));
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
        notify({
          type: "success",
          text: "좋아요를 눌렀어요!",
        });
        likeDataBinding(data);
        setLikeInfo(prevState => ({ ...prevState, myLikeId: data._id }));
      }
    },
    onError() {
      notify({
        type: "error",
        text: "좋아요 생성에 실패했어요.",
      });
      setLikeInfo(prevState => ({
        ...prevState,
        isILiked: false,
        count: prevState.count - 1,
      }));
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: async (formData: IDeleteLike) => await _DELETE_LIKE(formData),
    onMutate() {
      setLikeInfo(prevState => ({
        ...prevState,
        isILiked: false,
        count: prevState.count - 1,
      }));
    },
    onSuccess(data) {
      notify({
        type: "default",
        text: "좋아요를 취소했어요.",
      });
      likeDataBinding(data);
    },
    onError() {
      setLikeInfo(prevState => ({
        ...prevState,
        isILiked: true,
        count: prevState.count + 1,
      }));
    },
  });

  return { createLikeMutation, deleteLikeMutation };
};

export const useCommentMutation = ({
  myId,
  comments,
  userId,
  notify,
  setComments,
}: ICommentMutationProps) => {
  const notificationMutation = useNotifyMutation();
  const createCommentMutation = useMutation({
    mutationFn: async (formData: ICreateComment) =>
      await _CREATE_COMMENT(formData),
    onSuccess(data) {
      if (myId) {
        const newComments = [...comments, data];
        const newNotification: INotification = {
          notificationType: "COMMENT",
          notificationTypeId: data._id,
          userId,
          postId: data.post,
        };
        notify({
          type: "success",
          text: "댓글이 등록되었어요!",
        });

        notificationMutation.mutate(newNotification);
        setComments(newComments);
        console.log(newComments);
      }
    },
    onError(error) {
      console.error("댓글 APi 통신 에러", error);
    },
  });
  const deleteCommentMutation = useMutation({
    mutationFn: async (formData: IDeleteComment) =>
      await _DELETE_COMMENT(formData),
    onSuccess(data) {
      notify({
        type: "default",
        text: "댓글을 삭제했어요.",
      });
      console.log("API : 댓글 삭제 성공", data);
      const newComments = comments.filter(({ _id }: any) => _id !== data._id);
      setComments(newComments);
    },
    onError(error) {
      console.error("댓글 삭제 API 에러", error);
    },
  });

  return { createCommentMutation, deleteCommentMutation };
};

export const useFollowMutation = ({
  myId,
  userId,
  notify,
  setFollowInfo,
}: IFollowMutationProps) => {
  const notificationMutation = useNotifyMutation();
  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => await _FOLLOW(formData),
    onMutate() {
      setFollowInfo(prevState => ({ ...prevState, isIFollowed: true }));
    },
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
      notify({
        type: "success",
        text: "팔로우를 성공했어요.",
      });
      setFollowInfo(prevState => ({ ...prevState, followId: data._id }));
    },
    onError(error) {
      setFollowInfo(prevState => ({ ...prevState, isIFollowed: false }));
      notify({
        type: "error",
        text: "팔로우 요청에 실패했어요.",
      });
      console.error("error: 팔로우 실패", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnfollow) => await _UNFOLLOW(formData),
    onMutate() {
      setFollowInfo(prevState => ({ ...prevState, isIFollowed: false }));
    },
    onSuccess() {
      notify({
        type: "default",
        text: "팔로우를 해제했어요.",
      });
      setFollowInfo(prevState => ({ ...prevState, followId: "" }));
    },
    onError(error) {
      setFollowInfo(prevState => ({ ...prevState, isIFollowed: true }));
      notify({
        type: "error",
        text: "팔로우 해제에 실패했어요.",
      });
      console.error("error: 언팔로우 실패 ", error);
    },
  });

  return { followMutation, unfollowMutation };
};

export const usePostMutation = ({ notify }: any) => {
  const deletePostMutation = useMutation({
    mutationFn: async (formData: IDeletePost) =>
      await _DELETE("/posts/delete", formData),
    onSuccess() {
      notify({
        type: "default",
        text: "포스트를 삭제했어요.",
      });
    },
    onError(error) {
      notify({
        type: "error",
        text: "포스트 삭제에 실패했어요.",
      });
      console.error("error: 포스트 삭제 실패", error);
    },
  });
  return { deletePostMutation };
};
