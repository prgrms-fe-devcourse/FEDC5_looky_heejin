import React from "react";
import styled from "styled-components";

interface ILogoImageProps {
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

const StyledImg = styled.img`
  width: 60%;
  margin: auto auto;
  cursor: pointer;
`;

const LogoImage = ({ onClick }: ILogoImageProps) => {
  return <StyledImg src="logo.png" alt="logo" onClick={onClick} />;
};

export default LogoImage;
