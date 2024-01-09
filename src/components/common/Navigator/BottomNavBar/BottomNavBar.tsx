import styled, { useTheme } from "styled-components";
import Icon from "../../Icon/Icon";
import {
  ADD_BOX_ICON,
  CHANNEL_ICON,
  HOME_ICON,
  SEARCH_ICON,
} from "@/constants/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH, NAV_HEIGHT } from "@/constants/uiConstants";
import { PathName } from "@/constants/pathNameConstants";
import { Avatar, Button } from "../..";
import { useMe } from "@/hooks/useMe";
import { useQuery } from "@tanstack/react-query";
import { ME } from "@/constants/queryKey";
import { _GET } from "@/api";

const BottomNavBarWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: ${APP_MAX_WIDTH}px;
  width: 100%;
  height: ${NAV_HEIGHT}rem;
  background-color: ${({ theme }) => theme.background_color};
  border-top: ${({ theme }) => `1px solid ${theme.container_color}`};
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
  const { id } = useMe();
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

  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });
  console.log(myData);

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
          onClickHandler={() => handleIconClick(PathName.NEWPOST)}
          style={ButtonChildrenSortingStyle}
        >
          {
            <Icon
              name={ADD_BOX_ICON}
              color={currentPath === PathName.NEWPOST ? theme.symbol_color : ""}
              weight={currentPath === PathName.NEWPOST ? 300 : 250}
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
          onClickHandler={() => handleIconClick(`${PathName.PROFILE}/${id}`)}
          style={ButtonChildrenSortingStyle}
        >
          <Avatar size="XS" src={myData?.data ? myData.data.image : ""} />
        </Button>
      </IconWrapper>
    </BottomNavBarWrapper>
  );
};

export default BottomNavBar;
