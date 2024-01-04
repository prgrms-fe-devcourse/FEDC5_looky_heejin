import { CardContainer, CardImageContainer } from "./PostSimpleCard.styles";
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
      // console.log(imageUrl);
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

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
    return <div>실패요 수고</div>;
  }

  if (mutation.isPending) {
    return <div>기다리셈</div>;
  }

  if (mutation.isSuccess) {
    console.log(imageUrl);
    return (
      <>
        <CardContainer $basis="half">
          <div>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={PostSimpleCardConst.data_example.image}
            />
          </div>
          <CardImageContainer>
            <div
              onClick={onClickSend}
              style={{
                cursor: "pointer",
                boxSizing: "border-box",
                position: "absolute",
                top: "5%",
                right: "1%",
              }}
            >
              <span
                style={{
                  rotate: "-45deg",
                }}
                className="material-symbols-rounded"
              >
                send
              </span>
            </div>
            <div
              onClick={onClickComment}
              style={{
                cursor: "pointer",
                boxSizing: "border-box",
                position: "absolute",
                top: "7%",
                right: "14%",
              }}
            >
              <span className="material-symbols-rounded">comment</span>
            </div>
            <div
              onClick={onClickTag}
              style={{
                scale: "1.1",
                cursor: "pointer",
                boxSizing: "border-box",
                position: "absolute",
                top: "-40%",
                right: "2%",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
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
            </div>
            <div
              onClick={onClickFavorite}
              style={{
                scale: "1.1",
                cursor: "pointer",
                boxSizing: "border-box",
                position: "absolute",
                top: "-80%",
                right: "2%",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <Avatar
                size={"S"}
                shape={"circle"}
                src={imageUrl ? imageUrl : ""}
              ></Avatar>
              <span style={{ marginLeft: "5px" }}>{userName}</span>
            </div>
            <div style={{ margin: "5px" }}>
              <span>{PostSimpleCardConst.data_example.title}</span>
            </div>
          </CardImageContainer>
        </CardContainer>
      </>
    );
  }
};

export default PostSimpleCard;
