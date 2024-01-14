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
import { useNotification } from "@/hooks/useNotification";

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
  margin: auto 0.25rem;
  & > * {
    cursor: pointer;
  }
  position: relative;
`;

const ChatNotificationCounter = styled.div`
  position: absolute;
  left: 0.9rem;
  top: 0.1rem;
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.symbol_color};
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.background_color}`};
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
  const { commonUnseenCount, common, messageUnseenCount } = useNotification();
  const theme = useTheme();
  const [_, setLocalTheme] = useLocalStorage("theme");

  const handleTheme = () => {
    setLocalTheme(theme.theme_mode === "light" ? "dark" : "light");
  };

  console.log(common, commonUnseenCount, messageUnseenCount);
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
          <NotificationIconWrapper onClick={() => onClick(PathName.CHATS)}>
            <Icon name={CHAT_ICON} size="1.6rem" weight={250}></Icon>
            {messageUnseenCount > 0 ? (
              <ChatNotificationCounter>
                <NotificationCounterSpan>
                  {Math.min(messageUnseenCount, 99)}
                </NotificationCounterSpan>
              </ChatNotificationCounter>
            ) : null}
          </NotificationIconWrapper>
          <NotificationIconWrapper
            onClick={() => onClick(PathName.NOTIFICATIONS)}
          >
            <Icon name={NOTIFICATIONS_ICON} size="1.7rem" weight={250}></Icon>
            {commonUnseenCount > 0 ? (
              <NotificationCounter>
                <NotificationCounterSpan>
                  {Math.min(commonUnseenCount, 99)}
                </NotificationCounterSpan>
              </NotificationCounter>
            ) : null}
          </NotificationIconWrapper>
        </>
      ) : null}
    </IconsBox>
  );
};

export default ChatNotificationIconsBox;
