import ProfileView from "./Views/ProfileView";
import ProfilePostsView from "./Views/ProfilePostsView";
import { _GET_USER } from "@/api/queries/profile";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/constants/queryKey";
import { IUser } from "@/types";
import { _GET } from "@/api";
import { useUI } from "@/components/common/uiContext";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMe } from "@/hooks/useMe";

const ProfilePage = () => {
  const { setProfileName, setProfileImage, setProfileCover } = useProfile();
  const { setMe } = useMe();
  const [_, setToken] = useLocalStorage("token");

  const [userData, setUserData] = useState<IUser>();

  const { setAuth } = useAuth();
  const { id: paramsId } = useParams();
  const { openModal, setModalView } = useUI();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    isSuccess,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [GET_USER, paramsId],
    queryFn: async () => await _GET_USER(paramsId as string),
  });

  useEffect(() => {
    const updateUserData = async () => {
      const data = await refetchUser();
      setProfileName(data?.data.fullName);
      if (data?.data.image) {
        setProfileImage(data?.data.image);
      }
      if (data?.data.coverImage) {
        setProfileCover(data?.data.coverImage);
      }
      setUserData(data?.data);
    };

    updateUserData();
  }, [paramsId]);

  const handleChangePassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalView("EDIT_PASSWORD_VIEW");
    openModal();
  };

  const handleChangeName = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalView("EDIT_NAME_VIEW");
    openModal();
  };

  const handleChangeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalView("EDIT_IMAGE_VIEW");
    openModal();
  };

  const handleChangeCover = () => {
    setModalView("EDIT_COVERIMAGE_VIEW");
    openModal();
  };

  const handleClickChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/chat/${id}`);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAuth({ isLogIn: false, token: null });
    setMe({ id: "", profilePhoto: "", userName: "" });
    setToken(null);
    alert(`로그아웃!!`);
    navigate(`/login`);
  };

  useEffect(() => {
    if (isSuccess) {
      setProfileName(data.fullName);
      if (data.image) {
        setProfileImage(data.image);
      }
      if (data.coverImage) {
        setProfileCover(data.coverImage);
      }
    }
  }, [isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {userData && (
        <>
          <ProfileView
            userInfo={userData}
            onClickLogout={handleLogout}
            onClickPassword={handleChangePassword}
            onClickEdit={handleChangeName}
            onClickAvatar={handleChangeImage}
            onClickCover={handleChangeCover}
            onClickChat={handleClickChat}
          />
          <ProfilePostsView posts={userData ? userData.posts : []} />
        </>
      )}
    </>
  );
};

export default ProfilePage;
