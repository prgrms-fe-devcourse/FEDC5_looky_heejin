import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import {
  LoginPage,
  SplashPage,
  SignInPage,
  ChannelsPage,
  ProfilePage,
  ChatsPage,
  SearchPage,
  ChatPage,
  PostDetailPage,
  NotFoundPage,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/channels",
    element: <ChannelsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/chats",
    element: <ChatsPage />,
  },
  {
    path: "/chat:id",
    element: <ChatPage />,
  },
  {
    path: "/postdetail",
    element: <PostDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
