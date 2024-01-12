import React, { FC, useCallback, useMemo } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@styles/theme";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Modal } from "./Modal";
import { MODAL_ACTION, MODAL_VIEWS } from "@/store/types/modalType";
import {
  ChangeImageModal,
  ChannelSelectModal,
  EditNameModal,
  EditPasswordModal,
  PostDetailModal,
  TagCreateModal,
  TestModal,
} from "@/components/modalViews";

export interface State {
  displayModal: boolean;
  modalView: MODAL_VIEWS;
  modalProps: any | null;
}

const initialState: State = {
  displayModal: false,
  modalView: "INIT_VIEW",
  modalProps: null,
};

type Action = MODAL_ACTION & {};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        modalProps: action.props,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        modalProps: null,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalProps: null,
        modalView: action.view,
      };
    }
  }
}

export const UIProvider: React.FC = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openModal = useCallback(
    (props?: any) => dispatch({ type: "OPEN_MODAL", props }),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

interface IUIContext extends State {
  openModal: any;
  closeModal: any;
  setModalView: any;
}

export const useUI = () => {
  const context: IUIContext = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

// export const useUI = () => {
//   const dispatch = useDispatch();

//   // reducers state //
//   const {
//     displayModal,
//     modalView,
//     props: modalProps,
//   } = useSelector(({ modal }: RootState) => modal);

//   // reducers action //
//   const openModal = useCallback(
//     (props?: any) =>
//       dispatch(modalActions.modalReducer({ type: "OPEN_MODAL", props })),
//     [dispatch]
//   );

//   const closeModal = useCallback(
//     () => dispatch(modalActions.modalReducer({ type: "CLOSE_MODAL" })),
//     [dispatch]
//   );

//   const setModalView = useCallback(
//     (view: MODAL_VIEWS) =>
//       dispatch(modalActions.modalReducer({ type: "SET_MODAL_VIEW", view })),
//     [dispatch]
//   );

//   const context = {
//     displayModal,
//     modalView,
//     modalProps,
//     openModal: (props?: any) => openModal(props),
//     closeModal: () => closeModal(),
//     setModalView: (view: MODAL_VIEWS) => setModalView(view),
//   };

//   return context;
// };

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
      {modalView === "CHANNEL_SELECT_VIEW" && (
        <ChannelSelectModal props={props} />
      )}
      {modalView === "EDIT_NAME_VIEW" && <EditNameModal />}
      {modalView === "EDIT_PASSWORD_VIEW" && <EditPasswordModal />}
      {modalView === "EDIT_IMAGE_VIEW" && <ChangeImageModal />}
      {modalView === "EDIT_COVERIMAGE_VIEW" && <ChangeImageModal />}
      {modalView === "POST_DETAIL_VIEW" && <PostDetailModal props={props} />}
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
      <UIProvider>
        {children}
        <ModalUI />
      </UIProvider>
    </ThemeProvider>
  );
};
