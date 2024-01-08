import { NAV_HEIGHT } from "@/constants/uiConstants";
import { Col, Row } from "@/styles/GlobalStyle";
import { styled, useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ICON_SIZE, ICON_SIZE_SMALL } from "./ProfilePage.const";
import Buttons, { IButtonProps } from "./Buttons";
import { Avatar, Button, Icon } from "@/components/common";

const Profile = styled(Col)`
  height: calc(100vh - ${NAV_HEIGHT * 2}rem);
  padding: 1rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://picsum.photos/1500");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ButtonsWrap = styled(Row)`
  &.me {
    justify-content: flex-end;
    &:after {
      content: "";
    }
  }
  &.others {
  }
`;

const InfoWrap = styled(Col)`
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-bottom: 1rem;
`;

const buttonStyle: IButtonProps["style"] = {
  variant: "neumorp",
  width: ICON_SIZE,
  style: {
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    marginLeft: "0.5rem",
  },
};

const ProfileView = () => {
  const { id, profilePhoto, userName } = useMe();
  const theme = useTheme();
  const { paramsId } = useParams();
  const [IsMe, _] = useState(id === paramsId);
  const [IsFollow, setIsFollow] = useState(true);

  const navigate = useNavigate();

  return (
    <Profile>
      {IsMe && (
        <ButtonsWrap className="me">
          <Buttons style={buttonStyle}>
            <Icon name="Password" size={ICON_SIZE_SMALL} />
            <Icon name="Password" size={ICON_SIZE_SMALL} />
            <Icon name="Password" size={ICON_SIZE_SMALL} />
          </Buttons>
        </ButtonsWrap>
      )}
      <InfoWrap>
        <Avatar src={profilePhoto ?? undefined} size="XL"></Avatar>
        <div style={{ color: theme?.white_primary, paddingTop: "1rem" }}>
          test@gmail.com
        </div>
        <span style={{ padding: "0.5rem 0" }}>{userName}</span>
        {/* 닉네임 수정 버튼 */}
        {IsMe && (
          <ButtonsWrap className="me">
            <Button
              width={ICON_SIZE_SMALL}
              variant="neumorp"
              style={{
                height: ICON_SIZE_SMALL,
                borderRadius: ICON_SIZE_SMALL / 2,
              }}
            >
              <Icon name="Edit" size={ICON_SIZE_SMALL} />
            </Button>
          </ButtonsWrap>
        )}
        {!IsMe && (
          <ButtonsWrap className="others">
            <Buttons style={buttonStyle}>
              <Icon
                name="chat_bubble"
                onClick={() => navigate(`/chat/${paramsId}`)}
              />
              <Icon
                name={!IsFollow ? "person_add" : "person_check"}
                // 확인하기
                color={IsFollow ? "#FB6060" : undefined}
                onClick={() => setIsFollow(!IsFollow)}
              />
            </Buttons>
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
