import { useEffect, useState } from "react";
import { SearchPostsView, SearchUsersView } from ".";
import { useQuery } from "@tanstack/react-query";
import { _SEARCH, _SEARCH_USERS } from "@/api/queries/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPost, IUser } from "@/types";
import { ViewWrap } from "@/pages/SearchPage/SearchPage.styles";
import SearchTab from "@/components/SearchTab";

interface FilteredData {
  users: IUser[];
  posts: IPost[];
}

const SearchResultsView = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [postsData, setPostsData] = useState<IPost[]>([]);
  const [showUsers, setShowUsers] = useState(true);
  const [searchParams, _] = useSearchParams();

  const query = searchParams.get("keyword");
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["search/all", query ?? ""],
    queryFn: async ({ queryKey }) => await _SEARCH(queryKey[1]),
  });

  const navigate = useNavigate();

  // 사용자, 게시글 데이터를 분리
  useEffect(() => {
    if (isSuccess) {
      const copy = [...data];
      if (copy.length < 2) return;

      const filteredData = copy.reduce<FilteredData>(
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
    }
  }, [isSuccess]);

  const handleTabClick = () => {
    setShowUsers(!showUsers);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/profile/${postId}`);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
