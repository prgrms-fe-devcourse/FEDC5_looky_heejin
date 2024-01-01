import React from "react";
import { styled } from "styled-components";
import { Input } from "../..";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";

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
  width: 100rem;
  height: 65%;
  background-color: ${props => props.theme.gray_100};
  border-radius: 2rem;
  padding-left: 1rem;
  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onValid = (data: FieldValues) => {
    console.log("입력 값 : ", data.search);
  };

  const onInvalid = (error: FieldErrors) => {
    console.log("에러 :", error);
  };
  return (
    <SearchBarWrapper>
      <StyledForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <StyledInput
          type="text"
          placeholder="사용자와 게시글을 검색해보세요"
          {...register("search", {
            required: true,
            minLength: {
              message: "2자 이상 입력해주세요",
              value: 2,
            },
          })}
          // style={{
          //   backgroundColor: "grey",
          //   borderRadius: "2rem",
          //   height: "75%",
          // }}
        />
        {/* <button type="submit" style={{ display: "none" }}></button> */}
      </StyledForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
