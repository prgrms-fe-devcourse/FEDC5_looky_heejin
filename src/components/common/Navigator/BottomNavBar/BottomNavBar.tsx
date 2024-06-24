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
import {
  APP_MAX_WIDTH,
  BORDER_TINE_WIDTH,
  NAVIGATER,
  NAV_HEIGHT,
} from "@/constants/uiConstants";
import { PathName } from "@/constants/pathNameConstants";
import { Avatar, Button } from "../..";
import { useMe } from "@/hooks/useMe";
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
  border-top: ${({ theme }) =>
    `${BORDER_TINE_WIDTH}px solid ${theme.transparent_50}`};
  z-index: ${NAVIGATER};
`;
const IconWrapper = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${({ theme }) => theme.transparent_30};
    cursor: pointer;
  }
`;

const ButtonChildrenSortingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BottomNavBar = () => {
  const { id, profilePhoto } = useMe();
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
          onClickHandler={() => handleIconClick(PathName.HOME)}
          style={ButtonChildrenSortingStyle}
          aria-label="홈 화면으로 가기"
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
          onClickHandler={() => handleIconClick(PathName.SEARCH)}
          style={ButtonChildrenSortingStyle}
          aria-label="검색 화면으로 가기"
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
      {id ? (
        <IconWrapper>
          <Button
            variant="flat"
            useRipple={true}
            onClickHandler={() => handleIconClick(PathName.NEWPOST)}
            style={ButtonChildrenSortingStyle}
            aria-label="포스팅 생성 화면으로 가기"
          >
            {
              <Icon
                name={ADD_BOX_ICON}
                color={
                  currentPath === PathName.NEWPOST ? theme.symbol_color : ""
                }
                weight={currentPath === PathName.NEWPOST ? 300 : 250}
              />
            }
          </Button>
        </IconWrapper>
      ) : null}
      <IconWrapper>
        <Button
          variant="flat"
          useRipple={true}
          onClickHandler={() => handleIconClick(PathName.CHANNELS)}
          style={ButtonChildrenSortingStyle}
          aria-label="채널 선택 화면으로 가기"
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
          onClickHandler={
            id
              ? () => handleIconClick(`${PathName.PROFILE}/${id}`)
              : () => handleIconClick(`login`)
          }
          style={ButtonChildrenSortingStyle}
          aria-label={id ? `내 프로필 화면으로 가기` : `로그인 화면으로 가기`}
        >
          {id ? (
            <Avatar size="XS" src={profilePhoto ? profilePhoto : ""} />
          ) : (
            <Avatar size="XS" />
          )}
        </Button>
      </IconWrapper>
    </BottomNavBarWrapper>
  );
};

export default BottomNavBar;
