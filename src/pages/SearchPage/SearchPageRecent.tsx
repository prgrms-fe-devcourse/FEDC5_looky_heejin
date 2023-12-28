import { useEffect } from "react";
import { styled } from "styled-components";

interface SearchRecentProps {
  searchHistory: string[];
  onItemClick: (item: string) => void;
}

const LiContainer = styled.li`
  width: 300px;
  color: ${props => props.theme.gray_500};
  &:hover:not(.empty) {
    filter: brightness(50%);
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const SearchPageRecent = ({
  searchHistory,
  onItemClick,
  ...props
}: SearchRecentProps) => {
  const reversed = [...searchHistory].reverse();

  useEffect(() => {
    console.log(reversed);
  }, []);

  return (
    <section>
      <p style={{ margin: "2rem 0 1rem", fontWeight: "bold" }}>최근 검색어</p>
      <ul>
        {searchHistory.length > 0 ? (
          reversed.map((item, index) => (
            <LiContainer
              key={index}
              onClick={() => onItemClick(item)}
              {...props}
            >
              {item}
            </LiContainer>
          ))
        ) : (
          <LiContainer className="empty" {...props}>
            최근 검색어가 없습니다.
          </LiContainer>
        )}
      </ul>
    </section>
  );
};

export default SearchPageRecent;
