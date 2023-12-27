import { useEffect } from "react";

import { _LOGIN } from "@/api/queries/login";
import { useUI } from "@/components/common/uiContext";
import { ILogIn } from "@/types";
import { useTheme } from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { TestH1 } from "@/styles/GlobalStyle";
import { TEMP } from "@/components/common";
import Button from "@/components/common/Button";

const Home = () => {
  const { modalView, displayModal, openModal } = useUI();
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
      <div>
        <TestH1 className="border-2 border-black">Hello World!</TestH1>
        <h2>Hello</h2>
        <div>{TEMP}</div>
        <Button
          variant="neumo"
          onClickHandler={() => openModal()}
          useRipple={true}
        >
          <span>open Modal</span>
        </Button>
      </div>
    );
};

export default Home;
