import React from "react";
import { styled } from "styled-components";
import Icon from "../../../Icon/Icon";
import { BACK_ICON } from "@/constants/icons";

interface IBackButtonProps {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

const BackButtonWrapper = styled.div`
  display: inline-block;
  margin: auto 10%;
  & > :first-child {
    cursor: pointer;
  }
`;

const BackButton = ({ onClick }: IBackButtonProps) => {
  return (
    <BackButtonWrapper>
      <Icon name={BACK_ICON} size="2rem" onClick={onClick} />
    </BackButtonWrapper>
  );
};

export default BackButton;
