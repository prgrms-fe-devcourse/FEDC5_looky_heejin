import { useEffect } from "react";

import { rootAPI } from "./api";
import RouterComponent from "./routes";
import { ME } from "./constants/queryKey";
import { useAuth } from "./hooks/useAuth";
import useEventQuery from "./hooks/useEventQuery";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMe } from "./hooks/useMe";
import { NotificationManager } from "./components/Notification";
import { aesDecrypt } from "./utils/crypto";
import { Spinner } from "./components/common/Spinner";

const App = () => {
  const [token, setToken] = useLocalStorage("auth_token");
  const { isLogIn, setAuth } = useAuth();
  const { setMe } = useMe();

  const { isLoading, refetch } = useEventQuery({
    key: ME,
    endPoint: "/auth-user",
  });

  if (token !== null) {
    rootAPI.defaults.headers.common["Authorization"] =
      "Bearer " + aesDecrypt(token);
  }

  const preload = async () => {
    if (token !== null) {
      const data = (await refetch()).data?.data ?? null;

      if (!data) {
        setAuth({ isLogIn: false, token: null });
        setToken(null);
      } else {
        setMe({
          id: data._id,
          profilePhoto: data.image,
          userName: data.fullName,
        });
        setAuth({ isLogIn: true, token: aesDecrypt(token) });
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
      }
    };
    prepare();
  }, [isLogIn, token]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {isLogIn && <NotificationManager />}
      <RouterComponent />
    </>
  );
};

export default App;
