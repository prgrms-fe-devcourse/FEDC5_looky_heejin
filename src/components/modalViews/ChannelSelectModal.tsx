import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import tw from "twin.macro";

import { _GET } from "@/api";
import { IChannel } from "@/types/channel";
import useTheme from "@/hooks/useTheme";

import { Button } from "../common";
import { ModalLayout } from "../common/Modal";
import { useUI } from "../common/uiContext";
import { Spinner } from "../common/Spinner";

interface ModalProps {
  setChannelId: Function;
  setChannelName: Function;
}

interface IChannelSelectModalProps {
  props?: ModalProps;
}

const ChannelSelectModal = ({ props }: IChannelSelectModalProps) => {
  const { setChannelId, setChannelName } = props as ModalProps;

  const theme = useTheme();
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
    return <Spinner />;
  }

  return (
    <ModalLayout modalTitle="채널 선택">
      <section className="relative w-[300px] h-[300px] pt-8">
        <ul className="flex flex-row flex-wrap gap-2">
          {data?.data.map(({ _id, name }: IChannel) => (
            <ChannelItem key={_id}>
              <Button
                variant="neumorp"
                style={{
                  padding: "0.3rem 1rem",
                  backgroundColor: theme?.white_primary + 30,
                }}
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
  background-color: ${props => props.theme.white_primary + 30};
  color: ${props => props.theme.text_primary_color};
  ${tw`rounded-md`}
`;
