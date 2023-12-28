import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import cn from "clsx";
import styled, { css } from "styled-components";
import { BORDER_BASE_WIDTH } from "@/constants/uiConstants";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  kind?: "text" | "price";
  register: UseFormRegisterReturn;
  isInvalid?: boolean;
  required: boolean;
  [key: string]: any;
}

const Input = ({
  className,
  kind = "text",
  register,
  required,
  isInvalid,
  ...rest
}: IInputProps) => {
  const rootClassName = cn("px-4 py-3 rounded-md shadow", {}, className);

  return (
    <>
      {kind === "text" && (
        <StyledInput
          className={rootClassName}
          required={required}
          isInvalid={isInvalid}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...register}
          {...rest}
        />
      )}
      {kind === "price" && null}
    </>
  );
};

export default Input;

const StyledInput = styled.input<any>`
  appearance: none;
  box-sizing: border-box;
  width: 100%;
  background-color: ${props => props.theme.white_primary + 30};
  color: ${props => props.theme.text_primary_color};
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  line-height: 1rem;

  &:focus {
    outline: none;
    border-color: ${props =>
      props.isInvalid ? props.theme.red_primary : props.theme.symbol_color};
  }
  &:focus-visible {
    box-shadow: none;
  }

  border-color: ${props => props.isInvalid && props.theme.red_primary};
`;
