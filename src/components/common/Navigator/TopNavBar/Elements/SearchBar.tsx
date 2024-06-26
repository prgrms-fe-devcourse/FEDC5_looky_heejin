import { styled } from "styled-components";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import { CLOSE_ICON, SEARCH_ICON } from "@/constants/icons";
import { SEARCH_BAR } from "@/constants/uiConstants";
import { useSearchValue } from "@/hooks/useSearchValue";
import { Icon, Input } from "@/components/common";

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
  height: 100%;
`;

const StyledInput = styled(Input)`
  position: relative;
  width: 100rem;
  height: 65%;
  font-size: 0.85rem;
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
  cursor: pointer;
`;

const SearchBar = () => {
  const { setSearchValue } = useSearchValue();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm({ mode: "onSubmit" });

  const onValid = (inputValue: FieldValues) => {
    setSearchValue({ keyword: inputValue.search });
  };

  const onInvalid = (error: FieldErrors) => {
    console.log("에러 :", error);
  };

  const handleRemoveValue = () => {
    setValue("search", "");
  };
  return (
    <SearchBarWrapper>
      <StyledForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <StyledInput
          kind="text"
          placeholder="사용자와 게시글을 검색해보세요"
          required={true}
          register={register("search", {
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
