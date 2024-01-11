import { Col, Row } from "@/styles/GlobalStyle";
import { styled } from "styled-components";

export const Form = styled(Col)`
  justify-content: center;
  width: 350px;
  aspect-ratio: 4 / 3;
`;

export const InputWrap = styled.div`
  padding: 0.375rem 0 1rem;
`;

export const ErrorContainer = styled(Row)`
  font-size: 1.1rem;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SpanStyle = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.symbol_color};
`;

export const UploadWrap = styled.div<{ $iscover: string }>`
  width: 350px;
  padding-bottom: 1rem;
  aspect-ratio: ${props => (props.$iscover === "true" ? 10 / 16 : 1 / 1)};
`;
