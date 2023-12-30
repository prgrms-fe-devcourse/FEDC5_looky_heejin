import styled, { useTheme } from "styled-components";
import Icon from "../Icon/Icon";
import {
  CHANNEL_ICON,
  HOME_ICON,
  SEARCH_ICON,
  USER_ICON,
} from "@/constants/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";

const BottomNavBarWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: ${APP_MAX_WIDTH}px;
  width: 100%;
  height: 2.5rem;
  background-color: white;
`;
const IconWrapper = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }
`;

const BottomNavBar = () => {
  const { pathname } = useLocation();
  const NAV_INABLE_PATH = [
    "/home",
    "/channels",
    "/profile",
    "/search",
    "/chats",
    "/postdetail",
    "/test",
  ];

  const currentPath = useMemo(() => "/" + pathname.split("/")[1], [pathname]);
  const showNavBar = useMemo(
    () => NAV_INABLE_PATH.includes(currentPath),
    [currentPath]
  );

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (path: string) => {
      if (path !== pathname) {
        navigate(path);
      }
    },
    [pathname]
  );

  return (
    showNavBar && (
      <BottomNavBarWrapper>
        <IconWrapper onClick={() => handleClick("/home")}>
          <Icon
            name={HOME_ICON}
            color={currentPath === "/home" ? theme.symbol_color : ""}
            weight={currentPath === "/home" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleClick("/search")}>
          <Icon
            name={SEARCH_ICON}
            color={currentPath === "/search" ? theme.symbol_color : ""}
            weight={currentPath === "/search" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleClick("/channels")}>
          <Icon
            name={CHANNEL_ICON}
            color={currentPath === "/channels" ? theme.symbol_color : ""}
            weight={currentPath === "/channels" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper onClick={() => handleClick("/profile")}>
          <Icon
            name={USER_ICON}
            color={currentPath === "/profile" ? theme.symbol_color : ""}
            weight={currentPath === "/profile" ? 300 : 250}
          />
        </IconWrapper>
      </BottomNavBarWrapper>
    )
  );
};

export default BottomNavBar;
