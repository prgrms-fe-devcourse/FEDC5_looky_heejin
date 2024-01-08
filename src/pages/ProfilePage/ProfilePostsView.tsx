import { Image } from "@/components/common";
import { IPost } from "@/types";
import { ImageWrap, PostCard, Posts, PostsList } from "./ProfilePage.style";

interface PostsProps {
  posts: IPost[] | [];
}

const ProfilePostsView = ({ posts }: PostsProps) => {
  return (
    <Posts>
      {posts && posts.length > 0 ? (
        <PostsList>
          {posts.map((post: IPost) => (
            <PostCard key={post._id}>
              <ImageWrap>
                <Image
                  src={post.image ? post.image : null}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </ImageWrap>
            </PostCard>
          ))}
        </PostsList>
      ) : (
        <div style={{ flexGrow: "1", justifyContent: "center" }}>
          포스트를 추가해보세요!
        </div>
      )}
    </Posts>
  );
};

export default ProfilePostsView;
