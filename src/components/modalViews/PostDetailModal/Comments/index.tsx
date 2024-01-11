import { _DELETE_COMMENT } from "@/api/queries/comment";
import {
  CommentWrapper,
  MoreComments,
  NoComments,
} from "../PostDetailModal.styles";
import { IDeleteComment } from "@/types";
import { useMutation } from "@tanstack/react-query";
import CommentLists from "./CommentLists";

interface ICommentsProps {
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  isShowComments: boolean;
  setIsShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  comments: any[];
  myId: string | null;
}
const Comments = ({
  setComments,
  isShowComments,
  setIsShowComments,
  comments,
  myId,
}: ICommentsProps) => {
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
  const handleShowComments = () => {
    setIsShowComments(true);
  };

  const handleDeleteComment = (id: string) => {
    deleteCommentMutation.mutate({ id });
  };

  return (
    <CommentWrapper>
      {isShowComments ? (
        <CommentLists
          comments={comments}
          myId={myId}
          handleDeleteComment={handleDeleteComment}
        />
      ) : comments.length === 0 ? (
        <NoComments>댓글이 없습니다.</NoComments>
      ) : (
        <MoreComments onClick={handleShowComments}>
          댓글 {comments.length}개 보기
        </MoreComments>
      )}
    </CommentWrapper>
  );
};

export default Comments;
