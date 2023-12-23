import { TEMP } from "@components/common";
import { TestH1 } from "./styles/GlobalStyle";

const App = () => {
  return (
    <>
      <TestH1 className="border-2 border-black">Hello World!</TestH1>
      <h2>Hello</h2>
      <div>{TEMP}</div>
    </>
  );
};

export default App;
