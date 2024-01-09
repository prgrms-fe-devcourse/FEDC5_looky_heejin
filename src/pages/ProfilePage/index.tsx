import styled from "styled-components";
import ProfileView from "./ProfileView";
import ProfilePostsView from "./ProfilePostsView";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_USER, ME } from "@/constants/queryKey";
import { _FOLLOW, _GET_USER, _UNFOLLOW } from "@/api/queries/profile";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { IFollow, IUnFollow } from "@/types/profile";
import { useUI } from "@/components/common/uiContext";
import { _GET } from "@/api";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<IUser>();
  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState<string>();
  const [formData, setFormData] = useState<IFollow | IUnFollow>();

  const { openModal, setModalView, displayModal } = useUI();

  const { data: myData, refetch } = useQuery({
    queryKey: [ME],
    queryFn: async () => await _GET("/auth-user"),
  });

  const navigate = useNavigate();

  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => {
      return await _FOLLOW(formData);
    },
    onSuccess(data) {
      setIsFollow(true);
      setFollowId(data._id);
    },
    onError(error) {
      console.error("ERROR: 팔로우 실패", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnFollow) => {
      return await _UNFOLLOW(formData);
    },
    onSuccess() {
      console.log("API 성공! UnFollow");
      setIsFollow(false);
      setFollowId("");
    },
    onError(error) {
      console.error("ERROR: 언팔로우 실패", error);
    },
  });

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [GET_USER, id],
    queryFn: async () => await _GET_USER(id as string),
  });

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

  useEffect(() => {
    if (displayModal) return;

    const refetchData = async () => {
      const { data: refetchData } = await refetch();
      setUserData(refetchData?.data);
    };

    refetchData();
  }, [displayModal]);

  const handleChangeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("이미지 변경!");
  };

  const handleChangeCover = () => {
    console.log("커버이미지 변경!");
  };

  const handleClickChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/chat/${id}`);
  };

  const handleClickFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id === undefined) return;

    setFormData({
      userId: id,
    });
    console.log(myData);

    if (!isFollow) {
      followMutation.mutate(formData as IFollow);
    } else {
      unfollowMutation.mutate(formData as IUnFollow);
    }
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
              isFollow={isFollow}
              onClickPassword={handleChangePassword}
              onClickEdit={handleChangeName}
              onClickAvatar={handleChangeImage}
              onClickCover={handleChangeCover}
              onClickChat={handleClickChat}
              onClickFollow={handleClickFollow}
            />
            <ProfilePostsView posts={userData ? userData.posts : []} />
          </>
        )}
      </ProfileWrap>
    </>
  );
};

export default ProfilePage;
