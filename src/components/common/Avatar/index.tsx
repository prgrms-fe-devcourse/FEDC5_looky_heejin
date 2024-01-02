import styled from "styled-components";

type TShape = "circle" | "round" | "square";

interface IAvatarProps {
  size: string;
  shape?: TShape;
  src: string;
  alt?: string;
}

const ShapeToStyle: { [key: string]: string } = {
  circle: "50%",
  round: "5px",
  square: "0px",
};

const SizeToStyle: { [key: string]: string } = {
  XS: "32px",
  S: "45px",
  M: "55px",
  L: "65px",
};

const AvatarWrapper = styled.div<{ size: string; shape: TShape }>`
  width: ${({ size }) => SizeToStyle[size]};
  position: relative;
  display: inline-block;
  border-style: none;
  border-radius: ${({ shape }) => ShapeToStyle[shape]};
  background-color: ${({ theme }) => theme.background_color};
  overflow: hidden;
`;

const Avatar = ({
  size = "S",
  shape = "circle",
  src = "https://picsum.photos/100",
  alt = "프로필",
  ...props
}: IAvatarProps) => {
  return (
    <AvatarWrapper size={size} shape={shape} {...props}>
      <img src={src} alt={alt} />
    </AvatarWrapper>
  );
};

export default Avatar;
