import { CardWrapper } from "./NotificationCard.styles";
import { Avatar } from "@/components/common";
import { INotification } from "@/types/notification";
import { parseDate } from "@/utils/parseDate";
import React from "react";

interface INotificationCardProps {
  key: string;
  type: "comment" | "like" | "follow" | null;
  onClickHandler: (data: INotification, isProfile?: boolean) => void;
  data: INotification;
}

const CONTENT = {
  comment: "회원님의 포스터에 댓글을 남겼습니다.",
  like: "회원님의 포스터를 좋아합니다.",
  follow: "회원님을 팔로우하기 시작했습니다.",
};

const NotificationCard = ({
  type,
  data,
  onClickHandler,
}: INotificationCardProps) => {
  if (!type) return;

  return (
    <CardWrapper>
      <div
        className="cursor-pointer"
        onClick={() => onClickHandler(data, true)}
      >
        <Avatar size="S" src={data.author.image} />
      </div>
      <article
        className="flex-1 flex flex-col justify-center"
        onClick={() => onClickHandler(data)}
      >
        <p className="cursor-pointer">
          <strong>{data.author.fullName}</strong>님이 {CONTENT[type]}
        </p>
        <p className="text-xs">{parseDate(data.createdAt)}</p>
      </article>
    </CardWrapper>
  );
};

export default React.memo(NotificationCard);
