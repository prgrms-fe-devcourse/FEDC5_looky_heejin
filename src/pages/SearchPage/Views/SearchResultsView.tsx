import { SearchTab } from "@/components/SearchPage";
import { useEffect, useState } from "react";
import { SearchPostsView, SearchUsersView } from ".";
import { useQuery } from "@tanstack/react-query";
import { _SEARCH, _SEARCH_USERS } from "@/api/queries/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPost, IUser } from "@/types";
import styled from "styled-components";
import { Col } from "@/styles/GlobalStyle";

const DUMMY_DATA = [
  {
    likes: [],
    comments: [],
    _id: "65939d992ed4d31ff83cb123",
    title: "캐주얼_테스트1",
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
    _id: "65939d992ed4d31ff83cb124",
    title: "캐주얼_테스트2",
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
    _id: "65939d992ed4d31ff83cb125",
    title: "캐주얼_테스트3",
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
    _id: "65939d992ed4d31ff83cb126",
    title: "캐주얼_테스트4",
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
    _id: "65939d992ed4d31ff83cb127",
    title: "캐주얼_테스트5",
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
    role: "Regular",
    emailVerified: false,
    banned: false,
    isOnline: false,
    posts: [],
    likes: [],
    comments: [],
    followers: [],
    following: [],
    notifications: [],
    messages: [],
    _id: "6593c7492ed4d31ff83cb929",
    fullName: "캐주얼시민",
    email: "qwer@qweqwe.com",
    createdAt: "2024-01-02T08:20:25.581Z",
    updatedAt: "2024-01-02T08:20:25.581Z",
    __v: 0,
  },
];

const ViewWrap = styled(Col)`
  flex-basis: 100vh;
`;

const SearchResultsView = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [postsData, setPostsData] = useState<IPost[]>([]);
  const [showUsers, setShowUsers] = useState(true);
  const [searchParams, _] = useSearchParams();
  // const query = searchParams.get("keyword");
  // const { data, isLoading, error, isSuccess } = useQuery({
  //   queryKey: ["search/all", query ?? ""],
  //   queryFn: ({ queryKey }) => _SEARCH(queryKey[1]),
  // });

  const navigate = useNavigate();

  interface FilteredData {
    users: any[];
    posts: any[];
  }

  // 사용자, 게시글 데이터를 분리
  useEffect(() => {
    const copy = [...DUMMY_DATA];

    const filteredData: FilteredData = copy.reduce<FilteredData>(
      (results, item) => {
        if (item.title) {
          results.posts = results.posts.concat(item);
        } else {
          results.users = results.users.concat(item);
        }
        return results;
      },
      { users: [], posts: [] }
    );

    const filteredUsers = filteredData.users;
    const filteredPosts = filteredData.posts;

    setUsersData(filteredUsers);
    setPostsData(filteredPosts);
  }, [DUMMY_DATA]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     const copy = [...data];
  //     if (copy.length < 0) return;

  //     // const addImageUsers = copy.map(user => ({
  //     //   ...user,
  //     //   coverImage: "https://picsum.photos/100",
  //     //   image: "https://picsum.photos/100",
  //     // }));

  //     const filteredUsers = copy.filter(item => item.title);
  //     const filteredPosts = copy.filter(item => !item.title);

  //     console.log(filteredUsers);
  //     console.log(filteredPosts);

  //     setUsersData(filteredUsers);
  //     setPostsData(filteredPosts);
  //   }
  // }, [isSuccess]);

  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  const handleTabClick = () => {
    setShowUsers(!showUsers);
  };

  const handleUserClick = (userId: string) => {
    console.log("UserClicked!" + userId);
    navigate(`/profile/${userId}`);
  };

  const handlePostClick = (postId: string) => {
    console.log("PostClicked!" + postId);
  };

  return (
    <div>
      <ViewWrap>
        {showUsers ? (
          <SearchTab option="user" onClick={handleTabClick}></SearchTab>
        ) : (
          <SearchTab option="post" onClick={handleTabClick}></SearchTab>
        )}
        {showUsers ? (
          <SearchUsersView usersData={usersData} onClick={handleUserClick} />
        ) : (
          <SearchPostsView postsData={postsData} onClick={handlePostClick} />
        )}
      </ViewWrap>
    </div>
  );
};

export default SearchResultsView;
