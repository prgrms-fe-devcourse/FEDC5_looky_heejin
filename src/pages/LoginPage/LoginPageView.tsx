import Logo from "/logo.png";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  DoNotLoginLink,
  ErrorContainer,
  FormContainer,
  ImageContainer,
  InputContainer,
  LogInButtonContainer,
  LogInPageContainer,
  SignInLinkContainer,
  SpanStyle,
} from "./LoginPage.styles";
import { _LOGIN } from "@/api/queries/login";
import { ILogIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { aesEncrypt, sha256Encrypt } from "@/utils/crypto";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LoginPageConst from "./LoginPage.const";
import { useMe } from "@/hooks/useMe";
import { notify } from "@/utils/toast";

const LoginPageView = () => {
  const { VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD } = import.meta.env;
  const { setMe } = useMe();
  const { setAuth } = useAuth();
  const [_, storeToken] = useLocalStorage("auth_token");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogIn>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: ILogIn) => await _LOGIN(formData),
    onSuccess({ user, token }) {
      notify({
        type: "success",
        text: "로그인 성공!",
      });

      setAuth({ isLogIn: true, token });
      setMe({
        id: user._id,
        userName: user.fullName,
        profilePhoto: user.image,
      });
      const encrypted = aesEncrypt(token);
      storeToken(encrypted);
      navigate("/home");
    },
    onError(error) {
      notify({
        type: "error",
        text: "가입되지 않은 계정이거나 비밀번호 오류입니다!",
      });
      console.error("API 에러: ", error);
    },
  });

  const onValid: SubmitHandler<ILogIn> = ({ email, password }) => {
    const filteredFormData = {
      email,
      password: sha256Encrypt(password),
    };
    mutation.mutate(filteredFormData);
  };

  const onInValid: SubmitErrorHandler<ILogIn> = (error): void => {
    if (
      getValues("email") === VITE_ADMIN_EMAIL &&
      error.password?.ref?.value === VITE_ADMIN_PASSWORD
    ) {
      const superUser = {
        email: VITE_ADMIN_EMAIL,
        password: VITE_ADMIN_PASSWORD,
      };
      mutation.mutate(superUser);
    } else {
      console.error("양식이 안맞으므로 호출 X:", error);
    }
  };

  return (
    <LogInPageContainer>
      <ImageContainer src={Logo} alt="루키 로고" loading="lazy" />
      <FormContainer
        autoComplete="off"
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <ErrorContainer>
          <span className="font-bold">이메일</span>
          {errors.email?.message ? (
            <SpanStyle>{errors.email?.message}</SpanStyle>
          ) : (
            <SpanStyle></SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="text"
          placeholder="looky@example.com"
          {...register("email", LoginPageConst.EMAIL_VALIDATION_OPTION)}
        />

        <ErrorContainer>
          <span className="font-bold">비밀번호</span>
          {errors.password?.message ? (
            <SpanStyle>{errors.password?.message}</SpanStyle>
          ) : (
            <SpanStyle></SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="password"
          aria-required="true"
          placeholder="비밀번호"
          {...register("password", LoginPageConst.PASSWORD_VALIDATION_OPTION)}
        />

        <LogInButtonContainer
          aria-label="로그인 요청 버튼"
          aria-required="true"
          onSubmit={handleSubmit(onValid, onInValid)}
        >
          로그인
        </LogInButtonContainer>
      </FormContainer>
      <SignInLinkContainer aria-label="회원가입 페이지 전환 버튼" to="/signin">
        회원가입
      </SignInLinkContainer>
      <DoNotLoginLink aria-label="로그인 하지 않고 사용하기 버튼" to="/home">
        로그인 하지 않고 이용하기
      </DoNotLoginLink>
    </LogInPageContainer>
  );
};

export default LoginPageView;
