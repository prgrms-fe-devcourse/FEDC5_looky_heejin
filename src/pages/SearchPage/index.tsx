import styled from "styled-components";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "@/styles/GlobalStyle";
import { NAV_HEIGHT } from "@/constants/uiConstants";
import { IconBack } from "./Icons";
import SearchPageRecent from "./SearchPageMain";

const SearchWrap = styled(Col)`
  height: 100vh;
  border: 1px solid black;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SearchViewWrap = styled.div`
  flex-grow: 1;
`;

const SearchTabWrap = styled(Row)`
  margin-top: 1rem;
  height: ${`${NAV_HEIGHT - 1}rem`};
`;

const SearchTab = styled.div`
  background-color: ${({ theme }) => theme.gray_200};
  flex-grow: 1;
  text-align: center;
  line-height: ${`${NAV_HEIGHT - 1}rem`};
  cursor: pointer;
  &:first-of-type {
    border-right: 2px solid ${({ theme }) => theme.white_primary};
  }
`;

const InputWrap = styled(Row)`
  margin-top: 1rem;
  height: ${`{NAV_HEIGHT}rem`};
  align-items: center;
  flex-grow: 0;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${props => props.theme.gray_300};
  border-radius: 1rem;
  box-sizing: border-box;
`;

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
    console.log("검색 처리 값: " + search);
    // Todo: 검색 처리
  }, []);

  const handleClick = useCallback(() => {}, []);

  useEffect(() => {
    const element = refButton.current;

    if (element) {
      element.addEventListener("click", handleClick);
      return () => {
        element.removeEventListener("click", handleClick);
      };
    }
  }, [handleSearch]);

  return (
    <main>
      <SearchWrap>
        <InputWrap>
          <IconBack onClick={() => handleGoBack()} {...props} />
          <Input
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
          <SearchPageRecent searchHistory={searchHistory} />
        </SearchViewWrap>
        <div style={{ height: `${NAV_HEIGHT}rem`, backgroundColor: "#dddddd" }}>
          <p>bottomNav</p>
        </div>
      </SearchWrap>
    </main>
  );
};

export default SearchPage;
