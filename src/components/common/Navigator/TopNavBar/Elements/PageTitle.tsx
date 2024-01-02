import React from "react";
import styled from "styled-components";

interface IPageTitleProps {
  title: string;
}

const StyledSpan = styled.span`
  margin: auto auto;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_primary_color};
`;

const PageTitle = ({ title }: IPageTitleProps) => {
  return <StyledSpan>{title}</StyledSpan>;
};

export default PageTitle;
