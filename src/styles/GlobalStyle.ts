import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }

    body{
      background: #121214;
      color: #FFF;
      max-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    body, input, button{
      font: 16px Dax, sans-serif;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 500;
      font-family: 'Gothic A1', sans-serif;
    }

    button, a {
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: #FFF;
    }

    // Responsive
  html {
    font-size: 62.5%;

    @media (max-width: 1080px) {
      font-size: 58%;
    }

    @media (max-width: 720px) {
      font-size: 54%;
    }

    @media (max-width: 425px) {
      font-size: 48%;
    }
  }
`;
