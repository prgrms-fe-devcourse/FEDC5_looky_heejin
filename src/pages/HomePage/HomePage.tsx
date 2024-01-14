import { useEffect, useState } from "react";
import styled from "styled-components";

import { _GET } from "@/api";
import { _CHANNEL_POSTS } from "@/api/queries/channelPosts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PostSimpleCard from "@/components/common/PostSimpleCard";
import { Button } from "@/components/common";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -5.5px;
  margin-right: -5.5px;
  width: calc(100% + 11px);
  padding-bottom: 3rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const [channel, _] = useLocalStorage("ViewChannelObj");
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (query: string) => {
    const res = await _CHANNEL_POSTS(query);
    if (res) setData(res);
  };

  const handleClick = () => {
    navigate("/channels");
  };

  useEffect(() => {
    // 궁금증
    // channel을 받아오고 실행해야 하는것이 아닌지?
    if (channel) {
      const parsedData = JSON.parse(channel);
      fetchData(parsedData._id);
    }
  }, []);

  if (channel && !data.length) {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontStyle: "italic",
          }}
        >
          멋진 사진들을 가져오고 있어요!
        </div>
      </>
    );
  } else if (!channel && !data.length) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "3rem",
            paddingBottom: "3rem",
            width: "100%",
            height: "100%",
          }}
        >
          <span style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            채널을 선택해보세요!
          </span>
          <Button
            onClick={handleClick}
            style={{ width: "50%" }}
            variant="symbol"
          >
            바로 가기
          </Button>
        </div>
      </>
    );
  }

  if (data) console.log(data);
  return (
    <>
      <Container>
        {data.map((value, index) => (
          <PostSimpleCard key={index} postData={value} />
        ))}
      </Container>
    </>
  );
};

export default Home;
