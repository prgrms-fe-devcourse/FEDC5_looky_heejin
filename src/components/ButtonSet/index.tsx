import { Button, Icon } from "@/components/common";
import { styled } from "styled-components";

type TVariant = "flat" | "neumorp" | "symbol" | "disabled";
export interface IButtonProps {
  items: Array<{
    name: string;
    size: number;
    ariaString: string;
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
          <Button
            {...style}
            onClick={item.onClick}
            aria-label={`${item.ariaString} 버튼`}
          >
            <Icon
              name={item.name}
              size={item.size}
              color={item.color}
              isSprite={true}
            />
          </Button>
        </ButtonWrap>
      ))}
    </>
  );
};

export default ButtonSet;
