import { _GET } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ChannelStyle } from "./ChannelsPage.styles";

const ChannelsPage = () => {
  const [channel, setChannel] = useLocalStorage("ViewChannel");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["channels"],
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
