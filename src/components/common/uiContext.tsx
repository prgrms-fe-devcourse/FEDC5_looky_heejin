import React, { FC, Suspense, lazy, useCallback, useMemo } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Spinner } from "@/components/common";
import { Modal } from "./Modal";

const ChangeImageModal = lazy(
  () => import("@/components/modalViews/ProfileModal/ChangeImageModal")
);
const ChannelCreateModal = lazy(
  () => import("@/components/modalViews/ChannelCreateModal")
);
const ChannelSelectModal = lazy(
  () => import("@/components/modalViews/ChannelSelectModal")
);
const EditNameModal = lazy(
  () => import("@/components/modalViews/ProfileModal/EditNameModal")
);
const EditPasswordModal = lazy(
  () => import("@/components/modalViews/ProfileModal/EditPasswordModal")
);
const TagCreateModal = lazy(
  () => import("@/components/modalViews/TagCreateModal")
);
const TestModal = lazy(() => import("@/components/modalViews/TestModal"));
const PostDetailModalController = lazy(
  () =>
    import("@/components/modalViews/PostDetailModal/PostDetailModal.controller")
);
import { useModal } from "@/store/useModalStore";

export const useUI = () => {
  const context = {
    ...useModal(),
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
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
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
