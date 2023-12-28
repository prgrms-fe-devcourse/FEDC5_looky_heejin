import { NAV_HEIGHT } from "@/constants/uiConstants";
import { Row } from "@/styles/GlobalStyle";
import { styled } from "styled-components";

const TabWrap = styled(Row)`
  margin-top: 1rem;
  height: ${`${NAV_HEIGHT - 1}rem`};
`;

const Tab = styled.div<{ option: TOption }>`
  background-color: ${({ theme }) => theme.gray_200};
  flex-grow: 1;
  text-align: center;
  line-height: ${`${NAV_HEIGHT - 1}rem`};
  cursor: pointer;
  &:first-of-type {
    border-right: 2px solid ${({ theme }) => theme.white_primary};
    background-color: ${({ theme, option }) =>
      option === "user" ? theme.gray_500 : undefined};
  }
  &:last-of-type {
    background-color: ${({ theme, option }) =>
      option === "post" ? theme.gray_500 : undefined};
  }
`;

type TOption = "user" | "post";

interface ISearchTab {
  option: TOption;
}

const SearchTab = ({ option = "user", ...props }: ISearchTab) => {
  return (
    <TabWrap {...props}>
      <Tab option={option}>{"사용자"}</Tab>
      <Tab option={option}>{"게시글"}</Tab>
    </TabWrap>
  );
};

export default SearchTab;
