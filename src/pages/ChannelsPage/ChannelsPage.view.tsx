import { _GET } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ChannelStyle, ContainDiv } from "./ChannelsPage.styles";
import { GET_CHANNELS } from "@/constants/queryKey";
import { Button } from "@/components/common";

const ChannelsPage = () => {
  const [channel, setChannel] = useLocalStorage("ViewChannelObj");
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [GET_CHANNELS],
    queryFn: async () => await _GET("/channels"),
  });

  const handleClick = (target: any) => {
    navigate("/home");
    if (channel !== target) setChannel(JSON.stringify(target));
  };

  if (data?.data) {
    return (
      <>
        <ContainDiv>
          {data?.data.map((val: any) => {
            return (
              <ChannelStyle key={val._id}>
                <Button
                  variant="neumorp"
                  onClick={() => handleClick(val)}
                  aria-label={`${val.name} 채널으로 이동하기`}
                >
                  {val.name}
                </Button>
              </ChannelStyle>
            );
          })}
        </ContainDiv>
      </>
    );
  }
};

export default ChannelsPage;
