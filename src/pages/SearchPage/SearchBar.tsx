import { FieldErrors, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import Icon from "@/components/common/Icon/Icon";
import { Form, Input, IconWrap } from "./SearchPage.styles";
import { useSearchParams } from "react-router-dom";
import SearchBarConst from "./SearchPage.const";

interface ISearchBar {
  onSearch: (searchQuery: string) => void;
  onClick: () => void;
}

export interface IInput {
  searchQuery: string;
}

const SearchBar = ({ onSearch, onClick }: ISearchBar) => {
  const { register, handleSubmit, setValue } = useForm<IInput>({
    mode: "onSubmit",
  });
  const [searchParams] = useSearchParams();

  // 최근 검색어 클릭 시 쿼리스트링 변경에 따라 Input setValue
  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setValue("searchQuery", keyword);
  }, [searchParams, setValue]);

  const onValid = (data: IInput) => {
    onSearch(data.searchQuery);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.error(errors);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") {
        return;
      }

      e.preventDefault();
      handleSubmit(onValid, onInvalid)();
    },
    [handleSubmit, onValid, onInvalid]
  );

  return (
    <>
      <IconWrap onClick={onClick}>
        <Icon name="arrow_back_ios" />
      </IconWrap>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          {...register("searchQuery", SearchBarConst.SEARCH_VALIDATION_OPTION)}
        />
      </Form>
    </>
  );
};

export default SearchBar;
