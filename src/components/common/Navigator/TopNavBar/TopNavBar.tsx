import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import useEventQuery from "@/hooks/useEventQuery";
import { useMe } from "@/hooks/useMe";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  NEWPOST: "새 포스트 작성",
  NOTIFICATIONS: "알림",
  CHATS: "대화 목록",
};

const TopNavBar = () => {
  const [channel, _] = useLocalStorage("ViewChannelObj");
  const parsedData = channel ? JSON.parse(channel as string) : null;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { profilePhoto: myProfileImage } = useMe();
  const [partnerData, setPartnerData] = useState({
    fullName: "",
    profileImage: null,
  });

  const currentPath = useMemo(() => "/" + pathname.split("/")[1], [pathname]);
  const showNavBar = useMemo(
    () => NAV_VISIBLE_PATH.includes(currentPath),
    [currentPath]
  );

  const partnerId = pathname.split("/")[2];
  const { refetch } = useEventQuery({
    key: `partnerId-${partnerId}`,
    endPoint: `/users/${partnerId}`,
  });

  useEffect(() => {
    if (currentPath === PathName.CHAT) {
      const getPartnerData = async () => {
        const data = (await refetch()).data;
        setPartnerData({
          fullName:
            data?.data.fullName !== null ? data?.data.fullName : "상대방",
          profileImage: data?.data.image,
        });
      };
      getPartnerData();
    }
  }, [partnerId]);

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
            <PageTitle
              title={parsedData ? parsedData.name : "채널을 선택해주세요."}
            ></PageTitle>
          )}
          {currentPath === PathName.SEARCH && <SearchBar />}
          {currentPath === PathName.CHAT && (
            <ChatAvatars
              myAvatarSrc={myProfileImage || undefined}
              partnerAvatarSrc={partnerData.profileImage || undefined}
              partnerName={partnerData.fullName}
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
            <PageTitle title="포스트 디테일"></PageTitle>
          )}
          {currentPath === PathName.NEWPOST && (
            <PageTitle title={NavTitle.NEWPOST}></PageTitle>
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
