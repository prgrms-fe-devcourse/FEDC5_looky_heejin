import { useEffect, useState } from "react";
import styled from "styled-components";

import { _GET } from "@/api";
import { _CHANNEL_POSTS } from "@/api/queries/channelPosts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PostSimpleCard from "@/components/common/PostSimpleCard";
import { Button } from "@/components/common";
import { useNavigate } from "react-router-dom";
import { Admin } from "@/components/Admin";
import { useMe } from "@/hooks/useMe";
import { Spinner } from "@/components/common";
const { VITE_ADMIN_ID } = import.meta.env;

const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
  padding-bottom: 3rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const [channel, _] = useLocalStorage("ViewChannelObj");
  const [data, setData] = useState<any[]>([]);
  const [fetch, setFetch] = useState(false);
  const { id } = useMe();

  const fetchData = async (query: string) => {
    const res = await _CHANNEL_POSTS(query);
    if (res) {
      setFetch(true);
      setData(res);
    }
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

  if (channel && !data.length && !fetch) {
    return (
      <>
        {id === VITE_ADMIN_ID ? <Admin /> : null}
        <section
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontStyle: "italic",
          }}
        >
          <Spinner />
        </section>
      </>
    );
  } else if (!channel && !data.length) {
    return (
      <>
        <section
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
          {id === VITE_ADMIN_ID ? <Admin /> : null}
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
        </section>
      </>
    );
  }

  if (data && fetch) {
    return (
      <>
        {id === VITE_ADMIN_ID ? <Admin /> : null}
        {data.length ? (
          <Container>
            {data.map(value => (
              <PostSimpleCard key={value._id} postData={value} />
            ))}
          </Container>
        ) : (
          <section
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
              포스트가 없네요!
            </span>
            <span style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              첫 포스트를 생성해보세요!
            </span>
          </section>
        )}
      </>
    );
  }
};

export default Home;
