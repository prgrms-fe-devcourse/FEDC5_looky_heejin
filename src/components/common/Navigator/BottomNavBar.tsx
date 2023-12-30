import styled, { useTheme } from "styled-components";
import { Icon } from "..";
import {
  CHANNEL_ICON,
  HOME_ICON,
  SEARCH_ICON,
  USER_ICON,
} from "@/constants/icons";
import { useLocation } from "react-router-dom";

const BottomNavBarWrapper = styled.div`
  /* height: 3rem; */
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const IconWrapper = styled.div`
  /* border: 1px solid black; */
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

  const showNavBar = NAV_INABLE_PATH.includes(pathname);
  const currentPath = pathname.split("/")[1];

  const theme = useTheme();

  return (
    showNavBar && (
      <BottomNavBarWrapper>
        <IconWrapper>
          <Icon
            name={HOME_ICON}
            color={currentPath === "home" ? theme.symbol_color : ""}
            weight={currentPath === "home" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            name={SEARCH_ICON}
            color={currentPath === "search" ? theme.symbol_color : ""}
            weight={currentPath === "search" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            name={CHANNEL_ICON}
            color={currentPath === "channels" ? theme.symbol_color : ""}
            weight={currentPath === "channels" ? 300 : 250}
          />
        </IconWrapper>
        <IconWrapper>
          <Icon
            name={USER_ICON}
            color={currentPath === "profile" ? theme.symbol_color : ""}
            weight={currentPath === "profile" ? 300 : 250}
          />
        </IconWrapper>
      </BottomNavBarWrapper>
    )
  );
};

export default BottomNavBar;
