import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH, NAVIGATER, NAV_HEIGHT } from "@/constants/uiConstants";
import { PathName } from "@/constants/pathNameConstants";
import {
  BackButton,
  ChatAvatars,
  ChatNotificationIconsBox,
  LogoImage,
  SearchBar,
  PageTitle,
} from "./index";

const LEFT_PARTITION_WIDTH = "20%";
const CENTER_PARTITION_WIDTH = "60%";
const RIGHT_PARTITION_WIDTH = "20%";

const TopNavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${NAV_HEIGHT}rem;
  max-width: ${APP_MAX_WIDTH}px;
  background-color: ${({ theme }) => theme.background_color};
  border-bottom: ${({ theme }) => `1px solid ${theme.transparent_50}`};
  z-index: ${NAVIGATER};
`;

const NavBarPartition = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width && $width};
`;

const NAV_VISIBLE_PATH = [
  PathName.HOME,
  PathName.CHANNELS,
  PathName.PROFILE,
  PathName.SEARCH,
  PathName.CHATS,
  PathName.CHAT,
  PathName.NOTIFICATIONS,
  PathName.NEWPOST,
  PathName.POSTDETAIL,
  PathName.TEST,
];

const NavTitle = {
  CHANNELS: "채널 목록",
  PROFILE: "프로필",
  NEWPOST: "새 포스트 생성",
  NOTIFICATIONS: "알림",
  CHATS: "대화 목록",
};

const TopNavBar = () => {
  const { pathname } = useLocation();

  const currentPath = useMemo(() => "/" + pathname.split("/")[1], [pathname]);
  const showNavBar = useMemo(
    () => NAV_VISIBLE_PATH.includes(currentPath),
    [currentPath]
  );

  const navigate = useNavigate();

  const handleIconClick = useCallback(
    (path: string) => {
      if (path !== pathname || path === PathName.HOME) {
        navigate(path);
      }
    },
    [pathname]
  );

  const handleBackClick = () => {
    navigate(-1);
  };

  // DUMMY_DATA --> 데이터 붙여야함
  const myAvatarSrc = "https://picsum.photos/100";
  const partnerAvatarSrc = "https://picsum.photos/200";
  const parterName = "누군가";

  return (
    showNavBar && (
      <TopNavBarWrapper>
        <NavBarPartition $width={LEFT_PARTITION_WIDTH}>
          {currentPath === PathName.HOME ? (
            <LogoImage onClick={() => handleIconClick(PathName.HOME)} />
          ) : (
            <BackButton onClick={handleBackClick} />
          )}
        </NavBarPartition>
        <NavBarPartition $width={CENTER_PARTITION_WIDTH}>
          {currentPath === PathName.HOME && (
            <PageTitle title="빈티지"></PageTitle> // 데이터 붙여야함
          )}
          {currentPath === PathName.SEARCH && <SearchBar />}
          {currentPath === PathName.CHAT && (
            <ChatAvatars
              myAvatarSrc={myAvatarSrc}
              partnerAvatarSrc={partnerAvatarSrc}
              partnerName={parterName}
            />
          )}
          {currentPath === PathName.CHANNELS && (
            <PageTitle title={NavTitle.CHANNELS}></PageTitle>
          )}
          {currentPath === PathName.PROFILE && (
            <PageTitle title={NavTitle.PROFILE}></PageTitle>
          )}
          {currentPath === PathName.CHATS && (
            <PageTitle title={NavTitle.CHATS}></PageTitle>
          )}
          {currentPath === PathName.NOTIFICATIONS && (
            <PageTitle title={NavTitle.NOTIFICATIONS}></PageTitle>
          )}
          {currentPath === PathName.POSTDETAIL && (
            <PageTitle title="포스트 디테일"></PageTitle> // 데이터 붙여야 함
          )}
          {currentPath === PathName.NEWPOST && (
            <PageTitle title={NavTitle.NEWPOST}></PageTitle> // 데이터 붙여야 함
          )}
        </NavBarPartition>
        <NavBarPartition $width={RIGHT_PARTITION_WIDTH}>
          {currentPath === PathName.HOME && (
            <ChatNotificationIconsBox
              onClick={handleIconClick}
            ></ChatNotificationIconsBox>
          )}
        </NavBarPartition>
      </TopNavBarWrapper>
    )
  );
};

export default TopNavBar;
