import { useSearchValue } from "@/hooks/useSearchValue";

const SearchPage = () => {
  const { keyword } = useSearchValue();
  return <div>navbar의 검색창에 입력 후 submit된 값 : {keyword}</div>;
};

export default SearchPage;
