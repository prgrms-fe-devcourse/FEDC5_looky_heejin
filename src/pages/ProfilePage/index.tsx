import styled from "styled-components";
import ProfileView from "./ProfileView";
import ProfilePostsView from "./ProfilePostsView";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/constants/queryKey";
import { _FOLLOW, _GET_USER, _UNFOLLOW } from "@/api/queries/profile";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { IFollow, IUnFollow } from "@/types/profile";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<IUser>();
  const [isFollow, setIsFollow] = useState(false);
  const [formData, setFormData] = useState<IFollow | IUnFollow>();

  const navigate = useNavigate();

  const followMutation = useMutation({
    mutationFn: async (formData: IFollow) => {
      return await _FOLLOW(formData);
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.error("ERROR: ", error);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (formData: IUnFollow) => {
      return await _UNFOLLOW(formData);
    },
    onSuccess(data) {
      console.log("API 성공! UnFollow");
      console.log(data);
    },
    onError(error) {
      console.error("ERROR: ", error);
    },
  });

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [GET_USER, id],
    queryFn: async () => await _GET_USER(id as string),
  });

  const handleChangePassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("비밀번호 변경!");
  };

  const handleChangeName = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("이름 변경!");
  };

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
    setIsFollow(!isFollow);

    if (id === undefined) return;

    setFormData({
      userId: id,
    });

    if (!isFollow) {
      followMutation.mutate(formData as IFollow);
    } else {
      unfollowMutation.mutate(formData as IUnFollow);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
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
