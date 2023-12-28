import Logo from "/logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
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

const LoginPageView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogIn>({
    mode: "onChange",
  });

  // 유효성 검사 정규식
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const fetchLogIn: SubmitHandler<ILogIn> = async (formData: ILogIn) => {
    const res = await _LOGIN(formData);
    // 요기서 redux 데이터 설정
    // 23.12.27 2320 API 응답 확인
    if (res) console.log(res);
  };

  return (
    <LogInPageContainer>
      <ImageContainer src={Logo} alt="루키 로고" loading="lazy" />
      <FormContainer autoComplete="off" onSubmit={handleSubmit(fetchLogIn)}>
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

        <LogInButtonContainer onSubmit={handleSubmit(fetchLogIn)}>
          로그인
        </LogInButtonContainer>
      </FormContainer>
      <LinkContainer to="/signin">회원가입</LinkContainer>
    </LogInPageContainer>
  );
};

export default LoginPageView;
