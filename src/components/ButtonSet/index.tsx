import { Button } from "@/components/common";
import { ReactNode } from "react";
import { styled } from "styled-components";

type TVariant = "flat" | "neumorp" | "symbol" | "disabled";
export interface IButtonProps {
  children: ReactNode[] | ReactNode;
  style: {
    variant: TVariant;
    width?: number;
    [key: string]: any;
  };
}

const ButtonWrap = styled.div<{ key: string }>``;

const ButtonSet = ({ children, style }: IButtonProps) => {
  return (
    <>
      {Array.isArray(children) ? (
        children.map((child, index) => {
          return (
            <ButtonWrap key={child + index.toString()}>
              <Button tabIndex={-1} {...style}>
                {child}
              </Button>
            </ButtonWrap>
          );
        })
      ) : (
        <div>
          <Button {...style}>{children}</Button>
        </div>
      )}
    </>
  );
};

export default ButtonSet;
