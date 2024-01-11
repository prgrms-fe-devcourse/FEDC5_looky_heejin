import { useEffect, useState } from "react";
import styled from "styled-components";

import { _GET } from "@/api";
import { _CHANNEL_POSTS } from "@/api/queries/channelPosts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PostSimpleCard from "@/components/common/PostSimpleCard";

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
  const [channel, _] = useLocalStorage("ViewChannelObj");
  const [data, setData] = useState<any[]>([]);

  const fetchData = async (query: string) => {
    const res = await _CHANNEL_POSTS(query);
    if (res) setData(res);
  };

  useEffect(() => {
    if (channel) {
      const parsedData = JSON.parse(channel);
      fetchData(parsedData._id);
    }
  }, []);

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
