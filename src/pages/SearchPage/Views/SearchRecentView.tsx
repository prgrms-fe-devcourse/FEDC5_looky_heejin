import { useMemo } from "react";
import { styled } from "styled-components";

interface SearchRecentProps {
  recentKeywords: string;
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

const SearchRecentView = ({
  recentKeywords,
  onItemClick,
  ...props
}: SearchRecentProps) => {
  // 최근 검색어 순으로 정렬
  const reversedKeywords = useMemo(() => {
    if (recentKeywords) {
      try {
        const parsed = JSON.parse(recentKeywords);
        const reversed = [...parsed].reverse();
        return reversed;
      } catch (error) {
        console.error("JSON parsing Error", error);
        return [];
      }
    }
    return [];
  }, [recentKeywords]);

  return (
    <section>
      <p style={{ margin: "2rem 0 1rem", fontWeight: "bold" }}>최근 검색어</p>
      <ul>
        {reversedKeywords && reversedKeywords.length > 0 ? (
          reversedKeywords.map((item, index) => (
            <LiContainer
              key={item.toString().concat(index)}
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

export default SearchRecentView;
