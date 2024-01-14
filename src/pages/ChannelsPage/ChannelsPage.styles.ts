import styled from "styled-components";

export const ContainDiv = styled.div`
  padding-bottom: 3rem;
  box-sizing: border-box;
`;

export const ChannelStyle = styled.div`
  box-sizing: border-box;
  margin: 1rem 0;
  font-size: 2rem;
  font-style: italic;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
