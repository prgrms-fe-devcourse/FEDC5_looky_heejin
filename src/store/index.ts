import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

// 합친 reducer 들을 단일 store 로 제공합니다.
const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

const store = createStore();
export type RootState = ReturnType<typeof store.getState>;

export default store;
