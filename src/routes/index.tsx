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
} from "@/pages";
import TestPage from "@/pages/TestPage";
import TopNavBar from "@/components/common/Navigator/TopNavBar/TopNavBar";
import BottomNavBar from "@/components/common/Navigator/BottomNavBar";

const RouterComponent = () => {
  return (
    <Router>
      <Layout>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/postdetail" element={<PostDetailPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <BottomNavBar />
    </Router>
  );
};
export default RouterComponent;
