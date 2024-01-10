import { useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useEffect, useState } from "react";
import { ICON_SIZE, ICON_SIZE_SMALL } from "../ProfilePage.const";
import { Avatar, Button } from "@/components/common";
import { ButtonSet } from "@/components";
import { IFollow, IUnFollow } from "@/types/profile";
import {
  AvatarWrap,
  ButtonsWrap,
  InfoWrap,
  Profile,
} from "../ProfilePage.style";
import Icon from "@/components/common/Icon/Icon";
import { IUser } from "@/types";
import { IButtonProps } from "@/components/ButtonSet";
import { _GET } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { ME } from "@/constants/queryKey";
import useEventQuery from "@/hooks/useEventQuery";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/profile";
import { useUI } from "@/components/common/uiContext";

interface IProfileProps {
  userInfo: IUser;
  onClickPassword: (e: React.MouseEvent) => void;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickAvatar: (e: React.MouseEvent) => void;
  onClickCover: (e: React.MouseEvent) => void;
  onClickChat: (e: React.MouseEvent, paramsId: string) => void;
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
  onClickPassword,
  onClickEdit,
  onClickAvatar,
  onClickCover,
  onClickChat,
  ...props
}: IProfileProps) => {
  const { _id: userId, email, fullName, image, coverImage } = userInfo;
  const { id: myId } = useMe();
  const [isMe, setIsMe] = useState(myId === userId);
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string>();
  const [formData, setFormData] = useState<IFollow | IUnFollow>();

  const { displayModal } = useUI();
  const theme = useTheme();

  useEffect(() => {
    setIsMe(myId === userId);
  }, [userId]);

  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => {
      return await _FOLLOW(formData);
    },
    onSuccess(data) {
      setIsFollow(true);
      setFollowId(data._id);
    },
    onError(error) {
      console.error("ERROR: 팔로우 실패", error);
    },
  });

  // 모달이 닫히면 refetch
  useEffect(() => {
    if (displayModal || (!displayModal && !isMe)) return;

    const refetchData = async () => {
      const { data: refetchData } = await refetch();
      console.log("리패칭!");
      console.log(refetchData?.data);
    };

    refetchData();
  }, [displayModal]);

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnFollow) => {
      return await _UNFOLLOW(formData);
    },
    onSuccess() {
      console.log("API 성공! UnFollow");
      setIsFollow(false);
      setFollowId("");
    },
    onError(error) {
      console.error("ERROR: 언팔로우 실패", error);
    },
  });

  const handleClickFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 현재 프로필 id
    if (userId === undefined) return;

    if (!isFollow) {
      userId && setFormData({ userId });

      followMutation.mutate(formData as IFollow);
    } else {
      followId && setFormData({ id: followId });

      unfollowMutation.mutate(formData as IUnFollow);
    }
  };

  return (
    <Profile
      $isMe={isMe.toString()}
      $coverImage={coverImage ?? ""}
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
          $isMe={isMe.toString()}
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
              <Icon name="chat_bubble" onClick={e => onClickChat(e, userId)} />
              <Icon
                name={!isFollow ? "person_add" : "person_check"}
                color={isFollow ? theme.symbol_color : undefined}
                onClick={handleClickFollow}
              />
            </ButtonSet>
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
