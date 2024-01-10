import { useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useEffect, useState } from "react";
import { ICON_SIZE, ICON_SIZE_SMALL } from "../ProfilePage.const";
import { Avatar, Button } from "@/components/common";
import { ButtonSet } from "@/components";
import {
  AvatarWrap,
  ButtonsWrap,
  InfoWrap,
  Profile,
} from "../ProfilePage.style";
import Icon from "@/components/common/Icon/Icon";
import { IUser } from "@/types";
import { IButtonProps } from "@/components/ButtonSet";

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
  const { _id, email, fullName, image, coverImage } = userInfo;
  const { id } = useMe();
  const [isMe, setIsMe] = useState(id === _id);

  const theme = useTheme();

  useEffect(() => {
    setIsMe(id === _id);
  }, [_id]);

  return (
    <Profile
      isme={isMe.toString()}
      coverImage={coverImage ?? ""}
      onClick={e => {
        isMe ? onClickCover(e) : null;
      }}
    >
      {isMe && (
        <ButtonsWrap className="me">
          <ButtonSet style={buttonStyle}>
            <Icon
              name="Password"
              size={ICON_SIZE_SMALL}
              onClick={onClickPassword}
            />
          </ButtonSet>
        </ButtonsWrap>
      )}
      <InfoWrap {...props}>
        <AvatarWrap
          isme={isMe.toString()}
          onClick={e => {
            isMe ? onClickAvatar(e) : null;
          }}
        >
          <Avatar src={image ?? ""} size="XL" />
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
            <ButtonSet style={buttonStyle}>
              <Icon name="chat_bubble" onClick={e => onClickChat(e, _id)} />
              <Icon
                name={!isFollow ? "person_add" : "person_check"}
                color={isFollow ? theme.symbol_color : undefined}
                onClick={onClickFollow}
              />
            </ButtonSet>
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
