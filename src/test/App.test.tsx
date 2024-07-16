// src/__tests__/App.test.tsx

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";
import { Provider } from "react-redux";
import store from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ManagedUIContext } from "@/components/common/uiContext";
import { GlobalStyle } from "@/styles/GlobalStyle";

// Mocking matchMedia
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(), // 이 함수를 추가합니다
      removeListener: vi.fn(), // 이 함수도 추가합니다
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// vi.mock("framer-motion", () => {
//   const actual = vi.importActual("framer-motion");
//   return {
//     ...actual,
//     useReducedMotion: vi.fn().mockReturnValue(false),
//   };
// });

describe("App routing", () => {
  it("renders Home component at default route", () => {
    const queryClient = new QueryClient();
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/home"]}>
            <Provider store={store}>
              <ManagedUIContext>
                <GlobalStyle />
                <App />
              </ManagedUIContext>
            </Provider>
          </MemoryRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );

    const homeButton = screen.getByRole("button", {
      name: /홈 화면으로 가기/i, // 정규표현식을 사용하여 대소문자를 무시하고 검색합니다.
    });
    expect(homeButton).toBeInTheDocument();
  });
});

// it("renders About component at /about route", () => {
//   render(
//     <MemoryRouter initialEntries={["/about"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(screen.getByText("About Page")).toBeInTheDocument();
// });

// it("navigates to About page when link is clicked", () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <App />
//     </MemoryRouter>
//   );

//   const aboutLink = screen.getByText("About");
//   aboutLink.click();

// expect(screen.getByText("About Page")).toBeInTheDocument();
// });
