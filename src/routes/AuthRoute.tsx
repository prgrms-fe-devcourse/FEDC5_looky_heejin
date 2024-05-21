import { Navigate, NavigateProps, RouteProps } from "react-router-dom";

import { _GET, rootAPI } from "@/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { ME } from "@/constants/queryKey";
import { aesDecrypt } from "@/utils/crypto";
import { Spinner } from "@/components/common/Spinner";

type TAuthRouteProps = {
  element: JSX.Element;
  [key: string]: any;
} & RouteProps;

const AuthRoute = ({ element, ...rest }: TAuthRouteProps) => {
  const [token, _] = useLocalStorage("auth_token");
  rootAPI.defaults.headers.common["Authorization"] =
    "Bearer " + aesDecrypt(token);

  const { data, isLoading } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return data?.data ? (
    element
  ) : (
    <Navigate
      to={
        {
          pathname: "/login",
          state: { from: rest.location },
        } as NavigateProps["to"]
      }
      replace
    />
  );
};

export default AuthRoute;
