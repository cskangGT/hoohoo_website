import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
    }
`;
const root = ReactDOM.createRoot(
  document.getElementById('root')
);



root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={Router} />
  </React.StrictMode>
);
