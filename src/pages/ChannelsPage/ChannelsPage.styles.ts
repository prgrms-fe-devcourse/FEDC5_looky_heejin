import styled from "styled-components";

export const ChannelStyle = styled.div`
  box-sizing: border-box;
  margin: 2rem 1rem;
  padding: 1rem 0;
  font-size: 2rem;
  font-style: italic;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    outline: none;
    border: 1px solid ${props => props.theme.symbol_color};
  }
`;
