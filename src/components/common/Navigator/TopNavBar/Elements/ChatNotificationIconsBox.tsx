import styled, { useTheme } from "styled-components";
import Icon from "../../../Icon/Icon";
import {
  CHAT_ICON,
  DARKMODE_ICON,
  LIGHTMODE_ICON,
  NOTIFICATIONS_ICON,
} from "@/constants/icons";
import { PathName } from "@/constants/pathNameConstants";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface IChatNotificationIconsBoxProps {
  onClick: (path: string) => void;
}

const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  margin: auto 0;
  & > :nth-child(2) {
    padding-top: 0.3rem;
  }
`;

const IconWrapper = styled.div`
  margin: auto 0.25rem;
  & > :first-child {
    cursor: pointer;
  }
`;

const ChatNotificationIconsBox = ({
  onClick,
}: IChatNotificationIconsBoxProps) => {
  const theme = useTheme();
  const [_, setLocalTheme] = useLocalStorage("theme");

  const handleTheme = () => {
    setLocalTheme(theme.theme_mode === "light" ? "dark" : "light");
  };

  return (
    <IconsBox>
      <IconWrapper onClick={handleTheme}>
        <Icon
          name={theme.theme_mode === "light" ? LIGHTMODE_ICON : DARKMODE_ICON}
          size="1.6rem"
          weight={250}
        ></Icon>
      </IconWrapper>
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
