const SEARCH_VALIDATION_OPTION = {
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

export default {
  SEARCH_VALIDATION_OPTION,
};
