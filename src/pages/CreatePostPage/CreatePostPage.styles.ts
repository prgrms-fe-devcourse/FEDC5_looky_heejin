import {
  BORDER_TINE_WIDTH,
  CONTAINER_PADDING_VERTICAL,
} from "@/constants/uiConstants";
import styled from "styled-components";
import tw from "twin.macro";

export const CreatePostPageContainer = styled.div`
  padding-top: ${CONTAINER_PADDING_VERTICAL}rem;
  padding-bottom: ${CONTAINER_PADDING_VERTICAL}rem;

  ${tw`relative w-full`}
`;

export const UploadSection = styled.section`
  position: relative;

  ${tw`w-[80%] aspect-10/16`};
`;

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

export const InputWrapper = styled.div`
  ${tw`space-y-2 mb-3`}
`;

export const TextArea = styled.textarea`
  appearance: none;
  box-sizing: border-box;
  background-color: ${props => props.theme.white_primary + 30};
  color: ${props => props.theme.text_primary_color};
  border-width: ${BORDER_TINE_WIDTH}px;
  border-color: ${props => props.theme.transparent_30};
  line-height: 1.5rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.symbol_color};
  }
  &:focus-visible {
    box-shadow: none;
  }

  ${tw`w-full px-4 py-3 mb-4 rounded-md shadow`}
`;

export const ChannelTag = styled.div`
  background-color: ${props => props.theme.symbol_color};
  color: ${props => props.theme.white_primary};

  ${tw`px-2 py-1 rounded-md text-sm`};
`;
