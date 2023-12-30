import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import { Input } from "..";

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
  border: 1px solid black;
`;

const LogoImage = styled.img`
  margin: auto auto;
  width: 60%;
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
  return (
    showNavBar && (
      <TopNavBarWrapper>
        <NavBarPartition style={{ width: LEFT_PARTITION_WIDTH }}>
          {currentPath === "/home" && <LogoImage src="logo.png" alt="logo" />}
        </NavBarPartition>
        <NavBarPartition
          style={{ width: CENTER_PARTITION_WIDTH }}
        ></NavBarPartition>
        <NavBarPartition
          style={{ width: RIGHT_PARTITION_WIDTH }}
        ></NavBarPartition>
      </TopNavBarWrapper>
    )
  );
};

export default TopNavBar;
