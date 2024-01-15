const emailRegex =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])[\da-zA-Z!@#$%^&*+=-]{8,}$/;

const EMAIL_VALIDATION_OPTION = {
  required: {
    value: true,
    message: "이메일을 입력해주세요",
  },
  minLength: {
    value: 8,
    message: "너무 짧아요!",
  },
  pattern: {
    value: emailRegex,
    message: "이메일 양식에 맞게 입력해주세요",
  },
  maxLength: {
    value: 50,
    message: "너무 길어요!",
  },
};

const PASSWORD_VALIDATION_OPTION = {
  required: {
    value: true,
    message: "비밀번호를 입력해주세요",
  },
  minLength: {
    value: 8,
    message: "비밀번호는 8자 이상이여야 해요!",
  },
  pattern: {
    value: passwordRegex,
    message: "영문, 숫자, 특수문자를 포함해야 해요!",
  },
  maxLength: {
    value: 30,
    message: "비밀번호가 너무 길어요!",
  },
};

export default {
  EMAIL_VALIDATION_OPTION,
  PASSWORD_VALIDATION_OPTION,
};
