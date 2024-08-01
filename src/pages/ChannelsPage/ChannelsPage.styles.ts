import styled from "styled-components";

export const ContainSection = styled.section`
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
  transform: scale(0.97);

  &:hover {
    transform: scale(0.98);
  }
`;
