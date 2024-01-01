import React from "react";
import { styled } from "styled-components";
import { Input } from "../..";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 138%;
  margin-left: -13%;
`;

const SearchBar = () => {
  return (
    <InputWrapper>
      <Input
        required={true}
        style={{
          backgroundColor: "grey",
          borderRadius: "2rem",
          height: "80%",
        }}
      />
    </InputWrapper>
  );
};

export default SearchBar;
