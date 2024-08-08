import {
  CardContainer,
  // CardImage,
  CardImageContainer,
  CardInfoContainer,
  IconContainer,
  NewDiv,
  ProfileContainer,
  SkeletonFail,
  SkeletonImage,
  TextContainer,
} from "./PostSimpleCard.styles";
import { _USERDATA } from "@/api/queries/userData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import type { ITag } from "@/types/post";
import { _DELETE, _GET, _POST } from "@/api";
import { ME } from "@/constants/queryKey";
import { Avatar, Icon, Image } from "@/components/common";
import { useUI } from "../uiContext";
import { useMe } from "@/hooks/useMe";
import { INotification } from "@/types";
import { _NOTIFY } from "@/api/queries/notify";
import { notify } from "@/utils/toast";

export interface ITitle {
  title: string;
  content: string;
  tags: ITag[] | null;
}

interface IProps {
  key: number | string;
  index: number;
  postData: any;
}

// ========================================
// 충돌 방지를 위한 로직 모음, 추후 삭제 예정
export interface ICreateLike {
  postId: string;
}

export interface IDeleteLike {
  id: string;
}

export const _CREATE_LIKE = async (params: ICreateLike) => {
  const result = await _POST("/likes/create", params);
  return result?.data;
};

export const _DELETE_LIKE = async (params: IDeleteLike) => {
  const result = await _DELETE("/likes/delete", params);
  return result?.data;
};

// ========================================

