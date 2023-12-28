import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const onRedirect = () => {
    const navigate = useNavigate();
    navigate("/home");
    console.log(`123`);
  };
  return (
    <>
      <div>나는 로그인</div>
      <button style={{ height: "20px", width: "10px" }} onClick={onRedirect}>
        X
      </button>
      <Link to="/home">홈으로</Link>
    </>
  );
};

export default LoginPage;
