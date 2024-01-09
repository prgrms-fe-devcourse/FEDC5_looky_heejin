import { CardWrapper } from "./NotificationCard.styles";
import { Avatar } from "@/components/common";
import { INotification } from "@/types/notification";
import { parseDate } from "@/utils/parseDate";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface INotificationCardProps {
  key: string;
  type: "comment" | "like" | "post" | "follow";
  data: INotification;
}

const CONTENT = {
  comment: "회원님의 포스터에 댓글을 남겼습니다.",
  like: "회원님의 포스터를 좋아합니다.",
  post: "포스터를 작성했습니다.",
  follow: "회원님을 팔로우하기 시작했습니다.",
};

const NotificationCard = ({ type, data }: INotificationCardProps) => {
  const navigate = useNavigate();

  const cardClickHandler = useCallback(
    (target: "post" | "profile", id: string) => {
      if (target === "profile") {
        navigate(`/profile/${id}`);
      } else {
      }
    },
    []
  );

  return (
    <CardWrapper>
      <div
        className="cursor-pointer"
        onClick={() => cardClickHandler("profile", data.author._id)}
      >
        <Avatar size="S" src={data.author.image} />
      </div>
      <article className="flex-1 flex flex-col justify-center">
        <p className="cursor-pointer">
          <strong>{data.author.fullName}</strong>님이 {CONTENT[type]}
        </p>
        <p className="text-xs">{parseDate(data.createdAt)}</p>
      </article>
    </CardWrapper>
  );
};

export default NotificationCard;
