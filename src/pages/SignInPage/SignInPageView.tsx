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
      <div>SignInPage</div>
    </SignInPageContainer>
  );
};

export default SignInPage;
