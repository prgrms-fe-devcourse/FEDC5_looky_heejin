import { TEMP } from "@components/common";
import { TestH1 } from "./styles/GlobalStyle";
import { useUI } from "./components/common/uiContext";
import useTheme from "./hooks/useTheme";
import { useMutation } from "@tanstack/react-query";
import { ILogIn } from "./types";
import { _LOGIN } from "./api/queries/login";
import { useEffect } from "react";
// import { useAuth } from "./hooks/useAuth";
// import { useMe } from "./hooks/useMe";

const App = () => {
  const { modalView, displayModal } = useUI();
  // const { setAuth } = useAuth();
  // const { setMe } = useMe();

  const theme = useTheme();

  console.log(modalView, displayModal, theme?.theme_mode);

  const mutation = useMutation({
    mutationFn: async (formData: ILogIn) => await _LOGIN(formData),
    onSuccess({ user }) {
      console.log("SUCCESS: ", user);
      // setAuth(/..)
      //  setMe()
    },
    onError(error) {
      console.error("ERROR: ", error);
    },
  });

  useEffect(() => {
    mutation.mutate({
      email: "admin@programmers.co.kr",
      password: "programmers",
    });
  }, []);

  if (mutation.isError) {
    return <div>실패요 수고</div>;
  }

  if (mutation.isPending) {
    return <div>기다리셈</div>;
  }

  if (mutation.isSuccess)
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
