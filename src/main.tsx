import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./styles/tailwind.css";
import { GlobalStyle } from "./styles/GlobalStyle.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/index.ts";
import { ManagedUIContext } from "./components/common/uiContext.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ManagedUIContext>
            <GlobalStyle />
            <App />
          </ManagedUIContext>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
