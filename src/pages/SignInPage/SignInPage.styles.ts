import styled from "styled-components";
import { Col } from "@/styles/GlobalStyle";

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
  border: none;
  width: 300px;
  margin: 10px 0;
  height: 50px;
`;

export const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

export const SpanStyle = styled.span`
  color: ${props => props.theme.text_primary_color};
`;

export const SubmitButtonContainer = styled.button`
  color: #f0f0f0;
  font-weight: bold;
  margin: 10px 0;
  width: 300px;
  height: 50px;

  background: linear-gradient(
    90deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  border-radius: 5px;
`;
