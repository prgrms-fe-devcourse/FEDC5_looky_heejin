import {
  CommentContent,
  IconWrapper,
  StyledLi,
  UserNameInComment,
} from "../PostDetailModal.styles";
import Icon from "@/components/common/Icon/Icon";
import { CLOSE_ICON } from "@/constants/icons";

interface IAuthor {
  _id: string;
  fullName: string;
}

interface IComment {
  _id: string;
  author: IAuthor;
  comment: string;
}

interface CommentProps {
  key: string;
  comment: IComment;
  myId: string | null;
  handleDeleteComment: (id: string) => void;
}
const Comment = ({ comment, myId, handleDeleteComment }: CommentProps) => {
  return (
    <StyledLi key={comment._id}>
      <UserNameInComment>{comment.author.fullName} </UserNameInComment>
      <CommentContent>{comment.comment}</CommentContent>
      {comment.author._id === myId && (
        <button onClick={() => handleDeleteComment(comment._id)}>
          <IconWrapper>
            <Icon name={CLOSE_ICON} size="1rem" />
            삭제
          </IconWrapper>
        </button>
      )}
    </StyledLi>
  );
};

export default Comment;
