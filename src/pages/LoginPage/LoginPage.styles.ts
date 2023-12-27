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
  border-radius: 5px;
`;

export const InputContainer = styled.input`
  border-radius: 5px;
  border: none;
  width: 300px;
  margin: 10px 0;
  height: 50px;
`;

export const LogInButtonContainer = styled.button`
  color: ${props => props.theme.text_secondary_color};
  font-weight: bold;
  margin: 10px 0;
  width: 250px;
  height: 50px;
  ${props => props.theme.symbol_color};

  /* todo secondary symbol color 추가 시 리팩토링 필요 */
  background: linear-gradient(
    90deg,
    ${props => props.theme.symbol_color},
    #f48a4e
  );
  border-radius: 5px;
`;

export const LinkContainer = styled(Link)`
  color: ${props => props.theme.text_secondary_color};
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 50px;
  background-color: ${props => props.theme.gray_500};
  border-radius: 5px;
`;
