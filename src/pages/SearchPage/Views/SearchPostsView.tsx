import { Row } from "@/styles/GlobalStyle";
import { IPost } from "@/types";
import { Post, PostInfo, PostWrap } from "@/pages/SearchPage/SearchPage.styles";

interface IPostsProps {
  postsData: IPost[];
  onClick: (postId: string) => void;
}

const SearchPostsView = ({ postsData }: IPostsProps) => {
  // Todo: 슬라이드뷰

  return (
    <section>
      <PostWrap>
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData
            .filter(post => post.image !== undefined)
            .map(post => {
              return (
                <Post key={post._id} src={post.image!}>
                  <PostInfo>{post.title}</PostInfo>
                </Post>
              );
            })
        ) : (
          <div>포스트가 없습니다</div>
        )}
      </PostWrap>
    </section>
  );
};

export default SearchPostsView;
