import { useCallback, useEffect, useState } from "react";
import { SearchWrap, SearchViewWrap, SearchBarWrap } from "./SearchPage.styles";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import SearchBar from "./SearchBar";
import { SearchRecentView, SearchResultsView } from "./Views";

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
    <SearchWrap>
      <SearchBarWrap>
        <SearchBar
          onClick={handleGoBack}
          onSearch={searchQuery => handleSearch({ keyword: searchQuery })}
        />
      </SearchBarWrap>
      <SearchViewWrap style={{ overflow: "hidden" }}>
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
  );
};

export default SearchPage;
