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
  z-index: 99;
  & :first-child {
    margin-right: -0.8rem;
  }
`;

const PartnerName = styled.span`
  font-size: 0.5rem;
  font-weight: 500;
  margin: 0.15rem auto 0 auto;
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
          <Avatar size="XS" shape="circle" src={partnerAvatarSrc} />
        </AvatarWrapper>
        <Avatar size="XS" shape="circle" src={myAvatarSrc} />
      </AvatarsWrapper>
      <PartnerName>{partnerName}</PartnerName>
    </ChatAvatarsWrapper>
  );
};

export default ChatAvatars;
