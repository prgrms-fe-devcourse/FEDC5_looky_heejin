import { Avatar } from "@/components/common";
import { parseTime } from "@/utils/parseDate";
import {
  MessageBody,
  MessageBox,
  MessageCard,
  MessageWrapper,
  UserNameWrapper,
} from "./Message.styles";

interface IMessageProps {
  key: string;
  isMine: boolean;
  message: string;
  senderName: string;
  senderProfile?: string;
  createdAt: string;
}

const Message = ({
  isMine,
  senderName,
  senderProfile,
  message,
  createdAt,
}: IMessageProps) => {
  return (
    <MessageCard $isMine={isMine}>
      <div>{!isMine && <Avatar size="XS" src={senderProfile} />}</div>
      <MessageBody>
        <UserNameWrapper>
          {!isMine && <span>{senderName}</span>}
        </UserNameWrapper>
        {message && (
          <MessageWrapper>
            <MessageBox $isMine={isMine}>
              <p>{message}</p>
            </MessageBox>
            <span>{parseTime(createdAt)}</span>
          </MessageWrapper>
        )}
      </MessageBody>
    </MessageCard>
  );
};

export default Message;
