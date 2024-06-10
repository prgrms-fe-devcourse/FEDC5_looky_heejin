import { Button } from "@/components/common";
import { styled } from "styled-components";
import Icon from "../common/Icon/Icon";

type TVariant = "flat" | "neumorp" | "symbol" | "disabled";
export interface IButtonProps {
  items: Array<{
    name: string;
    size: number;
    color?: string | undefined;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }>;
  style: {
    variant: TVariant;
    width?: number;
    [key: string]: any;
  };
}

const ButtonWrap = styled.div<{ key: string }>``;

const ButtonSet = ({ items, style }: IButtonProps) => {
  return (
    <>
      {items.map((item, index) => (
        <ButtonWrap key={index.toString()}>
          <Button {...style} onClick={item.onClick}>
            <Icon name={item.name} size={item.size} color={item.color} />
          </Button>
        </ButtonWrap>
      ))}
    </>
  );
};

export default ButtonSet;
