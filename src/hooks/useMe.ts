import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { meActions } from "@/store/reducers";

export const useMe = () => {
  const dispatch = useDispatch();

  const { id, profilePhoto, userName } = useSelector(({ me }: RootState) => me);

  const setMe = useCallback(
    (param: { id: string; profilePhoto: string; userName: string }) =>
      dispatch(
        meActions.setMe({
          id: param.id,
          profilePhoto: param.profilePhoto,
          userName: param.userName,
        })
      ),
    [dispatch]
  );

  const context = {
    id,
    profilePhoto,
    userName,
    setMe: (param: { id: string; profilePhoto: string; userName: string }) =>
      setMe(param),
  };

  return context;
};
