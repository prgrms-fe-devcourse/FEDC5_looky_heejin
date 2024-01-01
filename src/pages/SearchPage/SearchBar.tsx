import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect } from "react";
import Icon from "@/components/common/Icon/Icon.tsx";
import { Form, IconWrap, Input } from "./SearchPage.styles.ts";
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
  const { ref, ...inputProps } = register("searchQuery");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";

    setValue("searchQuery", keyword);
  }, [searchParams, setValue]);

  const onSubmit: SubmitHandler<IInput> = data => {
    onSearch(data.searchQuery);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("searchQuery", e.target.value);
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
          {...inputProps}
          onChange={handleChange}
        />
      </Form>
    </>
  );
};

export default SearchBar;
