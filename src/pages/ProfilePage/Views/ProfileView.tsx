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
import { _GET } from "@/api";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfile";
import { IButtonProps } from "@/components/ButtonSet";
import { INotification, IUser } from "@/types";
import { ME } from "@/constants/queryKey";
import { _NOTIFY } from "@/api/queries/notify";
import { notify } from "@/utils/toast";

interface IProfileProps {
  userInfo: IUser;
  onClickLogout: (e: React.MouseEvent) => void;
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
  onClickLogout,
  onClickPassword,
  onClickEdit,
  onClickAvatar,
  onClickCover,
  onClickChat,
  ...props
}: IProfileProps) => {
  const { isMe, profileName, profileImage, profileCover, setIsMe } =
    useProfile();
  const { id: myId } = useMe();
  const {
    _id: userId,
    email,
    image: userImage,
    coverImage: userCover,
  } = userInfo;
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string>("");

  const theme = useTheme();
  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  const init = async () => {
    if (myData?.data) {
      myData?.data.following.map((followingData: any) => {
        if (followingData.user === userInfo._id) {
          setIsFollow(true);
          setFollowId(followingData._id);
        }
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setIsMe(myId === userId);
  }, [userId]);

  const notificationMutation = useMutation({
    mutationFn: async (param: INotification) => await _NOTIFY(param),
    onSuccess(data) {
      console.log("알림완료 : ", data);
    },
    onError(error) {
      console.error("ERROR: 알림 실패", error);
    },
  });

  const followMutation = useMutation({
    mutationFn: async (id: string) => {
      return await _FOLLOW({ userId: id });
    },
    onSuccess(data) {
      if (myId) {
        notificationMutation.mutate({
          notificationType: "FOLLOW",
          notificationTypeId: data._id,
          userId,
          postId: null,
        });
        setIsFollow(true);
        setFollowId(data._id);
        notify({
          type: "success",
          text: "팔로우를 성공했어요.",
        });
      } else {
        notify({
          type: "error",
          text: "팔로우 요청에 실패했어요. 로그인이 필요해요.",
        });
      }
    },
    onError(error) {
      notify({
        type: "error",
        text: "팔로우 요청에 실패했어요.",
      });
      console.error("ERROR: 팔로우 실패", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (followId: string) => {
      if (followId) {
        return await _UNFOLLOW({ id: followId });
      }
    },
    onSuccess() {
      notify({
        type: "default",
        text: "팔로우를 해제했어요.",
      });
      setIsFollow(false);
      setFollowId("");
    },
    onError(error) {
      notify({
        type: "error",
        text: "팔로우 해제에 실패했어요.",
      });
      console.error("ERROR: 언팔로우 실패", error);
    },
  });

  const handleClickFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userId === undefined) return;

    if (!isFollow) {
      followMutation.mutate(userId);
    } else {
      if (followId) unfollowMutation.mutate(followId);
    }
  };

  return (
    <Profile
      $isMe={isMe.toString()}
      tabIndex={0}
      $coverImage={isMe ? profileCover : userCover ?? ""}
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
            <Icon
              name="logout"
              size={ICON_SIZE_SMALL}
              onClick={onClickLogout}
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
          <Avatar src={isMe ? profileImage : userImage ?? ""} size="XL" />
        </AvatarWrap>
        <div style={{ color: theme.white_primary, paddingTop: "1rem" }}>
          {email}
        </div>
        <span style={{ color: theme.white_primary, padding: "0.5rem 0" }}>
          {profileName}
        </span>
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
