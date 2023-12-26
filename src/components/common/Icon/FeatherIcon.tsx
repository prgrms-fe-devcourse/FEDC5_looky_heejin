import { icons } from "feather-icons";
import styled from "styled-components";

export interface IIconProps {
  name: string;
  size?: number | string;
  strokeWidth: number;
  color: string;
}

const IconWrapper = styled.i`
  display: inline-block;
`;

const Icon = ({
  name = "box",
  size = "1rem",
  strokeWidth = 2,
  color = "black",
  ...props
}: IIconProps) => {
  const shapeStyle = {
    width: size,
    height: size,
  };
  const iconStyle = {
    "stroke-width": strokeWidth,
    stroke: color,
    width: size,
    height: size,
    ...props,
  };
  const icon = icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : "";
  const base64 = btoa(svg);
  return (
    <IconWrapper {...props} style={shapeStyle}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

export default Icon;
