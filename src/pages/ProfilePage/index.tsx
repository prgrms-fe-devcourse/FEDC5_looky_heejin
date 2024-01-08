import styled from "styled-components";
import PostsView from "./PostsView";
import ProfileView from "./ProfileView";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  return (
    <>
      <ProfileWrap>
        <ProfileView />
        <PostsView />
      </ProfileWrap>
    </>
  );
};

export default ProfilePage;
