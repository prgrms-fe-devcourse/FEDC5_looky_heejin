import { Col, Row } from "@/styles/GlobalStyle";
import styled from "styled-components";

const Wrapper = styled(Col)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-bottom: 1rem;
  &:first-child {
    margin-bottom: 2rem;
  }
`;

const TagWrap = styled(Row)`
  justify-content: center;
`;

const Tag = styled.div`
  padding: 0.2rem 1rem;
  border-radius: 15rem;
  background-color: ${props => props.theme.gray_200};
  margin-right: 0.7rem;
  &:hover {
    background-color: ${props => props.theme.gray_300};
    cursor: pointer;
  }
`;

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
