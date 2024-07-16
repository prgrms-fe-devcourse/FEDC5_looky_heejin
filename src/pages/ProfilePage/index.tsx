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
import { useNotification } from "@/hooks/useNotification";
import { notify } from "@/utils/toast";
import { Spinner } from "@/components/common";

const ProfilePage = () => {
  const { setProfileName, setProfileImage, setProfileCover, profileInit } =
    useProfile();
  const [, setToken] = useLocalStorage("auth_token");
  const [, setKeywords] = useLocalStorage("keywords");
  const { setNotification } = useNotification();
  const { setMe } = useMe();
  const { setAuth } = useAuth();
  const { openModal, setModalView } = useUI();

  const [userData, setUserData] = useState<IUser>();

  const { id: paramsId } = useParams();
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
    const isLogout = confirm("로그아웃을 하시겠습니까?");
    if (isLogout) {
      setAuth({ isLogIn: false, token: null });
      setMe({ id: "", profilePhoto: "", userName: "" });
      setToken(null);
      setKeywords([]);
      setNotification({
        common: [],
        message: [],
      });
      profileInit();

      notify({
        type: "success",
        text: "정상적으로 로그아웃됐습니다.",
      });
      navigate(`/login`);
    }
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
    return <Spinner />;
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
