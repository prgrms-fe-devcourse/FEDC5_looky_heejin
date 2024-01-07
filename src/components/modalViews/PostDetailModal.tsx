import { _GET } from "@/api";
import { Avatar, Image } from "@/components/common";
import Icon from "@/components/common/Icon/Icon";
import { CHAT_ICON, SEND_ICON } from "@/constants/icons";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PostDetailWrapper = styled.div`
  border: 1px solid white;
  max-width: ${APP_MAX_WIDTH}px;
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
  /* border: 1px solid white; */
`;

const UserNameWrapper = styled.div`
  display: flex;
  height: 3.5rem;
  justify-content: center;
  padding-left: 0.2rem;
`;

const UserNameSpan = styled.span`
  /* border: 1px solid white; */
`;

const ContentWrapper = styled.div`
  /* border: 1px solid white; */
`;

const StyledSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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

  /* border: 1px solid white; */
`;

const PostDetail = () => {
  // fetch data --------------------------------------------
  const mutation = useMutation({
    mutationFn: async (params: string) => await _GET(params),
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });

  useEffect(() => {
    mutation.mutate("/posts/65961633fc83a20c6e9c6a10");
  }, []);
  // ---------------------------------------------------------
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
            <UserNameSpan>최규호(gyuho._.95)</UserNameSpan>
          </UserNameWrapper>

          <ContentWrapper>
            <StyledSpan>
              국정감사 및 조사에 관한 절차 기타 필요한 사항은 법률로 정한다.
              공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및
              단체행동권을 가진다. 모든 국민은 근로의 권리를 가진다. 국가는
              사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에
              노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야
              한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 선거에 관한
              경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게
              부담시킬 수 없다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될
              기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여
              새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다. 대통령은
              제4항과 제5항의 규정에 의하여 확정된 법률을 지체없이 공포하여야
              한다. 제5항에 의하여 법률이 확정된 후 또는 제4항에 의한 확정법률이
              정부에 이송된 후 5일 이내에 대통령이 공포하지 아니할 때에는
              국회의장이 이를 공포한다. 국무총리는 국회의 동의를 얻어 대통령이
              임명한다. 국회의 회의는 공개한다. 다만, 출석의원 과반수의 찬성이
              있거나 의장이 국가의 안전보장을 위하여 필요하다고 인정할 때에는
              공개하지 아니할 수 있다.
            </StyledSpan>
          </ContentWrapper>
        </div>
        <IconWrapper>
          <Icon name={CHAT_ICON} size="1.7rem" />
          <Icon name={SEND_ICON} />
        </IconWrapper>
      </CaptionWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetail;
