import Logo from "/logo.png";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  DoNotLoginLink,
  FormContainer,
  ImageContainer,
  InputContainer,
  LogInButtonContainer,
  LogInPageContainer,
  SignInLinkContainer,
} from "./LoginPage.styles";
import { _LOGIN } from "@/api/queries/login";
import { ILogIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { sha256Encrypt } from "@/utils/crypto";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LoginPageConst from "./LoginPage.const";
import { useMe } from "@/hooks/useMe";
import TooltipWrapper from "@/components/common/ToolTip";

const LoginPageView = () => {
  const { VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD } = import.meta.env;
  const { setMe } = useMe();
  const { setAuth } = useAuth();
  const [_, storeToken] = useLocalStorage("token");
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
      console.log("API 성공: ", user, token);
      setAuth({ isLogIn: true, token });
      setMe({
        id: user._id,
        userName: user.fullName,
        profilePhoto: "",
      });
      storeToken(token);
      navigate("/home");
    },
    onError(error) {
      console.error("API 에러: ", error);
    },
  });

  const onValid: SubmitHandler<ILogIn> = ({ email, password }) => {
    const filteredFormData = {
      email,
      password: sha256Encrypt(password),
    };
    mutation.mutate(filteredFormData);
    console.log(filteredFormData);
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
        <TooltipWrapper
          data-tooltip={errors.email?.message ? errors.email?.message : ""}
          $direction="right"
          $tooltip={errors.email?.message ? errors.email?.message : ""}
          $options="focus"
        >
          <InputContainer
            type="text"
            placeholder="이메일"
            {...register("email", LoginPageConst.EMAIL_VALIDATION_OPTION)}
          />
        </TooltipWrapper>

        <TooltipWrapper
          data-tooltip={
            errors.password?.message ? errors.password?.message : ""
          }
          $direction="right"
          $tooltip={errors.password?.message ? errors.password?.message : ""}
          $options="focus"
        >
          <InputContainer
            type="password"
            placeholder="비밀번호"
            {...register("password", LoginPageConst.PASSWORD_VALIDATION_OPTION)}
          />
        </TooltipWrapper>

        <LogInButtonContainer onSubmit={handleSubmit(onValid, onInValid)}>
          로그인
        </LogInButtonContainer>
      </FormContainer>
      <SignInLinkContainer to="/signin">회원가입</SignInLinkContainer>
      <DoNotLoginLink to="/home">로그인 하지 않고 이용하기</DoNotLoginLink>
    </LogInPageContainer>
  );
};

export default LoginPageView;
