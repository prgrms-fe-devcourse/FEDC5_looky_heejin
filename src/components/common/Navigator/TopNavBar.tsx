import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";

import Icon from "../Icon/Icon";
import { Input } from "..";
import { BACK_ICON, CHAT_ICON, NOTIFICATIONS_ICON } from "@/constants/icons";

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

const NavBarPartition = styled.div`
  /* border: 1px solid black; */
`;

const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto 0;
`;

const BackIconWrapper = styled.div`
  display: inline-block;
  margin: auto 10%;
  & > :first-child {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  margin: auto 4%;
  & > :first-child {
    cursor: pointer;
  }
`;

const LogoImage = styled.img`
  width: 60%;
  margin: auto auto;
`;

const TopNavBar = () => {
  const { pathname } = useLocation();

  const NAV_VISIBLE_PATH = [
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
    () => NAV_VISIBLE_PATH.includes(currentPath),
    [currentPath]
  );

  console.log(currentPath);
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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    showNavBar && (
      <TopNavBarWrapper>
        <NavBarPartition style={{ width: LEFT_PARTITION_WIDTH }}>
          {currentPath === "/home" ? (
            <LogoImage src="logo.png" alt="logo" />
          ) : (
            <BackIconWrapper>
              <Icon name={BACK_ICON} size="2.8rem" onClick={handleBackClick} />
            </BackIconWrapper>
          )}
        </NavBarPartition>
        <NavBarPartition style={{ width: CENTER_PARTITION_WIDTH }}>
          {currentPath === "/home" ? (
            <span style={{ margin: "auto auto" }}>channel명</span>
          ) : (
            ""
          )}
          {currentPath === "/search" && <Input required={true} />}
        </NavBarPartition>
        <NavBarPartition style={{ width: RIGHT_PARTITION_WIDTH }}>
          {currentPath === "/home" && (
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
