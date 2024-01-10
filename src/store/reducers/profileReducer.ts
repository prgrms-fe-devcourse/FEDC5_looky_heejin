import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TProfileState = {
  isMe: boolean;
  profileName: string;
  profileImage: string;
  profileCover: string;
};

export type PROFILE_ACTION =
  | { type: "SET_IS_ME"; isMe: boolean }
  | { type: "SET_NAME"; profileName: string }
  | { type: "SET_IMAGE"; profileImage: string }
  | { type: "SET_COVER"; profileCover: string };

const initialState: TProfileState = {
  isMe: false,
  profileName: "",
  profileImage: "",
  profileCover: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileReducer: (state, action: PayloadAction<PROFILE_ACTION>) => {
      switch (action.payload.type) {
        case "SET_IS_ME": {
          console.log(state);
          return {
            ...state,
            isMe: action.payload.isMe,
          };
        }
        case "SET_NAME": {
          console.log(state);
          return {
            ...state,
            profileName: action.payload.profileName,
          };
        }
        case "SET_IMAGE": {
          console.log(state);
          return {
            ...state,
            profileImage: action.payload.profileImage,
          };
        }
        case "SET_COVER": {
          console.log(state);
          return {
            ...state,
            profileCover: action.payload.profileCover,
          };
        }
      }
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
