import styled from "styled-components";
import ProfileView from "./Views/ProfileView";
import ProfilePostsView from "./Views/ProfilePostsView";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/constants/queryKey";
import { _FOLLOW, _GET_USER, _UNFOLLOW } from "@/api/queries/profile";
import { useEffect, useState } from "react";
import { IUser } from "@/types";

import { useUI } from "@/components/common/uiContext";
import { _GET, rootAPI } from "@/api";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const { id: paramsId } = useParams();
  const [userData, setUserData] = useState<IUser>();

  const { openModal, setModalView } = useUI();

  const navigate = useNavigate();

  useEffect(() => {
    rootAPI.defaults.headers["Content-Type"] = "multipart/form-data";
    return () => {
      rootAPI.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
    };
  }, []);

  const { data, isLoading, error, isSuccess, refetch } = useQuery({
    queryKey: [GET_USER, paramsId],
    queryFn: async () => await _GET_USER(paramsId as string),
  });

  useEffect(() => {
    const updateUserData = async () => {
      const data = await refetch();
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
      setUserData(data);
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
