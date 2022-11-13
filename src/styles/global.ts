import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }
    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      background: ${theme.colors.background};
    }

    textarea {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.small};
    }

    button {
      cursor: pointer;
    }
  `}
`;
export default GlobalStyles;
