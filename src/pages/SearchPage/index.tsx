import { useCallback, useState } from "react";
import {
  SearchWrap,
  SearchViewWrap,
  SearchBarWrap,
} from "./SearchPage.styles.ts";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import SearchBar from "./SearchBar.tsx";
import { SearchRecentView, SearchResultsView } from "./Views/index.ts";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [recentKeywords, setRecentKeywords] = useLocalStorage("keywords");

  const navigate = useNavigate();

  const addRecentHistory = useCallback(
    (newKeyword: string) => {
      if (!newKeyword) return;

      let storedKeywords;
      try {
        storedKeywords = JSON.parse(recentKeywords || "[]");
      } catch (error) {
        console.error("JSON parsing Error", error);
        storedKeywords = [];
      }

      const newHistory = [...storedKeywords, newKeyword].slice(-5);
      setRecentKeywords(JSON.stringify(newHistory));
    },
    [recentKeywords]
  );

  const handleSearch = useCallback(
    (searchQuery: { keyword: string }) => {
      const keyword = searchQuery.keyword.trim();
      if (keyword.length < 1) return;

      addRecentHistory(keyword);

      // Todo: API 호출
    },
    [addRecentHistory]
  );

  // Todo: 쿼리 붙이기
  const handleKeywordClick = useCallback((clickedKeyword: string) => {
    handleSearch({ keyword: clickedKeyword });
  }, []);

  return (
    <main>
      <SearchWrap>
        <SearchBarWrap>
          <SearchBar
            onClick={() => navigate(-1)}
            onSearch={searchQuery => handleSearch({ keyword: searchQuery })}
          />
        </SearchBarWrap>
        <SearchViewWrap>
          {!showResults ? (
            <SearchRecentView
              recentKeywords={recentKeywords || "[]"}
              onItemClick={handleKeywordClick}
            />
          ) : (
            <SearchResultsView />
          )}
        </SearchViewWrap>
      </SearchWrap>
    </main>
  );
};

export default SearchPage;
