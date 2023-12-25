import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { RootState } from "@/store";
import { modalActions } from "@store/reducers";
import { MODAL_VIEWS } from "@/store/modalType";

export const useUI = () => {
  const dispatch = useDispatch();

  // reducers state //
  const { displayModal, modalView } = useSelector(
    ({ modal }: RootState) => modal
  );

  // reducers action //
  const openModal = useCallback(
    () => dispatch(modalActions.modalReducer({ type: "OPEN_MODAL" })),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch(modalActions.modalReducer({ type: "CLOSE_MODAL" })),
    [dispatch]
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) =>
      dispatch(modalActions.modalReducer({ type: "SET_MODAL_VIEW", view })),
    [dispatch]
  );

  const context = {
    displayModal,
    modalView,
    openModal: () => openModal(),
    closeModal: () => closeModal(),
    setModalView: (view: MODAL_VIEWS) => setModalView(view),
  };

  return context;
};

export const ManagedUIContext: FC<any> = ({ children }) => {
  // const theme = useLocalStorage("theme");
  const [localTheme, _] = useLocalStorage("theme");

  const themeMode = useMemo((): string => {
    if (localTheme) return localTheme;
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }, [localTheme]);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};
