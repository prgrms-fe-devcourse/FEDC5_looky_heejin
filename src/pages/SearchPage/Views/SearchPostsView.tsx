import { IPost } from "@/types";
import { Post, PostInfo, PostWrap } from "@/pages/SearchPage/SearchPage.styles";
import { SearchEmptyView } from ".";

interface IPostsProps {
  postsData: IPost[];
  onTagClick: (clickedKeyword: string) => void;
  onClick: (postId: string) => void;
}

const SearchPostsView = ({ onClick, onTagClick, postsData }: IPostsProps) => {
  return (
    <>
      <PostWrap>
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData
            .filter(post => post.image !== undefined)
            .map(post => {
              return (
                <Post
                  key={post._id}
                  src={post.image!}
                  onClick={() => onClick(post._id)}
                >
                  <PostInfo>{post.title}</PostInfo>
                </Post>
              );
            })
        ) : (
          <SearchEmptyView onTagClick={onTagClick}>
            찾는 포스트가 없습니다.
          </SearchEmptyView>
        )}
      </PostWrap>
    </>
  );
};

export default SearchPostsView;
