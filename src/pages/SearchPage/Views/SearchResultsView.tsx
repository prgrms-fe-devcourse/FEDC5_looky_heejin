import { SearchTab } from "@/components/SearchPage";
import { useEffect, useState } from "react";
import { SearchPostsView, SearchUsersView } from ".";
import { useQuery } from "@tanstack/react-query";
import { _SEARCH, _SEARCH_USERS } from "@/api/queries/search";
import { useSearchParams } from "react-router-dom";
import { IUser } from "@/types";

const SearchResultsView = () => {
  const [searchData, setSearchData] = useState<IUser[]>([]);
  const [showUsers, setShowUsers] = useState(true);
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get("keyword");
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["search/all", query ?? ""],
    queryFn: ({ queryKey }) => _SEARCH(queryKey[1]),
  });

  useEffect(() => {
    if (isSuccess) {
      const copy = [...data];
      if (copy.length < 0) return;
      const addImageUsers = copy.map(user => ({
        ...user,
        coverImage: "https://picsum.photos/100",
        image: "https://picsum.photos/100",
      }));

      setSearchData(addImageUsers);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTabClick = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div>
      {showUsers ? (
        <SearchTab option="user" onClick={handleTabClick}></SearchTab>
      ) : (
        <SearchTab option="post" onClick={handleTabClick}></SearchTab>
      )}
      {showUsers ? (
        <SearchUsersView searchData={searchData} />
      ) : (
        <SearchPostsView searchData={searchData} />
      )}
    </div>
  );
};

export default SearchResultsView;
