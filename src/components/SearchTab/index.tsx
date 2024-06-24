import { Row } from "@/styles/GlobalStyle";
import { styled } from "styled-components";
import { Button } from "../common";
import { useState } from "react";

const TabWrap = styled(Row)`
  margin-top: 1rem;
`;

type TOption = "user" | "post";

interface ISearchTab {
  option: TOption;
  onClick: (tabOption: string) => void;
}

const SearchTab = ({ option = "user", onClick, ...props }: ISearchTab) => {
  const [tab, setTab] = useState(option);

  const onClickTab = () => {
    const newTabOption = tab === "user" ? "post" : "user";
    setTab(newTabOption);
    onClick(newTabOption);
  };

  return (
    <TabWrap {...props}>
      <Button
        variant={tab === "user" ? "symbol" : "disabled"}
        type="button"
        width="50vh"
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          pointerEvents: tab === "user" ? "none" : undefined,
        }}
        onClickHandler={() => onClickTab()}
        aria-label="검색된 사용자 보기"
      >
        사용자
      </Button>
      <Button
        variant={tab === "post" ? "symbol" : "disabled"}
        type="button"
        width="50vh"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          pointerEvents: tab === "post" ? "none" : undefined,
        }}
        onClickHandler={() => onClickTab()}
        aria-label="검색된 게시글 보기"
      >
        게시글
      </Button>
    </TabWrap>
  );
};

export default SearchTab;
