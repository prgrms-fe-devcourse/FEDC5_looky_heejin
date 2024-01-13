import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import meReducer from "./meReducer";
import searchReducer from "./searchReducer";
import notificationReducer from "./notificationReducer";
import profileReducer from "./profileReducer";

export { authActions } from "./authReducer";
export { meActions } from "./meReducer";
export { searchActions } from "./searchReducer";
export { notificationActions } from "./notificationReducer";

// 분리된 reducer 들을 하나의 reducer 로 합칩니다.
const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  search: searchReducer,
  notification: notificationReducer,
  profile: profileReducer,
});

export default rootReducer;
