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
  border: 1px solid black;
  width: ${({ $width }) => $width && $width};
`;

const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto 0;
`;

const IconWrapper = styled.div`
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
  PathName.POSTDETAIL,
  PathName.TEST,
];

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

  const handleClick = useCallback(
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
            <LogoImage onClick={() => handleClick(PathName.HOME)} />
          ) : (
            <BackButton onClick={handleBackClick} />
          )}
        </NavBarPartition>
        <NavBarPartition $width={CENTER_PARTITION_WIDTH}>
          {currentPath === PathName.HOME && (
            <span style={{ margin: "auto auto" }}>channel명</span>
          )}
          {currentPath === PathName.SEARCH && <SearchBar />}
        </NavBarPartition>
        <NavBarPartition $width={RIGHT_PARTITION_WIDTH}>
          {currentPath === PathName.HOME && (
            <IconsBox>
              <IconWrapper>
                <Icon name={CHAT_ICON}></Icon>
              </IconWrapper>
              <IconWrapper>
                <Icon name={NOTIFICATIONS_ICON}></Icon>
              </IconWrapper>
            </IconsBox>
          )}
        </NavBarPartition>
      </TopNavBarWrapper>
    )
  );
};

export default TopNavBar;
