import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchWrap,
  SearchViewWrap,
  SearchTabWrap,
  SearchTab,
  InputWrap,
  Input,
} from "./SearchPage.styles.ts";
import { NAV_HEIGHT } from "@/constants/uiConstants";
import { IconBack } from "./Icons";
import SearchPageRecent from "./SearchPageRecent.tsx";

const SearchPage = ({ ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isTab, setIsTab] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onKeyDown = useCallback(
    (keyValue: string) => {
      if (keyValue !== "Enter") return;

      const element = refInput.current;
      if (!element) return;

      if (element.value.trim()) {
        const currentValue = element.value.trim();
        const newSearchHistory = [...searchHistory]
          .concat(currentValue)
          .slice(-5);
        setSearchHistory(newSearchHistory);
        handleSearch(currentValue);
      }
      setInputValue("");
    },
    [refInput, searchHistory, inputValue]
  );

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    // Todo: 검색 처리
    console.log(`handleSearch ${search}`);
  }, []);

  const handleHistoryClick = useCallback((clickedHistory: string) => {
    setInputValue(clickedHistory);
    handleSearch(clickedHistory);
  }, []);

  useEffect(() => {
    const element = refButton.current;

    if (element) {
      element.addEventListener("click", handleGoBack);
      return () => {
        element.removeEventListener("click", handleGoBack);
      };
    }
  }, [handleSearch]);

  return (
    <main>
      <SearchWrap>
        <InputWrap>
          <IconBack onClick={() => handleGoBack()} {...props} />
          <Input
            type="text"
            name="searchbar"
            ref={refInput}
            value={inputValue}
            onKeyDown={e => onKeyDown(e.key)}
            onChange={onChange}
            placeholder="검색어를 입력하세요"
          ></Input>
        </InputWrap>
        {isTab && (
          <SearchTabWrap {...props}>
            <SearchTab>{"사용자"}</SearchTab>
            <SearchTab>{"게시글"}</SearchTab>
          </SearchTabWrap>
        )}
        <SearchViewWrap>
          <SearchPageRecent
            searchHistory={searchHistory}
            onItemClick={handleHistoryClick}
          />
        </SearchViewWrap>
        <div style={{ height: `${NAV_HEIGHT}rem`, backgroundColor: "#dddddd" }}>
          <p>bottomNav 교체</p>
        </div>
      </SearchWrap>
    </main>
  );
};

export default SearchPage;
