import React from "react";
import { styled } from "styled-components";
import { Icon } from "@/components/common";
import { ICON } from "@/constants/icons";

interface IBackButtonProps {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

const BackButtonWrapper = styled.div`
  display: inline-block;
  margin: auto 1rem;
  & > :first-child {
    cursor: pointer;
  }
`;

const BackButton = ({ onClick }: IBackButtonProps) => {
  return (
    <BackButtonWrapper>
      <Icon name={ICON.BACK} size="2rem" onClick={onClick} isSprite={true} />
    </BackButtonWrapper>
  );
};

export default BackButton;
