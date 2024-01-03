import React from "react";
import { useQuery } from "@tanstack/react-query";

import { ME } from "@/constants/queryKey";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, NavigateProps, RouteProps } from "react-router-dom";
import { _GET } from "@/api";

type TAuthRouteProps = {
  element: JSX.Element;
  [key: string]: any;
} & RouteProps;

const AuthRoute = ({ element, ...rest }: TAuthRouteProps) => {
  const { token } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [ME],
    queryFn: async () => _GET("/auth-user"),
  });

  return data ? (
    element
  ) : (
    <Navigate to={{ pathname: "/login" } as NavigateProps["to"]} replace />
  );
};

export default AuthRoute;
