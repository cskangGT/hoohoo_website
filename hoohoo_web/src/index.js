import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import './lang/i18n';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 300;
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
