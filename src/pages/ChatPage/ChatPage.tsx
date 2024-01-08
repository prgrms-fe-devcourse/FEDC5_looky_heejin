import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { NAV_HEIGHT } from "@/constants/uiConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Input } from "@/components/common";
import { CHAT } from "@/constants/queryKey";
import { _GET } from "@/api";
import { Message } from "@/components/Chats";
import { IMessage } from "@/types/message";
import { useMe } from "@/hooks/useMe";

interface IChatFormProps {
  content: string;
}

const ChatPage = () => {
  const { pathname } = useLocation();
  const userId = pathname.split("/")[2];

  const { id } = useMe();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${CHAT}-${userId}`],
    queryFn: async () => await _GET(`/messages?userId=${userId}`),
  });

  // console.log(data);

  // const mutation = useMutation({
  //   mutationFn:
  //   onSuccess: data => {},
  // });

  const { register, handleSubmit } = useForm<IChatFormProps>({});

  const onValid = (data: IChatFormProps) => {
    console.log(data);
  };

  // console.log(userId);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="w-full h-full relative">
      <div
        className="flex flex-col gap-8 p-4 overflow-hidden w-full"
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
      </div>
      <div
        className="w-full absolute -bottom-12"
        style={{ height: `${NAV_HEIGHT}rem` }}
      >
        <form className="relative w-full">
          <Input
            register={register("content")}
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
              <span className="">send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
