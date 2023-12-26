import { TEMP } from "@components/common";
import { TestH1 } from "./styles/GlobalStyle";
import { useUI } from "./components/common/uiContext";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { modalView, displayModal } = useUI();

  const theme = useTheme();

  console.log(modalView, displayModal, theme?.theme_mode);

  return (
    // Todo
    // Homepage 를 따로 불러서
    <>
      <TestH1 className="border-2 border-black">Hello World!</TestH1>
      <h2>Hello</h2>
      <div>{TEMP}</div>
    </>
  );
};

export default App;
