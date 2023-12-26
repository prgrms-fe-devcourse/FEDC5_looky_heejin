import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { GlobalStyle } from "./styles/GlobalStyle.tsx";
import "./styles/tailwind.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ManagedUIContext } from "./components/common/uiContext.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ManagedUIContext>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ManagedUIContext>
    </Provider>
  </React.StrictMode>
);
