import styled from "styled-components";
import Icon from "../../../Icon/Icon";
import { CHAT_ICON, NOTIFICATIONS_ICON } from "@/constants/icons";
import { PathName } from "@/constants/pathNameConstants";

interface IChatNotificationIconsBoxProps {
  onClick: (path: string) => void;
}

const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto 0;
  & > :first-child {
    padding-top: 3%;
  }
`;

const IconWrapper = styled.div`
  margin: auto 4%;
  & > :first-child {
    cursor: pointer;
  }
`;

const ChatNotificationIconsBox = ({
  onClick,
}: IChatNotificationIconsBoxProps) => {
  return (
    <IconsBox>
      <IconWrapper onClick={() => onClick(PathName.CHATS)}>
        <Icon name={CHAT_ICON} size="1.6rem" weight={250}></Icon>
      </IconWrapper>
      <IconWrapper onClick={() => onClick(PathName.NOTIFICATIONS)}>
        <Icon name={NOTIFICATIONS_ICON} size="1.7rem" weight={250}></Icon>
      </IconWrapper>
    </IconsBox>
  );
};

export default ChatNotificationIconsBox;
