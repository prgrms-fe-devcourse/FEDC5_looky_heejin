import styled from "styled-components";
import { Col, Row } from "@/styles/GlobalStyle";

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

export const InputWrap = styled(Row)`
  margin: 1rem;
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
