import styled from "styled-components";
import ProfileView from "./ProfileView";
import ProfilePostsView from "./ProfilePostsView";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/constants/queryKey";
import { _SEARCH_USERS } from "@/api/queries/search";
import { _GET_USER } from "@/api/queries/profile";
import { useEffect, useState } from "react";
import { IUser } from "@/types";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  const [userData, setUserData] = useState<IUser>();
  const [isFollow, setIsFollow] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

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
    console.log("팔로우 클릭!");
    e.stopPropagation();
    setIsFollow(!isFollow);
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
