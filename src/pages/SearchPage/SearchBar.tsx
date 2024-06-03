import { FieldErrors, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import Icon from "@/components/common/Icon";
import { Form, Input, SearchIconWrap, BackIconWrap } from "./SearchPage.styles";
import { useSearchParams } from "react-router-dom";
import { SEARCH_VALIDATION_OPTION } from "./SearchPage.const";
import { SEARCH_ICON } from "@/constants/icons";
import { BackButton } from "@/components/common/Navigator/TopNavBar";

interface ISearchBar {
  onSearch: (searchQuery: string) => void;
  onClickBack: () => void;
}

export interface IInput {
  searchQuery: string;
}

const SearchBar = ({ onSearch, onClickBack }: ISearchBar) => {
  const { register, handleSubmit, setValue } = useForm<IInput>({
    mode: "onSubmit",
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setValue("searchQuery", keyword);
  }, [searchParams]);

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
      <BackIconWrap>
        <BackButton onClick={onClickBack} />
      </BackIconWrap>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Input
          className="shadow"
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요. ex) 캐주얼"
          {...register("searchQuery", SEARCH_VALIDATION_OPTION)}
        />
        <SearchIconWrap>
          <Icon
            name={SEARCH_ICON}
            size="1.3rem"
            weight={300}
            onClick={handleSubmit(onValid, onInvalid)}
          ></Icon>
        </SearchIconWrap>
      </Form>
    </>
  );
};

export default SearchBar;
