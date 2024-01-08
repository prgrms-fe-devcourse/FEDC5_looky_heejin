import styled from "styled-components";
import ProfileView from "./ProfileView";
import ProfilePostsView from "./ProfilePostsView";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();


  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [GET_USER, id],
    queryFn: async () => await _GET_USER(id as string),
  });

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
            />
            <ProfilePostsView posts={userData ? userData.posts : []} />
          </>
        )}
      </ProfileWrap>
    </>
  );
};

export default ProfilePage;
