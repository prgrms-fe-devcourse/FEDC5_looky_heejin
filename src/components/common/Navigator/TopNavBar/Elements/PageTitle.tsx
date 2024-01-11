import styled from "styled-components";

interface IPageTitleProps {
  title: string;
}

const StyledSpan = styled.span`
  margin: auto auto;
  font-weight: bold;
  font-size: 1.2rem;
`;

const PageTitle = ({ title }: IPageTitleProps) => {
  return <StyledSpan>{title}</StyledSpan>;
};

export default PageTitle;
