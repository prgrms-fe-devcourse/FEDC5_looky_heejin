import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";

export { modalActions } from "./modalReducer";

// 분리된 reducer 들을 하나의 reducer 로 합칩니다.
const rootReducer = combineReducers({ modal: modalReducer });

export default rootReducer;
