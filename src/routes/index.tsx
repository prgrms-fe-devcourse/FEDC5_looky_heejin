import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "@/components/common/Layout";
import {
  LoginPage,
  SplashPage,
  SignInPage,
  ChannelsPage,
  ProfilePage,
  SearchPage,
  ChatPage,
  PostDetailPage,
  NotFoundPage,
  HomePage,
  CreatePostPage,
  NotificationsPage,
  ChatsPage,
} from "@/pages";
import TestPage from "@/pages/TestPage";
import TopNavBar from "@/components/common/Navigator/TopNavBar/TopNavBar";
import BottomNavBar from "@/components/common/Navigator/BottomNavBar/BottomNavBar";
import AuthRoute from "./AuthRoute";

const RouterComponent = () => {
  return (
    <Router>
      <TopNavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route
            path="/profile/:id"
            element={
              <AuthRoute path="/profile/:id" element={<ProfilePage />} />
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route
            path="/chats"
            element={<AuthRoute path="/chats" element={<ChatsPage />} />}
          />
          <Route
            path="/chat/:id"
            element={<AuthRoute path="/chat/:id" element={<ChatPage />} />}
          />
          <Route path="/postdetail/:id" element={<PostDetailPage />} />
          <Route path="/newPost" element={<CreatePostPage />} />
          <Route
            path="/notifications"
            element={
              <AuthRoute
                path="/notifications"
                element={<NotificationsPage />}
              />
            }
          />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <BottomNavBar />
    </Router>
  );
};
export default RouterComponent;
