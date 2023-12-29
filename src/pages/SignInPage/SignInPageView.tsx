import { _SIGNIN } from "@/api/queries/signin";
import { ISignIn } from "@/types";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignInPageContainer } from "./SignInPage.styles";

interface ISigninModify extends ISignIn {
  passwordCheck: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISigninModify>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: async (formData: ISignIn) => await _SIGNIN(formData),
    onSuccess({ user }) {
      console.log("API 성공: ", user);
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const onValid: SubmitHandler<ISignIn> = (formData: ISignIn) => {
    mutation.mutate(formData);
  };

  const onInValid: SubmitErrorHandler<ISignIn> = (error): void => {
    console.log("양식이 안맞으므로 호출 X:", error);
  };

  // 유효성 검사 정규식
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <SignInPageContainer>
      <form autoComplete="off" onSubmit={handleSubmit(onValid, onInValid)}>
        <input
          type="text"
          placeholder="이메일"
          {...register("email", {
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
          })}
        />
        <input
          type="text"
          placeholder="닉네임"
          {...register("fullName", {
            required: {
              value: true,
              message: "닉네임을 입력해주세요",
            },
            minLength: {
              value: 2,
              message: "너무 짧아요!",
            },
            maxLength: {
              value: 20,
              message: "너무 길어요!",
            },
          })}
        />
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
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
              message:
                "소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.",
            },
            maxLength: {
              value: 30,
              message: "비밀번호가 너무 길어요!",
            },
          })}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordCheck", {
            required: true,
            minLength: 8,
            pattern: passwordRegex,
            maxLength: 30,
            validate: value => {
              const { password } = getValues();
              return password === value || "비밀번호가 일치하지 않습니다!";
            },
          })}
        />
        <button onSubmit={handleSubmit(onValid, onInValid)}>회원가입</button>
      </form>
    </SignInPageContainer>
  );
};

export default SignInPage;
