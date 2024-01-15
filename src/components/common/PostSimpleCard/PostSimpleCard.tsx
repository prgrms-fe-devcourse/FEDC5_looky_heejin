import {
  CardContainer,
  CardImage,
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
import { Avatar } from "..";
import useTheme from "@/hooks/useTheme";
import { useLocation, useNavigate } from "react-router-dom";
import type { ITag } from "@/types/post";
import { _DELETE, _GET, _POST } from "@/api";
import { ME } from "@/constants/queryKey";
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

// todo, 타입 충돌로 인해서 추후 타입 명시
const PostSimpleCard = ({
  postData,
}: {
  key: number | string;
  postData: any;
}) => {
  const [userId, setUserId] = useState("");
  const { setModalView, openModal } = useUI();
  const { id } = useMe();
  const { pathname } = useLocation();
  // console.log(postData);
  const { data: myData } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });
  // console.log(myData);

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
    onSuccess(data) {
      console.log("알림 api 성공", data);
    },
    onError(error) {
      console.error("알림 api 통신 에러", error);
    },
  });

  const mutation = useMutation({
    // 고민사항..
    // 목적에 맞지 않는다.
    mutationFn: async (params: string) => await _USERDATA(params),
    onSuccess(data) {
      // console.log("나다 ", myData);
      // console.log("포스트 데이터다", postData);
      // console.log("작성자 데이터다", data);
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

  const onClickImage = () => {
    setModalView("POST_DETAIL_VIEW");
    openModal({ postId: postData._id });
  };

  const onClickProfile = () => {
    if (pathname.includes("profile")) {
      alert(`Easter Egg!!!`);
    } else {
      navigate(`/profile/${postData.author._id}`);
    }
  };

  const onClickFavorite = () => {
    if (!favoriteClicked) {
      createLikeMutation.mutate({ postId: postData._id });
    } else {
      if (favoriteClicked) deleteLikeMutation.mutate({ id: favoriteId });
    }
  };

  const createLikeMutation = useMutation({
    mutationFn: async (formData: ICreateLike) => await _CREATE_LIKE(formData),
    onSuccess(data) {
      if (id) {
        console.log("API: 좋아요 생성 성공 ", data);
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
    onSuccess(data) {
      console.log("API: 좋아요 삭제 성공 ", data);
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
    // 에러문구 todo
    return (
      <CardContainer $basis="half">
        <SkeletonFail>데이터를 불러오는 데에 실패했어요!</SkeletonFail>
      </CardContainer>
    );
  }

  if (mutation.isPending) {
    // 스켈레톤 todo
    return (
      <CardContainer $basis="half">
        <SkeletonImage />
      </CardContainer>
    );
  }

  if (mutation.isSuccess) {
    return (
      <>
        <CardContainer $basis="half">
          <CardImageContainer style={{ minHeight: "200px", minWidth: "100%" }}>
            {/* todo, 카드 컴포넌트 원주님과 협업 후 공용 컴포넌트로 변경 */}
            <CardImage
              onClick={onClickImage}
              src={postData.image ? postData.image : "/image_alt.png"}
              alt="포스팅 이미지"
            />
          </CardImageContainer>
          <CardInfoContainer>
            <IconContainer $icon="favorite" onClick={onClickFavorite}>
              <NewDiv>
                <span
                  style={{
                    scale: "0.8",
                    color: !favoriteClicked
                      ? theme?.gray_300
                      : theme?.symbol_color,
                    fontVariationSettings: "fill",
                  }}
                  className="material-symbols-rounded"
                >
                  favorite
                </span>
              </NewDiv>
            </IconContainer>
            <ProfileContainer>
              <span
                onClick={onClickProfile}
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
                onClick={onClickProfile}
                style={{
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                {userName}
              </span>
            </ProfileContainer>

            <div
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
            </div>
            {/* todo, 태그 정보 */}
          </CardInfoContainer>
        </CardContainer>
      </>
    );
  }
};

export default PostSimpleCard;
