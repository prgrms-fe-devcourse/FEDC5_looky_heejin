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
  senderProfile?: string;
  message: string;
  seen: boolean;
  createdAt: string;
  onClickHandler: (id: string) => void;
}

const ChatLi = ({
  senderName,
  senderId,
  senderIsOnline,
  senderProfile,
  message,
  createdAt,
  seen,
  onClickHandler,
}: IChatLiProps) => {
  return (
    <ChatLiWrapper onClick={() => onClickHandler(senderId)}>
      <ChatLiAvatarBox>
        <Avatar size="M" src={senderProfile} />
        {senderIsOnline && <OnlineIndicator />}
      </ChatLiAvatarBox>
      <ChatLiArticle
        tabIndex={0}
        role="link"
        aria-label={`${senderName}와의 채팅방으로 이동하기`}
        onKeyDown={e => {
          if (e.key === "Enter") onClickHandler(senderId);
        }}
      >
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
