import { useEffect } from "react";

import { rootAPI } from "./api";
import RouterComponent from "./routes";
import { ME } from "./constants/queryKey";
import { useAuth } from "./hooks/useAuth";
import useEventQuery from "./hooks/useEventQuery";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMe } from "./hooks/useMe";
import { NotificationManager } from "./components/Notification";

const App = () => {
  // const navigate = useNavigate();

  const [token, setToken] = useLocalStorage("token");
  const { isLogIn, setAuth } = useAuth();
  const { setMe } = useMe();

  const { isLoading, refetch } = useEventQuery({
    key: ME,
    endPoint: "/auth-user",
  });

  const preload = async () => {
    if (token !== null) {
      rootAPI.defaults.headers.common["Authorization"] = "Bearer " + token;
      const data = (await refetch()).data?.data ?? null;

      if (!data) {
        setAuth({ isLogIn: false, token: null });
        setToken(null);

        // navigate("/");
      } else {
        setMe({
          id: data._id,
          profilePhoto: data.image,
          userName: data.fullName,
        });
        // 토큰 값을 redux에도 저장해서. 매번 Storage에서 get하지 않도록.
        setAuth({ isLogIn: true, token: token });
        // navigate("/home");
      }
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await preload();
      } catch (e) {
        console.warn(e);
      } finally {
        // onFinish();
      }
    };
    prepare();
  }, [isLogIn, token]);

  if (isLoading) return null;

  return (
    <>
      <NotificationManager />
      <RouterComponent />
    </>
  );
};

export default App;
