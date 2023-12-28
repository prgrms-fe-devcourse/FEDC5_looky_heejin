import { createSlice } from "@reduxjs/toolkit";

export type TMeState = {
  id: string | null;
  userName: string | null;
  profilePhoto: string | null;
};

const initialState: TMeState = {
  id: null,
  userName: null,
  profilePhoto: null,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.profilePhoto = action.payload.profilePhoto;
    },
  },
});

export const meActions = meSlice.actions;

export default meSlice.reducer;
