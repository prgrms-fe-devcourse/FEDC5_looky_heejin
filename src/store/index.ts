import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

const store = createStore();
export type RootState = ReturnType<typeof store.getState>;

export default store;
