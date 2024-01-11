import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import meReducer from "./meReducer";
import newPostReducer from "./newPostReducer";
import searchReducer from "./searchReducer";
import notificationReducer from "./notificationReducer";
import profileReducer from "./profileReducer";

export { authActions } from "./authReducer";
export { meActions } from "./meReducer";
export { modalActions } from "./modalReducer";
export { newPostActions } from "./newPostReducer";
export { searchActions } from "./searchReducer";
export { notificationActions } from "./notificationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  me: meReducer,
  modal: modalReducer,
  newPost: newPostReducer,
  search: searchReducer,
  notification: notificationReducer,
  profile: profileReducer,
});

export default rootReducer;
