import { Avatar, EllipsisText } from "@/components/common";
import { parseDate } from "@/utils/parseDate";

import {
  ChatLiArticle,
  ChatLiAvatarBox,
  ChatLiSeenInfoBox,
  ChatLiWrapper,
  OnlineIndicator,
} from "./ChatLi.styles";

interface IChatLiProps {
  key: string;
  senderName: string;
  senderId: string;
  senderIsOnline: boolean;
  message: string;
  seen: boolean;
  createdAt: string;
  onClickHandler: (id: string) => void;
}

const ChatLi = ({
  senderName,
  senderId,
  senderIsOnline,
  message,
  createdAt,
  seen,
  onClickHandler,
}: IChatLiProps) => {
  return (
    <ChatLiWrapper onClick={() => onClickHandler(senderId)}>
      <ChatLiAvatarBox>
        <Avatar size="M" />
        {senderIsOnline && <OnlineIndicator />}
      </ChatLiAvatarBox>
      <ChatLiArticle>
        <p>
          <strong>{senderName}</strong>
        </p>
        <EllipsisText context={message} lineClamp={1} className="text-base" />
      </ChatLiArticle>
      <ChatLiSeenInfoBox>
        <p>{parseDate(createdAt)}</p>
        {!seen && <p>읽지 않음</p>}
      </ChatLiSeenInfoBox>
    </ChatLiWrapper>
  );
};

export default ChatLi;
