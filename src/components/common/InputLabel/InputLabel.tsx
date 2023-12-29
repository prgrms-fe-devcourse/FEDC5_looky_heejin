import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const InputLabel: React.FC<{ title: string; help?: string }> = ({
  title,
  help,
}) => {
  return (
    <label>
      <div className={`${help && "flex flex-row justify-between"}`}>
        {title}
        {help && <HelpSpan>{help}</HelpSpan>}
      </div>
    </label>
  );
};

export default InputLabel;

const HelpSpan = styled.span`
  color: ${props => props.theme.gray_primary};
  ${tw`text-xs pl-4`};
`;
