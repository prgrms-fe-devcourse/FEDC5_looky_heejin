import { SearchTab } from "@/components/SearchPage";
import { useState } from "react";
import { SearchPostsView, SearchUsersView } from ".";

const SearchResultsView = () => {
  const [showUsers, setShowUsers] = useState(true);

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
      {showUsers ? <SearchUsersView /> : <SearchPostsView />}
    </div>
  );
};

export default SearchResultsView;
