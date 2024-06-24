import { _DELETE, _GET } from "@/api";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { POST } from "@/constants/queryKey";

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
  postId: string;
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
  myId: string | null;
  userId: string;
  notify: ({ type, text }: IToastProps) => void;
  setFollowInfo: React.Dispatch<React.SetStateAction<IFollowInfo>>;
}

export const useInitData = (key: string, endPoint: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => await _GET(endPoint),
    gcTime: 0,
  });

  return { data, isLoading };
};

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
  postId,
  notify,
}: ILikeMuationProps) => {
  const queryClient = useQueryClient();
  const notificationMutation = useNotifyMutation();
  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onMutate: async ({ postId }) => {
      queryClient.cancelQueries({ queryKey: [POST, postId] });
      const previousPostData: any = queryClient.getQueryData([POST, postId]);

      const previousLikes = previousPostData?.data?.likes.filter(
        (like: any) => {
          if (like.user !== myId) {
            return like;
          }
        }
      );

      const newPostData = {
        ...previousPostData?.data,
        likes: [
          ...previousLikes,
          {
            createdAt: "",
            updatedAt: "",
            post: postId,
            user: myId,
            __v: 0,
            _id: "",
          },
        ],
      };
      queryClient.setQueryData([POST, postId], { data: newPostData });

      return { previousPostData };
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
    },
    onError: (_, __, context) => {
      if (context?.previousPostData) {
        queryClient.setQueryData([POST, postId], context.previousPostData);
        notify({
          type: "error",
          text: "좋아요 생성에 실패했어요.",
        });
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: async (formData: IDeleteLike) => await _DELETE_LIKE(formData),
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({ queryKey: [POST, postId] });
      const previousPostData: any = queryClient.getQueryData([POST, postId]);

      const newLikes = previousPostData?.data?.likes.filter((like: any) => {
        if (like._id !== id && like.user !== myId) {
          return like;
        }
      });

      const newPostData = {
        ...previousPostData?.data,
        likes: newLikes,
      };

      queryClient.setQueryData([POST, postId], { data: newPostData });

      return { previousPostData };
    },

    onError: (_, __, context) => {
      if (context?.previousPostData) {
        queryClient.setQueryData([POST, postId], context.previousPostData);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [POST, postId] });
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
