import styled from "styled-components";
import { Col, Row } from "@/styles/GlobalStyle";
import { NAV_HEIGHT } from "@/constants/uiConstants";

export const SearchWrap = styled(Col)`
  height: 100vh;
  border: 1px solid black;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const SearchViewWrap = styled.div`
  flex-grow: 1;
`;

export const SearchTabWrap = styled(Row)`
  margin-top: 1rem;
  height: ${`${NAV_HEIGHT - 1}rem`};
`;

export const SearchTab = styled.div`
  background-color: ${({ theme }) => theme.gray_200};
  flex-grow: 1;
  text-align: center;
  line-height: ${`${NAV_HEIGHT - 1}rem`};
  cursor: pointer;
  &:first-of-type {
    border-right: 2px solid ${({ theme }) => theme.white_primary};
  }
`;

export const InputWrap = styled(Row)`
  margin-top: 1rem;
  height: ${`{NAV_HEIGHT}rem`};
  align-items: center;
  flex-grow: 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.gray_300};
  border-radius: 1rem;
  box-sizing: border-box;
`;
