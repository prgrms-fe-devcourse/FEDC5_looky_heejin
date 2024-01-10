import { INotification } from "@/types/notification";
import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";

export type TNotificationState = {
  common: INotification[];
  commonUnseenCount: number;
  message: INotification[];
  messageUnseenCount: number;
};

const initialState: TNotificationState = {
  common: [],
  commonUnseenCount: 0,
  message: [],
  messageUnseenCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.common = action.payload.common;
      state.message = action.payload.message;

      state.commonUnseenCount = _.chain(action.payload.common)
        .countBy(data => !data.seem)
        .get("true", 0)
        .value();

      state.messageUnseenCount = _.chain(action.payload.message)
        .countBy(data => !data.seem)
        .get("true", 0)
        .value();
    },
    initCommonCount: state => {
      return {
        ...state,
        commonUnseenCount: 0,
      };
    },
    initMessageCount: state => {
      return {
        ...state,
        messageUnseenCount: 0,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
