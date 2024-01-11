import styled from "styled-components";

import { Col, Row } from "@/styles/GlobalStyle";
import { NAV_HEIGHT } from "@/constants/uiConstants";

// SearchPage
export const SearchWrap = styled(Col)`
  height: 100vh;
  border: 1px solid black;
  justify-content: space-between;
`;

export const SearchViewWrap = styled.div`
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const SearchBarWrap = styled(Row)``;

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

// SearchBar
export const Form = styled.form`
  flex-grow: 1;
  align-self: center;
  padding-right: 1rem;
`;

export const InputWrap = styled(Row)`
  margin: 1rem;
  height: ${`${NAV_HEIGHT}rem`};
  flex-grow: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.gray_300};
  box-sizing: border-box;
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
  flex-basis: 100vh;
`;

// SearchUsersView
export const ListWrap = styled(Col)``;

export const ListItem = styled(Row)`
  margin-top: 1rem;
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
