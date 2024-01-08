import { CardWrapper } from "./NotificationCard.styles";
import { Avatar, Image } from "@/components/common";
import { INotification } from "@/types/notification";
import { parseDate } from "@/utils/parseDate";

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
  return (
    <CardWrapper>
      <div>
        <Avatar size="S" src="https://picsum.photos/100" />
      </div>
      <article className="flex-1 flex flex-col justify-center">
        <p>
          <strong>{data.author.fullName}</strong>님이 {CONTENT[type]}
        </p>
        <p className="text-xs">{parseDate(data.createdAt)}</p>
      </article>
      {data.post && (
        <div className="__util relative w-10 aspect-square rounded-sm overflow-hidden">
          <Image fill src="" />
        </div>
      )}
    </CardWrapper>
  );
};

export default NotificationCard;
