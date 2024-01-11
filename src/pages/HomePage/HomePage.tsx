import PostSimpleCard from "@/components/common/PostSimpleCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { _GET } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { _CHANNEL_POSTS } from "@/api/queries/channelPosts";
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
  const [data, setData] = useState<any[] | null>(null);

  const fetchData = async (query: string) => {
    const res = await _CHANNEL_POSTS(query);
    if (res) setData(res);
  };

  const handleClick = () => {
    navigate("/channels");
  };

  useEffect(() => {
    if (channel) {
      const parsedData = JSON.parse(channel);
      fetchData(parsedData._id);
    }
  }, []);

  if (channel === null) {
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

  if (data && data.length > 0) {
    return (
      <>
        <Container>
          {data.map((value, index) => (
            <PostSimpleCard key={index} postData={value} />
          ))}
        </Container>
      </>
    );
  }
};

export default Home;
