import styled from "styled-components";
import { Col } from "@/styles/GlobalStyle";
import { BORDER_BASE_WIDTH } from "@/constants/uiConstants";

export const SignInPageContainer = styled(Col)`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

export const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

export const SpanStyle = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.symbol_color};
`;

export const SubmitButtonContainer = styled.button`
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
