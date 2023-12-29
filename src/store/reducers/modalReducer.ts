import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { MODAL_ACTION, MODAL_VIEWS } from "@/store/modalType";

export type TModalState = {
  displayModal: boolean;
  modalView: MODAL_VIEWS;
  props?: any;
};

const initialState: TModalState = {
  displayModal: false,
  modalView: "INIT_VIEW",
  props: null,
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
            props: action.payload.props,
            displayModal: true,
          };
        }
        case "CLOSE_MODAL": {
          return {
            ...state,
            props: null,
            displayModal: false,
          };
        }
        case "SET_MODAL_VIEW": {
          return {
            ...state,
            props: null,
            modalView: action.payload.view,
          };
        }
      }
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
