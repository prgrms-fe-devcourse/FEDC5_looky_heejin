import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { _LOGIN } from "./api/queries/login";
import Layout from "./components/common/Layout";
import Home from "./pages/HomePage";
import {
  ChannelsPage,
  ChatPage,
  ChatsPage,
  LoginPage,
  NotFoundPage,
  PostDetailPage,
  ProfilePage,
  SearchPage,
  SignInPage,
  SplashPage,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chat:id" element={<ChatPage />} />
          <Route path="/postdetail" element={<PostDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
