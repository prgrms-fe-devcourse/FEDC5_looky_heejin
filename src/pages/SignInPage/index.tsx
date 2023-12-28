import { _SIGNIN } from "@/api/queries/signin";
import { ISignIn } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";

interface ISigninModify extends ISignIn {
  passwordCheck: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninModify>();

  const fetchSignIn = async (signInData: ISignIn) => {
    const res = await _SIGNIN(signInData);
    console.log(res);
  };

  return <div>SignInPage</div>;
};

export default SignInPage;
