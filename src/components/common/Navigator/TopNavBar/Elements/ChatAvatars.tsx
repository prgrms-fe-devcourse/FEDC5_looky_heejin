import React from "react";
import { Avatar } from "../../..";
import { styled } from "styled-components";

interface IChatAvatarsProps {
  myAvatarSrc: string;
  partnerAvatarSrc: string;
  partnerName: string;
}

const ChatAvatarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

const AvatarsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto 0;
`;

const AvatarWrapper = styled.div`
  & :first-child {
    margin-right: -0.8rem;
  }
`;

const PartnerName = styled.span`
  font-size: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary_color};
  margin: 0.5% auto 0 auto;
`;

const ChatAvatars = ({
  myAvatarSrc,
  partnerAvatarSrc,
  partnerName,
}: IChatAvatarsProps) => {
  return (
    <ChatAvatarsWrapper>
      <AvatarsWrapper>
        <AvatarWrapper>
          <Avatar
            size="XS"
            shape="circle"
            src={myAvatarSrc}
            alt="내 아바타"
            style={{ width: "32px" }} // 임시값 리팩토링 필요
          />
        </AvatarWrapper>

        <Avatar
          size="XS"
          shape="circle"
          src={partnerAvatarSrc}
          alt="상대방 아바타"
          style={{ width: "32px" }} // 임시값 리팩토링 필요
        />
      </AvatarsWrapper>
      <PartnerName>{partnerName}</PartnerName>
    </ChatAvatarsWrapper>
  );
};

export default ChatAvatars;
