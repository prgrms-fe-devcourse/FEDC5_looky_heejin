import styled from "styled-components";

import { Col, Row } from "@/styles/GlobalStyle";
import {
  BORDER_BASE_WIDTH,
  NAV_HEIGHT,
  SEARCH_BAR,
} from "@/constants/uiConstants";
import { VIEW_HEIGHT } from "./SearchPage.const";

// SearchPage
export const SearchWrap = styled(Col)`
  position: relative;
  height: 100vh;
  justify-content: space-between;
`;

export const SearchViewWrap = styled.div`
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const SearchBarWrap = styled(Row)`
  position: absolute;
  top: -${NAV_HEIGHT}rem;
  width: 100%;
  z-index: ${SEARCH_BAR};
`;

export const IconWrap = styled.div`
  display: inline-flex;
  width: 50px;
  height: 50px;
  padding-left: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
`;

//SearchBar;
export const Form = styled.form`
  flex-grow: 1;
  align-self: center;
  padding-right: 0.5rem;
`;

export const InputWrap = styled(Row)`
  margin: 1rem;
  height: ${`${NAV_HEIGHT}rem`};
  flex-grow: 0;
`;

export const Input = styled.input`
  width: 100%;
  color: ${props => props.theme.text_primary_color};
  background-color: ${props => props.theme.container_color};
  padding: 0.5rem;
  box-sizing: border-box;
  padding-left: 5px;
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  border-radius: 0.5rem;
`;

// SearchRecentView
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

// SearchResultsView
export const ViewWrap = styled(Col)`
  flex-basis: calc(${VIEW_HEIGHT});
`;

// SearchUsersView
export const ListWrap = styled.div`
  flex-grow: 1;
`;

export const ListItem = styled(Row)`
  margin-top: 1rem;
  padding: 0.7rem;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.gray_200};
  }
`;

export const UserInfo = styled(Col)`
  flex-grow: 1;
  padding-left: 0.5rem;
  height: 100%;
  justify-content: center;
`;

// SearchPostView
export const PostWrap = styled(Row)`
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const Post = styled.div<{ src: string }>`
  width: calc(50% - 0.2rem);
  height: 265px;
  margin-top: 0.5rem;
  border-radius: 5px;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  cursor: pointer;
  &:hover {
    filter: brightness(85%);
  }
`;

export const PostInfo = styled.div`
  height: 50px;
`;

// SearchEmptyView
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
  background-color: ${props => props.theme.gray_200};
  margin-right: 0.7rem;
  &:hover {
    background-color: ${props => props.theme.gray_300};
    cursor: pointer;
  }
`;
