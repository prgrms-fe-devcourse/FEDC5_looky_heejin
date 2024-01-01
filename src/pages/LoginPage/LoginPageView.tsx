import Logo from "/logo.png";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  FormContainer,
  ImageContainer,
  InputContainer,
  LogInButtonContainer,
  LogInPageContainer,
  LinkContainer,
} from "./LoginPage.styles";
import { _LOGIN } from "@/api/queries/login";
import { ILogIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";

const LoginPageView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogIn>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: ILogIn) => await _LOGIN(formData),
    onSuccess({ user, token }) {
      console.log("API 성공: ", user, token);
      navigate("/home");
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const onValid: SubmitHandler<ILogIn> = ({ email, password }) => {
    const filteredFormData = {
      email,
      password: SHA256(password).toString(),
    };
    mutation.mutate(filteredFormData);
    console.log(filteredFormData);
  };

  const onInValid: SubmitErrorHandler<ILogIn> = (error): void => {
    console.log("양식이 안맞으므로 호출 X:", error);
  };

  // 유효성 검사 정규식
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <LogInPageContainer>
      <ImageContainer src={Logo} alt="루키 로고" loading="lazy" />
      <FormContainer
        autoComplete="off"
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <InputContainer
          type="text"
          placeholder="이메일"
          {...register("email", {
            required: true,
            minLength: 8,
            pattern: emailRegex,
            maxLength: 50,
          })}
        />
        {errors?.email?.type === "required" && (
          <span>이메일을 입력해주세요</span>
        )}
        {errors?.email?.type === "minLength" && <span>너무 짧아요!</span>}
        {errors?.email?.type === "pattern" && (
          <span>이메일 양식에 맞게 입력해주세요</span>
        )}
        {errors?.email?.type === "maxLength" && <span>너무 길어요!</span>}

        <InputContainer
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: true,
            // 비밀번호 정규식 검사 예외처리
            // 사유 admin계정의 비밀번호가 숫자, 특수 문자 조건을 만족하지 않음
            // pattern: passwordRegex,
            minLength: 8,
            maxLength: 30,
          })}
        />
        {errors?.password?.type === "required" && (
          <span>비밀번호를 입력해주세요</span>
        )}
        {errors?.password?.type === "minLength" && <span>너무 짧아요!</span>}
        {/* {errors?.password?.type === "pattern" && (
          <span>
            소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
          </span>
        )} */}
        {errors?.password?.type === "maxLength" && <span>너무 길어요!</span>}

        <LogInButtonContainer onSubmit={handleSubmit(onValid, onInValid)}>
          로그인
        </LogInButtonContainer>
      </FormContainer>
      <LinkContainer to="/signin">회원가입</LinkContainer>
    </LogInPageContainer>
  );
};

export default LoginPageView;
