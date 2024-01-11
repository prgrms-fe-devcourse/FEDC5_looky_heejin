import { RootState } from "@/store";
import { notificationActions } from "@/store/reducers";
import { INotification } from "@/types/notification";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useNotification = () => {
  const dispatch = useDispatch();

  const { common, message, commonUnseenCount, messageUnseenCount } =
    useSelector(({ notification }: RootState) => notification);

  const setNotification = useCallback(
    (param: { common: INotification[]; message: INotification[] }) =>
      dispatch(
        notificationActions.setNotification({
          common: param.common,
          message: param.message,
        })
      ),
    [dispatch]
  );

  const initCommonCount = useCallback(
    () => dispatch(notificationActions.initCommonCount()),
    [dispatch]
  );

  const initMessageCount = useCallback(
    () => dispatch(notificationActions.initMessageCount()),
    [dispatch]
  );

  const context = {
    common,
    message,
    commonUnseenCount,
    messageUnseenCount,
    setNotification: (param: {
      common: INotification[];
      message: INotification[];
    }) => setNotification(param),
    initCommonCount: () => initCommonCount,
    initMessageCount: () => initMessageCount,
  };

  return context;
};
