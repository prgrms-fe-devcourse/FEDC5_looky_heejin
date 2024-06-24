import { useMemo } from "react";
import { LiContainer } from "@/pages/SearchPage/SearchPage.styles";

interface SearchRecentProps {
  recentKeywords: string;
  onItemClick: (item: string) => void;
}

const SearchRecentView = ({
  recentKeywords,
  onItemClick,
  ...props
}: SearchRecentProps) => {
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    item: string
  ) => {
    if (event.key === "Enter") {
      onItemClick(item);
    }
  };

  return (
    <section>
      <p
        style={{
          margin: "1rem 0 1rem",
          fontWeight: "bold",
          paddingTop: "1rem",
        }}
      >
        최근 검색어
      </p>
      <ul>
        {reversedKeywords && reversedKeywords.length > 0 ? (
          reversedKeywords.map((item, index) => (
            <LiContainer
              tabIndex={0}
              aria-label={`최근 검색어 ${item}으로 검색`}
              key={item.toString().concat(index)}
              onClick={() => onItemClick(item)}
              onKeyDown={event => handleKeyDown(event, item)}
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
