import styled from "styled-components";
import tw from "twin.macro";

export const CardWrapper = styled.li`
  ${tw`flex flex-row space-x-2 w-full`}

  & em {
    font-style: none;
  }
`;
