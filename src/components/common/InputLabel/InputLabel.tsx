import styled from "styled-components";
import tw from "twin.macro";

interface IInputLabelProps {
  title: string;
  help?: string;
  titleColor?: string;
  helpColor?: string;
}

const InputLabel = ({
  title,
  help,
  titleColor,
  helpColor,
}: IInputLabelProps) => {
  return (
    <label>
      <div className={`${help && "flex flex-row justify-between"}`}>
        <TitleSpan $titleColor={titleColor}>{title}</TitleSpan>
        {help && <HelpSpan $helpColor={helpColor}>{help}</HelpSpan>}
      </div>
    </label>
  );
};

export default InputLabel;

const TitleSpan = styled.span<{ $titleColor?: string }>`
  color: ${props =>
    props.$titleColor ? props.$titleColor : props.theme.text_primary_color};
`;

const HelpSpan = styled.span<{ $helpColor?: string }>`
  color: ${props =>
    props.$helpColor ? props.$helpColor : props.theme.gray_primary};

  ${tw`text-xs pl-4`};
`;
