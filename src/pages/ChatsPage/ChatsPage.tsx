import React, { useEffect } from "react";

import { _GET } from "@/api";
import { CHATS } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import { ChatLi } from "@/components/Chats";
import { IConversation } from "@/types/message";
import { useNavigate } from "react-router-dom";

const ChatsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [CHATS],
    queryFn: async () => await _GET("/messages/conversations"),
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data]);

  const onClickConversation = (id: string) => {
    navigate(`/chat/${id}`);
  };

  if (isLoading) return null;

  return (
    <ul className="space-y-6 pt-8 w-full">
      {data?.data.map((conversation: IConversation) => (
        <ChatLi
          key={conversation.sender._id}
          senderId={conversation.sender._id}
          createdAt={conversation.createdAt}
          message={conversation.message}
          seen={conversation.seen}
          senderName={conversation.sender.fullName}
          senderIsOnline={conversation.sender.isOnline}
          onClickHandler={onClickConversation}
        />
      ))}
    </ul>
  );
};

export default ChatsPage;