const IsJsonString = (str: string) => {
  try {
    let json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
};

const PostSimpleCard = ({ postData, index }: IProps) => {
  const [userId, setUserId] = useState("");
  const { setModalView, openModal } = useUI();
  const { id } = useMe();
  const { pathname } = useLocation();
  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  let parsedData: ITitle = {
    title: "",
    content: "",
    tags: null,
  };

  if (IsJsonString(postData.title)) {
    const parsedJson = JSON.parse(postData.title);
    parsedData = parsedJson;
  }
  const navigate = useNavigate();
  const theme = useTheme();
  const [imageUrl, setimageUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [favoriteId, setFavoriteId] = useState("");
  const [favoriteClicked, setFavoriteClicked] = useState<boolean>(false);

  const notificationMutation = useMutation({
    mutationFn: async (formData: INotification) => await _NOTIFY(formData),
  });

  const mutation = useMutation({
    mutationFn: async (params: string) => await _USERDATA(params),
    onSuccess(data) {
      if (id) {
        if (typeof postData.likes[0] === "object") {
          postData.likes.map((val: any) => {
            if (val.user === myData?.data._id) {
              setFavoriteClicked(true);
              setFavoriteId(val._id);
            }
          });
        } else if (typeof postData.likes[0] === "string") {
          for (let i = 0; i < postData.likes.length; i++) {
            for (let j = 0; j < myData?.data.likes.length; j++) {
              if (postData.likes[i] === myData?.data.likes[j]._id) {
                setFavoriteClicked(true);
                setFavoriteId(postData.likes[i]);
                break;
              }
            }
          }
        }
      }

      setimageUrl(data.image);
      setUserName(data.fullName);
      setUserId(data._id);
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const likeDataBinding = (data: any) => {
    setFavoriteId(data._id);
    setFavoriteClicked(!favoriteClicked);
  };

  const onClickImage = <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter")
    ) {
      setModalView("POST_DETAIL_VIEW");
      openModal({ postId: postData._id, likeDataBinding });
    }
  };

  const onClickProfile = <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter")
    ) {
      if (pathname.includes("profile")) {
        alert(`Easter Egg!!!`);
      } else {
        navigate(`/profile/${postData.author._id}`);
      }
    }
  };

  const onClickFavorite = <T extends React.MouseEvent | React.KeyboardEvent>(
    e: T
  ) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter")
    ) {
      if (!favoriteClicked) {
        createLikeMutation.mutate({ postId: postData._id });
      } else {
        if (favoriteClicked) deleteLikeMutation.mutate({ id: favoriteId });
      }
    }
  };

  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onSuccess(data) {
      if (id) {
        const newNotification: INotification = {
          notificationType: "LIKE",
          notificationTypeId: data._id,
          userId,
          postId: data.post,
        };

        notify({
          type: "success",
          text: "좋아요를 눌렀어요!",
        });

        notificationMutation.mutate(newNotification);
        setFavoriteId(data._id);
        setFavoriteClicked(!favoriteClicked);
      }
      if (!id) {
        notify({
          type: "warning",
          text: "로그인이 필요한 기능이에요",
        });
      }
    },
    onError(error) {
      notify({
        type: "error",
        text: "좋아요 요청에 실패했어요.",
      });
      console.error("error: 좋아요 생성 실패 ", error);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: async (formData: IDeleteLike) => await _DELETE_LIKE(formData),
    onSuccess() {
      notify({
        type: "default",
        text: "좋아요를 취소했어요.",
      });
      setFavoriteClicked(!favoriteClicked);
    },
    onError(error) {
      notify({
        type: "error",
        text: "좋아요 삭제 요청에 실패했어요.",
      });
      console.error("error: 좋아요 삭제 실패 ", error);
    },
  });

  useEffect(() => {
    if (postData.author._id) {
      mutation.mutate(postData.author._id);
    } else {
      mutation.mutate(postData.author);
    }
  }, []);

  if (mutation.isError) {
    return (
      <CardContainer $basis="half">
        <SkeletonFail>데이터를 불러오는 데에 실패했어요!</SkeletonFail>
      </CardContainer>
    );
  }

  if (mutation.isPending) {
    return (
      <CardContainer $basis="half">
        <SkeletonImage />
      </CardContainer>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      onClickImage(event);
    }
  };

  if (mutation.isSuccess) {
    return (
      <>
        <CardContainer $basis="half">
          <CardImageContainer
            style={{
              position: "relative",
              minHeight: "200px",
              minWidth: "100%",
            }}
          >
            <Image
              src={postData.image ? postData.image : "/image_alt.png"}
              alt="포스팅 이미지"
              aria-label={`${JSON.parse(postData.title).title} 게시물 보기`}
              onClick={onClickImage}
              onKeyDown={(event: React.KeyboardEvent<HTMLElement>) =>
                handleKeyDown(event)
              }
              priority={index < 4 ? true : false}
              tabIndex={0}
              fill
              style={{
                cursor: "pointer",
                aspectRatio: "10/16",
                borderRadius: "0.375rem",
              }}
            />
            {/* <CardImage
              tabIndex={0}
              aria-label={`${JSON.parse(postData.title).title} 게시물 보기`}
              onClick={onClickImage}
              onKeyDown={event => handleKeyDown(event)}
              src={postData.image ? postData.image : "/image_alt.png"}
              alt="포스팅 이미지"
            /> */}
          </CardImageContainer>
          <CardInfoContainer>
            <IconContainer
              tabIndex={0}
              role="button"
              aria-label="좋아요 누르기"
              $icon="favorite"
              onClick={onClickFavorite}
              onKeyDown={onClickFavorite}
            >
              <NewDiv>
                <Icon
                  name="favorite"
                  fill={favoriteClicked ? true : false}
                  style={{
                    scale: "0.8",
                    color: !favoriteClicked
                      ? theme?.gray_300
                      : theme?.symbol_color,
                    fontVariationSettings: `'FILL' 
                      ${favoriteClicked ? 1 : 0}`,
                  }}
                />
              </NewDiv>
            </IconContainer>
            <ProfileContainer>
              <span
                tabIndex={0}
                onClick={onClickProfile}
                onKeyDown={onClickProfile}
                role="button"
                aria-label="프로필로 이동하기"
                style={{
                  cursor: "pointer",
                }}
              >
                <Avatar
                  size={"S"}
                  shape={"circle"}
                  src={imageUrl ? imageUrl : ""}
                ></Avatar>
              </span>
              <span
                role="button"
                aria-label="프로필로 이동하기"
                onClick={onClickProfile}
                style={{
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                {userName}
              </span>
            </ProfileContainer>

            <section
              style={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                outline: "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextContainer style={{ fontSize: "1.2rem" }} $why={true}>
                {parsedData === null ? postData.title : parsedData.title}
              </TextContainer>
              <TextContainer>
                {parsedData === null ? postData.title : parsedData.content}
              </TextContainer>
            </section>
            {/* todo, 태그 정보 */}
          </CardInfoContainer>
        </CardContainer>
      </>
    );
  }
};

export default PostSimpleCard;
