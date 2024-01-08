import { useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useEffect, useState } from "react";
import { ICON_SIZE, ICON_SIZE_SMALL } from "./ProfilePage.const";
import Buttons, { IButtonProps } from "./Buttons";
import { Avatar, Button } from "@/components/common";
import { ButtonsWrap, InfoWrap, Profile } from "./ProfilePage.style";
import Icon from "@/components/common/Icon/Icon";
import { IUser } from "@/types";

interface IProfileProps {
  userInfo: IUser;
  onClickChat: (paramsId: string) => void;
  [key: string]: any;
}

const buttonStyle: IButtonProps["style"] = {
  variant: "neumorp",
  width: ICON_SIZE,
  style: {
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    marginLeft: "0.5rem",
  },
};

const ProfileView = ({
  userInfo,
  onClickChat,
  ...props
}: IProfileProps) => {
  const { _id, email, fullName } = userInfo;
  const { id, profilePhoto } = useMe();
  const [IsMe, setIsMe] = useState(id === _id);
  const [IsFollow, setIsFollow] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    setIsMe(id === _id);
  }, [_id]);

  return (
    <Profile>
      {IsMe && (
        <ButtonsWrap className="me">
          <Buttons style={buttonStyle}>
            <Icon
              name="Password"
              size={ICON_SIZE_SMALL}
            />
          </Buttons>
        </ButtonsWrap>
      )}
      <InfoWrap {...props}>
        <Avatar src={profilePhoto ?? undefined} size="XL"></Avatar>
        <div style={{ color: theme.white_primary, paddingTop: "1rem" }}>
          {email}
        </div>
        <span style={{ color: theme.white_primary, padding: "0.5rem 0" }}>
          {fullName}
        </span>
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
              <Icon name="chat_bubble" onClick={() => onClickChat(_id)} />
              <Icon
                name={!IsFollow ? "person_add" : "person_check"}
                // 확인하기
                color={IsFollow ? theme.symbol_color : undefined}
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
