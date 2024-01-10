import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";

import { RootState } from "@/store";
import { modalActions } from "@store/reducers";
import { Modal } from "./Modal";
import { MODAL_VIEWS } from "@/store/types/modalType";
import {
  ChangeImageModal,
  ChannelSelectModal,
  EditNameModal,
  EditPasswordModal,
  TagCreateModal,
  TestModal,
} from "@/components/modalViews";

export const useUI = () => {
  const dispatch = useDispatch();

  // reducers state //
  const {
    displayModal,
    modalView,
    props: modalProps,
  } = useSelector(({ modal }: RootState) => modal);

  // reducers action //
  const openModal = useCallback(
    (props?: any) =>
      dispatch(modalActions.modalReducer({ type: "OPEN_MODAL", props })),
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
    modalProps,
    openModal: (props?: any) => openModal(props),
    closeModal: () => closeModal(),
    setModalView: (view: MODAL_VIEWS) => setModalView(view),
  };

  return context;
};

// Modal ================================================================= //
const ModalView: React.FC<{
  modalView: MODAL_VIEWS;
  closeModal(): any;
  props?: any;
}> = ({ modalView, closeModal, props }) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === "INIT_VIEW" && <TestModal />}
      {modalView === "TAG_CREATE_VIEW" && <TagCreateModal props={props} />}
      {modalView === "CHANNEL_SELECT_VIEW" && <ChannelSelectModal />}
      {modalView === "EDIT_NAME_VIEW" && <EditNameModal />}
      {modalView === "EDIT_PASSWORD_VIEW" && <EditPasswordModal />}
      {modalView === "EDIT_IMAGE_VIEW" && <ChangeImageModal />}
      {modalView === "EDIT_COVERIMAGE_VIEW" && <ChangeImageModal />}
    </Modal>
  );
};

const ModalUI: React.FC<{ [key: string]: any }> = (...rest) => {
  const { displayModal, closeModal, modalView, modalProps } = useUI();
  return displayModal ? (
    <ModalView
      modalView={modalView}
      closeModal={closeModal}
      props={modalProps}
      {...rest}
    />
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
