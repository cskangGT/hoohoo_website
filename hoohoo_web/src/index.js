import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import './lang/i18n';


const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Gagalin';
        src: url('Gagalin-Regular.otf') format('opentype');
    }
    body {
      margin: 0;
      font-family: 'Poppins','Fredoka', 'Gagalin', sans-serif;
      font-weight: 500;
    }
    html {
      scroll-behavior: smooth;
    }
`;
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={Router} />
  </React.StrictMode>,
);