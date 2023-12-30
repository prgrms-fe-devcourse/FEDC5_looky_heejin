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

export const SubmitButtonContainer = styled.button`
  color: ${props => props.theme.text_secondary_color};
  font-weight: bold;
  margin: 10px 0;
  width: 300px;
  height: 50px;
  ${props => props.theme.symbol_color};

  background: linear-gradient(
    90deg,
    ${props => props.theme.symbol_color},
    ${props => props.theme.symbol_secondary_color}
  );
  border-radius: 5px;
`;
