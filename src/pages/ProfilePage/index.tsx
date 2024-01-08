import styled from "styled-components";
import ProfileView from "./ProfileView";
import ProfilePostsView from "./ProfilePostsView";

const ProfileWrap = styled.div`
  overflow-y: scroll;
`;

const ProfilePage = () => {
  return (
    <>
      <ProfileWrap>
        <ProfileView />
        <ProfilePostsView />
      </ProfileWrap>
    </>
  );
};

export default ProfilePage;
