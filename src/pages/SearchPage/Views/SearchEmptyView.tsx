import { Tag, TagWrap, Text, Wrapper } from "../SearchPage.styles";

interface SearchEmptyProps {
  children: React.ReactNode;
  onTagClick: (clickedKeyword: string) => void;
}

const SearchEmptyView = ({ children, onTagClick }: SearchEmptyProps) => {
  const handleClick = (clickedKeyword: string | null) => {
    if (clickedKeyword) {
      onTagClick(clickedKeyword);
    }
  };

  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const clickedKeyword = target?.textContent;
    handleClick(clickedKeyword);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLDivElement;
      const clickedKeyword = target?.textContent;
      handleClick(clickedKeyword);
    }
  };

  return (
    <>
      <Wrapper>
        <Text>{children}</Text>
        <Text>다음의 키워드를 검색해 보세요</Text>
        <TagWrap>
          <Tag tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
            캐주얼
          </Tag>
        </TagWrap>
      </Wrapper>
    </>
  );
};

export default SearchEmptyView;
