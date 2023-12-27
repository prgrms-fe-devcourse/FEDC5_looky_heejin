import { BORDER_TINE_WIDTH } from "@/constants/uiConstants";
import styled, { css } from "styled-components";
import tw from "twin.macro";

const ButtonBaseWrapper = styled.button<any>`
  position: relative;
  overflow: hidden;
  width: 100%;

  & .ripple > span {
    background-color: ${props =>
      props.$rippleColor ? props.$rippleColor : props.theme.white_primary + 40};
  }
`;

export const Symbol = styled(ButtonBaseWrapper)<any>`
  background: linear-gradient(
    45deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symobl_secondary_color}
  );

  & > span {
    color: ${props => props.theme.white_primary};
  }
`;

export const Flat = styled(ButtonBaseWrapper)<any>`
  background-color: ${props =>
    props.$buttonColor ? props.$buttonColor : "trasnparent"};

  & > span {
    color: ${props =>
      props.$textColor ? props.$textColor : props.theme.text_primary_color};
  }

  ${tw`transition duration-100`}
`;

export const Neumo = styled(ButtonBaseWrapper)<any>`
  color: ${props =>
    props.$textColor ? props.$textColor : props.theme.text_primary_color};

  ${tw`flex justify-center items-center shadow-md hover:shadow-inner transition-shadow`}
`;

export const Disabled = styled(ButtonBaseWrapper)`
  background-color: ${props => props.theme.transparent_10};
  & > span {
    color: ${props => props.theme.gray_500};
  }
`;

export const ButtonRipple = styled.span``;
