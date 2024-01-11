import Logo from "/logo.png";
import { _SIGNIN } from "@/api/queries/signin";
import { ISignIn } from "@/types";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  ErrorContainer,
  FormContainer,
  ImageContainer,
  InputContainer,
  SignInPageContainer,
  SpanStyle,
  SubmitButtonContainer,
} from "./SignInPage.styles";
import SignInPageConstant from "./SignInPage.const";
import { useEffect } from "react";
import { Image } from "@/components/common";
import { useNavigate } from "react-router-dom";
import { sha256Encrypt } from "@/utils/crypto";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMe } from "@/hooks/useMe";

interface ISigninModify extends ISignIn {
  passwordCheck: string;
}

const SignInPage = () => {
  const { setMe } = useMe();
  const { setAuth } = useAuth();
  const [_, storeToken] = useLocalStorage("token");
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

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData: ISignIn) => await _SIGNIN(formData),
    onSuccess({ user, token }) {
      console.log("API 성공: ", user);
      setAuth({ isLogIn: true, token });
      setMe({
        id: user._id,
        userName: user.fullName,
        profilePhoto: user.image,
      });
      storeToken(token);
      navigate("/home");
    },
    onError(error) {
      console.error("API 에러: ", error);
      alert(`API 호출 실패!`);
    },
  });

  const onValid: SubmitHandler<ISignIn> = ({ email, fullName, password }) => {
    const filteredFormData = {
      email,
      fullName,
      password: sha256Encrypt(password),
    };
    mutation.mutate(filteredFormData);
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
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  return (
    <SignInPageContainer>
      <ImageContainer>
        <Image src={Logo} width={260} height={116} />
      </ImageContainer>
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
          {...register("email", SignInPageConstant.EMAIL_VALIDATION_OPTION)}
        />
        <ErrorContainer>
          <span className="font-bold">닉네임</span>
          {errors.fullName?.message ? (
            <SpanStyle>{errors.fullName?.message}</SpanStyle>
          ) : (
            <SpanStyle></SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="text"
          placeholder="lookies"
          {...register(
            "fullName",
            SignInPageConstant.FULLNAME_VALIDATION_OPTION
          )}
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
          placeholder="비밀번호"
          {...register(
            "password",
            SignInPageConstant.PASSWORD_VALIDATION_OPTION
          )}
        />

        <ErrorContainer>
          <span className="font-bold">비밀번호 확인</span>
          {errors.passwordCheck ? (
            <SpanStyle>{errors.passwordCheck.message}</SpanStyle>
          ) : (
            <SpanStyle></SpanStyle>
          )}
        </ErrorContainer>
        <InputContainer
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordCheck", {
            ...SignInPageConstant.PASSWORD_CHECK_VALIDATION_OPTION,
            validate: {
              matchPassword: value => {
                const { password } = getValues();
                return password === value || "비밀번호가 일치하지 않습니다!";
              },
            },
          })}
        />

        <SubmitButtonContainer onSubmit={handleSubmit(onValid, onInValid)}>
          회원가입
        </SubmitButtonContainer>
      </FormContainer>
    </SignInPageContainer>
  );
};

export default SignInPage;
