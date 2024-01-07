import { _GET } from "@/api";
import { Avatar, Image } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import { CHAT_ICON, HEART_ICON, SEND_ICON } from "@/constants/icons";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

const PostDetailWrapper = styled.div`
  border: 1px solid white;
  width: ${APP_MAX_WIDTH}px;
  height: 100vh;
  overflow-y: auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 133%;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CaptionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
  height: 10rem;
  padding-top: 0.5rem;
  border: 1px solid white;
`;

const UserNameWrapper = styled.div`
  display: flex;
  height: 3.5rem;
  justify-content: center;
  padding-left: 0.2rem;
`;

const UserNameSpan = styled.span`
  border: 1px solid white;
`;

const ContentWrapper = styled.div`
  border: 1px solid white;
`;

const StyledSpan = styled.span`
  overflow: hidden;
  /* text-overflow: ellipsis; */
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* -webkit-box-orient: vertical; */
  padding-left: 0.2rem;
  margin-right: 0.8rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  display: flex;
  flex-direction: row;
  & :first-child {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
  }
  & > * {
    cursor: pointer;
  }

  border: 1px solid white;
`;

const ContentDetail = styled.span`
  cursor: pointer;
  color: red;
`;

const PostDetail = () => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [content, setContent] = useState<string>(
    "국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다. 공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및 단체행동권을 가진다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될"
  );
  const [likes, setLikes] = useState<string[]>([]);
  const [isILiked, setIsILiked] = useState<boolean>(false);
  const [comments, setComments] = useState<string[]>([]);

  const [isContentDetail, setIsContentDetail] = useState<boolean>(false);

  const theme = useTheme();
  const contentLength = content.length;

  // fetch data --------------------------------------------
  const mutation = useMutation({
    mutationFn: async (params: string) => await _GET(params),
    onSuccess(data) {
      console.log("유저의 아이디:", data?.data.author._id);
      // console.log("fullName:", data?.data.author.fullName);
      // console.log("포스트 내용:", JSON.parse(data?.data.title).content);
      // console.log("좋아요 누른 사람들:", data?.data.likes);
      // console.log("comments:", data?.data.comments);
      setUserId(data?.data.author._id);
      setUserName(data?.data.author.fullName);
      // setContent(JSON.parse(data?.data.title).content);
      setLikes(data?.data.likes);
      setIsILiked(
        data?.data.author._id ===
          likes.some(({ _id }) => _id === data?.data.author._id)
      );
      setComments(data?.data.comments);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });

  useEffect(() => {
    mutation.mutate("/posts/65961633fc83a20c6e9c6a10");
  }, []);
  // ---------------------------------------------------------

  const handleContentDetail = () => {
    setIsContentDetail(true);
    console.log(isContentDetail);
  };

  const handleHeart = () => {
    setIsILiked(isILiked => !isILiked);
  };
  return (
    <PostDetailWrapper>
      PostDetail
      <ImageWrapper>
        <StyledImg src="https://wikidocs.net/images/page/49159/png-2702691_1920_back.png" />
      </ImageWrapper>
      <CaptionWrapper>
        <AvatarWrapper>
          <Avatar size="M" />
        </AvatarWrapper>
        <div style={{ width: "85%" }}>
          <UserNameWrapper>
            <UserNameSpan>{userName}</UserNameSpan>
          </UserNameWrapper>

          <ContentWrapper>
            {isContentDetail ? (
              <StyledSpan>{content}</StyledSpan>
            ) : (
              <StyledSpan>
                {content.slice(0, 20)}...&nbsp;
                <ContentDetail onClick={handleContentDetail}>
                  더보기
                </ContentDetail>
              </StyledSpan>
            )}
          </ContentWrapper>
        </div>
        <IconWrapper>
          {/* 추후 refactor 포인트 : className으로 바꾸기  */}
          <Icon
            name={HEART_ICON}
            onClick={handleHeart}
            fill={isILiked ? true : false}
            color={isILiked ? theme.symbol_color : ""}
          ></Icon>
          <Icon name={CHAT_ICON} size="1.7rem" />
          <Icon name={SEND_ICON} />
        </IconWrapper>
      </CaptionWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetail;
