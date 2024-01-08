import { Button } from "@/components/common";
import { ReactNode } from "react";
import { styled } from "styled-components";

interface ButtonProps {
  children: ReactNode[] | ReactNode;
  style: {
    variant: "flat" | "neumorp" | "symbol" | "disabled";
    width?: number;
    style?: {};
  };
}

const ButtonWrap = styled.div<{ key: string }>``;

// children은 Icon을 받는다.
const Buttons = ({ children, style }: ButtonProps) => {
  return (
    <>
      {Array.isArray(children) ? (
        children.map((child, index) => {
          return (
            <ButtonWrap key={child + index.toString()}>
              <Button {...style}>{child}</Button>
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

export default Buttons;
