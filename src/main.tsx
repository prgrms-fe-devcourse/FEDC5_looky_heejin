import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyle } from "./styles/GlobalStyle.tsx";
import "./styles/tailwind.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { ManagedUIContext } from "./components/common/uiContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ManagedUIContext>
        <GlobalStyle />
        <App />
      </ManagedUIContext>
    </Provider>
  </React.StrictMode>
);
