/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";
import { APP_MAX_WIDTH } from "@/constants/uiConstants";

const CustomStyles = createGlobalStyle<any>`
    ${normalize}

    *{
        /* color: ${props => props.theme.text_primary_color};
        font-family: sans-serif; */
    }
    body {
        /* min-width: 420px;
        transition: background-color 300ms ease-in-out;
        background-repeat: repeat; */
        background-color: ${props => props.theme.background_color};
    }

    html,
    body {
      height: 100%;
      /* height: 100%;
      box-sizing: border-box;
      touch-action: manipulation;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overscroll-behavior-x: none; */
    }

    body {
      /* position: relative;
      min-height: 100%;
      margin: 0; */
    }

    #root {
      width: 100%;
      max-width: ${APP_MAX_WIDTH}px;
      height: 100%;
      margin: 0 auto;
    }

    div, 
    section,
    nav,
    aside {
      display: flex;
      flex-direction: column;
    }
`;

export const GlobalStyle = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TestH1 = styled.div`
  padding: 1rem;
  ${tw`font-bold text-2xl bg-orange-400`}
`;
