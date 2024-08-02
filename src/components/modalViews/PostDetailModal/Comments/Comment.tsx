import {
  CommentAvatarBox,
  CommentAvatarWrapper,
  CommentContent,
  CommentContentBox,
  CommentDate,
  CommentUserInformationWrapper,
  DeleteCommentIconWrapper,
  StyledLi,
  UserNameInComment,
} from "../PostDetailModal.styles";
import { Icon } from "@/components/common";
import { ICON } from "@/constants/icons";
import { Avatar } from "@/components/common";
import { parseDate } from "@/utils/parseDate";
import { useNavigate } from "react-router-dom";
import { useUI } from "@/components/common/uiContext";

interface IAuthor {
  _id: string;
  fullName: string;
  image?: string;
}

interface IComment {
  _id: string;
  author: IAuthor;
  comment: string;
  createdAt: string;
}

interface CommentProps {
  key: string;
  comment: IComment;
  myId: string | null;
  handleDeleteComment: (id: string) => void;
}

const Comment = ({ comment, myId, handleDeleteComment }: CommentProps) => {
  const { closeModal } = useUI();
  const navigate = useNavigate();

  const handleUser = (id: string) => {
    closeModal();
    navigate(`/profile/${id}`);
  };
  return (
    <StyledLi key={comment._id}>
      <CommentAvatarBox>
        {comment.author.hasOwnProperty("image") ? (
          <CommentAvatarWrapper onClick={() => handleUser(comment.author._id)}>
            <Avatar size="S" src={comment.author.image} />
          </CommentAvatarWrapper>
        ) : (
          <CommentAvatarWrapper onClick={() => handleUser(comment.author._id)}>
            <Avatar size="S" src="/profile.png" />
          </CommentAvatarWrapper>
        )}
      </CommentAvatarBox>
      <CommentContentBox>
        <CommentUserInformationWrapper>
          <UserNameInComment onClick={() => handleUser(comment.author._id)}>
            {comment.author.fullName}{" "}
          </UserNameInComment>
          <CommentDate>{parseDate(comment.createdAt)}</CommentDate>
          {comment.author._id === myId && (
            <button onClick={() => handleDeleteComment(comment._id)}>
              <DeleteCommentIconWrapper>
                <Icon name={ICON.CLOSE} size="1rem" isSprite={true} />
              </DeleteCommentIconWrapper>
            </button>
          )}
        </CommentUserInformationWrapper>

        <CommentContent>{comment.comment}</CommentContent>
      </CommentContentBox>
    </StyledLi>
  );
};

export default Comment;
