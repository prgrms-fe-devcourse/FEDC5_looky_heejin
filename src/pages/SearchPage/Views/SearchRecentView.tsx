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
