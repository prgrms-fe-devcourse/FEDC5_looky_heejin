import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { RootState } from "@/store";
import { modalActions } from "@store/reducers";
import { MODAL_VIEWS } from "@/store/modalType";
import { Modal, ModalLayout } from "./Modal";
import { TestModal } from "../modalViews";

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

// Modal ================================================================= //
const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === "INIT_VIEW" && (
        <ModalLayout>
          <TestModal />
        </ModalLayout>
      )}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};
// ================================================================= Modal //

export const ManagedUIContext: FC<any> = ({ children }) => {
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
      <ModalUI />
    </ThemeProvider>
  );
};