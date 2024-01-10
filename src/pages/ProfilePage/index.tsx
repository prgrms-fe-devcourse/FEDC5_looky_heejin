import styled from "styled-components";
import ProfileView from "./Views/ProfileView";
import ProfilePostsView from "./Views/ProfilePostsView";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GET_USER, ME } from "@/constants/queryKey";
import { _FOLLOW, _GET_USER, _UNFOLLOW } from "@/api/queries/profile";
import { useEffect, useState } from "react";
import { IUser } from "@/types";

import { useUI } from "@/components/common/uiContext";
import { _GET } from "@/api";
import useEventQuery from "@/hooks/useEventQuery";
import { useProfile } from "@/hooks/useProfile";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const { setProfileName, setProfileImage, setProfileCover } = useProfile();
  const { displayModal } = useUI();
  // console.log(displayModal, modalProps, modalView);
  const { id: paramsId } = useParams();
  const [userData, setUserData] = useState<IUser>();
  const [modalState, setModalState] = useState(displayModal);
  // console.log(modalState);

  const { openModal, setModalView } = useUI();

  const navigate = useNavigate();

  // 나
  const { refetch: myRefetch } = useEventQuery({
    key: ME,
    endPoint: "/auth-user",
  });

  const fetchUser = async (id: string) => {
    try {
      const res = await _GET_USER(id);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // 이 프로필 주인
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
      // 현재 프로필에 대한 data
      console.log("첫 번째 isSuccess!!! ", data);
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
