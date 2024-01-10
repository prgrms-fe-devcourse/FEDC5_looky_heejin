import { IPost } from "@/types";
import { Posts } from "../ProfilePage.style";
import PostSimpleCard from "@/components/common/PostSimpleCard";
import { styled } from "styled-components";

interface PostsProps {
  posts: IPost[] | [];
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px -5.5px;
  width: calc(100% + 11px);
  padding-bottom: 3rem;
`;

const ProfilePostsView = ({ posts }: PostsProps) => {
  return (
    <Posts>
      {posts && posts.length > 0 ? (
        <Container>
          {posts.map((post: IPost, index) => (
            <PostSimpleCard key={index} postData={post} />
          ))}
        </Container>
      ) : (
        <div style={{ flexGrow: "1", justifyContent: "center" }}>
          포스트를 추가해보세요!
        </div>
      )}
    </Posts>
  );
};

export default ProfilePostsView;
