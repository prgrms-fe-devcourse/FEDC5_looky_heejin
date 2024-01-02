import React from "react";
import styled from "styled-components";
import Logo from "/logo.png";

interface ILogoImageProps {
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

const StyledImg = styled.img`
  width: 50%;
  margin: auto auto;
  cursor: pointer;
`;

const LogoImage = ({ onClick }: ILogoImageProps) => {
  return <StyledImg src={Logo} alt="루키 로고" onClick={onClick} />;
};

export default LogoImage;
