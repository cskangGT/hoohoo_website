import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';
import './lang/i18n';
import YanoljaYacheTtf from '../public/fonts/YanoljaYacheR.ttf'
import YanoljaYacheWoff from '../public/fonts/YanoljaYacheR.woff'
import YanoljaYacheWoff2 from '../public/fonts/YanoljaYacheR.woff2'
import YanoljaYacheBTtf from '../public/fonts/YanoljaYacheB.ttf'
import YanoljaYacheBWoff from '../public/fonts/YanoljaYacheB.woff'
import YanoljaYacheBWoff2 from '../public/fonts/YanoljaYacheB.woff2'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Yanolga Yachae';
        src: 
        url(${YanoljaYacheTtf}) format('truetype'),
        url(${YanoljaYacheWoff}) format('woff'),
         url(${YanoljaYacheWoff2}) format('woff2'),
         url(${YanoljaYacheBTtf}) format('truetype'),
        url(${YanoljaYacheBWoff}) format('woff'),
         url(${YanoljaYacheBWoff2}) format('woff2'),
    }
    body {
      margin: 0;
      font-family: 'Yanolga Yachae','Noto Sans', 'Fredoka';
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