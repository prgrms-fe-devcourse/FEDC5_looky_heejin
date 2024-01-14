import { ModalLayout } from "../common/Modal";
import { Button } from "../common";
import { useUI } from "../common/uiContext";
import styled from "styled-components";
import tw from "twin.macro";
import { useQuery } from "@tanstack/react-query";
import { _GET } from "@/api";
import { IChannel } from "@/types/channel";

interface ModalProps {
  setChannelId: Function;
  setChannelName: Function;
}

interface IChannelSelectModalProps {
  props?: ModalProps;
}

const ChannelSelectModal = ({ props }: IChannelSelectModalProps) => {
  const { setChannelId, setChannelName } = props as ModalProps;

  const { closeModal } = useUI();

  const { data, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => await _GET("/channels"),
  });

  const handleChannelSelectClick = (channelId: string, channelName: string) => {
    setChannelId(channelId);
    setChannelName(channelName);
    closeModal();
  };

  if (isLoading) {
    return null;
  }

  return (
    <ModalLayout modalTitle="채널 선택">
      <section className="relative w-[300px] h-[300px] pt-8">
        <ul className="flex flex-row flex-wrap gap-2">
          {data?.data.map(({ _id, name }: IChannel) => (
            <ChannelItem key={_id}>
              <Button
                variant="flat"
                style={{ padding: "0.3rem 1rem" }}
                className="bg-[#B3B3B390]"
                onClick={() => handleChannelSelectClick(_id, name)}
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
