import styled from "styled-components";
import tw from "twin.macro";

export const Tag = styled.i<any>`
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  background: linear-gradient(
    45deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  transform: translateX(-50%) translateY(-50%);

  ${tw`absolute w-3 h-3 rounded-full`};
`;
