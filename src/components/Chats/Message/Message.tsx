import React from "react";

import { Avatar } from "@/components/common";
import { parseDate } from "@/utils/parseDate";
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
  createdAt: string;
}

const Message = ({ isMine, senderName, message, createdAt }: IMessageProps) => {
  return (
    <MessageCard isMine={isMine}>
      <div>{!isMine && <Avatar size="S" />}</div>
      <MessageBody>
        <UserNameWrapper>
          {!isMine && <span>{senderName}</span>}
        </UserNameWrapper>
        {message && (
          <MessageWrapper>
            <MessageBox isMine={isMine}>
              <p>{message}</p>
            </MessageBox>
            <span>{parseDate(createdAt)}</span>
          </MessageWrapper>
        )}
      </MessageBody>
    </MessageCard>
  );
};

export default Message;
