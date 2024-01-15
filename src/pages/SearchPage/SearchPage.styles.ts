import styled from "styled-components";

import { Col, Row } from "@/styles/GlobalStyle";
import {
  BORDER_BASE_WIDTH,
  NAV_HEIGHT,
  SEARCH_BAR,
} from "@/constants/uiConstants";
import { VIEW_HEIGHT } from "./SearchPage.const";

export const SearchWrap = styled(Col)`
  position: relative;
  justify-content: space-between;
`;

export const SearchViewWrap = styled.div`
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: ${NAV_HEIGHT}rem;
`;

export const SearchBarWrap = styled(Row)`
  position: absolute;
  top: -${NAV_HEIGHT}rem;
  width: 100%;
  z-index: ${SEARCH_BAR};
  background-color: ${({ theme }) => theme.background_color};
  border-bottom: ${({ theme }) => `1px solid ${theme.transparent_50}`};
`;

export const SearchIconWrap = styled.div`
  position: absolute;
  top: 0.9rem;
  right: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const BackIconWrap = styled.div`
  display: inline-flex;
  width: 59px;
  height: ${NAV_HEIGHT}rem;
  padding-left: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
`;

export const Form = styled.form`
  flex-grow: 1;
  align-self: center;
  padding-right: 0.5rem;
`;

export const InputWrap = styled(Row)`
  background-color: peru;
  margin: 1rem;
  height: ${`${NAV_HEIGHT}rem`};
  flex-grow: 0;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  color: ${props => props.theme.text_primary_color};
  background-color: ${props => props.theme.container_color};
  padding: 0.5rem;
  padding-right: 2rem;
  box-sizing: border-box;
  padding-left: 1rem;
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  border-radius: ${NAV_HEIGHT / 2}rem;
`;

export const LiContainer = styled.li`
  width: 300px;
  color: ${props => props.theme.gray_500};
  &:hover:not(.empty) {
    filter: brightness(50%);
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const ViewWrap = styled(Col)`
  flex-basis: calc(${VIEW_HEIGHT});
`;

export const ListWrap = styled.div`
  flex-grow: 1;
  padding-top: 1rem;
`;

export const ListItem = styled(Row)`
  padding: 0.7rem;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.transparent_30};
  }
`;

export const UserInfo = styled(Col)`
  flex-grow: 1;
  padding-left: 0.5rem;
  height: 100%;
  justify-content: center;
`;

export const PostWrap = styled(Row)`
  flex-grow: 1;
  padding-top: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const Wrapper = styled(Col)`
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  margin-bottom: 1rem;
  &:first-child {
    margin-bottom: 2rem;
  }
`;

export const TagWrap = styled(Row)`
  justify-content: center;
`;

export const Tag = styled.div`
  padding: 0.2rem 1rem;
  border-radius: 15rem;
  background-color: ${props =>
    props.theme.theme_mode === "light"
      ? props.theme.transparent_30
      : props.theme.transparent_50};
  color: ${props => props.theme.text_primary_color};
  margin-right: 0.7rem;
  &:hover {
    background-color: ${props =>
      props.theme.theme_mode === "light"
        ? props.theme.transparent_50
        : props.theme.transparent_30};
    cursor: pointer;
  }
`;
