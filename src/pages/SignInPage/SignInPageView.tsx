import { _SIGNIN } from "@/api/queries/signin";
import { ISignIn } from "@/types";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormContainer, SignInPageContainer } from "./SignInPage.styles";
import SignInPageConstant from "./SignInPage.const";
import { useEffect } from "react";

interface ISigninModify extends ISignIn {
  passwordCheck: string;
}

const SignInPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ISigninModify>({
    mode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      passwordCheck: "",
    },
  });

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

  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다!",
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  return (
    <SignInPageContainer>
      <FormContainer
        autoComplete="off"
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <input
          type="text"
          placeholder="이메일"
          {...register("email", SignInPageConstant.EMAIL_VALIDATION_OPTION)}
        />
        {errors.email?.message ? <span>{errors.email?.message}</span> : null}
        <input
          type="text"
          placeholder="닉네임"
          {...register(
            "fullName",
            SignInPageConstant.FULLNAME_VALIDATION_OPTION
          )}
        />
        {errors.fullName?.message ? (
          <span>{errors.fullName?.message}</span>
        ) : null}
        <input
          type="password"
          placeholder="비밀번호"
          {...register(
            "password",
            SignInPageConstant.PASSWORD_VALIDATION_OPTION
          )}
        />
        {errors.password?.message ? (
          <span>{errors.password?.message}</span>
        ) : null}
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordCheck", {
            required: true,
            validate: {
              matchPassword: value => {
                const { password } = getValues();
                return password === value || "비밀번호가 일치하지 않습니다!";
              },
            },
          })}
        />
        {errors.passwordCheck ? (
          <span>{errors.passwordCheck.message}</span>
        ) : null}
        <button onSubmit={handleSubmit(onValid, onInValid)}>회원가입</button>
      </FormContainer>
    </SignInPageContainer>
  );
};

export default SignInPage;
