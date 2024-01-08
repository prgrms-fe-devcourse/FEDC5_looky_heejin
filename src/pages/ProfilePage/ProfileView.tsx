import { useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useEffect, useState } from "react";
import { ICON_SIZE, ICON_SIZE_SMALL } from "./ProfilePage.const";
import Buttons, { IButtonProps } from "./Buttons";
import { Avatar, Button } from "@/components/common";
import {
  AvatarWrap,
  ButtonsWrap,
  InfoWrap,
  Profile,
} from "./ProfilePage.style";
import Icon from "@/components/common/Icon/Icon";
import { IUser } from "@/types";

interface IProfileProps {
  userInfo: IUser;
  isFollow: boolean;
  onClickPassword: (e: React.MouseEvent) => void;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickAvatar: (e: React.MouseEvent) => void;
  onClickCover: (e: React.MouseEvent) => void;
  onClickChat: (e: React.MouseEvent, paramsId: string) => void;
  onClickFollow: (e: React.MouseEvent) => void;
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
  isFollow,
  onClickPassword,
  onClickEdit,
  onClickAvatar,
  onClickCover,
  onClickChat,
  onClickFollow,
  ...props
}: IProfileProps) => {
  const { _id, email, fullName } = userInfo;
  const { id, profilePhoto } = useMe();
  const [isMe, setIsMe] = useState(id === _id);

  const theme = useTheme();

  useEffect(() => {
    setIsMe(id === _id);
  }, [_id]);

  return (
    <Profile isMe={isMe} onClick={onClickCover}>
      {isMe && (
        <ButtonsWrap className="me">
          <Buttons style={buttonStyle}>
            <Icon
              name="Password"
              size={ICON_SIZE_SMALL}
              onClick={onClickPassword}
            />
          </Buttons>
        </ButtonsWrap>
      )}
      <InfoWrap {...props}>
        <AvatarWrap isMe={isMe} onClick={onClickAvatar}>
          <Avatar src={profilePhoto ?? undefined} size="XL" />
        </AvatarWrap>
        <div style={{ color: theme.white_primary, paddingTop: "1rem" }}>
          {email}
        </div>
        <span style={{ color: theme.white_primary, padding: "0.5rem 0" }}>
          {fullName}
        </span>
        {/* 닉네임 수정 버튼 */}
        {isMe && (
          <ButtonsWrap className="me">
            <Button
              width={ICON_SIZE_SMALL}
              variant="neumorp"
              style={{
                height: ICON_SIZE_SMALL,
                borderRadius: ICON_SIZE_SMALL / 2,
              }}
            >
              <Icon
                name="Edit"
                color={theme.background_color}
                size={ICON_SIZE_SMALL}
                onClick={onClickEdit}
              />
            </Button>
          </ButtonsWrap>
        )}
        {!isMe && (
          <ButtonsWrap className="others">
            <Buttons style={buttonStyle}>
              <Icon name="chat_bubble" onClick={e => onClickChat(e, _id)} />
              <Icon
                name={!isFollow ? "person_add" : "person_check"}
                color={isFollow ? theme.symbol_color : undefined}
                onClick={onClickFollow}
              />
            </Buttons>
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
