import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";
import { authActions } from "../store/reducers/authReducer";
import { RootState } from "@/store";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isLogIn, token } = useSelector(({ auth }: RootState) => auth);

  const setAuth = useCallback(
    (param: { isLogIn: boolean; token: string | null }) =>
      dispatch(
        authActions.setAuth({ isLogIn: param.isLogIn, token: param.token })
      ),
    [dispatch]
  );

  const context = {
    isLogIn,
    token,
    setAuth: (param: { isLogIn: boolean; token: string | null }) =>
      setAuth(param),
  };

  return context;
};
