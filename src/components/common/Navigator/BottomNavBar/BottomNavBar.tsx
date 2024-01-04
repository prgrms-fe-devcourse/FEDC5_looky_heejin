import styled, { useTheme } from "styled-components";
import Icon from "../../Icon/Icon";
import {
  CHANNEL_ICON,
  HOME_ICON,
  SEARCH_ICON,
  USER_ICON,
} from "@/constants/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import { PathName } from "@/constants/pathNameConstants";
import { Button } from "../..";

const BottomNavBarWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: ${APP_MAX_WIDTH}px;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.background_color};
`;
const IconWrapper = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${({ theme }) => theme.gray_100};
    cursor: pointer;
  }
`;

const ButtonChildrenSortingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BottomNavBar = () => {
  const { pathname } = useLocation();
  const NAV_VISIBLE_PATH = [
    PathName.HOME,
    PathName.CHANNELS,
    PathName.PROFILE,
    PathName.SEARCH,
    PathName.CHATS,
    PathName.NOTIFICATIONS,
    PathName.POSTDETAIL,
    PathName.TEST,
  ];

  const currentPath = useMemo(() => "/" + pathname.split("/")[1], [pathname]);
  const isShow = useMemo(
    () => NAV_VISIBLE_PATH.includes(currentPath),
    [currentPath]
  );

  const theme = useTheme();
  const navigate = useNavigate();

  const handleIconClick = useCallback(
    (path: string) => {
      if (path !== pathname) {
        navigate(path);
      }
    },
    [pathname]
  );

  if (!isShow) {
    return null;
  }
  return (
    <BottomNavBarWrapper>
      <IconWrapper>
        <Button
          variant="flat"
          useRipple={true}
          rippleColor={theme.symbol_color}
          onClickHandler={() => handleIconClick(PathName.HOME)}
          style={ButtonChildrenSortingStyle}
        >
          {
            <Icon
              name={HOME_ICON}
              color={currentPath === PathName.HOME ? theme.symbol_color : ""}
              weight={currentPath === PathName.HOME ? 300 : 250}
            />
          }
        </Button>
      </IconWrapper>
      <IconWrapper>
        <Button
          variant="flat"
          useRipple={true}
          rippleColor={theme.symbol_color}
          onClickHandler={() => handleIconClick(PathName.SEARCH)}
          style={ButtonChildrenSortingStyle}
        >
          {
            <Icon
              name={SEARCH_ICON}
              color={currentPath === PathName.SEARCH ? theme.symbol_color : ""}
              weight={currentPath === PathName.SEARCH ? 300 : 250}
            />
          }
        </Button>
      </IconWrapper>
      <IconWrapper>
        <Button
          variant="flat"
          useRipple={true}
          rippleColor={theme.symbol_color}
          onClickHandler={() => handleIconClick(PathName.CHANNELS)}
          style={ButtonChildrenSortingStyle}
        >
          {
            <Icon
              name={CHANNEL_ICON}
              color={
                currentPath === PathName.CHANNELS ? theme.symbol_color : ""
              }
              weight={currentPath === PathName.CHANNELS ? 300 : 250}
            />
          }
        </Button>
      </IconWrapper>
      <IconWrapper>
        <Button
          variant="flat"
          useRipple={true}
          rippleColor={theme.symbol_color}
          onClickHandler={() => handleIconClick(PathName.PROFILE)}
          style={ButtonChildrenSortingStyle}
        >
          {
            <Icon
              name={USER_ICON}
              color={currentPath === PathName.PROFILE ? theme.symbol_color : ""}
              weight={currentPath === PathName.PROFILE ? 300 : 250}
            />
          }
        </Button>
      </IconWrapper>
    </BottomNavBarWrapper>
  );
};

export default BottomNavBar;
