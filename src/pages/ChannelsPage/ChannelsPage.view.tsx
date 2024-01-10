import { _GET } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ChannelStyle } from "./ChannelsPage.styles";
import { GET_CHANNELS } from "@/constants/queryKey";

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
        {data?.data.map((val: any) => {
          return (
            <ChannelStyle key={val._id} onClick={() => handleClick(val)}>
              {val.name}
            </ChannelStyle>
          );
        })}
      </>
    );
  }
};

export default ChannelsPage;
