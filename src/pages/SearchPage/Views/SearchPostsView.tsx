import { IPost } from "@/types";
import { PostWrap } from "@/pages/SearchPage/SearchPage.styles";
import { SearchEmptyView } from ".";
import PostSimpleCard from "@/components/common/PostSimpleCard";

interface IPostsProps {
  postsData: IPost[];
  onTagClick: (clickedKeyword: string) => void;
}

const SearchPostsView = ({ onTagClick, postsData }: IPostsProps) => {
  return (
    <>
      <PostWrap>
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData
            .filter(post => post.image !== undefined)
            .map((post, index) => {
              return (
                <PostSimpleCard key={index} postData={post}></PostSimpleCard>
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
