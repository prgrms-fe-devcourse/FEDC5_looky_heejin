import { Route, Routes } from "react-router-dom";

import { Layout, Spinner } from "@/components/common";
import TopNavBar from "@/components/common/Navigator/TopNavBar/TopNavBar";
import BottomNavBar from "@/components/common/Navigator/BottomNavBar/BottomNavBar";
import AuthRoute from "./AuthRoute";
import Transition from "./Transition";
import Toast from "@/utils/toast";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SplashPage = lazy(() => import("@/pages/SplashPage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const ChannelsPage = lazy(() => import("@/pages/ChannelsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const PostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const CreatePostPage = lazy(() => import("@/pages/CreatePostPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const ChatsPage = lazy(() => import("@/pages/ChatsPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));

const RouterComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TopNavBar />
      <Layout>
        <Routes>
          <Route element={<Transition />}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/chats"
              element={<AuthRoute path="/chats" element={<ChatsPage />} />}
            />
            <Route
              path="/chat/:id"
              element={<AuthRoute path="/chat/:id" element={<ChatPage />} />}
            />
            <Route path="/postdetail/:id" element={<PostDetailPage />} />
            <Route
              path="/newPost"
              element={
                <AuthRoute path="/newPost" element={<CreatePostPage />} />
              }
            />
            <Route
              path="/notifications"
              element={
                <AuthRoute
                  path="/notifications"
                  element={<NotificationsPage />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Layout>
      <BottomNavBar />
      <Toast />
    </Suspense>
  );
};
export default RouterComponent;
