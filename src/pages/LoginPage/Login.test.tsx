// src/LoginPageView.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import store from "@/store";
import { MemoryRouter } from "react-router-dom";
import { ManagedUIContext } from "@/components/common/uiContext";
import { GlobalStyle } from "@/styles/GlobalStyle";
import React from "react";
import App from "@/App";

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

const mockSetAuth = vi.fn();
const mockStoreToken = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    setAuth: mockSetAuth,
  }),
}));

vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: () => [null, mockStoreToken],
}));

const queryClient = new QueryClient();

describe("LoginPageView", () => {
  beforeEach(() => {
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/login"]}>
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
  });

  it("should render login form", () => {
    expect(
      screen.getByPlaceholderText("looky@example.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
  });

  // it("should login successfully with valid credentials", async () => {
  //   // Mocking API response
  //   global.fetch = vi.fn(() =>
  //     Promise.resolve(
  //       new Response(
  //         JSON.stringify({
  //           user: { _id: "1", fullName: "Test User", image: "" },
  //           token: "mockToken",
  //         }),
  //         { status: 200, headers: { "Content-Type": "application/json" } }
  //       )
  //     )
  //   );

  //   fireEvent.change(screen.getByPlaceholderText("looky@example.com"), {
  //     target: { value: "test@test.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
  //     target: { value: "qwer123!" },
  //   });

  //   fireEvent.click(screen.getByText("로그인"));

  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledTimes(1); // fetch가 호출되었는지 확인
  //     expect(mockSetAuth).toHaveBeenCalledWith({
  //       isLogIn: true,
  //       token: "mockToken",
  //     });
  //   });
  //   expect(mockStoreToken).toHaveBeenCalledWith(expect.any(String)); // Check if token is stored
  // });

  // beforeEach(() => {
  //   // Fetch 모킹 설정
  //   global.fetch = vi.fn();
  // });

  // it("should login successfully with valid credentials", async () => {
  //   // Mocking API response
  //   (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
  //     new Response(
  //       JSON.stringify({
  //         user: { _id: "1", fullName: "Test User", image: "" },
  //         token: "mockToken",
  //       }),
  //       { status: 200, headers: { "Content-Type": "application/json" } }
  //     )
  //   );

  //   fireEvent.change(screen.getByPlaceholderText("looky@example.com"), {
  //     target: { value: "test@test.com" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
  //     target: { value: "qwer123!" },
  //   });

  //   fireEvent.click(screen.getByText("로그인"));

  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledTimes(1);
  //     expect(mockSetAuth).toHaveBeenCalledWith({
  //       isLogIn: true,
  //       token: "mockToken",
  //     });
  //   });
  // });

  it("should show error on invalid credentials", async () => {
    // Mocking API response for error case
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(null, { status: 400 }) // 400 Unauthorized
      )
    );

    fireEvent.change(screen.getByPlaceholderText("looky@example.com"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "wrongPassword1@" },
    });

    fireEvent.click(screen.getByText("로그인"));

    await waitFor(() =>
      expect(
        screen.getByText("가입되지 않은 계정이거나 비밀번호 오류입니다!")
      ).toBeInTheDocument()
    );
  });
});
