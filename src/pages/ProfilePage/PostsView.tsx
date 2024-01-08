import { Image } from "@/components/common";
import {
  POSTER_SIMPLE_CARD_HEIGHT,
  POSTER_SIMPLE_CARD_WIDTH,
} from "@/constants/uiConstants";
import { Col, Row } from "@/styles/GlobalStyle";
import { IPost } from "@/types";
import { styled } from "styled-components";

const DUMMY_POST: IPost[] | [] = [
  {
    likes: [],
    comments: [],
    _id: "65939d992ed4d31ff83cb123",
    title: "캐주얼_테스트",
    image:
      "https://res.cloudinary.com/learnprogrammers/image/upload/v1704172952/post/f05d1be2-9cf9-415d-bc72-354fcc23a84a.jpg",
    imagePublicId: "post/f05d1be2-9cf9-415d-bc72-354fcc23a84a",
    channel: "659236a82ed4d31ff83cb06a",
    author: "64edba4f8f63f012a6741681",
    createdAt: "2024-01-02T05:22:33.200Z",
    updatedAt: "2024-01-02T05:22:33.200Z",
    __v: 0,
  },
  {
    likes: [],
    comments: [],
    _id: "65939d992ed4d31ff83cb234",
    title: "캐주얼_테스트",
    image:
      "https://res.cloudinary.com/learnprogrammers/image/upload/v1704172952/post/f05d1be2-9cf9-415d-bc72-354fcc23a84a.jpg",
    imagePublicId: "post/f05d1be2-9cf9-415d-bc72-354fcc23a84a",
    channel: "659236a82ed4d31ff83cb06a",
    author: "64edba4f8f63f012a6741681",
    createdAt: "2024-01-02T05:22:33.200Z",
    updatedAt: "2024-01-02T05:22:33.200Z",
    __v: 0,
  },
  {
    likes: [],
    comments: [],
    _id: "65939d992ed4d31ff83cb345",
    title: "캐주얼_테스트",
    image:
      "https://res.cloudinary.com/learnprogrammers/image/upload/v1704172952/post/f05d1be2-9cf9-415d-bc72-354fcc23a84a.jpg",
    imagePublicId: "post/f05d1be2-9cf9-415d-bc72-354fcc23a84a",
    channel: "659236a82ed4d31ff83cb06a",
    author: "64edba4f8f63f012a6741681",
    createdAt: "2024-01-02T05:22:33.200Z",
    updatedAt: "2024-01-02T05:22:33.200Z",
    __v: 0,
  },
];

const Posts = styled(Col)`
  justify-content: flex-start;
  align-items: center;
  min-height: 576px;
  padding: 2rem 2rem 1rem;
`;

const PostsList = styled(Row)`
  width: 520px;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

const PostCard = styled.div`
  padding-right: calc((520px - (${POSTER_SIMPLE_CARD_WIDTH} + 10) * 3px) / 2);
  padding-bottom: 1rem;

  &:nth-child(3n) {
    padding-right: 0;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: ${POSTER_SIMPLE_CARD_WIDTH + 10}px;
  height: ${POSTER_SIMPLE_CARD_HEIGHT + 10}px;
`;

const PostsView = () => {
  return (
    <Posts>
      <PostsList>
        {DUMMY_POST && DUMMY_POST.length > 0 ? (
          DUMMY_POST.map(post => (
            <PostCard key={post._id}>
              <ImageWrap>
                <Image
                  src={post.image ? post.image : null}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </ImageWrap>
            </PostCard>
          ))
        ) : (
          <div style={{ flexGrow: "1", justifyContent: "center" }}>
            포스트를 추가해보세요!
          </div>
        )}
      </PostsList>
    </Posts>
  );
};

export default PostsView;
