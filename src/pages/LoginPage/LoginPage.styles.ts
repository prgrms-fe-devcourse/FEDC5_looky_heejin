import { BORDER_BASE_WIDTH } from "@/constants/uiConstants";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const LogInPageContainer = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.img`
  margin-bottom: 20px;
`;

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
`;

export const InputContainer = styled.input`
  color: ${props => props.theme.text_primary_color};
  background-color: ${props => props.theme.container_color};
  padding-left: 5px;
  font-size: 1.15rem;
  border-width: ${BORDER_BASE_WIDTH}px;
  border-color: transparent;
  border-radius: 0.375rem;
  width: 300px;
  margin: 10px 0;
  height: 50px;

  &:focus {
    border-color: ${props => props.theme.symbol_color};
    outline: none;
  }
`;

export const LogInButtonContainer = styled.button`
  color: ${props => props.theme.white_primary};
  font-weight: bold;
  margin: 10px 0;
  width: 300px;
  height: 50px;

  background: linear-gradient(
    90deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  border-radius: 0.375rem;
`;

export const SignInLinkContainer = styled(Link)`
  color: ${props => props.theme.white_primary};
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  background-color: ${props => props.theme.gray_500};
  border-radius: 0.375rem;
`;

export const DoNotLoginLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.theme.gray_500};
`;
