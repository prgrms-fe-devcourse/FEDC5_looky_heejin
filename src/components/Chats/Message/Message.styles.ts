import styled, { css } from "styled-components";
import tw from "twin.macro";

export const MessageCard = styled.div<any>`
  direction: ${props => (props.$isMine ? "rtl" : "ltr")};
  grid-template-columns: ${props => (props.$isMine ? "1fr" : "32px 1fr")};

  ${tw`grid w-full gap-2 mx-auto`}
`;

export const MessageBody = styled.div`
  ${tw`flex flex-col items-start justify-center`}
`;

export const UserNameWrapper = styled.div`
  ${tw`flex items-center mb-2`}

  & span {
    ${tw`font-medium text-sm`}
  }
`;

export const MessageWrapper = styled.div`
  & span {
    color: ${props => props.theme.gray_500};
    ${tw`font-medium text-xs`}
  }

  ${tw`flex flex-row items-center gap-2`}
`;

export const MessageBox = styled.div<any>`
  background-color: ${props =>
    props.$isMine ? props.theme.symbol_color : props.theme.transparent_50};
  direction: ltr;

  ${tw`p-2 grid break-all rounded-lg text-sm`}

  ${props => {
    if (props.$isMine) {
      return css`
        border-top-right-radius: 0px;
        & p {
          color: ${props => props.theme.white_primary};
        }
      `;
    } else {
      return css`
        border-top-left-radius: 0px;
      `;
    }
  }}
`;
