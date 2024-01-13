import { Tag, TagWrap, Text, Wrapper } from "../SearchPage.styles";

interface SearchEmptyProps {
  children: React.ReactNode;
  onTagClick: (clickedKeyword: string) => void;
}

const SearchEmptyView = ({ children, onTagClick }: SearchEmptyProps) => {
  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const clickedKeyword = target?.textContent;
    clickedKeyword && onTagClick(clickedKeyword);
  };

  return (
    <>
      <Wrapper>
        <Text>{children}</Text>
        <Text>다음의 키워드를 검색해 보세요</Text>
        <TagWrap>
          <Tag onClick={onClick}>캐주얼</Tag>
        </TagWrap>
      </Wrapper>
    </>
  );
};

export default SearchEmptyView;
