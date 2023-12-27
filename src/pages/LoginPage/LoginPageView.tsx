import Logo from "/logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogInPageContainer } from "./LoginPage.styles";
interface IFormData {
  id: string;
  password: string;
}

const LoginPageView = () => {
  const { register, watch, handleSubmit } = useForm<IFormData>();

  const submitForm: SubmitHandler<IFormData> = data => {
    console.log(data);
  };
  console.log(watch("id"));

  return (
    <LogInPageContainer>
      <img src={Logo} alt="루키 로고" loading="lazy" />
      <form autoComplete="off" onSubmit={handleSubmit(submitForm)}>
        <h3>로그인 폼_id</h3>
        <input
          type="text"
          {...register("id", { required: true, maxLength: 20 })}
        />
      </form>
      <form autoComplete="off" onSubmit={handleSubmit(submitForm)}>
        <h3>로그인 폼_password</h3>
        <input
          type="text"
          {...register("password", { required: true, maxLength: 20 })}
        />
      </form>
      {/* <div>todo_이메일</div>
      <div>todo_비밀번호</div> */}
      <button onClick={handleSubmit(submitForm)}>
        <div>todo_로그인 버튼</div>
      </button>
      <Link to="/signin">회원가입 버튼</Link>
    </LogInPageContainer>
  );
};

export default LoginPageView;
