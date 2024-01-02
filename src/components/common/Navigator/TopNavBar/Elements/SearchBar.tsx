import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import Icon from "../../../Icon/Icon";
import { CLOSE_ICON, SEARCH_ICON } from "@/constants/icons";
import { SEARCH_BAR } from "@/constants/uiConstants";
import { useSearchValue } from "@/hooks/useSearchValue";

const SearchBarWrapper = styled.div`
  height: 100%;
  width: 146%;
  margin-left: -18%;
  z-index: ${SEARCH_BAR};
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledInput = styled.input`
  position: relative;
  width: 100rem;
  height: 65%;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text_primary_color};
  background-color: ${({ theme }) => theme.container_color};
  border-radius: 2rem;
  padding-left: 2.7rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 0.85rem;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  margin-top: 0.1rem;
  left: 11.5%;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 6%;
  background-color: ${({ theme }) => theme.gray_500};
  border-radius: 50%;
  & {
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const { keyword, setSearchValue } = useSearchValue();
  // input에 입력된 값이 리덕스 스토어에 잘 저장되는지 확인 ---
  useEffect(() => {
    console.log(keyword);
  }, [keyword]);
  // ----------------------------------------------
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onValid = (inputValue: FieldValues) => {
    console.log(inputValue.search);
    setSearchValue({ keyword: inputValue.search });
  };

  const onInvalid = (error: FieldErrors) => {
    console.log("에러 :", error);
    console.log(errors);
  };

  const handleRemoveValue = () => {
    setValue("search", "");
  };
  return (
    <SearchBarWrapper>
      <StyledForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <StyledInput
          type="text"
          placeholder="사용자와 게시글을 검색해보세요"
          {...register("search", {
            required: "검색어를 입력해주세요",
            minLength: {
              message: "2자 이상 입력해주세요",
              value: 2,
            },
          })}
        />
        <SearchIconWrapper>
          <Icon name={SEARCH_ICON} size="1.3rem" weight={300}></Icon>
        </SearchIconWrapper>
        <CloseIconWrapper onClick={handleRemoveValue}>
          <Icon
            name={CLOSE_ICON}
            size="1rem"
            weight={300}
            color="#ffffff"
          ></Icon>
        </CloseIconWrapper>
      </StyledForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
