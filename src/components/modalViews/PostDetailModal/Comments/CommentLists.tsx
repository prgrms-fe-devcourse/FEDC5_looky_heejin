import Comment from "./Comment";

interface IAuthor {
  _id: string;
  fullName: string;
}

interface IComment {
  _id: string;
  author: IAuthor;
  comment: string;
}
interface ICommentListsProps {
  comments: IComment[];
  myId: string | null;
  handleDeleteComment: (id: string) => void;
}
const CommentLists = ({
  comments,
  myId,
  handleDeleteComment,
}: ICommentListsProps) => {
  return (
    <ul>
      {comments.map((comment: any) => (
        <Comment
          key={comment._id}
          myId={myId}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        ></Comment>
      ))}
    </ul>
  );
};

export default CommentLists;
