import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { MODAL_ACTION } from "@/store/modalType";

export type ModalStateType = {
  displayModal: boolean;
  modalView: string;
};

const initialState: ModalStateType = {
  displayModal: false,
  modalView: "INIT_VIEW",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalReducer(state, action: PayloadAction<MODAL_ACTION>) {
      switch (action.payload.type) {
        case "OPEN_MODAL": {
          return {
            ...state,
            displayModal: true,
          };
        }
        case "CLOSE_MODAL": {
          return {
            ...state,
            displayModal: false,
          };
        }
        case "SET_MODAL_VIEW": {
          return {
            ...state,
            modalView: action.payload.view,
          };
        }
      }
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
