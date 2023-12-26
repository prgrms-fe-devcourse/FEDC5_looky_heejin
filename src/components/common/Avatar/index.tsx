import { FC } from "react";
import styled from "styled-components";

type TShape = "circle" | "round" | "square";

interface IAvatarProps {
  size: number;
  shape: TShape;
  src: string;
  alt: string;
}

const ShapeToStyle = {
  circle: "50%",
  round: "5px",
  square: "0px",
};

const AvatarWrapper = styled.div<{ size: number; shape: TShape }>`
  width: ${({ size }) => `${size}px`};
  position: relative;
  display: inline-block;
  border-style: none;
  border-radius: ${({ shape }) => ShapeToStyle[shape]};
  background-color: ${({ theme }) => theme.background_color};
  overflow: hidden;
`;

const Avatar: FC<IAvatarProps> = ({
  size = 70,
  shape = "circle",
  src = "https://picsum.photos/100",
  alt = "이미지",
  ...props
}) => {
  return (
    <AvatarWrapper size={size} shape={shape} {...props}>
      <img src={src} alt={alt} />
    </AvatarWrapper>
  );
};

export default Avatar;
