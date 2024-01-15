import { NAV_HEIGHT } from "@/constants/uiConstants";

export const VIEW_HEIGHT = `100vh - ${NAV_HEIGHT * 2}rem`;

export const SEARCH_VALIDATION_OPTION = {
  required: {
    value: true,
    message: "검색어를 입력하세요",
  },
  minLength: {
    value: 2,
    message: "두 글자 이상 입력하세요",
  },
  maxLength: {
    value: 50,
    message: "50자 이하 입력하세요",
  },
};
