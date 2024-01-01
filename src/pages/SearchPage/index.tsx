import { useCallback, useEffect, useState } from "react";
import {
  SearchWrap,
  SearchViewWrap,
  SearchBarWrap,
} from "./SearchPage.styles.ts";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import SearchBar from "./SearchBar.tsx";
import { SearchRecentView, SearchResultsView } from "./Views/index.ts";

const SearchPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [recentKeywords, setRecentKeywords] = useLocalStorage("keywords");

  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

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
      setSearchParams({ keyword: keyword });

      // Todo: API 호출
    },
    [addRecentHistory]
  );

  // 최근 검색어 클릭하면 Search
  const handleKeywordClick = useCallback((clickedKeyword: string) => {
    handleSearch({ keyword: clickedKeyword });
  }, []);

  useEffect(() => {
    if (location.search === "") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }, [location.search]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.addEventListener("popstate", e => {
      e.preventDefault();
    });
    return window.removeEventListener("popstate", e => {
      e.preventDefault();
    });
  }, []);

  return (
    <main>
      <SearchWrap>
        <SearchBarWrap>
          <SearchBar
            onClick={handleGoBack}
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
