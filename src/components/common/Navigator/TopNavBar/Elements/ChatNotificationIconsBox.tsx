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
import { useMe } from "@/hooks/useMe";

interface IChatNotificationIconsBoxProps {
  onClick: (path: string) => void;
}

const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  margin: auto 1rem auto 0;
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

const NotificationIconWrapper = styled(IconWrapper)`
  & > :last-child {
    cursor: pointer;
  }
  position: relative;
`;

const NotificationCounter = styled.div`
  position: absolute;
  left: 0.9rem;
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.symbol_color};
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.background_color}`};
`;

const NotificationCounterSpan = styled.span`
  margin: auto auto;
  font-size: 0.45rem;
  font-weight: 500;
  color: #ffffff;
`;

const ChatNotificationIconsBox = ({
  onClick,
}: IChatNotificationIconsBoxProps) => {
  const { id } = useMe();
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
      {id ? (
        <>
          <IconWrapper onClick={() => onClick(PathName.CHATS)}>
            <Icon name={CHAT_ICON} size="1.6rem" weight={250}></Icon>
          </IconWrapper>
          <NotificationIconWrapper
            onClick={() => onClick(PathName.NOTIFICATIONS)}
          >
            <Icon name={NOTIFICATIONS_ICON} size="1.7rem" weight={250}></Icon>
            <NotificationCounter>
              <NotificationCounterSpan>20</NotificationCounterSpan>
            </NotificationCounter>
          </NotificationIconWrapper>
        </>
      ) : null}
    </IconsBox>
  );
};

export default ChatNotificationIconsBox;
