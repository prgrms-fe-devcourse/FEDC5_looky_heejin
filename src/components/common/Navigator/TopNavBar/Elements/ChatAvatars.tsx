import { useNavigate } from "react-router-dom";
import { Avatar } from "../../..";
import { styled } from "styled-components";

interface IChatAvatarsProps {
  myAvatarSrc: string | undefined;
  partnerId: string | null;
  partnerAvatarSrc: string | undefined;
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
  & :hover {
    cursor: pointer;
  }
`;

const PartnerAvatarWrapper = styled.div`
  z-index: 99;
  & :first-child {
    margin-right: -0.8rem;
  }
  & :hover {
    cursor: pointer;
  }
`;

const PartnerName = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  margin: 0.15rem auto 0 auto;

  cursor: pointer;
`;

const ChatAvatars = ({
  myAvatarSrc,
  partnerId,
  partnerAvatarSrc,
  partnerName,
}: IChatAvatarsProps) => {
  const navigate = useNavigate();

  const handlePartnerAvatar = (partnerId: string | null) => {
    navigate(`/profile/${partnerId}`);
  };

  return (
    <ChatAvatarsWrapper onClick={() => handlePartnerAvatar(partnerId)}>
      <AvatarsWrapper>
        <PartnerAvatarWrapper>
          <Avatar size="XXS" shape="circle" src={partnerAvatarSrc} />
        </PartnerAvatarWrapper>
        <Avatar size="XXS" shape="circle" src={myAvatarSrc} />
      </AvatarsWrapper>
      <PartnerName>{partnerName}</PartnerName>
    </ChatAvatarsWrapper>
  );
};

export default ChatAvatars;
