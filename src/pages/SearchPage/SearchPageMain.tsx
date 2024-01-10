import { useEffect } from "react";
import { styled } from "styled-components";

interface SearchMainProps {
  searchHistory: string[];
}

const LiContainer = styled.li`
  color: ${props => props.theme.gray_500};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const SearchPageMain = ({ searchHistory, ...props }: SearchMainProps) => {
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
            <LiContainer {...props} key={index}>
              {item}
            </LiContainer>
          ))
        ) : (
          <LiContainer {...props}>최근 검색어가 없습니다.</LiContainer>
        )}
      </ul>
    </section>
  );
};

export default SearchPageMain;
