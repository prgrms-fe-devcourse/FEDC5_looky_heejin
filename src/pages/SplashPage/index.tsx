import Logo from "/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashContainer } from "./SplashPage.style";
import { Image } from "@/components/common";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const SplashPage = () => {
  const [token, _] = useLocalStorage("token");
  const navigate = useNavigate();
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      token ? navigate("/home") : navigate("/login");
    }, 2000);
    // 컴포넌트가 언마운트되면 타임아웃을 클리어하여 메모리 누수를 방지합니다.
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <SplashContainer>
      <Image src={Logo} width={260} height={116} />
    </SplashContainer>
  );
};
export default SplashPage;
