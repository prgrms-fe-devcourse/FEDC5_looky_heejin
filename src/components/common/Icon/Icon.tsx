import { lightTheme } from "@/styles/theme";

export const MIN_ICON_WEIGHT = 100;
export const MAX_ICON_WEIGHT = 900;
export const ICON_OUTLINE = 0;
export const ICON_FILL = 1;

export interface IIconProps {
  name: string;
  size?: string | number;
  color?: string;
  fill?: boolean;
  weight?: number;
  className?: string;
}

export interface IIconStyle {
  fontSize?: string | number;
  color?: string;
  fontVariationSettings: string;
}

const Icon = ({
  name,
  size = "2rem",
  color = lightTheme.gray_500,
  fill = false,
  weight = 200,
  className = "",
  ...props
}: IIconProps) => {
  let processedWeight = Math.min(
    Math.max(weight, MIN_ICON_WEIGHT),
    MAX_ICON_WEIGHT
  );

  const iconStyle: IIconStyle = {
    fontSize: size,
    color,
    fontVariationSettings: `'FILL' ${
      fill ? ICON_FILL : ICON_OUTLINE
    },'wght' ${processedWeight}`,
  };

  return (
    <i
      className={`material-symbols-rounded ${className}`}
      style={iconStyle}
      {...props}
    >
      {name}
    </i>
  );
};

export default Icon;
