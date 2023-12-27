import useTheme from "@/hooks/useTheme";

export const MIN_ICON_WEIGHT = 100;
export const MAX_ICON_WEIGHT = 900;
export const ICON_OUTLINE = 0;
export const ICON_FILL = 1;
export const DEFAULT_ICON_SIZE = "2rem";
export const DEFAULT_ICON_WEIGHT = 200;

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
  size = DEFAULT_ICON_SIZE,
  color,
  fill = false,
  weight = DEFAULT_ICON_WEIGHT,
  className = "",
  ...props
}: IIconProps) => {
  const processedWeight = Math.min(
    Math.max(weight, MIN_ICON_WEIGHT),
    MAX_ICON_WEIGHT
  );

  const theme = useTheme();

  const iconStyle: IIconStyle = {
    fontSize: size,
    color: color ? color : theme?.gray_500,
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
