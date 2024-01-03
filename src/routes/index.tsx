import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "@/components/common/Layout";
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
  HomePage,
  CreatePostPage,
} from "@/pages";
import TestPage from "@/pages/TestPage";
import BottomNavBar from "@/components/common/Navigator/BottomNavBar";
import AuthRoute from "./AuthRoute";

const routeMap = Object.freeze({
  "/": {
    component: SplashPage,
    auth: false,
  },
  "/home": {
    component: HomePage,
    auth: false,
  },
  "/login": {
    component: LoginPage,
    auth: false,
  },
  "/signin": {
    component: SignInPage,
    auth: false,
  },
  "/channels": {
    component: ChannelsPage,
    auth: false,
  },
  "/profile/:id": {
    component: ProfilePage,
    auth: false,
  },
  "/search": {
    component: SearchPage,
    auth: false,
  },
  "/chats": {
    component: ChatsPage,
    auth: true,
  },
  "/chat/:id": {
    component: ChatPage,
    auth: true,
  },
  "/postdetail/:id": {
    component: PostDetailPage,
    auth: false,
  },
  "/newPost": {
    component: CreatePostPage,
    auth: true,
  },
  "/test": {
    component: TestPage,
    auth: false,
  },
  "*": {
    component: NotFoundPage,
    auth: false,
  },
});

const RouterComponent = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {Object.entries(routeMap).map(([route, data]) => {
            if (data.auth) {
              return (
                <Route
                  key={route}
                  path={route}
                  element={
                    <AuthRoute path={route} element={<data.component />} />
                  }
                />
              );
            }
            return (
              <Route key={route} path={route} element={<data.component />} />
            );
          })}
        </Routes>
      </Layout>
      <BottomNavBar />
    </Router>
  );
};
export default RouterComponent;
