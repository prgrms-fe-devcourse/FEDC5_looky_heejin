import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import meReducer from "./meReducer";
import tagsRedcuer from "./tagsReducer";

export { authActions } from "./authReducer";
export { meActions } from "./meReducer";
export { modalActions } from "./modalReducer";
export { tagsActions } from "./tagsReducer";

// 분리된 reducer 들을 하나의 reducer 로 합칩니다.
const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  modal: modalReducer,
  tags: tagsRedcuer,
});

export default rootReducer;
