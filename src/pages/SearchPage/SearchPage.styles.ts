import styled from "styled-components";
import { Col, Row } from "@/styles/GlobalStyle";
import { NAV_HEIGHT } from "@/constants/uiConstants";

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
