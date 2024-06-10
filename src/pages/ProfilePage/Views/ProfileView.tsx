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
      name: "Password",
      size: ICON_SIZE_SMALL,
      onClick: onClickPassword,
    },
    {
      name: "logout",
      size: ICON_SIZE_SMALL,
      onClick: onClickLogout,
    },
  ];

  const followAndMessage = [
    {
      name: "chat_bubble",
      size: ICON_SIZE_SMALL,
      onClick: handleClickChat,
    },
    {
      name: !isFollow ? "person_add" : "person_check",
      size: ICON_SIZE_SMALL,
      color: isFollow ? theme.symbol_color : undefined,
      onClick: handleClickFollow,
    },
  ];

  return (
    // div태그이므로 alt 태그 추가 불가
    <Profile
      $isMe={isMe.toString()}
      tabIndex={0}
      $coverImage={isMe ? profileCover : userCover ?? ""}
      // 여기서 발생하는 버블링을 캐치하지 못하는 중..
      onClick={e => {
        if (e.type === "click" && e.button === 0 && isMe) {
          onClickCover(e);
        }
      }}
      onKeyDown={e => {
        if (e.key === "Enter") {
          if (isMe) {
            onClickCover(e);
          }
        }
      }}
    >
      {/* 기존 마우스 이벤트가 버튼이 아닌 아이콘에 있는 문제 있음 */}
      {/* 따라서 아이콘 뎁스까지 들어가지 않아서 키보드 이벤트로 접근할 수 없는 문제점 발생 */}
      {isMe && (
        <ButtonsWrap className="me">
          <ButtonSet style={buttonStyle}>
            <Icon
              name="Password"
              size={ICON_SIZE_SMALL}
              onClick={e => {
                console.log(`?`);
                if (isMe) {
                  e.stopPropagation();
                  onClickPassword(e);
                }
              }}
              onKeyDown={e => {
                console.log(`?`);
                if (e.key === "Enter") {
                  console.log(`?`);
                  onClickPassword(e);
                  e.stopPropagation();
                }
              }}
            />
            <Icon
              name="logout"
              size={ICON_SIZE_SMALL}
              onClick={e => {
                e.stopPropagation();
                onClickLogout(e);
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (isMe) {
                    e.stopPropagation();
                    onClickLogout(e);
                  }
                }
              }}
            />
          </ButtonSet>
        </ButtonsWrap>
      )}
      <InfoWrap {...props}>
        <AvatarWrap
          tabIndex={0}
          $isMe={isMe.toString()}
          onClick={e => {
            if (isMe) {
              e.stopPropagation();
              onClickAvatar(e);
            }
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              if (isMe) {
                e.stopPropagation();
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
              tabIndex={-1}
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
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    onClickEdit(e);
                  }
                }}
              />
            </Button>
          </ButtonsWrap>
        )}
        {!isMe && (
          <ButtonsWrap className="others">
            <ButtonSet style={buttonStyle}>
              {/* link 태그로 바꿔야함 */}
              <Icon
                name="chat_bubble"
                onClick={e => onClickChat(e, userId)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    onClickChat(e, userId);
                  }
                }}
              />
              <Icon
                name={!isFollow ? "person_add" : "person_check"}
                color={isFollow ? theme.symbol_color : undefined}
                onClick={handleClickFollow}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleClickFollow(e);
                  }
                }}
              />
            </ButtonSet>
          </ButtonsWrap>
        )}
      </InfoWrap>
    </Profile>
  );
};

export default ProfileView;
