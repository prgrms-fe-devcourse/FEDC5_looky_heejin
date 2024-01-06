import styled, { css } from "styled-components";

const TooltipWrapper = styled.div<{
  $direction: string;
  $clicked?: boolean;
  $tooltip: string;
}>`
  position: relative;
  z-index: 2;

  &:before,
  &:after {
    ${({ $clicked }) => {
      if ($clicked) {
        return css`
          visibility: visible;
          opacity: 1;
        `;
      } else {
        return css`
          visibility: hidden;
          opacity: 0;
        `;
      }
    }}
    position: absolute;
    ${({ $direction }) => {
      if ($direction !== "left") {
        return css`
          left: 50%;
          transform: translateX(-50%);
        `;
      }
    }}
    white-space: nowrap;
    /* transition: all 0.2s ease; */
    font-size: 20px;
  }

  &:before {
    content: attr(data-tooltip);
    height: auto;
    position: absolute;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 550;
    color: ${props => props.theme.white_primary};
    background: ${props => props.theme.symbol_color};
  }

  &:after {
    content: "";
  }

  ${({ $direction }) => {
    switch ($direction) {
      case "top":
        return css`
          &:before {
            bottom: calc(100% + 14px);
          }
          &:after {
            border-left: 10px solid transparent;
            bottom: calc(100% + 4px);
            border-right: 10px solid transparent;
            border-top: 10px solid ${props => props.theme.symbol_color};
          }
        `;
      case "right":
        return css`
          &:before {
            top: 50%;
            transform: translateY(-50%);
            left: calc(100% + 14px);
          }
          &:after {
            top: 50%;
            left: calc(100% + 4px);
            transform: translateY(-50%) rotate(180deg);
            border-top: 10px solid transparent;
            border-left: 10px solid ${props => props.theme.symbol_color};
            border-bottom: 10px solid transparent;
          }
        `;
      case "bottom":
        return css`
          &:before {
            top: calc(100% + 14px);
          }
          &:after {
            border-left: 10px solid transparent;
            top: calc(100% + 4px);
            border-right: 10px solid transparent;
            border-bottom: 10px solid ${props => props.theme.symbol_color};
          }
        `;
      case "left":
        return css`
          &:before {
            top: 50%;
            transform: translateY(-50%);
            right: calc(100% + 14px);
          }
          &:after {
            top: 50%;
            right: calc(100% + 4px);
            transform: translateY(-50%) rotate(180deg);
            border-top: 10px solid transparent;
            border-right: 10px solid ${props => props.theme.symbol_color};
            border-bottom: 10px solid transparent;
          }
        `;
      default:
        return null;
    }
  }}

  &:focus-within:before,
  &:focus-within:after {
    ${({ $tooltip }) => {
      if ($tooltip === "") {
        return css`
          visibility: hidden;
          opacity: 0;
        `;
      } else {
        return css`
          visibility: visible;
          opacity: 1;
        `;
      }
    }}
  }
`;

export default TooltipWrapper;
