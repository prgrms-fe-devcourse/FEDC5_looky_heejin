import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { NAV_HEIGHT } from "@/constants/uiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input } from "@/components/common";
import { CHAT } from "@/constants/queryKey";
import { _GET, _POST, _PUT } from "@/api";
import { Message } from "@/components/Chats";
import { IMessage } from "@/types/message";
import { useMe } from "@/hooks/useMe";

interface IMessageForm {
  message: string;
}

interface IMessageBodyData {
  message: string;
  receiver: string;
}

interface INotificationBodyData {
  notificationType: "MESSAGE";
  notificationTypeId: string;
  userId: string;
}

const ChatPage = () => {
  const { pathname } = useLocation();
  const userId = pathname.split("/")[2];

  const { id } = useMe();

  const chatEndPointRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${CHAT}-${userId}`],
    queryFn: async () => await _GET(`/messages?userId=${userId}`),
    enabled: !!userId,
    refetchInterval: 1000,
  });

  const mutation = useMutation({
    mutationFn: async (formData: IMessageBodyData) =>
      await _POST("/messages/create", formData),
    onSuccess: data => {
      notificationMutation.mutate({
        notificationType: "MESSAGE",
        notificationTypeId: data?.data._id,
        userId,
      });
      scrollToBottom(true);
    },
  });

  const notificationMutation = useMutation({
    mutationFn: async (param: INotificationBodyData) =>
      await _POST("/notifications/create", param),
  });

  const seenUpdateMutation = useMutation({
    mutationFn: async () => await _PUT("/messages/update-seen", { sender: id }),
  });

  const { register, handleSubmit, reset } = useForm<IMessageForm>({});

  const onValid = (data: IMessageForm) => {
    mutation.mutate({ message: data.message, receiver: userId });
    reset();
  };

  const scrollToBottom = (useSmooth?: boolean) => {
    chatEndPointRef?.current?.scrollIntoView({
      behavior: useSmooth ? "smooth" : "instant",
    });
  };

  useEffect(() => {
    scrollToBottom();
    seenUpdateMutation.mutate();

    return () => seenUpdateMutation.mutate();
  }, []);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="w-full h-full relative">
      <div
        className="flex flex-col gap-1 p-4 overflow-auto w-full"
        style={{ height: "calc(100%)" }}
      >
        {data &&
          data?.data.map((message: IMessage) => (
            <Message
              key={message._id}
              isMine={message.sender._id === id}
              message={message.message}
              createdAt={message.createdAt}
              senderName={message.sender.fullName}
            />
          ))}
        <div ref={chatEndPointRef} />
      </div>
      <div
        className="w-full absolute -bottom-12"
        style={{ height: `${NAV_HEIGHT}rem` }}
      >
        <form className="relative w-full" onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("message")}
            required={false}
            className="rounded-s-full rounded-e-full pr-[5rem]"
            type="text"
            placeholder="메시지를 입력해주세요."
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              variant="symbol"
              className="flex items-center"
              style={{
                height: `${NAV_HEIGHT - 1}rem`,
                padding: "0.5rem 0.6rem",
                borderRadius: "2rem",
              }}
              onClick={handleSubmit(onValid)}
            >
              <span className="">보내기</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
