import { createSlice } from "@reduxjs/toolkit";

// TopNavBar 의 검색창에서 입력된 값을 keyword라고 명칭
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
