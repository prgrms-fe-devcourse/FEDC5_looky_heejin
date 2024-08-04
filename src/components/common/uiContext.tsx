import { FC, useMemo } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Modal } from "./Modal";
import {
  ChangeImageModal,
  ChannelCreateModal,
  ChannelSelectModal,
  EditNameModal,
  EditPasswordModal,
  // PostDetailModal,
  TagCreateModal,
  TestModal,
} from "@/components/modalViews";
import PostDetailModalController from "../modalViews/PostDetailModal/PostDetailModal.controller";
import { useModal } from "@/store/useModalStore";

export const useUI = () => {
  const {
    closeModal,
    displayModal,
    modalProps,
    modalView,
    openModal,
    setModalView,
  } = useModal();

  const context = {
    closeModal,
    displayModal,
    modalProps,
    modalView,
    openModal,
    setModalView,
  };

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

// Modal ================================================================= //
const ModalProvider = () => {
  const { closeModal, modalProps, modalView, displayModal } = useModal();

  if (!displayModal) return null;

  return (
    <Modal onClose={closeModal}>
      {modalView === "INIT_VIEW" && <TestModal />}
      {modalView === "TAG_CREATE_VIEW" && <TagCreateModal props={modalProps} />}
      {modalView === "CHANNEL_SELECT_VIEW" && (
        <ChannelSelectModal props={modalProps} />
      )}
      {modalView === "EDIT_NAME_VIEW" && <EditNameModal />}
      {modalView === "EDIT_PASSWORD_VIEW" && <EditPasswordModal />}
      {modalView === "EDIT_IMAGE_VIEW" && <ChangeImageModal />}
      {modalView === "EDIT_COVERIMAGE_VIEW" && <ChangeImageModal />}
      {modalView === "CREATE_CHANNEL_VIEW" && <ChannelCreateModal />}
      {modalView === "POST_DETAIL_VIEW" && (
        <PostDetailModalController props={modalProps} />
      )}
    </Modal>
  );
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
      <ModalProvider />
    </ThemeProvider>
  );
};
