import React from "react";
import styled from "styled-components";
import Logo from "/logo.png";
import { Image } from "@/components/common";

interface ILogoImageProps {
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

const StyledImg = styled.div`
  position: relative;
  width: 4rem;
  margin: auto auto;
  cursor: pointer;
  aspect-ratio: 4 / 1.78;
`;

const LogoImage = ({ onClick }: ILogoImageProps) => {
  return (
    <StyledImg onClick={onClick}>
      <Image
        src={Logo}
        alt="루키 로고"
        fill={true}
        style={{ objectFit: "cover" }}
      />
    </StyledImg>
  );
};

export default LogoImage;
