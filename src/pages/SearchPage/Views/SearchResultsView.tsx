import { useEffect, useMemo, useState } from "react";
import { SearchPostsView, SearchUsersView } from ".";
import { useQuery } from "@tanstack/react-query";
import { _SEARCH, _SEARCH_USERS } from "@/api/queries/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPost, IUser } from "@/types";
import { ViewWrap } from "@/pages/SearchPage/SearchPage.styles";
import SearchTab from "@/components/SearchTab";
import { Spinner } from "@/components/common/Spinner";

interface FilteredData {
  users: IUser[];
  posts: IPost[];
}

const SearchResultsView = ({
  onTagClick,
}: {
  onTagClick: (clickedKeyword: string) => void;
}) => {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [postsData, setPostsData] = useState<IPost[]>([]);
  const [showUsers, setShowUsers] = useState(true);
  const [searchParams, _] = useSearchParams();

  const query = searchParams.get("keyword");
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["search/all", query ?? ""],
    queryFn: async ({ queryKey }) => await _SEARCH(queryKey[1]),
    staleTime: 0,
  });

  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    if (isSuccess) {
      if (!data) return { users: [], posts: [] };

      const copy = [...data];
      if (copy.length === 0) {
        setUsersData([]);
        setPostsData([]);
      }

      const filtered = copy?.reduce<FilteredData>(
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

      return filtered;
    }
  }, [data]);

  useEffect(() => {
    if (!filteredData) return;

    const filteredUsers = filteredData?.users;
    const filteredPosts = filteredData?.posts;

    setUsersData(filteredUsers);
    setPostsData(filteredPosts);
  }, [filteredData]);

  const handleTabClick = (tabOption: string) => {
    if (tabOption === "user") {
      setShowUsers(true);
    } else {
      setShowUsers(false);
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  if (isLoading) {
    return (
      <ViewWrap>
        <Spinner />
      </ViewWrap>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      <ViewWrap>
        {showUsers ? (
          <SearchTab option="user" onClick={handleTabClick}></SearchTab>
        ) : (
          <SearchTab option="post" onClick={handleTabClick}></SearchTab>
        )}
        {showUsers ? (
          <SearchUsersView
            usersData={usersData}
            onTagClick={onTagClick}
            onClick={handleUserClick}
          />
        ) : (
          <SearchPostsView postsData={postsData} onTagClick={onTagClick} />
        )}
      </ViewWrap>
    </section>
  );
};

export default SearchResultsView;
