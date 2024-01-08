import { Image } from "@/components/common";
import { IPost } from "@/types";
import { ImageWrap, PostCard, Posts, PostsList } from "./ProfilePage.style";

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
