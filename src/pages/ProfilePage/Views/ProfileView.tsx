import { useTheme } from "styled-components";
import { useMe } from "@/hooks/useMe";
import { useEffect, useState } from "react";
import { Avatar, Button, Icon } from "@/components/common";
import { ButtonSet } from "@/components";
import {
  AvatarWrap,
  ButtonsWrap,
  CoverChange,
  InfoWrap,
  Profile,
} from "../ProfilePage.style";
import { _GET } from "@/api";
import { _FOLLOW, _UNFOLLOW } from "@/api/queries/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfile";
import { IButtonProps } from "@/components/ButtonSet";
import { INotification, IUser } from "@/types";
import { ME } from "@/constants/queryKey";
import { _NOTIFY } from "@/api/queries/notify";
import { notify } from "@/utils/toast";
import { ICON } from "@/constants/icons";

interface IProfileProps {
  userInfo: IUser;
  onClickLogout: <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => void;
  onClickPassword: <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => void;
  onClickEdit: <T extends React.MouseEvent | React.KeyboardEvent>(e: T) => void;
  onClickAvatar: <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => void;
  onClickCover: <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => void;
  onClickChat: <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T,
    paramsId: string
  ) => void;
  [key: string]: any;
}

const buttonStyle: IButtonProps["style"] = {
  variant: "neumorp",
  width: ICON.SIZE.LARGE,
  style: {
    height: ICON.SIZE.MEDIUM,
    borderRadius: "0.5rem",
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

  const handleClickFollow = <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => {
    e.stopPropagation();
    if (userId === undefined) return;

    if (!isFollow) {
      followMutation.mutate(userId);
    } else {
      if (followId) unfollowMutation.mutate(followId);
    }
  };

  const handleClickChat = <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => {
    e.stopPropagation();
    if (userId) onClickChat(e, userId);
  };

  const passwordAndLogoutItems = [
    {
      name: ICON.PASSWORD,
      size: ICON.SIZE.SMALL,
      onClick: onClickPassword,
      ariaString: "패스워드 변경하기",
    },
    {
      name: ICON.LOGOUT,
      size: ICON.SIZE.SMALL,
      onClick: onClickLogout,
      ariaString: "로그아웃 하기",
    },
  ];

  const followAndMessage = [
    {
      name: ICON.CHAT_BUBBLE,
      size: ICON.SIZE.SMALL,
      onClick: handleClickChat,
      ariaString: `${profileName} 회원과 채팅하기`,
    },
    {
      name: !isFollow ? ICON.PERSON_ADD : ICON.PERSON_CHECK,
      size: ICON.SIZE.SMALL,
      color: isFollow ? theme.symbol_color : undefined,
      onClick: handleClickFollow,
      ariaString: !isFollow
        ? `${profileName} 회원 팔로우하기`
        : `${profileName} 회원 팔로우 취소하기`,
    },
  ];

  return (
    <Profile
      $isMe={isMe.toString()}
      $coverImage={isMe ? profileCover : userCover ?? ""}
    >
      {isMe && (
        <CoverChange
          onClick={e => {
            e.stopPropagation();
            if (e.type === "click" && isMe) {
              onClickCover(e);
            }
          }}
          aria-label="커버 이미지 변경하기"
        />
      )}
      {isMe && (
        <ButtonsWrap className="me">
          <ButtonSet style={buttonStyle} items={passwordAndLogoutItems} />
        </ButtonsWrap>
      )}
      <InfoWrap {...props}>
        <AvatarWrap
          tabIndex={isMe ? 0 : -1}
          $isMe={isMe.toString()}
          onClick={e => {
            e.stopPropagation();
            if (isMe) {
              onClickAvatar(e);
            }
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.stopPropagation();
              if (isMe) {
                onClickAvatar(e);
              }
            }
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
              variant="neumorp"
              width={ICON.SIZE.LARGE}
              textColor={theme.background_color}
              style={{
                height: ICON.SIZE.MEDIUM,
                borderRadius: "0.5rem",
                marginTop: "0.3rem",
              }}
              onClick={onClickEdit}
            >
              <Icon
                name={ICON.EDIT}
                color={theme.background_color}
                size={ICON.SIZE.SMALL}
                isSprite={true}
              />
            </Button>
          </ButtonsWrap>
        )}
        {!isMe && (
          <ButtonsWrap className="others">
            <ButtonSet style={buttonStyle} items={followAndMessage} />
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
