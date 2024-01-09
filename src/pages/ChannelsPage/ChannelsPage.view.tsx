import { _GET } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ChannelStyle } from "./ChannelsPage.styles";

const ChannelsPage = () => {
  const [_, setChannel] = useLocalStorage("ViewChannel");
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => await _GET("/channels"),
  });

  const handleClick = (target: string) => {
    navigate("/home");
    setChannel(target);
  };

  if (data?.data) {
    return (
      <>
        {data?.data.map((val: any) => {
          return (
            <ChannelStyle key={val._id} onClick={() => handleClick(val._id)}>
              {val.name}
            </ChannelStyle>
          );
        })}
      </>
    );
  }
};

export default ChannelsPage;
