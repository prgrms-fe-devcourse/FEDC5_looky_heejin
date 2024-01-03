import { CardContainer, CardImageContainer } from "./PostSimpleCard.styles";
import PostSimpleCardConst from "./PostSimpleCard.const";
import { _USERDATA } from "@/api/queries/userData";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Avatar } from "..";

const PostSimpleCard = () => {
  const [imageUrl, setimageUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();
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
            <Avatar
              size={"XS"}
              shape={"round"}
              src={imageUrl ? imageUrl : ""}
            ></Avatar>
            <span
              style={{
                boxSizing: "border-box",
                rotate: "-45deg",
                position: "absolute",
                top: "5%",
                // bottom: "0",
                right: "1%",
              }}
              className="material-symbols-rounded"
            >
              send
            </span>
            <span
              style={{
                boxSizing: "border-box",
                position: "absolute",
                top: "7%",
                // bottom: "0",
                right: "14%",
              }}
              className="material-symbols-rounded"
            >
              comment
            </span>
            <span
              style={{
                boxSizing: "border-box",
                position: "absolute",
                top: "-40%",
                right: "2%",
              }}
              className="material-symbols-rounded"
            >
              sell
            </span>
            <span
              style={{
                boxSizing: "border-box",
                position: "absolute",
                top: "-80%",
                right: "2%",
              }}
              className="material-symbols-rounded"
            >
              favorite
            </span>
            <span>{userName}</span>
            <span>{PostSimpleCardConst.data_example.title}</span>
          </CardImageContainer>
        </CardContainer>
      </>
    );
  }
};

export default PostSimpleCard;
