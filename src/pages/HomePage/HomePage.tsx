import PostSimpleCard from "@/components/common/PostSimpleCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { _GET } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px -5.5px;
  width: calc(100% + 11px);
  padding-bottom: 3rem;
`;

const Home = () => {
  const [channel, _] = useLocalStorage("ViewChannel");
  const [data, setData] = useState<any[]>([]);

  const initMutation = useMutation({
    mutationFn: async (endPoint: string) => await _GET(endPoint),
    onSuccess(data) {
      if (data) setData(data.data);
    },
    onError(error) {
      console.log("API 에러: ", error);
    },
  });

  useEffect(() => {
    // 궁금증
    // channel을 받아오고 실행해야 하는것이 아닌지?
    if (channel) initMutation.mutate(`/posts/channel/${channel}`);
  }, []);

  if (data)
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
