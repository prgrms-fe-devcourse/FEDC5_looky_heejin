import styled from "styled-components";

type TShape = "circle" | "round" | "square";
type TSize = "XXS" | "XS" | "S" | "M" | "L" | "XL";

interface IAvatarProps {
  size: TSize;
  shape?: TShape;
  src?: string;
  theme?: string;
  border?: "none" | "solid";
  $border?: "none" | "solid";
}

const ShapeToStyle: { [key: string]: string } = {
  circle: "50%",
  round: "5px",
  square: "0px",
};

const SizeToStyle: { [key: string]: string } = {
  XXS: "26px",
  XS: "32px",
  S: "40px",
  M: "48px",
  L: "56px",
  XL: "64px",
};

const AvatarWrapper = styled.div<Omit<IAvatarProps, "border">>`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: ${({ size }) => SizeToStyle[size]};
  height: ${({ size }) => SizeToStyle[size]};
  border: ${({ $border, theme }) =>
    $border === "solid" ? `1px solid ${theme.gray_300}` : "none"};
  background-image: ${({ src }) => (src ? `url(${src})` : "url(/profile.png)")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: ${({ shape }) => shape && ShapeToStyle[shape]};
  background-color: ${({ theme }) => theme.background_color};
`;

const Avatar = ({
  size = "S",
  shape = "circle",
  src,
  border = "solid",
  ...props
}: Omit<IAvatarProps, "$border">) => {
  return (
    <AvatarWrapper
      size={size}
      shape={shape}
      src={src}
      $border={border}
      {...props}
    ></AvatarWrapper>
  );
};

export default Avatar;
