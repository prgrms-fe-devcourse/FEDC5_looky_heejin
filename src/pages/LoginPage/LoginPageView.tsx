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
  const { register, handleSubmit } = useForm<ILogIn>();

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
          {...register("email", { required: true, maxLength: 39 })}
        />
      </FormContainer>
      <form autoComplete="off" onSubmit={handleSubmit(fetchLogIn)}>
        <InputContainer
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true, maxLength: 20 })}
        />
      </form>
      <LogInButtonContainer onClick={handleSubmit(fetchLogIn)}>
        로그인
      </LogInButtonContainer>
      <LinkContainer to="/signin">회원가입</LinkContainer>
    </LogInPageContainer>
  );
};

export default LoginPageView;
