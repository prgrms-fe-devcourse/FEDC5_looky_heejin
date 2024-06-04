import styled, { keyframes, useTheme } from "styled-components";
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
import { Icon } from "@/components/common";

interface IChatNotificationIconsBoxProps {
  onClick: (path: string) => void;
}

export const zoomin = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const IconsBox = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  margin: auto 1rem auto 0;
  & > :nth-child(2) {
    padding-top: 0.3rem;
  }
`;

const IconWrapper = styled.section<{ $marginLeft: string; tabIndex: number }>`
  margin: auto 0.25rem;
  margin-left: ${({ $marginLeft }) => $marginLeft && $marginLeft};
  & > :first-child {
    cursor: pointer;
  }
  &:hover > :first-child {
    animation: ${zoomin} 0.4s ease-in-out forwards;
  }
`;

const NotificationIconWrapper = styled(IconWrapper)`
  margin: auto 0.25rem;
  & > * {
    cursor: pointer;
  }
  position: relative;
`;

const ChatNotificationCounter = styled.div<{
  $width: string;
  $borderRadius: string;
}>`
  position: absolute;
  left: 0.95rem;
  top: 0.1rem;
  width: ${({ $width }) => $width && $width};
  height: 1rem;
  background-color: ${({ theme }) => theme.symbol_color};
  border-radius: ${({ $borderRadius }) => $borderRadius && $borderRadius};
  border: ${({ theme }) => `1px solid ${theme.background_color}`};
`;

const NotificationCounter = styled.div<{
  $width: string;
  $borderRadius: string;
}>`
  position: absolute;
  left: 0.9rem;
  width: ${({ $width }) => $width && $width};
  height: 1rem;
  background-color: ${({ theme }) => theme.symbol_color};
  border-radius: ${({ $borderRadius }) => $borderRadius && $borderRadius};
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
  const { commonUnseenCount, messageUnseenCount } = useNotification();
  const theme = useTheme();
  const [_, setLocalTheme] = useLocalStorage("theme");

  const handleTheme = () => {
    setLocalTheme(theme.theme_mode === "light" ? "dark" : "light");
  };

  const handleThemeEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleTheme();
    }
  };

  const handleChat = () => {
    onClick(PathName.CHATS);
  };

  const handleChatEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleChat();
    }
  };

  const handleNotification = () => {
    onClick(PathName.NOTIFICATIONS);
  };

  const handleNotificationEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleNotification();
    }
  };

  return (
    <IconsBox>
      <IconWrapper
        tabIndex={0}
        onKeyDown={handleThemeEnter}
        onClick={handleTheme}
        $marginLeft={id ? "" : "4.5rem"}
      >
        <Icon
          name={theme.theme_mode === "light" ? LIGHTMODE_ICON : DARKMODE_ICON}
          size="1.6rem"
          weight={250}
        ></Icon>
      </IconWrapper>
      {id ? (
        <>
          <NotificationIconWrapper
            tabIndex={0}
            $marginLeft={""}
            aria-labelledby={CHAT_ICON}
            onKeyDown={handleChatEnter}
            onClick={handleChat}
          >
            <Icon
              id={CHAT_ICON}
              name={CHAT_ICON}
              size="1.6rem"
              weight={250}
            ></Icon>
            {messageUnseenCount > 0 ? (
              messageUnseenCount > 99 ? (
                <ChatNotificationCounter $width="1.3rem" $borderRadius="8px">
                  <NotificationCounterSpan>99+</NotificationCounterSpan>
                </ChatNotificationCounter>
              ) : (
                <ChatNotificationCounter $width="1rem" $borderRadius="50%">
                  <NotificationCounterSpan>
                    {messageUnseenCount}
                  </NotificationCounterSpan>
                </ChatNotificationCounter>
              )
            ) : null}
          </NotificationIconWrapper>
          <NotificationIconWrapper
            tabIndex={0}
            aria-labelledby={NOTIFICATIONS_ICON}
            $marginLeft={""}
            onKeyDown={handleNotificationEnter}
            onClick={handleNotification}
          >
            <Icon
              id={NOTIFICATIONS_ICON}
              name={NOTIFICATIONS_ICON}
              size="1.7rem"
              weight={250}
            ></Icon>
            {commonUnseenCount > 0 ? (
              commonUnseenCount > 99 ? (
                <NotificationCounter $width="1.3rem" $borderRadius="8px">
                  <NotificationCounterSpan>99+</NotificationCounterSpan>
                </NotificationCounter>
              ) : (
                <NotificationCounter $width="1rem" $borderRadius="50%">
                  <NotificationCounterSpan>
                    {commonUnseenCount}
                  </NotificationCounterSpan>
                </NotificationCounter>
              )
            ) : null}
          </NotificationIconWrapper>
        </>
      ) : null}
    </IconsBox>
  );
};

export default ChatNotificationIconsBox;
