import { create } from "zustand";
import { MODAL_VIEWS } from "./types/modalType";

interface ModalStore {
  displayModal: boolean;
  modalView: MODAL_VIEWS;
  modalProps: any | null;
  setModalView: (type: MODAL_VIEWS) => void;
  openModal: (props?: any | null) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>(set => ({
  displayModal: false,
  modalView: "INIT_VIEW",
  modalProps: null,
  setModalView: type => set({ modalView: type }),
  openModal: (props = {}) => set({ displayModal: true, modalProps: props }),
  closeModal: () => set({ displayModal: false, modalProps: null }),
}));
