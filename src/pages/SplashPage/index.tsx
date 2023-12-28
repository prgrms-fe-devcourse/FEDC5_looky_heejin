// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";
// import { SplashContainer, SplashText } from "./SplashPage.style";

// const SplashPage = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   const onRedirect = async () => {
//     await redirect("/home");
//   };

//   useEffect(() => {
//     console.log(`rendered`);
//     const timeout = setTimeout(() => {
//       setIsVisible(false);
//       // onRedirect();
//       console.log(`changed`);
//     }, 2000);

//     return () => {
//       clearTimeout(timeout);
//       setIsVisible(false);
//     };
//   }, []);

//   return isVisible ? (
//     <SplashContainer>
//       <SplashText>looky</SplashText>
//     </SplashContainer>
//   ) : null;
// };

// export default SplashPage;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SplashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      // 2초 후에 /home 경로로 이동
      navigate("/home");
    }, 2000);
    // 컴포넌트가 언마운트되면 타임아웃을 클리어하여 메모리 누수를 방지합니다.
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div>
      {/* 원하는 내용을 표시할 수 있습니다. */}
      <p>잠시 후에 /home으로 이동합니다...</p>
    </div>
  );
};
export default SplashPage;
