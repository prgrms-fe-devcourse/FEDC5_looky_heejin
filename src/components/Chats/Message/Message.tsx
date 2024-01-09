import React from "react";

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
  createdAt: string;
}

const Message = ({ isMine, senderName, message, createdAt }: IMessageProps) => {
  console.log(createdAt);

  return (
    <MessageCard $isMine={isMine}>
      <div>{!isMine && <Avatar size="XS" />}</div>
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
