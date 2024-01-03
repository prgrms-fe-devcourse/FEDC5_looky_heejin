import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import Icon from "@/components/common/Icon/Icon.tsx";
import { Form, Input, IconWrap } from "./SearchPage.styles.ts";
import { useSearchParams } from "react-router-dom";

interface ISearchBar {
  onSearch: (searchQuery: string) => void;
  onClick: () => void;
}

export interface IInput {
  searchQuery: string;
}

const SearchBar = ({ onSearch, onClick }: ISearchBar) => {
  const { register, handleSubmit, setValue } = useForm<IInput>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setValue("searchQuery", keyword);
  }, [searchParams, setValue]);

  const onSubmit: SubmitHandler<IInput> = data => {
    onSearch(data.searchQuery);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") {
        return;
      } else {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    },
    [handleSubmit, onSubmit, setValue]
  );

  return (
    <>
      <IconWrap onClick={onClick}>
        <Icon name="arrow_back_ios" />
      </IconWrap>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          {...register("searchQuery")}
        />
      </Form>
    </>
  );
};

export default SearchBar;
