import styled from "styled-components";
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

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const { setProfileName, setProfileImage, setProfileCover } = useProfile();
  const [userData, setUserData] = useState<IUser>();

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
      <ProfileWrap>
        {userData && (
          <>
            <ProfileView
              userInfo={userData}
              onClickPassword={handleChangePassword}
              onClickEdit={handleChangeName}
              onClickAvatar={handleChangeImage}
              onClickCover={handleChangeCover}
              onClickChat={handleClickChat}
            />
            <ProfilePostsView posts={userData ? userData.posts : []} />
          </>
        )}
      </ProfileWrap>
    </>
  );
};

export default ProfilePage;
