import { TEMP } from "@components/common";
import { TestH1 } from "./styles/GlobalStyle";
import { useUI } from "./components/common/uiContext";
import useTheme from "./hooks/useTheme";
import SplashPage from "@pages/SplashPage";
import { useEffect, useState } from "react";

const App = () => {
  // TEST 및 참고 //
  // UI 관련 로직을 uiCntext.tsx 에서 통합적으로 관리합니다 //
  const { modalView, displayModal } = useUI();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // TEST 및 참고 //
  // 컴포넌트 내에서 theme 에 설정된 상수값을 사용하기 위해서는 //
  // useTheme 커스텀 훅을 사용합니다. //
  const theme = useTheme();

  console.log(modalView, displayModal, theme?.theme_mode);

  return isVisible ? (
    <>
      <SplashPage isVisible={isVisible} />
    </>
  ) : (
    <>
      <TestH1 className="border-2 border-black">Hello World!</TestH1>
      <h2>Hello</h2>
      <div>{TEMP}</div>
    </>
  );
};

export default App;
