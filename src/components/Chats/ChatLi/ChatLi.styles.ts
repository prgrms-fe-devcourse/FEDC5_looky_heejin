import styled from "styled-components";
import tw from "twin.macro";

export const ChatLiWrapper = styled.li<any>`
  position: relative;
  overflow: "hidden";
  will-change: "transform";
  cursor: pointer;

  ${tw`flex flex-row w-full overflow-hidden`}
`;

export const ChatLiAvatarBox = styled.div`
  position: relative;
  padding-right: 1rem;
`;

export const OnlineIndicator = styled.div`
  background-color: ${props => props.theme.symbol_color};
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  bottom: 5%;
  right: 30%;

  ${tw`rounded-full`}
`;

export const ChatLiArticle = styled.article`
  width: 80%;

  ${tw`flex flex-col justify-center`}
`;

export const ChatLiSeenInfoBox = styled.div`
  width: 15%;

  & p {
    color: ${props => props.theme.gray_500};
    ${tw`text-xs truncate`};
  }

  ${tw`flex flex-col justify-center w-[10%] items-end`}
`;
