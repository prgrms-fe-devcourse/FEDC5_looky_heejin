import { Row } from "@/styles/GlobalStyle";
import { IPost } from "@/types";
import { useEffect } from "react";
import { styled } from "styled-components";

interface IPostsProps {
  postsData: IPost[];
  onClick: (postId: string) => void;
}

const PostWrap = styled(Row)`
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Post = styled.div<{ src: string }>`
  width: calc(50% - 0.2rem);
  height: 265px;
  margin-top: 0.5rem;
  border-radius: 5px;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  cursor: pointer;
  &:hover {
    filter: brightness(85%);
  }
`;

const PostInfo = styled.div`
  height: 50px;
`;

const SearchPostsView = ({ postsData }: IPostsProps) => {
  useEffect(() => {
    console.log("Posts:  ", postsData);
  }, [postsData]);

  // Todo: 슬라이드뷰

  return (
    <section>
      <PostWrap>
        {Array.isArray(postsData) && postsData.length > 0 ? (
          postsData.map(post => (
            <Post key={post._id} src={post.image}>
              <PostInfo>{post.title}</PostInfo>
            </Post>
          ))
        ) : (
          <div>포스트가 없습니다</div>
        )}
      </PostWrap>
    </section>
  );
};

export default SearchPostsView;
