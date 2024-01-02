import { BORDER_BASE_WIDTH } from "@/constants/uiConstants";
import styled from "styled-components";
import tw from "twin.macro";

export const Tag = styled.i<any>`
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  background: linear-gradient(
    45deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  transform: translateX(-50%) translateY(-50%);

  ${tw`absolute w-3 h-3 rounded-full`};
`;

export const TextArea = styled.textarea`
  appearance: none;
  box-sizing: border-box;
  background-color: ${props => props.theme.white_primary + 30};
  color: ${props => props.theme.text_primary_color};
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  line-height: 1.5rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.symbol_color};
  }
  &:focus-visible {
    box-shadow: none;
  }

  ${tw`w-full px-4 py-3 rounded-md shadow`}
`;
