import { IPost } from "@/types";
import { Container, EmptyPost, Posts } from "../ProfilePage.style";
import PostSimpleCard from "@/components/common/PostSimpleCard";
import { useProfile } from "@/hooks/useProfile";
interface PostsProps {
  posts: IPost[] | [];
}

const ProfilePostsView = ({ posts }: PostsProps) => {
  const { isMe } = useProfile();

  return (
    <Posts>
      {posts && posts.length > 0 ? (
        <Container>
          {posts.map((post: IPost) => (
            <PostSimpleCard key={post._id} postData={post} />
          ))}
        </Container>
      ) : isMe ? (
        <EmptyPost>포스트를 추가해 보세요!</EmptyPost>
      ) : (
        <EmptyPost>포스트가 없습니다</EmptyPost>
      )}
    </Posts>
  );
};

export default ProfilePostsView;
