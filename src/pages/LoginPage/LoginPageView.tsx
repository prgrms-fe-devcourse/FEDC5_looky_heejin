import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogInPageContainer } from "./LoginPage.styles";

interface IFormValue {
  email: string;
  password: string;
}

const LoginPageView = () => {
  return (
    <LogInPageContainer>
      <div>todo_logo</div>
      <div>todo_이메일</div>
      <div>todo_비밀번호</div>
      <div>todo_로그인 버튼</div>
      <Link to="/signin">회원가입 버튼</Link>
    </LogInPageContainer>
  );
};

export default LoginPageView;
