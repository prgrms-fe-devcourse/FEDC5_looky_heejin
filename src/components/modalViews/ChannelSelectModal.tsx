import React from "react";

import { ModalLayout } from "../common/Modal";
import { Button } from "../common";
import { useUI } from "../common/uiContext";
import styled from "styled-components";
import tw from "twin.macro";
import { useNewPost } from "@/hooks/useNewPost";

interface IChannelSelectFormProps {
  channelId: string;
  channelName: string;
}

const MOCK_DATA = [
  {
    id: "1",
    name: "아웃도어",
  },
  {
    id: "2",
    name: "아메카지",
  },
  {
    id: "3",
    name: "캐주얼",
  },
  {
    id: "4",
    name: "스트릿",
  },
  {
    id: "5",
    name: "고프코어",
  },
  {
    id: "6",
    name: "고프코어",
  },
  {
    id: "7",
    name: "빈티지",
  },
];

const ChannelSelectModal = () => {
  const { closeModal } = useUI();
  const { setChannel } = useNewPost();

  const handleChannelSelectClick = (channelId: string, channelName: string) => {
    setChannel(channelId, channelName);
    closeModal();
  };

  return (
    <ModalLayout modalTitle="채널 선택">
      <section className="relative w-[300px] h-[300px] pt-8">
        <ul className="flex flex-row flex-wrap gap-2">
          {MOCK_DATA.map(({ id, name }) => (
            <ChannelItem key={id}>
              <Button
                variant="flat"
                style={{ padding: "0.3rem 1rem" }}
                className="bg-[#B3B3B390]"
                onClick={() => handleChannelSelectClick(id, name)}
              >
                <span>{name}</span>
              </Button>
            </ChannelItem>
          ))}
        </ul>
        <div className="absolute bottom-0 w-full">
          <Button variant="flat" onClick={closeModal}>
            <span>{"취소"}</span>
          </Button>
        </div>
      </section>
    </ModalLayout>
  );
};

export default ChannelSelectModal;

const ChannelItem = styled.li`
  ${tw`rounded-md bg-gray-400`}
`;
