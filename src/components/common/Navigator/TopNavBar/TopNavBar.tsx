import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import Icon from "../../Icon/Icon";
import { CHAT_ICON, NOTIFICATIONS_ICON } from "@/constants/icons";
import { PathName } from "@/constants/pathNameConstants";
import LogoImage from "./LogoImage";
import BackButton from "./BackButton";
import SearchBar from "./SearchBar";
import ChatAvatars from "./ChatAvatars";
import PageTitle from "./PageTitle";
import { Button } from "../..";

const LEFT_PARTITION_WIDTH = "20%";
const CENTER_PARTITION_WIDTH = "60%";
const RIGHT_PARTITION_WIDTH = "20%";

const TopNavBarWrapper = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  max-width: ${APP_MAX_WIDTH}px;
  width: 100%;
  height: 3rem;
  background-color: white;
`;

const NavBarPartition = styled.div<{ $width: string }>`
  /* border: 1px solid black; */
  width: ${({ $width }) => $width && $width};
`;

const IconsBox = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto 0;
  /* margin-left: 1rem; */
  & > :first-child {
    padding-top: 3%;
  }
`;

const IconWrapper = styled.div`
  /* border: 1px solid black; */
  margin: auto 4%;
  & > :first-child {
    cursor: pointer;
  }
`;

const NAV_VISIBLE_PATH = [
  PathName.HOME,
  PathName.CHANNELS,
  PathName.PROFILE,
  PathName.SEARCH,
  PathName.CHATS,
  PathName.CHAT,
  PathName.NOTIFICATIONS,
  PathName.POSTDETAIL,
  PathName.TEST,
];

const NavTitle = {
  CHANNELS: "채널 목록",
  PROFILE: "프로필",
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

  console.log(currentPath);
  const theme = useTheme();
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
        </NavBarPartition>
        <NavBarPartition $width={RIGHT_PARTITION_WIDTH}>
          {currentPath === PathName.HOME && (
            <IconsBox>
              <IconWrapper onClick={() => handleIconClick(PathName.CHATS)}>
                <Icon name={CHAT_ICON} size="1.6rem" weight={250}></Icon>
              </IconWrapper>
              <IconWrapper
                onClick={() => handleIconClick(PathName.NOTIFICATIONS)}
              >
                <Icon
                  name={NOTIFICATIONS_ICON}
                  size="1.7rem"
                  weight={250}
                ></Icon>
              </IconWrapper>
            </IconsBox>
          )}
        </NavBarPartition>
      </TopNavBarWrapper>
    )
  );
};

export default TopNavBar;
