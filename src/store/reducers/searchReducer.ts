import { createSlice } from "@reduxjs/toolkit";

interface ISearchValueState {
  keyword: string;
}

const initialState: ISearchValueState = {
  keyword: "",
};

const searchValueSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.keyword = action.payload.keyword;
    },
  },
});

export const searchActions = searchValueSlice.actions;
export default searchValueSlice.reducer;
