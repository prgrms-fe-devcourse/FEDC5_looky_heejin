import {
  CardContainer,
  CardImage,
  CardImageContainer,
  CardInfoContainer,
  IconContainer,
  ProfileContainer,
} from "./PostSimpleCard.styles";
import PostSimpleCardConst from "./PostSimpleCard.const";
import { _USERDATA } from "@/api/queries/userData";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Avatar } from "..";
import useTheme from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";

const PostSimpleCard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imageUrl, setimageUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [favoriteClicked, setFavoriteClicked] = useState<boolean>(false);
  const [tagClicked, setTagClicked] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: async (params: string) => await _USERDATA(params),
    onSuccess(data) {
      console.log("API 성공: ", data);
      setimageUrl(data.image);
      setUserName(data.fullName);
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const onClickProfile = () => {
    navigate(`/profile/${PostSimpleCardConst.data_example.author}`);
  };

  const onClickFavorite = () => {
    setFavoriteClicked(!favoriteClicked);
  };

  const onClickTag = () => {
    setTagClicked(!tagClicked);
  };

  const onClickComment = () => {
    // todo
    alert(`추후 댓글관련 모달 혹은 페이지로 돌려줄 예정입니다!`);
  };

  const onClickSend = () => {
    // todo
    navigate(`/chat/${PostSimpleCardConst.data_example.author}`);
  };

  useEffect(() => {
    mutation.mutate(PostSimpleCardConst.data_example.author);
  }, []);

  if (mutation.isError) {
    // 에러문구 todo
    return <div>실패요 수고</div>;
  }

  if (mutation.isPending) {
    // 스켈레톤 todo
    return <div>기다리셈</div>;
  }

  if (mutation.isSuccess) {
    return (
      <>
        <CardContainer $basis="half">
          <CardImageContainer style={{ minHeight: "200px", minWidth: "200px" }}>
            {/* todo, 카드 컴포넌트 원주님과 협업 후 공용 컴포넌트로 변경 */}
            <CardImage
              src={PostSimpleCardConst.data_example.image}
              alt="포스팅 이미지"
            />
          </CardImageContainer>
          <CardInfoContainer>
            <IconContainer $icon="send" onClick={onClickSend}>
              <span
                style={{
                  rotate: "-45deg",
                }}
                className="material-symbols-rounded"
              >
                send
              </span>
            </IconContainer>
            <IconContainer $icon="comment" onClick={onClickComment}>
              <span className="material-symbols-rounded">comment</span>
            </IconContainer>
            <IconContainer $icon="sell" onClick={onClickTag}>
              <span
                style={{
                  scale: "0.8",
                  color: !tagClicked ? theme?.gray_100 : theme?.symbol_color,
                  fontVariationSettings: "fill",
                }}
                className="material-symbols-rounded"
              >
                sell
              </span>
            </IconContainer>
            <IconContainer $icon="favorite" onClick={onClickFavorite}>
              <span
                style={{
                  scale: "0.8",
                  color: !favoriteClicked
                    ? theme?.gray_100
                    : theme?.symbol_color,
                  fontVariationSettings: "fill",
                }}
                className="material-symbols-rounded"
              >
                favorite
              </span>
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
                margin: "5px",
              }}
            >
              <span>{PostSimpleCardConst.data_example.title}</span>
            </div>
          </CardInfoContainer>
        </CardContainer>
      </>
    );
  }
};

export default PostSimpleCard;
