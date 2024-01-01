import React from "react";
import { styled } from "styled-components";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import Icon from "../../Icon/Icon";
import { CLOSE_ICON, SEARCH_ICON } from "@/constants/icons";

const SearchBarWrapper = styled.div`
  height: 100%;
  width: 138%;
  margin-left: -13%;
  z-index: 999;
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
  background-color: ${props => props.theme.gray_100};
  border-radius: 2rem;
  padding-left: 3.3rem;
  &:focus {
    outline: none;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 15%;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 8%;
  background-color: ${({ theme }) => theme.gray_500};
  border-radius: 50%;
  & {
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onValid = (inputValue: FieldValues) => {
    console.log("입력 값 : ", inputValue.search);
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
          <Icon name={SEARCH_ICON} size="1.4rem" weight={300}></Icon>
        </SearchIconWrapper>
        <CloseIconWrapper onClick={handleRemoveValue}>
          <Icon name={CLOSE_ICON} size="1rem" weight={300} color="white"></Icon>
        </CloseIconWrapper>
      </StyledForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
