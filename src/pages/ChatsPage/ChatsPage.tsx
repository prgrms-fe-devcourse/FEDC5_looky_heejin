import { _GET } from "@/api";
import { CHATS } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import { ChatLi } from "@/components/Chats";
import { IConversation } from "@/types/message";
import { useNavigate } from "react-router-dom";
import { useMe } from "@/hooks/useMe";
import { Spinner } from "@/components/common/Spinner";

const ChatsPage = () => {
  const navigate = useNavigate();

  const { id } = useMe();

  const { data, isLoading } = useQuery({
    queryKey: [CHATS],
    queryFn: async () => await _GET("/messages/conversations"),
    refetchInterval: 5000,
  });

  const onClickConversation = (id: string) => {
    navigate(`/chat/${id}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <ul className="space-y-6 pt-8 w-full">
      {data?.data
        .filter(
          (data: IConversation) =>
            data.receiver._id !== id || data.sender._id !== id
        )
        .map((conversation: IConversation) => {
          const partner =
            conversation.sender._id === id
              ? conversation.receiver
              : conversation.sender;

          return (
            <ChatLi
              key={partner._id}
              senderId={partner._id}
              createdAt={conversation.createdAt}
              message={conversation.message}
              seen={conversation.seen}
              senderName={partner.fullName}
              senderProfile={partner.image}
              senderIsOnline={partner.isOnline}
              onClickHandler={onClickConversation}
            />
          );
        })}
    </ul>
  );
};

export default ChatsPage;
